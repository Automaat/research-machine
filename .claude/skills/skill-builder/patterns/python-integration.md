# Python Integration Pattern

**Use only when Python adds clear value.**

---

## When Warranted

- External API calls with auth/pagination
- Complex computation
- Binary format parsing
- Rate limiting logic

## When NOT Needed

- Web searches → WebSearch tool
- Simple text → Claude handles
- File ops → Read/Write tools
- JSON → Claude handles

---

## Structure

```text
scripts/
├── pyproject.toml
├── script.py
└── uv.lock
```

---

## Frontmatter

```yaml
allowed-tools: Bash(uv run *)
```

---

## Invocation

```markdown
### Phase N: Process

Execute (DO NOT load script into context):

\`\`\`bash
cd .claude/skills/{skill}/scripts && uv run python script.py --input "..."
\`\`\`

Parse JSON output.
```

---

## Script Pattern

```python
#!/usr/bin/env python3
import argparse
import json
import sys

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    args = parser.parse_args()

    try:
        result = process(args.input)
        print(json.dumps({"status": "ok", "data": result}))
    except Exception as e:
        print(json.dumps({"status": "error", "error": str(e)}), file=sys.stderr)
        sys.exit(1)

def process(data: str):
    return {"processed": data}

if __name__ == "__main__":
    main()
```

---

## Principles

1. JSON output always
2. Structured errors
3. Never read script into context
4. Minimal deps
5. Python 3.14+ syntax
