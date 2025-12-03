# Travel Planning System - Actionable Steps

## Quick Start

### 1. Setup Accounts (15 min)

**SerpApi:**

```bash
# Sign up: https://serpapi.com/users/sign_up
# Copy API key from dashboard
```

**Telegram Bot:**

```bash
# 1. Message @BotFather on Telegram
# 2. Send: /newbot
# 3. Name: "Travel Planner Bot"
# 4. Username: "yourusername_travel_bot"
# 5. Copy API token

# 6. Get chat ID:
# Message your bot, then:
curl https://api.telegram.org/bot<TOKEN>/getUpdates
# Extract "chat":{"id":123456789}
```

### 2. Create Project Structure (5 min)

```bash
mkdir -p ~/travel-planning/{data,tools,workflows,trips,scripts}
cd ~/travel-planning
git init

# Create .env
cat > .env << 'EOF'
SERPAPI_KEY="your_key_here"
TELEGRAM_BOT_TOKEN="123456:ABC-DEF..."
TELEGRAM_CHAT_ID="123456789"
ANTHROPIC_API_KEY="your_claude_key"
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
.env
*.db
data/cache/
__pycache__/
*.pyc
.pytest_cache/
.mypy_cache/
EOF
```

### 3. Setup n8n on VPS (10 min)

```bash
# SSH to VPS
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=<secure_password> \
  n8nio/n8n

# Access: http://your-vps-ip:5678
```

---

## Phase 1: Database Foundation (1-2 hours)

### Step 1: Create Database Schema

Create `scripts/init_db.sql`:

```sql
-- Flight routes to monitor
CREATE TABLE flight_routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    travel_class TEXT DEFAULT 'economy',
    flexible_dates BOOLEAN DEFAULT 1,
    date_window_days INTEGER DEFAULT 7,
    priority INTEGER DEFAULT 5,
    active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(origin, destination, travel_class)
);

-- Historical price data
CREATE TABLE price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id INTEGER NOT NULL,
    price REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    airline TEXT,
    departure_time TIMESTAMP,
    arrival_time TIMESTAMP,
    stops INTEGER DEFAULT 0,
    flight_numbers TEXT,
    booking_url TEXT,
    data_source TEXT,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES flight_routes(id)
);

-- Calculated baselines
CREATE TABLE price_baselines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id INTEGER NOT NULL,
    baseline_price REAL NOT NULL,
    season_factor REAL DEFAULT 1.0,
    days_to_departure INTEGER,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sample_size INTEGER,
    FOREIGN KEY (route_id) REFERENCES flight_routes(id)
);

-- Detected deals
CREATE TABLE deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id INTEGER NOT NULL,
    price_history_id INTEGER NOT NULL,
    baseline_price REAL NOT NULL,
    actual_price REAL NOT NULL,
    savings_amount REAL NOT NULL,
    savings_percent REAL NOT NULL,
    notified_at TIMESTAMP,
    notification_channels TEXT,
    expires_at TIMESTAMP,
    clicked BOOLEAN DEFAULT 0,
    booked BOOLEAN DEFAULT 0,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES flight_routes(id),
    FOREIGN KEY (price_history_id) REFERENCES price_history(id)
);

-- Trip planning
CREATE TABLE trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    destination TEXT,
    start_date DATE,
    end_date DATE,
    budget REAL,
    status TEXT DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expense tracking
CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid BOOLEAN DEFAULT 0,
    payment_method TEXT,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

-- User preferences
CREATE TABLE preferences (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_price_history_route_date ON price_history(route_id, scraped_at);
CREATE INDEX idx_deals_notified ON deals(notified_at, booked);
CREATE INDEX idx_routes_active ON flight_routes(active, priority);
CREATE INDEX idx_expenses_trip ON expenses(trip_id, category);
```

Initialize:

```bash
sqlite3 ~/travel-planning/data/travel.db < scripts/init_db.sql
```

### Step 2: Create Shared Utilities

Create `tools/shared/pyproject.toml`:

```toml
[project]
name = "travel-shared"
version = "0.1.0"
dependencies = [
    "click>=8.1.0",
    "rich>=13.0.0",
    "pydantic>=2.0.0",
    "pyyaml>=6.0",
    "python-dotenv>=1.0.0",
    "requests>=2.31.0",
    "tenacity>=8.0.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0.0",
    "pytest-mock>=3.11.0",
    "ruff>=0.1.0",
]

[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"
```

Create `tools/shared/src/shared/db.py`:

```python
import sqlite3
import os
from contextlib import contextmanager
from typing import List, Dict, Any

class TravelDB:
    def __init__(self, db_path: str = None):
        self.db_path = db_path or os.path.expanduser(
            os.getenv('TRAVEL_DB', '~/travel-planning/data/travel.db')
        )

    @contextmanager
    def transaction(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()

    def execute(self, query: str, params: List[Any] = None) -> List[Dict]:
        with self.transaction() as conn:
            cursor = conn.execute(query, params or [])
            return [dict(row) for row in cursor.fetchall()]

    def execute_one(self, query: str, params: List[Any] = None) -> Dict:
        results = self.execute(query, params)
        return results[0] if results else None
```

Create `tools/shared/src/shared/api_clients.py`:

```python
import os
import requests
from tenacity import retry, stop_after_attempt, wait_exponential

class SerpApiClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv('SERPAPI_KEY')
        self.base_url = 'https://serpapi.com/search'

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10)
    )
    def search_flights(self, origin: str, destination: str,
                      outbound_date: str = None) -> dict:
        params = {
            'engine': 'google_flights',
            'departure_id': origin,
            'arrival_id': destination,
            'currency': 'USD',
            'hl': 'en',
            'api_key': self.api_key
        }

        if outbound_date:
            params['outbound_date'] = outbound_date

        response = requests.get(self.base_url, params=params)
        response.raise_for_status()
        return response.json()
```

Install:

```bash
cd ~/travel-planning/tools/shared
pip install -e ".[dev]"
```

---

## Phase 2: Price Tracker Tool (2-3 hours)

### Step 3: Build Price Tracker

Create `tools/price-tracker/pyproject.toml`:

```toml
[project]
name = "price-tracker"
version = "0.1.0"
dependencies = [
    "travel-shared",
]

[project.scripts]
price-tracker = "price_tracker.__main__:cli"
```

Create `tools/price-tracker/src/price_tracker/__main__.py`:

```python
import click
from rich.console import Console
from shared.db import TravelDB
from shared.api_clients import SerpApiClient
from datetime import datetime

console = Console()

@click.group()
def cli():
    """Flight price tracker"""
    pass

@cli.command()
@click.option('--route-id', required=True, type=int)
@click.option('--json', 'output_json', is_flag=True)
def check(route_id: int, output_json: bool):
    """Check current price for a route"""
    db = TravelDB()
    api = SerpApiClient()

    # Get route
    route = db.execute_one(
        "SELECT * FROM flight_routes WHERE id = ?",
        [route_id]
    )

    if not route:
        console.print(f"[red]Route {route_id} not found[/]")
        return

    # Fetch price
    result = api.search_flights(route['origin'], route['destination'])

    # Extract best price
    best_flight = result['best_flights'][0] if result.get('best_flights') else None

    if not best_flight:
        console.print("[yellow]No flights found[/]")
        return

    price = best_flight['price']
    airline = best_flight['flights'][0]['airline']

    # Store in database
    db.execute("""
        INSERT INTO price_history
        (route_id, price, airline, data_source, scraped_at)
        VALUES (?, ?, ?, ?, ?)
    """, [route_id, price, airline, 'serpapi', datetime.now()])

    if output_json:
        import json
        print(json.dumps({'price': price, 'airline': airline}))
    else:
        console.print(f"[green]✅ Price: ${price} ({airline})[/]")

if __name__ == '__main__':
    cli()
```

Install:

```bash
cd ~/travel-planning/tools/price-tracker
pip install -e .
```

### Step 4: Build Route Manager

Create `tools/route-manager/src/route_manager/__main__.py`:

```python
import click
from rich.console import Console
from rich.table import Table
from shared.db import TravelDB

console = Console()

@click.group()
def cli():
    """Manage monitored routes"""
    pass

@cli.command()
@click.option('--origin', required=True)
@click.option('--dest', required=True)
@click.option('--class', 'travel_class', default='economy')
def add(origin: str, dest: str, travel_class: str):
    """Add route to monitor"""
    db = TravelDB()

    db.execute("""
        INSERT INTO flight_routes (origin, destination, travel_class)
        VALUES (?, ?, ?)
    """, [origin, dest, travel_class])

    console.print(f"[green]✅ Added route: {origin} → {dest}[/]")

@cli.command()
def list():
    """List all monitored routes"""
    db = TravelDB()
    routes = db.execute("SELECT * FROM flight_routes WHERE active = 1")

    table = Table(show_header=True)
    table.add_column("ID")
    table.add_column("Route")
    table.add_column("Class")
    table.add_column("Priority")

    for route in routes:
        table.add_row(
            str(route['id']),
            f"{route['origin']} → {route['destination']}",
            route['travel_class'],
            str(route['priority'])
        )

    console.print(table)

if __name__ == '__main__':
    cli()
```

Install:

```bash
cd ~/travel-planning/tools/route-manager
pip install -e .
```

---

## Phase 3: Test End-to-End (30 min)

```bash
# Add route
route-manager add --origin JFK --dest NRT

# Check price
price-tracker check --route-id 1

# Verify in database
sqlite3 ~/travel-planning/data/travel.db "SELECT * FROM price_history;"
```

---

## Phase 4: n8n Automation (1-2 hours)

### Step 5: Create n8n Workflow

1. Access n8n UI: `http://your-vps-ip:5678`
2. Create new workflow
3. Add nodes:
   - **Schedule Trigger** (every 6 hours)
   - **Code Node** (get active routes from DB)
   - **HTTP Request** (call price-tracker)
   - **IF Node** (deal detected?)
   - **Telegram** (send notification)

4. Export as `workflows/flight-price-monitor.json`
5. Commit to git

---

## Phase 5: Telegram Notifier (1 hour)

Create `tools/deal-notifier/src/deal_notifier/__main__.py`:

```python
import click
import requests
import os
from shared.db import TravelDB

@click.command()
@click.option('--route-id', required=True, type=int)
def send(route_id: int):
    """Send deal notification"""
    db = TravelDB()

    # Get latest deal
    deal = db.execute_one("""
        SELECT d.*, r.origin, r.destination, ph.airline
        FROM deals d
        JOIN flight_routes r ON d.route_id = r.id
        JOIN price_history ph ON d.price_history_id = ph.id
        WHERE d.route_id = ? AND d.notified_at IS NULL
        ORDER BY d.detected_at DESC LIMIT 1
    """, [route_id])

    if not deal:
        return

    # Send Telegram message
    message = (
        f"🎯 Deal Alert!\n\n"
        f"Route: {deal['origin']} → {deal['destination']}\n"
        f"Price: ${deal['actual_price']:.0f}\n"
        f"Savings: ${deal['savings_amount']:.0f} ({deal['savings_percent']:.0f}%)\n"
        f"Airline: {deal['airline']}"
    )

    requests.post(
        f"https://api.telegram.org/bot{os.getenv('TELEGRAM_BOT_TOKEN')}/sendMessage",
        json={
            'chat_id': os.getenv('TELEGRAM_CHAT_ID'),
            'text': message
        }
    )

    # Mark as notified
    db.execute(
        "UPDATE deals SET notified_at = CURRENT_TIMESTAMP WHERE id = ?",
        [deal['id']]
    )

if __name__ == '__main__':
    send()
```

---

## Phase 6: Claude Integration (2-3 hours)

Create MCP server in `tools/claude-travel/src/mcp_server.py`:

```python
from claude_agent_sdk import create_sdk_mcp_server, tool
from shared.db import TravelDB

@tool
def search_flights(origin: str, destination: str) -> dict:
    """Search historical flight prices"""
    db = TravelDB()
    history = db.execute("""
        SELECT AVG(price) as avg_price, MIN(price) as min_price
        FROM price_history ph
        JOIN flight_routes r ON ph.route_id = r.id
        WHERE r.origin = ? AND r.destination = ?
        AND ph.scraped_at >= datetime('now', '-90 days')
    """, [origin, destination])

    return history[0] if history else {}

def create_travel_mcp_server():
    return create_sdk_mcp_server(
        name="travel-planning",
        tools=[search_flights]
    )
```

---

## Quick Commands Reference

```bash
# Add route
route-manager add --origin JFK --dest NRT

# Check price manually
price-tracker check --route-id 1

# List routes
route-manager list

# View deals
sqlite3 ~/travel-planning/data/travel.db "SELECT * FROM deals WHERE clicked = 0;"

# Test Telegram
deal-notifier send --route-id 1
```

---

## Implementation Priority

### Week 1: MVP

1. ✅ Database schema
2. ✅ Shared utilities
3. ✅ Price tracker
4. ✅ Route manager
5. ✅ Manual testing

### Week 2: Automation

1. n8n workflow
2. Telegram notifier
3. Deal detection logic
4. Daily digest

### Week 3: Claude

1. MCP server
2. Claude integration
3. Trip planning
4. Expense tracking

---

## Architecture Summary

```text
User → route-manager (add routes)
  ↓
n8n (scheduled) → price-tracker → SQLite
  ↓
Deal detected? → deal-notifier → Telegram
  ↓
Claude sessions → MCP tools → SQLite → Planning
```

---

## Notes

- Start with 1 route to avoid API limits
- Test each phase before moving on
- Backup database daily: `cp data/travel.db data/travel-$(date +%Y%m%d).db`
- Monitor SerpApi quota: 100 searches/month
