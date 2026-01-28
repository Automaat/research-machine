# Company Research Skill

## Description

Deep dive evaluation of companies from GO list. Comprehensive analysis for interview preparation.

## Trigger

User invokes `/company-research [company]` or asks for deep research on a specific company.

## Tools Required

- WebSearch
- WebFetch
- Read

---

## Input

**Company:** $ARGUMENTS or company name from conversation

---

## Workflow

### Phase 1: Company Basics

**Search queries:**
```
WebSearch: "[Company] funding stage investors 2026"
WebSearch: "[Company] company size employees headcount"
WebSearch: "[Company] product revenue business model"
```

**Extract:**
- Funding stage (Seed, A, B, C, D, Public)
- Total raised
- Key investors
- Employee count (total, engineering estimate)
- Core product/service
- Business model (SaaS, usage-based, enterprise)
- Revenue stage (pre-revenue, growing, profitable)

---

### Phase 2: Engineering Culture

Reference: `culture-signals.md` in this skill folder.

**Search queries:**
```
WebSearch: "[Company] engineering blog"
WebSearch: "[Company] github open source"
WebSearch: "[Company] tech stack architecture"
WebSearch: "[Company] engineering team conference talks"
```

**Evaluate:**
- Engineering blog quality and frequency
- Open source contributions
- Tech stack modernity
- Conference presence
- Technical leadership visibility
- Remote work culture signals

**Fetch and analyze:**
- Engineering blog (if exists)
- GitHub organization
- Recent tech talks/podcasts

---

### Phase 3: Employee Sentiment

**Search queries:**
```
WebSearch: "site:glassdoor.com [Company] reviews"
WebSearch: "site:levels.fyi [Company]"
WebSearch: "[Company] blind reviews"
WebSearch: "[Company] employee experience 2025 2026"
```

**Analyze:**
- Glassdoor rating (overall, engineering-specific)
- Common praise themes
- Common complaint themes
- Leadership reviews
- Work-life balance signals
- Recent review trends (improving/declining)

---

### Phase 4: Compensation Benchmarks

Reference: `compensation.md` in this skill folder.

**Search queries:**
```
WebSearch: "site:levels.fyi [Company] engineer salary"
WebSearch: "[Company] compensation bands transparent"
WebSearch: "[Company] equity RSU stock options"
```

**Extract:**
- Base salary ranges (by level)
- Equity structure (RSU vs options, vesting)
- Bonus structure
- Total compensation estimates
- Comparison to target (€160k+)

---

### Phase 5: Red Flag Scan

**Check for:**
- Recent layoffs (last 12 months)
- Leadership departures
- Product pivots
- Funding concerns
- Negative press
- Lawsuit/controversy

**Search queries:**
```
WebSearch: "[Company] layoffs 2025 2026"
WebSearch: "[Company] controversy news"
WebSearch: "[Company] leadership changes"
```

---

### Phase 6: Role Fit Assessment

**Load profile:**
```
Read findings/job-search/profile.md
```

**Evaluate:**
- Technical alignment (stack, domain)
- Role level match
- Growth opportunity
- Impact potential
- Culture fit indicators

---

### Phase 7: Interview Prep Notes

**Research:**
- Recent company news/announcements
- Key technical challenges they face
- Their approach to scaling
- Open positions (for team structure insight)
- Key people to research (engineering leadership)

**Questions to ask them:**
- About engineering culture
- About tech decisions
- About growth/roadmap
- About team structure

---

## Output Format

Use template from `output-template.md`.

Generate comprehensive report saved to:
```
findings/job-search/research/[company-slug].md
```

---

## Error Handling

### Limited Public Info
- Note what couldn't be found
- Suggest questions to ask in interview
- Still provide available analysis

### Conflicting Information
- Present both perspectives
- Note uncertainty
- Recommend verification approach

---

## Files Read

- `findings/job-search/profile.md` — For role fit assessment
- `culture-signals.md` — Engineering culture evaluation criteria
- `compensation.md` — Comp research methodology
- `output-template.md` — Report format

## Files Created

- `findings/job-search/research/[company].md` — Research report
