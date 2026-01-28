# Company Discover Skill

## Description

Research and identify companies worth monitoring for future job opportunities. Proactively find targets before they post roles.

## Trigger

User invokes `/company-discover` or asks to find companies to watch/monitor.

## Tools Required

- WebSearch
- WebFetch
- Read
- Edit

---

## Input

**Optional arguments:**
- `--domain [ai|devtools|infra|fintech|...]` — Focus on specific domain
- `--source [yc|crunchbase|hn|techcrunch|...]` — Search specific source
- `--count [N]` — Number of companies to research (default: 5)

**Examples:**
```
/company-discover
/company-discover --domain ai --count 10
/company-discover --source yc
```

---

## Workflow

### Phase 1: Load Current State

1. **Read watched companies:**
   ```
   Read findings/job-search/companies.md
   ```
   Build list of already-watched companies to avoid duplicates.

2. **Read profile criteria:**
   ```
   Read findings/job-search/profile.md
   ```
   Note: remote EU, €160k+, product company, preferred domains.

---

### Phase 2: Discover Companies

Search for promising companies across sources:

#### Source 1: YC Companies (High Quality)

```
WebSearch: "site:ycombinator.com/companies AI infrastructure 2024 2025"
WebSearch: "site:ycombinator.com/companies developer tools remote"
WebSearch: "site:ycombinator.com/companies Series B Series C 2025"
```

```
WebFetch: https://www.ycombinator.com/companies?batch=W24&batch=S24&industry=B2B&industry=Developer%20Tools
Prompt: "Extract company names, descriptions, and batch for AI/infra/dev tools companies"
```

#### Source 2: Recently Funded (Crunchbase/TechCrunch)

```
WebSearch: "AI startup Series B Series C funding 2025 2026"
WebSearch: "developer tools startup raised funding 2025 remote"
WebSearch: "infrastructure startup Series B Europe remote"
WebSearch: "site:techcrunch.com Series B AI startup 2025"
```

#### Source 3: HN "Who's Hiring" Notable Companies

```
WebSearch: "site:news.ycombinator.com who is hiring remote europe golang"
```
Extract companies that appear frequently with good stack match.

#### Source 4: Tech Blogs / Lists

```
WebSearch: "best remote-first companies 2025 2026 engineering"
WebSearch: "top AI startups to work for 2025 2026"
WebSearch: "best developer tools companies 2025"
WebSearch: "YC top companies 2025"
```

#### Source 5: Domain-Specific (if --domain specified)

**AI/ML:**
```
WebSearch: "AI infrastructure company Series B C D 2025"
WebSearch: "LLM startup funding 2025 engineering"
WebSearch: "ML platform company remote"
```

**Dev Tools:**
```
WebSearch: "developer tools startup funding 2025"
WebSearch: "devex platform company Series B"
WebSearch: "CLI tools startup 2025"
```

**Infrastructure:**
```
WebSearch: "cloud infrastructure startup Series B 2025"
WebSearch: "kubernetes platform company funding"
WebSearch: "database startup Series C 2025"
```

---

### Phase 3: Research Each Company

For each discovered company, gather:

#### 3.1 Basic Info

```
WebSearch: "[Company] funding crunchbase"
WebSearch: "[Company] about company product"
```

**Extract:**
- Company name
- One-line description
- Core product/service
- Founded year
- HQ location

#### 3.2 Funding & Stage

```
WebSearch: "[Company] Series funding raised investors"
```

**Extract:**
- Stage: Seed / A / B / C / D / Public
- Total raised
- Last round (date + amount)
- Key investors
- Valuation (if known)

#### 3.3 Remote & EU Policy

```
WebSearch: "[Company] remote work policy"
WebSearch: "[Company] Europe office EU"
WebSearch: "[Company] careers remote"
WebSearch: "site:linkedin.com [Company] engineer Poland OR Germany OR Europe"
```

**Determine:**
- Remote policy: Remote-first / Remote OK / Hybrid / On-site
- EU presence: EU office / EU entity / EU contractors / US-only
- EU engineers visible on LinkedIn?

#### 3.4 Tech Stack

```
WebSearch: "[Company] tech stack engineering blog"
WebSearch: "[Company] golang OR go OR kubernetes"
```

**Extract:**
- Primary languages
- Infrastructure (K8s, cloud provider)
- Relevant tech matches (Go, distributed systems)

#### 3.5 Compensation Potential

```
WebSearch: "site:levels.fyi [Company] engineer"
WebSearch: "[Company] salary glassdoor engineer"
```

**Assess:**
- Can likely pay €160k+? (Based on stage + market data)
- Comp philosophy visible?

#### 3.6 Blind Sentiment (Quick Check)

```
WebSearch: "site:teamblind.com [Company]"
```

**Note:**
- General sentiment
- Any red flags (layoffs, toxicity, RTO)

---

### Phase 4: Score & Rank

Score each company (0-100):

| Criteria | Weight | Scoring |
|----------|--------|---------|
| **Remote EU** | 25 | Remote-first EU: 25, Remote OK EU: 15, US-only: 0 |
| **Funding Stage** | 20 | Series B-D: 20, Series A: 15, Seed: 5, Pre-seed: 0 |
| **Comp Potential** | 20 | Likely €160k+: 20, Maybe: 10, Unlikely: 0 |
| **Domain Fit** | 15 | AI/DevTools: 15, Adjacent: 10, Other: 5 |
| **Tech Stack** | 10 | Go/Distributed: 10, Python/Infra: 7, Other: 3 |
| **Culture Signals** | 10 | Strong positive: 10, Neutral: 5, Red flags: 0 |

**Thresholds:**
- 70+ → Add to **Active** monitoring
- 50-69 → Add to **Watch** (lower priority)
- <50 → Skip (don't add)

---

### Phase 5: Update Companies List

For qualifying companies, add to `findings/job-search/companies.md`:

**Active section (70+ score):**
```markdown
- **[Company]** — [One-line description]
  - Stage: Series X ($XXM raised)
  - Remote: [policy], EU: [presence]
  - Stack: [relevant tech]
  - Score: XX/100
```

**Watch section (50-69 score):**
```markdown
- **[Company]** — [One-line description]
  - Stage: Series X
  - Note: [why watching, what to verify]
```

---

### Phase 6: Output Summary

```markdown
## 🔍 Company Discovery Complete

**Date:** [today]
**Sources Searched:** [list]
**Companies Researched:** [count]

### Added to Active Monitoring (Score 70+)

| Company | Domain | Stage | Remote EU | Comp | Score |
|---------|--------|-------|-----------|------|-------|
| [Name] | AI Infra | Series C | ✅ Yes | ✅ €160k+ | 85 |
| [Name] | DevTools | Series B | ✅ Yes | ⚠️ Maybe | 72 |

### Added to Watch List (Score 50-69)

| Company | Domain | Stage | Note |
|---------|--------|-------|------|
| [Name] | Infra | Series A | Verify EU policy |

### Not Added (Score <50)

| Company | Reason |
|---------|--------|
| [Name] | US-only, no EU presence |
| [Name] | Seed stage, unlikely €160k |

### Recommendations
- Check [Company] careers page weekly (actively hiring)
- Monitor [Company] for Series B announcement
- [Company] opening EU office soon (per news)
```

---

## Company Profile Template

For each researched company, generate internal notes:

```markdown
## [Company Name]

**Score:** XX/100
**Added to:** Active / Watch / Skipped

### Overview
- **Product:** [what they build]
- **Domain:** AI / DevTools / Infra / Other
- **Founded:** YYYY
- **HQ:** [location]

### Funding
| Stage | Raised | Last Round | Investors |
|-------|--------|------------|-----------|
| Series X | $XXM | $XXM (Month YYYY) | [VCs] |

### Remote & EU
- **Policy:** Remote-first / Remote OK / Hybrid
- **EU Presence:** Office / Entity / Contractors / None
- **EU Engineers:** Yes (X visible) / Unknown / No

### Tech Stack
- Languages: [list]
- Infra: [list]
- Match: Strong / Good / Weak

### Compensation
- **Levels.fyi:** [data if available]
- **Can pay €160k+:** Yes / Maybe / No

### Sentiment
- **Blind:** Positive / Mixed / Negative / No data
- **Red flags:** [any concerns]

### Why Monitor
[1-2 sentences on why this company is interesting]

### Career Page
[URL to careers page]
```

---

## Configuration

**Default companies to research:** 5
**Score threshold for Active:** 70
**Score threshold for Watch:** 50

---

## Files Modified

- `findings/job-search/companies.md` — Add new companies to monitor

## Files Read

- `findings/job-search/companies.md` — Avoid duplicates
- `findings/job-search/profile.md` — Match criteria
