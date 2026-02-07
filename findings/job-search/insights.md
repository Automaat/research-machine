# 💡 Job Search Insights

> Key learnings from job discovery, triage, and verification runs
> **Auto-updated by:** `/job-discover`, `/job-triage`, `/job-verify`

---

## 💰 Compensation Patterns

### By Region (Remote EU)

| Region | Typical Range | Notes |
|--------|---------------|-------|
| Poland | €76-85k | Below target, local market rates. Redpanda explicitly lists Poland (rare at Series D+) |
| Germany | €90-130k | Higher for funded startups |
| Spain | €90-120k + equity | Competitive for EU |
| UK | €100-150k | Higher than continent |
| Ireland | €80-116k | Red Hat Principal €80-116k below target |
| Remote EU (funded) | €70-130k | Series B+ can reach €150k |
| Remote Global (US rates) | €150-250k | Rare, usually US companies. Redpanda $186-260k for senior roles |

### By Company Stage

| Stage | Typical Range | Can Hit €160k+? | Recent Examples |
|-------|---------------|-----------------|-----------------|
| Pre-seed/Seed | €50-90k | ❌ Rarely | Thera $4M: $10-60k, Jobgether €2.5M: likely €100-140k |
| Series A | €80-120k | ⚠️ Unlikely | Replika 2017: $117-187k historical |
| Series B | €100-150k | ⚠️ Maybe (top) | Stream $58M: €90-160k range, unclear if staff hits top |
| Series C+ | €130-200k | ✅ Yes | WunderGraph €100-130k (below target) |
| Series D+ | €150-250k | ✅ Yes | Redpanda $265M: $186-260k senior, $221-275k manager |
| Public/Scale-up | €140-220k | ✅ Yes | Red Hat (IBM) Ireland: €80-116k Principal (below target) |

### Key Insight
>
> **€160k+ target requires:** Series C+ funding OR US company paying global rates OR Staff+ level at well-funded startup

---

## 🌍 Geographic Patterns

### Remote Policy Reality

| Stated Policy | Actual Meaning |
|---------------|----------------|
| "Remote" | Often US-only, verify! |
| "Remote (US)" | US states only |
| "Remote - Global" | May exclude specific countries |
| "Remote - Europe" | Usually UK/DE/ES, verify Poland |
| "Remote - EMEA" | Good, but confirm Poland |
| "Remote-first" | Best signal, usually global |

### EU Entity Patterns

- **UK entity only:** Brexit complications for EU
- **German GmbH:** Good for EU hiring
- **Dutch BV:** Common for distributed companies
- **No EU entity:** Contractor only, may have tax issues

---

## 🏢 Company Type Patterns

### Agencies/Consultancies to Avoid

- Accenture, Deloitte, McKinsey Digital
- Toptal, Turing, Andela (talent marketplaces)
- Proxify, Lemon.io (staffing firms)
- Any "we place you at clients"

### Stack Patterns

| Stack | Comp Trend | Notes |
|-------|------------|-------|
| Go + K8s | Higher | Demand > supply |
| Python + ML | Varies | AI companies pay more |
| Java/.NET | Market rate | Enterprise standard |
| Rust | Premium | Niche, fewer roles |
| Node/TypeScript | Lower | Larger supply |

---

## 📈 Market Observations

### 2026 Trends

- *Add observations from discovery runs*

### What Works

- *Add successful patterns*

### What Doesn't Work

- *Add failed approaches*

---

## 🎯 Actionable Insights

### High-Value Targets

- Series C+ AI companies with EU presence
- US companies with remote global policy
- Dev tools companies (usually pay well)

### Avoid

- "Competitive salary" without numbers (usually below market)
- Bootstrapped companies (can't hit €160k)
- Early seed (<$5M raised)

---

## 📅 Discovery Log

*Insights added per run*

| Date | Source | Key Insight |
|------|--------|-------------|
| 2026-01-29 | Discovery Run 2 | Searched 13 sources (JSearch, HN, WWR, Arc, Wellfound, YC, watched companies, general). 7 new URLs triaged: 3 NO-GO (comp), 5 MAYBE (comp unclear). 0 GO/VERIFIED |
| 2026-01-29 | JSearch API | Still failing - 5 searches returned zero results (golang, distributed, AI infra, platform, staff). API unreliable, skip in future runs |
| 2026-01-29 | Seed Comp | Thera (Seed $4M YC) $10-60k, Jobgether (Seed €2.5M) likely €100-140k. Seed consistently 50-80% below €160k target |
| 2026-01-29 | Series B Comp | Stream (Series B $58M) €90-160k range for Staff Golang - unclear if staff truly hits €160k or mid-level €90-120k. Needs verification |
| 2026-01-29 | Series D Comp | Redpanda (Series D $265M, $1B unicorn) paying $186-260k for Senior C++ Core Replication, $221-275k for Sr Manager - Series D+ can hit target |
| 2026-01-29 | Ireland Comp | Red Hat (IBM) Ireland Principal €80-116k, likely below €160k even at Senior Principal. Ireland market lower than UK/DE/SE |
| 2026-01-29 | Poland Hiring | Redpanda explicitly lists Poland for 2+ roles (K8s, Core Replication, Manager) - rare signal at Series D stage, strong positive |
| 2026-01-29 | YC Pattern | "US-based remote" in YC jobs (Thera, MixRank) signals US hiring only, not EU. Explicit "Europe" needed for EU eligibility |
| 2026-01-29 | Position Status | Replika Senior AI Engineer marked "closed" (Sept 2025) - listings 4+ months old may be stale. Check application status early |
| 2026-01-29 | Stack Trend | C++ gaining demand in streaming/consensus roles (Redpanda Core Replication). Go still preferred but C++17/20 competitive for distributed systems |
| 2026-01-29 | JSearch API | JSearch API failed again - 5 searches (golang, distributed, platform, staff) all returned zero results. Consider removing from workflow |
| 2026-01-29 | Anthropic | Series F ($33.7B raised, $350B val) paying $300-485k for Sr/Staff Inference but US-only (SF/NYC/Seattle) + 25% in-office. EU expansion to Dublin/London/Zurich requires relocation |
| 2026-01-29 | W&B/CoreWeave | W&B acquired by CoreWeave May 2025 ($1.7B), shifted to hybrid model. "US Remote" excludes Europe |
| 2026-01-29 | Kyber | Bootstrapped/pre-seed open-source (AGPL dual-license), hybrid Paris required. Unlikely €160k+ |
| 2026-01-29 | US AI Pattern | Top US AI companies (Anthropic, OpenAI, W&B) remain US-only for infra roles (research proximity + security) |
| 2026-01-28 | JSearch API | JSearch API (LinkedIn/Indeed/Glassdoor aggregator) returned zero results for EU golang remote - API reliability questionable |
| 2026-01-28 | HN Who's Hiring | Jan 2026 thread active, but most Go roles either on-site (Bilbao) or US-only (federal contractors) |
| 2026-01-28 | Grafana Labs | Staff BE €91-110k EMEA (Spain band) - even Series D+ below €160k for continent roles |
| 2026-01-28 | HashiCorp | IBM acquired Feb 2025 ($6.4B) - remote EU policy unclear post-acquisition, monitoring |
| 2026-01-28 | Timescale | Series C ($177M) with 30% layoffs, US comp $92-106k (~€85-95k) below target |
| 2026-01-28 | Hatchet | Seed YC company claiming "EU remote" but Poland excluded from explicit 10-country allowlist |
| 2026-01-27 | Initial | EU remote market: €70-130k typical, €160k+ needs Series C+ |

---

## 🔗 Related

- [[profile]] — Target criteria
- [[tracking]] — Application state
- [[companies]] — Watched companies
