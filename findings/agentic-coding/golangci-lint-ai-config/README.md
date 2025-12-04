# 🔍 golangci-lint Maximum Configuration for AI Coding

**Date:** 2025-12-03
**Tags:** #golang #linting #ai-coding #best-practices #devtools
**Focus:** Comprehensive golangci-lint setup for strict code quality + AI workflow optimization

---

## 🎯 Key Findings

### golangci-lint v2 (2025)

- **100+ linters** available in latest version
- **New v2 syntax:** `linters.default: all|fast|standard` replaces old `enable-all`/`disable-all`
- **Migration tool:** `golangci-lint migrate` auto-converts v1→v2 configs
- **Industry standard:** Used by Kubernetes, Prometheus, Terraform
- **Performance:** Parallel execution + intelligent caching

### Critical for AI-Generated Code 🤖

AI/LLM code generators commonly produce:

#### ❌ Error Handling Issues

- **Unchecked errors** - AI forgets `if err != nil` checks
- **Improper error wrapping** - Missing context in error chains
- **Nil errors returned** - Inconsistent nil/error return patterns
- **Type assertion failures** - Unchecked type assertions `x.(Type)`

**Linters:** `errcheck`, `errorlint`, `errname`, `nilerr`, `nilnil`, `wrapcheck`

#### 💧 Resource Leaks

- **Unclosed HTTP bodies** - `resp.Body.Close()` missing/deferred incorrectly
- **DB connection leaks** - `rows.Close()` not called
- **File handle leaks** - Files opened but never closed
- **Defer in loops** - Defers accumulate until function exit

**Linters:** `bodyclose`, `sqlclosecheck`, `rowserrcheck`, `defercheck`

#### 🔄 Goroutine Issues

- **Goroutine leaks** - Blocked goroutines never terminate
- **Unbounded creation** - Creating unlimited goroutines without control
- **Missing context** - HTTP requests without context propagation
- **Race conditions** - Concurrent access without synchronization

**Linters:** `govet`, `staticcheck`, `noctx`, `contextcheck`

#### 🔒 Security Vulnerabilities

- **SQL injection** - String concatenation in queries
- **Command injection** - Unsanitized input to exec
- **Weak crypto** - Using MD5/SHA1 for security
- **Path traversal** - Unchecked file paths

**Linters:** `gosec`, `G201-G401` (various security rules)

#### 🌀 Complexity Problems

- **Overly complex functions** - Cyclomatic complexity >15-20
- **Deep nesting** - 4+ levels of nested if/for
- **Long functions** - >100 lines, >50 statements
- **Code duplication** - Copy-paste patterns

**Linters:** `gocyclo`, `gocognit`, `cyclop`, `nestif`, `funlen`, `dupl`

---

## 📦 Two Configurations Provided

### 1️⃣ `.golangci-maximum-strict.yml` - Best Practices

**Use case:** New projects, strictest quality standards

**Features:**

- `linters.default: all` - Enable every available linter
- Strategic disables for deprecated/noisy linters only
- Strictest settings: complexity ≤15, funlen ≤100 lines
- Comprehensive error handling enforcement
- Security baseline: all `gosec` checks
- Modern Go features (1.22+): `intrange`, `perfsprint`
- Full `revive` ruleset with sensible overrides

**Settings:**

```yaml
cyclop.max-complexity: 15
funlen.lines: 100
errcheck.check-blank: true
gosec.severity: low  # catch everything
exhaustruct: require Config/Options structs
```

### 2️⃣ `.golangci-ai-optimized.yml` - AI Workflow

**Use case:** AI-generated code review, rapid iteration

**Features:**

- Curated ~40 linters targeting AI mistakes
- Relaxed complexity (20-25) for iterative improvement
- Focused on correctness > style
- Fast execution (<3min)
- Actionable feedback for AI to fix

**Priority:**

1. ✅ Correctness (errors, nil, resources)
2. 🔒 Security (gosec medium+)
3. 🐛 Common bugs (govet, staticcheck)
4. 📈 Complexity warnings (not blockers)
5. 💅 Style hints (revive basics)

---

## 🛠️ Implementation Guide

### Installation

```bash
# Latest v2
go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@latest

# Verify
golangci-lint --version  # should be v2.x.x
```

### Usage

```bash
# Maximum strict (new projects)
cp .golangci-maximum-strict.yml .golangci.yml
golangci-lint run

# AI-optimized (AI code review)
golangci-lint run --config .golangci-ai-optimized.yml

# View enabled linters
golangci-lint linters

# Migrate v1→v2 config
golangci-lint migrate
```

### Pre-commit Hook

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/golangci/golangci-lint
    rev: v2.6.2
    hooks:
      - id: golangci-lint
        args: [--config, .golangci-ai-optimized.yml]
```

### GitHub Actions

```yaml
# .github/workflows/lint.yml
name: Lint
on: [push, pull_request]
jobs:
  golangci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.23'
      - uses: golangci/golangci-lint-action@v6
        with:
          version: v2.6.2
          args: --config .golangci-maximum-strict.yml
```

---

## 🔧 Advanced: Custom Linters for AI

### NilAway (Uber's Nil Safety)

**Problem:** Detects nil panics at compile time
**Status:** Not in golangci-lint (false positives), requires plugin
**Setup:**

```bash
# Install plugin
go install go.uber.org/nilaway/cmd/nilaway@latest

# Use as custom linter (v2 plugin system)
# .golangci.yml
linters-settings:
  custom:
    nilaway:
      path: $(go env GOPATH)/bin/nilaway
      description: Uber nil panic detector
```

### Modernize (Gophercon 2025)

**Purpose:** Suggests modern Go patterns (1.22+)
**Author:** Alan Donovan
**Check:** May need manual addition depending on golangci-lint version

---

## 📊 Linter Categories

### 🚨 Critical (Always Enable for AI)

| Linter | Purpose | AI Issue |
| ------ | ------- | -------- |
| `errcheck` | Unchecked errors | AI forgets checks |
| `gosec` | Security vulns | AI lacks security awareness |
| `bodyclose` | Unclosed HTTP | Resource leaks |
| `sqlclosecheck` | Unclosed DB | Resource leaks |
| `govet` | Suspicious code | Common mistakes |
| `staticcheck` | 150+ checks | Comprehensive analysis |

### ⚠️ Important (AI Prone to Issues)

| Linter | Purpose | AI Issue |
| ------ | ------- | -------- |
| `gocyclo` | Complexity | AI overcomplicates |
| `noctx` | Missing context | AI forgets propagation |
| `errorlint` | Error wrapping | AI unwraps incorrectly |
| `ineffassign` | Useless assignments | AI generates dead code |
| `unparam` | Unused params | AI over-parameterizes |

### 💡 Helpful (Quality Improvement)

| Linter | Purpose | AI Issue |
| ------ | ------- | -------- |
| `dupl` | Code duplication | AI repeats patterns |
| `funlen` | Long functions | AI doesn't decompose |
| `nestif` | Deep nesting | AI creates complex logic |
| `prealloc` | Performance | AI misses optimizations |
| `godot` | Documentation | AI skips comments |

### 🎨 Style (Team Preferences)

| Linter | Purpose | Note |
| ------ | ------- | ---- |
| `revive` | Style guide | Configurable rules |
| `stylecheck` | Go conventions | Official style |
| `goimports` | Import ordering | Auto-fixable |
| `golines` | Line length | Formatter |

---

## 🚀 AI Coding Workflow

### 1. Code Generation Phase

```bash
# AI generates code → save to file
# Run quick check
golangci-lint run --config .golangci-ai-optimized.yml --fast
```

### 2. Iterative Fixing

```text
AI reads linter output → fixes issues → re-run
Loop until clean
```

### 3. Pre-commit

```bash
# Full strict check before commit
golangci-lint run --config .golangci-maximum-strict.yml
```

### 4. CI/CD

```text
PR triggers strict linting
Blocks merge if critical issues
Style warnings allowed
```

---

## 🎓 Best Practices

### ✅ Do

- **Start strict** on new projects (maximum config)
- **Incrementally enable** on legacy code
- **Auto-fix** where possible (`--fix` flag)
- **Educate AI** by showing linter output in prompts
- **Cache results** in CI for speed
- **Version config** in repo

### ❌ Don't

- **Enable everything blindly** on legacy code
- **Use `default: all` in CI** (breaks on new linters)
- **Disable linters** without understanding why
- **Ignore errors** in test files
- **Skip security checks** for "speed"

### 🤖 AI-Specific Tips

1. **Include linter config in AI context**
   → AI adapts to your standards

2. **Show AI the linter output**
   → Better fixes than explaining rules

3. **Ask AI to explain violations**
   → Validates understanding

4. **Iterate on complexity warnings**
   → Teach AI to decompose functions

5. **Use AI to write linter rules**
   → Custom analyzers for project patterns

---

## 📚 Notable Community Configs

### maratori's Golden Config

**Source:** [GitHub Gist](https://gist.github.com/maratori/47a4d00457a92aa426dbd48a18776322)
**Version:** v2.6.2
**Features:**

- 70+ linters enabled
- Comprehensive exclusion rules
- Detailed comments on trade-offs
- Well-balanced strict/practical

**Highlights:**

- Cyclop: max 30 (functions), 10 (packages)
- Funlen: not specified (uses default)
- Depguard: blocks deprecated packages
- Exhaustruct: skips stdlib types

---

## 🔗 Resources

### Official Documentation

- [golangci-lint v2 Docs](https://golangci-lint.run/)
- [All Linters List](https://golangci-lint.run/docs/linters/)
- [Configuration Guide](https://golangci-lint.run/docs/configuration/)
- [v2 Migration Guide](https://ldez.github.io/blog/2025/03/23/golangci-lint-v2/)

### Community

- [Golden Config Gist](https://gist.github.com/maratori/47a4d00457a92aa426dbd48a18776322)
- [Awesome Go Linters](https://github.com/golangci/awesome-go-linters)
- [GitHub: golangci/golangci-lint](https://github.com/golangci/golangci-lint)

### AI & Linting

- [Balancing Code Quality with GolangCI-Lint](https://www.markcallen.com/balancing-code-quality-and-developer-velocity-with-golangci-lint/)
- [Bring Your Own Linter](https://lukasschwab.me/blog/gen/bring-your-own-linter.html)
- [CodeRabbit: golangci-lint Integration](https://docs.coderabbit.ai/tools/golangci-lint)

### Go Errors & Patterns

- [Memory Leaks in Go - DEV](https://dev.to/gkampitakis/memory-leaks-in-go-3pcn)
- [Go 101: Memory Leaking Scenarios](https://go101.org/article/memory-leaking.html)
- [Goroutine Leaks - Ardan Labs](https://www.ardanlabs.com/blog/2018/11/goroutine-leaks-the-forgotten-sender.html)
- [Go Memory Leaks - Datadog](https://www.datadoghq.com/blog/go-memory-leaks/)

### Gophercon 2025

- [Go Linters: Essential Tools](https://www.glukhov.org/post/2025/11/linters-for-go/)

---

## 🧪 Testing the Configs

### Sample AI-Generated Buggy Code

Create `test.go`:

```go
package main

import (
    "net/http"
    "database/sql"
)

// AI-generated code with intentional issues
func fetchData(url string) string {
    resp, _ := http.Get(url)  // ❌ unchecked error
    // ❌ body never closed

    db, _ := sql.Open("postgres", "...")  // ❌ unchecked error
    rows, _ := db.Query("SELECT * FROM users")  // ❌ unchecked error
    // ❌ rows never closed

    // ❌ overly complex function
    if resp.StatusCode == 200 {
        if rows.Next() {
            if true {
                if false {
                    // ❌ deep nesting
                }
            }
        }
    }

    return ""  // ❌ nil return inconsistent
}
```

### Run Linters

```bash
# AI-optimized config
$ golangci-lint run --config .golangci-ai-optimized.yml test.go

# Expected issues:
# - errcheck: unchecked errors (3)
# - bodyclose: resp.Body not closed
# - sqlclosecheck: rows not closed
# - nestif: deep nesting (4 levels)
# - errname: inconsistent return

# Maximum strict config
$ golangci-lint run --config .golangci-maximum-strict.yml test.go

# Additional issues:
# - funlen: consider splitting
# - gocyclo: complexity too high
# - godot: missing function comment
# - revive: exported function needs doc
```

---

## 💡 Next Steps

### Immediate Actions

1. ✅ Copy appropriate config to project root as `.golangci.yml`
2. ✅ Run `golangci-lint run` and review output
3. ✅ Add pre-commit hook or CI integration
4. ✅ Update AI prompts to include config reference

### Future Improvements

- **Custom linters** for project-specific patterns using `go/analysis`
- **NilAway plugin** setup for nil safety
- **Modernize linter** integration (check latest golangci-lint)
- **Metrics tracking** (violations over time)
- **Team training** on common AI code issues

### Questions to Explore

- Can AI automatically fix all linter violations?
- Should different strictness for different packages?
- Custom linters for business logic patterns?
- Integration with AI code review tools (CodeRabbit, etc.)?

---

## 📝 Summary

**Maximum Strict Config:**

- 100+ linters enabled
- Strictest settings for greenfield projects
- Enforces Go best practices comprehensively
- Use for: new code, critical systems, OSS projects

**AI-Optimized Config:**

- ~40 curated linters targeting AI mistakes
- Balanced strictness for rapid iteration
- Focused on correctness + security
- Use for: AI coding workflows, prototyping, learning

**Key Insight:** AI-generated code benefits enormously from linting because:

1. AI doesn't "remember" context like resource cleanup
2. AI optimizes for "code that runs" not "production-ready code"
3. Linters teach AI about Go idioms through feedback loops
4. Automated enforcement prevents accumulation of technical debt

---

**Last Updated:** 2025-12-03
**golangci-lint Version:** v2.6.2
**Go Version:** 1.23+
