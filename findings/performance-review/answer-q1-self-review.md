# Q1: Self review assessment - FY26

## What I delivered

**Workload Identity** - New identity model for mesh workloads on K8s and Universal. Designed, wrote MADR, created umbrella (10+ sub-issues), implemented: 14+ PRs in kuma, 2 in kong-mesh, 6 doc PRs. End-to-end.

**Skip Inbound Tags** - Dataplanes can now work without inbound tags via label-based MeshService matching. Umbrella (7+ sub-issues), 12 PRs, experimental flag, Helm, e2e tests.

**Inspect API redesign** - Rewrote policy inspection system. New OAPI schema, 4 endpoints. Closed on schedule.

**Rules API for inbound policies** - Implemented new rules API pattern for inbound policies, starting with MeshFaultInjection. Plugin logic, docs, and extended to MeshGlobalRateLimit in kong-mesh.

Also: SpiffeId in MeshTrafficPermission, multiple docs updates like nice visualization of schema.

## Business impact

~281 PRs authored (Kong ~81, kumahq ~200+), ~83 issues, ~200 PRs reviewed, 14 repos, 2 orgs.

Fixed production panics (OTel, XDS, IAM). SHA-pinned Actions across 6+ repos. Migrated 2 repos to Renovate.

Led mise migration (6+ repos). Built schema_viewer for kuma-website. Added quality gates (Vale, rubocop, shellcheck, markdownlint). Added AI copilot instructions to kuma (5 PRs). SEO metadata, docsearch v4.

## COURAGE

- OWNERS: Every initiative went from MADR to code to docs to bug fixes, all mine
- EXPLORERS: AI copilot instructions, schema_viewer from scratch, mise adoption across org
- ACCELERATORS: Shipped every month Mar 2025 - Feb 2026, no gaps
- UNSTOPPABLE: 4 major initiatives plus ~200 reviews in one year

## Above expectations

Solo speaker at KubeCon EU 2025 London (~12,000 attendees). Took on docs, CI/CD, tooling work outside core scope. All kumahq work is open source.

## Challenges

WorkloadID spanned 3 platforms with different identity models. Broke it into small sub-issues and shipped incrementally. Kuma-website had years of tech debt; worked through it layer by layer. Cross-repo features meant syncing PRs across 4 repos; umbrella issues kept it manageable.

## Growth areas

- Connect architectural work to customer pain points (I mostly hear about customers secondhand)
- More mentoring to spread architectural skills across the team
