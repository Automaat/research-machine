---
status: proposed
date: 2026-02-15
decision-makers:
  - Maria Chen (Tech Lead)
  - John Park (Staff Engineer)
---

# Use Event-Driven Architecture for Order Processing

## Context and Problem Statement

Our monolithic order processing pipeline handles ~50k orders/day synchronously. During peak sales (Black Friday, flash sales), the system experiences cascading failures when downstream services (inventory, payment, shipping) become slow or unavailable. P99 latency spikes to 30s+ and we see ~5% order failures during these events. We need a more resilient approach to order processing that can handle 10x traffic spikes without cascading failures.

## Decision Drivers

* Reliability during peak traffic is the top business priority for Q3
* Team has limited experience with event streaming platforms
* Current system must continue operating during migration (no big-bang cutover)
* Budget constraints rule out fully managed solutions above $5k/month
* Existing monitoring and alerting infrastructure is built around synchronous request/response patterns

## Considered Options

* **Option A: Apache Kafka-based event streaming**
* **Option B: AWS SQS/SNS with fan-out pattern**
* **Option C: Optimize current synchronous pipeline with circuit breakers and retry logic**

## Decision Outcome

Chosen option: **Option B — AWS SQS/SNS with fan-out pattern**, because it provides the resilience benefits of event-driven architecture without requiring the team to operate a complex streaming platform. The managed nature of SQS/SNS aligns with our operational capacity, and the cost fits within budget at our projected scale.

### Consequences

**Positive:**

* Orders are durably queued — downstream failures no longer cause order loss
* Each downstream service processes at its own pace, eliminating cascading slowdowns
* SQS provides native dead-letter queues for failed processing, improving debuggability
* No infrastructure to manage — AWS handles scaling and availability

**Negative:**

* Introduces eventual consistency — order status won't be immediately available after submission
* Adds AWS vendor lock-in for a core business flow
* Team needs to learn async patterns (idempotency, ordering guarantees, DLQ processing)
* Monitoring complexity increases — need to track queue depths, processing lag, DLQ growth
* Testing becomes harder — need to simulate async flows in CI

### Confirmation

* Load test the new pipeline at 500k orders/day (10x current) with simulated downstream failures
* Verify P99 latency stays under 2s for order submission
* Confirm zero order loss during 30-minute downstream outage simulation
* Run parallel processing (old + new) for 2 weeks before cutover

## Pros and Cons of the Options

### Option A: Apache Kafka

* Good, because it provides true event streaming with replay capability
* Good, because it supports complex event processing and real-time analytics
* Bad, because operating Kafka requires significant expertise the team lacks
* Bad, because managed Kafka (MSK/Confluent) exceeds our $5k/month budget at projected scale
* Bad, because it's overengineered for our current use case (we need queuing, not streaming)

### Option B: AWS SQS/SNS

* Good, because fully managed — zero operational overhead
* Good, because cost-effective at our scale ($200-500/month projected)
* Good, because team has existing AWS expertise
* Bad, because limited to 256KB message size (sufficient for orders but constraining for future use)
* Bad, because no native event replay (would need separate solution if needed later)
* Neutral, because FIFO queues available but add complexity and reduce throughput

### Option C: Circuit breakers + retries on current system

* Good, because minimal code changes, fastest to implement
* Good, because no new infrastructure or paradigm shift
* Bad, because doesn't solve the fundamental coupling problem — just masks symptoms
* Bad, because retry storms can amplify load during outages
* Bad, because doesn't address the 10x scale requirement

## More Information

* Related: ADR-0003 (database selection) — event handlers will write to the same PostgreSQL cluster
* Migration plan: [link to RFC-042]
* Estimated implementation: 6 weeks with 2 engineers
* Review scheduled: 2026-03-01
