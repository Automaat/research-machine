---
description: CoVe verification of GO listing for Europe/Poland remote eligibility
argument-hint: <job_listing_url>
allowed-tools: WebFetch, WebSearch, Read, Edit
---

# Job Verify (CoVe)

Chain of Verification for GO listings. Confirms Europe/Poland remote eligibility AND compensation
meets €160k+ target before promoting to VERIFIED.

## Input

**URL:** $ARGUMENTS

---

## CoVe Methodology

1. **Generate verification questions** — What must be true for this to work?
2. **Answer independently** — Search for evidence for each question
3. **Check contradictions** — Look for conflicting signals
4. **Final verdict** — VERIFIED / REJECTED / NEEDS-MANUAL

---

## Workflow

### Phase 1: Re-fetch Listing

```text
WebFetch [URL]
```

Extract fresh data, look specifically for:

- Geographic restrictions
- Timezone mentions
- "Must be authorized to work in..."
- Remote policy details
- Entity/location requirements

---

### Phase 2: Generate Verification Questions

**Core questions (always ask):**

1. **Q1: Does listing explicitly allow Europe/EMEA/Poland?**
   - Look for: "Europe", "EMEA", "Poland", "EU", "Worldwide", "Global"
   - Red flags: "US only", "North America", specific country list without EU

2. **Q2: Does company have EU entity or hire EU contractors?**
   - Search: "[Company] Europe office", "[Company] Poland", "[Company] EU entity"
   - Check: Careers page for EU positions, LinkedIn for EU employees

3. **Q3: Are timezone requirements compatible with Poland (CET/CEST)?**
   - Look for: "US timezone overlap required", "PST/EST hours", "async"
   - Poland: CET (UTC+1) / CEST (UTC+2)
   - Acceptable overlap: 4-6 hours with US East is common

4. **Q4: Any explicit geographic restrictions?**
   - Search listing for: "authorized to work", "visa sponsorship", "US persons only"
   - Security clearance requirements → usually US only

5. **Q5: Evidence of actual EU/Poland remote employees?**
   - Search LinkedIn: "[Company] engineer Poland", "[Company] engineer Europe"
   - Check: Team page, About us, Glassdoor reviews mentioning location

6. **Q6: Does compensation meet €160k+ total target?**
   - Check listing for salary range (if stated)
   - Search: "site:levels.fyi [Company] engineer"
   - Search: "[Company] engineer salary glassdoor"
   - Search: "[Company] compensation blind"
   - Convert USD → EUR if needed (rough: $1 ≈ €0.92)
   - Consider: base + equity + bonus = total comp
   - For Staff level: expect $180-250k+ USD ($165-230k EUR)
   - For Senior level: expect $150-200k+ USD ($138-184k EUR)

---

### Phase 3: Answer Each Question Independently

For each question, search and document:

```markdown
### Q1: Europe/EMEA/Poland explicitly allowed?

**Search:** [what you searched]
**Evidence found:**
- [Evidence 1]
- [Evidence 2]

**Answer:** YES / NO / UNCLEAR
**Confidence:** HIGH / MEDIUM / LOW
```

**Search patterns:**

```text
WebSearch: "[Company] remote Europe"
WebSearch: "[Company] hiring Poland"
WebSearch: "[Company] EMEA jobs"
WebSearch: "site:linkedin.com [Company] engineer Poland"
WebFetch: [Company careers page]

# For compensation (Q6):
WebSearch: "site:levels.fyi [Company] engineer salary"
WebSearch: "[Company] engineer compensation glassdoor"
WebSearch: "[Company] staff engineer salary 2025 2026"
```

---

### Phase 4: Check for Contradictions

Compare answers:

| Question | Answer | Confidence | Conflicts With |
|----------|--------|------------|----------------|
| Q1 | YES/NO | HIGH/MED/LOW | - |
| Q2 | YES/NO | HIGH/MED/LOW | - |
| Q3 | YES/NO | HIGH/MED/LOW | - |
| Q4 | YES/NO | HIGH/MED/LOW | - |
| Q5 | YES/NO | HIGH/MED/LOW | - |
| Q6 | YES/NO | HIGH/MED/LOW | - |

**Contradiction examples:**

- Listing says "remote" but careers page shows US positions only
- "Global" company but no EU employees on LinkedIn
- "Async" culture but "US timezone required"
- "Competitive salary" but Levels.fyi shows below €160k for level

---

### Phase 5: Final Verdict

**VERIFIED** — All questions YES or N/A, high confidence, no contradictions

- Update tracking.md: Move from GO to VERIFIED
- Ready for application or company research

**REJECTED** — Any question NO with high confidence

- Update tracking.md: Move from GO to NO-GO
- Add rejection reason

**NEEDS-MANUAL** — Mixed signals, low confidence, or contradictions

- Keep in GO but add notes
- Specific questions to ask recruiter

---

## Output Format

```markdown
## 🔍 Verification Result

**URL:** [listing URL]
**Company:** [name]
**Role:** [title]
**Verdict:** VERIFIED | REJECTED | NEEDS-MANUAL

---

### Verification Questions

#### Q1: Europe/EMEA/Poland explicitly allowed?
**Evidence:**
- [Evidence]
**Answer:** YES/NO/UNCLEAR
**Confidence:** HIGH/MEDIUM/LOW

#### Q2: EU entity or EU contractors?
**Evidence:**
- [Evidence]
**Answer:** YES/NO/UNCLEAR
**Confidence:** HIGH/MEDIUM/LOW

#### Q3: Timezone compatible with Poland?
**Evidence:**
- [Evidence]
**Answer:** YES/NO/UNCLEAR
**Confidence:** HIGH/MEDIUM/LOW

#### Q4: Geographic restrictions?
**Evidence:**
- [Evidence]
**Answer:** NONE/YES/UNCLEAR
**Confidence:** HIGH/MEDIUM/LOW

#### Q5: Evidence of EU employees?
**Evidence:**
- [Evidence]
**Answer:** YES/NO/UNCLEAR
**Confidence:** HIGH/MEDIUM/LOW

#### Q6: Compensation meets €160k+ target?
**Evidence:**
- Listing range: [if stated]
- Levels.fyi: [data found]
- Glassdoor: [data found]
- Estimated total comp: €XXXk
**Answer:** YES/NO/UNCLEAR
**Confidence:** HIGH/MEDIUM/LOW

---

### Contradiction Check
- [Any contradictions found]

---

### Verdict Rationale
[2-3 sentences explaining the verdict]

### If NEEDS-MANUAL — Questions to Ask Recruiter
1. [Specific question]
2. [Specific question]
```

---

## Update Tracking

After verification, update `findings/job-search/tracking.md`:

**If VERIFIED:**

```markdown
## ✅ VERIFIED (Ready to Apply)
| Date | Company | Role | URL | Verified |
|------|---------|------|-----|----------|
| 2026-01-26 | Anthropic | Staff Eng | url | EU entity confirmed |
```

**If REJECTED:**
Move to NO-GO with reason: "Verification failed: [reason]"

**If NEEDS-MANUAL:**
Keep in GO, add note: "⚠️ Needs manual verification: [question]"

---

## Common Rejection Patterns

### US-Only Signals

- "Must be authorized to work in the United States"
- "US persons only" (ITAR/security)
- Only US states listed in location
- "W-2 employment" without international option

### Timezone Blockers

- "Core hours 9am-5pm PT required"
- "Must overlap 6+ hours with US West Coast"
- No mention of async culture

### Entity Issues

- "No international contractors"
- "Must be employed through US entity"
- No EU office/entity visible

### Compensation Below Target

- Levels.fyi shows total comp <€160k for level
- Glassdoor salary range tops out below target
- Early-stage startup with "competitive" but no data
- Role level mismatch (Senior title but Mid-level comp)
- Heavy equity, low base at risky stage

### Compensation Green Flags

- Listing states range meeting/exceeding €160k
- Levels.fyi shows Staff/Senior at €180k+
- Known high-paying company (FAANG-tier)
- Transparent bands published

---

## Examples

### Example: VERIFIED

```markdown
**Verdict:** VERIFIED

#### Q1: Europe allowed?
**Evidence:** Listing states "Remote (Worldwide)"
**Answer:** YES | **Confidence:** HIGH

#### Q2: EU entity?
**Evidence:** Found "[Company] GmbH" on careers page, Berlin office
**Answer:** YES | **Confidence:** HIGH

#### Q3: Timezone?
**Evidence:** "Async-first culture, minimal meetings"
**Answer:** YES | **Confidence:** HIGH

#### Q4: Restrictions?
**Evidence:** None found in listing
**Answer:** NONE | **Confidence:** MEDIUM

#### Q5: EU employees?
**Evidence:** 12 engineers in Germany/Poland on LinkedIn
**Answer:** YES | **Confidence:** HIGH

#### Q6: Compensation meets €160k+?
**Evidence:** Levels.fyi shows Staff Eng at $220k total (~€200k)
**Answer:** YES | **Confidence:** HIGH

### Verdict Rationale
Strong EU presence with German entity. Async culture accommodates timezones. Multiple EU engineers visible. Compensation well above target. Safe to apply.
```

### Example: REJECTED (Geographic)

```markdown
**Verdict:** REJECTED

#### Q1: Europe allowed?
**Evidence:** Listing says "Remote" but careers page shows "US Remote"
**Answer:** NO | **Confidence:** HIGH

#### Q2: EU entity?
**Evidence:** No EU offices found, HQ only in SF
**Answer:** NO | **Confidence:** HIGH

#### Q5: EU employees?
**Evidence:** All engineers on LinkedIn US-based
**Answer:** NO | **Confidence:** HIGH

#### Q6: Compensation?
**Answer:** N/A (rejected on geographic grounds)

### Verdict Rationale
Despite "Remote" label, all evidence points to US-only. No EU entity, no EU employees. Moving to NO-GO.
```

### Example: REJECTED (Compensation)

```markdown
**Verdict:** REJECTED

#### Q1-Q5: Geographic checks
**All passed** — EU entity confirmed, remote Poland OK

#### Q6: Compensation meets €160k+?
**Evidence:**
- Listing states: "$90k-$130k base"
- Levels.fyi: Senior Eng total comp $120k-$150k (~€110-138k)
- Glassdoor: avg $125k
**Answer:** NO | **Confidence:** HIGH

### Verdict Rationale
Geographic fit confirmed but compensation significantly below €160k target even at top of range. Moving to NO-GO.
```

### Example: NEEDS-MANUAL

```markdown
**Verdict:** NEEDS-MANUAL

#### Q1: Europe allowed?
**Evidence:** "Remote" with no geographic specification
**Answer:** UNCLEAR | **Confidence:** LOW

#### Q2: EU entity?
**Evidence:** UK office found, unclear about EU post-Brexit
**Answer:** UNCLEAR | **Confidence:** MEDIUM

#### Q6: Compensation meets €160k+?
**Evidence:**
- No range in listing ("competitive")
- No Levels.fyi data (small startup)
- Glassdoor: 2 reviews, wide range $100-180k
**Answer:** UNCLEAR | **Confidence:** LOW

### Questions to Ask Recruiter
1. "Do you hire remote employees based in Poland/EU?"
2. "What entity would EU employees be contracted through?"
3. "Are there timezone overlap requirements?"
4. "What is the compensation range for this role? My target is €160k+ total."
```

---

## Notes

- Run this on all GO listings before applying
- Can be run by `/job-discover` automatically after triage
- Update tracking.md with results
- If recruiter contact available, NEEDS-MANUAL can be resolved via email

---

## Insights Contribution

**After verification, note learnings for `findings/job-search/insights.md`:**

### Worth Noting

- **Geographic reality:** Companies that say "remote" but are actually US-only
- **EU entity patterns:** How specific companies hire in EU
- **Compensation verification:** Levels.fyi vs actual vs stated
- **Timezone requirements:** Real overlap expectations
- **Poland-specific:** Companies that explicitly include/exclude Poland

### Output Format

If notable insight found, include in verification output:

```markdown
### 💡 Insight for insights.md
| Date | Category | Insight |
|------|----------|---------|
| [today] | Geo | [Company] "Remote" = US-only despite EU offices |
```

### Examples

```text
| 2026-01-28 | Geo | Temporal: US/Canada only, no EU engineering despite UK office |
| 2026-01-28 | Geo | Vercel: "Remote" positions = US Remote, EU has separate listings |
| 2026-01-28 | Comp | Neon (Databricks): Germany €150-188k, Poland likely similar |
| 2026-01-28 | Entity | Redpanda: UK entity, hires Poland via contractor arrangement |
```

### Patterns to Track

**"Remote" Lies:**

- US Remote ≠ Global Remote
- "Remote with X% office" = Hybrid
- "Remote (location)" = Only that location

**EU Hiring Patterns:**

- EU entity → direct employment
- US-only entity → contractor (tax implications)
- UK post-Brexit → separate from EU
