---
name: quick-research
description: Quick web research with source citations. Use when user asks for brief research, fact-checking, quick lookups, or wants concise answers with sources on any topic.
argument-hint: [topic]
allowed-tools: WebSearch, WebFetch, Read
user-invocable: true
---

# Quick Research: $ARGUMENTS

## Rules

- Base answers ONLY on sources you find/read
- Cite source for each claim: [Source: URL]
- If unsure → say "not confirmed"
- No gap-filling with assumptions

---

## Process

### 1. Search & Read

Find 2-3 relevant sources. For each:

- **Source:** [URL]
- **Key info:** [relevant facts]

### 2. Synthesize

Answer using ONLY extracted info. Be practical, include code examples if applicable.

### 3. Quick Verify

- [ ] Every claim traceable to source?
- [ ] Code examples from docs/tested?
- [ ] Gaps acknowledged?

<!-- justify: I16 WebSearch is used in Phase 1 to find 2-3 relevant sources before WebFetch reads them -->

<example>
User: /quick-research postgres connection pooling defaults

Phase 1 (Search & Read):

- Source: <https://www.postgresql.org/docs/current/runtime-config-connection.html>
  Key info: max_connections default = 100
- Source: <https://wiki.postgresql.org/wiki/Number_Of_Database_Connections>
  Key info: recommended pool size = ((core_count * 2) + effective_spindle_count)

Phase 2 (Synthesize): Postgres ships with max_connections=100 [Source: postgresql.org/docs]. Recommended pool size formula is (cores * 2 + spindles) [Source: wiki.postgresql.org].

Phase 3 (Verify): all claims cited, no gaps.
</example>

---

## Output

### Answer

[Concise answer with inline citations]

### Config/Code (if applicable)

```text
# Source: [URL]
[code]
```

### Sources

- [Source 1](URL) - used for: [what]
- [Source 2](URL) - used for: [what]

### Not Covered

[What couldn't be found / needs verification]
