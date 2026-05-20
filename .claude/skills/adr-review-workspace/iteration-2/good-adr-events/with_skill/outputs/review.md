# ADR Review: Use Event-Driven Architecture for Order Processing

**ADR:** 0001-use-event-driven-architecture.md
**Reviewed:** 2026-03-04
**Status:** Proposed

---

## Phase 1 — Structural Summary

This is a well-structured ADR that covers all core MADR sections and most optional ones. Context is concrete with real numbers, options are genuine alternatives, and the decision outcome includes clear rationale. Decision drivers, consequences (both positive and negative), confirmation criteria, and pros/cons per option are all present. Metadata (status, date, decision-makers) is complete.

No major structural gaps. Minor: the "More Information" section references a review date (2026-03-01) that has passed — outcome should be noted.

---

## Phase 2 — Top Concerns

1. **Eventual consistency impact on user experience is acknowledged but not mitigated.** The negative consequences mention "order status won't be immediately available after submission," but there's no discussion of what the customer actually sees. Does the UI show a pending state? Is there a synchronous acknowledgment before async processing? For a customer-facing order flow, this UX gap could drive support tickets. Have you mapped out the order status lifecycle from the customer's perspective?

2. **The vendor lock-in consequence deserves scoping.** The ADR notes AWS vendor lock-in for a core business flow but doesn't discuss whether an abstraction layer is planned or whether this is an accepted tradeoff. Given this is order processing — arguably the most critical business path — what's the exit cost if AWS SQS/SNS pricing changes or you need multi-cloud? Is there a message interface abstraction, or are SQS APIs called directly throughout the codebase?

3. **Migration risk during the parallel-run period is underspecified.** The confirmation section mentions "run parallel processing (old + new) for 2 weeks before cutover," but the consequences don't address the operational burden of running dual pipelines. How do you handle divergence? What if the async pipeline processes an order differently than the sync one? Who monitors both, and what are the rollback criteria?

---

## Phase 3 — Awaiting Response

*(In a live review, the author would respond to the above concerns before proceeding. The remaining observations follow below.)*

---

## Phase 4 — Additional Observations

- The 256KB SQS message size limit is noted as "sufficient for orders but constraining for future use" — consider documenting what future use cases are anticipated and whether a claim-check pattern is planned.
- FIFO vs standard queue tradeoff is marked "neutral" but deserves explicit decision — order processing likely needs ordering guarantees per customer. Which queue type is planned?
- The cost comparison ($200-500/month for SQS vs >$5k for Kafka) is helpful but should note whether this includes related costs (CloudWatch, Lambda/compute for consumers, DLQ reprocessing tooling).
- ADR-0003 (database selection) is referenced — worth noting whether event handlers writing to PostgreSQL introduces a new bottleneck that replaces the one being solved.
- No mention of idempotency strategy despite calling it out as something the team needs to learn. This is architecturally significant — at-least-once delivery with SQS means handlers must be idempotent. Worth a brief note on the approach (idempotency keys, deduplication window, etc.).
- The "do nothing" aspects of Option C are fairly assessed, but the option could note that circuit breakers + retries could serve as a Phase 1 while the async migration is built — these aren't mutually exclusive.
- Monitoring transition plan is missing. The decision drivers note existing monitoring is built around sync patterns. What's the plan for observability of async flows? Distributed tracing across queues?
- No mention of message schema evolution strategy. As order format changes over time, how will in-flight messages be handled?

---

## Phase 5 — Suggested Improvements

If the author wants to strengthen this ADR before the review meeting, the highest-value additions would be:

1. **Add a brief section on the customer-facing UX during eventual consistency** — even 2-3 sentences on the order acknowledgment flow.
2. **State the FIFO vs standard queue decision explicitly** — this is a sub-decision that affects correctness guarantees.
3. **Add a sentence on the idempotency approach** — this is the primary engineering challenge of the migration.
4. **Update the review date** — 2026-03-01 has passed, note the outcome or reschedule.

---

## Anti-Pattern Assessment

This ADR shows **none of the major anti-patterns**. It is not a rubber stamp (Option C is a genuine lightweight alternative, and Kafka is a credible heavyweight one). It is not a technology crush (SQS/SNS cons are honestly stated). The reasoning bridge from analysis to decision is clear. The ADR is properly dated, statused, and cross-references related decisions.

**Overall assessment:** Strong ADR. The core decision is well-reasoned and well-documented. The gaps identified above are refinements, not structural problems. Addressing concerns 1-3 would make this ready for acceptance.
