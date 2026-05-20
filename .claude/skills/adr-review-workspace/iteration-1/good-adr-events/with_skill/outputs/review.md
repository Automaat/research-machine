# ADR Review: Use Event-Driven Architecture for Order Processing

**ADR:** `0001-use-event-driven-architecture.md`
**Reviewed:** 2026-03-04
**Status:** Proposed (dated 2026-02-15)
**Decision makers:** Maria Chen (Tech Lead), John Park (Staff Engineer)

---

## Phase 1 — Structural Summary

This is a well-structured ADR that covers all core MADR sections and most optional ones. Context, options, decision outcome, decision drivers, consequences (both positive and negative), confirmation criteria, and pros/cons are all present and substantive. Metadata (status, date, decision-makers) is complete.

**No major structural gaps.** The ADR includes sections that many ADRs skip — decision drivers, confirmation criteria, and honest negative consequences. This is above-average structural quality.

Minor structural note: the "More Information" section references "ADR-0003 (database selection)" and "RFC-042" but neither is linked resolvably — just bare text references. If these exist in the repo, linking them would help future readers.

---

## Phase 2 — Top 3 Concerns

### 1. Eventual consistency impact on user experience — how is this being communicated and handled?

The negative consequences correctly flag that "order status won't be immediately available after submission." For an order processing system, this is a significant UX change. Customers expect immediate confirmation. Have you considered:

- What does the user see after clicking "Place Order"? Is there an optimistic acknowledgment pattern planned?
- How does this affect downstream integrations (e.g., email confirmation, inventory reservation)? If inventory check is now async, can two customers "successfully" order the last item?
- Is there a defined SLA for how quickly eventual consistency resolves (e.g., order status available within 5s)? The confirmation section targets P99 < 2s for *submission* latency, but doesn't address *status availability* latency.

This isn't a reason to reject the ADR, but the consequences section would be stronger with a sentence about the mitigation strategy for eventual consistency — even if it's "see RFC-042."

### 2. The "do nothing + partial improvement" path may be undervalued

Option C (circuit breakers + retries) is dismissed with three "Bad" points, but the analysis conflates two separate things: resilience and scale. Circuit breakers genuinely address cascading failures (the primary pain described in the problem statement). The 10x scale requirement is mentioned in the problem statement but isn't quantified as a current pain — it reads more like a forward-looking goal.

Have you considered a phased approach: Option C now (2 weeks of work vs. 6 weeks) to stop the bleeding on cascading failures, followed by Option B for the scale requirement? The ADR's own decision drivers say "current system must continue operating during migration" — which suggests the urgency is real and a faster partial fix has value.

This matters because if the primary driver is "stop losing 5% of orders during peaks," circuit breakers with proper bulkheading could address that within days, buying time for a more careful async migration.

### 3. Vendor lock-in is acknowledged but not scoped — what's the exit cost?

The ADR honestly flags AWS vendor lock-in but doesn't assess its severity. SQS/SNS for a *core business flow* (order processing) is a deep commitment. Some questions:

- If the company moves to multi-cloud or away from AWS in 3 years, what's the estimated migration cost? Is the team abstracting behind an interface (e.g., a messaging abstraction layer), or coupling directly to SQS/SNS APIs?
- The 256KB message size limit is noted as "sufficient for orders but constraining for future use." What future use cases are anticipated? If event-driven patterns expand to other domains, will SQS/SNS still be the right choice, or will you face a second migration?
- Have you evaluated AWS EventBridge as a middle ground? It's still managed AWS but offers more flexibility for event routing and schema evolution.

---

## Phase 3 — Awaiting Response

*(In an interactive session, this is where I'd pause for your responses before continuing. Since this is a written review, I'll proceed to Phase 4.)*

---

## Phase 4 — Additional Observations

### Strengths worth noting

- **Problem statement is excellent.** Concrete numbers (50k orders/day, P99 at 30s+, 5% failure rate, 10x target) make the problem real and the decision evaluable. This is what good ADR problem statements look like.
- **Decision drivers are honest.** Admitting the team has "limited experience with event streaming platforms" is the kind of candor that prevents bad decisions. The budget constraint adds useful boundaries.
- **Confirmation criteria are specific and testable.** 500k orders/day load test, P99 < 2s, zero loss during 30-min outage, 2-week parallel run — these are genuine validation steps, not hand-waving.
- **Pros/cons analysis is balanced.** Option B has genuine "Bad" entries. The Kafka dismissal is well-reasoned (overengineered for queuing, not streaming). No signs of the "Technology Crush" anti-pattern.

### Minor observations

1. **Ordering guarantees aren't discussed.** SQS standard queues don't guarantee ordering. For order processing, does order matter? (e.g., can a shipping event arrive before a payment confirmation?) FIFO queues are mentioned as "neutral" but this deserves more analysis — particularly since FIFO queues have a throughput limit of 300 messages/second (3,000 with batching), which may be tight at 10x scale during peak bursts.

2. **Idempotency strategy is flagged but not addressed.** The negative consequences mention the team "needs to learn async patterns (idempotency, ordering guarantees, DLQ processing)" but the ADR doesn't outline the approach. Given this is a core business flow handling money, the idempotency design (at-least-once delivery + idempotent handlers) deserves either a section here or a reference to a follow-up ADR.

3. **DLQ processing operationally.** Dead-letter queues are mentioned as a positive, but who monitors them? What's the runbook for DLQ items? If a downstream service is broken for 2 hours, you could have thousands of DLQ messages. The operational burden negative consequence is noted but could be more specific about what new operational processes are needed.

4. **Parallel run risk.** The confirmation section mentions "run parallel processing (old + new) for 2 weeks." Processing orders twice has risks — double charges, double shipments, double inventory deductions. How is dual-write safety handled? This is worth a sentence in the ADR or a pointer to the migration plan.

5. **The review date in "More Information" says 2026-03-01** — that's already passed. If this ADR is still in "proposed" status, either update the date or note the review outcome.

---

## Summary Assessment

| Dimension | Rating | Notes |
|---|---|---|
| Structural completeness | Strong | All core + most optional MADR sections present |
| Problem clarity | Strong | Concrete metrics, clear pain points |
| Options analysis | Good | Balanced, honest, but Option C may be undervalued |
| Decision rationale | Good | Clear reasoning, follows from analysis |
| Consequences | Good | Both positive and negative, but eventual consistency mitigation missing |
| Confirmation criteria | Strong | Specific, measurable, testable |
| Risks & blind spots | Fair | Vendor lock-in depth, ordering guarantees, idempotency strategy need more |

**Overall:** This is a well-written ADR that's above average in structure and honesty. The decision itself (SQS/SNS over Kafka for a team without streaming experience, within budget) is reasonable and well-argued. The main areas for improvement are: (1) deeper treatment of eventual consistency impact on UX, (2) fair evaluation of a phased approach starting with Option C, and (3) more specificity on the operational and technical patterns needed (ordering, idempotency, DLQ ops).

---

## Suggested Improvements

If the authors want to strengthen this ADR before the review meeting:

1. Add 1-2 sentences in consequences about how eventual consistency will be handled from a user perspective
2. Address FIFO vs. standard queue decision explicitly — this is a sub-decision that significantly affects the architecture
3. Add a note on idempotency approach (even if just "will be covered in ADR-0005")
4. Consider whether a phased approach (Option C first, then B) deserves explicit discussion and rejection if it's been considered
5. Update the review date or add review outcome
