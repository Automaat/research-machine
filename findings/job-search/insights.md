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
| 2026-04-17 | Market Saturation | Run 13 (9 days after run 12): only 1 MAYBE, 16 NO-GO from 27 sources. Market has very few new EU remote Go/Staff roles — pipeline essentially stable, new listings appearing very slowly |
| 2026-04-17 | FLYR Pattern | FLYR Labs (travel AI, Series D) has Poland Kraków office with multiple Go roles but all hybrid Tue/Wed/Thu in-office. Not remote-eligible despite Poland presence |
| 2026-04-17 | Mistral Growth | Mistral added 5 new engineering roles (DevEx, Enterprise Agents, Mistral Cloud SRE/Backend, Research Platform) since last run, all Paris onsite. Confirmed: Mistral never hires remote for engineering IC roles |
| 2026-04-17 | ATS Empty Signals | PostHog/Railway/Sentry/DuckDuckGo Ashby APIs returned empty — either listings expired or Ashby slug changed. NEEDS-MANUAL entries for these may need manual refresh |
| 2026-04-17 | Healthcare AI Barrier | Sword Health (healthcare AI, EU remote) disqualified by Senior level + compliance tooling concern. Healthcare AI startups unlikely to hit €160k+ for Senior without Staff title |
| 2026-05-04 | Run 14 Summary | 34 new processed → 33 NO-GO, 1 MAYBE (Loophole Labs). No GOs found. HN May 2026 thread + 26 other sources. Very low new-listing velocity confirms market stabilization for EU remote Go/Staff roles |
| 2026-05-04 | HN May 2026 | Thread ID 47975571. Loophole Labs notable (Go/eBPF/kernel, $150-195k, remote Americas+Europe) — but Senior title, unknown funding, small team. Railway/Spacelift already tracked. Emerging pattern: HN hiring thread produces 0-1 viable new EU remote Go roles per month |
| 2026-05-04 | Loophole Labs | YC-adjacent startup building Kubernetes live migration (Architect). Go/Zig/eBPF/kernel stack. Contact-only hiring (no ATS). $150-195k global rate. Watch: if seed/pre-Series A, equity value uncertain and company longevity risk |
| 2026-05-04 | ATS APIs Silent | Ashby API returned zero results for all 10 companies queried (Linear, Supabase, Modal, Weaviate, Stream, Nscale, PostHog, DuckDuckGo, River). API slug changes or rate limiting — ATS direct API becoming unreliable. Fall back to manual WebFetch of careers pages |
| 2026-05-04 | Market Velocity | Run 14 (17 days after run 13): 1 MAYBE from 27+ sources. EU remote Go/Staff market at ~1 new viable listing per 2-3 weeks. Consider bi-weekly cadence for /job-discover instead of weekly |
| 2026-05-14 | Netflix H-1B Signal | Netflix is actively and aggressively sponsoring H-1B: 310 LCAs filed FY2025 (309 approved, 99% rate), 272 USCIS petitions (267 approved). "Distributed Systems Engineer" is specifically confirmed in LCA records (19 filings). Netflix pays cash-dominant comp ($460-590k for L5, mostly base salary, minimal equity) — unusual vs FAANG. This makes Netflix one of the highest-comp H-1B sponsors for distributed systems. |
| 2026-05-14 | Run 15 Summary | 40 new processed → 33 NO-GO, 6 MAYBE, 1 GO (Netflix). First GO since run 1 (Neon/Anthropic). GO is US relocation 🌎 tier. EU remote pipeline continues slow: 6 new MAYBEs from 27+ sources. Sourced via ATS APIs (Ashby: Stream/Supabase/PostHog; Greenhouse: Chainguard/Grafana/GitLab) + justjoin/nofluffjobs batches. |
| 2026-05-14 | PostHog Americas Drift | PostHog SRE ClickHouse role (both existing MAYBE entry and new Ashby 1464036f) now showing Americas-only timezone (GMT-3 to GMT-8). PostHog appears to be timezone-segmenting their SRE team. Existing MAYBE posthog.com/careers/sre-clickhouse should be re-verified — may have changed to Americas-only since run 7. |
| 2026-05-14 | Grafana Auto-NO-GO Confirmed | 3 more Grafana EMEA roles (K8s Monitoring 5809261004, Adaptive Telemetry 5801256004, App Platform 5988513004) all Poland-excluded + €106-133k. Pattern is fully confirmed after 8+ identical rejections: all Grafana EMEA engineering roles are auto-NO-GO — Poland excluded AND comp below floor. No need to triage individual roles. |
| 2026-05-14 | GitLab Auto-NO-GO Confirmed | New GitLab roles continue same pattern: Poland excluded (or geo-comp ~€80-110k) for all Staff/Principal roles. Distinguished Engineer 8537853002 is Canada/US-only. Pattern: GitLab EMEA hiring exists but comp consistently fails (45% of US bands = €80-110k for Poland). Safe to auto-NO-GO GitLab EMEA listings below Senior Principal level. |
| 2026-05-14 | Supabase New Roles | Supabase added 2 new platform roles (Multicloud 847a7bd7, AWS Tech Lead bf3628f2) distinct from existing tracked K8s/Compute/Data roles. Supabase continues expanding platform engineering team globally. Same comp uncertainty as all other Supabase tracked roles. Monitor for comp disclosure. |
| 2026-05-14 | US Relocation Tier | First real GO in the 🌎 tier: Netflix Distributed Systems Engineer L5. TC $460-590k, H-1B confirmed via LCA records. Java-primary stack (not Go). This establishes the US relocation tier as viable — continue including Databricks/xAI/similar in searches. |
| 2026-04-17 | JSearch Improvement | JSearch API now returns results (vs prior runs). Aggregates US-heavy content (mostly staffing firms, US-remote, aggregator redirects). Signal quality low — best used for coverage not quality |
| 2026-01-28 | Hatchet | Seed YC company claiming "EU remote" but Poland excluded from explicit 10-country allowlist |
| 2026-02-20 | Run Summary | Searched 13 sources (HN Feb, RemoteOK, WWR, YC, Wellfound, Arc, EU boards, watched companies x15, general web). 17 new: 15 NO-GO, 2 MAYBE. 0 GO. PlanetScale only viable finding |
| 2026-02-20 | HN Feb 2026 | Thread ID 46857488 active. Most Go roles US-only or hybrid. FUTO/Immich found but $150k=€138k below floor + no EU entity |
| 2026-02-20 | Location-Based Pay | Camunda DE Senior SWE €99-113k → Poland ~€90-110k (~20% haircut). Published US $143-231k, UK £90-148k but no EU/PL band. Series B $126M/$100M ARR still sub-floor for EU |
| 2026-02-20 | Swiss SME Pattern | Exoscale (A1 Telekom Austria sub, 93ppl): Swiss SRE CHF 100-120k in-country → EU remote 50-65% = €55-80k. Zoho ATS = budget signal. Swiss SMEs consistently sub-floor |
| 2026-02-20 | Arc.dev Allowlist | 3rd allowlist case: Hatchet (PL excluded), Qonto (PL excluded), Stealth AI startup (DK/PT/US/NO/FR/IT/GB/NL/SE/AT/FI/CH/BE/DE — PL excluded). Pattern: Arc.dev geo-fenced roles = verify PL explicitly |
| 2026-02-20 | Speechify Red Flags | Seed $10M, equity cliff terminations, quiet firing pattern, CEO described as toxic (Glassdoor). US $140-200k → PL 50-70% = €65-130k. Seed + US adjusted comp = double disqualifier |
| 2026-02-20 | PlanetScale Signal | Series C $105M, "SF Bay Area or Remote" without US-only qualifier. Other roles explicitly say EMEA; this one doesn't — ambiguous positive. Go primary, profitable claim, March 2024 layoffs (sales/mktg only). Worth recruiter confirm for Poland |
| 2026-02-20 | Watched Co Results | 9/15 definitive NO-GO (no openings/US-only/hybrid): Anyscale, Replicate, Fireworks, Baseten, Dagger, CockroachDB, Spectro Cloud, Port, Airbyte. Only PlanetScale viable |
| 2026-03-19 | Run 10 | 5 parallel search agents (JSearch, global boards, EU boards, ATS APIs, Playwright). 14 new listings — 10 NO-GO, 4 MAYBE, 0 GO. Very low yield (~6 days since last run). |
| 2026-03-19 | Hostaway | Unicorn ($1B val, $365M raised) still pays ~$73k for Principal EMEA. Valuation ≠ comp for vacation rental SaaS. PHP stack confirmed non-match. |
| 2026-03-19 | Reflection AI | Posted 3 new roles Mar 12 (Distributed Systems, Platform Foundations, Data Platform) — all NYC/London on-site. $2B Series B but no EU remote engineering. Monitor for policy change. |
| 2026-03-19 | Market Saturation | After 10 runs (420 processed), most EU-remote Go/Staff roles now seen and evaluated. New listings appear ~10-15/week at this stage. Diminishing returns on daily/frequent runs. |
| 2026-03-19 | Neon Expansion | Neon (Databricks) posted second Go engineering role (Backend Engineer Go, 4506003004) after prior Billing role VERIFIED. Company expanding Go engineering team. Watch for more roles. |
| 2026-03-19 | Grafana Comp Ceiling | 5 Grafana Labs EMEA roles now evaluated (runs 1-10). Consistent pattern: Go EMEA roles €91-133k regardless of Staff/Senior level. US bands $168-252k but EMEA 50-55% haircut. Safe to auto-NO-GO future Grafana EMEA listings. |
| 2026-01-27 | Initial | EU remote market: €70-130k typical, €160k+ needs Series C+ |
| 2026-02-23 | Run Summary | Searched 12 sources (HN Feb, WWR, Wellfound, Arc, EU boards, watched companies, general web, builtin.com, lever.co). 10 new: 10 NO-GO, 0 MAYBE, 0 GO. JSearch API key invalid — skipped. HN Feb 2026 thread disappointing |
| 2026-02-23 | Connectivity Comp Gap | Connectly (Series B, Meta/Google alums, EU remote, Go/distributed) pays $82.5k-$125k (~€76-115k) — even VC-backed Series B with good pedigree falls short by 27-52% |
| 2026-02-23 | EU Series B Ceiling | Confirmed pattern: Series B companies consistently top out at €115-125k for EU remote even with strong Silicon Valley pedigree. Series C+ remains the floor for €160k target |
| 2026-02-23 | Polish Market Comp | Akamai Poland: PLN 307k (~€73k) Senior SWE. IDT Poland: PLN 188k median (~€45k) Lead Golang. Confirms Polish market rates 50-65% below Western EU for most companies |
| 2026-02-23 | JSearch API | JSearch API key invalid (expired/quota exceeded). Ran 0/9 planned searches. Need to rotate key or get new subscription |
| 2026-02-23 | Content Moderation | EverAI ("AI girlfriend/boyfriend") — always filter adult content platforms early regardless of comp. Not a career move |
| 2026-02-23 | Go Developer Market | Feb 2026: Go remote EU roles average €90-130k from job boards. Only Staff+ at Series C+ or US global-pay companies reach €160k. Market unchanged from Jan 2026 |
| 2026-02-24 | Atlassian Poland Comp | Atlassian (public) has fully remote Poland roles but PLN 327-418k (€78-99k) for Senior (P40-P50) — 38-51% below floor. P60 (Staff) reaches PLN 800k (€190k) but Senior postings are P40-P50 |
| 2026-02-24 | Office-Anchored False Positives | Wolt (Berlin/Helsinki/Tallinn), Workato (Barcelona/Madrid), SingleStore (Lisbon) and Okta (Toronto) appear in Go remote searches but all require local presence. "Remote" tag on job boards ≠ EU-wide remote |
| 2026-02-24 | Pragmatike Pattern | Ashby-hosted listings from "Pragmatike" act as thin recruiting wrapper for unnamed companies. Poland-eligible, Go stack, but hidden employer identity = staffing/agency risk (hard dealbreaker) |
| 2026-02-24 | Run Summary | 13 sources, 9 new: 8 NO-GO, 1 MAYBE (Pragmatike). 0 GO. Market thin for fresh high-comp EU remote Go roles — most good listings already in pipeline |
| 2026-02-24 | Supabase Comp | Supabase: "global remote, 40+ countries, hire globally" is genuine (EMEA employees confirmed, Romania/Croatia/Portugal/Germany visible). Q1-Q5 all pass. Q6 blocker: Levels.fyi $115k median too low; Glassdoor $201k median is US-weighted sample. No Poland/EU band published. 90th percentile comp claim unverified for EU. Ask recruiter for Poland total comp. |
| 2026-02-24 | Series E Comp Gap | Supabase Series E ($5B, $500M+ raised) still can't confirm €160k for Poland without explicit EU band. Series E valuation alone is insufficient signal — need EU-specific comp data |
| 2026-02-24 | Run 2 Summary | 20+ sources (JSearch x7, HN Feb, RemoteOK, WWR, Arc, YC, Golang Cafe, Remotive, Kube Careers, EU boards, watched companies, Playwright attempted). 18 new: 16 NO-GO, 2 MAYBE (Weaviate, Chainguard). 0 GO |
| 2026-02-24 | NA Timezone Pattern | Inngest ($34M a16z, $175-205k USD, Go-primary) — explicitly requires NA timezone overlap. UTC+1/+2 excluded. Pattern: US dev tools startups <50 ppl often NA-timezone-anchored even when listed as "remote" |
| 2026-02-24 | UK-Only Remote | LemFi (Series B $86M, fintech) and BeReal/Voodoo Paris-based — "remote" means UK-only or France-only respectively. UK banking/fintech particularly restricted due to regulatory licensing |
| 2026-02-24 | EU Eligible ≠ Poland | Qdrant (Germany residents only), Zscaler (NL work auth required) — "Europe Remote" in listing can mean single-country European work auth. Must confirm Poland explicitly |
| 2026-02-24 | Supply Chain Security Comp | Chainguard (Series B, supply chain security) US band $205-231k base for Staff Guarded Containers + 4.8/5 comp Glassdoor rating. EU/Poland comp unconfirmed. High-comp culture signal in niche security space |
| 2026-02-24 | Weaviate Growth Warning | Weaviate Series B $50M (Apr 2023), $12.3M ARR / 104 employees = ~$118k ARR/employee (below efficient benchmark). No Series C 3 years later = slower trajectory. Vector DB market competitive (Pinecone, Qdrant, pgvector). Verify comp before investing time |
| 2026-02-24 | JSearch Quality | JSearch API returned mostly US-only results, staffing agencies, freelance platforms. Only DoubleZero (US-only) and Inngest (NA-TZ) were noteworthy from 7 searches. JSearch EU filtering unreliable |
| 2026-02-24 | Run 3 Summary | 20+ sources (JSearch garbled, HN, RemoteOK, WWR, Arc, Wellfound, YC, EU boards, Golang.cafe, Kube Careers, Himalayas, ATS direct, watched companies). 17 new: 14 NO-GO, 3 MAYBE. 0 GO. JSearch API parse error (binary/compressed response). Playwright empty output (shell piping issue in background). |
| 2026-02-24 | JSearch API Failure Mode | New failure: JSearch returned 200 OK but binary/compressed body with control chars, causing `jq` parse error. Different from previous "zero results" failure. API increasingly unreliable — consider dropping from workflow |
| 2026-02-24 | Watched Companies Scan | Major AI watched companies all NO-GO: Fireworks AI (22 roles, all US-only), Sourcegraph (no IC engineering openings), CockroachDB (office-first NYC/SF), Anyscale (SF/Palo Alto on-site), 9fin (London hybrid), You.com (US-only), Spectro Cloud (San Jose/Bengaluru). Dagger: no current openings. Pattern: AI infra companies <Series C tend to be office-first |
| 2026-02-24 | DoiT Contractor Pattern | DoiT (cloud MSP/FinOps) uses contractor-only for Poland instead of employment. PerfectScale principal roles explicitly contractor (7629305003, 7544839003). Pattern for cloud MSPs/consultancies: EU presence via contractor, not employment entity |
| 2026-02-24 | Himalayas Comp Signal | Teya (payments) €67-104k and ChargePoint (EV) comp stale/expired via Himalayas. Himalayas.app aggregates listings without live comp validation — stale data common, especially non-tech-first companies |
| 2026-02-24 | Blockchain/Web3 Comp | Swarm Foundation (distributed Go, EU remote) — Web3 orgs often pay token/crypto mix with low fiat base. Risk of sub-€144k cash comp despite "competitive" claims. Blockchain specialty reduces transferable signal |
| 2026-03-03 | Run 4 Summary | 7 sources active (HN March 2026, Wellfound, Arc.dev, Kube.careers, Remotive, Greenhouse ATS scans, Golang.cafe). 12 new: 7 NO-GO, 5 MAYBE. 0 GO. JSearch returned valid results but all US-only again. Playwright sources all broken (WTTJ Cloudflare-blocked, Levels.fyi broken JS render, Himalayas wrong DOM selectors). |
| 2026-03-03 | Playwright Breakage | All 3 Playwright scrapers broken in run 4: WTTJ returns ERR_CONNECTION_REFUSED (Cloudflare bot protection), Levels.fyi renders loading state without real job cards, Himalayas ignores keyword query param (shows same 20 unrelated jobs). Fixes: WTTJ needs stealth plugin, Levels.fyi needs updated selectors, Himalayas needs POST to their search API. |
| 2026-03-03 | GitLab Geo-Comp | GitLab Principal Engineer Infrastructure Platforms — Poland explicitly listed, Go/Ruby/K8s stack, genuinely good tech fit. BUT GitLab geo compensation calculator applies ~40-45% factor for Poland: $171k US × 0.45 = ~$77k (~€71k). Well below €144k floor. GitLab is definitively NO-GO for Poland remote at Senior/Principal level unless comp model changes. |
| 2026-03-03 | Grafana Labs Ceiling | Grafana Labs has 3 active Staff EMEA Go roles (Loki Ingest, Loki Query, App Platform) but all top out at €106-133k Germany band. Even with RSUs, illiquid private company stock insufficient. Grafana is definitively sub-floor for EU remote. Remove from active candidates — watch for IPO/comp reset. |
| 2026-03-03 | Anthropic London | Anthropic Staff+ SWE Observability London at £325-390k GBP is excellent comp but requires 25% in-office (hard dealbreaker). Confirmed pattern: Anthropic requires in-office presence globally. Monitor only if willing to relocate to London. |
| 2026-03-03 | HN March 2026 Signal | HN March 2026 thread had better EU-remote Go density than Feb: Spacelift, Bubblehouse, Checkly, Tangled. Spacelift/Checkly already processed; Bubblehouse ($200-250k global remote) is the strongest new lead. HN continues to be best source for smaller/newer EU-remote Go companies. |
| 2026-03-03 | Market State | Market remains thin for EU remote Go Staff+ at €160k+. 4 runs, 213 processed, only 2 VERIFIED ready-to-apply. Opportunity is in directly contacting MAYBE leads (Bubblehouse, Airbyte, Ping Identity) rather than board searches. |
| 2026-03-04 | Run 5 Summary | 12 new: 9 NO-GO, 3 MAYBE (River Elixir $200-250k, Voodoo Gaming Backend comp unclear, Zed AI comp unclear). 0 GO/VERIFIED. JSearch returned empty again. Playwright all broken. justjoin/nofluffjobs returned empty. HN March 2026 thread produced River as best lead. |
| 2026-03-04 | Non-Go Stack at High Comp | River (Bitcoin fintech, Elixir primary, $200-250k globally non-adjusted, EU remote confirmed) shows high-comp EU roles exist outside Go ecosystem. At Staff level, stack can be secondary to comp+geo if candidate is willing to learn. Elixir/BEAM is a real paradigm shift though. |
| 2026-03-04 | Surveillance Company Pattern | Teramind (employee monitoring) confirmed NO-GO on culture grounds in addition to comp (€54-86k Poland). Pattern: companies that sell surveillance tooling often dogfood it internally — Glassdoor confirms micro-management. Flag any monitoring/tracking/DLP company early. |
| 2026-03-04 | On-Site Disguised as Remote | Both Impossible Cloud (Hamburg, "monthly collaboration weeks") and Scality (Paris, "on-site") demonstrate on-site roles appearing in remote search results. Pattern: EU engineering companies in Hamburg/Paris especially likely to require in-person presence. Filter aggressively upfront. |
| 2026-03-04 | Upbound Tech Fit But Geo Block | Upbound (Crossplane, Go/K8s/control planes, Principal level) is near-perfect tech fit but NA-remote-only. Worth monitoring for EU expansion — Series B $69M, strong OSS traction with Crossplane in CNCF. |
| 2026-03-05 | Run 6 Summary | 23 new processed: 17 NO-GO, 5 MAYBE (Nscale Principal x2, PostHog high-scale, GitLab Staff Secrets, Fivetran EMEA), 1 GO->rejected (Zyte expired). JSearch valid but all US-only. Playwright all sources working. |
| 2026-03-05 | Stripe Pattern Confirmed | All Stripe EMEA Staff roles require 50%+ office in Dublin/London/Romania. Skip Stripe entirely unless willing to relocate. EMEA in Stripe listings = office-anchored, not Poland-remote. |
| 2026-03-05 | Anthropic London Confirmed | All Anthropic London/Dublin Staff roles require 25%+ office (explicitly in JD). Comp exceptional (325-390k GBP) but fully remote from Poland incompatible. Monitor only for SF relocation (>k threshold). |
| 2026-03-05 | Nscale Rising Signal | Nscale (AI infra/GPU clouds, Series A $155M) now has 3 active Principal roles in Go+K8s, UK remote-first, EU eligible. Strongest new lead this run — contact recruiter for comp confirmation. |
| 2026-03-05 | Remotive Expired Listings | Zyte Staff Distributed Systems found on Remotive/Workable/LinkedIn but listing was 410 Gone, closed 10 months ago. Pattern: Remotive surfaces expired listings. Always verify directly on company careers page. |
| 2026-03-05 | Together AI Amsterdam Hybrid | Together AI EU engineering roles have Amsterdam hybrid requirement (2d/week). US roles are remote. Pattern: US AI companies with EU offices make EU roles office-anchored while US roles remain remote. |
| 2026-03-05 | JSearch US Bias | Run 6 JSearch: 8 searches, all US-focused despite EU query terms. Country filter triggers 401. JSearch effectively US-only for this use case — low ROI, consider removing. |
| 2026-03-05 | Playwright All Working | Run 6: WTTJ/Levels.fyi/Himalayas/theprotocol.it all returned results (previously broken runs 4-5). theprotocol.it golang 2pp = 53 results but Senior/agency, PLN salaries below target. WTTJ primarily French companies. |
| 2026-03-05 | Zurich 300k CHF Gap | No qualifying Zurich listings found in 6 searches. SwissDevJobs max CHF 110k. FAANG Zurich tier (Google/Jane Street) doesnt post on boards — requires direct application + referral. |
| 2026-03-09 | Run 7 Summary | 61 new processed: 23 NO-GO, 19 MAYBE (EU), 3 MAYBE 🌎 (US), 0 GO/VERIFIED. JSearch fully functional this run. Playwright all working. Best leads: Linear EU x3, Stream Golang €110-160k, Modal Stockholm, Cohere UK/EU, GitLab Staff DevEx, Supabase K8s/Compute. 🌎 track: Databricks Staff, xAI, Together AI. |
| 2026-03-09 | Mistral Applied AI Pattern | Mistral "Applied AI Engineer, DevOps/SRE" is Solutions/Forward Deployed Engineering — pre-sales + customer onboarding, on-site required (Paris/London/Lausanne). NOT a Staff IC role. Mistral backend engineering roles are Paris/London on-site only. No EU remote for Mistral engineering this run. |
| 2026-03-09 | Stream EU Remote Nuance | Stream Staff Golang (€110-160k): remote from anywhere in EU, BUT hybrid 3x/week required ONLY if based in Netherlands. Poland-remote is fully remote. Comp borderline — upper end €160k is achievable but not guaranteed. |
| 2026-03-09 | DFINITY Zurich Comp Mismatch | DFINITY (Internet Computer blockchain) Zurich Distributed Systems: CHF 135-145k base, ~CHF 195-200k total comp (levels.fyi median CHF 224k). Max reported CHF 344k but not typical. Well below CHF 270k MAYBE threshold for Zurich relocation. |
| 2026-03-09 | ATS API Value | Direct ATS scanning (Greenhouse/Lever/Ashby) found 40+ new listings at watched companies that boards missed: 14 new Mistral Lever roles, 4 Linear Ashby EU roles, 9 Modal Ashby roles, 9 Together AI Greenhouse roles, 13 new GitLab Greenhouse roles, 7 new Supabase Ashby roles. ATS direct scans remain the highest-quality discovery channel. |
| 2026-03-09 | Linear EU Signal | Linear has 3 active "Senior/Staff" EU-eligible roles via Ashby: Fullstack (Europe), Product Eng (Europe), Product Eng AI. Linear Score 85 in companies list. Known remote-first, high-comp. TypeScript stack (not Go) — but comp+geo likely meet threshold. Recruiter confirm needed. |
| 2026-03-09 | US 🌎 Track Activating | xAI (Palo Alto, FAANG+ comp), Databricks (SF, Staff median ~$400k TC known), Together AI (SF, Series B $305M Staff level) all have open Staff+ Distributed Systems roles. Visa sponsorship likely but unconfirmed for each. This track needs systematic verification. |
| 2026-03-09 | nofluffjobs EU Value | nofluffjobs returned Cast AI (EUR 7-9k/mo = €84-108k/yr) — confirmed below target even at max. Pattern: nofluffjobs Polish/EU boards typically top at €100-120k for Go roles. Only useful for filtering known companies, not discovering new high-comp opportunities. |
| 2026-03-11 | Run 8 Summary | 53 new processed: 43 NO-GO, 9 MAYBE, 0 GO/VERIFIED. No new VERIFIED this run. JSearch functional but US-biased again. Playwright working. Best new leads: Netlify Staff DevTooling (Go, comp TBD), Ashby Staff Platform EMEA (€185-226k confirmed, TypeScript), Supabase x2 new platform roles, Chainlink CCIP #2, GitLab Principal InfraSec. |
| 2026-03-11 | Ashby L5 EMEA Band | Ashby publicly published L5 (Staff) EMEA compensation: €185-226k base, same across all EU tiers including Poland. TypeScript/Node.js/Postgres stack. Listing appears to have been filled/closed during this run — monitor for reopen. Best-comp signal seen from any EU company with transparent bands. |
| 2026-03-11 | Mistral EMEA Repeating Pattern | All 3 new Mistral EMEA roles confirmed the same pattern: hybrid required (Paris/Munich/London), Poland absent from eligible countries. Mistral "Applied AI" = Solutions Engineering (customer-facing, travel). Mistral has no IC Staff-level remote Poland engineering roles. Remove from active discovery rotation. |
| 2026-03-11 | GitLab New AI Roles | GitLab posted 2 new Staff/Intermediate AI-focused roles (Verify AI, Duo Chat) but both restricted to UK/Ireland/NL/US/Canada — Poland excluded. GitLab's EMEA-eligible postings remain only SSCS/security/infra. Go roles are EMEA-eligible but always geo-comp fails. |
| 2026-03-11 | JSearch Quality Run 8 | JSearch run 8 returned meaningful results but all US-focused: Docker (US-only), Hightouch (NA-only), Red Hat vLLM (US-only). Only 1 actionable EU lead from 6 searches (Confluent, also US-only on closer check). ROI: ~16%. Consider capping at 4 searches per run. |
| 2026-03-11 | Roblox Near-Miss | Roblox ML Platform $277-397k TC + H1B is $3k below $400k floor. Pattern: games/entertainment companies at US-comp levels but below pure tech targets. Could negotiate above floor — would need H1B confirmation first. |
| 2026-03-13 | Run 9 Summary | 44 new processed: 35 NO-GO, 8 MAYBE, 0 GO/VERIFIED. JSearch API key blank this run (env var issue). Best leads: Fivetran Data Lakes EMEA (Senior Staff, Java, comp TBD), FYUL Principal EMEA (PHP stack), PostHog SRE ClickHouse (same comp pattern). Railway expanded from 1 to 5 infra specializations. |
| 2026-03-13 | HN March 2026 Quality | HN March 2026 returned stronger EU-remote Go signal than Feb: Stream, Deep Systems, Howie, GitBook, Marketer.com (Manta), TantumPay, Upvest, Zattoo. Most failed on comp/hybrid, but Stream and GitBook viable MAYBE. HN thread quality varies monthly — March better than Feb for EU remote. |
| 2026-03-13 | FYUL Merger Signal | FYUL = Printful+Printify+Snow Commerce merger (2024-2025). Stack PHP/Node.js (not Go). Principal level, EMEA remote, Poland eligible. Comp undisclosed. Merged entity may not have settled on comp bands yet. |
| 2026-03-13 | Fivetran Germany Label Ambiguity | Fivetran "Remote, Germany, EMEA" label on listings — likely means true EMEA-wide eligible (Poland valid) since Java-heavy distributed systems. But "Germany" EOR tag could mean Germany-only entity. Same comp unknown as previously-tracked Distributed Systems role. Both Fivetran EMEA roles need same recruiter confirm. |
| 2026-03-13 | Anthropic US Role Saturation | Run 9 surfaced 8 new Anthropic US Staff+ roles across SF/NYC/Seattle. All auto-rejected (25% in-office + US-only). Pattern: Anthropic is continuously posting similar roles. Stop logging individual Anthropic US roles — just note "Anthropic US Staff+ posted" per run without individual tracking rows. Only log Anthropic EU/UK hybrid or Zurich relocation roles. |
| 2026-03-13 | Consultancy Pattern In Himalayas | Himalayas golang search returns 40-50% consultancies/staffing in its results (Concentrix, Nagarro, ALTEN, Sigma Software, Bee Talents, CodiLime). Pattern: Himalayas golang search = low signal-to-noise. Better to search Himalayas by company name (watched companies) not by keyword. |
| 2026-03-13 | nofluffjobs/justjoin Ceiling Confirmed | nofluffjobs + justjoin.it combined 50+ Go/platform listings, max EUR 9k/mo B2B (€108k/yr). Polish market consistently tops at ~€100k for Go Senior. No Go/distributed listing on these boards comes close to €144k floor. Reduce scraping to 1 round per month — low ROI confirmed. |
| 2026-03-13 | Railway Specialization Value | Railway Senior Infra has 5 active specializations (Platform, Orchestration, Observability, Compute, Storage). One recruiter contact covers all — note specializations in first message. Reduces overhead compared to treating as 5 separate applications. |
| 2026-03-13 | Zurich 300k CHF Still No Listings | Third run with Zurich search, still no qualifying listings on public boards. Google Zurich CHF 303k median TC, Meta Zurich CHF 394k — both above threshold. Pattern: top Zurich comp only via FAANG direct application + referral, not job boards. |
| 2026-03-27 | Run 11 Summary | 12 new processed: 11 NO-GO, 1 MAYBE (Linear 069c4628 new EU Product Eng listing), 0 GO. Very low yield (8 days since run 10). ATS APIs active: 20+ companies scanned. JSearch functional but US-biased. Playwright all working. |
| 2026-03-27 | Mistral Pattern Confirmed | Run 11 found 3 more Mistral roles — all NO-GO (hybrid 3d/mo Paris/London, non-Staff level, Python/ML stack). Mistral has 0 qualifying IC engineering roles for Poland remote in 4 runs. Remove from active ATS scanning. |
| 2026-03-27 | Nebius No Staff Titles | Nebius AI (EU-based cloud infra) only uses "Senior" titles in engineering — no Staff/Principal ladder visible across 3 evaluated roles. Auto-NO-GO future Nebius postings unless title explicitly contains Staff/Principal. |
| 2026-03-27 | Anthropic EU Still Off-Table | Applied AI Engineer London (5116274008) confirmed hybrid (25% office) + pre-sales scope. Same pattern as all prior Anthropic EU roles. Anthropic EU = always hybrid. Only log Anthropic if role is explicitly fully-remote (rare/nonexistent). |
| 2026-03-27 | Linear New EU Listing Pattern | Linear posting multiple parallel EU listings per role type (Fullstack, Product Eng, AI). Each gets a new Ashby ID. Likely expanding EU engineering team significantly. Best approach: one recruiter contact covers all active EU listings. |
| 2026-03-27 | Market Maturity Run 11 | After 11 runs (432 processed), market is highly explored. Yield dropped to 1 MAYBE per run from avg 4+ in runs 7-9. Most high-value EU remote Staff+ Go roles are now in MAYBE/NEEDS-MANUAL pipeline. Focus shifting from discovery to conversion — contact MAYBE leads directly. |
| 2026-04-08 | Run 12 Summary | 9 new processed: 9 NO-GO, 0 MAYBE, 0 GO. Zero yield. JSearch functional with valid results (US-biased). Playwright all working. HN April 2026 thread found but no qualifying EU remote Staff+ Go roles. Red Hat MAYBE entry updated with better data: Poland eligible confirmed (legal entity exists), est €110-145k. |
| 2026-04-08 | Portugal Geographic Block | Feedzai (Go/Java/K8s, PortugueseAI unicorn) and Constructor (Go platform) both hire Poland-exclusively-excluded even within EU. Pattern: Portuguese-HQ companies tend to hire within Portugal + selected EU cities. Not a blanket EU-remote employer. |
| 2026-04-08 | Grafana Labs Auto-NO-GO | Run 12 confirmed: new Grafana Staff K8s Monitoring role available in Spain/Germany/UK/Sweden ONLY — Poland excluded. This is now the 6th Grafana evaluation with Poland excluded or comp below floor. Safe to auto-NO-GO all future Grafana EMEA listings without fetching. |
| 2026-04-08 | HN April 2026 Patterns | HN April 2026 (thread 47601859) signals: Ashby Staff $190-275k (TypeScript stack, EU eligible but Design Eng scope), Redpanda Poland engineers (same existing roles), Higharc Staff SWE (remote but no EU details). HN April quality similar to March — EU Go leads thin, most qualify as HN-tier quality startups but with stack/geo issues. |
| 2026-04-08 | JSearch Viable for Discovering URLs | Run 12: JSearch returned real DoiT PerfectScale, Giant Swarm, TensorWave URLs — most already tracked or Senior-only. JSearch now returns real results (not zero or binary parse failures as in earlier runs). Keep at 4-6 searches per run; US-only results still dominate but occasional EU leads surface. |
| 2026-04-08 | Market Zero-Yield | Second consecutive run (11→12) with 0 MAYBE, 0 GO. EU remote Staff+ Go market at €160k+ appears fully explored. Transition recommended: stop running weekly discovery; shift to monthly discovery + active outreach to existing MAYBE/NEEDS-MANUAL pipeline. |

---

## 🔗 Related

- [[profile]] — Target criteria
- [[tracking]] — Application state
- [[companies]] — Watched companies
