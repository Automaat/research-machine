# Phase 2: Legal & Zoning Deep Dive

## 2.1 KW Analysis (Księga Wieczysta)

### Dział I - Property Description

- Confirm area matches listing
- Verify address/location
- Land classification (użytki: Br - budowlane, R - rolne, Ps - pastwiska, etc.)
- Note: ✅ Match / ⚠️ Discrepancy / ❌ Not available

### Dział II - Ownership

- Owner name(s)
- Basis of title (Akt notarialny, spadek, etc.)
- Date of acquisition
- Multiple owners? (complicates transaction)
- Note: ✅ Single clear owner / ⚠️ Multiple owners / ❌ Unclear

### Dział III - Rights & Restrictions

- Easements (służebności): drogi, przesyłu, etc.
- Natura 2000 restrictions?
- Archaeological site protections?
- Other limitations?
- Note: ✅ Clean / ⚠️ Minor easements / ❌ Major restrictions

### Dział IV - Mortgages

- Any active mortgages (hipoteki)?
- If YES: ⚠️ WARNING - debt transfers with property [KB: finding-building-plot-poland-guide.md:121]
- Note: ✅ Clean / ❌ Mortgages present

## 2.2 MPZP Interpretation

**Search strategy:**

1. WebSearch: `"[gmina name] MPZP [address or area]"` → gmina BIP
2. Geoportal MPZP layer
3. If not found: Note "No MPZP - warunki zabudowy required (1-3 month delay)" [KB: finding-building-plot-poland-guide.md:144-145]

**Key MPZP symbols [KB: finding-building-plot-poland-guide.md:127-134]:**

| Symbol | Meaning | Status |
|--------|---------|--------|
| **MN** | Zabudowa mieszkaniowa jednorodzinna | ✅ GOOD |
| **MN/U** | Mieszkaniowa z usługami | ✅ GOOD |
| **MW** | Wielorodzinna | ❌ BAD (apartments only) |
| **R** | Tereny rolne | ❌ BAD (need odrolnienie) |
| **ZL** | Lasy | ❌ BAD |
| **ZN** | Zieleń naturalna | ❌ BAD |

**MPZP parameters to extract:**

- Max building coverage (% zabudowy) - need ≥35% for 120-150m² house
- Max height (m or floors)
- Min biological area (% zieleni)
- Building line setbacks
- Roof type requirements

## 2.3 Buildability Check

```text
Plot size: X m²
MPZP coverage: Y%
Max footprint: X × Y = Z m²

Target house: 120-150m² needs:
- 300-375m² footprint at 40% coverage
- 343-429m² footprint at 35% coverage

Verdict: ✅ Comfortable / ⚠️ Tight / ❌ Insufficient
```

## 2.4 Zoning Risk Assessment

| Risk Level | Condition |
|------------|-----------|
| **LOW** | MPZP with MN, clear coverage ≥35%, no restrictions |
| **MEDIUM** | No MPZP (need warunki zabudowy), or MN/U mixed use |
| **HIGH** | Zoning R/ZL without confirmed odrolnienie |
| **CRITICAL** | No KW, or MW/ZN designation |
