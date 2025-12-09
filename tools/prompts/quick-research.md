# ⚡ Quick Research Prompt

> Lightweight research prompt for tool configs, quick how-tos, and small technical questions.

## 📋 The Prompt

```markdown
# Quick Research: [TOPIC]

## Rules

- Base answers ONLY on sources you find/read
- Cite source for each claim: [Source: URL or name]
- If unsure → say "not confirmed"
- No gap-filling with assumptions

## Task

[Your specific question]

## Process

### 1. Search & Read

Find 2-3 relevant sources. For each:

- **Source:** [URL/name]
- **Key info:** [bullet points of relevant facts]

### 2. Synthesize

Answer the question using ONLY extracted info.
Format: practical, actionable, with code examples if applicable.

### 3. Quick Verify

- [ ] Every claim traceable to a source?
- [ ] Code examples tested/from docs?
- [ ] Gaps acknowledged?

## Output

### Answer

[Concise answer with inline citations]

### Config/Code (if applicable)

[language]
# Source: [URL]
[code]


### Sources

- [Source 1](URL) - used for: [what]
- [Source 2](URL) - used for: [what]

### Not Covered

[What you couldn't find / user should verify]
```

---

## 🎯 Use Cases

| Task | Example |
|------|---------|
| Tool config | "How to configure ESLint flat config?" |
| CLI usage | "mise task runner syntax" |
| Prompt patterns | "Few-shot prompting format" |
| Quick how-to | "Git rebase onto specific commit" |
| API usage | "OpenAI function calling syntax" |

---

## 💡 Tips

**Speed up further:**

- Skip verify checklist for trivial questions
- Single source OK for official docs

**When to use full prompt instead:**

- Multiple conflicting sources
- High-stakes decisions
- Need systematic evidence review

---

## 📝 Even Lighter (One-liner)

For very quick lookups, append to any question:

```text
Base answer only on sources found. Cite each claim. Say "unconfirmed" if unsure.
```
