# Job Discover Skill

## Description

Search multiple job sources, find new listings, spawn parallel triage agents, update tracking state.

## Trigger

User invokes `/job-discover` or asks to search for new jobs.

## Tools Required

- WebSearch
- WebFetch
- Read
- Edit
- Grep
- Bash (for JSearch API calls)
- Task (for parallel triage agents)
- Skill (for invoking job-triage)

---

## Prerequisites

### JSearch API Key

**Load from local file (git-ignored):**

```bash
source .env.local 2>/dev/null || true
```text

**Check if loaded:**

```bash
if [ -n "$JSEARCH_API_KEY" ]; then
  echo "✅ JSearch API key loaded"
else
  echo "⚠️ JSearch API key not found, skipping JSearch source"
fi
```text

**Key location:** `.env.local` (git-ignored)

If not set, skip JSearch source and use other sources.

---

## Compensation Tolerance Rule

**10% Tolerance for MAYBE:**
- Target: €160k total compensation
- Tolerance: ±10% (€144k-€176k range)
- **€144k-€160k** → MAYBE (within 10% below target)
- **<€144k** → NO-GO (more than 10% below target)
- **€160k+** → GO (meets or exceeds target)

Example:
- €151k → MAYBE (5.6% below, within tolerance)
- €135k → NO-GO (15.6% below, outside tolerance)
- €172k → GO (exceeds target)

---

## Workflow

### Phase 1: Load State

1. **Read tracking state:**

   ```text
   Read findings/job-search/tracking.md
   ```

   Extract all URLs from GO, NO-GO, MAYBE tables to build "already processed" set.

2. **Read watched companies:**

   ```text
   Read findings/job-search/companies.md
   ```

   Extract Active companies list for career page searches.

3. **Read profile for search keywords:**

   ```text
   Read findings/job-search/profile.md
   ```

   Note key terms: Go, Kotlin, Java, distributed systems, platform, AI, remote, product.

---

### Phase 2: Search Sources

Run these searches and collect URLs:

---

#### 🔌 JSearch API (LinkedIn, Indeed, Glassdoor)

**Load API key and check:**

```bash
source .env.local 2>/dev/null || true
if [ -z "$JSEARCH_API_KEY" ]; then
  echo "⚠️ JSEARCH_API_KEY not set, skipping JSearch"
else
  echo "✅ JSearch API available"
fi
```text

**If API key available, run searches:**

##### Search 1: Go/Golang Remote Europe

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=golang%20engineer%20remote&page=1&num_pages=2&country=pl,de,uk,nl&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```text

##### Search 2: Distributed Systems Remote

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=distributed%20systems%20engineer%20remote&page=1&num_pages=2&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```text

##### Search 3: AI Infrastructure Remote

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=AI%20infrastructure%20engineer%20remote&page=1&num_pages=2&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```text

##### Search 4: Platform Engineer Remote Europe

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=platform%20engineer%20remote%20europe&page=1&num_pages=2&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```text

##### Search 5: Staff Engineer Remote

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=staff%20engineer%20remote&page=1&num_pages=2&remote_jobs_only=true&employment_types=FULLTIME" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_min_salary // "N/A")-\(.job_max_salary // "N/A") | \(.job_apply_link)"'
```text

##### Search 6: Kotlin Engineer Remote Europe

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=kotlin%20engineer%20remote&page=1&num_pages=2&country=pl,de,uk,nl&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```text

##### Search 7: Java Backend Engineer Remote (Product Companies)

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=java%20backend%20engineer%20remote%20product&page=1&num_pages=2&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```text

**JSearch API Parameters:**

- `query` — Search terms
- `page` — Page number (1-indexed)
- `num_pages` — Number of pages to fetch
- `country` — Country codes (pl, de, uk, nl, etc.)
- `remote_jobs_only` — Filter to remote only
- `employment_types` — FULLTIME, PARTTIME, CONTRACTOR
- `date_posted` — all, today, 3days, week, month

**Extract from response:**

- `job_title` — Role title
- `employer_name` — Company name
- `job_apply_link` — Application URL
- `job_city` / `job_country` — Location
- `job_min_salary` / `job_max_salary` — Compensation
- `job_description` — Full description
- `job_posted_at_datetime_utc` — Posted date

**JSearch jq filtering:**

- Use `-r` flag for raw (non-JSON) output
- Use `?` after `.data[]` for safe navigation (handles empty results)
- Use `// "default"` for missing fields (e.g., `job_country // "Unknown"`)
- Format as pipe-separated string for easy parsing
- Include `job_country` to identify geographic restrictions early

---

#### 🌍 Global Remote Boards

##### Source 1: Hacker News Who's Hiring

```text
WebSearch: "site:news.ycombinator.com Who is Hiring 2026"
```text

Find current month's thread. Then:

```text
WebFetch the thread, prompt: "Extract job listings mentioning: Go, Golang, Kotlin, Java, distributed systems, platform, infrastructure, AI, remote, EMEA, Europe. Return company name and any URL or email for each."
```text

##### Source 2: RemoteOK

```text
WebFetch: https://remoteok.com/remote-dev-jobs
Prompt: "Extract job listings for: Go, Golang, Kotlin, Java, Python, AI, ML, platform, infrastructure. Return job title, company, and listing URL for each."
```text

##### Source 3: We Work Remotely

```text
WebFetch: https://weworkremotely.com/categories/remote-back-end-programming-jobs
Prompt: "Extract job listings mentioning: Go, Golang, Kotlin, Java, Python, AI, infrastructure, platform, distributed. Return job title, company, and listing URL."
```text

```text
WebSearch: "site:weworkremotely.com golang OR go engineer 2026"
WebSearch: "site:weworkremotely.com kotlin OR java backend engineer 2026"
WebSearch: "site:weworkremotely.com AI infrastructure engineer 2026"
```text

##### Source 4: Arc.dev (Remote Tech Jobs)

```text
WebFetch: https://arc.dev/remote-jobs/golang
Prompt: "Extract all job listings. Return job title, company, location requirements, and listing URL."
```text

```text
WebFetch: https://arc.dev/remote-jobs/kotlin
Prompt: "Extract all job listings. Return job title, company, location requirements, and listing URL."
```text

```text
WebSearch: "site:arc.dev golang remote europe 2026"
WebSearch: "site:arc.dev kotlin remote europe 2026"
WebSearch: "site:arc.dev AI engineer remote 2026"
```text

##### Source 5: Wellfound (AngelList Talent)

```text
WebSearch: "site:wellfound.com golang engineer remote 2026"
WebSearch: "site:wellfound.com kotlin engineer remote 2026"
WebSearch: "site:wellfound.com java backend engineer remote product 2026"
WebSearch: "site:wellfound.com AI infrastructure engineer remote 2026"
WebSearch: "site:wellfound.com platform engineer remote europe 2026"
```text

##### Source 6: YC Work at a Startup

```text
WebFetch: https://www.workatastartup.com/jobs
Prompt: "Extract job listings for: Go, Golang, Kotlin, Java, infrastructure, platform, AI, remote. Return company name, role, and listing URL."
```text

```text
WebSearch: "site:workatastartup.com golang remote 2026"
WebSearch: "site:workatastartup.com kotlin remote 2026"
WebSearch: "site:workatastartup.com infrastructure engineer remote 2026"
```text

---

#### 🇪🇺 EU-Focused Boards

##### Source 7: Landing.jobs (EU Tech)

```text
WebFetch: https://landing.jobs/jobs?keywords=golang&remote=true
Prompt: "Extract job listings. Return company, role, location, and URL."
```text

```text
WebFetch: https://landing.jobs/jobs?keywords=kotlin&remote=true
Prompt: "Extract job listings. Return company, role, location, and URL."
```text

```text
WebSearch: "site:landing.jobs golang remote 2026"
WebSearch: "site:landing.jobs kotlin remote 2026"
WebSearch: "site:landing.jobs platform engineer remote 2026"
```text

##### Source 8: SwissDevJobs (Switzerland + Remote EU)

```text
WebSearch: "site:swissdevjobs.ch golang remote 2026"
WebSearch: "site:swissdevjobs.ch kotlin remote 2026"
WebSearch: "site:swissdevjobs.ch java backend remote 2026"
WebSearch: "site:swissdevjobs.ch infrastructure engineer remote 2026"
```text

##### Source 9: Berlin Startup Jobs

```text
WebSearch: "site:berlinstartupjobs.com golang remote 2026"
WebSearch: "site:berlinstartupjobs.com AI engineer remote 2026"
```text

##### Source 10: EuroTechJobs

```text
WebSearch: "site:eurotechjobs.com golang remote 2026"
WebSearch: "site:eurotechjobs.com platform engineer remote 2026"
```text

---

#### 🏢 Watched Company Careers

**CRITICAL:** Don't just search - extract and triage specific URLs.

For each company in Active list (from `companies.md`):

1. **Search for roles:**

   ```text
   WebSearch: "[Company Name] careers engineering 2026"
   WebSearch: "[Company Name] jobs golang OR infrastructure OR platform"
   ```

2. **Extract specific job URLs:**
   - Look for direct job listing URLs (not just career page)
   - Prioritize companies with green flags: remote-first, EU presence, Go stack
   - If career page returned, use WebFetch to extract specific role URLs

3. **Add to triage queue:**
   - Collect URLs from watched companies
   - Add to deduplication pool with job board URLs
   - **Don't skip** - these are high-priority targets

**Priority companies (triage first if found):**

- Companies with "remote-first" or "distributed" in description
- Companies with EU offices mentioned in companies.md
- Companies with Go/Kubernetes in stack

---

#### 🔍 General Web Search (Catch-all)

**AI-focused (preferred):**

```text
WebSearch: "remote staff engineer golang AI europe 2026"
WebSearch: "remote senior engineer distributed systems AI EMEA 2026"
WebSearch: "remote platform engineer AI startup europe 2026"
```text

**Broader (any domain, geo+comp focused):**

```text
WebSearch: "golang engineer remote poland OR europe hiring 2026"
WebSearch: "staff engineer remote europe €150k OR €160k OR €180k 2026"
WebSearch: "senior engineer remote EMEA $180k OR $200k 2026"
WebSearch: "distributed systems engineer remote europe 2026"
WebSearch: "platform engineer remote worldwide 2026"
WebSearch: "backend engineer remote europe high salary 2026"
```text

**Stack variations (catch non-Go but relevant):**

```text
WebSearch: "staff engineer remote europe kubernetes 2026"
WebSearch: "infrastructure engineer remote poland 2026"
WebSearch: "site reliability engineer remote europe 2026"
```text

**Kotlin/Java (interesting products only):**

```text
WebSearch: "kotlin engineer remote europe product 2026"
WebSearch: "senior kotlin developer remote EMEA 2026"
WebSearch: "java backend engineer remote europe startup 2026"
WebSearch: "staff engineer kotlin remote 2026"
```text

**NOTE:** For Kotlin/Java results, prioritize:
- Concrete products (not internal tooling/agencies)
- Interesting domain (AI, dev tools, fintech product, etc.)
- Strong engineering culture signals

---

### Phase 3: Deduplicate & Prioritize

1. **Collect all discovered URLs:**
   - Job board URLs
   - Watched company URLs (mark these as priority)

2. **Check against "already processed" set** from tracking.md

3. **Filter to only NEW URLs**

4. **Prioritize for triage:**
   - Priority 1: Watched companies with green flags (remote-first, EU presence, Go stack)
   - Priority 2: Job board listings from HN, YC, quality sources
   - Priority 3: General search results

5. If no new URLs found, report and exit

---

### Phase 4: Parallel Triage

**Triage order:**

1. Start with Priority 1 URLs (watched companies with green flags)
2. Then Priority 2-3 URLs
3. Run max 3 triage agents at a time

For each new URL, spawn triage agent:

```text
Use Task tool with:
- subagent_type: "general-purpose"
- prompt: "Run /job-triage [URL]. Return the full triage result."
- run_in_background: true (for parallel execution)
```text

**Important:** Don't skip watched companies. If you found promising roles at Grafana Labs, Supabase, PostHog, etc., triage them even if they're career pages not specific job URLs.

Collect results as they complete.

**Alternative (sequential):**
If parallel execution problematic, run `/job-triage` sequentially using Skill tool.

---

### Phase 5: Update Tracking (Post-Triage)

For each triage result:

1. Parse verdict (GO / NO-GO / MAYBE)
2. Extract: Company, Role, URL, Notes/Reason
3. Add row to appropriate table in tracking.md using Edit tool

**Row format:**

```markdown
| 2026-01-26 | Company | Role | URL | Notes/Reason |
```text

Update stats section:

- Increment Total Processed
- Increment GO/NO-GO/MAYBE counters

---

### Phase 6: Verify GO Listings (Automatic)

**Always runs** — For each GO listing, spawn verification agent:

```text
Use Task tool with:
- subagent_type: "general-purpose"
- prompt: "Run /job-verify [URL]. Return the full verification result."
- run_in_background: true (for parallel execution, max 2 at a time)
```text

Wait for all verification agents to complete. Parse results:

- **VERIFIED** → Move to VERIFIED section (ready to apply)
- **REJECTED** → Move to NO-GO with reason (verification failed)
- **NEEDS-MANUAL** → Keep in GO with ⚠️ note (ask recruiter)

**Skip with `--skip-verify`:**

- Triage only, no verification
- GO listings stay pending verification

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
2. ...

### NEEDS-MANUAL (Verification Unclear)
1. [Company] — [Role] — [Question to ask recruiter]
2. ...

### MAYBE (Manual Review)
1. [Company] — [Role] — [Question]

### Next Steps
- Run `/company-research [company]` on VERIFIED matches
- Contact recruiters for NEEDS-MANUAL listings with specific questions
- Check MAYBE listings from triage manually
```text

---

### Phase 8: Save Insights

After each run, analyze patterns and update `findings/job-search/insights.md`:

**Extract insights from this run:**

1. **Compensation patterns observed:**
   - Salary ranges by company stage
   - Salary ranges by region/country
   - Patterns: "€X stated" vs "market suggests €Y"

2. **Geographic patterns:**
   - Which regions actually hire remote EU/Poland?
   - Common restrictions observed
   - Entity patterns (US-only, EU entity, etc.)

3. **Market observations:**
   - Hot companies (multiple matching roles)
   - Emerging patterns (new sources, stack trends)
   - Failed approaches (sources with no results)

**Update insights.md:**

```markdown
## 📅 Discovery Log

| Date | Source | Key Insight |
|------|--------|-------------|
| [today] | [source] | [insight] |
```text

**Add to relevant sections:**

- New comp data → Compensation Patterns
- New geo restrictions → Geographic Patterns
- New company learnings → Company Type Patterns
- Trends → Market Observations

**Example insight entry:**

```markdown
| 2026-01-28 | RemoteOK | Go/K8s roles averaging €90-120k EU, €160k+ only at Series C+ |
| 2026-01-28 | JSearch | LinkedIn showing more "Remote EU" but 60% actually US-only on verification |
```text

---

## Error Handling

### JSearch API Fails

- If `$JSEARCH_API_KEY` not set → Skip JSearch, continue with other sources
- If 429 (rate limited) → Note in output, use other sources
- If 401/403 (auth error) → Check API key validity
- If API down → Continue with web-based sources

### WebFetch Fails

- Note URL as MAYBE with "fetch failed, check manually"
- Continue with other URLs

### Rate Limiting

- JSearch: Max 500 requests/month on free tier
- If rate limited, pause and retry
- Reduce parallel agents if needed

### No New Listings

```markdown
## 🔍 Job Discovery Complete

**Date:** [today]
**Sources Searched:** [count]
**New Listings Found:** 0

All discovered listings already in tracking.md.
Try again tomorrow or add new sources.
```text

---

## Search Optimization Tips

### 🌍 Global Remote Boards

**HN Who's Hiring**

- New thread posted 1st of each month
- Search for current month: "Who is Hiring January 2026"
- Look for REMOTE, EMEA, Europe mentions
- Keywords: golang, go, distributed, platform, AI

**RemoteOK**

- Filter by "dev" category
- Sort by recent
- Check "remote" tag verified
- Good for startup roles

**We Work Remotely**

- High-quality remote-first companies
- Filter: Back-End Programming
- Often lists timezone requirements upfront

**Arc.dev**

- Developer-focused, vetted companies
- Filter by language (golang)
- Shows salary ranges often

**Wellfound (AngelList)**

- Best for startups, Series A-C
- Filter: Remote, Engineering
- Shows funding stage

**YC Work at a Startup**

- YC-backed companies only
- High quality, good comp usually
- Filter: Remote, Engineering

### 🇪🇺 EU-Focused Boards

**Landing.jobs**

- EU tech focus, many remote roles
- Filter: Remote, Technology
- Good for EU-entity companies

**SwissDevJobs**

- Swiss companies + remote EU
- High comp (Swiss market rates)
- Often hire EU remote

**Berlin Startup Jobs**

- German startups, many remote
- Good for EU-entity + remote combo
- Filter: Remote, Engineering

**EuroTechJobs**

- Pan-European focus
- Filter by country/remote
- Mix of corporate and startup

### 🏢 Company Careers

- Check /careers, /jobs, jobs.company.com
- Filter by Engineering/Product
- Look for "Remote" in location
- Check for EU office presence

---

## Configuration

**Max parallel triage agents:** 3
**Max parallel verify agents:** 2
**Triage timeout:** 3 minutes per listing
**Verify timeout:** 5 minutes per listing

### Sources (13 total)

**API-Based:**

1. JSearch API (LinkedIn, Indeed, Glassdoor) — requires $JSEARCH_API_KEY

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

**Custom:**
12. Watched Company Careers
13. General Web Search

### JSearch API Config

**Environment variable:** `JSEARCH_API_KEY`
**Rate limit:** Free tier ~500 requests/month
**Searches per run:** 7 (golang, distributed, AI infra, platform, staff, kotlin, java)
**Pages per search:** 2

### Flags

- `--skip-verify` — Skip verification, triage only (faster, manual verify later)
- `--quick` — Only search top 4 sources (HN, RemoteOK, WWR, YC)
- Default: All sources + automatic verification on GO listings

---

## Files Modified

- `findings/job-search/tracking.md` — Updated with new entries, stats
- `findings/job-search/insights.md` — Key learnings from this run

## Files Read

- `findings/job-search/tracking.md` — For deduplication
- `findings/job-search/companies.md` — Watched companies
- `findings/job-search/profile.md` — Search keywords
- `findings/job-search/insights.md` — Existing insights (to avoid duplicates)
