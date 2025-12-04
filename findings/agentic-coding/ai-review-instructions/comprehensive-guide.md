# 🤖 AI Code Review Instructions: Maintainer's Guide

**Date:** 2025-12-04
**Tags:** #research #ai #code-review #maintainer #agentic-coding

---

## 🎯 Core Insight

AI needs **explicit, structured instructions** to review like maintainer. Generic prompts = generic results.
Project context + clear rules = quality reviews.

Best prompts distilled from **thousands of real OSS reviews**
([awesome-reviewers](https://github.com/baz-scm/awesome-reviewers): 3,000+ prompts, 100+ languages).

---

## 🛠️ Tool Landscape

### Config Files by Tool

| Tool               | Config File                       | Notes                                                                                                                                           |
|--------------------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **GitHub Copilot** | `.github/copilot-instructions.md` | Path-scoped: `*.instructions.md` + `applyTo` frontmatter. Agent-specific: `excludeAgent`. Org-level supported. AI auto-fixes via @copilot     |
| **Claude Code**    | `.claude/commands/*.md` + `CLAUDE.md` | Slash commands. Focus: bugs, performance, security, correctness                                                                                 |
| **Cursor**         | `.cursor/rules/cursorrules.mdc`       | Shallow repo-wide understanding                                                                                                                 |
| **Windsurf**       | `.windsurfrules`                      | Similar to Cursor                                                                                                                               |

### Dedicated Tools

- **Qodo** (ex-Codium): Quality + test coverage
- **CodeRabbit**: Review-specific, no prompts needed
- **Metis**: Deep security (OSS, by Arm)
- **Kodus AI**: Senior dev style reviews (OSS)
- **Bito AI**: Scales OSS maintainer reviews

---

## 📋 Writing Effective Instructions

### 7 Core Principles

1. **🎯 Be Specific**
   - ❌ "Review for quality"
   - ✅ "Flag missing input validation on public APIs. Check auth before data access. No internal details in error messages"

2. **🔍 Project Context First**

   ```markdown
   - Language: Rust (cargo workspaces)
   - Crates: goose, goose-cli, goose-server, goose-mcp
   - Errors: anyhow::Result, NEVER unwrap()
   - Async: tokio
   - MCP protocol: extra scrutiny
   ```

3. **📝 Short Imperatives**
   - ❌ Paragraphs explaining rationale
   - ✅ "Prefer `const` over `let`. Never `var`"

4. **💡 Show Examples**

   ```markdown
   ✅ `let result = risky_op()?;`
   ❌ `let result = risky_op().unwrap();`
   ```

5. **🚦 Set Confidence Thresholds**
   - "Only flag 80%+ confidence issues"

6. **♻️ Avoid CI Overlap**
   - "Review before CI. Don't flag what CI catches (format, lint, types)"

7. **🔄 Iterate**
   - Review feedback quality → adjust → repeat

---

## 📦 Awesome Reviewers: Ready-Made Prompts

**Source:** [baz-scm/awesome-reviewers](https://github.com/baz-scm/awesome-reviewers)

- **3,000+ curated prompts** from real OSS code reviews
- **100+ languages/frameworks** covered
- Each prompt: origin repo, frequency, popularity, category
- **Categories:** 🔒 Security, ⚡ Performance, 📚 Docs, 🧪 Testing, 🏗️ Architecture

**Usage:**

1. Copy-paste as system instruction
2. Prepend to chat assistants (VS Code AI, ChatGPT, Cursor, Claude)
3. Deploy to Baz for auto-PR application
4. Merge multiple reviewers into Claude skill

---

## 🎭 Advanced Patterns

### Role-Playing Prompt

```markdown
Act as senior maintainer reviewing high-traffic production PR.

Focus: Injection, auth, secrets, crypto, errors, dependencies

Format per issue:
1. Severity (Critical/High/Med/Low)
2. File:line
3. Problem
4. Fix
5. Example
```

### Few-Shot Learning

```markdown
**File:** api/handlers.go:42
**Problem:** User input → SQL query directly
**Severity:** Critical
**Fix:** Parameterized queries
```

### Multi-Review Strategy

**For API/chat tools** (not GitHub Copilot):

1. Security review → 2. Context review → 3. Architecture review → 4. Maintainability review

**For GitHub Copilot:**

- Multiple `*.instructions.md` files OR
- Combined sections in single file OR
- Manual chat reviews

---

## 🚀 Implementation Strategies

### GitHub Copilot

- `.github/copilot-instructions.md` (repo-wide)
- `.github/[lang].instructions.md` (with `applyTo`)
- See [copilot-ultimate-template.md](copilot-ultimate-template.md)

### Claude Code

- `.claude/commands/review-*.md` (slash commands)
- `CLAUDE.md` (project context)
- Git-committable for team

### Awesome Reviewers

1. Browse [repo](https://github.com/baz-scm/awesome-reviewers)
2. Find reviewers for stack
3. Copy to tool
4. Merge multiple for coverage

---

## 📊 Testing & Validation

### Measure

- False positive/negative rates
- Noise (low-value comments)
- Actionability (% leading to changes)

### Workflow

1. Run on 10 merged PRs
2. Compare your review vs AI
3. Analyze: missed? wrong? redundant?
4. Update instructions
5. Re-test same PRs
6. Deploy on new PRs
7. Iterate monthly

### Test Cases

- PR with subtle security issue
- PR with breaking change
- PR with performance regression
- PR that's perfect
- PR with style violations (should ignore if CI handles)

---

## ⚠️ Common Pitfalls

| ❌ Don't                  | ✅ Do                                                    |
|---------------------------|----------------------------------------------------------|
| "Try to write tests"      | "All public functions need unit tests. 80% coverage"    |
| Overlap with CI           | Exclude what linters catch                               |
| "Check best practices"    | "Parameterized queries, never string concat"             |
| Ignore false positives    | Refine to exclude                                        |
| Set and forget            | Iterate monthly                                          |

---

## 💎 Maintainer-Specific Patterns

### Priority Levels

- 🔴 **Critical (block):** Security, correctness, breaking changes
- 🟡 **High (request changes):** Maintainability, architecture
- 🟢 **Medium (comment):** Performance, best practices
- ⚪ **Low (skip):** Style, minor optimizations

### Confidence Calibration

```markdown
Must flag (95%+): Security vulns, breaking changes
Should flag (80%+): Logic errors, missing tests
Comment only (70%+): Style, optimizations
Don't flag (<70%): Below threshold
```

### Domain-Specific Focus

**Frontend:** Accessibility, design tokens, performance (re-renders, virtualization)
**Backend Security:** Auth/authz, input validation, parameterized queries, PII handling

---

## 📚 Key Resources

### Tools

- [GitHub Copilot docs](https://docs.github.com/copilot/using-github-copilot/code-review/using-copilot-code-review)
- [Mastering instructions](https://github.blog/ai-and-ml/unlocking-the-full-power-of-copilot-code-review-master-your-instructions-files/)
- [Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Awesome Reviewers](https://github.com/baz-scm/awesome-reviewers)

### Guides

- [Prompt engineering guide](https://www.promptingguide.ai/introduction/tips)
- [OpenAI best practices](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)
- [Teaching Copilot (Angie Jones)](https://angiejones.tech/how-i-taught-github-copilot-code-review-to-think-like-a-maintainer/)

### Examples

- [instructa/ai-prompts](https://github.com/instructa/ai-prompts) - Multi-tool prompts
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

---

## 🎯 Quick Start

1. Choose tool
2. Use [copilot-ultimate-template.md](copilot-ultimate-template.md) or [templates.md](templates.md)
3. Fill context/priorities/examples
4. Test on 10 recent PRs
5. Measure quality
6. Refine
7. Deploy
8. Iterate monthly

---

## 📌 TL;DR

- 🎯 Specificity wins (vague → vague)
- 🏗️ Context critical (AI doesn't know setup)
- 📝 Imperatives not paragraphs
- 💡 Show examples
- 🚦 Set confidence thresholds
- ♻️ Iterate monthly
- 🔧 Use [awesome-reviewers](https://github.com/baz-scm/awesome-reviewers) (3,000+ prompts)
- 🎭 Role-play as reviewer
- ⚠️ Avoid CI overlap
- 📊 Measure impact

---

## 📄 Additional Files

- [copilot-ultimate-template.md](copilot-ultimate-template.md) - Production-ready GitHub Copilot template
- [templates.md](templates.md) - Quick reference templates for various tools

---

**Sources:**

- [Unlocking Copilot code review](https://github.blog/ai-and-ml/unlocking-the-full-power-of-copilot-code-review-master-your-instructions-files/)
- [Copilot agent-specific instructions](https://github.blog/changelog/2025-11-12-copilot-code-review-and-coding-agent-now-support-agent-specific-instructions/)
- [Using Copilot code review](https://docs.github.com/copilot/using-github-copilot/code-review/using-copilot-code-review)
- [Awesome Reviewers](https://github.com/baz-scm/awesome-reviewers)
- [Teaching Copilot (Angie Jones)](https://angiejones.tech/how-i-taught-github-copilot-code-review-to-think-like-a-maintainer/)
- [AI review tools 2025](https://graphite.com/guides/best-open-source-ai-code-review-tools-2025)
- [Prompt engineering best practices](https://www.promptingguide.ai/introduction/tips)
- [Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [AI prompts repo](https://github.com/instructa/ai-prompts)
