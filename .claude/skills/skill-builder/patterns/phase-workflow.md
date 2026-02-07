# Phase Workflow Pattern

Structure complex skills as numbered phases.

---

## Structure

```markdown
## Workflow

### Phase 1: Setup
{Init, parse args, load state}

### Phase 2: Gather
{Data collection, research}

### Phase 3: Process
{Transform, synthesize}

### Phase 4: Verify
{Quality checks}

### Phase 5: Output
{Format, save, update state}
```

---

## Benefits

- Clear execution order
- Conditional skipping
- Easy debugging
- Extensible

---

## Guidelines

| Phase | Purpose |
|-------|---------|
| Setup | Parse args, read files, load state |
| Gather | WebSearch, WebFetch, Read |
| Process | Dedupe, synthesize, transform |
| Verify | Quality checklist, validation |
| Output | Format, write, update state |

---

## Conditional Execution

```markdown
### Phase 2: Research

**Skip if:** `--offline` flag

{steps}
```

---

## Sub-Phases

```markdown
### Phase 3: Process

**3a. Deduplicate**
**3b. Synthesize**
**3c. Rank**
```
