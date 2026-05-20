# Staff Code Review: provider: change `ARM_PROVIDER_ENHANCED_VALIDATION` default to `false` in 5.0

**PR:** [hashicorp/terraform-provider-azurerm#31678](https://github.com/hashicorp/terraform-provider-azurerm/pull/31678)
**Author:** @katbyte (kt)
**State:** MERGED
**Size:** +264 / -14 across 12 files
**Labels:** enhancement, breaking-change, documentation, ai-assisted

---

## Triage Assessment

**Does this need to exist?** Yes. The enhanced validation feature makes network calls to Azure MetaData Service on every provider init, adding latency and producing false negatives for functional-but-unlisted regions. Flipping the default in a major version is the right time to make this breaking change.

**Does it solve the right problem?** Mostly. The PR goes beyond just flipping a boolean -- it introduces a new `enhanced_validation` provider block with granular `locations` and `resource_providers` controls, deprecates the legacy env var in 5.0, and adds proper migration documentation. The scope expanded from the original "flip a default" to "introduce a new configuration surface," which is actually the right call since it was flagged in review that the feature was previously env-var-only with no HCL configuration.

**Can it handle failure?** The existing 10-minute timeout on MetaData Service calls is preserved. Failure to cache resource providers is already a soft failure (log + continue). No new failure modes introduced.

**Is it understandable?** The code is straightforward. The three-tier env var precedence (specific > legacy > version default) adds some cognitive load but is well-documented in code comments.

**Does it fit the bigger picture?** Aligns with the 5.0 pattern of reducing implicit provider behavior (similar to the `resource_provider_registrations` default changing to `none`). Uses the existing `FivePointOh()` feature flag mechanism consistently.

**Scope and size:** 264 additions across 12 files is reasonable for a change touching both SDK v2 and framework providers, plus docs. Not a candidate for splitting.

**Design doc needed?** No. This is a well-scoped configuration default change with clear migration path. The 5.0 upgrade guide serves as the design artifact.

---

## Review Summary

**Verdict:** APPROVE_WITH_COMMENTS
**Blocking issues:** 2
**Non-blocking suggestions:** 5

---

## Blocking Issues

**blocking:** Duplicated validation logic across SDK v2 and framework providers with subtle divergence.

The `ValidateEnhancedValidationEnvVars()` function is called in `provider.go` with a guarded `!features.FivePointOh()` check, but then there's an `else if` that manually checks the same env var for the 5.0 case. This identical pattern is duplicated in `framework/config.go`. The validation function itself already handles both the 4.x and 5.0 cases internally, so the callers are re-implementing the 5.0 branch outside the function.

This creates a maintenance hazard: if the error message or behavior needs to change, it must be updated in three places (the function + two call sites). The `ValidateEnhancedValidationEnvVars()` function should handle both paths, and callers should just call it unconditionally.

*Location:* `internal/provider/provider.go:569-575` and `internal/provider/framework/config.go:129-135`

---

**blocking:** `EnhancedValidationLocationsEnabled()` and `EnhancedValidationResourceProvidersEnabled()` ignore the legacy env var in 5.0, but `ValidateEnhancedValidationEnvVars()` errors if the legacy env var is set in 5.0. This creates an inconsistency window.

If `ValidateEnhancedValidationEnvVars()` is NOT called (e.g., a code path that skips validation), and the legacy env var is set, the `EnhancedValidationLocationsEnabled()` function silently returns `false` in 5.0 instead of respecting the legacy env var or erroring. The functions should either consistently error or consistently fall back. Currently the behavior depends on which function is called first and whether validation ran.

*Location:* `internal/features/enhanced_validation.go:38-47` and `internal/features/enhanced_validation.go:58-67`

---

## Architecture & Design

**suggestion:** The `enhanced_validation` block is defined as a `schema.TypeList` with `MaxItems: 1` in the SDK v2 provider, and as a `ListNestedBlock` with `SizeAtMost(1)` in the framework provider. This is a common Terraform provider pattern for optional singleton blocks, but the framework is moving toward `SingleNestedBlock` for this use case. Consider using `SingleNestedBlock` in the framework provider for cleaner ergonomics -- it avoids the list-unwrapping boilerplate in `config.go` (lines 139-153).

*Location:* `internal/provider/framework/provider.go:242`

---

**suggestion:** The `DefaultFunc` in the SDK v2 schema evaluates `features.EnhancedValidationLocationsEnabled()` at schema definition time (provider startup), not at resource evaluation time. This means the env var evaluation happens once and is baked into the schema default. This is fine for the current use case but is worth noting as it creates a subtle ordering dependency -- the schema must be built after env vars are set.

*Location:* `internal/provider/provider.go:389-390`

---

**thought:** The PR introduces three environment variables for what was one (`ARM_PROVIDER_ENHANCED_VALIDATION` -> `ARM_PROVIDER_ENHANCED_VALIDATION_LOCATIONS` + `ARM_PROVIDER_ENHANCED_VALIDATION_RESOURCE_PROVIDERS`), plus an HCL block. That is four configuration surfaces for one feature. In 18 months, someone will ask "how do I enable enhanced validation?" and get a confusing answer. Consider whether the granular env vars are actually needed given the HCL block exists, or whether the env vars should just be `ARM_PROVIDER_ENHANCED_VALIDATION_LOCATIONS` and `ARM_PROVIDER_ENHANCED_VALIDATION_RESOURCE_PROVIDERS` without the legacy one persisting in 4.x at all.

---

## Reliability & Operations

**suggestion:** The location caching and resource provider caching in `builder.go` are now controlled by separate booleans but still share the same 10-minute timeout pattern with `context.WithTimeout`. If location caching takes 9 minutes (pathological case), the resource provider caching still gets its own fresh 10-minute window because each creates an independent context. This is correct, but the 10-minute timeout is extremely generous for what should be a sub-second metadata call. Consider a more aggressive timeout (30s-60s) with the existing soft-failure pattern.

*Location:* `internal/clients/builder.go:159-160` and `internal/clients/builder.go:165-166`

---

**thought:** The separation of location caching from resource provider caching in `builder.go` means they now run sequentially instead of being interleaved. Previously, `CacheSupportedLocations` ran, then `CacheSupportedProviders` ran, both under one `EnhancedValidationEnabled()` check. Now they're under separate checks with separate contexts. This is a minor behavior change -- if both are enabled, the total init time is now the sum of both calls rather than overlapping. For most users this is negligible, but it's a subtle performance regression when both are enabled.

*Location:* `internal/clients/builder.go:159-172`

---

## Security & Dependencies

**praise:** No new dependencies introduced. The change is purely configuration-surface expansion using existing framework primitives. No secrets, no new network calls, no auth changes.

---

**nit:** The `os.Getenv` calls in `enhanced_validation.go` are scattered across four functions. A single point of env var reading at init time (similar to how other providers use an `envConfig` struct) would be more testable and prevent env var mutation mid-execution from causing inconsistent behavior. This is a pre-existing pattern, not introduced by this PR.

*Location:* `internal/features/enhanced_validation.go`

---

## Cross-Cutting Observations

1. **Test coverage gap for the new HCL block:** The `features_test.go` changes only add the `EnhancedValidation` field to existing test expectations with hardcoded `true` values. There are no tests for:
   - Setting `enhanced_validation { locations = false }` in HCL and verifying it propagates
   - The interaction between env vars and HCL block (HCL should win)
   - The `ValidateEnhancedValidationEnvVars()` error paths in integration context

   The PR description claims "existing unit tests pass" and "no new tests required," but the new configuration surface (HCL block) and env var validation logic lack direct test coverage.

2. **Dual-provider maintenance burden:** Every change must be implemented in both the SDK v2 provider (`provider.go`) and the framework provider (`framework/config.go`, `framework/provider.go`, `framework/model.go`). The implementations are slightly different in how they parse the block (type assertions vs. `ElementsAs`). This is inherent to the migration period but worth noting -- when the SDK v2 provider is eventually removed, significant dead code will need cleanup.

3. **Migration story completeness:** The upgrade guide and docs are well-written and provide clear migration paths. The error message when the legacy env var is used in 5.0 is actionable and points users to the replacement. This is a model for how to handle breaking changes in provider configuration.

---

## What's Done Well

**praise:** The three-tier precedence (specific env var > legacy env var > version default) with conflict detection is a thoughtful migration design. Users get a clear error if they try to use both old and new env vars simultaneously, which prevents silent misconfiguration.

**praise:** The upgrade guide documentation is excellent -- it explains the "what changed," "why," "timing impact," and "how to migrate" in a structured, scannable format. The HCL examples are immediately copy-pasteable.

**praise:** The `ValidateEnhancedValidationEnvVars()` function provides a clear, actionable error message that tells users exactly what to do. This is the gold standard for breaking change errors.

**praise:** Splitting the monolithic `EnhancedValidationEnabled()` into granular `Locations` and `ResourceProviders` controls is a genuine usability improvement. Users who want location validation but not resource provider caching (or vice versa) now have that option.
