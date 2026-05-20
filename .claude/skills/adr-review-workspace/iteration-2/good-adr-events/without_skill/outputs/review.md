# ADR Review: Use Event-Driven Architecture for Order Processing

**ADR:** 0001-use-event-driven-architecture.md
**Status:** Proposed
**Reviewer:** AI Review (Claude)
**Review Date:** 2026-03-04

---

## Overall Assessment

This is a well-structured, clearly written ADR. The problem is well-defined with concrete metrics, the options are meaningfully distinct, and the decision rationale is sound. The ADR follows MADR conventions properly. A few areas could be strengthened before final approval.

**Verdict: Approve with minor suggestions**

---

## Strengths

- **Concrete problem framing:** Quantified metrics (50k orders/day, P99 at 30s+, 5% failure rate during peak) make the problem tangible and the success criteria measurable.
- **Honest constraints:** Budget cap ($5k/month), team experience gaps, and migration constraints are stated upfront, which grounds the decision in reality rather than idealism.
- **Well-differentiated options:** Each option represents a genuinely different approach (managed streaming, managed queuing, no paradigm change) rather than variations of the same idea.
- **Balanced consequences:** Negative consequences are specific and actionable, not vague hand-waving. Vendor lock-in, eventual consistency, and monitoring complexity are real tradeoffs that the team needs to plan for.
- **Confirmation criteria are testable:** Load test targets, latency thresholds, zero-loss simulation, and parallel-run duration are all concrete and verifiable.

---

## Suggestions for Improvement

### 1. Clarify the Eventual Consistency Impact on User Experience

The negative consequence "order status won't be immediately available after submission" deserves more detail. Consider adding:

- What will the user see after placing an order? A "processing" status?
- What is the expected p99 delay before order status converges?
- Are there specific business flows (e.g., customer support lookup, immediate cancellation) that are impacted?

This is the tradeoff most likely to generate pushback from product stakeholders.

### 2. Address the Vendor Lock-in Mitigation Strategy

The ADR identifies AWS vendor lock-in as a negative consequence but does not discuss mitigation. Consider adding a sentence about whether the team plans to:

- Abstract the messaging layer behind an internal interface
- Accept the lock-in as a reasonable tradeoff given existing AWS investment
- Revisit if multi-cloud becomes a requirement

Even a one-liner stating the team's stance would strengthen this.

### 3. Expand on Idempotency Strategy

The ADR mentions the team "needs to learn async patterns (idempotency, ordering guarantees, DLQ processing)" as a negative consequence. Given that idempotency is critical for correctness in an at-least-once delivery system like SQS, consider:

- Will idempotency keys be part of the order message schema?
- Is there a deduplication window strategy (SQS FIFO provides 5-minute dedup)?
- This could be deferred to a follow-up ADR, but it should be explicitly called out as a dependency.

### 4. Missing: Ordering Guarantees Discussion

SQS standard queues do not guarantee ordering. FIFO queues do but with throughput limits (300 msg/s without batching, 3000 with). The ADR mentions FIFO as "neutral" but does not state whether ordering matters for this use case. Clarify:

- Does order processing require strict ordering (e.g., order-then-cancel sequences)?
- If yes, is the FIFO throughput ceiling acceptable at 10x scale (500k orders/day ~ ~6 orders/sec average, but peak bursts could be much higher)?

### 5. Confirm DLQ Processing Ownership

DLQ is mentioned as a positive (debuggability) but there is no mention of who processes the DLQ or what the expected workflow is. A brief note on the operational runbook or alerting strategy for DLQ messages would close this gap.

### 6. Consider Adding a "Risks" Section

Two risks worth calling out explicitly:

- **Message size growth:** The 256KB SQS limit is noted as sufficient for orders. If order payloads grow (e.g., adding line-item images, custom metadata), this could become a hard blocker. The common pattern is to store the payload in S3 and pass a reference — worth noting if this is planned.
- **Observability gap:** The ADR notes existing monitoring is built around sync request/response. The migration to async will require new dashboards, alerts, and likely new tooling. This should be planned in parallel, not after cutover.

### 7. Minor: Review Date vs. Current Date

The ADR lists "Review scheduled: 2026-03-01" but that date has passed. Update the status or add a note on the review outcome.

### 8. Minor: RFC-042 Link

The migration plan references "[link to RFC-042]" as a placeholder. Replace with the actual link before finalizing.

---

## Questions for the Review Meeting

1. Has the product team been consulted on the eventual consistency impact on order status UX?
2. What is the rollback plan if the parallel-run (old + new) reveals data inconsistencies?
3. Is there a target date for decommissioning the synchronous pipeline after cutover?
4. Will the SQS/SNS architecture be reused for other domains beyond order processing, or is this scoped strictly to orders?
5. What happens to in-flight orders during a deployment of the new consumers?

---

## Summary

| Category | Rating |
|---|---|
| Problem Definition | Strong |
| Options Analysis | Strong |
| Decision Rationale | Strong |
| Consequences | Good (minor gaps) |
| Confirmation Criteria | Strong |
| Completeness | Good (see suggestions) |

The ADR is ready for team review with the minor suggestions above incorporated. The core decision (SQS/SNS over Kafka or circuit breakers) is well-justified given the stated constraints. The main areas to tighten are around the operational implications of eventual consistency, ordering guarantees, and the DLQ processing workflow.
