# Output Format Templates

## Main Report Structure

```markdown
# 🏘️ Plot Analysis: [Location]

**Date:** [YYYY-MM-DD]
**Listing:** [URL]
**Overall Verdict:** [STRONG BUY / CONDITIONAL BUY / PASS]

---

## 1. Executive Summary

**Verdict:** [STRONG BUY / CONDITIONAL BUY / PASS]

**True Total Cost (120m² house):**

- Land + fees: [X] PLN
- Utilities: [Y] PLN
- Construction + hidden costs: [Z] PLN
- **TOTAL:** ~[T] PLN

**vs Kraków Flat (120m²):** Saves ~[difference] PLN ([percentage]%)
[KB: research-building-house-vs-buying-flat-poland-krakow.md:239]

**Key Strengths (3-4 bullets):**

- ✅ [Strength 1 with source citation]
- ✅ [Strength 2]
- ✅ [Strength 3]

**Key Risks (3-4 bullets):**

- ⚠️ [Risk 1 with source citation]
- ⚠️ [Risk 2]

**Personal Fit:** [EXCELLENT / GOOD / ACCEPTABLE / POOR]

---

## 2. Legal & Zoning Analysis

### 2.1 Księga Wieczysta (KW)

**Status:** [✅ Verified / ⚠️ Issues / ❌ Not available]
**Number:** [KW number or "Not provided"]

**Dział I - Property:**

- Area: [X m²] [✅ Matches listing / ⚠️ Discrepancy: ...]
- Classification: [Br/R/Ps/etc.] [Source: KW Dział I]

**Dział II - Ownership:**

- Owner: [Name(s)]
- Title basis: [Akt notarialny / spadek / etc.]
- Status: [✅ Single clear owner / ⚠️ Multiple owners / ❌ Unclear]

**Dział III - Rights & Restrictions:**

- Easements: [List or "None"]
- Restrictions: [List or "None"]
- Status: [✅ Clean / ⚠️ Minor easements / ❌ Major restrictions]

**Dział IV - Mortgages:**

- Active mortgages: [YES ❌ / NO ✅]
- If YES: ⚠️ WARNING - debt transfers with property

### 2.2 MPZP Status

**Designation:** [MN / MN/U / R / MW / ZL / No MPZP]

**If MN/MN/U:**

- Building coverage: [X]%
- Max height: [X m / floors]
- Biological area req: [X]%

**If No MPZP:**

- ⚠️ Warunki zabudowy required (1-3 month delay)

### 2.3 Buildability Assessment

```text
Plot size:           [X] m²
MPZP coverage:       [Y]%
Max footprint:       [Z] m²

Verdict: [✅ Comfortable / ⚠️ Tight / ❌ Insufficient]
```text

---

## 3. Infrastructure Assessment

### 3.1 Utilities Status & Costs

| Utility | Current Status | Connection Cost |
|---------|----------------|-----------------|
| Electricity | [status] | [cost] PLN |
| Water | [status] | [cost] PLN |
| Sewage | [status] | [cost] PLN |
| Gas | [status] | [cost] PLN |
| **TOTAL** | | **[X-Y]k PLN** |

### 3.2 Road Access

**Type:** [Asphalt ✅ / Gravel ⚠️ / Dirt ❌ / Unknown]
**Legal status:** [Public road / Służebność confirmed / Unclear]
**Personal criteria:** [✅ PASS - asphalt / ❌ FAIL - not asphalt]

---

## 4. Financial Breakdown

### 4.1 Land Acquisition Costs

| Item | Amount |
|------|--------|
| Plot price | [X] PLN |
| PCC tax (2%) | [X × 0.02] PLN |
| Notary fees | ~2,000 PLN |
| **Subtotal** | **[X]k PLN** |

### 4.2 Development Costs (120m² House)

| Item | Amount |
|------|--------|
| Utilities connection | [from 3.1] PLN |
| Base construction (120m²) | ~705,000 PLN |
| Hidden costs (30%) | +211,500 PLN |
| **Subtotal** | **~[Y]k PLN** |

### 4.3 Total Project Cost

```text
Land + acquisition fees:      [X]k PLN
Development + construction:   [Y]k PLN
─────────────────────────────────────
TOTAL (120m² house):         ~[Z]k PLN
```text

### 4.4 Comparative Analysis

**This plot + 120m² house:** ~[Z]k PLN
**vs Kraków flat (120m²):** 1,833,000-2,417,000 PLN
**Savings:** [difference]k PLN ([percentage]% cheaper)

---

## 5. Risk Matrix

| Category | Risk Level | Top Issues | Mitigation |
|----------|------------|------------|------------|
| Environmental | [L/M/H/C] | [items] | [actions] |
| Financial | [L/M/H/C] | [items] | [actions] |
| Legal | [L/M/H/C] | [items] | [actions] |
| Technical | [L/M/H/C] | [items] | [actions] |

**Overall Risk:** [LOW / MEDIUM / HIGH / CRITICAL]

---

## 6. Personal Fit Analysis

### 6.1 Must-Haves Checklist

| Criterion | Status | Details |
|-----------|--------|---------|
| No flood zones | [✅/❌] | [source] |
| Asphalt road | [✅/❌] | [detail] |
| 1000-1500m² size | [✅/❌] | [X]m² |
| Good transport | [✅/❌] | [stars] |

### 6.2 Transport Quality

**Suburb:** [name]
**Rating:** [⭐⭐⭐⭐⭐ / ⭐⭐⭐⭐ / ⭐⭐⭐]
**Best commute:** [X min via train/bus]

### 6.3 Woods/Nature Proximity

**Distance:** [X meters]
**Score:** [Excellent/Good/Acceptable/Poor]

### 6.4 Overall Personal Fit

**Strong positives:** [list]
**Weak points:** [list]
**Score:** [EXCELLENT / GOOD / ACCEPTABLE / POOR]

---

## 7. Site Visit Checklist

### Before Visit - Request from seller

- [ ] Full KW printout (all 4 sections)
- [ ] MPZP wypis/wyrys (if exists)
- [ ] Utility connection confirmation letters

### During Visit - Observe

- [ ] Slope/inclination - walk entire plot
- [ ] Water pooling areas
- [ ] Vegetation type (wetland plants = high water table)
- [ ] Road condition in person
- [ ] Distance to power poles, water hydrants
- [ ] Woods/nature distance (GPS measure)

### Photos to take

- [ ] Plot from all 4 corners
- [ ] Road access (both directions)
- [ ] Utility infrastructure nearby
- [ ] Any concerns/red flags

---

## 8. Recommendation

### Verdict: [STRONG BUY / CONDITIONAL BUY / PASS]

**Rationale:** [3-5 sentences with citations]

**Score breakdown:**

- Value for money: [Excellent / Good / Fair / Poor]
- Risk level: [Low / Medium / High / Critical]
- Personal fit: [Excellent / Good / Acceptable / Poor]

### Conditions (if CONDITIONAL BUY)

**Required before purchase:**

1. [condition 1]
2. [condition 2]

### Next Steps

**If STRONG BUY or CONDITIONAL BUY:**

1. Schedule site visit (preferably in rain/bad weather)
2. Request documents: KW, MPZP wypis
3. Contact geotechnical survey companies
4. Prepare negotiation strategy

**If PASS:**

- Reason: [primary reason]
- Alternative: [Continue search in X / Look for Y]

---

## 9. KB References Used

**finding-building-plot-poland-guide.md:**

- Lines 337-347: Price benchmarks
- Lines 161-168: Utilities costs
- Lines 127-134: MPZP symbols
- Lines 121: KW mortgages warning
- Lines 156-157: Road access required

**research-building-house-vs-buying-flat-poland-krakow.md:**

- Lines 13-21: Construction costs
- Lines 131: Hidden costs 25-40%
- Lines 239: Flat comparison prices
- Lines 651-660: Transport ratings

```text
