# Skill Development Guidelines

Best practices for creating Claude Code skills.

---

## Skill Structure

```text
.claude/skills/[skill-name]/
├── SKILL.md              # Required: Main skill definition
├── output-template.md    # Optional: Output format specification
├── sources.md            # Optional: Data sources, URLs, search patterns
├── checklist.md          # Optional: Quality verification
├── [knowledge].md        # Optional: Domain knowledge bases
└── scripts/              # Optional: Python scripts (only when needed)
    ├── pyproject.toml
    ├── [script].py
    └── uv.lock
```

---

## SKILL.md Format

### Required Frontmatter

```yaml
---
name: skill-name
description: One-line description of what skill does
argument-hint: "[required-arg] [--optional flag]"
allowed-tools: Tool1, Tool2, Tool3
user-invocable: true  # If callable via /skill-name
---
```

### Recommended Sections

1. **Header** — Brief description, default behavior
2. **Arguments** — Parse from `$ARGUMENTS`
3. **Workflow** — Numbered phases with clear steps
4. **Output Requirements** — Format, conventions
5. **Error Handling** — Graceful degradation
6. **Quality Checklist** — Pre-output verification

---

## Phase Workflow Pattern

Structure complex skills as numbered phases:

```markdown
## Workflow

### Phase 1: Setup
- Read supporting files
- Parse arguments
- Check state files

### Phase 2: Research/Gather
- Execute searches
- Collect data

### Phase 3: Process
- Synthesize information
- Apply transformations

### Phase 4: Verify
- Run quality checks
- Validate output

### Phase 5: Output
- Generate formatted result
- Save to locations
- Update state files
```

**Benefits:**

- Clear execution order
- Easy to skip phases conditionally
- Debugging clarity

---

## State Management

For skills that run repeatedly:

### Last Run Tracking

```text
./findings/[skill-name]/.last-run
```

Format: `YYYY-MM-DD` (single line)

### Incremental Discovery

```text
./findings/[skill-name]/.covered-items
```

Format: One identifier per line (URLs, IDs, etc.)

**Pattern:**

1. Read state at start
2. Filter against already-processed items
3. Update state only on successful completion

---

## Supporting Files

### output-template.md

Define exact output structure:

```markdown
# Output Template

## Header
**Date:** {date}
**Focus:** {focus}

## Section 1: {category}
- **[Title]** — Summary [Source: URL]

## Section 2: {category}
...
```

### sources.md

List data sources and search patterns:

```markdown
# Sources

## Primary Sources
- site:example.com — Description
- site:another.com — Description

## Search Patterns
- "{topic} {date_range}"
- "site:specific.com {query}"
```

### Knowledge Bases

Domain-specific reference files:

```markdown
# [Domain] Knowledge Base

## Key Concepts
- Concept 1: Definition
- Concept 2: Definition

## Reference Data
| Item | Value |
|------|-------|
| ... | ... |
```

---

## Python Integration (Optional)

**Use Python ONLY when:**

- External API calls required
- Complex data transformation
- Computation Claude can't do directly
- Parsing binary/structured formats

**DO NOT use Python for:**

- Simple text processing
- Web searches (use WebSearch tool)
- File operations (use Read/Write tools)
- Anything Claude can do natively

### When Python IS Needed

```text
scripts/
├── pyproject.toml    # Dependencies via uv
├── [script].py       # CLI script
└── uv.lock           # Locked deps
```

**pyproject.toml:**

```toml
[project]
name = "skill-scripts"
version = "0.1.0"
requires-python = ">=3.14"
dependencies = [
    "httpx",      # Only what's needed
]

[tool.uv]
dev-dependencies = []
```

**Script Pattern:**

```python
#!/usr/bin/env python3
"""Brief description."""

import argparse
import json
import sys

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    args = parser.parse_args()

    # Process...
    result = {"status": "ok", "data": [...]}

    # Always output JSON for Claude to parse
    print(json.dumps(result))

if __name__ == "__main__":
    main()
```

**SKILL.md frontmatter:**

```yaml
allowed-tools: Bash(uv run *)
```

**Invocation in workflow:**

```markdown
### Phase N: Process Data

Run script (DO NOT read script into context):

```bash
cd .claude/skills/[skill-name]/scripts && uv run python script.py --input "..."
```

Parse JSON output and continue.

```

---

## Quality Standards

### Verification Checklist

Before considering skill complete:

- [ ] No placeholders or TODOs
- [ ] All phases have concrete steps
- [ ] Error handling defined
- [ ] Output format specified
- [ ] State management if recurring
- [ ] Arguments documented

### Concrete Over Generic

**Good:**
```markdown
Search pattern: `site:arxiv.org LLM {date_range}`
```

**Bad:**

```markdown
Search relevant sources for the topic.
```

### Self-Contained

- No references to external docs without URLs
- Complete instructions in SKILL.md
- Examples show actual usage

---

## Anti-Patterns

**AVOID:**

- ❌ Python scripts for simple tasks
- ❌ Loading scripts into context (execute directly)
- ❌ Generic "research the topic" instructions
- ❌ Missing error handling
- ❌ State files without cleanup strategy
- ❌ Placeholders ("TODO: add sources")
- ❌ Over-complicated workflows for simple tasks

---

## Examples

### Simple Skill (No Python)

See: `ai-daily-digest/SKILL.md`

- Web research with WebSearch
- State management with files
- Clear phase workflow

### Research Skill with Sub-Agents

See: `recipe-research/SKILL.md`

- Multi-source aggregation
- Verification sub-agent
- Structured output

### Question-Driven Generation

See: `claude-md-gen/SKILL.md`

- Type detection logic
- Targeted questions
- Template-based output
