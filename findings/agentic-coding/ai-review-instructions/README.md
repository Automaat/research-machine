# 🤖 AI Code Review Instructions Research

Research on configuring AI tools for maintainer-quality code reviews.

---

## 📁 Files

### [copilot-ultimate-template.md](copilot-ultimate-template.md)

**Production-ready GitHub Copilot template**

- Copy to `.github/copilot-instructions.md`
- Comprehensive sections: security, testing, architecture, language-specific
- Includes examples, checklists, confidence thresholds
- Customization checklist provided

### [comprehensive-guide.md](comprehensive-guide.md)

**Complete research synthesis**

- Tool comparison (Copilot, Claude Code, Cursor, Windsurf, dedicated tools)
- 7 core principles for writing instructions
- Advanced patterns (role-playing, few-shot, multi-review)
- Implementation strategies per tool
- Testing & validation workflow
- Key resources & sources

### [templates.md](templates.md)

**Quick reference templates**

- Minimal GitHub Copilot template
- Path-scoped (language-specific)
- Frontend/backend security templates
- Role-playing prompts
- Language-specific (Rust, Go, Python, TypeScript)
- Confidence level templates

### [using-awesome-reviewers-locally.md](using-awesome-reviewers-locally.md)

**How to use awesome-reviewers catalog**

- 3 methods: manual copy-paste, CLI tool, direct GitHub access
- Project-specific reviewer generation (auto-detects deps)
- CLI options & examples
- Recommended workflows per tool
- Troubleshooting guide

---

## 🚀 Quick Start

1. **Choose your tool:**
   - GitHub Copilot → [copilot-ultimate-template.md](copilot-ultimate-template.md)
   - Claude Code → [templates.md](templates.md) (slash command section)
   - Other tools → [templates.md](templates.md) (relevant section)

2. **Copy & customize:**
   - Fill in project context
   - Add language-specific rules
   - Include code examples
   - Set confidence thresholds

3. **Test & iterate:**
   - Run on 10 recent PRs
   - Measure false positives/negatives
   - Refine instructions
   - Deploy on new PRs
   - Iterate monthly

---

## 💎 Key Takeaways

- 🎯 **Specificity wins** - vague instructions = vague results
- 🏗️ **Context critical** - AI doesn't know your setup, tell it explicitly
- 📝 **Short imperatives** - not paragraphs
- 💡 **Show examples** - good vs bad code
- 🚦 **Set thresholds** - confidence levels reduce noise
- ♻️ **Avoid CI overlap** - don't duplicate linter checks
- 🔄 **Iterate monthly** - review quality degrades without refinement
- 🔧 **Use existing prompts** - [awesome-reviewers](https://github.com/baz-scm/awesome-reviewers) has 3,000+

---

## 📚 Key Resources

- [Awesome Reviewers](https://github.com/baz-scm/awesome-reviewers) - 3,000+ prompts from real OSS reviews
- [GitHub Copilot: Mastering instructions](https://github.blog/ai-and-ml/unlocking-the-full-power-of-copilot-code-review-master-your-instructions-files/)
- [Teaching Copilot (Angie Jones)](https://angiejones.tech/how-i-taught-github-copilot-code-review-to-think-like-a-maintainer/)
- [Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices)

---

**Research Date:** 2025-12-04
**Tags:** #ai #code-review #maintainer #prompt-engineering
