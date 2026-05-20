# golangci-lint Recommended Linters (2024/2025)

**Date:** 2026-04-02
**Tags:** #go #linting #golangci-lint #code-quality #devtools
**Focus:** Which linters to enable and why, based on official docs + community sources

---

## 📌 Key Context: v2 Released March 2025

golangci-lint v2 shipped in March 2025 with major config changes:

- `enable-all` / `disable-all` replaced by `linters.default: standard|all|none|fast`
- Default is `linters.default: standard` (the old default enabled linters)
- New `formatters:` section (separate from linters)
- `linters.settings` moved inside `linters:` block
- `golangci-lint migrate` command auto-converts v1 → v2 configs
- No exclusions by default in v2 (must opt in to exclusion presets)

Source: [Welcome to golangci-lint v2](https://ldez.github.io/blog/2025/03/23/golangci-lint-v2/)

---

## 🔧 Default "standard" Linter Set (v2)

The `linters.default: standard` set is the built-in baseline. Based on official docs and community sources, the standard set includes these linters (the v1 defaults carried forward):

| Linter | What it checks |
|---|---|
| `errcheck` | Unchecked errors in Go code |
| `govet` | Suspicious constructs (same as `go vet`) |
| `staticcheck` | 150+ checks: bugs, perf, style (gold standard) |
| `unused` | Unused constants, variables, functions, types |
| `ineffassign` | Assignments to variables that are never read |

> To verify your exact standard set: `golangci-lint linters`

Source: [golangci-lint Linters docs](https://golangci-lint.run/docs/linters/), [Configuration File docs](https://golangci-lint.run/docs/configuration/file/)

---

## ✅ Community-Recommended Linters to Enable (Beyond Defaults)

### 🔴 Error Handling (highest value)

| Linter | Why |
|---|---|
| `errcheck` | Catches unchecked errors — mandatory |
| `errorlint` | Finds error wrapping mistakes (e.g., `== err` instead of `errors.Is`) |
| `nilerr` | Catches `return nil` when `err != nil` |
| `nilnesserr` | Reports `err != nil` checks that actually check a different nil |
| `nilnil` | Disallows simultaneous nil error + nil value returns |
| `wrapcheck` | Ensures external errors are wrapped before returning |

### 🟠 Security

| Linter | Why |
|---|---|
| `gosec` | SQL injection, hardcoded creds, weak crypto, unsafe patterns |
| `noctx` | Detects HTTP calls missing `context.Context` |

### 🟡 Code Quality & Complexity

| Linter | Why |
|---|---|
| `revive` | Drop-in `golint` replacement, 60+ configurable rules |
| `gocritic` | Bugs, performance, style — opinionated but valuable |
| `gocyclo` | Cyclomatic complexity (default threshold: 30) |
| `cyclop` | Also cyclomatic complexity, package-level too |
| `gocognit` | Cognitive complexity (harder to understand = higher score) |
| `nestif` | Deeply nested if statements |
| `funlen` | Long functions (default: 60 lines) |
| `goconst` | Repeated string literals that should be constants |
| `dupl` | Detects copy-pasted code blocks |
| `maintidx` | Maintainability index score |

### 🟢 Correctness & Safety

| Linter | Why |
|---|---|
| `bodyclose` | HTTP response body not closed = memory leak |
| `sqlclosecheck` | sql.Rows/sql.Stmt not closed |
| `rowserrcheck` | sql.Rows.Err() not checked |
| `copyloopvar` | Go 1.22+ loop variable capture issues |
| `durationcheck` | Two durations multiplied together (always a bug) |
| `makezero` | Slice with non-zero initial length used with append |
| `wastedassign` | Wasted assignment statements |
| `unconvert` | Unnecessary type conversions |
| `unparam` | Unused function parameters |
| `predeclared` | Shadowing Go's predeclared identifiers |
| `reassign` | Package-level variables being reassigned |
| `recvcheck` | Inconsistent receiver types (mix of pointer/value) |

### 🔵 Modern Go Practices

| Linter | Why |
|---|---|
| `modernize` | Suggests stdlib/language improvements |
| `exptostd` | Replace `golang.org/x/exp` with stdlib equivalents |
| `intrange` | Use integer range in for loops (Go 1.22+) |
| `usestdlibvars` | Use stdlib constants instead of string literals |
| `perfsprint` | Replace `fmt.Sprintf` with faster alternatives |
| `mirror` | Correct bytes/strings usage patterns |

### 🟣 Style & Documentation

| Linter | Why |
|---|---|
| `godot` | Comments should end with a period |
| `godoclint` | Godoc conventions |
| `misspell` | Spelling errors in comments/strings |
| `nakedret` | Naked returns in long functions |
| `nonamedreturns` | Disallows all named returns (stricter) |
| `whitespace` | Unnecessary newlines at start/end of blocks |
| `nolintlint` | Validates lint-suppression directives (requires reasons) |

### ⚫ Testing

| Linter | Why |
|---|---|
| `testifylint` | testify usage mistakes (e.g., wrong assert argument order) |
| `testableexamples` | Ensures examples are testable (have `// Output:`) |
| `testpackage` | Forces `package foo_test` separation |
| `tparallel` | Enforces `t.Parallel()` usage |
| `usetesting` | Reports deprecated testing helpers |

---

## 🚫 Commonly Disabled (with reasons)

| Linter | Why disabled |
|---|---|
| `exhaustruct` | Too noisy — requires all struct fields initialized |
| `contextcheck` | Too many false positives |
| `varnamelen` | Great idea, excessive false positives |
| `misspell` | Maratori marks as "useless" (too many false positives) |
| `wsl` | **Deprecated** — use `wsl_v5` instead |
| `godox` | Opinion-dependent (TODO/FIXME comments) |
| `lll` | Line length enforcement — use formatter instead |
| `gofmt` / `goimports` | Go to `formatters:` section in v2, not `linters:` |

---

## 📄 Example Configs

### Minimal starter (reintech.io / glukhov.org consensus)

```yaml
version: "2"

linters:
  default: standard
  enable:
    - bodyclose
    - errorlint
    - gosec
    - goconst
    - gocritic
    - nilerr
    - nolintlint
    - revive
    - staticcheck
    - whitespace

formatters:
  enable:
    - goimports
```

### Comprehensive config (maratori "golden config" — golangci-lint v2.7.1+)

Source: [maratori/golangci-lint-config](https://github.com/maratori/golangci-lint-config) / [gist](https://gist.github.com/maratori/47a4d00457a92aa426dbd48a18776322)

```yaml
version: "2"

issues:
  max-same-issues: 50

formatters:
  enable:
    - goimports
    - golines
  settings:
    goimports:
      local-prefixes:
        - github.com/my/project
    golines:
      max-len: 120

linters:
  enable:
    - asasalint
    - asciicheck
    - bidichk
    - bodyclose
    - canonicalheader
    - copyloopvar
    - cyclop
    - depguard
    - dupl
    - durationcheck
    - embeddedstructfieldcheck
    - errcheck
    - errname
    - errorlint
    - exhaustive
    - exptostd
    - fatcontext
    - forbidigo
    - funcorder
    - funlen
    - gocheckcompilerdirectives
    - gochecknoglobals
    - gochecknoinits
    - gochecksumtype
    - gocognit
    - goconst
    - gocritic
    - gocyclo
    - godoclint
    - godot
    - gomoddirectives
    - goprintffuncname
    - gosec
    - govet
    - iface
    - ineffassign
    - intrange
    - iotamixing
    - loggercheck
    - makezero
    - mirror
    - mnd
    - modernize
    - musttag
    - nakedret
    - nestif
    - nilerr
    - nilnesserr
    - nilnil
    - noctx
    - nolintlint
    - nonamedreturns
    - nosprintfhostport
    - perfsprint
    - predeclared
    - promlinter
    - protogetter
    - reassign
    - recvcheck
    - revive
    - rowserrcheck
    - sloglint
    - spancheck
    - sqlclosecheck
    - staticcheck
    - testableexamples
    - testifylint
    - testpackage
    - tparallel
    - unconvert
    - unparam
    - unqueryvet
    - unused
    - usestdlibvars
    - usetesting
    - wastedassign
    - whitespace
```

---

## 🔑 Key Findings by Source

### Official docs (golangci-lint.run)

- v2 `linters.default: standard` = baseline (errcheck, govet, staticcheck, unused, ineffassign)
- `formatters:` is now a separate top-level section for goimports, gofumpt, golines, etc.
- Exclusion presets available: `comments`, `std-error-handling`, `common-false-positives`, `legacy`
- Source: [golangci-lint.run/docs/linters](https://golangci-lint.run/docs/linters/), [golangci-lint.run/docs/configuration/file](https://golangci-lint.run/docs/configuration/file/)

### maratori "golden config" (most cited community reference, 114 GitHub stars)

- 60+ linters enabled, every linter documented with a comment
- Intentionally strict but not draconian
- Disables: `contextcheck` (false positives), `varnamelen` (false positives), `misspell` (useless)
- Recommends enabling `exhaustruct` if you want maximum strictness
- Source: [github.com/maratori/golangci-lint-config](https://github.com/maratori/golangci-lint-config)

### glukhov.org (2025 blog post)

- Core 10: staticcheck, gosimple, govet, errcheck, gosec, revive, gocyclo, misspell, unconvert, unparam
- Source: [glukhov.org/post/2025/11/linters-for-go](https://www.glukhov.org/post/2025/11/linters-for-go/)

### reintech.io guide

- Recommends graduated approach: start small, add one linter per sprint
- Starter 11: errcheck, gosimple, govet, ineffassign, staticcheck, unused, gofmt, goimports, misspell, revive, gosec
- Source: [reintech.io/blog/go-linting-static-analysis-golangci-lint-configuration-guide](https://reintech.io/blog/go-linting-static-analysis-golangci-lint-configuration-guide)

### freshman.tech guide

- 28-linter config including bodyclose, goconst, gocritic, nolintlint, prealloc, dupl
- Check type assertions in errcheck: `check-type-assertions: true`
- Check shadowing in govet: `check-shadowing: true`
- Source: [freshman.tech/linting-golang](https://freshman.tech/linting-golang/)

---

## 🗺️ Connections

[[Go Best Practices]], [[Code Quality]], [[Static Analysis]], [[golangci-lint Rust Rewrite]]

## Sources

- [golangci-lint Linters](https://golangci-lint.run/docs/linters/)
- [golangci-lint Configuration File](https://golangci-lint.run/docs/configuration/file/)
- [Welcome to golangci-lint v2](https://ldez.github.io/blog/2025/03/23/golangci-lint-v2/)
- [maratori golden config gist](https://gist.github.com/maratori/47a4d00457a92aa426dbd48a18776322)
- [maratori/golangci-lint-config repo](https://github.com/maratori/golangci-lint-config)
- [Go Linters: Essential Tools - glukhov.org](https://www.glukhov.org/post/2025/11/linters-for-go/)
- [GolangCI-Lint Configuration Guide - reintech.io](https://reintech.io/blog/go-linting-static-analysis-golangci-lint-configuration-guide)
- [A Complete Guide to Linting Go Programs - freshman.tech](https://freshman.tech/linting-golang/)
- [olegk.dev: Go linters configuration](https://olegk.dev/go-linters-configuration-the-right-version)
