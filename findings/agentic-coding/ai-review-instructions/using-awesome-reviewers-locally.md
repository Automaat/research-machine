# 🔧 Using Awesome-Reviewers Locally

**Date:** 2025-12-04
**Tags:** #ai #code-review #awesome-reviewers #tools

---

## 📦 What is Awesome-Reviewers?

3,000+ code review prompts extracted from real OSS repos across 100+ languages/frameworks.

**Repo:** [baz-scm/awesome-reviewers](https://github.com/baz-scm/awesome-reviewers)
**Website:** [awesomereviewers.com](https://awesomereviewers.com)

---

## 🚀 Method 1: Manual Copy-Paste (Simplest)

1. **Browse:** [awesomereviewers.com](https://awesomereviewers.com)
2. **Find prompts** for your stack
3. **Copy prompt text**
4. **Paste** into config:
   - GitHub Copilot: `.github/copilot-instructions.md`
   - Claude Code: `.claude/commands/review.md`
   - Cursor: `.cursor/rules/cursorrules.mdc`
   - Windsurf: `.windsurfrules`

---

## 🤖 Method 2: CLI Tool for Claude Code (Automated)

### Setup

```bash
git clone https://github.com/baz-scm/awesome-reviewers.git
cd awesome-reviewers
pip install click pyyaml
```

### Basic Usage

```bash
# Export all reviewers as Claude skills
python tools/awesome2claude.py --output-dir ./claude_skills --overwrite
```

### Project-Specific (Smart Detection)

```bash
# Scans project, finds deps, generates combined skill
python tools/awesome2claude.py \
  --project-dir ~/path/to/your/project \
  --combined-skill-slug my-project-review \
  --output-dir ./claude_skills \
  --overwrite
```

**What it does:**

- Scans for lockfiles (package.json, Cargo.lock, go.mod, requirements.txt, etc.)
- Matches deps against awesome-reviewers catalog
- Combines relevant reviewers into **single Claude skill**
- Outputs to `.claude/skills/` directory

### CLI Options

```bash
--output-dir <path>              # Where to write skills
--overwrite                      # Replace existing
--group-by-category              # Organize by category
--limit N                        # Process first N only
--dry-run                        # Preview without writing
--project-dir <path>             # Scan project deps
--combined-skill-slug <name>     # Custom skill name
--combined-skill-title <title>   # Custom skill title
--combined-skill-description <desc>  # Custom description
```

### Full Help

```bash
python tools/awesome2claude.py --help
```

---

## 📂 Method 3: Direct GitHub Access

```bash
git clone https://github.com/baz-scm/awesome-reviewers.git
cd awesome-reviewers/_reviewers
ls                      # Browse available reviewers
cat security-*.md       # View specific prompts
cat rust-*.md          # Language-specific
cat performance-*.md   # Category-specific
```

---

## 💡 Recommended Workflows

### For Claude Code Users

```bash
# 1. Clone repo
git clone https://github.com/baz-scm/awesome-reviewers.git

# 2. Generate project-specific skill
cd awesome-reviewers
python tools/awesome2claude.py \
  --project-dir /path/to/your/project \
  --combined-skill-slug code-review \
  --combined-skill-title "Project Code Review" \
  --combined-skill-description "Auto-generated from project dependencies" \
  --output-dir /path/to/your/project/.claude/skills \
  --overwrite

# 3. Skills auto-loaded in Claude Code
# Use via chat or commands
```

### For GitHub Copilot Users

```bash
# 1. Browse awesomereviewers.com
# 2. Find reviewers for your stack (Rust, Go, React, etc.)
# 3. Copy relevant prompts
# 4. Paste into .github/copilot-instructions.md
# 5. Organize with headings/sections
```

### For Cursor/Windsurf Users

```bash
# 1. Browse awesomereviewers.com or _reviewers/ directory
# 2. Select prompts for your languages
# 3. Combine into single file
# 4. Paste into .cursor/rules/cursorrules.mdc or .windsurfrules
```

---

## 📋 Example Use Cases

### Multi-Language Project (Rust + TypeScript)

```bash
python tools/awesome2claude.py \
  --project-dir ~/myapp \
  --combined-skill-slug fullstack-review \
  --combined-skill-title "Full-Stack Code Review" \
  --output-dir ~/myapp/.claude/skills \
  --overwrite
```

**Result:** Single skill combining Rust + TypeScript reviewers.

### Security-Focused Review

```bash
# Browse awesomereviewers.com
# Filter by category: Security
# Copy all security-related prompts
# Combine into .github/security-review.instructions.md
```

```yaml
---
applyTo:
  - "**/*.rs"
  - "**/*.go"
  - "**/*.py"
---

# Security Review

[Paste combined security prompts here]
```

### Language-Specific Review

```bash
# For Rust project
cd awesome-reviewers/_reviewers
cat rust-*.md > ~/myproject/.github/rust-review.instructions.md
```

### Category-Based Review

```bash
# Performance-focused review
cd awesome-reviewers/_reviewers
cat performance-*.md > ~/myproject/.github/performance-review.instructions.md
```

---

## 🔄 Update Workflow

```bash
# Periodically update catalog
cd awesome-reviewers
git pull

# Re-generate project-specific skill
python tools/awesome2claude.py \
  --project-dir ~/myproject \
  --combined-skill-slug code-review \
  --output-dir ~/myproject/.claude/skills \
  --overwrite
```

---

## 🎯 Best Practices

### ✅ Do

- **Start project-specific:** Use `--project-dir` for Claude Code
- **Combine relevant reviewers:** Don't use all 3,000+ prompts
- **Update regularly:** Catalog grows over time
- **Test on old PRs:** Validate quality before deploying
- **Iterate:** Refine based on false positives/negatives

### ❌ Don't

- **Don't use all prompts:** Too much noise
- **Don't skip customization:** Add project context
- **Don't ignore false positives:** Remove or refine prompts
- **Don't set and forget:** Update monthly

---

## 🛠️ Troubleshooting

### Python CLI Not Working

```bash
# Ensure dependencies installed
pip install click pyyaml

# Check Python version (3.7+)
python --version

# Run with verbose output
python tools/awesome2claude.py --help
```

### Skills Not Loading (Claude Code)

```bash
# Check output directory
ls /path/to/project/.claude/skills

# Verify SKILL.md format
cat /path/to/project/.claude/skills/code-review/SKILL.md

# Restart Claude Code to reload skills
```

### Too Many/Irrelevant Prompts

```bash
# Use --limit to reduce
python tools/awesome2claude.py --limit 10 --dry-run

# Or manually select from _reviewers/ directory
# Copy only relevant ones
```

---

## 📚 Resources

- [Awesome Reviewers GitHub](https://github.com/baz-scm/awesome-reviewers)
- [Awesome Reviewers Website](https://awesomereviewers.com)
- [Claude Skills Page](https://awesomereviewers.com/skills/)
- [CLI Tool Source](https://github.com/baz-scm/awesome-reviewers/tree/main/tools)

---

## 🔗 Related

- [comprehensive-guide.md](comprehensive-guide.md) - Full AI review instructions guide
- [copilot-ultimate-template.md](copilot-ultimate-template.md) - GitHub Copilot template
- [templates.md](templates.md) - Quick reference templates

---

**Key Takeaway:** Use `--project-dir` for automatic dependency-based reviewer selection with Claude Code.
Manual copy-paste for other tools.
