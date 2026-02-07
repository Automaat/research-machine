# Python Integration Template

**Use only when Python provides clear value over Claude's native capabilities.**

---

## When Python IS Warranted

- External API calls with auth/pagination
- Complex computation or data transformation
- Binary format parsing
- Rate limiting logic

## When Python is NOT Needed

- Web searches → use WebSearch tool
- Simple text processing → Claude handles directly
- File read/write → use Read/Write tools
- JSON manipulation → Claude handles directly

---

## Script Structure

```text
.claude/skills/{skill-name}/
├── SKILL.md
└── scripts/
    ├── pyproject.toml
    ├── {script}.py
    └── uv.lock
```

## SKILL.md Additions

Add to frontmatter:

```yaml
allowed-tools: Bash(uv run *)
```

Add workflow phase:

```markdown
### Phase N: {Process with Script}

Execute script (DO NOT load into context):

\`\`\`bash
cd .claude/skills/{skill-name}/scripts && uv run python {script}.py --input "{input}"
\`\`\`

Parse JSON output:
- Extract {field1}
- Extract {field2}
- Handle errors from "error" field if present
```

## pyproject.toml Template

```toml
[project]
name = "{skill-name}-scripts"
version = "0.1.0"
requires-python = ">=3.14"
dependencies = [
    # Add only what's needed
    # "httpx",        # HTTP client
    # "pydantic",     # Data validation
]

[tool.uv]
dev-dependencies = []
```

## Script Template

```python
#!/usr/bin/env python3
"""{Brief description of what script does.}"""

import argparse
import json
import sys
from typing import Any


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, help="Input data or path")
    # Add more arguments as needed
    args = parser.parse_args()

    try:
        result = process(args.input)
        output: dict[str, Any] = {"status": "ok", "data": result}
    except Exception as e:
        output = {"status": "error", "error": str(e)}
        print(json.dumps(output), file=sys.stderr)
        sys.exit(1)

    # Always output JSON for Claude to parse
    print(json.dumps(output, indent=2))


def process(input_data: str) -> Any:
    """Main processing logic."""
    # TODO: Implement actual logic
    return {"processed": input_data}


if __name__ == "__main__":
    main()
```

## Key Principles

1. **JSON output** — Always return JSON for Claude to parse
2. **Error handling** — Return structured errors, non-zero exit
3. **No context loading** — Execute script directly, never read into conversation
4. **Minimal deps** — Only add dependencies that provide clear value
5. **Type hints** — Modern Python 3.14+ syntax
