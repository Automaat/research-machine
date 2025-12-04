# 📝 AI Code Review Quick Templates

---

## GitHub Copilot Minimal

```markdown
# Code Review

## Context
- Stack: [lang/framework]
- Errors: [pattern], NEVER [anti-pattern]
- Async: [runtime]

## Priority
1. Security/Correctness (block): Vulns, logic errors, breaking
2. Maintainability (change): Tests, naming, unclear logic
3. Style/Optimization (comment): Performance, readability

## Checklist
- [ ] Input validation (public APIs)
- [ ] Auth before data access
- [ ] No secrets
- [ ] Safe error messages
- [ ] Dependencies: CVEs?

## CI Coverage
Don't review: [formatting, lints, types]

## Confidence
Only flag 80%+ confident

## Examples
✅ Good: [code]
❌ Bad: [code]
```

---

## Path-Scoped (TypeScript)

```yaml
---
applyTo:
  - "src/**/*.ts"
---

# TypeScript

## Naming
- camelCase: vars/funcs
- PascalCase: classes
- UPPER_SNAKE: constants

## Types
- Explicit on public APIs
- Avoid `any`, use `unknown`
- Type guards for narrowing

## Async
- async/await over Promises
- Handle rejections
```

---

## Frontend

```markdown
# Frontend Review

## Accessibility
- [ ] ARIA correct
- [ ] Keyboard nav
- [ ] Focus mgmt
- [ ] Screen reader

## Design System
- [ ] Use tokens
- [ ] No magic numbers
- [ ] Flag deprecated

## Performance
- [ ] No unnecessary re-renders
- [ ] Virtualize lists
- [ ] Lazy-load images
```

---

## Backend Security

```markdown
# Security Review

## Auth
- [ ] Middleware on protected routes
- [ ] JWT validation (expiry + signature)
- [ ] Crypto-random tokens

## Authz
- [ ] Permissions checked
- [ ] No privilege escalation
- [ ] Resource ownership verified

## Data
- [ ] Input sanitized
- [ ] Parameterized queries
- [ ] Encrypt at rest
- [ ] No PII in logs
```

---

## Role-Playing (API/Chat Tools)

```markdown
Act as senior maintainer reviewing production PR.

Focus: Injection, auth, secrets, crypto, errors, deps

Per issue:
1. Severity
2. File:line
3. Problem
4. Fix
5. Example
```

---

## Few-Shot Example

```markdown
**File:** api/handlers.go:42
**Problem:** User input → SQL direct
**Severity:** Critical
**Fix:** Use parameterized queries
\`\`\`go
// Before: query := "SELECT * FROM users WHERE id = " + userID
// After: db.Query("SELECT * FROM users WHERE id = ?", userID)
\`\`\`
```

---

## Rust-Specific

```yaml
---
applyTo: "**/*.rs"
---

# Rust

## Errors
- Use Result/anyhow::Result
- NEVER unwrap() in production
- Use ? operator

## Memory
- Minimize clone()
- Prefer borrowing
- Document lifetime complexity

## Async
- Runtime: tokio
- Consistent async/await
```

---

## Go-Specific

```yaml
---
applyTo: "**/*.go"
---

# Go

## Errors
- Check ALL errors
- Wrap: fmt.Errorf("ctx: %w", err)
- NEVER _ error returns

## Concurrency
- Document goroutine lifecycle
- Use context for cancellation
- Avoid naked goroutines

## Testing
- Table-driven tests
- t.Parallel() where safe
```

---

## Python-Specific

```yaml
---
applyTo: "**/*.py"
---

# Python

## Types
- Type hints on public APIs
- mypy strict mode
- Avoid Any

## Errors
- Specific exceptions
- Context managers for resources
- No bare except:

## Testing
- pytest
- Use fixtures
- Mock external deps
```

---

## Multi-File Strategy (Copilot)

**Option 1:** Multiple files (reviewed simultaneously)

```text
.github/security.instructions.md
.github/architecture.instructions.md
.github/maintainability.instructions.md
```

**Option 2:** Combined single file

```markdown
# Comprehensive Review

## 1. Security
[checks]

## 2. Architecture
[checks]

## 3. Maintainability
[checks]
```

---

## Claude Code Slash Command

```markdown
# .claude/commands/review-pr.md

Review PR for maintainer concerns:

1. Security (injection, auth, secrets)
2. Correctness (logic, breaking changes)
3. Maintainability (tests, docs, clarity)
4. Architecture (patterns, coupling)

Per issue: severity, file:line, problem, fix, example

Confidence: 80%+ only
Skip: CI-handled items (format, lint, types)
```

---

## Confidence Levels

```markdown
## Review Confidence

Must flag (95%+): Security, breaking changes
Should flag (80%+): Logic errors, missing tests
Comment (70%+): Style, optimizations
Skip (<70%): Below threshold
```
