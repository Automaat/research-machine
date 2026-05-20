# ADR Review: 0003 — Implement JWT-Based API Authentication

**ADR:** `0003-api-authentication.md`
**Author:** Alex Rivera (Security Lead)
**Status:** Proposed | **Date:** 2026-02-28

---

## Phase 1 — Structural Summary

This is a well-structured ADR that covers most MADR sections: context, decision drivers, considered options, decision outcome, consequences (positive and negative), and pros/cons for all three options. Metadata (status, date, decision-makers) is present in frontmatter.

**Missing:** confirmation criteria (how will you verify the implementation matches the decision?), and any mention of related ADRs or links to supporting documentation.

---

## Phase 2 — Top Concerns

1. **Token revocation strategy is acknowledged but not decided.** The ADR lists "short-lived token + refresh token pattern" as a consequence but doesn't commit to a specific approach. Revocation is the single hardest operational problem with self-issued JWTs — have you evaluated the tradeoffs between a revocation list (adds statefulness), very short TTLs (increases refresh traffic), or a token introspection endpoint? This feels like it deserves its own ADR or at minimum a concrete plan stated here, since it directly affects the viability of Option A.

2. **The migration path from API keys to JWT is absent.** The decision drivers explicitly say "must not break existing API key integrations during transition," but neither the decision outcome nor the consequences describe how the two auth mechanisms will coexist. Will the API gateway accept both? For how long? What's the deprecation timeline for API keys? Without this, the backward-compatibility driver is acknowledged but unaddressed.

3. **Auth0/Okta rejection leans heavily on cost — is that the full picture?** The per-MAU pricing concern is valid for 10k+ service accounts, but some providers offer machine-to-machine pricing models that differ from user-based MAU. Has the team gotten actual quotes, or is this based on published pricing pages? If the cost concern softens, Option B's compliance and MFA benefits become much more competitive, and the self-issued JWT's security burden (called out as a negative consequence) looks heavier.

---

## Phase 3 — Awaiting Response

*(In a live review, the reviewer would pause here for the author to respond before continuing. Responses to the above may reshape the remaining observations.)*

---

## Phase 4 — Additional Observations

- No key rotation procedure described — RS256 rotation "without invalidating existing tokens" is stated as a pro, but the operational mechanics (JWKS endpoint? Grace period? Key ID headers?) are unspecified.
- JWT scope/claims design not outlined — "fine-grained permissions" is a requirement, but the ADR doesn't sketch the permission model (RBAC? ABAC? Scope strings?). This is a significant downstream design constraint.
- No mention of token size limits — the negative consequence about payload growth is noted, but no mitigation (e.g., reference tokens, permission compression, or max scope limits) is proposed.
- Signing key storage isn't addressed — where do the RS256 private keys live? HSM, KMS, Vault? This is a critical security surface for self-issued tokens.
- The "works offline / without external dependencies" pro for Option A is misleading — your service still needs access to signing keys and a refresh token store, which are dependencies.
- No confirmation criteria — consider adding: "Successful when enterprise pilot customer completes OAuth 2.0 flow and existing API key integrations function unchanged."
- Consider referencing or spawning a follow-up ADR for the refresh token / revocation mechanism, since the current ADR defers that complexity without tracking it.
- The security audit finding about long-lived credentials is a strong driver, but the ADR should state the target token TTL to demonstrate it's actually addressed (e.g., "15-minute access tokens with 24-hour refresh tokens").

---

## Phase 5 — Suggested Improvements

If the author wants to strengthen this ADR before acceptance:

1. **Add a "Migration Strategy" section** covering API key coexistence, deprecation timeline, and dual-auth gateway behavior.
2. **Specify the revocation approach** (or explicitly defer it to a linked follow-up ADR with a tracking reference).
3. **Add confirmation criteria** — what does "done" look like?
4. **State the target token TTL** to concretely address the security audit finding.
5. **Document key management** — where RS256 keys are stored and how rotation works operationally.

---

## Anti-Pattern Assessment

No major anti-patterns detected. The ADR does **not** read as a rubber stamp — all three options have genuine pros/cons and the rejected options are plausible alternatives. Minor concern: the cost argument against Option B could benefit from concrete numbers to avoid appearing dismissive of a strong contender.

---

## Overall Assessment

This is a solid ADR. The problem framing is clear, the options are genuine, and the consequences are honestly stated with real negatives. The main gap is operational specificity: the decision is sound at the architectural level, but several critical implementation details (revocation, migration, key management) are either deferred or unstated. Addressing the top 2-3 concerns above would make this ready for acceptance.
