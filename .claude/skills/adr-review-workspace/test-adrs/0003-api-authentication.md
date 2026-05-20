---
status: proposed
date: 2026-02-28
decision-makers:
  - Alex Rivera (Security Lead)
---

# Implement JWT-Based API Authentication

## Context and Problem Statement

Our public API currently uses API keys for authentication. As we onboard enterprise customers, we need to support OAuth 2.0 flows, token expiration, and fine-grained permissions. API keys don't support scoping, expiration, or delegation without custom infrastructure. We need an authentication mechanism that supports these enterprise requirements while remaining simple for existing integrations.

## Decision Drivers

* Enterprise customers require OAuth 2.0 / OIDC compatibility
* Must not break existing API key integrations during transition
* Security audit flagged long-lived API keys as a risk
* Team prefers building on standards rather than custom auth logic

## Considered Options

* **Option A: JWT with RS256 signing (self-issued)**
* **Option B: Integrate Auth0 / Okta as identity provider**
* **Option C: Extend current API key system with scopes and expiration**

## Decision Outcome

Chosen option: **Option A — JWT with RS256 signing**, because it gives us full control over the token lifecycle, avoids per-seat costs from third-party providers, and aligns with our API-first architecture. JWTs are stateless, which fits our horizontally-scaled API gateway.

### Consequences

**Positive:**

* Stateless verification — API gateway validates tokens without hitting a central auth service
* Standard JWT claims (exp, aud, scope) cover enterprise requirements out of the box
* RS256 allows key rotation without invalidating existing tokens

**Negative:**

* Token revocation is hard — we'll need a short-lived token + refresh token pattern, adding complexity
* JWT payload size grows with permissions — could impact request overhead for heavily-scoped tokens
* We own the security surface — no third-party audit or compliance delegation

## Pros and Cons of the Options

### Option A: Self-issued JWT

* Good, because no per-user or per-seat costs
* Good, because full control over claims and token structure
* Good, because works offline / without external dependencies
* Bad, because we must implement and maintain token issuance, rotation, and revocation ourselves
* Bad, because security is entirely our responsibility — no third-party SOC2 coverage for auth

### Option B: Auth0 / Okta

* Good, because battle-tested security with compliance certifications
* Good, because built-in MFA, SSO, and user management
* Bad, because per-MAU pricing doesn't fit our API-heavy use case (10k+ service accounts)
* Bad, because adds external dependency to critical auth path
* Bad, because customizing token claims requires workarounds

### Option C: Extend API keys

* Good, because minimal disruption to existing integrations
* Good, because simple to implement incrementally
* Bad, because fundamentally not compatible with OAuth 2.0 flows
* Bad, because key management at scale becomes operational burden
* Bad, because doesn't address the security audit finding about long-lived credentials
