# Staff Engineer Code Review: Research Findings

**Date:** 2026-03-04
**Tags:** #research #staff-engineer #code-review #technical-leadership
**Focus:** How staff-level engineers approach code review differently from senior engineers

---

## Summary: The Core Shift

Senior engineers focus on **correctness within a change**. Staff engineers focus on **impact beyond the change**.

The mental model shift:

- Senior: "Does this code do what it's supposed to do?"
- Staff: "Should this code exist? Does it fit our system? Who else does this affect? What breaks in 18 months?"

Key quote from Will Larson's staffeng.com: "Even if you're not writing much, you'll be reading a ton of your coworkers' code and doing a fair number of code reviews."

Tanya Reilly (*The Staff Engineer's Path*): "Software gets maintained for much longer than it takes to create it." This frames the entire review posture.

---

## 1. What Staff Engineers Focus On

### 1.1 Architectural Alignment

Staff engineers ask:

- Does this change fit the **direction** we've chosen, not just the current state?
- Does it introduce a new pattern that will be copied 20 times by others?
- Does it violate an ADR (Architecture Decision Record) that exists for good reasons?
- Is this solving the right problem, or optimizing for the wrong layer?

**Anti-pattern caught at staff level:** A team adds a new service for a cross-cutting concern instead of using the existing shared library. A senior engineer might approve once the code is correct. A staff engineer asks why the shared library wasn't used and whether this creates a fork.

From Google's SWE book: "New code and/or projects generally undergo an extensive design review, apart from a code review." Staff engineers gate-keep the design, not just the code.

From Tanya Reilly: "it's a better use of your time to be wrong or controversial than it is to be vague" — staff engineers make concrete architectural calls, even if wrong, because vagueness blocks progress.

### 1.2 System-Level Implications

Staff engineers trace **propagation paths** — how does a change ripple through services, pipelines, user flows?

Questions they ask:

- What contracts does this code touch? REST APIs, event schemas, DB schemas?
- What happens when this fails? What's the blast radius?
- Is this change backward-compatible with existing consumers?
- Will this create a cascading failure mode under load?

From Stack Overflow blog: "Better code reviews look at the change in the context of the larger system... They might ask questions about how it impacts other parts of the system."

Real example (from Pragmatic Engineer): A team in Europe frequently changes a service that triggers reviews from a US-based owner. The senior engineer reviews the code; the staff engineer asks why these cross-timezone dependencies exist and proposes restructuring the ownership.

### 1.3 Cross-Team Impact

Staff engineers consider:

- Which teams consume this API? Have they been notified?
- Does this create a new dependency that other teams will absorb?
- Does this drift from the "paved road" / golden path that platform teams support?
- Will this require on-call burden for another team?

From lethain.com: Staff engineers should identify "quality leverage points" — interfaces, stateful systems, and data models — and ensure these receive disproportionate review investment.

Spotify's ADR framework: When code review reveals competing patterns, it signals an undocumented decision that needs an ADR. Code review is a discovery mechanism for missing architecture docs.

### 1.4 Long-Term Maintainability

Questions staff engineers ask:

- Can a new engineer understand this in 6 months without the original author?
- Does this create a knowledge silo?
- Are we paying interest on technical debt with this approach?
- Does this code expand the on-call surface area?

Tanya Reilly: "The system will never again be as well understood as it is on the day it's created." — Reviews should prioritize legibility and documentation for future maintainers.

Key staff engineer practice: Distinguish between "this works today" and "this is sustainable at 10x load / with a team that turns over 30% annually."

### 1.5 Security and Operational Concerns

Security dimensions staff engineers check:

- Authentication/authorization: Is every endpoint properly gated?
- Input validation: Injection risks (SQL, SSRF, command injection)?
- Secrets exposure: Are credentials in code, logs, error messages?
- PII/sensitive data: Is data that shouldn't be logged being logged?
- Cryptographic choices: Are deprecated algorithms being used (MD5, SHA-1, DES)?
- Dependency security: Is a new third-party library being added? Supply chain risk?

Operational dimensions:

- Observability: Can we diagnose a 3am outage with this code? (Yelp's framing)
- Instrumentation: Does this new behavior have metrics/traces/logs?
- Charity Majors principle: "Just as you wouldn't accept a PR without tests, you should never accept a PR unless you can answer: 'how will I know when this isn't working?'"
- Feature flags: Can this be safely disabled without a rollback?
- Rollback safety: For DB migrations — is this reversible?

---

## 2. Review Patterns and Anti-Patterns

### 2.1 What Staff Engineers Approve vs. Block

**Block (request changes):**

- Security vulnerabilities (injection, auth bypass, PII exposure)
- Architectural violations that would spread (bad pattern that will be copied)
- Breaking changes to public APIs/contracts without migration path
- DB migrations without rollback strategy
- Race conditions, concurrency bugs
- Missing observability for new critical paths
- Violates an explicit ADR or design decision
- Code that degrades codebase health definitively

**Approve with comments (non-blocking suggestions):**

- Style preferences beyond what linters enforce
- Alternative implementation approaches where theirs is valid
- Naming disagreements
- Missing optimizations that aren't on the critical path
- Tests that could be more exhaustive but cover the required cases

**Key principle (Google):** "Reviewers should favor approving a CL once it is in a state where it definitely improves the overall code health of the system — even if it isn't perfect." Progress without regression, not perfection.

**GitHub Staff Engineer (Sarah Vessels) principle:** Approve PRs even with preference suggestions — only use "Request Changes" for immediate security threats. If code won't break production or harm users, approve.

### 2.2 How Staff Engineers Handle Disagreements

Escalation path for disagreements:

1. Ask clarifying questions to understand intent before objecting
2. Explain the principle/concern (not just the preference) with citations (ADRs, RFCs, docs)
3. Suggest concrete alternatives — don't just say no
4. If discussion exceeds ~3 comments on one point: take it offline (chat/call), then document resolution in PR
5. If still unresolved: bring in a neutral third party (tech lead / domain expert), record decision in PR

Key anti-pattern: Extended back-and-forth in PR comments across timezones. Move to synchronous discussion early.

From Pragmatic Engineer (LinkedIn source): "if the same kind of pushback keeps recurring on style, naming, or testing conventions, codify it through linter rules, quality gates, or shared guidelines — turn disagreement into policy."

From Google: "Technical facts override opinions. Style guides are authoritative. Multiple valid approaches should defer to the author's choice if equally defensible."

### 2.3 Teaching Moments vs. Blocking Issues

Staff engineers differentiate explicitly:

- **Blocking:** Must be resolved before merge. Security flaw, architectural violation, correctness bug.
- **Teaching:** Non-blocking, educational value. Label as "thought:", "suggestion:", "FYI:". Author can address now or in follow-up.
- **Nit:** Non-blocking polish. Label as "nit:". Author can ignore.

Staff engineer superpower: Using code review to scale knowledge across the team. One comment that teaches a pattern saves 10 PRs of catching the same mistake.

Key principle: Don't damage growth mindset. Tanya Reilly: "call out the good as well as the bad." Acknowledge what's done well explicitly, especially for junior engineers.

Timing matters: For large systemic concerns with new engineers, Reilly cautions against unsolicited advice without context. Channel architectural opinions into design docs/RFCs instead.

### 2.4 When to Suggest Alternatives vs. Prescribe

**Prescribe (directive):**

- Security issues: "Change this to use parameterized queries. This is vulnerable to SQL injection."
- Blocking architectural violations: "This breaks our API contract. Consumers expect X behavior."
- ADR violations: "We decided in ADR-042 not to use this pattern. Here's why."

**Suggest (collaborative):**

- Alternative implementations: "Have you considered X? It might simplify the error handling."
- Future maintainability: "This might be clearer if refactored to Y. Your call."
- Performance: "I noticed a potential N+1 here in high-traffic paths. Worth checking with load data?"

**Default posture for staff engineers:** Ask questions before prescribing. The author has more context on their specific problem. "Why was this approach chosen?" opens a dialogue without assuming the approach is wrong.

---

## 3. Concrete Review Dimensions

### 3.1 API Design Quality

Key questions:

- Is this API backward-compatible? What does adding/removing/renaming a field break?
- Will every observable behavior of this API be depended on by someone? (Hyrum's Law)
- What is the deprecation story if we need to change this?
- Is versioning strategy consistent with existing APIs?
- Does the API surface area expose implementation details that will constrain future changes?
- Are error codes/messages stable contracts?

Stripe's API review process: Every API change requires "a strict review process that goes way beyond a normal code review" — sometimes involving 20-page design documents. Staff-level concern: APIs are the hardest thing to change.

Strategies to check:

- Expand-and-contract for breaking changes (add new field → migrate consumers → remove old field)
- Schema versioning for event-driven systems
- Deprecation timelines: typically 6 months announcement, 12 months active migration support, 18-24 months removal

### 3.2 Failure Mode Analysis

Questions:

- What happens when the downstream service is unavailable? Timeout? Retry? Circuit break?
- What happens when this code throws an unexpected exception? Is the error boundary appropriate?
- Is the blast radius of a failure limited or does it cascade?
- Are retries idempotent? Will retrying a failed operation cause double-processing?
- What's the behavior under partial failure (some shards fail, some succeed)?
- Are there race conditions in concurrent access paths?

Yelp's framing: "Will you be able to diagnose a 3am outage effectively with this code?"

Netflix culture: Code reviews "rigorously scrutinize edge cases and failure modes to ensure system stability."

### 3.3 Performance Implications

What staff engineers check:

- N+1 query patterns (ORM misuse creating N database calls)
- Missing database indexes for new query patterns
- Unbounded operations (pagination missing on list endpoints)
- Cache strategy: What's being cached? What's the invalidation strategy? What's the failure mode when cache misses?
- Synchronous operations that should be async in the hot path
- Memory allocation patterns in high-throughput code paths
- Connection pool exhaustion risks
- Lock contention in concurrent code

Key question: "Does the performance profile hold at 10x current load?" If not, is it acceptable to address later or is this on the critical path?

### 3.4 Observability and Debuggability

The Charity Majors standard: Before approving, can you answer "how will I know when this isn't working?"

Check for:

- Structured logging with correlation IDs on new code paths
- Metrics/counters for new operations (request rates, error rates, latencies)
- Distributed traces spanning service boundaries
- Alert-ability: Is there a metric that would trigger an alert if this breaks?
- Log levels appropriate (debug vs info vs error): Don't spam error logs with expected conditions

Google's Four Golden Signals to review for coverage: Latency, Errors, Traffic, Saturation.

Anti-pattern: Approving a new critical feature with no instrumentation because "we can add metrics later." In practice, "later" often means "after the first incident."

### 3.5 Migration and Rollback Safety

For database migrations specifically:

- Is the migration backward-compatible with the current application version?
- Can the application run with both old and new schema simultaneously (for blue/green deployments)?
- What's the rollback procedure? Is it documented in the PR?
- Are there data migrations that are irreversible (data deletion, column type changes)?
- Is the migration tested against production-scale data volumes?

Martin Fowler's evolutionary DB design: Every migration should be discrete, numbered, and include both DDL (schema) and DML (data) components. Migrations should be kept small.

Expand-and-contract pattern for schema changes:

1. Add new column/table (app works with both old and new)
2. Migrate data
3. Update app to write to new structure
4. Remove old structure

For application code:

- Feature flags allowing disabling without rollback
- Canary deployments with health-check gates
- Progressive rollout (internal → free tier → paid users)

### 3.6 Data Model Evolution

Staff engineer questions:

- How does this data model change impact existing records?
- Are we storing data in a form that will allow future query patterns we haven't defined yet?
- Does this create unbounded growth? (No pagination, no TTL, no archival strategy)
- Are relationships between entities correctly expressed? Will this require painful joins at scale?
- Is this denormalization intentional and documented?
- What happens to existing data when the code deploys?

Key principle: Data models are among the hardest things to change. Disproportionate scrutiny is warranted.

### 3.7 Dependency Management

Staff engineers check new third-party dependencies for:

- License compatibility with the project
- Maintenance status: Is this actively maintained? When was the last release?
- Security track record: Any recent CVEs?
- Transitive dependency footprint: What does adding this pull in?
- Vendor lock-in risk: Is this a commodity library or does it create coupling?
- Supply chain risk: Is this a well-known, widely-used package or obscure?

Key concern (2024 context): 90% of modern applications are open-source components. Malicious packages increased 156% YoY. Treat new dependencies as untrusted third-party input requiring the same scrutiny as a code change.

Questions to ask:

- Could this be implemented without the dependency given the scope of use?
- Is there an internal library/tool that already solves this?

---

## 4. Review Communication Style

### 4.1 Labeling Feedback Severity

**Multiple converging systems — use one consistently:**

**Conventional Comments (conventionalcomments.org):**

- `praise:` — Acknowledge good work explicitly
- `nitpick:` / `nit:` — Trivial, preference-based, non-blocking
- `suggestion:` — Propose improvement with rationale, author decides
- `issue:` — Specific problem requiring attention
- `todo:` — Small necessary change before merge
- `question:` — Needs clarification before deciding
- `thought:` — Non-blocking idea for consideration
- `note:` — Observation for context, no action required

Decorators: `(non-blocking)`, `(blocking)`, `(if-minor)`

**Netlify Feedback Ladder:**

- ⛰ Mountain — Critical blocker, halts all work
- 🧗 Boulder — Blocks approval, other work can continue
- ⚪ Pebble — Non-blocking, needs future resolution
- ⏳ Sand — Optional, team consensus needed
- 🌫 Dust — Lowest priority, reviewer's discretion

**Christian Emmer's Prefix System:**

- `Props:` — Gratitude/praise
- `Question:` — Seeking clarification, not demanding change
- `Nit:` — Non-blocking, potentially subjective
- `Suggestion:` / `FYI:` — Alternative approach
- `Convention:` — Deviation from org standards
- `Blocking:` — Only use this for architecture/security/major issues

**Key rule:** Only use "Request Changes" / blocking status for actual blocking issues. Abuse of this feature trains teams to ignore it.

### 4.2 Balancing Thoroughness with Velocity

Google's principle: Reviewers should approve a CL once it "definitely improves overall code health" — not when it's perfect.

Velocity practices:

- Respond within 24 hours (initial feedback), even if full review takes longer
- Complete reviews in one pass where possible — multiple rounds multiply context-switching
- If many comments: proactively message author to discuss before they start addressing changes
- Automate mechanical feedback (linting, formatting) out of code review entirely
- Small PRs ship faster and get better reviews — staff engineers model this

Research data: Teams with 50-line median PRs ship 40% more total code than 200+ line PR teams. Average PR spends 36 hours from creation to merge but only 4 hours in actual review — the problem is response time, not review depth.

### 4.3 When to Take Conversations Offline

Trigger: More than 2-3 back-and-forth exchanges on a single issue.
Trigger: Signs of misunderstanding (reviewer and author talking past each other).
Trigger: Tone beginning to feel tense or defensive.

Actions:

- Move to synchronous: direct message or call
- Resolve in discussion
- Document the resolution in the PR comment thread
- If needed: bring in a neutral third party (tech lead, domain expert)

From Pragmatic Engineer: "There is likely some misunderstanding on either side" when many comments exist — proactive sync is more efficient than iterative async.

---

## 5. Frameworks and Checklists

### 5.1 The Staff Engineer's Review Mental Model

Before starting any review, ask:

1. **Does this need to exist?** Is there an existing solution? Does this reinvent the wheel?
2. **Does it solve the right problem?** Does it match the issue/spec/design doc?
3. **Can it handle failure?** What are the failure modes and blast radius?
4. **Is it understandable?** Can a future maintainer navigate this without the author?
5. **Does it fit the bigger picture?** Architectural alignment, cross-team impact?
6. **Are the right stakeholders aware?** Any teams that should know about this change?

*(Synthesized from Tanya Reilly's "The Staff Engineer's Path")*

### 5.2 Triage Pass → Deep Pass Approach

**First pass (5-10 min):** Overview

- PR description quality: Is the context clear? What problem does this solve?
- Scope: Is the PR focused? Or does it mix unrelated changes?
- Size: Is this reviewable? (>500 lines is a flag)
- Test coverage visible at top level?

If the PR scope is unclear or enormous → **comment requesting split or better description before deep review**.

**Second pass (deep review):**

- Business logic correctness
- Edge cases and error handling
- Architectural fit and cross-system implications
- Security, performance, observability dimensions
- API surface area and backward compatibility

### 5.3 Google's Standard Checklist (from eng-practices)

What reviewers look for:

1. **Design:** Good design, appropriate for system?
2. **Functionality:** Correct behavior, good for users?
3. **Complexity:** Could be simpler? Will another developer understand it?
4. **Tests:** Correct, well-designed automated tests?
5. **Naming:** Clear variable/function/class names?
6. **Comments:** Necessary and useful comments?
7. **Style:** Follows style guides?
8. **Documentation:** Updated where necessary?

Additional for new code/APIs: separate design review before implementation.

### 5.4 Microsoft Engineering Fundamentals: Two-Pass Framework

**Design Pass:**

- PR scope matches description?
- User-facing changes validated (screenshots/GIFs)?
- Architectural patterns and interaction logic sound?

**Code Quality Pass:**

- Single responsibility at function/class level?
- Error handling complete?
- Security: vulnerabilities, PII/EUII exposure?
- Tests cover edge cases?

### 5.5 Staff Engineer Pre-Merge Security Checklist

- [ ] All inputs validated/sanitized
- [ ] No secrets/credentials in code or logs
- [ ] Authentication required on all endpoints
- [ ] Authorization checks correct (RBAC/ABAC)
- [ ] Parameterized queries (no string interpolation in SQL)
- [ ] No sensitive data in error messages
- [ ] Cryptographic algorithms are current standard (AES-256, SHA-256+)
- [ ] New dependencies checked for CVEs and maintenance status

### 5.6 Staff Engineer Observability Checklist

- [ ] New code paths have metrics/counters
- [ ] Errors are logged at appropriate level with context
- [ ] Correlation IDs propagated across service calls
- [ ] New behavior is alert-able (metric exists that would fire on failure)
- [ ] Logs don't expose PII or sensitive data
- [ ] Google's Four Golden Signals covered: Latency, Errors, Traffic, Saturation

### 5.7 DB Migration Safety Checklist

- [ ] Migration is backward-compatible with current app version
- [ ] Rollback procedure documented
- [ ] Destructive operations (drops, type changes) explicitly called out
- [ ] App can run with old and new schema simultaneously
- [ ] Data migrations tested against production-scale volumes
- [ ] Expand-and-contract used for breaking schema changes
- [ ] Migration indexed appropriately (no full table scans)

### 5.8 When to Require a Design Doc / RFC Before Code Review

Thresholds (synthesized from multiple sources):

- Change touches a public API or cross-team contract
- New service or major service decomposition
- New third-party dependency or infrastructure component
- Affects data model for a stateful system
- Performance-critical path change without load data
- Security-sensitive subsystem (auth, payment, encryption)
- Will be used as a template by other teams

ADR trigger (from Spotify): If code review reveals competing patterns for the same problem, backfill an ADR documenting the decision.

---

## 6. Staff vs. Senior: Key Differentiation Table

| Dimension | Senior Engineer | Staff Engineer |
|---|---|---|
| **Scope** | Team-level correctness | Org-level architectural alignment |
| **Time horizon** | Current sprint/feature | 1-3 year system evolution |
| **Review focus** | Code correctness, tests, style | System fit, cross-team impact, long-term maintainability |
| **Blocking criteria** | Bugs, missing tests, style violations | Architectural drift, security, missing observability |
| **Mentoring mode** | Explains correct implementation | Explains why patterns matter at scale |
| **Disagreement handling** | Defers to more senior opinion | Cites principles, proposes alternatives, documents resolution |
| **API concern** | Endpoint correctness | Contract stability, backward compatibility, deprecation path |
| **Performance** | Is it fast enough now? | Will it be fast at 10x load? N+1 patterns? |
| **Observability** | Are logs present? | Can we diagnose a 3am outage? Are alerts possible? |
| **DB migrations** | Does migration run? | Is it reversible? Safe for blue/green deploy? |
| **Dependencies** | Does it compile? | License? Security track record? Maintenance status? |
| **Cross-team** | Mentions if affected | Tags affected team, checks API contracts, notifies consumers |

---

## 7. Real-World Patterns from Companies

### Google

- Code review is mandatory before production
- Three-level approval: peer review + code owner approval + language readability check
- New projects require separate design review before code review
- Primary principle: Approve when code definitely improves health, not when perfect
- Style guides are authoritative; subjective preferences don't block

### Stripe

- API changes require review "beyond a normal code review" — sometimes 20-page design docs
- Write-first culture: design docs and memos precede implementation
- Unship things that don't meet quality bar even if already in production
- Emphasis on API backward compatibility as a first-class concern

### Yelp

- Code review as discussion, not dictation — feedback is a suggestion open to disagreement
- Explicit assignment of review sections to prevent redundant commentary
- Separate style from logic reviews — automate style, focus humans on logic
- "Will you be able to diagnose a 3am outage?" as a review heuristic

### GitHub (Staff Engineer perspective)

- Prioritize reviewing others' code over own work — unblocking teammates is high leverage
- Use "Request Changes" sparingly — only for security threats
- Approve even when suggestions remain — if it won't break production, approve
- 7,000+ PRs reviewed over 8 years: culture of volume + consistency

### Netflix

- High talent density model: autonomy with accountability
- Reviews scrutinize edge cases and failure modes rigorously
- "Unusually responsible" culture: engineers own production behavior
- Post-deployment verification: author checks in production 2 minutes after deploy

### Spotify

- ADR process triggered by code review discoveries of competing patterns
- RFC → ADR workflow for large changes before implementation begins
- Code review is a discovery mechanism for undocumented architectural decisions

---

## 8. Anti-Patterns: What Staff Engineers Avoid

### As Reviewers

- **Rubber stamping:** Approving without reading (sets cultural norm for others to do same)
- **Scope creep in reviews:** Blocking on issues unrelated to the PR's stated purpose
- **Perfection blocking:** Withholding approval because of stylistic preferences
- **Nitpick overload:** More nit comments than substantive ones — signal to invest in linters
- **Context-free blocking:** "I don't like this approach" without explaining why or proposing alternatives
- **Inconsistency:** Blocking one author for a pattern approved in another PR

### In Code Review Culture

- **Reviews as gatekeeping, not collaboration:** Treating authors as adversaries
- **Unwritten blocking criteria:** If you block for a pattern, document it so others know
- **Ignoring the PR description:** Context from the author is crucial before diving into code
- **Only reviewing code you wrote context for:** Staff engineers review across domain boundaries

---

## Connections and Further Research

[[Staff Engineer Prep]] — interview and growth context
[[ADR Practice]] — architecture decision records as review artifact
[[Observability Engineering]] — Charity Majors' framework
[[Technical Debt Management]] — Will Larson's quality management approach
[[API Design Principles]] — Hyrum's Law and backward compatibility

---

## Sources

- [Google Engineering Practices: What to Look For](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
- [Google Engineering Practices: Standard of Code Review](https://google.github.io/eng-practices/review/reviewer/standard.html)
- [Code Review - Software Engineering at Google](https://abseil.io/resources/swe-book/html/ch09.html)
- [How to Review Code Effectively: A GitHub Staff Engineer's Philosophy](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/)
- [Good Code Reviews, Better Code Reviews - Pragmatic Engineer](https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/)
- [Managing Technical Quality - Will Larson / lethain.com](https://lethain.com/managing-technical-quality/)
- [Staff Engineer: Leadership Beyond the Management Track - staffeng.com](https://staffeng.com/guides/manage-technical-quality/)
- [The Staff Engineer's Path - Tanya Reilly (Pragmatic Engineer review)](https://newsletter.pragmaticengineer.com/p/the-staff-engineers-path)
- [The Staff Engineer's Path Book Notes - danlebrero.com](https://danlebrero.com/2024/01/24/the-staff-engineers-path-summary/)
- [Feedback Ladders: Code Reviews at Netlify](https://www.netlify.com/blog/2020/03/05/feedback-ladders-how-we-encode-code-reviews-at-netlify/)
- [Conventional Comments](https://conventionalcomments.org/)
- [Code Review Comment Prefixes - Christian Emmer](https://emmer.dev/blog/code-review-comment-prefixes/)
- [How to Make Good Code Reviews Better - Stack Overflow Blog](https://stackoverflow.blog/2019/09/30/how-to-make-good-code-reviews-better/)
- [Yelp Engineering: Code Review Guidelines](https://engineeringblog.yelp.com/2017/11/code-review-guidelines.html)
- [Microsoft Engineering Fundamentals: Reviewer Guidance](https://microsoft.github.io/code-with-engineering-playbook/code-reviews/process-guidance/reviewer-guidance/)
- [Shipping Software Should Not Be Scary - Charity Majors](https://charity.wtf/2018/08/19/shipping-software-should-not-be-scary/)
- [Charity Majors: Observability and Failure Modes - InfoQ](https://www.infoq.com/articles/charity-majors-observability-failure/)
- [Scaling Engineering Teams via RFCs - Pragmatic Engineer](https://blog.pragmaticengineer.com/scaling-engineering-teams-via-writing-things-down-rfcs/)
- [When Should I Write an ADR - Spotify Engineering](https://engineering.atspotify.com/2020/04/when-should-i-write-an-architecture-decision-record)
- [Evolutionary Database Design - Martin Fowler](https://martinfowler.com/articles/evodb.html)
- [Inside Stripe's Engineering Culture - Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/stripe)
- [The Staff Engineer's Path Review - tonyandrewmeyer.com](https://tonyandrewmeyer.com/2026/01/10/review-the-staff-engineers-path-by-tanya-reilly/)
- [Senior Engineer's Guide to Code Reviews - DEV Community](https://dev.to/middleware/the-senior-engineers-guide-to-the-code-reviews-1p3b)

---

**Suggested location:** 3_Resources/Engineering/Code-Review/
**Potential MOCs:** [[Engineering Excellence MOC]], [[Staff Engineer MOC]]
**Tags:** #staff-engineer #code-review #technical-leadership #architecture #observability #security
