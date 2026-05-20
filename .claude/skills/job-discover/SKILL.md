---
name: job-discover
description: Search multiple job sources for new listings, spawn parallel triage agents, and update tracking state. Use when running /job-discover or searching for new job opportunities.
allowed-tools:
  - WebSearch
  - WebFetch
  - Read
  - Edit
  - Grep
  - Bash
  - Task
  - Skill
user-invocable: true
---

# Job Discover Skill

## Description

Search multiple job sources, find new listings, spawn parallel triage agents, update tracking state.

## Trigger

User invokes `/job-discover` or asks to search for new jobs.

---

## Prerequisites

### JSearch API Key

Load from `.env.local` (git-ignored):

```bash
source .env.local 2>/dev/null || true
```

If `$JSEARCH_API_KEY` not set, skip JSearch source and use other sources.

---

## Compensation Tolerance Rule

### Remote Europe (default)

**10% Tolerance for MAYBE:**

- Target: €160k total compensation
- **€144k–€160k** → MAYBE (within 10% below target)
- **<€144k** → NO-GO
- **€160k+** → GO

Example: €151k → MAYBE (5.6% below); €135k → NO-GO (15.6% below); €172k → GO.

### Relocation to Zurich (CHF)

- **≥300k CHF total comp** → GO
- **270k–299k CHF** → MAYBE
- **<270k CHF** → NO-GO

Search for on-site or hybrid Zurich roles with strong engineering culture.

### Relocation Anywhere (Visa Sponsorship, USD)

Requirements: explicit visa sponsorship + total comp (base + equity + bonus):

- **≥$400k USD total comp** → GO
- **$360k–$399k USD** → MAYBE
- **<$360k USD** → NO-GO

---

## Workflow

### Phase 1: Load State

1. Read `findings/job-search/tracking.md` — extract all URLs to build "already processed" set
2. Read `findings/job-search/companies.md` — extract Active companies for career page searches
3. Read `findings/job-search/profile.md` — note key terms: Go, Kotlin, Java, distributed systems, platform, AI
4. Check Playwright availability (skip Playwright sources if unavailable):

```bash
SKILL_DIR=".claude/skills/job-discover/scripts"
if [ -d "$SKILL_DIR/node_modules/playwright" ]; then
  echo "✅ Playwright available"
  PLAYWRIGHT_AVAILABLE=true
else
  echo "⚠️ Playwright not installed — run: mise run playwright:setup"
  echo "   Skipping Playwright sources for this run."
  PLAYWRIGHT_AVAILABLE=false
fi
```

Read `references/search-sources.md` in full before starting Phase 2.

---

### Phase 2: Search Sources

Run all searches defined in `references/search-sources.md`:

- JSearch API (8 searches, if `$JSEARCH_API_KEY` available)
- Global Remote Boards (Sources 1–6: HN, RemoteOK, WWR, Arc.dev, Wellfound, YC)
- EU-Focused Boards (Sources 7–11: Landing.jobs, SwissDevJobs, Berlin, EuroTech, Zurich)
- New Static Boards (Sources 12–15: Golang Cafe, Working Nomads, Remotive, Kube Careers)
- ATS Direct APIs (Greenhouse, Lever, Ashby for watched companies — no API key needed)
- Watched Company Careers
- General Web Search (AI-focused, broader, stack variations, high-comp visa, Zurich)
- Playwright Sources (Sources 16–18: Welcome to the Jungle, Levels.fyi, Himalayas) — if `$PLAYWRIGHT_AVAILABLE`

Collect all discovered URLs into a candidate pool.

---

### Phase 3: Deduplicate & Prioritize

1. Filter to only NEW URLs (not in "already processed" set from tracking.md)
2. Prioritize for triage:
   - Priority 1: Watched companies with green flags (remote-first, EU presence, Go stack)
   - Priority 2: High-comp relocation tiers (🌎 ≥$400k USD visa-sponsored, 🇨🇭 ≥300k CHF Zurich)
   - Priority 3: Job board listings from HN, YC, quality sources
   - Priority 4: General search results
3. If no new URLs found, report count 0 and exit

---

### Phase 4: Parallel Triage

Triage order: Priority 1 → 2–3. Run max 3 triage agents at a time.

For each new URL, spawn triage agent:

```text
Use Task tool:
- subagent_type: "general-purpose"
- prompt: "Run /job-triage [URL]. Return the full triage result."
- run_in_background: true
```

**Alternative (sequential):** Run `/job-triage` via Skill tool if parallel execution is problematic.

Collect results as they complete.

---

### Phase 5: Update Tracking (Post-Triage)

For each triage result:

1. Parse verdict (GO / NO-GO / MAYBE)
2. Extract: Company, Role, URL, Notes/Reason
3. Add row to appropriate table in `findings/job-search/tracking.md` using Edit tool

Row format:

```markdown
| 2026-01-26 | Company | Role | URL | Notes/Reason |
```

Update stats section: increment Total Processed, GO/NO-GO/MAYBE counters.

---

### Phase 6: Verify GO Listings (Automatic)

Always runs. For each GO listing, spawn verification agent (max 2 at a time):

```text
Use Task tool:
- subagent_type: "general-purpose"
- prompt: "Run /job-verify [URL]. Return the full verification result."
- run_in_background: true
```

Wait for all agents. Parse results:

- **VERIFIED** → Move to VERIFIED section (ready to apply)
- **REJECTED** → Move to NO-GO with reason
- **NEEDS-MANUAL** → Keep in GO with ⚠️ note (ask recruiter)

**Skip with `--skip-verify`:** GO listings stay pending verification.

---

### Phase 7: Output Summary

```markdown
## 🔍 Job Discovery Complete

**Date:** [today]
**Sources Searched:** [count]
**New Listings Found:** [count]

### Pipeline Results
- 🎯 **VERIFIED:** [count] ready to apply
- ⚠️ **NEEDS-MANUAL:** [count] ask recruiter
- ❌ **NO-GO:** [count] filtered (triage) + [count] rejected (verify)
- 🤔 **MAYBE:** [count] triage unclear

### VERIFIED (Ready to Apply)
1. [Company] — [Role] — [URL] — [Key verification notes]

### NEEDS-MANUAL (Verification Unclear)
1. [Company] — [Role] — [Question to ask recruiter]

### MAYBE (Manual Review)
1. [Company] — [Role] — [Question]

### Next Steps
- Run `/company-research [company]` on VERIFIED matches
- Contact recruiters for NEEDS-MANUAL listings with specific questions
- Check MAYBE listings from triage manually
```

---

### Phase 8: Save Insights

Analyze patterns and update `findings/job-search/insights.md`.

Extract from this run:

1. **Compensation patterns:** Salary ranges by company stage and region; stated vs actual
2. **Geographic patterns:** Regions hiring remote EU/Poland; common restrictions
3. **Market observations:** Hot companies, emerging trends, failed sources

Add to discovery log:

```markdown
## 📅 Discovery Log

| Date | Source | Key Insight |
|------|--------|-------------|
| [today] | [source] | [insight] |
```

Example entries:

```markdown
| 2026-01-28 | RemoteOK | Go/K8s roles averaging €90-120k EU, €160k+ only at Series C+ |
| 2026-01-28 | JSearch | LinkedIn showing more "Remote EU" but 60% actually US-only on verification |
```

---

## Error Handling

- **`$JSEARCH_API_KEY` not set** → Skip JSearch, continue with other sources
- **429 rate limited** → Note in output, use other sources
- **401/403 auth error** → Check API key validity
- **API down** → Continue with web-based sources
- **WebFetch fails** → Note URL as MAYBE with "fetch failed, check manually"
- **No new listings** → Report count 0, suggest trying tomorrow or adding new sources

---

## Configuration

**Max parallel triage agents:** 3
**Max parallel verify agents:** 2
**Triage timeout:** 3 minutes per listing
**Verify timeout:** 5 minutes per listing

### Flags

- `--skip-verify` — Skip verification, triage only (faster, manual verify later)
- `--quick` — Only search top 4 sources (HN, RemoteOK, WWR, YC)
- `--playwright` — Force Playwright sources even if auto-detection fails; also triggers `mise run playwright:setup` if needed
- `--no-playwright` — Skip Playwright sources (faster run, no browser needed)
- Default: All 27 sources + automatic GO verification (Playwright sources included if installed)

### Sources (27 total)

**API-Based:**

1. JSearch API (LinkedIn, Indeed, Glassdoor) — requires `$JSEARCH_API_KEY`

**Global Remote:**
2. HN Who's Hiring
3. RemoteOK
4. We Work Remotely
5. Arc.dev
6. Wellfound (AngelList)
7. YC Work at a Startup

**EU-Focused:**
8. Landing.jobs
9. SwissDevJobs
10. Berlin Startup Jobs
11. EuroTechJobs
12. Zurich On-Site/Hybrid (≥300k CHF)

**New Static Boards:**
13. Golang Cafe — Go-specific aggregator
14. Working Nomads — Remote EU/devops/infra
15. Remotive — Community-curated remote board
16. Kube Careers — Remote Kubernetes/infra roles

**ATS Direct APIs (watched companies):**

- Greenhouse API (`boards-api.greenhouse.io/v1/boards/{token}/jobs`)
- Lever API (`api.lever.co/v0/postings/{company}?mode=json`)
- Ashby GraphQL (`jobs.ashbyhq.com/api/non-user-graphql`)

**Custom:**
17. Watched Company Careers
18. General Web Search
19. High-Comp Visa-Sponsored Roles (≥$400k USD)

**EU-Specific API Scrapers (no auth, direct API):**
20. justjoin.it — Poland's largest IT board, PLN salaries, remote EU roles
21. nofluffjobs.com — EU-focused (PL/DE/NL), EUR salaries on remote roles

**Playwright (headless browser, requires install):**
22. Welcome to the Jungle — EU-focused, premium quality
23. Levels.fyi — Staff/principal targeting + comp data
24. Himalayas — Remote-first, blocks direct HTTP
25. theprotocol.it — Polish tech board, Cloudflare-protected, distinct from justjoin
26. talent.io — EU-only server (needs EU proxy); high-quality remote EU roles
27. (add more here as needed)

---

## Files Modified

- `findings/job-search/tracking.md` — Updated with new entries, stats
- `findings/job-search/insights.md` — Key learnings from this run

## Files Read

- `findings/job-search/tracking.md` — For deduplication
- `findings/job-search/companies.md` — Watched companies
- `findings/job-search/profile.md` — Search keywords
- `findings/job-search/insights.md` — Existing insights (avoid duplicates)
- `references/search-sources.md` — All search queries and source details
