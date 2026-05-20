# ADR Review: 0002 — Use Redux for State Management

**File:** `test-adrs/0002-frontend-state-management.md`
**Status:** accepted | **Date:** 2026-01-10

---

## Phase 1 — Structural Summary

This ADR is quite thin. It has the three required MADR sections (Context, Considered Options, Decision Outcome), but each is minimal — one sentence or a short list. Several valuable sections are entirely missing:

**Missing sections:**

- **Decision Drivers** — no articulation of what forces shaped this choice (app complexity? team size? data flow patterns?)
- **Pros and Cons of Options** — MobX is listed but never evaluated. No tradeoff analysis at all.
- **Negative consequences** — only positive consequences listed. No acknowledgment of Redux's well-known downsides.
- **Confirmation** — no criteria for validating this decision works.
- **Decision makers** — metadata doesn't identify who made or approved this decision.

The ADR also shows signs of the **Rubber Stamp** anti-pattern — it reads like a post-hoc justification for a decision that was already made, rather than a genuine evaluation of alternatives.

---

## Phase 2 — Top 3 Concerns

**1. The problem statement doesn't describe a problem.**

"We need state management for our React app" is not a problem statement — it's a solution category. What is actually going wrong? Are you dealing with prop drilling across 15 levels? Is shared state between sibling components causing bugs? Is there server state that needs caching and synchronization? The nature of the state management problem dramatically changes which tool is appropriate. React's built-in useState/useContext solves many cases without any library at all. Without knowing what pain you're experiencing, it's impossible to evaluate whether Redux (or any external library) is the right call.

**2. Only two options considered, and the rejected one has zero analysis.**

MobX is listed as an alternative but there's no evaluation of it — no pros, no cons, no reason for rejection. More critically, several obvious alternatives are missing entirely:

- **React Context + useReducer** — built-in, zero dependencies, sufficient for many apps
- **Zustand** — much simpler API, smaller bundle, growing community adoption
- **Jotai / Recoil** — atomic state model, better for certain UI patterns
- **TanStack Query (React Query)** — if the "state" is actually server-cache (a very common case), this is a fundamentally different and often better approach
- **Do nothing** — is the current approach actually broken, or just uncomfortable?

With only two options and no analysis of the rejected one, this reads like a predetermined conclusion.

**3. "Industry standard and most developers know it" is not architectural rationale.**

The decision rationale leans entirely on popularity and familiarity. These are valid factors, but they shouldn't be the only ones. Several questions this doesn't address:

- What is the shape and scale of the state you're managing? (Global UI state? Server cache? Form state? Real-time data?)
- How much boilerplate is acceptable? Redux Toolkit has reduced this significantly, but is the team using RTK or legacy Redux?
- What's the app's complexity? For a small-to-medium app, Redux can be over-engineered. For a large app with complex data flows, it might be justified.
- Is the team actually experienced with Redux specifically, or just aware it exists? Familiarity with a name and competence with the patterns (middleware, selectors, normalized state, thunks vs sagas) are very different things.

---

## Phase 3 — Waiting for Response

Before continuing with additional observations, I'd want to hear your thoughts on the above. Specifically:

- What state management challenges are you actually facing in the app?
- Were other options discussed informally and rejected for reasons not captured here?
- Is Redux already partially integrated, making this ADR retroactive?

---

## Phase 4 — Additional Observations

Sharing these now since this is an async review:

**Consequences section is one-sided.** Only positive consequences are listed ("well-documented", "lots of middleware"). Redux has well-known costs that should be acknowledged honestly:

- Significant boilerplate (even with RTK: slices, selectors, typed hooks, store configuration)
- Learning curve for async patterns (thunks, sagas, RTK Query)
- Bundle size impact (~16KB for redux + react-redux, more with middleware)
- Over-fetching risk if Redux is used for server state instead of a purpose-built tool like React Query
- Indirection — action → reducer → selector pattern can make simple state changes hard to trace

**No mention of Redux Toolkit.** In 2026, using Redux without RTK would be a notable decision. The ADR should clarify whether this means RTK (modern, recommended) or legacy Redux (createStore, manual action creators). This significantly affects the developer experience evaluation.

**The title conflates the problem with the solution.** "Use Redux for State Management" pre-announces the conclusion. A better title would frame the decision: "Frontend State Management Approach" or "State Management Strategy for [App Name]". The current title reinforces the rubber-stamp impression.

**No connection to other ADRs.** This decision likely interacts with other architectural choices (API layer design, component architecture, testing strategy). ADR-0001 in this repo discusses event-driven architecture — if the frontend consumes events or real-time data, that directly affects state management needs.

**Status is "accepted" but the analysis doesn't support a confident decision.** Before presenting this to the team, the gap between the thin analysis and the "accepted" status will likely draw questions. Consider reverting to "proposed" until the ADR is fleshed out.

---

## Suggested Improvements

If you'd like, I can help with any of these:

1. **Rewrite the problem statement** — frame it around the actual state management pain points in your app, with concrete examples
2. **Expand the options list** — add React Context, Zustand, and TanStack Query with honest pros/cons for each
3. **Add a Decision Drivers section** — capture what actually matters (team experience, app complexity, performance requirements, bundle size budget)
4. **Balance the consequences** — add negative consequences and operational considerations
5. **Add confirmation criteria** — how will you know Redux was the right call 3 months from now?
6. **Cross-reference related ADRs** — connect to other frontend architecture decisions

This ADR needs substantial work before it's ready for team presentation. The bones are there — it just needs the reasoning that makes an ADR valuable as a historical record.
