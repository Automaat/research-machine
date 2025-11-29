# Generate CLAUDE.md for New Project

Use this prompt to create a CLAUDE.md for greenfield projects. Copy and paste into Claude Code.

---

## Task

Create comprehensive CLAUDE.md for my new project. Establish patterns from day one.

**Process:**

1. Ask discovery questions
2. Present plan for CLAUDE.md structure
3. Get approval
4. Generate file using `tools/templates/CLAUDE.md.template` and `findings/claude-md-best-practices.md`
5. Validate (under 500 lines, tech-stack specific, actionable)

---

## Discovery Questions

**Ask about:**

1. **Project:** Type (web/CLI/lib/infra/mobile/desktop), purpose, domain requirements
2. **Stack:** Language(s), framework, build tools, testing, database, deployment
3. **Structure:** Standard or custom, monorepo/single, module organization
4. **Team:** Solo/team size, experience level, remote/co-located
5. **Practices:** TDD/test-after, code review, git workflow, CI/CD
6. **AI Priorities:** Focus areas (consistency/simplicity/security), anti-patterns to avoid, architectural preferences, style
7. **Domain:** What it does, terminology, special requirements (performance/security)

---

## Plan Structure

**Present proposed CLAUDE.md with:**

```markdown
# [Project Name]
## Overview
## Project Structure
## Development Workflow
## [Language] Conventions
## [Framework] Patterns (if applicable)
## Simplicity Principles
## Code Generation Rules
## Common Commands
## [Domain Sections] (API/Database/Infrastructure as needed)
## Project-Specific Context
```

**Include:**

- Language-specific conventions from research
- Framework patterns
- Testing approach
- Recommended structure
- Questions for confirmation

---

## Language-Specific Patterns

**Reference `findings/claude-md-best-practices.md` for:**

**Go:** cmd/pkg/internal structure, error handling (if err != nil), table-driven tests, no panic in libs, early returns

**TypeScript/JS:** ESLint/Prettier, module patterns, async/await, framework-specific patterns

**Python:** Package structure, type hints, pytest, virtual env, requirements.txt vs poetry

**Infrastructure:** K8s manifests, Terraform modules, Docker, security-first defaults

**Others:** Adapt from research, follow community standards, framework specifics

---

## Success Criteria

Generated CLAUDE.md must:

- Match tech stack with relevant patterns
- Follow community best practices
- Be immediately useful (day one)
- Document anti-patterns
- Scale with project growth
- Stay under 500 lines
- Provide clear AI guidance

---

## Advanced Scenarios

**Monorepo:** Root CLAUDE.md (shared), module CLAUDE.md files (specific), ask early, keep root high-level

**Microservices:** Shared template (common patterns), per-service customization (domain logic, boundaries)

**Team Projects:** Include workflows (PR/branch/commit conventions), decision-making process, onboarding focus

---

## Resources

- `findings/claude-md-best-practices.md` - Complete research
- `tools/templates/CLAUDE.md.template` - Base template

---

## Pitfalls

**Avoid:** Generic advice without adapting, over-specifying early, inflexibility, verbosity (>500 lines), forgetting to update

**Do:** Start with stack best practices, leave room for specifics, focus on preventing issues, keep concise, plan to iterate

---

## Start

**Workflow:**

1. Ask discovery questions (project type, stack, team, practices, AI priorities)
2. Present tailored plan
3. Generate after approval
4. Validate result

**Optional - provide upfront:**

- Project type: [web app/CLI/library/etc.]
- Language: [Go/TypeScript/Python/etc.]
- Framework: [Next.js/Express/Django/etc.]
- Team: [solo/2-5/6+]
- Priorities: [simplicity/security/performance/etc.]

---

**Use Plan Mode (Shift+Tab twice) for this task.**

ultrathink
