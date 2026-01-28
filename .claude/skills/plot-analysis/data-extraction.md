# Phase 1: Data Extraction

## 1.1 Fetch Listing (WebFetch)

Extract all available fields:

- Price total, price/m², negotiable?
- Plot area, dimensions, shape
- Exact address or closest landmark
- Zoning claims (budowlana/MN/R/etc)
- MPZP status claim
- KW number
- Utilities status (uzbrojona/przy działce/w ulicy/brak)
- Road access description
- Seller type, contact info
- Photos: check for visible markers (power lines, road condition, vegetation)

## 1.2 Load Regional Benchmarks

**File:** `findings/home-building-poland/finding-building-plot-poland-guide.md`

**Price benchmarks (lines 337-347):**

- Kraków city: 532-956 PLN/m²
- Zielonki: ~350 PLN/m²
- Zabierzów: ~340 PLN/m²
- Mogilany: ~300 PLN/m²
- Wieliczka: ~175 PLN/m²
- Skawina: <200 PLN/m²
- Biskupice, Czernichów: ~200 PLN/m²

**Utilities costs (lines 161-168):**

- Działka uzbrojona: 0 PLN
- Media przy działce: 5-20k PLN
- Media w ulicy: 20-50k PLN
- Brak mediów: 50k+ PLN

## 1.3 Load Construction Cost Data

**File:** `findings/home-building-poland/research-building-house-vs-buying-flat-poland-krakow.md`

**Construction costs (lines 13-21):**

- Building cost: 5,550-6,200 PLN/m²
- 120m² house: ~700k PLN base (not counting land)
- Hidden costs add 25-40% [line 131]

**Total scenarios (lines 233-241):**

- 120m² house total: ~900k-1,100k PLN including land + hidden costs
- Comparison: Kraków flat 120m²: 1,833k-2,417k PLN

## 1.4 Parallel Verification Fetches

**KW Verification (if number provided):**

- URL: `https://przegladarka-ekw.ms.gov.pl/eukw_prz/KsiegiWieczyste/wyszukiwanieKW`
- Extract Dział I (property description, area)
- Extract Dział II (owner, title basis)
- Extract Dział III (easements, służebności, rights)
- Extract Dział IV (mortgages, hipoteki)

**Geoportal Check:**

- URL: `https://mapy.geoportal.gov.pl`
- Check layers: flood zones, MPZP, SOPO (landslides), ortofotomapa
- Measure distance to nearest forest/woods (personal criteria)

**If no KW number:** Mark as CRITICAL RISK - cannot verify ownership
