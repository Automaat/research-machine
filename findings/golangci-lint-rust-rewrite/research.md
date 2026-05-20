# Could golangci-lint Be Rewritten in Rust?

**Date:** 2026-03-20
**Tags:** #research #golang #rust #static-analysis #performance
**Focus:** Feasibility of Rust rewrite for golangci-lint performance

---

## TL;DR

A full Rust rewrite of golangci-lint is **practically infeasible** due to deep coupling with Go's type system (`go/types`, `go/ast`, `go/packages`). However, partial Rust components (orchestration, caching, tree-sitter-based syntactic linters) and Go-native architectural improvements (gopls-style separate compilation) offer realistic paths to 5-10x performance gains.

---

## 1. Has Anyone Attempted a Rust Rewrite?

- **No.** No public project, discussion, or GitHub issue proposes rewriting golangci-lint in Rust
- golangci-lint maintainers have not discussed it on their roadmap
- The v2 release (March 2025) focused on config overhaul, not architectural rewrite
- No Rust-based Go linter exists in the ecosystem

## 2. Fundamental Architectural Constraints

### Why a full rewrite is impractical

- **go/analysis framework**: golangci-lint wraps 100+ linters built on `go/analysis`, which requires `go/types` and `go/ast` -- Go's own type checker and AST
- **Type information is essential**: Most valuable linters (staticcheck, errcheck, govet, unused) need full type-checked AST with resolved symbols, interfaces, and type assertions
- **go/types cannot be replicated externally**: It encodes Go's exact type system semantics (structural typing, interface satisfaction, type inference). Reimplementing this in Rust would be a multi-year effort equivalent to writing a Go compiler frontend
- **Export data format**: Go's compiled package summaries (`.a` files) are in Go-internal format, not easily consumed from non-Go tools

### What could theoretically be in Rust

- **Orchestration layer**: File discovery, caching, result aggregation, config parsing
- **Syntactic linters**: Style checks, naming conventions, import ordering (via tree-sitter)
- **Report formatting**: Output rendering, SARIF generation

## 3. Rust-Based Static Analysis for Go

### Existing tools

| Tool | Language | Go Support | Approach |
|------|----------|-----------|----------|
| **Semgrep/OpenGrep** | OCaml core | Yes (30+ langs) | Tree-sitter parsing, pattern matching |
| **Datadog Static Analyzer** | Rust | Partial | Tree-sitter + JS rule engine |
| **tree-sitter-go** | C (Rust bindings) | Parsing only | Concrete syntax tree, no types |

### Key insight from Datadog's Java-to-Rust migration

- 3x faster analysis, **10x memory reduction**
- Migrated from ANTLR to tree-sitter
- BUT: their analyzer does pattern-matching/security scanning, NOT deep type-aware analysis like staticcheck
- Go support is limited -- they don't replicate `go/types`

## 4. Main Bottlenecks in golangci-lint

### Memory (the primary problem)

- Users report **34GB-80GB+ memory** on large codebases
- `staticcheck` and `gosimple` are worst offenders
- `go/packages` loads **entire transitive dependency graph** into memory as typed ASTs
- Typed syntax trees are ~30x larger than source code in memory
- Go version mismatches between golangci-lint binary and project cause memory explosions

### CPU

- Type-checking all transitive deps is O(total code in dep graph)
- `unused` linter requires whole-program analysis
- SSA construction is expensive

### Architecture

- All linters share one `go/packages` load -- if any linter needs type info, everything gets loaded
- `go/analysis` multichecker doesn't support incremental analysis natively
- No per-package result persistence across runs (unlike gopls)

## 5. Alternative Approaches (More Promising Than Rust Rewrite)

### 5a. Gopls-style separate compilation (highest impact)

gopls v0.12 solved the same problem by:

- **Per-package processing** instead of whole-program loading
- **Compact API summaries** (like Go compiler export data) instead of full typed ASTs
- **File-based persistent cache** shared across invocations
- **Syntactic pruning**: skip re-analysis when changes don't affect exported API
- Result: **75% memory reduction**, sublinear scaling

**golangci-lint could adopt this pattern** but it requires rewriting the custom `go/analysis` runner. The staticcheck author has already done similar work for standalone staticcheck.

### 5b. Bazel nogo (incremental by design)

- Runs analyzers as part of `go build`, sharing compiler state
- Benefits from Bazel's incremental build + remote caching
- Individual package analysis, never loads whole program
- Existing projects port golangci-lint analyzers to nogo: [sluongng/nogo-analyzer](https://github.com/sluongng/nogo-analyzer)
- **Limitation**: requires Bazel build system

### 5c. Two-tier linting architecture

Split linters by cost:

1. **Fast tier (tree-sitter/syntactic)**: Style, naming, imports, simple patterns. Could be Rust-based. Runs in <1s
2. **Deep tier (go/analysis)**: Type-aware analysis. Runs with aggressive caching and incremental analysis

### 5d. WASM plugin system

- golangci-lint v2 has a plugin/custom binary builder system
- WASM could enable sandboxed, language-agnostic linter plugins
- **Not currently on roadmap** and wouldn't solve core memory problem

### 5e. Practical mitigations (available today)

- Use `linters.default: fast` in v2 config
- Disable `staticcheck`/`gosimple`/`unused` in CI, run them separately
- Set `GOGC=50` or `GOMEMLIMIT` to cap memory
- Use `--fast-only` flag for pre-commit hooks
- Ensure Go version alignment between golangci-lint binary and project

## 6. What Maintainers Say

- **ldez** (primary maintainer): focuses on Go version compatibility as root cause for many OOM reports
- Roadmap includes: "incremental analysis -- analyze only changed files and dependencies"
- Roadmap includes: "speed up SSA loading with on-disk cache"
- No discussion of cross-language rewrite
- v2 was config/UX focused, v3 may address performance architecture
- Memory issues often attributed to upstream `go/packages` and Go runtime GC behavior

### Key GitHub issues

- [#3582](https://github.com/golangci/golangci-lint/issues/3582) - 80GB+ memory usage
- [#5449](https://github.com/golangci/golangci-lint/issues/5449) - staticcheck/gosimple OOM
- [#5546](https://github.com/golangci/golangci-lint/issues/5546) - Performance regression since 1.62
- [#805](https://github.com/golangci/golangci-lint/issues/805) - Fine-grained incremental caching
- [#4909](https://github.com/golangci/golangci-lint/issues/4909) - Go 1.23 uses all memory

## 7. Hybrid Approach Assessment (Rust Orchestrator + Go Plugins)

### Feasibility: Medium, but questionable ROI

**What Rust orchestrator could handle:**

- File watching, change detection, dependency graph
- Cache management (persistent, cross-run)
- Parallel execution scheduling
- Result aggregation and deduplication
- Tree-sitter based fast linters

**What must stay in Go:**

- All `go/analysis` based linters (the valuable ones)
- Type checking via `go/types`
- SSA construction

**Communication overhead:**

- IPC between Rust orchestrator and Go linter processes adds latency
- Serializing/deserializing analysis results
- Managing Go process lifecycle

**Verdict:** The complexity doesn't justify gains. The bottleneck is **inside the Go type-checking**, not the orchestration layer. A Rust orchestrator would make the fast parts faster while the slow parts remain slow.

## 8. Cross-Language Static Analysis Precedents

| Tool | Architecture | Lesson |
|------|-------------|--------|
| **rust-analyzer** | Rust, demand-driven/incremental | Proved incremental analysis can make large codebases feel instant |
| **Semgrep** | OCaml core + Python CLI + tree-sitter | Multi-language via generic AST, but sacrifices type-awareness |
| **Biome** | Rust, JS/TS only | Reimplemented type inference (still incomplete) to avoid TSC dependency |
| **oxlint** | Rust, JS/TS only | 50-100x faster than ESLint by avoiding type-checked rules |
| **Datadog** | Rust + tree-sitter + deno JS | Pattern matching only, 10x memory reduction from Java |
| **gopls** | Go, separate compilation | Solved same problem golangci-lint has, 75% memory reduction |

### Pattern: tools that achieve big perf wins do so by **changing what they analyze**, not just the implementation language

- oxlint is fast because it **skips type-checked rules**
- gopls is fast because it **analyzes per-package, not whole-program**
- Datadog is fast because it does **pattern matching, not type analysis**

---

## Recommendations

### Short-term (use today)

1. Split linting: fast linters in pre-commit, full suite in CI
2. Use `GOMEMLIMIT` and `--fast-only` flag
3. Ensure Go version alignment
4. Consider running `staticcheck` standalone (it has its own memory optimizations)

### Medium-term (community/contribution)

1. Push for gopls-style per-package analysis in golangci-lint's `go/analysis` runner
2. Adopt nogo if using Bazel
3. Contribute to incremental analysis caching (roadmap item)

### Long-term (if building from scratch)

1. Tree-sitter based Rust linter for syntactic checks (fast tier)
2. Go-native incremental type-aware analyzer (deep tier)
3. Shared persistent cache between tiers
4. **Don't try to rewrite go/types in Rust** -- use Go for what requires Go

---

## Sources

- [golangci-lint Architecture](https://golangci-lint.run/docs/contributing/architecture/)
- [golangci-lint Roadmap](https://golangci-lint.run/docs/product/roadmap/)
- [golangci-lint v2 Announcement](https://ldez.github.io/blog/2025/03/23/golangci-lint-v2/)
- [Scaling gopls for the Growing Go Ecosystem](https://go.dev/blog/gopls-scalability)
- [Datadog: Java to Rust Static Analyzer Migration](https://www.datadoghq.com/blog/engineering/how-we-migrated-our-static-analyzer-from-java-to-rust/)
- [DeepSource: Lightweight Linting with Tree-sitter](https://deepsource.com/blog/lightweight-linting)
- [How to Write a Linter Using Tree-sitter](https://siraben.dev/2022/03/22/tree-sitter-linter.html)
- [GitHub: Memory 80GB+ Issue #3582](https://github.com/golangci/golangci-lint/issues/3582)
- [GitHub: Staticcheck OOM Issue #5449](https://github.com/golangci/golangci-lint/issues/5449)
- [GitHub: Performance Regression Issue #5546](https://github.com/golangci/golangci-lint/issues/5546)
- [GitHub: Incremental Caching Issue #805](https://github.com/golangci/golangci-lint/issues/805)
- [Bazel nogo](https://github.com/bazelbuild/rules_go/blob/master/go/nogo.rst)
- [nogo-analyzer](https://github.com/sluongng/nogo-analyzer)
- [go/analysis Package](https://pkg.go.dev/golang.org/x/tools/go/analysis)

---

**Suggested location:** 3_Resources/Engineering/
**Potential MOCs:** [[Static Analysis]], [[Go Tooling]], [[Performance Engineering]]
**Tags:** #golang #rust #static-analysis #performance #tooling
