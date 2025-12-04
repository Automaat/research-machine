# 🦀 Validated Clippy Config Templates (2025-12-03)

**Rust Version:** 1.91.0
**Status:** ✅ Tested on real project
**Tags:** #rust #clippy #templates #validated

---

## 📋 Single Crate - Cargo.toml

```toml
[lints.rust]
unsafe_code = "warn"
missing_docs = "warn"

[lints.clippy]
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
dbg_macro = "warn"
print_stdout = "warn"
print_stderr = "warn"
exit = "deny"
lossy_float_literal = "deny"
rest_pat_in_fully_bound_structs = "deny"
str_to_string = "deny"
unnecessary_self_imports = "deny"
unneeded_field_pattern = "warn"
unseparated_literal_suffix = "warn"
```

---

## 📝 clippy.toml

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
max-struct-bools = 3

# Large error types threshold
large-error-threshold = 128
```

---

## 🔍 Corrections from Original Template

### Fixed Field Names

- ❌ `struct-excessive-bools`
- ✅ `max-struct-bools`

### Removed Deprecated Lints

- ❌ `string_to_string = "deny"` (removed from Cargo.toml)
- Note: Covered by `implicit_clone` now

---

## 🚀 Quick Start

1. **Copy Cargo.toml section** to your `[package]` Cargo.toml
2. **Create clippy.toml** in project root
3. **Test config:**

   ```bash
   cargo clippy --all-targets --all-features
   ```

4. **Auto-fix issues:**

   ```bash
   cargo clippy --fix
   ```

---

## ⚠️ Known Issues to Watch

1. **Field name changes** - Validate against your Rust version
2. **Deprecated lints** - Check for removal warnings
3. **MSRV compatibility** - Adjust `msrv` field to match project

---

**Last Validated:** 2025-12-03
**Rust Version:** 1.91.0
**Status:** Production-ready ✅
