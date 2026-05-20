# Search Sources Reference

## Contents

1. [JSearch API Searches](#jsearch-api-searches)
2. [Global Remote Boards](#global-remote-boards)
3. [EU-Focused Boards](#eu-focused-boards)
4. [Watched Company Careers](#watched-company-careers)
5. [General Web Search](#general-web-search)
6. [Search Optimization Tips](#search-optimization-tips)

---

## JSearch API Searches

Load API key and check before running:

```bash
source .env.local 2>/dev/null || true
if [ -z "$JSEARCH_API_KEY" ]; then
  echo "⚠️ JSEARCH_API_KEY not set, skipping JSearch"
else
  echo "✅ JSearch API available"
fi
```

### Search 1: Go/Golang Remote Europe

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=golang%20engineer%20remote&page=1&num_pages=2&country=pl,de,uk,nl&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```

### Search 2: Distributed Systems Remote

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=distributed%20systems%20engineer%20remote&page=1&num_pages=2&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```

### Search 3: AI Infrastructure Remote

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=AI%20infrastructure%20engineer%20remote&page=1&num_pages=2&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```

### Search 4: Platform Engineer Remote Europe

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=platform%20engineer%20remote%20europe&page=1&num_pages=2&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```

### Search 5: Staff Go/Kubernetes Remote

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=staff%20engineer%20golang%20kubernetes%20remote&page=1&num_pages=2&remote_jobs_only=true&employment_types=FULLTIME" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_min_salary // "N/A")-\(.job_max_salary // "N/A") | \(.job_apply_link)"'
```

### Search 6: Staff Platform/Infra Remote Europe

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=staff%20platform%20engineer%20kubernetes%20remote%20europe&page=1&num_pages=2&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```

### Search 7: Principal Engineer Distributed Systems Remote

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=principal%20engineer%20distributed%20systems%20remote&page=1&num_pages=2&remote_jobs_only=true" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_apply_link)"'
```

### Search 8: High-Comp Visa-Sponsored US Roles (≥$400k total comp)

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=staff%20engineer%20golang%20visa%20sponsorship&page=1&num_pages=2&country=us&employment_types=FULLTIME" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_min_salary // "N/A")-\(.job_max_salary // "N/A") | \(.job_apply_link)"'
```

```bash
curl -s "https://jsearch.p.rapidapi.com/search?query=principal%20engineer%20distributed%20systems%20visa%20sponsorship&page=1&num_pages=2&country=us&employment_types=FULLTIME" \
  -H "X-RapidAPI-Key: $JSEARCH_API_KEY" \
  -H "X-RapidAPI-Host: jsearch.p.rapidapi.com" | jq -r '.data[]? | "\(.employer_name) | \(.job_title) | \(.job_country // "Unknown") | \(.job_min_salary // "N/A")-\(.job_max_salary // "N/A") | \(.job_apply_link)"'
```

Filter: only include if salary range suggests ≥$400k total comp (base ≥$250k for top-tier US) or company is known high-comp (FAANG, Stripe, Databricks, Snowflake, etc.).

### JSearch Response Fields

- `job_title` — Role title
- `employer_name` — Company name
- `job_apply_link` — Application URL
- `job_city` / `job_country` — Location
- `job_min_salary` / `job_max_salary` — Compensation
- `job_description` — Full description
- `job_posted_at_datetime_utc` — Posted date

**jq tips:**

- Use `-r` for raw output
- Use `?` after `.data[]` for safe navigation (handles empty results)
- Use `// "default"` for missing fields (e.g., `job_country // "Unknown"`)

**Rate limit:** Free tier ~500 requests/month. 9 searches × 2 pages = 18 requests per run.

---

## Global Remote Boards

### Source 1: Hacker News Who's Hiring

```text
WebSearch: "site:news.ycombinator.com Who is Hiring 2026"
```

Find current month's thread. Then:

```text
WebFetch the thread — prompt: "Extract job listings mentioning: Go, Golang, Kotlin, Java, distributed systems, platform, infrastructure, AI, remote, EMEA, Europe. Return company name and any URL or email for each."
```

### Source 2: RemoteOK

```text
WebFetch: https://remoteok.com/remote-dev-jobs
Prompt: "Extract job listings for: Go, Golang, Kubernetes, platform, infrastructure, Staff Engineer, Principal Engineer. Skip Junior, Mid-level, Senior titles unless scope is clearly staff-level. Return job title, company, and listing URL for each."
```

### Source 3: We Work Remotely

```text
WebFetch: https://weworkremotely.com/categories/remote-back-end-programming-jobs
Prompt: "Extract job listings mentioning: Go, Golang, Kubernetes, platform, infrastructure, Staff Engineer, Principal Engineer. Skip Junior/Senior unless Staff scope evident. Return job title, company, and listing URL."
```

```text
WebSearch: "site:weworkremotely.com staff engineer golang OR kubernetes 2026"
WebSearch: "site:weworkremotely.com principal engineer golang 2026"
```

### Source 4: Arc.dev (Remote Tech Jobs)

```text
WebFetch: https://arc.dev/remote-jobs/golang
Prompt: "Extract job listings for Staff or Principal level. Return job title, company, location requirements, and listing URL. Skip Senior and below."
```

```text
WebSearch: "site:arc.dev staff engineer golang kubernetes remote europe 2026"
WebSearch: "site:arc.dev principal engineer golang remote 2026"
```

### Source 5: Wellfound (AngelList Talent)

```text
WebSearch: "site:wellfound.com staff engineer golang remote 2026"
WebSearch: "site:wellfound.com staff engineer kubernetes remote 2026"
WebSearch: "site:wellfound.com principal engineer golang remote 2026"
WebSearch: "site:wellfound.com staff platform engineer remote europe 2026"
```

### Source 6: YC Work at a Startup

```text
WebFetch: https://www.workatastartup.com/jobs
Prompt: "Extract job listings for: Go, Golang, Kubernetes, platform, infrastructure at Staff or Principal level. Return company name, role, and listing URL."
```

```text
WebSearch: "site:workatastartup.com staff engineer golang remote 2026"
WebSearch: "site:workatastartup.com staff engineer kubernetes remote 2026"
```

---

## EU-Focused Boards

### Source 7: Landing.jobs (EU Tech)

```text
WebFetch: https://landing.jobs/jobs?keywords=golang&remote=true
Prompt: "Extract job listings. Return company, role, location, and URL."
```

```text
WebFetch: https://landing.jobs/jobs?keywords=kotlin&remote=true
Prompt: "Extract job listings. Return company, role, location, and URL."
```

```text
WebSearch: "site:landing.jobs golang remote 2026"
WebSearch: "site:landing.jobs kotlin remote 2026"
WebSearch: "site:landing.jobs platform engineer remote 2026"
```

### Source 8: SwissDevJobs (Switzerland + Remote EU)

```text
WebSearch: "site:swissdevjobs.ch golang remote 2026"
WebSearch: "site:swissdevjobs.ch kotlin remote 2026"
WebSearch: "site:swissdevjobs.ch java backend remote 2026"
WebSearch: "site:swissdevjobs.ch infrastructure engineer remote 2026"
```

### Source 9: Berlin Startup Jobs

```text
WebSearch: "site:berlinstartupjobs.com golang remote 2026"
WebSearch: "site:berlinstartupjobs.com AI engineer remote 2026"
```

### Source 10: EuroTechJobs

```text
WebSearch: "site:eurotechjobs.com golang remote 2026"
WebSearch: "site:eurotechjobs.com platform engineer remote 2026"
```

### Source 11: Zurich On-Site / Hybrid (≥300k CHF)

```text
WebSearch: "golang engineer zurich 2026"
WebSearch: "staff engineer zurich 300k CHF 2026"
WebSearch: "site:swissdevjobs.ch golang zurich 2026"
WebSearch: "site:swissdevjobs.ch staff engineer zurich 2026"
WebSearch: "site:swissdevjobs.ch distributed systems zurich 2026"
WebSearch: "zurich tech company golang OR kotlin engineer hiring 2026"
```

```text
WebFetch: https://swissdevjobs.ch/jobs?location=zurich
Prompt: "Extract job listings for Go, Golang, Kotlin, Java, platform, infrastructure, distributed systems in Zurich. Return company, role, salary if shown, and URL."
```

**Decision rule:** Only GO if ≥300k CHF total comp. Include hybrid/on-site Zurich roles.

---

## Watched Company Careers

**CRITICAL:** Extract specific job URLs, don't just find the career page.

For each company in Active list (from `findings/job-search/companies.md`):

1. Search for roles:

   ```text
   WebSearch: "[Company Name] careers engineering 2026"
   WebSearch: "[Company Name] jobs golang OR infrastructure OR platform"
   ```

2. Extract specific job URLs:
   - Look for direct job listing URLs (not just career page)
   - Prioritize companies with green flags: remote-first, EU presence, Go stack
   - If career page returned, use WebFetch to extract specific role URLs

3. Add to triage queue with company context.

**Priority companies (triage first if found):**

- Remote-first or distributed in description
- EU offices mentioned in companies.md
- Go/Kubernetes in stack

---

## General Web Search

### Primary Focus: Staff Go/Kubernetes/Distributed Systems (run first)

```text
WebSearch: "staff engineer golang kubernetes distributed systems remote europe 2026"
WebSearch: "staff engineer go distributed systems remote EMEA 2026"
WebSearch: "staff golang engineer distributed systems remote europe 2026"
WebSearch: "principal engineer golang kubernetes remote 2026"
WebSearch: "staff engineer distributed systems golang remote europe 2026"
WebSearch: "staff platform engineer kubernetes distributed systems remote europe 2026"
```

### AI-Focused (Staff only)

```text
WebSearch: "staff engineer golang AI distributed systems remote europe 2026"
WebSearch: "principal engineer distributed systems AI remote EMEA 2026"
WebSearch: "staff engineer distributed systems AI infrastructure remote europe 2026"
```

### Broader Staff (geo + comp focused)

```text
WebSearch: "staff engineer remote europe €160k OR €180k OR €200k 2026"
WebSearch: "staff engineer distributed systems remote europe 2026"
WebSearch: "principal engineer kubernetes distributed systems remote 2026"
WebSearch: "staff infrastructure engineer remote EMEA 2026"
```

### General Recruitment (any stack, staff level)

```text
WebSearch: "staff engineer remote europe general hiring 2026"
WebSearch: "staff software engineer remote europe €160k 2026"
```

**NOTE:** General recruitment exceptions — any stack acceptable if: (1) role is Staff+ level, (2) comp ≥€160k confirmed, (3) recruitment process is stack-agnostic.

### Kotlin/Java (ONLY general/stack-agnostic postings)

```text
WebSearch: "staff engineer kotlin kubernetes remote europe 2026"
```

**NOTE:** Skip Kotlin/Java-specific roles unless explicitly staff-level AND recruitment is general (not JVM-specific hiring).

### High-Comp Visa-Sponsored (relocation anywhere)

```text
WebSearch: "staff engineer golang visa sponsorship $400k 2026"
WebSearch: "principal engineer distributed systems visa sponsorship high compensation 2026"
WebSearch: "site:levels.fyi staff engineer golang $400k visa sponsorship"
WebSearch: "golang engineer FAANG OR stripe OR databricks OR snowflake visa sponsorship 2026"
WebSearch: "staff software engineer visa sponsorship $350k $400k $450k 2026"
WebSearch: "principal engineer AI infrastructure visa sponsorship relocation 2026"
```

**Decision rule:** Must have explicit visa sponsorship stated + total comp ≥$400k (or clearly FAANG-tier). Flag with 🌎 in triage queue.

### Zurich On-Site High-Comp

```text
WebSearch: "software engineer zurich 300000 CHF 2026"
WebSearch: "staff engineer zurich 300k CHF 2026"
WebSearch: "golang engineer zurich senior 2026"
WebSearch: "site:linkedin.com staff engineer zurich 300k 2026"
```

**Decision rule:** Must be Zurich on-site or hybrid + total comp ≥300k CHF. Flag with 🇨🇭.

---

---

## ATS Direct APIs (Watched Companies)

For each company in `findings/job-search/companies.md`, detect which ATS they use and query directly.

### Detect ATS for a company

```bash
# Greenhouse
curl -sf "https://boards-api.greenhouse.io/v1/boards/{token}/jobs" > /dev/null && echo "greenhouse"
# Lever
curl -sf "https://api.lever.co/v0/postings/{company}?mode=json" > /dev/null && echo "lever"
# Ashby
curl -sf "https://jobs.ashbyhq.com/{company}" > /dev/null && echo "ashby"
```

### Greenhouse API

```bash
# Replace {board_token} with company's Greenhouse token (from their careers URL)
curl -s "https://boards-api.greenhouse.io/v1/boards/{board_token}/jobs?content=true" \
  | jq -r '.jobs[] | select(.location.name | test("remote|emea|europe"; "i")) | "\(.company.name) | \(.title) | \(.location.name) | \(.absolute_url)"'
```

Known tokens for watched companies: check career page URL pattern `boards.greenhouse.io/{token}`.

### Lever API

```bash
# Replace {company} with Lever company slug (from jobs.lever.co/{company})
curl -s "https://api.lever.co/v0/postings/{company}?mode=json" \
  | jq -r '.[] | select(.categories.location | test("remote|emea|europe"; "i")) | "\(.company) | \(.text) | \(.categories.location) | \(.hostedUrl)"'
```

### Ashby GraphQL API

```bash
# Replace {slug} with company's Ashby slug (from jobs.ashbyhq.com/{slug})
curl -s -X POST "https://jobs.ashbyhq.com/api/non-user-graphql?op=ApiJobBoardWithTeams" \
  -H "Content-Type: application/json" \
  -d "{\"operationName\":\"ApiJobBoardWithTeams\",\"variables\":{\"organizationHostedJobsPageName\":\"{slug}\"},\"query\":\"{ jobBoard: jobBoardByOrganizationHostedJobsPageName(organizationHostedJobsPageName: \\\"{slug}\\\") { jobPostings { id title teamName locationName isRemote externalLink } } }\"}" \
  | jq -r '.data.jobBoard.jobPostings[] | select(.isRemote == true or (.locationName | test("remote|emea|europe"; "i"))) | "\(.title) | \(.teamName) | \(.locationName) | \(.externalLink)"'
```

Companies known to use Ashby: Linear, Notion, Retool, Loom, Clerk, Descript, and many Series A-B startups.

---

## New Static / WebFetch Sources

### Source 12: Golang Cafe

Go-specific job aggregator. Covers HN, Stack Overflow, remote boards.

```text
WebFetch: https://golang.cafe/
Prompt: "Extract job listings. Return company, role, salary if shown, location/remote status, and listing URL."
```

```text
WebFetch: https://golang.cafe/Go-Remote-Jobs
Prompt: "Extract all remote Go job listings. Return company, role, salary, and URL for each."
```

```text
WebSearch: "site:golang.cafe remote europe golang 2026"
WebSearch: "site:golang.cafe staff engineer golang 2026"
```

### Source 13: Working Nomads

Curated 100% remote jobs. Good for EU remote + fintech/devops/infra.

```text
WebFetch: https://www.workingnomads.com/remote-golang-jobs
Prompt: "Extract job listings. Return company, role, salary, and URL."
```

```text
WebFetch: https://www.workingnomads.com/remote-kubernetes-jobs
Prompt: "Extract job listings. Return company, role, salary, and URL."
```

```text
WebFetch: https://www.workingnomads.com/remote-devops-jobs
Prompt: "Extract job listings mentioning Go, Golang, Kotlin, Java, platform, infrastructure. Return company, role, salary, and URL."
```

### Source 14: Remotive

Community-curated remote board. 16k+ listings, moderated quality.

```text
WebFetch: https://remotive.com/remote-jobs/software-dev/golang
Prompt: "Extract all job listings. Return company, role, salary if shown, and URL."
```

```text
WebFetch: https://remotive.com/remote-jobs/devops-sysadmin
Prompt: "Extract listings mentioning Go, Golang, Kotlin, Java, Kubernetes, platform, infrastructure. Return company, role, salary, URL."
```

```text
WebSearch: "site:remotive.com golang remote europe 2026"
WebSearch: "site:remotive.com platform engineer remote 2026"
```

### Source 15: Kube Careers

Curated remote Kubernetes/infrastructure roles. Strong overlap with Go + platform stack.

```text
WebFetch: https://kube.careers/remote-kubernetes-jobs
Prompt: "Extract all job listings. Return company, role, salary range if shown, and URL."
```

---

## EU-Specific API Scrapers

Direct API scrapers for Polish/EU job boards. No auth needed. Scripts in `.claude/skills/job-discover/scripts/`.

### Source 19: justjoin.it

Poland's largest IT board. Remote EU roles visible. Salaries in PLN on listing cards.

```bash
node .claude/skills/job-discover/scripts/scrape-justjoin.mjs go 3
node .claude/skills/job-discover/scripts/scrape-justjoin.mjs kotlin 2
node .claude/skills/job-discover/scripts/scrape-justjoin.mjs platform 2
```

Output: JSON array `[{company, role, url, salary, remote, location}]`

Parse: `| jq -r '.[] | "\(.company) | \(.role) | \(.salary // "N/A") | \(.url)"'`

**Note:** Salaries in PLN. 28k–39k PLN B2B/month ≈ €80k–€110k/yr. Skip unless remote=true.

### Source 20: nofluffjobs.com

EU-focused board (Poland/Germany/Netherlands + remote). Salaries shown in EUR for remote roles.

```bash
node .claude/skills/job-discover/scripts/scrape-nofluffjobs.mjs Golang 5
node .claude/skills/job-discover/scripts/scrape-nofluffjobs.mjs Kotlin 3
node .claude/skills/job-discover/scripts/scrape-nofluffjobs.mjs "Platform Engineer" 3
```

Output: JSON array with EUR salary data included.

Parse: `| jq -r '.[] | "\(.company) | \(.role) | \(.salary // "N/A") | \(.url)"'`

---

## Playwright Sources (JS-Rendered Sites)

These sites require a headless browser. Scripts are in `.claude/skills/job-discover/scripts/`.

### Setup (run once)

```bash
mise run playwright:setup
```

### Source 16: Welcome to the Jungle

EU-focused premium job board. Strong engineering culture companies, competitive salaries.

```bash
# Search golang remote roles (up to 3 pages)
node .claude/skills/job-discover/scripts/scrape-welcometothejungle.mjs golang 3
node .claude/skills/job-discover/scripts/scrape-welcometothejungle.mjs kotlin 2
node .claude/skills/job-discover/scripts/scrape-welcometothejungle.mjs "platform engineer" 2
```

Output: JSON array `[{company, role, url, salary, remote, location}]`

Parse: `| jq -r '.[] | "\(.company) | \(.role) | \(.salary // "N/A") | \(.url)"'`

### Source 17: Levels.fyi Jobs

Best for staff/principal targeting. Shows compensation by level. Remote filter built-in.

```bash
# Search by level — outputs senior/staff remote roles with comp data
node .claude/skills/job-discover/scripts/scrape-levels.mjs "Staff Engineer" 2
node .claude/skills/job-discover/scripts/scrape-levels.mjs "Principal Engineer" 1
```

Output: JSON array with salary fields populated when available.

### Source 18: Himalayas

Remote-first job board. Returns 403 on direct HTTP fetch; Playwright bypasses this.

```bash
node .claude/skills/job-discover/scripts/scrape-himalayas.mjs golang
node .claude/skills/job-discover/scripts/scrape-himalayas.mjs "platform engineer"
node .claude/skills/job-discover/scripts/scrape-himalayas.mjs kotlin
```

Output: JSON array `[{company, role, url, salary, remote, location}]`

### Source 21: theprotocol.it

Polish tech board protected by Cloudflare (Playwright required). Distinct listings from justjoin. Salary data visible in role text.

```bash
node .claude/skills/job-discover/scripts/scrape-theprotocol.mjs golang 2
node .claude/skills/job-discover/scripts/scrape-theprotocol.mjs kotlin 2
node .claude/skills/job-discover/scripts/scrape-theprotocol.mjs platform 2
```

**Note:** `role` field contains noisy text (company + salary + skills concatenated). Use the URL for triage; salary is sometimes embedded in role string (e.g. "28k–39kzł (B2B)").

### Source 22: talent.io

EU-focused remote board. EU-only server (AWS eu-central-1, Frankfurt) — times out from non-EU IPs.

```bash
# Requires EU IP or proxy
HTTPS_PROXY=http://eu-proxy:port node .claude/skills/job-discover/scripts/scrape-talentio.mjs golang 3
HTTPS_PROXY=http://eu-proxy:port node .claude/skills/job-discover/scripts/scrape-talentio.mjs "platform engineer" 2
```

**Requirement:** EU-based machine or `HTTPS_PROXY` env var pointing to EU proxy. Skip if unavailable.

### Parsing Playwright Output

For each script, parse output and add to triage queue:

```bash
node .claude/skills/job-discover/scripts/scrape-welcometothejungle.mjs golang 2 2>/dev/null \
  | jq -r '.[] | "\(.company) | \(.role) | \(.salary // "N/A") | \(.url)"'
```

Filter for minimum quality before triaging:

- Skip if role contains "Junior", "Intern", "Graduate"
- Skip if company is a staffing/consulting firm
- Flag 🌎 if salary visible and appears to be USD ≥$300k

---

## Search Optimization Tips

### HN Who's Hiring

- New thread posted 1st of each month
- Search for current month: "Who is Hiring February 2026"
- Look for REMOTE, EMEA, Europe mentions
- Keywords: golang, go, distributed, platform, AI

### RemoteOK

- Filter by "dev" category
- Sort by recent
- Verify "remote" tag is actually remote
- Good for startup roles

### We Work Remotely

- High-quality remote-first companies
- Filter: Back-End Programming
- Often lists timezone requirements upfront

### Arc.dev

- Developer-focused, vetted companies
- Filter by language (golang)
- Shows salary ranges often

### Wellfound (AngelList)

- Best for startups, Series A-C
- Filter: Remote, Engineering
- Shows funding stage

### YC Work at a Startup

- YC-backed companies only
- High quality, good comp usually
- Filter: Remote, Engineering

### Landing.jobs

- EU tech focus, many remote roles
- Filter: Remote, Technology
- Good for EU-entity companies

### SwissDevJobs

- Swiss companies + remote EU
- High comp (Swiss market rates)
- Often hire EU remote

### Berlin Startup Jobs

- German startups, many remote
- Good for EU-entity + remote combo
- Filter: Remote, Engineering

### EuroTechJobs

- Pan-European focus
- Filter by country/remote
- Mix of corporate and startup

### Company Careers

- Check /careers, /jobs, jobs.company.com
- Filter by Engineering/Product
- Look for "Remote" in location
- Check for EU office presence
