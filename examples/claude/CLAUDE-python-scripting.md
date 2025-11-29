# Instagram Automation

7 Python CLI tools + n8n workflows. Automate Instagram content management.

**Stack:** Python 3.12, Click, mise, pytest, anthropic, n8n
**Goal:** 10hrs/week → 4hrs/week

---

## Structure

```
/tools/          # 7 CLI tools (caption-generator, style-analyzer, performance-analyzer,
                 # trend-monitor, engagement-assistant, post-scheduler, content-idea-generator)
/shared/         # claude_client.py, instagram_client.py, utils.py
/workflows/      # n8n JSON exports
/data/           # profiles, metrics, content
```

Each tool: own pyproject.toml, mise.toml

---

## Workflow

### Before Coding

1. ASK questions (95% confidence)
2. Check shared/ patterns
3. Plan + approve
4. TDD: tests FIRST

### Plan Mode

Use for multi-tool changes, new features

---

## Python

### Style

- ruff format + lint
- Type hints required
- Line length: 100
- Python 3.12+ features ok

### CLI

- Click framework
- JSON output for n8n
- Exit: 0 success, 1 error

### Error Handling

```python
try:
    response = client.messages.create(...)
except anthropic.APIError as e:
    logger.error(f"Claude API failed: {e}")
    click.echo(f"Error: {e}", err=True)
    sys.exit(1)
```

### Testing

- pytest, TDD
- 80%+ coverage
- ALWAYS mock APIs (Claude, Instagram, Google Vision)
- fixtures in tests/fixtures/

```python
def test_generate_captions_returns_list():
    tags = ["mountain", "sunrise"]
    result = generate_captions(tags=tags, content_type="image")
    assert isinstance(result["captions"], list)
    assert len(result["captions"]) >= 3
```

---

## Simplicity

### NEVER

- Premature optimization
- Code "just in case" (YAGNI)
- Over-abstract simple CLI tools
- Complex hierarchies
- >100 lines in one response
- Placeholders `# ... rest of code ...`

### ALWAYS

- Simplest solution
- 3 similar lines > abstraction
- Reuse shared/ (check before creating)
- Complete code

### Check Before Implementing

1. Simpler way?
2. shared/ has it?
3. Abstractions needed NOW?
4. Minimal change?

If unsure: STOP, ask.

### Drift Threats

- CLI: parse → logic → output. No middleware/frameworks.
- API clients: extend shared/, don't create new

---

## Code Generation

### ALWAYS

- TDD: test → implement → green
- 20-50 line increments
- Check shared/ first

### NEVER

- Entire files
- Skip tests
- Big changes at once
- Unrelated modifications

---

## Commands

```bash
# Each tool
cd tools/caption-generator
mise install
mise run pip install -e ".[dev]"
mise run python -m caption_gen --help
mise run pytest
mise run pytest --cov=src tests/
mise run ruff check . && ruff format .

# n8n
docker run -d --name n8n -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v ~/sideprojects/instagram-growth:/projects \
  n8nio/n8n
open http://localhost:5678
```

### Git

- Branch: `feat/tool-description`, `fix/tool-issue`
- Conventional commits
- Always: `-s -S`

---

## n8n Patterns

### Standard Workflow

```
Trigger → Execute Command → Parse JSON → Notify → Error Handler
```

### Command Example

```bash
cd /projects/tools/caption-generator && \
mise run python -m caption_gen generate \
  --image {{ $json.image_path }} \
  --style-profile /projects/data/profiles/marcin.json \
  --output /projects/data/captions/{{ $json.filename }}.json
```

### Rules

- Python outputs JSON
- Exit code 1 = error
- Test CLI standalone first
- Absolute paths

---

## Shared Utils

**Location:** `/shared/` (proper Python package with `__init__.py`)

```python
from shared.claude_client import ClaudeClient
from shared.instagram_client import InstagramClient
```

**Check before creating new helpers.**

### .env (NOT committed)

```bash
ANTHROPIC_API_KEY=sk-ant-...
INSTAGRAM_ACCESS_TOKEN=...
DATA_DIR=/Users/marcin.skalski@konghq.com/sideprojects/instagram-growth/data
```

---

## Instagram Domain

### Rate Limits

- Instagram: 200 calls/hour
- Cache when possible

### Content Types

- Image, Carousel (2-10), Reel
- Different caption/hashtag strategies

### Metrics

- Engagement: (likes + comments) / followers
- Reach, impressions, posting times, hashtags

### Brand

- Primary: brand partnerships (pro photography)
- Secondary: clients, audience
- Style: landscape/nature

### Tool Flow

style-analyzer → profile JSON → caption-generator
performance-analyzer → metrics → content-idea-generator → post-scheduler

### Gotchas

- Instagram tokens expire (90 days)
- Claude rate limits
- Google Vision: 1k images/month free
- n8n: absolute paths

---

## Testing

**Unit:** Mock all APIs
**Integration:** Mock APIs, test tool integration
**E2E:** Full n8n workflow

**No real API calls** (cost + limits)

---

## Performance

### Claude API

- Batch operations
- Cache profiles (monthly)
- Efficient prompts
- Monitor usage

### Instagram API

- Respect limits
- Batch fetch (50/call)
- Cache metrics (daily)

### Local

- Optimize only if >10s
- Profile first

---

## Security

- .env in .gitignore
- Keys in env only
- Instagram: read-only preferred
- Validate CLI inputs
- Redact tokens in logs

---

## Resources

- [Project plan](plans/instagram-automation-projects.md)
- [Growth strategy](growth-strategy.md)
- <https://docs.n8n.io>
- <https://developers.facebook.com/docs/instagram-api>
- <https://docs.anthropic.com/>

---

## Implementation

1. shared/ first (claude_client, instagram_client)
2. caption-generator (proves approach)
3. One tool at a time
4. n8n after Python works
5. 80%+ coverage, commit workflow JSONs
