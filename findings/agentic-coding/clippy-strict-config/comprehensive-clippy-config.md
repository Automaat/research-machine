# 🦀 Comprehensive Clippy Configuration for Best Practices & AI Coding

**Date:** 2025-12-03
**Tags:** #rust #clippy #linter #best-practices #ai-coding
**Focus:** Maximum strictness for quality code and AI workflow

---

## 🎯 Overview

Strongest Clippy config using modern Cargo.toml `[lints]` table (Rust 1.74+) + clippy.toml for maximum code quality
and AI-friendly strict rules.

---

## 📋 Cargo.toml Configuration

### Option 1: Workspace-Level (Recommended for Multi-Crate)

```toml
# In workspace root Cargo.toml
[workspace.lints.rust]
unsafe_code = "warn"
missing_docs = "warn"

[workspace.lints.clippy]
# Core groups
all = "deny"
pedantic = "warn"
nursery = "warn"

# Restriction lints - cherry-picked for safety
unwrap_used = "deny"
expect_used = "deny"
panic = "deny"
todo = "warn"
unimplemented = "warn"
unreachable = "deny"

# Additional quality lints
missing_docs_in_private_items = "allow"  # Too strict for most
dbg_macro = "warn"
print_stdout = "warn"
print_stderr = "warn"
exit = "deny"
lossy_float_literal = "deny"
rest_pat_in_fully_bound_structs = "deny"
str_to_string = "deny"
string_to_string = "deny"
unnecessary_self_imports = "deny"
unneeded_field_pattern = "warn"
unseparated_literal_suffix = "warn"
```

**In each crate's Cargo.toml:**

```toml
[lints]
workspace = true
```

### Option 2: Single Crate

```toml
[lints.rust]
unsafe_code = "warn"
missing_docs = "warn"

[lints.clippy]
all = "deny"
pedantic = "warn"
nursery = "warn"
unwrap_used = "deny"
expect_used = "deny"
panic = "deny"
todo = "warn"
dbg_macro = "warn"
print_stdout = "warn"
exit = "deny"
```

---

## 📝 clippy.toml Configuration

Create `clippy.toml` or `.clippy.toml` in project root:

```toml
# MSRV - adjust to your minimum Rust version
msrv = "1.75.0"

# Cognitive complexity threshold (lower = stricter)
cognitive-complexity-threshold = 15

# Type complexity threshold
type-complexity-threshold = 100

# Disallowed method examples
disallowed-methods = [
    # Example: prevent dangerous methods
    # { path = "std::env::set_var", reason = "use scoped variant instead" },
]

# Disallowed type examples
disallowed-types = [
    # Example: enforce specific types
    # { path = "std::collections::HashMap", reason = "use FxHashMap for performance" },
]

# Allow unwrap/expect in tests
allow-unwrap-in-tests = true
allow-expect-in-tests = true

# Suppress specific lints in test code
suppress-restriction-lint-in-const = true

# Vec initialization size threshold
vec-box-size-threshold = 4096

# Literal representation improvements
literal-representation-threshold = 16384

# Single char pattern threshold
single-char-binding-names-threshold = 4

# Function argument count warning
too-many-arguments-threshold = 7

# Enum variant name threshold
enum-variant-name-threshold = 3

# Struct field count for too_many_fields lint
struct-excessive-bools = 3

# Large error types threshold
large-error-threshold = 128
```

---

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: Clippy

on: [push, pull_request]

jobs:
  clippy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
        with:
          components: clippy

      - name: Run Clippy (deny warnings)
        run: |
          cargo fmt --workspace -- --check
          cargo clippy --all-targets --all-features -- -D warnings
          cargo test --workspace
```

### Local Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

set -e

echo "Running cargo fmt..."
cargo fmt --all -- --check

echo "Running clippy..."
cargo clippy --all-targets --all-features -- -D warnings

echo "Running tests..."
cargo test --quiet
```

---

## 🤖 AI Coding Workflow Benefits

### 1. **Clear Rules**

- `deny` on `all` = AI gets immediate errors on common mistakes
- `deny` on `unwrap_used`/`expect_used`/`panic` = forces proper error handling

### 2. **Pedantic Mode**

- AI learns idiomatic Rust patterns
- Catches overly complex code
- Enforces consistent naming

### 3. **Fast Feedback Loop**

- Run `cargo clippy --fix` for auto-fixes
- AI can iterate quickly with concrete error messages

### 4. **Safety Guarantees**

- Restriction lints prevent panics in production
- AI can't accidentally introduce unsafe patterns

---

## ⚙️ Usage Commands

```bash
# Standard check
cargo clippy

# All targets + features (recommended for CI)
cargo clippy --all-targets --all-features

# Deny all warnings (strict mode)
cargo clippy -- -D warnings

# Auto-fix issues
cargo clippy --fix

# Pedantic mode
cargo clippy -- -W clippy::pedantic

# Combined strict check
cargo clippy --all-targets --all-features -- -D warnings -W clippy::pedantic
```

---

## ⚠️ Important Notes

### Restriction Lints

**DON'T enable `clippy::restriction` as a whole** - cherry-pick specific lints:

- ✅ `unwrap_used`, `expect_used`, `panic` - prevent panics
- ✅ `todo`, `unimplemented` - catch incomplete code
- ✅ `dbg_macro`, `print_stdout` - prevent debug code in prod
- ✅ `exit` - prevent process exits in libraries

### Pedantic False Positives

Expect to use `#[allow(clippy::...)]` occasionally for:

- `clippy::missing_errors_doc` - docs on every error
- `clippy::module_name_repetitions` - sometimes necessary
- `clippy::must_use_candidate` - overly aggressive

### Nursery Lints

Set to `warn` not `deny` - still experimental, may have bugs.

---

## 🔧 Selective Overrides

In specific files/modules where strict rules are too much:

```rust
// Module-level
#![allow(clippy::unwrap_used)]

// Function-level
#[allow(clippy::missing_errors_doc)]
fn my_function() -> Result<(), Error> {
    // ...
}

// Statement-level
#[allow(clippy::cast_possible_truncation)]
let x = big_number as u32;
```

---

## 📊 Lint Levels Hierarchy

1. **forbid** - Cannot be overridden (rarely use)
2. **deny** - Error, can be overridden with `#[allow]`
3. **warn** - Warning, doesn't fail build
4. **allow** - Silent (default for restriction/nursery)

**For AI workflow: Use `deny` for must-fix, `warn` for should-fix**

---

## 🎓 Best Practices Summary

✅ **DO:**

- Use `[lints]` table in Cargo.toml (modern, workspace-friendly)
- Enable `all` + `pedantic` at minimum
- Cherry-pick specific restriction lints
- Use `-D warnings` in CI
- Allow unwrap/expect in tests via clippy.toml
- Run `cargo clippy --fix` regularly

❌ **DON'T:**

- Enable `clippy::restriction` group wholesale
- Set nursery to `deny` (unstable lints)
- Ignore clippy warnings without review
- Use `#![allow(clippy::all)]` broadly

---

## 🔗 Sources

- [Configuration - Clippy Documentation](https://doc.rust-lang.org/clippy/configuration.html)
- [Mastering Clippy: Elevating Your Rust Code Quality](https://rust-trends.com/posts/mastering-clippy-elevating-your-rust-code-quality/)
- [Clippy Lints](https://rust-lang.github.io/rust-clippy/master/index.html)
- [Pedantic Clippy](https://zhauniarovich.com/post/2021/2021-09-pedantic-clippy/)
- [Workspace Lints](https://coreyja.com/til/clippy-pedantic-workspace)
- [Stack Overflow: Workspace Clippy Config](https://stackoverflow.com/questions/67568003/how-can-i-have-a-shared-clippy-configuration-for-all-the-crates-in-a-workspace)

---

**Suggested location:** 3_Resources/Rust/
**Potential MOCs:** [[Rust Tooling MOC]], [[Code Quality MOC]]
**Tags:** #rust #clippy #linting #ci-cd #code-quality
