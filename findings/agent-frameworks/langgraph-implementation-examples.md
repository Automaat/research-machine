# LangGraph Implementation Examples & Code

**Date:** 2025-12-04
**Companion to:** [langgraph-vs-alternatives-2025.md](langgraph-vs-alternatives-2025.md)
**Purpose:** Implementation details, code examples, detailed explanations

---

## LangGraph Architecture Example

### Complete PR Review Agent

```python
from typing import TypedDict, List, Dict
from langgraph.graph import StateGraph
from langgraph.checkpoint.postgres import AsyncPostgresSaver
from langchain_anthropic import ChatAnthropic

# State definition
class PRReviewState(TypedDict):
    pr_url: str
    owner: str
    repo: str
    pr_number: int
    unresolved_threads: List[ReviewComment]
    categorized_fixes: Dict[str, List[Fix]]  # valid/invalid/questionable
    user_decisions: Dict[str, bool]
    applied_fixes: List[Fix]
    messages: List[Message]

# Phase 1: Fetch & Analyze
def fetch_and_analyze(state: PRReviewState) -> PRReviewState:
    """
    Extract PR info, fetch unresolved review threads via gh CLI,
    perform chain-of-thought analysis on each comment.
    """
    # Parse PR URL
    owner = extract_owner(state["pr_url"])
    repo = extract_repo(state["pr_url"])
    pr_num = extract_pr_number(state["pr_url"])

    # Fetch unresolved threads via gh CLI
    threads = fetch_unresolved_threads(owner, repo, pr_num)

    # Perform CoT analysis on each thread
    analyzed_threads = []
    for thread in threads:
        analysis = analyze_comment_with_cot(thread)
        analyzed_threads.append(analysis)

    return {
        **state,
        "owner": owner,
        "repo": repo,
        "pr_number": pr_num,
        "unresolved_threads": analyzed_threads
    }

# Phase 2: Categorize
def categorize_comments(state: PRReviewState) -> PRReviewState:
    """
    Classify each comment as valid/invalid/questionable based on:
    - Technical correctness
    - Code existence in diff
    - Codebase patterns
    - Defensive code checks
    """
    categorized = {
        "valid": [],
        "invalid": [],
        "questionable": []
    }

    for thread in state["unresolved_threads"]:
        category = categorize_single_comment(
            thread,
            state["owner"],
            state["repo"]
        )
        categorized[category].append(thread)

    return {
        **state,
        "categorized_fixes": categorized
    }

# Phase 3: Get User Decisions (HITL)
def request_user_decisions(state: PRReviewState) -> PRReviewState:
    """
    Use LangGraph's interrupt() to pause execution
    and get user approval for questionable comments.
    """
    from langgraph.checkpoint import interrupt

    questionable = state["categorized_fixes"]["questionable"]

    if questionable:
        # Present questionable comments to user
        decisions = interrupt(
            {
                "questionable_comments": questionable,
                "prompt": "Review questionable comments and approve/reject each"
            }
        )

        # Resume execution with user decisions
        return {
            **state,
            "user_decisions": decisions
        }

    return state

# Phase 4: Apply Fixes
def apply_fixes(state: PRReviewState) -> PRReviewState:
    """
    Apply all valid fixes + approved questionable fixes.
    Use Edit tool for file modifications.
    """
    fixes_to_apply = state["categorized_fixes"]["valid"]

    # Add approved questionable fixes
    for comment_id, approved in state.get("user_decisions", {}).items():
        if approved:
            comment = find_comment_by_id(
                state["categorized_fixes"]["questionable"],
                comment_id
            )
            fixes_to_apply.append(comment)

    applied = []
    for fix in fixes_to_apply:
        result = apply_single_fix(fix)
        applied.append(result)

    return {
        **state,
        "applied_fixes": applied
    }

# Phase 5: Generate Report
def generate_report(state: PRReviewState) -> PRReviewState:
    """
    Create summary report of all actions taken.
    """
    report = {
        "total_comments": len(state["unresolved_threads"]),
        "valid_fixed": len(state["categorized_fixes"]["valid"]),
        "invalid_skipped": len(state["categorized_fixes"]["invalid"]),
        "questionable_count": len(state["categorized_fixes"]["questionable"]),
        "user_approved": sum(state.get("user_decisions", {}).values()),
        "total_applied": len(state["applied_fixes"])
    }

    print_report(report)
    return state

# Conditional routing
def route_after_categorization(state: PRReviewState) -> str:
    """
    Route to user decision node if questionable comments exist,
    otherwise skip directly to apply fixes.
    """
    if state["categorized_fixes"]["questionable"]:
        return "request_user_decisions"
    else:
        return "apply_fixes"

# Graph construction
def build_pr_review_graph():
    """
    Construct the LangGraph workflow.
    """
    workflow = StateGraph(PRReviewState)

    # Add nodes (phases)
    workflow.add_node("fetch", fetch_and_analyze)
    workflow.add_node("categorize", categorize_comments)
    workflow.add_node("get_decisions", request_user_decisions)
    workflow.add_node("apply", apply_fixes)
    workflow.add_node("report", generate_report)

    # Add edges (transitions)
    workflow.set_entry_point("fetch")
    workflow.add_edge("fetch", "categorize")
    workflow.add_conditional_edges(
        "categorize",
        route_after_categorization,
        {
            "request_user_decisions": "get_decisions",
            "apply_fixes": "apply"
        }
    )
    workflow.add_edge("get_decisions", "apply")
    workflow.add_edge("apply", "report")
    workflow.set_finish_point("report")

    return workflow

# Compile with checkpointer for persistence
def create_app():
    """
    Compile graph with PostgreSQL checkpointer for state persistence.
    """
    workflow = build_pr_review_graph()

    # Use PostgreSQL for production
    checkpointer = AsyncPostgresSaver(
        connection_string="postgresql://user:pass@localhost/db"
    )

    # Or use in-memory for development
    # from langgraph.checkpoint.memory import MemorySaver
    # checkpointer = MemorySaver()

    app = workflow.compile(checkpointer=checkpointer)
    return app

# Usage
if __name__ == "__main__":
    app = create_app()

    # Run with a thread ID for persistence
    result = app.invoke(
        {"pr_url": "https://github.com/owner/repo/pull/123"},
        config={"configurable": {"thread_id": "pr-123"}}
    )

    print(f"Applied {len(result['applied_fixes'])} fixes")
```

---

## Claude + LangGraph Integration

### Basic Setup

```python
from langchain_anthropic import ChatAnthropic
from langgraph.prebuilt import create_react_agent

# Initialize Claude
llm = ChatAnthropic(
    model="claude-sonnet-4-5-20250929",
    anthropic_api_key="sk-ant-...",
    temperature=0
)

# Quick agent with tools
agent = create_react_agent(llm, tools=[gh_tool, grep_tool, read_tool])

# Run
result = agent.invoke({"messages": [("user", "Review PR 123")]})
```

### Advanced: Claude with Custom Tools

```python
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph
from langgraph.checkpoint.postgres import AsyncPostgresSaver
from langchain.tools import tool

# Define tools
@tool
def github_api_tool(owner: str, repo: str, endpoint: str) -> str:
    """Call GitHub API endpoint."""
    import subprocess
    result = subprocess.run(
        ["gh", "api", f"repos/{owner}/{repo}/{endpoint}"],
        capture_output=True,
        text=True
    )
    return result.stdout

@tool
def grep_tool(pattern: str, path: str) -> str:
    """Search for pattern in files."""
    import subprocess
    result = subprocess.run(
        ["rg", pattern, path],
        capture_output=True,
        text=True
    )
    return result.stdout

@tool
def read_file_tool(file_path: str) -> str:
    """Read file contents."""
    with open(file_path, 'r') as f:
        return f.read()

# Create Claude model with tools
llm = ChatAnthropic(
    model="claude-sonnet-4-5-20250929",
    anthropic_api_key="sk-ant-..."
)

llm_with_tools = llm.bind_tools(
    [github_api_tool, grep_tool, read_file_tool],
    parallel_tool_calls=True  # Enable parallel execution
)

# Use in LangGraph node
def analyze_node(state):
    """Node that uses Claude with tools."""
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}

# Build graph
workflow = StateGraph(PRReviewState)
workflow.add_node("analyze", analyze_node)
# ... rest of graph

# Compile
app = workflow.compile(checkpointer=AsyncPostgresSaver(...))
```

### Prompt Caching for Cost Optimization

```python
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(
    model="claude-sonnet-4-5-20250929",
    anthropic_api_key="sk-ant-...",
    # Enable prompt caching for repeated context
    extra_headers={
        "anthropic-beta": "prompt-caching-2024-07-31"
    }
)

# Cache system prompt and file contents
messages = [
    {
        "role": "system",
        "content": [
            {
                "type": "text",
                "text": "You are a PR review assistant...",
                "cache_control": {"type": "ephemeral"}  # Cache this
            }
        ]
    },
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": f"File contents:\n{file_contents}",
                "cache_control": {"type": "ephemeral"}  # Cache this
            },
            {
                "type": "text",
                "text": "Review this code"  # Not cached
            }
        ]
    }
]

response = llm.invoke(messages)
# Subsequent calls with same cached content save 90% on those tokens
```

---

## CrewAI Alternative Implementation

### Simple Role-Based Approach

```python
from crewai import Agent, Task, Crew
from langchain_anthropic import ChatAnthropic

# Initialize Claude for CrewAI
llm = ChatAnthropic(model="claude-sonnet-4-5-20250929")

# Define agents with roles
fetcher = Agent(
    role='PR Fetcher',
    goal='Extract and fetch unresolved PR review comments',
    backstory='Expert at GitHub API and parsing PR data',
    llm=llm,
    verbose=True
)

analyzer = Agent(
    role='Code Analyzer',
    goal='Analyze review comments for validity',
    backstory='Senior engineer with deep codebase knowledge',
    llm=llm,
    verbose=True
)

fixer = Agent(
    role='Code Fixer',
    goal='Apply validated fixes to codebase',
    backstory='Expert at code refactoring and file operations',
    llm=llm,
    verbose=True
)

# Define tasks
fetch_task = Task(
    description='Fetch unresolved comments from PR {pr_url}',
    agent=fetcher,
    expected_output='List of unresolved review comments'
)

analyze_task = Task(
    description='Analyze comments for validity using codebase patterns',
    agent=analyzer,
    expected_output='Categorized list: valid/invalid/questionable',
    context=[fetch_task]  # Depends on fetch_task
)

fix_task = Task(
    description='Apply all valid fixes to codebase',
    agent=fixer,
    expected_output='Summary of applied fixes',
    context=[analyze_task]  # Depends on analyze_task
)

# Create crew
crew = Crew(
    agents=[fetcher, analyzer, fixer],
    tasks=[fetch_task, analyze_task, fix_task],
    verbose=2
)

# Run
result = crew.kickoff(inputs={'pr_url': 'https://github.com/owner/repo/pull/123'})
print(result)
```

---

## Detailed Benefit Explanations

### 1. Production-Grade Reliability

**Problem:** Long-running tasks (30+ min PR reviews) fail midway due to:

- Network timeouts
- API rate limits
- User interrupts (laptop sleep)
- Process crashes

**Slash Command Solution:**

```python
# No state persistence
def review_pr(url):
    threads = fetch_threads(url)  # Takes 5 min
    # Crash here? Start over from scratch
    analyzed = analyze_all(threads)  # Takes 20 min
    fixes = apply_fixes(analyzed)  # Takes 10 min
    return fixes
```

**LangGraph Solution:**

```python
# State persisted to PostgreSQL after each node
workflow.add_node("fetch", fetch_threads)  # Checkpoint saved
workflow.add_node("analyze", analyze_all)  # Checkpoint saved
workflow.add_node("apply", apply_fixes)    # Checkpoint saved

# Crash at any point? Resume from last checkpoint:
app.invoke(input, config={"configurable": {"thread_id": "pr-123"}})
# Automatically resumes from last saved state
```

**Real-world impact:**

- PR review interrupted for lunch → Resume exactly where left off
- API rate limit hit → Retry from checkpoint, not from beginning
- Network timeout → Resume, don't lose 20 minutes of work

---

### 2. Built-in Human-in-the-Loop

**Problem:** Need user approval for ambiguous decisions, but implementing pause/resume is complex.

**Slash Command Solution:**

```python
# 50-100 lines of boilerplate
def review_with_approval(url):
    questionable = categorize(url)["questionable"]

    if questionable:
        # Manual state management
        save_state_to_file(questionable)

        print("Review these comments:")
        for i, comment in enumerate(questionable):
            print(f"{i}: {comment}")

        # Wait for input
        decisions = input("Enter approved indices (comma-separated): ")
        approved_indices = [int(x) for x in decisions.split(",")]

        # Load state back
        state = load_state_from_file()
        # Apply approved fixes...
```

**LangGraph Solution:**

```python
# 5 lines with interrupt()
from langgraph.checkpoint import interrupt

def request_approval(state):
    if state["questionable"]:
        decisions = interrupt({
            "comments": state["questionable"],
            "prompt": "Approve fixes"
        })
        return {"user_decisions": decisions}
    return state
```

**Additional LangGraph HITL features:**

```python
# Approve/reject pattern
decisions = interrupt({"action": "approve_or_reject"})

# Edit state pattern
edited_state = interrupt({
    "current_state": state,
    "prompt": "Edit any values before continuing"
})

# Request input pattern
user_input = interrupt({"prompt": "Enter custom instructions"})

# All handled by LangSmith UI - no manual I/O
```

---

### 3. Observability & Debugging

**Problem:** Multi-step workflows fail, hard to debug which step and why.

**Slash Command Solution:**

```python
def review_pr(url):
    print("Fetching threads...")
    threads = fetch(url)
    print(f"Got {len(threads)} threads")

    print("Analyzing...")
    analyzed = analyze(threads)
    print(f"Valid: {len(analyzed['valid'])}")

    print("Applying fixes...")
    fixes = apply(analyzed)
    # Where did it fail? Why? How much did it cost?
    # No idea without adding extensive logging
```

**LangGraph + LangSmith Solution:**

```python
# Automatic tracing - no extra code needed
app = workflow.compile(checkpointer=checkpointer)
result = app.invoke(input)

# LangSmith dashboard shows:
# - Full execution graph (visual)
# - Each node: inputs, outputs, duration
# - Token usage per node
# - Cost attribution per node
# - Error stack traces with state at failure
# - Time-travel: replay from any node
```

**LangSmith Features:**

- **Execution trace:** See exact path through graph
- **Node timing:** Identify slow bottlenecks
- **Token tracking:** Find expensive LLM calls
- **Cost breakdown:** $0.05 in fetch, $0.50 in analyze, etc.
- **Error replay:** Re-run from failed node with modified state
- **A/B testing:** Compare two graph versions side-by-side

**Value:**

- Debug production issue in 5 min vs 50 min
- Optimize: "Analyze node using 80% of tokens, let's cache that"
- ROI tracking: "This workflow cost $2.50, generated $50 value"

---

### 4. Parallel Execution

**Problem:** Sequential processing wastes time when tasks are independent.

**Slash Command Solution:**

```python
# Sequential - 15 min total
def review_files(files):
    results = []
    for file in files:  # 5 files × 3 min each
        result = analyze_file(file)
        results.append(result)
    return results

# Manual parallelization - complex
import asyncio

async def review_files_parallel(files):
    tasks = [analyze_file(f) for f in files]
    results = await asyncio.gather(*tasks)
    # But: race conditions, error handling, retry logic all manual
    return results
```

**LangGraph Solution:**

```python
# Define parallel processing
workflow.add_node("analyze_file_1", analyze_file)
workflow.add_node("analyze_file_2", analyze_file)
workflow.add_node("analyze_file_3", analyze_file)
workflow.add_node("analyze_file_4", analyze_file)
workflow.add_node("analyze_file_5", analyze_file)
workflow.add_node("merge_results", merge)

# Fan-out to parallel nodes
workflow.add_edge("fetch_files", "analyze_file_1")
workflow.add_edge("fetch_files", "analyze_file_2")
workflow.add_edge("fetch_files", "analyze_file_3")
workflow.add_edge("fetch_files", "analyze_file_4")
workflow.add_edge("fetch_files", "analyze_file_5")

# Fan-in from parallel nodes (barrier synchronization)
workflow.add_edge("analyze_file_1", "merge_results")
workflow.add_edge("analyze_file_2", "merge_results")
workflow.add_edge("analyze_file_3", "merge_results")
workflow.add_edge("analyze_file_4", "merge_results")
workflow.add_edge("analyze_file_5", "merge_results")

# Runs in 3 min instead of 15 min
# Automatic: barrier sync, error collection, partial results
```

---

## Cost Calculation Details

### Scenario: 10 Unresolved Comments PR

**Token Usage Breakdown:**

```python
# Per comment analysis
system_prompt = 500 tokens  # Cached after first use
file_context = 1000 tokens  # Cached (same file)
diff_hunk = 200 tokens      # Unique per comment
comment_text = 100 tokens   # Unique per comment
output_analysis = 500 tokens # Response

# First comment: 500 + 1000 + 200 + 100 = 1800 input, 500 output
# Cost: (1800 × $3/M) + (500 × $15/M) = $0.0054 + $0.0075 = $0.0129

# Remaining 9 comments with caching:
# Cached (90% off): 500 + 1000 = 1500 tokens × $0.30/M = $0.00045
# Unique: 200 + 100 = 300 tokens × $3/M = $0.0009
# Output: 500 tokens × $15/M = $0.0075
# Per comment: $0.00045 + $0.0009 + $0.0075 = $0.00885

# Total: $0.0129 + (9 × $0.00885) = $0.0129 + $0.07965 = $0.09255
# Add fix generation (10 × 500 output tokens):
# 10 × 500 × $15/M = $0.075

# Grand total: $0.09255 + $0.075 = $0.168 per PR
```

**With Aggressive Caching:**

```python
# Cache entire codebase patterns, style guide, common patterns
# Reduces to ~$0.081/PR as shown in main doc
```

**Monthly Costs:**

| PRs/Month | Slash Cmd | LangGraph (Self) | LangGraph (Hosted) |
|-----------|-----------|------------------|---------------------|
| 10 | $0.81 | $0.84 | $0.86 |
| 50 | $4.05 | $4.20 | $4.30 |
| 100 | $8.10 | $8.40 | $8.60 |
| 500 | $40.50 | $42.00 | $43.00 |

**Infrastructure Costs:**

- PostgreSQL (Supabase free tier): $0
- PostgreSQL (AWS RDS t3.micro): $15/month
- Python hosting (Fly.io): $5/month
- **Total:** $0-20/month fixed cost

---

## Testing Strategy

### Unit Testing Nodes

```python
import pytest
from your_agent import fetch_and_analyze, categorize_comments

def test_fetch_and_analyze():
    """Test fetch node in isolation."""
    state = {
        "pr_url": "https://github.com/owner/repo/pull/123"
    }

    result = fetch_and_analyze(state)

    assert result["owner"] == "owner"
    assert result["repo"] == "repo"
    assert result["pr_number"] == 123
    assert len(result["unresolved_threads"]) > 0

def test_categorize_comments():
    """Test categorization logic."""
    state = {
        "unresolved_threads": [
            {"comment": "Add nil check", "valid": True},
            {"comment": "Add type hints", "valid": False}  # Already has them
        ]
    }

    result = categorize_comments(state)

    assert len(result["categorized_fixes"]["valid"]) == 1
    assert len(result["categorized_fixes"]["invalid"]) == 1
```

### Integration Testing

```python
from langgraph.checkpoint.memory import MemorySaver

def test_full_workflow():
    """Test entire graph end-to-end."""
    app = create_app()

    # Use in-memory checkpointer for tests
    test_app = workflow.compile(checkpointer=MemorySaver())

    result = test_app.invoke(
        {"pr_url": "https://github.com/test/repo/pull/1"},
        config={"configurable": {"thread_id": "test-1"}}
    )

    assert len(result["applied_fixes"]) > 0
    assert result["categorized_fixes"] is not None
```

---

## Deployment Options

### 1. Local Development

```bash
# Install dependencies
pip install langgraph langchain-anthropic psycopg2-binary

# Run locally
python pr_review_agent.py --pr-url "https://github.com/owner/repo/pull/123"
```

### 2. Docker Container

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "pr_review_agent.py"]
```

### 3. Cloud Deployment (Fly.io)

```toml
# fly.toml
app = "pr-review-agent"

[build]
  dockerfile = "Dockerfile"

[env]
  ANTHROPIC_API_KEY = "sk-ant-..."
  DATABASE_URL = "postgresql://..."

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    port = 80
```

```bash
fly deploy
```

### 4. Serverless (AWS Lambda)

```python
# lambda_handler.py
import json
from your_agent import create_app

app = create_app()

def lambda_handler(event, context):
    """AWS Lambda entry point."""
    pr_url = event.get('pr_url')

    result = app.invoke(
        {"pr_url": pr_url},
        config={"configurable": {"thread_id": f"lambda-{context.request_id}"}}
    )

    return {
        'statusCode': 200,
        'body': json.dumps({
            'applied_fixes': len(result['applied_fixes']),
            'report': result['report']
        })
    }
```

---

## Monitoring & Observability

### LangSmith Setup

```python
import os
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "ls-..."
os.environ["LANGCHAIN_PROJECT"] = "pr-review-agent"

# All runs automatically traced to LangSmith
app = create_app()
result = app.invoke(input)
# View in https://smith.langchain.com/
```

### Custom Metrics

```python
from prometheus_client import Counter, Histogram

# Define metrics
pr_reviews_total = Counter('pr_reviews_total', 'Total PR reviews')
pr_review_duration = Histogram('pr_review_duration_seconds', 'PR review duration')
fixes_applied_total = Counter('fixes_applied_total', 'Total fixes applied')

# Track in nodes
def apply_fixes(state):
    with pr_review_duration.time():
        fixes = do_apply_fixes(state)
        fixes_applied_total.inc(len(fixes))
        pr_reviews_total.inc()
        return {"applied_fixes": fixes}
```

---

## Additional Resources

### Official Documentation

- [LangGraph Docs](https://python.langchain.com/docs/langgraph)
- [ChatAnthropic API Reference](https://python.langchain.com/api_reference/anthropic/chat_models/langchain_anthropic.chat_models.ChatAnthropic.html)
- [LangSmith Observability](https://docs.smith.langchain.com/)

### Tutorials

- [Build a ReAct Agent](https://python.langchain.com/docs/tutorials/agents/)
- [Human-in-the-Loop Patterns](https://langchain-ai.github.io/langgraph/how-tos/human_in_the_loop/)
- [Prompt Caching Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)

### Example Repositories

- [LangGraph Examples](https://github.com/langchain-ai/langgraph/tree/main/examples)
- [Production Agent Template](https://github.com/langchain-ai/langchain/tree/master/templates)
