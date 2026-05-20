# Code Review: PR #31678 - Change `ARM_PROVIDER_ENHANCED_VALIDATION` default to `false` in 5.0

**Repository:** hashicorp/terraform-provider-azurerm
**Author:** katbyte
**Status:** Merged
**Labels:** enhancement, breaking-change, documentation, ai-assisted

---

## Summary

This PR changes the default for enhanced validation (location + resource provider caching from Azure MetaData Service) from enabled to disabled in v5.0. It also splits the single boolean toggle into two granular controls (`locations` and `resource_providers`), adds a new `enhanced_validation` provider block, introduces specific environment variables, and deprecates the legacy `ARM_PROVIDER_ENHANCED_VALIDATION` env var.

---

## Positive Observations

- **Well-structured breaking change**: The migration path is clear -- legacy env var is rejected in 5.0 with an actionable error message pointing users to the replacements.
- **Granularity improvement**: Splitting location validation and resource provider validation into separate toggles is a good design decision. Users who only need one can avoid the latency of the other.
- **Backward compatibility in 4.x**: The `!FivePointOh()` gating ensures 4.x behavior is preserved, with conflict detection if both legacy and new env vars are set simultaneously.
- **Documentation**: Upgrade guide and provider docs are both updated, which is the right thing to do for a breaking change.
- **Separation of concerns in `builder.go`**: The location caching and resource provider caching are now in separate `if` blocks with independent timeouts, which is cleaner than the previous combined approach.

---

## Issues Found

### High Severity

#### 1. Duplicate validation logic between framework and SDK provider paths

The legacy env var validation is duplicated in two places with slightly different implementations:

- `internal/provider/framework/config.go` (lines ~129-137): Uses `ValidateEnhancedValidationEnvVars()` for 4.x but then has inline logic for 5.0.
- `internal/provider/provider.go` (lines ~569-576): Same pattern but with `diag.Errorf` instead of `diag.NewErrorDiagnostic`.

The 5.0 branch in `framework/config.go` duplicates the error message from `ValidateEnhancedValidationEnvVars()` rather than calling it. The `ValidateEnhancedValidationEnvVars()` function already handles the 5.0 case internally, so the framework config could just call `ValidateEnhancedValidationEnvVars()` unconditionally instead of branching on `FivePointOh()` externally.

```go
// Current (framework/config.go):
if !providerfeatures.FivePointOh() {
    if err := providerfeatures.ValidateEnhancedValidationEnvVars(); err != nil { ... }
} else if os.Getenv("ARM_PROVIDER_ENHANCED_VALIDATION") != "" {
    // inline error message duplicating what ValidateEnhancedValidationEnvVars already does
}

// Simpler:
if err := providerfeatures.ValidateEnhancedValidationEnvVars(); err != nil { ... }
```

This applies to both `framework/config.go` and `provider.go`.

#### 2. `EnhancedValidationEnabled()` is now dead code in 5.0 path

The function `EnhancedValidationEnabled()` is still referenced by `EnhancedValidationLocationsEnabled()` and `EnhancedValidationResourceProvidersEnabled()` as a fallback in the `!FivePointOh()` path. However, in 5.0, `ValidateEnhancedValidationEnvVars()` rejects the legacy env var entirely. This means `EnhancedValidationEnabled()` will never actually be called in a 5.0 runtime (because setting the legacy env var is an error). The function should be marked as deprecated or removed in the 5.0 cleanup to avoid confusion.

### Medium Severity

#### 3. `DefaultFunc` evaluated at schema registration time, not at runtime

In `internal/provider/provider.go`:

```go
"locations": {
    DefaultFunc: schema.EnvDefaultFunc("ARM_PROVIDER_ENHANCED_VALIDATION_LOCATIONS",
        features.EnhancedValidationLocationsEnabled()),
    ...
},
```

`features.EnhancedValidationLocationsEnabled()` is called once when the schema is built (provider initialization), and its result becomes the static fallback default. This is technically fine for env-var-based defaults since env vars don't change during a provider run, but it creates a subtle coupling: the default is baked in at schema registration time. If the provider schema were ever cached across runs (unlikely but possible in test scenarios), this could produce stale defaults. A comment clarifying this would help future maintainers.

#### 4. Test assertions hardcode `true` for `EnhancedValidation` in feature expansion tests

In `internal/provider/features_test.go`, all three test cases set:

```go
EnhancedValidation: features.EnhancedValidationFeatures{
    Locations:         true,
    ResourceProviders: true,
},
```

There is no test case that verifies the `false` default in a 5.0 context. The tests only confirm that when the `enhanced_validation` block is explicitly provided, it works. There should be a test case that exercises the 5.0 default (both `false`) to catch regressions.

#### 5. Missing test coverage for `ValidateEnhancedValidationEnvVars()`

The PR description says "Existing unit tests pass. No new tests required," but `ValidateEnhancedValidationEnvVars()` is a new function with multiple code paths (legacy env var in 5.0, conflict detection in 4.x). This deserves dedicated unit tests:

- Legacy env var set in 5.0 -> error
- Legacy env var set alone in 4.x -> no error
- Legacy + specific env var set in 4.x -> error
- No env vars set -> no error

#### 6. No test for `EnhancedValidationLocationsEnabled()` and `EnhancedValidationResourceProvidersEnabled()`

These two new functions have their own fallback logic (specific env var -> legacy env var -> version default) and should have unit tests covering each branch.

### Low Severity

#### 7. Inconsistent heading levels in upgrade guide

The PR changes the heading structure from `##` to `###`/`####`/`#####` for the Resource Provider Registration section, which is good for nesting under the new "Provider-Level Changes" section. However, the resulting hierarchy jumps from `###` ("Provider-Level Changes") to `#####` ("What this means") with `####` for "Resource Provider Registration Changes" in between. The five-level nesting (`#####`) is deep and unusual for markdown documentation -- consider flattening one level.

#### 8. Documentation placement for `enhanced_validation` block

In `website/docs/index.html.markdown`, the `enhanced_validation` block documentation is added inline but there's no corresponding entry in the provider arguments table at the top of the page (the "Argument Reference" section) that mentions `enhanced_validation` as a supported block. Users scanning the arguments list won't discover it. The `features` block is listed there; `enhanced_validation` should be too.

#### 9. Missing `features {}` in upgrade guide HCL example

The `enhanced_validation` example in the upgrade guide doesn't include the required `features {}` block:

```hcl
provider "azurerm" {
  enhanced_validation {
    locations          = true
    resource_providers = true
  }
}
```

Since `features` is required (`SizeBetween(1, 1)`), this example would fail if copy-pasted directly. Should include `features {}` for completeness.

#### 10. The `EnhancedValidationModel` and `EnhancedValidationModelAttributes` are exported but only used internally

In `internal/provider/framework/model.go`, these are exported types used only within the `framework` package (except in `config_test.go` which is the same package). They could be unexported for better encapsulation, consistent with how some other model types in the file are handled. Minor stylistic point.

---

## Architecture Assessment

The overall approach is sound: using `FivePointOh()` feature flags for version-gated behavior changes is consistent with the provider's existing patterns. The split into per-feature granularity (locations vs. resource providers) is a good forward-looking decision.

The dual provider paths (SDK v2 in `provider.go` and framework in `framework/`) are a known complexity in this codebase due to the ongoing migration. The PR handles both paths, though the duplication noted above could be reduced.

---

## Verdict

**Approve with minor suggestions.** The core logic is correct and the breaking change is well-documented with a clear migration path. The main concerns are:

1. Duplicated validation logic that could diverge over time (medium risk)
2. Missing unit tests for new functions (medium risk)
3. Minor documentation gaps (low risk)

The PR was reviewed by the maintainer team and approved after one round of feedback, which addressed the initial gap of not exposing the provider block argument. The final state is solid for a breaking change PR.
