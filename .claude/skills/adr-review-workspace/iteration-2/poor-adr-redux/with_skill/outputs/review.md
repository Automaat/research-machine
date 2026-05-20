# ADR Review: 0002 — Use Redux for State Management

**ADR path:** `/Users/marcin.skalski/sideprojects/research-machine/.claude/skills/adr-review-workspace/test-adrs/0002-frontend-state-management.md`
**Review date:** 2026-03-04

---

## Phase 1 — Structural Summary

The ADR has the minimum MADR skeleton — context, options, decision outcome — but all sections are thin to the point of being placeholders. **Missing:** decision drivers, pros/cons analysis of each option, negative consequences, confirmation criteria, and decision makers. Only 2 options listed with zero evaluation of the rejected one (MobX). The consequences section lists only positives.

**Metadata:** Date and status are present. No decision makers identified. Status is "accepted" which is premature given the gaps.

---

## Phase 2 — Top Concerns

**1. The problem statement isn't a problem — it's a solution category.**
"We need state management for our React app" describes a tool category, not an architectural problem. What's actually failing? Prop drilling across 5+ levels? Inconsistent shared state causing bugs? Server cache synchronization? The real problem determines which tool fits — Redux solves different pain points than TanStack Query or Context+useReducer. Without a concrete problem, the decision has no anchor.

**2. Two options with no analysis of the rejected one reads as predetermined.**
Only Redux and MobX are considered, and MobX gets zero discussion — no pros, no cons, no reason it was rejected. Missing from consideration entirely: React Context + useReducer (built-in, zero dependencies), Zustand (minimal API, small bundle), Jotai/Recoil (atomic state), TanStack Query (if the real problem is server state). Two options where one is invisible is a strong signal of the **Rubber Stamp** anti-pattern — the decision was made before the ADR was written.

**3. "Industry standard" is not architectural rationale.**
"Most developers know it" and "it's the industry standard" are hiring/familiarity arguments, not architectural ones. What specific technical requirements does Redux satisfy? Predictable state transitions via reducers? Time-travel debugging needs? Complex cross-cutting state that simpler tools can't handle? If familiarity is genuinely the top driver, that's valid — but it should be stated as an explicit decision driver with the tradeoffs acknowledged (e.g., Redux's boilerplate cost accepted in exchange for onboarding speed).

---

## Phase 3 — Awaiting Response

*(In a live review, this is where I'd pause for the author to respond before continuing. Since this is a written review, continuing to Phase 4.)*

---

## Phase 4 — Additional Observations

- **No negative consequences listed.** Redux introduces significant boilerplate, increases bundle size, has a learning curve around async patterns (thunks/sagas), and adds indirection that can slow down simple feature development. These need honest documentation.
- **Redux vs Redux Toolkit is unspecified.** The difference in developer experience is massive — vanilla Redux is rarely recommended in 2026. Clarify which is intended.
- **No "do nothing" / "defer" option considered.** For a new or small app, starting without a state management library and adding one when pain is felt is a legitimate strategy.
- **No reversibility assessment.** Redux deeply couples your component tree to its patterns (selectors, dispatch, store shape). This is a high-commitment decision — the ADR should acknowledge the migration cost if it turns out wrong.
- **No scope boundaries.** Will Redux manage all state (local UI, server cache, forms) or only global app state? This significantly affects complexity.
- **Shows strong signs of the Rubber Stamp anti-pattern** — decision clearly made before the ADR was written, then documented retroactively to justify it.
- **Status should be "proposed" not "accepted"** until these gaps are addressed and the team has genuinely evaluated alternatives.

---

## Phase 5 — Suggested Improvements

To make this ADR presentation-ready, I'd recommend:

1. **Rewrite the problem statement** to describe the actual pain: what state problems exist, what complexity level the app has, what's broken or hard today.
2. **Expand to 4-5 genuine options** — at minimum add Context+useReducer, Zustand, and a "defer/do nothing" option. Each needs honest pros/cons.
3. **Add a Decision Drivers section** — list what matters: team familiarity, bundle size, debugging capabilities, ecosystem maturity, migration cost from current approach.
4. **Add negative consequences** — boilerplate overhead, bundle size increase, async complexity, coupling to Redux patterns.
5. **Specify Redux Toolkit** if that's the intent, and document the middleware strategy (RTK Query? Thunks? Sagas?).
6. **Add confirmation criteria** — how will you know the decision is working? Reduced bug count? Faster feature delivery? Developer satisfaction survey?
7. **Revert status to "proposed"** until the above gaps are filled and reviewed by the team.
