# ADR Review: 0003 — Implement JWT-Based API Authentication

**ADR:** `0003-api-authentication.md`
**Author:** Alex Rivera (Security Lead)
**Status:** Proposed
**Date:** 2026-02-28
**Reviewed:** 2026-03-04

---

## Phase 1: Structural Summary

The ADR is well-structured and covers core MADR sections: context/problem statement, decision drivers, considered options, decision outcome with consequences, and pros/cons for each option. This is above-average completeness.

**Missing sections:**

- **Confirmation** — No criteria for validating the implementation matches the decision (e.g., "We'll validate by passing a penetration test" or "All API endpoints enforce JWT validation by Q3")
- **Status of migration** — The transition plan from API keys to JWT is referenced but not detailed
- **Links / cross-references** — No references to the security audit mentioned, related ADRs, or relevant RFCs (RFC 7519, RFC 6749)

---

## Phase 2: Top 3 Concerns

### 1. Token revocation strategy is acknowledged but unresolved

The ADR lists "token revocation is hard" as a negative consequence and mentions "short-lived token + refresh token pattern" as the mitigation — but this is a critical security mechanism, not a footnote. For a security-focused ADR, this deserves its own treatment:

- What will the token TTL be? 5 minutes? 1 hour? This dramatically changes the risk profile.
- Where will refresh tokens be stored? A centralized refresh token store partially negates the "stateless" benefit.
- Have you considered a revocation list (e.g., a small Redis-backed deny-list for JTI claims) as an alternative to very short TTLs?
- What happens when a compromised token is discovered — what's the incident response playbook?

### 2. The "full control" argument cuts both ways — what's the operational readiness plan?

The decision rationale emphasizes "full control over token lifecycle" and avoiding third-party costs. But the ADR doesn't address the operational burden this creates:

- Who maintains the signing key infrastructure (HSM, key vault, rotation schedule)?
- What's the on-call burden for auth-related incidents? With Auth0/Okta, their SRE team handles availability.
- Has the team assessed whether it has the security engineering depth to build and maintain a token issuance service that handles edge cases (clock skew, key compromise, algorithm confusion attacks)?
- The ADR mentions RS256 key rotation "without invalidating existing tokens" — this requires a JWKS endpoint and multi-key validation. Is that complexity accounted for?

### 3. Missing option: hybrid approach (self-issued JWT + external IdP for enterprise SSO)

The options are framed as mutually exclusive, but a common pattern is to self-issue JWTs for service-to-service auth while federating enterprise SSO through an external IdP. This hybrid approach would:

- Keep costs low for API/service accounts (no per-MAU fees)
- Delegate enterprise SSO complexity (MFA, SAML, OIDC federation) to a provider that specializes in it
- Reduce the security surface you own for human-facing auth

Has this been considered and rejected, or was it not explored?

---

## Phase 3: Additional Observations

### Problem framing

- The problem statement is clear and well-scoped — it identifies specific enterprise requirements (OAuth 2.0, token expiration, fine-grained permissions) rather than a vague "we need better auth." This is good.
- One implicit assumption worth stating explicitly: the ADR assumes the team will build a token issuance service. The scope of that service (registration, consent flows, admin UI, audit logging) isn't discussed but significantly impacts the decision's cost.

### Options analysis

- The three options represent genuinely different approaches — no strawman detected.
- Option C (extend API keys) is fairly dismissed but the dismissal could be sharper. The core issue isn't just "not compatible with OAuth 2.0" — it's that API keys are bearer tokens with no cryptographic binding, making them fundamentally unsuitable for delegation and scoping without reinventing JWT-like infrastructure anyway.
- Option B's con about "per-MAU pricing" for 10k+ service accounts is a strong practical argument. Consider documenting the rough cost comparison (even ballpark) to make this concrete.

### Security-specific gaps

- **Algorithm restriction** — The ADR specifies RS256 but doesn't mention enforcing algorithm validation on the verification side. Algorithm confusion attacks (e.g., treating RS256 public key as HMAC secret) are a well-known JWT vulnerability. Worth stating that the implementation must reject `alg: none` and restrict to RS256 only.
- **Token scope model** — "Fine-grained permissions" is mentioned as a requirement but the ADR doesn't sketch what the scope model looks like. Will it be resource-based (`read:users`, `write:orders`)? Role-based? This affects JWT payload size (mentioned as a concern) and should inform the decision.
- **Audience validation** — No mention of `aud` claim validation strategy for multi-service architectures. If multiple internal services accept JWTs, each should validate it was the intended audience.
- **Clock skew tolerance** — Stateless token validation across horizontally-scaled services requires agreement on acceptable clock skew for `exp`/`nbf` claims.

### Consequences section

- The positive/negative split is honest and balanced — no rubber-stamp anti-pattern here.
- Missing neutral/operational consequences:
  - Existing API key users need a migration path — what's the deprecation timeline?
  - Monitoring and observability requirements (token issuance rates, validation failures, expiration patterns)
  - Documentation and developer experience impact (new auth flow for API consumers)

### Minor structural suggestions

- Add a `## Confirmation` section: "We will validate this decision by: (1) passing a third-party security audit of the JWT implementation, (2) successfully onboarding the first enterprise customer using OAuth 2.0 flow, (3) completing API key deprecation within N months."
- Add `## Links` or `## Related` section referencing: the security audit report, RFC 7519 (JWT), RFC 6749 (OAuth 2.0), and any future ADR on the token scope/permissions model.
- Consider adding a "## More Information" section with the migration plan from API keys to JWT, even if high-level.

---

## Summary Assessment

| Dimension | Rating | Notes |
|---|---|---|
| Structure / MADR compliance | Strong | Covers all required sections plus decision drivers and detailed pros/cons |
| Problem clarity | Strong | Well-scoped, specific enterprise requirements stated |
| Options quality | Good | Genuine alternatives, though missing hybrid option |
| Decision rationale | Good | Clear reasoning, but leans on "full control" without addressing operational cost |
| Consequences honesty | Good | Balanced positive/negative, but missing operational and migration impacts |
| Security depth | Needs work | For a security-focused ADR by the security lead, JWT-specific attack vectors and implementation guardrails should be addressed |
| Actionability | Needs work | No confirmation criteria, no migration plan, no timeline |

**Overall:** This is a solid ADR with clear thinking and honest tradeoff analysis. The main gaps are (1) the token revocation strategy needs to be a first-class part of the decision rather than a noted downside, (2) the operational cost of self-managing auth infrastructure should be weighed more explicitly, and (3) a hybrid approach deserves consideration. The security-specific implementation guidance (algorithm restriction, scope model, audience validation) would strengthen this significantly given the domain.
