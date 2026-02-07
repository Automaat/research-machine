# State Management Pattern

For recurring skills that track history.

---

## State Files

```text
./findings/{skill-name}/
├── .last-run         # YYYY-MM-DD
├── .covered-items    # One ID/URL per line
└── [outputs]
```

---

## .last-run

Single line: `2026-01-29`

**Usage:**
- Exists → date range from last run to today
- Missing → default past 7 days

---

## .covered-items

One identifier per line (URLs, IDs).

**Usage:**
- Filter new items against list
- Append new items after success
- Keep last 500 lines (cleanup)

---

## Update Rules

1. Update only on success
2. Update at end (after output written)
3. Verify state updated

```markdown
### Phase 5: Output

5a. Write output
5b. Update .last-run → today
5c. Append to .covered-items
5d. Verify state files exist
```

---

## First Run

```markdown
### Phase 1: Setup

- .last-run missing → past 7 days
- .covered-items missing → empty list
```
