---
description: Quick go/no-go triage on job listing URL (<3 min)
argument-hint: <job_listing_url>
allowed-tools: WebFetch, WebSearch, Read
---

# Job Triage

Quick filter for job listings. Determine GO / NO-GO / MAYBE based on profile criteria.

## Input

**URL:** $ARGUMENTS

## Workflow

### 1. Fetch Listing

Use WebFetch to get job listing content. Extract:

- Company name
- Role title
- Location/remote policy
- Tech stack mentioned
- Compensation (if stated)
- Company stage/funding (if mentioned)

### 2. Research Funding (If Startup/Unknown)

If company is not a known public company, research funding:

```text
WebSearch: "[Company] funding crunchbase"
WebSearch: "[Company] series funding raised 2024 2025 2026"
```

**Extract:**

- **Stage:** Pre-seed, Seed, Series A, B, C, D, E+, Public
- **Total raised:** $X million
- **Last round:** Date + amount
- **Key investors:** Notable VCs (a]z, Sequoia, etc.)
- **Valuation:** If known

**Stage Assessment:**

| Stage | Typical Raise | Can Pay €160k+? | Risk Level |
|-------|--------------|-----------------|------------|
| Pre-seed | <$1M | ❌ Unlikely | 🔴 High |
| Seed | $1-5M | ⚠️ Maybe | 🟠 Medium-High |
| Series A | $5-20M | ⚠️ Likely | 🟡 Medium |
| Series B | $20-60M | ✅ Yes | 🟢 Low-Medium |
| Series C+ | $60M+ | ✅ Yes | 🟢 Low |
| Public | N/A | ✅ Yes | 🟢 Low |

**Funding Red Flags:**

- Last funding >2 years ago (runway concerns)
- Down round (valuation decreased)
- Bridge round / extension (struggling to raise)
- Layoffs after funding

**Funding Green Flags:**

- Recent round (last 12-18 months)
- Up round / valuation increase
- Strong investors (a]z, Sequoia, Accel, etc.)
- Growing headcount post-funding

### 3. Check Blind for Sentiment & Rumors

Search Blind for employee opinions and company rumors:

```text
WebSearch: "site:teamblind.com [Company] reviews"
WebSearch: "site:teamblind.com [Company] WLB"
WebSearch: "site:teamblind.com [Company] layoffs OR PIP"
WebSearch: "site:teamblind.com [Company] remote"
```

**Extract:**

- **Overall sentiment:** Positive / Mixed / Negative
- **WLB (Work-Life Balance):** Good / OK / Bad
- **Compensation feedback:** Above market / Market / Below
- **Management:** Positive / Mixed / Negative
- **Recent concerns:** Layoffs, PIPs, reorgs, attrition

**Blind Red Flags:**

- 🔴 Multiple layoff mentions (last 6 months)
- 🔴 PIP culture / stack ranking complaints
- 🔴 "Toxic" or "burnout" mentioned frequently
- 🔴 High attrition / "everyone leaving"
- 🔴 Return-to-office (RTO) drama

**Blind Green Flags:**

- 🟢 Good WLB consistently mentioned
- 🟢 Remote-friendly confirmed by employees
- 🟢 Comp described as competitive
- 🟢 Engineering culture praised
- 🟢 Low politics / good management

**Note:** Blind tends negative (people complain more than praise). Weight accordingly. Look for patterns, not single posts.

### 4. Load Profile Criteria

Read `findings/job-search/profile.md` for:

- Hard requirements (geo + comp)
- Soft preferences
- Green flags (promote GO)

### 5. Check Criteria (Two-Tier System)

#### HARD NO-GO (Always reject)

These are dealbreakers regardless of comp or geo:

**Company Type:**

- ❌ Software house / agency / consultancy / body shop
- ❌ Outsourcing company
- ❌ Recruitment/staffing firm (posting for client)

**Work Model:**

- ❌ On-site only
- ❌ Hybrid required (even 1 day/week)

---

#### SOFT CRITERIA (MAYBE if geo + comp match)

**COMPENSATION TOLERANCE (10% Rule):**
- **€160k+** → GO (meets or exceeds target)
- **€144k-€160k** → MAYBE (within 10% tolerance below target)
- **<€144k** → NO-GO (more than 10% below target)

Example: €151k (~5.6% below) → MAYBE, €135k (~15.6% below) → NO-GO

If listing appears to offer **remote Europe/Poland + comp within tolerance (€144k+)**, mark as MAYBE even if other criteria don't match. Note the concern.

**Industry (not preferred but acceptable):**

- ⚠️ Traditional banking/finance — Note: "May have tool restrictions"
- ⚠️ Healthcare — Note: "Compliance may limit tooling"
- ⚠️ Defense/government — Note: "Usually US-only, verify"
- ⚠️ Gambling/betting — Note: "Industry preference mismatch"
- ⚠️ Non-AI/non-tech product — Note: "Not AI-related"

**Stage (not preferred but acceptable):**

- ⚠️ Very early seed (<10 people) — Note: "Early stage risk"
- ⚠️ Layoff mode — Note: "Stability concern"

**Culture signals:**

- ⚠️ "Rockstar/ninja/guru" — Note: "Culture red flag"
- ⚠️ Restricted tooling mentioned — Note: "May block AI tools"

**Tech stack mismatch:**

- ⚠️ No Go/Python/Kotlin/Java — Note: "Stack: [X], not preferred"
- ⚠️ Frontend-heavy — Note: "Frontend focus, not backend"

### 6. Decision Logic

```text
IF hard NO-GO criteria → NO-GO (stop)
ELSE IF all green flags + tech match + €160k+ → GO
ELSE IF remote EU/Poland likely + comp €144k+ (within 10% tolerance) → MAYBE (note concerns)
ELSE IF comp <€144k (>10% below target) → NO-GO (comp insufficient)
ELSE → NO-GO
```

**Key insight:** We want to capture ALL opportunities that meet geo + comp tolerance (€144k+), even if other
criteria don't match. Better to review a MAYBE than miss a good opportunity.

---

### 7. Check Green Flags (Promote GO)

**AI/Tech (strong preference):**

- ✅ AI in product or mission statement
- ✅ Building developer tools
- ✅ Open source involvement mentioned
- ✅ Modern stack (Go, Kotlin, Rust, K8s, etc.)

**Culture:**

- ✅ "Remote-first" explicitly stated
- ✅ Mentions engineering blog
- ✅ Conference participation
- ✅ Transparent compensation

**Growth:**

- ✅ Recent funding (Series B-D)
- ✅ Scale-up / growth stage mentioned
- ✅ Headcount growth

### 8. Technical Fit Assessment

**Strong Match (promotes GO):**

- Go / Golang mentioned
- Distributed systems
- Kubernetes / cloud-native
- API design / platform engineering

**Good Match (promotes GO):**

- Python (ML/AI context)
- Infrastructure / DevOps
- Observability

**Acceptable Match (GO if product is compelling):**

- Kotlin — If concrete product, interesting domain
- Java — If concrete product, not agency, compelling problem space
- Note: JVM roles need interesting product to be GO, otherwise MAYBE

**Weak Match (MAYBE if geo+comp fit):**

- .NET, PHP — Note stack mismatch
- Frontend-heavy (React, Vue)
- Mobile development

### 9. Role Fit Assessment

**Preferred (promotes GO):**

- Staff Engineer
- Senior Engineer (high-impact scope)
- Tech Lead (hands-on)

**Acceptable:**

- Principal Engineer
- Founding Engineer (right stage)
- Engineering Manager (if technical)

**MAYBE (if geo+comp fit):**

- Mid-level roles — Note: "May be under-leveled"
- Manager-heavy — Note: "Less hands-on than preferred"

## Output Format

```text
## Triage Result

**URL:** [listing URL]
**Company:** [name]
**Role:** [title]
**Verdict:** GO | NO-GO | MAYBE

### Summary
[1-2 sentences on why this verdict]

### Company Funding
| Attribute | Value |
|-----------|-------|
| **Stage** | Series X |
| **Total Raised** | $XXM |
| **Last Round** | $XXM (Month Year) |
| **Investors** | Notable VCs |
| **Can Pay €160k+?** | ✅ Yes / ⚠️ Maybe / ❌ Unlikely |

### Blind Sentiment
| Aspect | Rating |
|--------|--------|
| **Overall** | 🟢 Positive / 🟡 Mixed / 🔴 Negative |
| **WLB** | Good / OK / Bad |
| **Compensation** | Above / Market / Below |
| **Remote Culture** | Confirmed / Mixed / RTO concerns |
| **Recent Issues** | None / [List concerns] |

### Key Factors
- [Factor 1]
- [Factor 2]
- [Factor 3]

### Hard Red Flags
- [None or list — these cause instant NO-GO]

### Green Flags Found
- [List]

### Technical Match
- [Strong/Good/Weak] — [reason]

### Soft Criteria Concerns (for MAYBE)
- [List what doesn't match ideal profile]
- [Why keeping despite concerns: geo+comp likely match]

### Questions (if MAYBE)
- [What needs clarification before applying]
```

## Examples

### Example 1: GO

```text
**URL:** https://anthropic.com/careers/staff-engineer
**Company:** Anthropic
**Role:** Staff Engineer, Infrastructure
**Verdict:** GO

### Summary
AI-first company, remote-friendly, Go/distributed systems focus. Well-funded Series D.

### Company Funding
| Attribute | Value |
|-----------|-------|
| **Stage** | Series D |
| **Total Raised** | $7.3B |
| **Last Round** | $2B (Dec 2024) |
| **Investors** | Google, Spark Capital, a16z |
| **Can Pay €160k+?** | ✅ Yes |

### Blind Sentiment
| Aspect | Rating |
|--------|--------|
| **Overall** | 🟢 Positive |
| **WLB** | Good (intense but fair) |
| **Compensation** | Above market |
| **Remote Culture** | Remote-friendly confirmed |
| **Recent Issues** | None significant |

### Key Factors
- AI core to mission
- Series D, $7B+ raised
- Remote-first stated
- Positive Blind reviews

### Hard Red Flags
- None

### Green Flags Found
- AI-native company
- Modern stack (Go, K8s)
- Engineering blog active
- Massive funding runway
- Good Blind sentiment

### Technical Match
- Strong — Go, distributed systems, infrastructure focus
```

### Example 2: NO-GO

```text
**URL:** https://accenture.com/careers/senior-developer
**Company:** Accenture
**Role:** Senior Developer
**Verdict:** NO-GO

### Summary
Consultancy/agency model, client-facing work, not product-focused.

### Key Factors
- Consultancy business model
- Client project work
- Tooling likely restricted

### Red Flags Found
- Agency/consultancy
- No product ownership
- Enterprise client focus (tool restrictions likely)

### Green Flags Found
- None

### Technical Match
- N/A — company type disqualified
```

### Example 3: MAYBE (Unclear)

```text
**URL:** https://startup.com/careers/engineer
**Company:** Unknown Startup
**Role:** Senior Engineer
**Verdict:** MAYBE

### Summary
Interesting AI product, but early stage unclear. Needs company research.

### Key Factors
- AI-powered product
- Tech stack matches
- Stage/funding unclear

### Hard Red Flags
- None

### Green Flags Found
- AI product focus
- Go mentioned in stack

### Technical Match
- Good — Go, cloud-native mentioned

### Soft Criteria Concerns
- Stage unclear (might be too early)

### Questions
- What funding stage? (Seed too early)
- Remote policy confirmed?
- Team size?
```

### Example 4: MAYBE (Geo+Comp Match, Other Criteria Don't)

```text
**URL:** https://fintech.com/careers/staff-engineer
**Company:** BigFintech Corp
**Role:** Staff Engineer, Platform
**Verdict:** MAYBE

### Summary
Traditional fintech, not AI-related, Java stack. BUT: Remote EU confirmed, €180k stated. Well-funded Series D.

### Company Funding
| Attribute | Value |
|-----------|-------|
| **Stage** | Series D |
| **Total Raised** | $280M |
| **Last Round** | $120M (Mar 2024) |
| **Investors** | Index Ventures, Accel |
| **Can Pay €160k+?** | ✅ Yes |

### Blind Sentiment
| Aspect | Rating |
|--------|--------|
| **Overall** | 🟡 Mixed |
| **WLB** | OK (some crunch) |
| **Compensation** | Market rate |
| **Remote Culture** | Confirmed remote EU |
| **Recent Issues** | Some reorg chatter |

### Key Factors
- Remote Europe explicitly stated
- €180k compensation in listing
- Series D, strong funding
- Not AI-related (fintech/payments)
- Mixed but not alarming Blind reviews

### Hard Red Flags
- None (product company, remote OK)

### Green Flags Found
- Transparent compensation
- Remote-first
- Well-funded, stable

### Technical Match
- Acceptable — Java/Kotlin, distributed systems relevant. Product is concrete.

### Soft Criteria Concerns
- ⚠️ Industry: Traditional fintech, not AI-related
- ⚠️ Tooling: Finance may have restrictions
- ✅ WHY KEEPING: Remote EU + €180k confirmed + well-funded + concrete product

### Questions
- AI tooling allowed? (Claude Code, etc.)
- Any Go in stack or open to it?
```

### Example 5: MAYBE (Early Stage but Interesting)

```text
**URL:** https://coolstartup.ai/careers/engineer
**Company:** CoolStartup AI
**Role:** Senior Engineer
**Verdict:** MAYBE

### Summary
Interesting AI product, but Seed stage raises comp concerns. Remote EU stated. Verify comp in interview.

### Company Funding
| Attribute | Value |
|-----------|-------|
| **Stage** | Seed |
| **Total Raised** | $4M |
| **Last Round** | $4M (Aug 2025) |
| **Investors** | YC, First Round |
| **Can Pay €160k+?** | ⚠️ Maybe (strong investors but early) |

### Blind Sentiment
| Aspect | Rating |
|--------|--------|
| **Overall** | N/A (too small for Blind) |
| **WLB** | Unknown |
| **Compensation** | Unknown |
| **Remote Culture** | Unknown |
| **Recent Issues** | No data |

### Key Factors
- AI-native product
- Remote Europe stated
- YC-backed (quality signal)
- Only Seed stage ($4M)
- No Blind data (too early)

### Hard Red Flags
- None

### Green Flags Found
- AI-first company
- YC-backed
- Remote-first
- Modern stack (Go, K8s)

### Technical Match
- Strong — Go, Kubernetes, distributed systems

### Soft Criteria Concerns
- ⚠️ Stage: Seed only, may not hit €160k
- ⚠️ Team size: ~8 people (early)
- ✅ WHY KEEPING: Strong investors, AI fit, remote EU

### Questions
- What's the compensation range? Target is €160k+
- What's the equity package like?
- Runway / path to Series A?
```

### Example 6: NO-GO (Hard Red Flag)

```text
**URL:** https://agency.com/careers/developer
**Company:** TechConsulting Partners
**Role:** Senior Developer
**Verdict:** NO-GO

### Summary
Consultancy model = hard NO-GO. Doesn't matter that comp might be good.

### Hard Red Flags
- ❌ Agency/consultancy business model

### Notes
Hard red flag found. No further analysis needed.
```

## Notes

- If URL fetch fails, return MAYBE with note to check manually
- If company is in watched list (`findings/job-search/companies.md`), note it
- Keep analysis <3 minutes
- When in doubt between NO-GO and MAYBE, choose MAYBE

---

## Insights Contribution

**After triage, note any learnings for `findings/job-search/insights.md`:**

### Worth Noting

- **Compensation data:** If listing shows salary, note range + company stage
- **Geographic restrictions:** "Remote" that's actually US-only
- **Entity patterns:** How company hires in EU (entity, contractor, etc.)
- **Stack trends:** What tech companies are hiring for
- **New agencies:** Staffing firms to add to avoid list

### Output Format

If notable insight found, include in triage output:

```markdown
### 💡 Insight for insights.md
| Date | Category | Insight |
|------|----------|---------|
| [today] | Compensation | [Company] Series B paying €X-Y for [role] |
```

### Examples

```text
| 2026-01-28 | Comp | Cast AI (Series C, €108M) paying €78-108k, below €160k even at C stage |
| 2026-01-28 | Geo | "Remote Europe" at [Company] excludes Poland (DE/UK/ES only) |
| 2026-01-28 | Agency | Add Proxify AB to staffing firm blacklist |
```
