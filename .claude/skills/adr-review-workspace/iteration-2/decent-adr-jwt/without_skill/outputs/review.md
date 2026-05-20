# ADR Review: 0003 — Implement JWT-Based API Authentication

**Reviewer:** AI Review (requested by team)
**ADR Author:** Alex Rivera (Security Lead)
**Date Reviewed:** 2026-03-04
**Status:** Proposed

---

## Overall Assessment

This is a well-structured ADR that clearly articulates the problem, evaluates reasonable alternatives, and arrives at a defensible decision. The writing is clear, the decision drivers are concrete, and the consequences section is honest about trade-offs. That said, there are several gaps — mostly around implementation specifics and security considerations — that should be addressed before accepting this ADR for a production authentication system.

**Verdict: Request changes before accepting.**

---

## Strengths

- **Clear problem framing:** The context section concisely explains why API keys are insufficient and what enterprise customers require.
- **Honest negative consequences:** The ADR does not sugarcoat the downsides of self-issued JWT (revocation complexity, owning the security surface). This is good practice.
- **Reasonable option comparison:** All three options are realistic choices, not strawmen. The pros/cons are balanced.
- **Decision drivers are traceable:** Each driver maps to a real business or security requirement.

---

## Issues and Gaps

### 1. Token Revocation Strategy Is Unspecified (High Priority)

The ADR acknowledges revocation is hard and mentions "short-lived token + refresh token pattern" but does not specify:

- What "short-lived" means (5 min? 15 min? 1 hour?)
- Where refresh tokens are stored and validated (this reintroduces statefulness)
- Whether a token blocklist/denylist will be used for emergency revocation (e.g., compromised tokens)
- How refresh token rotation will work to prevent replay attacks

**This is the single biggest risk in self-issued JWT.** The ADR should either specify the revocation strategy or explicitly defer it to a follow-up ADR (with a reference).

### 2. Key Management and Rotation Details Are Missing (High Priority)

The ADR mentions "RS256 allows key rotation without invalidating existing tokens" as a positive consequence, but does not describe:

- How signing keys will be stored (HSM, KMS, Vault, environment variables?)
- Key rotation cadence and procedure
- How the JWKS endpoint will be exposed for verifiers
- What happens during a key compromise scenario (emergency rotation playbook)

For a security-critical decision, key management deserves at least a brief treatment or an explicit pointer to a separate document.

### 3. No Migration Plan for Existing API Keys (Medium Priority)

Decision driver #2 says "Must not break existing API key integrations during transition," but the ADR contains zero detail on:

- How long the dual-auth period will last
- Whether API keys will be deprecated on a timeline or maintained indefinitely
- How existing customers will be notified and migrated
- Whether API keys will eventually be removed or kept as a secondary mechanism

This is important for both engineering planning and customer communication.

### 4. Scope and Permission Model Not Defined (Medium Priority)

The ADR mentions "fine-grained permissions" and "scope" claims multiple times but does not describe:

- What the scope taxonomy will look like (e.g., `read:users`, `write:billing`, RBAC vs. ABAC)
- How scope definitions will be managed and versioned
- Whether scopes will be embedded in the JWT or resolved at the gateway

This is a significant design surface that affects both security and developer experience.

### 5. No Discussion of Token Size and Performance Impact (Low-Medium Priority)

The ADR notes "JWT payload size grows with permissions" as a negative consequence, but does not discuss:

- Expected token sizes for typical vs. heavy-scope users
- Whether this will cause issues with HTTP header size limits (commonly 8KB)
- Mitigation strategies (e.g., opaque token + introspection for large-scope users, or referencing a permission set by ID rather than inlining all scopes)

### 6. Missing: Monitoring, Logging, and Incident Response (Medium Priority)

For a self-managed auth system, the ADR should address:

- How authentication failures will be logged and monitored
- Alerting on anomalous patterns (brute force, token reuse, clock skew attacks)
- Incident response procedures for token compromise
- Audit trail requirements (who issued what token, when)

### 7. No Mention of Clock Skew and `exp`/`nbf` Handling (Low Priority)

JWT validation is sensitive to clock differences between issuer and verifier. The ADR should mention:

- Acceptable clock skew tolerance
- Whether `nbf` (not before) claims will be used
- Time synchronization requirements across services

### 8. Algorithm Pinning / Security Hardening (Low Priority)

The ADR specifies RS256 but does not mention:

- Whether the `alg` header will be validated (to prevent algorithm confusion attacks, e.g., `none` algorithm)
- Whether the `aud` (audience) claim will be strictly validated
- Whether `iss` (issuer) validation will be enforced

These are well-known JWT pitfalls that should be acknowledged, even briefly.

### 9. Missing Decision Makers / Stakeholders (Low Priority)

Only Alex Rivera (Security Lead) is listed as a decision-maker. For a cross-cutting authentication change, you would typically expect involvement from:

- Backend / Platform engineering lead
- Product owner (enterprise customer requirements)
- DevOps / Infrastructure (key management, gateway configuration)
- Compliance / Legal (if SOC2 or similar certifications are in scope)

---

## Suggestions for Improvement

1. **Add a "Token Lifecycle" section** covering: issuance flow, token TTL, refresh token strategy, revocation mechanism, and emergency invalidation.
2. **Add a "Key Management" section** or reference a separate ADR/doc covering: key storage, rotation, JWKS endpoint, and compromise procedures.
3. **Add a "Migration Plan" section** with: timeline, dual-auth approach, deprecation schedule for API keys.
4. **Define scope model** at least at a high level, or reference a follow-up ADR.
5. **Expand the decision-makers list** to include engineering and product stakeholders.
6. **Add a "Security Hardening" section** noting algorithm pinning, claim validation, and monitoring requirements.

---

## Questions for the Author

1. What is the planned TTL for access tokens? What is the refresh token lifetime?
2. Where will signing keys be stored? Is a KMS or Vault already in use?
3. Is there an existing timeline commitment to enterprise customers that constrains the migration window?
4. Will the JWT issuance service be a new microservice, or will it be embedded in an existing service?
5. Has the team considered a hybrid approach — self-issued JWT for service-to-service, with an option to plug in an external IdP for end-user SSO later?
6. What compliance frameworks (SOC2, ISO 27001, etc.) apply, and how does owning the auth surface affect certification?

---

## Summary

The ADR makes a sound architectural choice. Self-issued JWT with RS256 is a reasonable path for an API-first platform that needs OAuth 2.0 compatibility without per-seat vendor costs. However, for a decision of this security criticality, the ADR needs more detail on token revocation, key management, and migration strategy before it should be accepted. The gaps identified above are not blockers to the *decision itself*, but they are blockers to accepting the ADR as a complete record of the decision.

**Recommendation:** Ask Alex to expand the ADR with the high-priority items (revocation strategy, key management, migration plan) and either address or explicitly defer the medium-priority items. Then re-review.
