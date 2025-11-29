# Generate CLAUDE.md for Existing Project

Use this prompt to analyze your existing codebase and generate tailored CLAUDE.md. Run from project root. Copy and paste into Claude Code.

---

## Task

Analyze existing codebase and create comprehensive, project-specific CLAUDE.md.

**Process:**

1. Explore codebase thoroughly
2. Ask clarifying questions about observed patterns
3. Present plan for CLAUDE.md structure
4. Get approval
5. Generate using `tools/templates/CLAUDE.md.template` and actual codebase patterns
6. Validate (under 500 lines, real examples, tested commands)

---

## Exploration Areas

**Analyze these systematically:**

1. **Structure:** Top-level dirs, naming patterns, entry points, config files
2. **Stack:** Language/versions, frameworks/libs (package.json, go.mod, etc.), build tools, testing, linting
3. **Code Patterns:** Sample 5-10 files - error handling, naming, organization, comments, tests
4. **Commands:** Extract from package.json/Makefile/README - build, test, lint, run
5. **Git:** Recent commits (`git log -20 --oneline`), branch naming, message format
6. **Workflow:** CI/CD files, pre-commit hooks, review requirements
7. **Anti-Patterns:** TODOs, style inconsistencies, complexity, duplication
8. **Domain:** README, architecture docs, API specs, terminology

---

## Clarifying Questions

**Ask about observed patterns:**

1. **Code Patterns:** "I noticed [X]. Is this preferred?" "Two styles [A] vs [B] - which is standard?"
2. **Goals:** "Pain points with AI code?" "Areas AI over-engineers?" "Patterns AI must follow?"
3. **Team:** "How many engineers?" "Known issues/gotchas?" "Specific anti-patterns?"
4. **Gaps:** Unclear patterns, missing docs, ambiguous conventions

---

## Plan Structure

**Present proposed CLAUDE.md:**

```markdown
# [Project Name]
## Overview (from README)
## Project Structure (found layout)
## Development Workflow (CI/CD, practices)
## [Language] Conventions (identified patterns)
## Simplicity Principles (anti-patterns)
## Code Generation Rules (project-specific)
## Common Commands (extracted)
## Project-Specific Context (domain knowledge)
```

**Include:**

- 5-10 key patterns with code examples
- Proposed anti-patterns (confirm)
- Outstanding questions
- Request confirmation

---

## Generation Requirements

**After approval:**

- Use `tools/templates/CLAUDE.md.template` as base
- Fill with actual project content (not generic)
- Include real code examples from codebase
- Reference actual files/patterns
- Test all commands before documenting
- Replace ALL placeholders
- Remove template comments
- Under 500 lines
- Concise and actionable

---

## Success Criteria

Generated CLAUDE.md must:

- Be project-specific (not generic advice)
- Include real examples (actual code snippets)
- Document actual patterns (what codebase does)
- List tested commands (verified working)
- State clear anti-patterns (from codebase)
- Be concise (under 500 lines)
- Be actionable (immediately useful)
- Reflect actual practices (not ideal)

---

## Large Codebases (300k+ LoC)

**Hierarchical approach:**

- Root CLAUDE.md: Overview, core principles (<300 lines)
- Module files: ./backend/CLAUDE.md, ./frontend/CLAUDE.md, ./infra/CLAUDE.md
- Ask: "Should I create separate CLAUDE.md for [module]?"

---

## Resources

- `findings/claude-md-best-practices.md` - Complete research
- `tools/templates/CLAUDE.md.template` - Base template

**Reference for:** Language patterns (Go/TS/Python), Infrastructure (K8s/Terraform), simplicity principles, anti-patterns

---

## Pitfalls

**Avoid:** Generic advice, theoretical patterns not in code, placeholders, verbosity (>500 lines), outdated patterns, skipping exploration, jumping to generation, assuming without checking

**Do:** Explore thoroughly, ask questions, present plan, use real examples, test commands, keep concise, be project-specific

---

## Start

**Workflow:**

1. Explore codebase (structure, stack, patterns, commands, git, workflow)
2. Ask clarifying questions (patterns, goals, team, gaps)
3. Present plan (structure, key patterns, anti-patterns, questions)
4. Generate after approval (real examples, tested commands)
5. Validate (project-specific, complete, concise)

---

**Use Plan Mode (Shift+Tab twice) for this task.**

ultrathink
