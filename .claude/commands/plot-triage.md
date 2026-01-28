---
description: Quick plot filtering for Polish listings (go/no-go decision in <3 min). Use when user shares Otodom or property listing URL for initial screening before full analysis.
argument-hint: [Otodom-URL|listing-URL]
allowed-tools: [WebFetch, WebSearch, Read, Grep]
---

# Plot Triage: $ARGUMENTS

## Rules

**Purpose:** Filter 20+ listings/hour - eliminate obvious bad deals/scams in <3 min

**Critical Requirements:**

- Every claim must cite source: [Listing], [KB: filename:line]
- Red flags = instant NO-GO
- Flag missing critical data
- Base price analysis on KB benchmarks

**DO:**

- ✅ Compare price to regional benchmark from KB
- ✅ Check for scam patterns (cash-only, too cheap)
- ✅ Flag unclear zoning ("almost budowlana")
- ✅ Note utilities status

**DON'T:**

- ❌ Trust listing claims without verification
- ❌ Ignore price outliers (>30% below market)
- ❌ Accept vague zoning descriptions

---

## Phase 1: Extract Listing Data

Fetch listing URL with curl bypass (user-agent + headers) and extract critical fields:

**Required data:**

- Price total, price/m²
- Plot area (m²)
- Location (gmina/miasto/village name)
- **GPS coordinates** (latitude, longitude) - critical for transport research
- Utilities claim (uzbrojona/przy działce/w ulicy/brak)
- Zoning (budowlana/rolna/MN/MW/R)
- MPZP status
- Road access mention
- Seller type (private/agent)

**Extraction method (Otodom blocks WebFetch):**

```bash
curl -L -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" \
  -H "Accept-Language: pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7" \
  -H "Accept-Encoding: gzip, deflate, br" \
  --compressed "https://www.otodom.pl/..." 2>/dev/null
```

**Key data locations in HTML:**

- GPS: `"latitude":50.xxxxx,"longitude":20.xxxxx` in JSON-LD schema
- Price: `"price":349000` in schema
- Area: `"Powierzchnia","value":"1461 m²"` in additionalProperty
- Description: in `"description":"<p>..."` field

**Flag if missing:**

- Vague zoning ("działka do zabudowy" without MN/budowlana)
- No price/m² listed
- GPS coordinates missing (impacts transport accuracy)

---

## Phase 2: Rapid Verification

### 2.1 Load Price Benchmarks

Use Read tool on KB file: `findings/home-building-poland/finding-building-plot-poland-guide.md` (lines 337-347)

**Benchmarks (Kraków area 2025):**

- Zielonki: ~350 PLN/m²
- Zabierzów: ~340 PLN/m²
- Mogilany: ~300 PLN/m²
- Wieliczka: ~175 PLN/m²
- Skawina: <200 PLN/m²
- Biskupice, Czernichów: ~200 PLN/m²

### 2.2 Research Actual Transport (GPS-based)

**CRITICAL:** Never assume suburb-level transport ratings. Always research village-specific access.

**Steps:**

1. Extract village name + GPS coordinates from listing
2. Search for nearest SKA station distance
3. Identify direct bus routes to Kraków (search: "[village]" "Kraków" bus direct MDA)
4. Check gmina municipal transport (many villages have feeder buses)
5. Calculate total commute time including transfers

**Common patterns by gmina:**

- **Gmina Wieliczka:** Best - most villages have direct access to SKA1 or frequent buses
- **Gmina Niepołomice:** Mixed - only Podłęże/Staniątki have SKA3, other villages need transfers
- **Gmina Zabierzów:** Good - most areas within 5km of SKA stations
- **Gmina Mogilany:** Poor - bus only, infrequent
- **Gmina Skawina:** Excellent - SKA2 access

**Transport search queries:**

```text
"[village name]" nearest train station SKA distance
"[village name]" "Kraków" bus direct schedule 2026
gmina [gmina name] public transport SKA access
"linia [bus#]" "Kraków" travel time "[village]" minutes
```

**Transport rating scale:**

- ⭐⭐⭐⭐⭐ Excellent: Direct SKA access <2km, <30 min to Kraków Główny
- ⭐⭐⭐⭐ Good: SKA within 5km OR direct frequent buses <40 min
- ⭐⭐⭐ Moderate: SKA 5-10km OR buses with 1 transfer, 45-60 min total
- ⭐⭐ Poor: No direct SKA, requires multiple transfers, 60-90 min
- ⭐ Very Poor: Car-dependent, public transport >90 min or infrequent

**Red flags for transport:**

- Bus line that doesn't actually go to Kraków center (check endpoint!)
- "Na żądanie" (on-request) stops only
- Weekend service <6 trips/day
- Requires 2+ transfers

### 2.3 Red Flags Checklist

**CRITICAL (instant NO-GO):**

- Price <50% of regional benchmark [KB: finding-building-plot-poland-guide.md:337-347]
- Cash-only demands [KB: finding-building-plot-poland-guide.md:301]
- Flood zone location (if visible on listing)
- Non-asphalt road access (gravel/dirt) **[Personal criteria]**
- Plot <1000m² or >1500m² **[Personal criteria]**

**MAJOR (strong NO-GO signal):**

- "Almost budowlana" / "działka do zabudowy" without MPZP [KB: finding-building-plot-poland-guide.md:315]
- Seller avoids notary [KB: finding-building-plot-poland-guide.md:314]
- Rushed timeline demands [KB: finding-building-plot-poland-guide.md:313]
- Price >30% above benchmark (overpriced)
- Zoning: R/ZL (rolna/las) without odrolnienie [KB: finding-building-plot-poland-guide.md:127-134]

**MINOR (investigate further):**

- Unusual shape (very narrow, no frontage) [KB: finding-building-plot-poland-guide.md:317]
- No visible access road [KB: finding-building-plot-poland-guide.md:318]
- Utilities "w ulicy" vs "przy działce" (cost difference 20-50k) [KB: finding-building-plot-poland-guide.md:161-168]
- No MPZP (adds 1-3 months for warunki zabudowy) [KB: finding-building-plot-poland-guide.md:144-145]

---

## Phase 3: Go/No-Go Decision

**Decision matrix:**

| Issues Found | Verdict |
|--------------|---------|
| 1+ Critical | **NO-GO** |
| 2+ Major | **NO-GO** |
| 1 Major + 2+ Minor | **MAYBE** |
| 1 Major only | **MAYBE** |
| Minor issues only | **GO** |
| Clean | **GO** |

**Personal criteria auto-NO-GO:**

- ❌ Non-asphalt road
- ❌ Plot <1000m² or >1500m²
- ❌ Poor transport to Kraków (check suburb from KB)

**Personal criteria promote GO:**

- ✅ Proximity to woods/forest
- ✅ Asphalt road access
- ✅ Utilities przy działce or better

---

## Output Format

```markdown
## 🚦 Triage Result: [GO / NO-GO / MAYBE]

### 📊 Critical Metrics
- **Price:** X PLN/m² (vs benchmark: Y PLN/m² for [location]) [KB: finding-building-plot-poland-guide.md:337-347]
- **Location:** [gmina] (Distance to Kraków: ~Xkm)
- **Area:** X m²
- **Zoning:** [MN/MW/R/budowlana/unknown]
- **Utilities:** [uzbrojona / przy działce / w ulicy / brak]
- **Road:** [asphalt / gravel / dirt / unknown]

### ⚠️ Issues Found

**Critical:**
- [List or "None"]

**Major:**
- [List or "None"]

**Minor:**
- [List or "None"]

### 🎯 Decision Rationale
[2-3 sentences explaining the verdict, referencing key factors]

### ➡️ Next Action
- **GO:** Run `/plot-analysis [URL]` for comprehensive evaluation
- **NO-GO:** Skip this listing (reason: [primary red flag])
- **MAYBE:** Verify [specific condition] before running full analysis

### 🏘️ Transport Rating
**Location:** [Village name] (gmina [gmina], GPS: [lat], [lon])
**Rating:** [⭐⭐⭐⭐⭐ / ⭐⭐⭐⭐ / ⭐⭐⭐ / ⭐⭐ / ⭐ Poor]

**Actual transport options researched:**
- [Option 1: e.g., "Bus 211 → Pleszów → transfer (~60-90 min)"]
- [Option 2: e.g., "Drive 13km to Podłęże SKA3 → train 47min"]
- [Direct SKA access: Yes/No, distance if applicable]

**Sources:**
- [Source 1 with title](URL)
- [Source 2 with title](URL)
```

---

## 🔍 Few-Shot Examples

### Example 1: RED FLAG (Scam)

**Input:** Otodom listing: "Działka 1200m² Mogilany, 120k PLN (100 PLN/m²), szybka sprzedaż, tylko gotówka"

**Output:**

## 🚦 Triage Result: NO-GO

### 📊 Critical Metrics

- **Price:** 100 PLN/m² (vs benchmark: 300 PLN/m² for Mogilany) [KB: finding-building-plot-poland-guide.md:344]
- **Location:** Mogilany (Distance to Kraków: ~10km)
- **Area:** 1,200 m²
- **Zoning:** Unknown (not specified in listing)
- **Utilities:** Unknown
- **Road:** Unknown

### ⚠️ Issues Found

**Critical:**

- Price 67% below market benchmark (100 vs 300 PLN/m²) - possible scam
  [KB: finding-building-plot-poland-guide.md:310]
- Cash-only demand [KB: finding-building-plot-poland-guide.md:301]

**Major:**

- Rushed timeline ("szybka sprzedaż") [KB: finding-building-plot-poland-guide.md:313]
- Zoning not specified

**Minor:**

- None

### 🎯 Decision Rationale

Multiple critical red flags indicate high scam probability. Price 67% below market + cash-only = classic fraud pattern per KB guidelines.

### ➡️ Next Action

- **NO-GO:** Skip this listing (reason: likely scam based on price manipulation + cash demand)

### 🏘️ Transport Rating

**Suburb:** Mogilany
**Rating:** ⭐⭐⭐ (Bus only, hourly) [KB: research-building-house-vs-buying-flat-poland-krakow.md:566]

---

### Example 2: CLEAN (Strong Candidate)

**Input:** Otodom listing: "Działka budowlana 1100m² Wieliczka, 195k PLN (177 PLN/m²),
MPZP MN, uzbrojona w media, droga asfaltowa"

**Output:**

## 🚦 Triage Result: GO

### 📊 Critical Metrics

- **Price:** 177 PLN/m² (vs benchmark: 175 PLN/m² for Wieliczka) [KB: finding-building-plot-poland-guide.md:345]
- **Location:** Wieliczka (Distance to Kraków: ~13km)
- **Area:** 1,100 m²
- **Zoning:** MN (zabudowa mieszkaniowa jednorodzinna) [KB: finding-building-plot-poland-guide.md:129]
- **Utilities:** Uzbrojona (0 PLN additional cost) [KB: finding-building-plot-poland-guide.md:165]
- **Road:** Asphalt ✅

### ⚠️ Issues Found

**Critical:**

- None

**Major:**

- None

**Minor:**

- None

### 🎯 Decision Rationale

Excellent candidate: at-market pricing, proper zoning (MN), utilities connected, asphalt road.
Plot size 1,100m² fits personal criteria (1000-1500m²). Wieliczka offers best overall value
with excellent transport.

### ➡️ Next Action

- **GO:** Run `/plot-analysis [URL]` for comprehensive evaluation including MPZP details, buildability for 120-150m² house

### 🏘️ Transport Rating

**Location:** Wieliczka city center (GPS: 49.9836, 20.0643)
**Rating:** ⭐⭐⭐⭐⭐ (Excellent - direct SKA1 access)

**Actual transport options researched:**

- SKA1 train from Wieliczka Rynek-Kopalnia → Kraków Główny: 25 min
- Frequent buses to Kraków center: ~40-50 min
- Direct SKA access: Yes, station in city center

**Sources:**

- [KB Suburb Comparison](research-building-house-vs-buying-flat-poland-krakow.md:655)

---

### Example 3: MIXED (Trade-offs)

**Input:** Otodom listing: "Działka 1300m² Zabierzów, 450k PLN (346 PLN/m²), działka do zabudowy, media w ulicy"

**Output:**

## 🚦 Triage Result: MAYBE

### 📊 Critical Metrics

- **Price:** 346 PLN/m² (vs benchmark: 340 PLN/m² for Zabierzów) [KB: finding-building-plot-poland-guide.md:343]
- **Location:** Zabierzów (Distance to Kraków: ~12km)
- **Area:** 1,300 m²
- **Zoning:** Unclear - "do zabudowy" (not confirmed MN/budowlana)
- **Utilities:** W ulicy (20-50k PLN additional cost) [KB: finding-building-plot-poland-guide.md:167]
- **Road:** Unknown

### ⚠️ Issues Found

**Critical:**

- None

**Major:**

- Vague zoning: "działka do zabudowy" instead of "budowlana" or MPZP designation [KB: finding-building-plot-poland-guide.md:315]

**Minor:**

- Utilities in street not at boundary (adds 20-50k PLN) [KB: finding-building-plot-poland-guide.md:167]
- No MPZP status mentioned (may need warunki zabudowy) [KB: finding-building-plot-poland-guide.md:144-145]
- Road condition unknown
- Most expensive suburb per m²

### 🎯 Decision Rationale

At-market pricing for premium Zabierzów location. Major concern: unclear zoning language
("do zabudowy" = red flag without MPZP confirmation). Utilities in street adds 20-50k PLN
but manageable. Worth investigating zoning status.

### ➡️ Next Action

- **MAYBE:** Before running full analysis, verify:
  1. Confirm zoning is actually MN/budowlana (not R requiring odrolnienie)
  2. Check MPZP status
  3. Ask about road surface type

If seller provides clear answers → proceed to `/plot-analysis`
If evasive → treat as NO-GO

### 🏘️ Transport Rating

**Location:** Zabierzów gmina (GPS from listing, specific village TBD)
**Rating:** ⭐⭐⭐⭐ (Good - SKA access typically within 5km in this gmina)

**Actual transport options researched:**

- SKA station access: Check specific village distance
- Bus routes to Kraków: Research direct connections
- Gmina pattern: Zabierzów has good SKA coverage [KB: research-building-house-vs-buying-flat-poland-krakow.md:657]

**Sources:**

- [KB Suburb Comparison](research-building-house-vs-buying-flat-poland-krakow.md:657)

---

## Verification Checklist

Before final output:

- [ ] Price benchmark from KB cited?
- [ ] All red flags from KB checklist applied?
- [ ] Personal criteria checked (road, size, transport)?
- [ ] GPS coordinates extracted from listing?
- [ ] Transport researched for SPECIFIC village (not gmina-level assumption)?
- [ ] Nearest SKA station identified with distance?
- [ ] Direct bus routes to Kraków center verified (not just local routes)?
- [ ] Total commute time calculated including transfers?
- [ ] Verdict matches issue count in matrix?
- [ ] Next action clear and actionable?
