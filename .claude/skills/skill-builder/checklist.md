# Skill Generation Checklist

Verify before completing skill generation.

---

## SKILL.md Quality

- [ ] Valid YAML frontmatter
- [ ] `name` matches directory name
- [ ] `description` is one clear line
- [ ] `argument-hint` shows usage
- [ ] `allowed-tools` lists only needed tools
- [ ] `user-invocable: true` if slash-command

---

## Content Quality

- [ ] No placeholders ("TODO", "fill in", "{placeholder}")
- [ ] All phases have concrete steps
- [ ] Arguments documented with defaults
- [ ] Error handling defined
- [ ] Output format specified

---

## Specificity

- [ ] Actual commands, not "run the tool"
- [ ] Real examples from user's domain
- [ ] Specific file paths, not "appropriate location"
- [ ] Concrete search patterns if research skill

---

## Python (If Included)

- [ ] Python genuinely needed (not just convenience)
- [ ] `requires-python = ">=3.14"` in pyproject.toml
- [ ] `allowed-tools: Bash(uv run *)` in frontmatter
- [ ] Script outputs JSON
- [ ] Script NOT loaded into context (execute directly)

---

## State (If Recurring)

- [ ] `.last-run` pattern documented
- [ ] `.covered-items` pattern if deduplication
- [ ] State updated only on success
- [ ] First-run defaults specified

---

## Supporting Files

- [ ] `output-template.md` if structured output
- [ ] `sources.md` if multiple data sources
- [ ] Templates have no unfilled placeholders
