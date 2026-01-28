# 📝 Best Practices for Writing Claude Code Skills

**Date:** 2026-01-26
**Tags:** #research #claude-code #skills #ai-development
**Focus:** Authoring effective skills for Claude Code

---

## 🎯 Key Findings

### 1. SKILL.md Structure Requirements

| Finding | Source | Verbatim Quote | Confidence |
|---------|--------|----------------|------------|
| YAML frontmatter requires `name` and `description` fields | [Anthropic Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | "The SKILL.md frontmatter requires name and description fields with specific validation rules" | High |
| `name` validation: max 64 chars, lowercase/numbers/hyphens only | [Anthropic Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | "name: Maximum 64 characters, lowercase letters/numbers/hyphens only, no XML tags, no reserved words" | High |
| `description` validation: max 1024 chars, non-empty, no XML tags | [Anthropic Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | "description: Maximum 1024 characters, non-empty, no XML tags" | High |
| Keep SKILL.md body under 500 lines | [Official Docs](https://code.claude.com/docs/en/skills) | "Keep SKILL.md under 500 lines. Move detailed reference material to separate files." | High |

### 2. Naming Conventions

| Finding | Source | Verbatim Quote | Confidence |
|---------|--------|----------------|------------|
| Use gerund form (verb + -ing) for skill names | [Anthropic Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | "We recommend using gerund form (verb + -ing) for Skill names, as this clearly describes the activity or capability the Skill provides." | High |

**Good examples:** `processing-pdfs`, `analyzing-spreadsheets`, `managing-databases`
**Avoid:** `helper`, `utils`, `tools` (vague); `anthropic-*`, `claude-*` (reserved)

### 3. Description Writing

| Finding | Source | Verbatim Quote | Confidence |
|---------|--------|----------------|------------|
| Write descriptions in third person | [Anthropic Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | "Always write in third person. The description is injected into the system prompt, and inconsistent point-of-view can cause discovery problems." | High |
| Include WHAT it does AND WHEN to use it | [Anthropic skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) | "Include both what the Skill does and specific triggers/contexts for when to use it." | High |
| "When to use" info belongs in description, not body | [Anthropic skill-creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) | "The body is only loaded after triggering, so 'When to Use This Skill' sections in the body are not helpful to Claude." | High |

**✅ Good description example:**

```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```text

**❌ Bad description examples:**

- "Helps with documents" (too vague)
- "I can help you process Excel files" (wrong POV)
- "You can use this to process files" (wrong POV)

### 4. Invocation Control Frontmatter

| Field | Effect | Use Case |
|-------|--------|----------|
| `disable-model-invocation: true` | Only user can invoke via `/skill-name` | Side effects: `/commit`, `/deploy`, `/send-slack-message` |
| `user-invocable: false` | Only Claude can invoke, hidden from `/` menu | Background knowledge not actionable as command |
| `context: fork` | Runs in isolated subagent context | Research tasks, isolated execution |
| `allowed-tools: Read, Grep` | Restricts available tools | Read-only exploration, safe modes |

### 5. Progressive Disclosure Architecture

**Loading order:**

1. 📋 **Metadata (name + description)** → Always in context (~100 words)
2. 📄 **SKILL.md body** → When skill triggers (<500 lines recommended)
3. 📁 **Bundled resources** → As needed by Claude (unlimited)

**Recommended directory structure:**

```text
skill-name/
├── SKILL.md              # Main instructions (required, <500 lines)
├── FORMS.md              # Reference (loaded as needed)
├── reference/
│   ├── finance.md        # Domain-specific (loaded when relevant)
│   └── sales.md
└── scripts/
    └── helper.py         # Executed, NOT loaded into context
```text

**Critical rule:** Keep references ONE level deep from SKILL.md

### 6. Core Design Principle: Conciseness

| Principle | Source Quote |
|-----------|--------------|
| Context is shared | "The context window is a public good. Your Skill shares the context window with everything else Claude needs" |
| Claude is smart | "Default assumption: Claude is already very smart. Only add context Claude doesn't already have." |

**Self-check questions:**

- 🤔 "Does Claude really need this explanation?"
- 🤔 "Can I assume Claude knows this?"
- 🤔 "Does this paragraph justify its token cost?"

**Concise example (~50 tokens):**

```markdown
## Extract PDF text
Use pdfplumber for text extraction:
\`\`\`python
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
\`\`\`
```text

**Verbose anti-pattern (~150 tokens):**

```markdown
## Extract PDF text
PDF (Portable Document Format) files are a common file format that contains
text, images, and other content. To extract text from a PDF, you'll need to
use a library. There are many libraries available...
```text

### 7. Degrees of Freedom

Match specificity to task fragility:

| Freedom Level | When to Use | Example |
|--------------|-------------|---------|
| **High** (text instructions) | Multiple valid approaches, context-dependent | Code review guidelines |
| **Medium** (pseudocode/params) | Preferred pattern with acceptable variation | Report generation template |
| **Low** (exact scripts) | Fragile operations, consistency critical | Database migrations, deployments |

**Analogy:**

- 🌉 Narrow bridge with cliffs → Low freedom (specific guardrails)
- 🌾 Open field, no hazards → High freedom (general direction)

### 8. Workflow Patterns

**Checklist pattern for multi-step tasks:**

```markdown
## PDF form filling workflow

Copy this checklist and check off items as you complete them:

\`\`\`
Task Progress:
- [ ] Step 1: Analyze the form (run analyze_form.py)
- [ ] Step 2: Create field mapping (edit fields.json)
- [ ] Step 3: Validate mapping (run validate_fields.py)
- [ ] Step 4: Fill the form (run fill_form.py)
- [ ] Step 5: Verify output (run verify_output.py)
\`\`\`
```text

**Feedback loop pattern:**

```text
Run validator → Fix errors → Repeat until pass
```text

---

## ⚠️ Anti-Patterns to Avoid

| ❌ Anti-Pattern | Why It's Bad |
|-----------------|--------------|
| Too many options | "Don't present multiple approaches unless necessary" - causes decision paralysis |
| Windows-style paths (`\`) | "Always use forward slashes in file paths, even on Windows" |
| Time-sensitive info | "Don't include information that will become outdated" |
| Verbose explanations | Wastes context tokens on things Claude knows |
| "When to use" in body | Body loads AFTER triggering - put in description |
| Deeply nested references | Claude may partially read with `head -100` |
| Complex slash command lists | "If you have a long list of complex, custom slash commands, you've created an anti-pattern" |

---

## 📋 Complete SKILL.md Template

```yaml
---
name: processing-data          # gerund form, lowercase, hyphens only, max 64 chars
description: Processes Excel spreadsheets and generates reports. Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files.
# Optional fields:
# disable-model-invocation: true    # user-only invocation
# user-invocable: false             # Claude-only (background knowledge)
# context: fork                      # isolated subagent
# agent: Explore                     # subagent type when context: fork
# allowed-tools: Read, Grep, Glob   # restrict tool access
# argument-hint: [filename] [format] # autocomplete hint
---

# Data Processing

## Quick Start

[Minimal working example - concise, assume Claude is smart]

## Workflow

1. Step one with clear action
2. Step two with validation
3. Step three with verification

## Advanced Features

- **Feature A**: See [reference/feature-a.md](reference/feature-a.md)
- **Feature B**: See [reference/feature-b.md](reference/feature-b.md)

## Utility Scripts

**analyze.py**: Extract data structure
\`\`\`bash
python scripts/analyze.py input.xlsx
\`\`\`

**validate.py**: Check data integrity
\`\`\`bash
python scripts/validate.py data.json
# Returns: "OK" or lists issues
\`\`\`
```text

---

## 🔧 Frontmatter Reference

| Field | Required | Description |
|-------|----------|-------------|
| `name` | No (uses dir name) | Display name, max 64 chars, lowercase/numbers/hyphens |
| `description` | Recommended | What + When, max 1024 chars, third person |
| `argument-hint` | No | Autocomplete hint: `[issue-number]` |
| `disable-model-invocation` | No | `true` = user-only |
| `user-invocable` | No | `false` = Claude-only, hidden from menu |
| `allowed-tools` | No | Restrict tools: `Read, Grep, Glob` |
| `model` | No | Override model for this skill |
| `context` | No | `fork` = run in isolated subagent |
| `agent` | No | Subagent type when `context: fork` |
| `hooks` | No | Skill-scoped lifecycle hooks |

---

## 🔄 Skill Locations

| Scope | Path | Applies To |
|-------|------|------------|
| Enterprise | Managed settings | All org users |
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | Where plugin enabled |

**Priority:** Enterprise > Personal > Project (plugin namespaced separately)

---

## 🔀 Skills vs Commands (Merged)

> "Custom slash commands have been merged into skills. A file at `.claude/commands/review.md` and a skill at `.claude/skills/review/SKILL.md` both create `/review` and work the same way."

**Benefits of skills over legacy commands:**

- Directory for supporting files
- Frontmatter for invocation control
- Automatic triggering when relevant
- Progressive disclosure architecture

---

## ❓ What Sources DON'T Cover

- 📊 Performance benchmarks for skill complexity impact
- 🏢 Enterprise-specific deployment patterns
- 🔌 Deep MCP integration beyond `ServerName:tool_name`
- 📝 Skill versioning across teams
- 🧪 Built-in skill evaluation/testing framework

---

## 📚 Sources

1. [Official Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
2. [Anthropic Skill Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
3. [Anthropic skill-creator SKILL.md Example](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)
4. [Claude Code Best Practices (Anthropic Engineering)](https://www.anthropic.com/engineering/claude-code-best-practices)
5. [Claude Code Customization Guide (alexop.dev)](https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/)
6. [When to Use Skills vs Commands vs Agents (Daniel Miessler)](https://danielmiessler.com/blog/when-to-use-skills-vs-commands-vs-agents)

---

**Suggested location:** 3_Resources/AI-Development/
**Potential MOCs:** [[Claude Code MOC]], [[AI Agent Development MOC]]
**Tags:** #claude-code #skills #best-practices #ai-agents
