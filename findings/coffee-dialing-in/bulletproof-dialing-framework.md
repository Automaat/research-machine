# ☕ Bulletproof Coffee Dialing-In Framework

**Date:** 2025-12-23
**Tags:** #coffee #espresso #v60 #chemex #aeropress #commandante #timemore
**Focus:** Systematic approach to dialing in coffee across brew methods

---

## 🎯 Core Philosophy

> 📄 **STATED**: "The best tool for dialing in is your palate." [Source: Counter Culture Coffee]

> 📄 **STATED**: "Try not to over complicate things... keep all other variables consistent" [Source: Counter Culture Coffee]

**Golden Rule:** Change ONE variable at a time, taste, adjust, repeat.

---

## ☕ ESPRESSO (Timemore 078S)

### 🎚️ Grinder Settings

| Roast Level | Timemore 078S Setting |
|-------------|----------------------|
| Light | 0.6 - 1.4 |
| Medium | 1.5 - 2.0 |
| Dark | 2.0 - 2.6 |

> 📄 **STATED**: "For espresso, the range seems to be fairly narrow, between 0.6 to 1.4 on some units" [Source: Honest Coffee Guide]

> 📄 **STATED**: "The grinder operates across a range of 235 – 1235 microns" [Source: Honest Coffee Guide]

⚠️ **CALIBRATION NOTE**: "Many 078S units were shipped with the pin 1 to 2 holes too coarse" - calibrate zero point first!

### 📐 Brew Ratios by Roast

| Roast Level | Brew Ratio | Example (18g dose) |
|-------------|------------|-------------------|
| Dark | 1:1.5 | 18g → 27g |
| Medium | 1:2 | 18g → 36g |
| Light | 1:2.5 - 1:4 | 18g → 45-72g |

> 📄 **STATED**: "A 1:2 ratio is recommended by professional coffee institutes as the starting point" [Source: Espresso AF]

> 📄 **STATED**: "Dark roasts are much easier to extract and allow for a lower brew ratio. For a dark roast, you can go for a 1:1.5 ratio" [Source: Various]

### ⏱️ Shot Timing

- **Target Range**: 25-35 seconds from first drip
- **Light Roasts Exception**: Can exceed 40+ seconds

> 📄 **STATED**: "Don't worry too much about going over the recommended 25-35 seconds... It's not uncommon to pull a delicious light roast that takes >40 seconds to reach target yield" [Source: Espresso AF]

### 🌡️ Temperature

- **Default**: 93.5°C
- **Light roasts**: Higher (up to 96°C)
- **Dark roasts**: Lower (90-92°C)

### 🔧 Dialing-In Protocol

```text
1. LOCK DOSE → Choose based on basket (e.g., 18g)
2. SET RATIO → Start at 1:2 (18g in → 36g out)
3. ADJUST GRIND → Target 25-35s extraction
   - Too fast (<20s) → grind FINER
   - Too slow (>40s) → grind COARSER
4. TASTE & ADJUST RATIO:
   - Sour → INCREASE ratio (try 18g/40g, then 18g/44g)
   - Bitter → DECREASE ratio (try 18g/32g)
   - Bitter AND Sour → Uneven extraction, fix puck prep
5. REFINE GRIND → As fine as possible without channeling
```text

> 📄 **STATED**: "Grind as fine as possible while maintaining balance... 'Too fine' causes channeling and faster flow" [Source: Espresso AF]

---

## ☕ ESPRESSO (Commandante C40)

> 📄 **STATED**: "Comandante is one of the few hand grinders which excel at grinding coffee for espresso" [Source: Coffeedesk]

### 🎚️ Grinder Settings

| Model | Clicks | Notes |
|-------|--------|-------|
| Standard Axle | 10-15 clicks | Coarser steps, harder to dial in |
| Red Clix | 18-24 clicks | Recommended for espresso precision |

> ⚠️ **Red Clix strongly recommended** - doubles clicks per rotation (24 vs 12), enabling finer adjustments critical for espresso

### 🔥 Espresso: Roast-Specific Parameters

| Parameter | Light Roast | Medium Roast | Dark Roast |
|-----------|-------------|--------------|------------|
| Grind (Standard) | 10-12 clicks | 12-14 clicks | 14-16 clicks |
| Grind (Red Clix) | 18-20 clicks | 20-22 clicks | 22-26 clicks |
| Temperature | 94-96°C | 92-94°C | 88-92°C |
| Ratio | 1:2.5 - 1:3 | 1:2 - 1:2.5 | 1:1.5 - 1:2 |
| Shot Time | 30-40s | 25-35s | 22-30s |

### 📐 Recipe Parameters

| Parameter | Target |
|-----------|--------|
| Dose | 18g (adjust to basket) |
| Ratio | 1:2 starting point |
| Temperature | 93°C default |
| Shot Time | 25-35s |

### 🔧 Dialing-In Protocol

```text
1. LOCK DOSE → 18g (or basket capacity)
2. SET RATIO → 1:2 (18g in → 36g out)
3. START GRIND → 12 clicks (Standard) / 20 clicks (Red Clix)
4. PULL SHOT → Target 25-35s
   - Too fast (<20s) → go FINER (1 click Standard / 2 clicks Red Clix)
   - Too slow (>40s) → go COARSER (1 click Standard / 2 clicks Red Clix)
5. TASTE & ADJUST RATIO:
   - Sour → INCREASE ratio (try 1:2.5)
   - Bitter → DECREASE ratio (try 1:1.8)
6. FINE-TUNE → Adjust temp if needed (lighter=hotter, darker=cooler)
```text

### ⚠️ Commandante Espresso Limitations

- **Stepped adjustment** - harder to dial in precisely without Red Clix
- **~30 microns per click** - each click is a significant change for espresso
- **Consistency varies** - same coffee on different C40 units may need different settings

> 📄 **STATED**: "The same coffee brewed with the same method but two different grinders can require either 30 or 32 clicks" [Source: Coffeedesk]

---

## 🫖 HARIO V60 (Commandante C40)

### 🎚️ Grinder Settings

| Cup Size | Standard Axle | Red Clix |
|----------|--------------|----------|
| Single (~350g) | 23-28 clicks | 46-52 clicks |
| Double (~700g) | 28-32 clicks | 52-57 clicks |

> 📄 **STATED**: "V60: 23-32 clicks (Standard-axle), 46-57 clicks (Red Clix)" [Source: Coffeedesk]
``
> 📄 **STATED**: "Comandante C40 uses approximately 30 microns per click" [Source: Basic Barista]

### 📐 Recipe Parameters

| Parameter | Target |
|-----------|--------|
| Ratio | 1:15 - 1:16 |
| Temperature | 90-96°C |
| Bloom | 2x coffee weight, 30-45s |
| Total Brew Time | 2:45 - 3:15 (inc. bloom) |

> 📄 **STATED**: "Use a coffee-to-water ratio of 1:15 as your starting point, which means 20g of coffee to 300ml of water" [Source: Low Key Coffee Snobs]

> 📄 **STATED**: "Brew time target: 2:45-3:15 minutes' time (the 30-second bloom included)" [Source: Coffeedesk]

### 🔥 V60: Roast-Specific Parameters

| Parameter | Light Roast | Medium Roast | Dark Roast |
|-----------|-------------|--------------|------------|
| Grind (Standard) | 22-25 clicks | 25-28 clicks | 28-32 clicks |
| Grind (Red Clix) | 44-50 clicks | 50-56 clicks | 56-64 clicks |
| Temperature | 96°C (boiling) | 93°C | 90°C |
| Ratio | 1:16 - 1:17 | 1:15 - 1:16 | 1:14 - 1:15 |
| Brew Time | 3:00 - 3:30 | 2:45 - 3:15 | 2:30 - 3:00 |

> 📄 **STATED**: "For light roasted coffee, many tend to use boiling water" [Source: Niche Coffee]

### 🔧 Dialing-In Protocol

```text
1. SET RATIO → 1:15 (20g coffee : 300g water)
2. START GRIND → Based on roast (see table above)
3. BLOOM → 40-50g water, wait 30-45s
4. POUR → Slow circles, center to edge, 300g total by 2:00
5. DRAIN → Should finish by 3:00-3:15
6. TASTE & ADJUST:
   - Sour/weak → FINER grind OR hotter water
   - Bitter/harsh → COARSER grind OR cooler water
   - Too fast (<2:30) → grind FINER
   - Too slow (>3:30) → grind COARSER
```text

> 📄 **STATED**: "A grind that's too fine will stall the drawdown and make your coffee bitter; too coarse and it will rush through and taste weak" [Source: Daniel Norris]

---

## 🧪 CHEMEX (Commandante C40)

### 🎚️ Grinder Settings

| Model | Clicks |
|-------|--------|
| Standard Axle | 40-45 clicks |
| Red Clix | 55-65 clicks |

> 📄 **STATED**: "Chemex: Standard-axle model: 40-45 clicks, Red Clix model: 55-65 clicks" [Source: Coffeedesk]

**Note:** Chemex requires COARSER than V60 due to thicker filters

> 📄 **STATED**: "You'll need to grind slightly coarser for a Chemex than you would for a V60 due to its slow brew time" [Source: Bean Ground]

### 📐 Recipe Parameters

| Parameter | Target |
|-----------|--------|
| Ratio | 1:15 - 1:17 |
| Temperature | 90-96°C |
| Bloom | 3-4x coffee weight, 30-45s |
| Total Brew Time | 3:30 - 4:30 |

> 📄 **STATED**: "The general recommendation is a 1:17 coffee-to-water ratio by weight" [Source: Cafely]

> 📄 **STATED**: "Use 1 gram of coffee for every 14 grams of water for dark roasts and upward of 1 gram of coffee for every 17 grams of water for light roasts" [Source: HexNub]

### 🔥 Chemex: Roast-Specific Parameters

| Parameter | Light Roast | Medium Roast | Dark Roast |
|-----------|-------------|--------------|------------|
| Grind (Standard) | 38-42 clicks | 42-45 clicks | 45-48 clicks |
| Grind (Red Clix) | 52-58 clicks | 58-65 clicks | 65-72 clicks |
| Temperature | 96°C (boiling) | 93°C | 90°C |
| Ratio | 1:16 - 1:17 | 1:15 - 1:16 | 1:14 - 1:15 |
| Brew Time | 4:00 - 4:45 | 3:30 - 4:15 | 3:15 - 4:00 |

### 🔧 Dialing-In Protocol

```text
1. SET RATIO → 1:16 (30g coffee : 480g water)
2. START GRIND → Based on roast (see table above)
3. BLOOM → 90-120g water, wait 30-45s
4. POUR → Pulse pours of 100-120g
5. DRAIN → Should finish by 4:00-4:30
6. TASTE & ADJUST:
   - Sour → FINER grind (try -2 clicks)
   - Bitter → COARSER grind (try +2 clicks)
   - Brew too long (>5min) → COARSER grind
   - Brew too fast (<3min) → FINER grind
```text

---

## 🔄 AEROPRESS (Commandante C40)

### 🎚️ Grinder Settings by Style

| Style | Standard Axle | Red Clix |
|-------|--------------|----------|
| Espresso-style | 10-15 clicks | 18-24 clicks |
| Traditional | 20-22 clicks | 25-30 clicks |
| Inverted/Filter | 24-28 clicks | 32-36 clicks |

> 📄 **STATED**: "Traditional method (Standard-axle): 20-22 clicks... Inverted method (Standard-axle): 24-28 clicks" [Source: Coffeedesk]

> 📄 **STATED**: "For an espresso-style coffee, around 10-15 clicks works great, but for filter brewing, 20-30 clicks" [Source: Basic Barista]

### 📐 Recipe Parameters

| Style | Ratio | Grind | Temp | Time |
|-------|-------|-------|------|------|
| Concentrated | 1:6 - 1:10 | Fine | 90-96°C | 1-2min |
| Standard | 1:12 - 1:14 | Medium-fine | 85-93°C | 2-2.5min |
| Long immersion | 1:14 - 1:16 | Medium-coarse | 80-90°C | 3-4min |

> 📄 **STATED**: "The standard approach uses approximately 1:12 to 1:16 (coffee to water), though the original recipe suggests a stronger 1:6 ratio" [Source: Counter Culture]

### 🔥 Aeropress: Roast-Specific Parameters (Standard Style)

| Parameter | Light Roast | Medium Roast | Dark Roast |
|-----------|-------------|--------------|------------|
| Grind (Standard) | 18-21 clicks | 21-24 clicks | 24-28 clicks |
| Grind (Red Clix) | 24-28 clicks | 28-32 clicks | 32-38 clicks |
| Temperature | 92-96°C | 88-92°C | 80-88°C |
| Ratio | 1:14 - 1:16 | 1:12 - 1:14 | 1:10 - 1:12 |
| Steep Time | 2:00 - 2:30 | 1:30 - 2:00 | 1:00 - 1:30 |

> 📄 **STATED**: "AeroPress coffees are often brewed at lower temperatures, from 80–85°C.
> This can create mellower coffees with less acidity and bitterness" [Source: Coffee Geek TV]

### 🔧 Dialing-In Protocol (Standard Recipe)

```text
1. SET RECIPE → 18g coffee : 210g water (1:11.7)
2. START GRIND → Based on roast (see table above)
3. ADD WATER → All at once
4. STIR → 10 seconds
5. STEEP → 60-90 seconds
6. PRESS → 20-30 seconds (slow, steady)
7. TASTE & ADJUST:
   - Sour/weak → FINER grind OR hotter water OR longer steep
   - Bitter/harsh → COARSER grind OR cooler water OR shorter steep
   - Thin body → MORE coffee OR finer grind
```text

---

## 🎯 Universal Troubleshooting Matrix

| Taste | Problem | Solution |
|-------|---------|----------|
| **Sour** | Under-extracted | Grind finer, higher temp, longer time, increase ratio |
| **Bitter** | Over-extracted | Grind coarser, lower temp, shorter time, decrease ratio |
| **Sour + Bitter** | Uneven extraction | Fix puck prep (espresso), pour technique (filter) |
| **Weak/watery** | Low extraction | Finer grind, more coffee, higher temp |
| **Harsh/astringent** | Fines over-extracted | Coarser grind, better grinder, lower temp |

> 📄 **STATED**: "If you change your grind size, water temperature, and coffee ratio all at once, you won't know which factor did what" [Source: HexNub]

---

## 🔥 Roast Level Adjustment Guide

### Why Roast Level Matters

> 📄 **STATED**: "Light roasts are denser and less porous, requiring finer grinding to slow down
> extraction and draw out delicate citrus, floral, and tea-like notes" [Source: QIKA Coffee]

> 📄 **STATED**: "Dark roasts are more brittle and porous, needing a slightly coarser grind to
> prevent over-extraction and bitterness" [Source: QIKA Coffee]

### The Science

| Roast Level | Bean Density | Solubility | Extraction Speed |
|-------------|--------------|------------|------------------|
| Light | High (dense) | Low | Slow |
| Medium | Medium | Medium | Medium |
| Dark | Low (porous) | High | Fast |

> 📄 **STATED**: "The fundamental principle: Finer grounds create more surface area for water to
> interact with, increasing extraction efficiency" [Source: Savor Suite]

### Grind Adjustment by Roast

**When switching roasts, adjust 2-3 clicks:**

| Switching From → To | Grind Adjustment |
|---------------------|------------------|
| Dark → Light | Go FINER (2-3 clicks) |
| Light → Dark | Go COARSER (2-3 clicks) |
| Medium → Light | Go slightly FINER (1-2 clicks) |
| Medium → Dark | Go slightly COARSER (1-2 clicks) |

> 📄 **STATED**: "The difference between optimal and suboptimal grinds can be just 2-3 clicks on
> a quality grinder" [Source: Savor Suite]

### Temperature Adjustment by Roast

| Roast Level | Temperature | Reasoning |
|-------------|-------------|-----------|
| Light | 94-96°C | Higher temp accelerates slow extraction |
| Medium | 92-94°C | Balanced |
| Dark | 88-92°C | Lower temp prevents over-extraction |

> 📄 **STATED**: "The normal rule is lower temperatures for darker roasts and higher temperatures
> for lighter roasts" [Source: Perfect Daily Grind]

### Espresso: Roast-Specific Parameters

| Parameter | Light Roast | Dark Roast |
|-----------|-------------|------------|
| Grind texture | Fine table salt | Granulated sugar |
| Extraction time | 28-35s | 22-28s |
| Brew ratio | 1:2 to 1:2.5 | 1:1.5 to 1:2 |
| Temperature | 94-96°C | 88-92°C |

> 📄 **STATED**: "Light roast beans maintain higher density and harder structure, making them
> naturally resistant to water penetration" [Source: Savor Suite]

### Your Grinders: Roast Adjustment

**Timemore 078S (Espresso)**

| Roast | Setting Range | Adjustment from Medium |
|-------|---------------|------------------------|
| Light | 0.6 - 1.2 | -0.4 to -0.6 finer |
| Medium | 1.2 - 1.8 | Baseline |
| Dark | 1.8 - 2.4 | +0.4 to +0.6 coarser |

**Commandante C40 (Filter)**

| Method | Light Roast | Medium | Dark Roast |
|--------|-------------|--------|------------|
| V60 | 22-25 clicks | 25-28 clicks | 28-32 clicks |
| Chemex | 38-42 clicks | 42-45 clicks | 45-48 clicks |
| Aeropress | 18-21 clicks | 21-24 clicks | 24-28 clicks |

### Brew Time Adjustment

> 📄 **STATED**: "The lighter the roast, the longer the steep, as this allows more flavours to
> develop" [Source: Spiller & Tait]

| Roast Level | Time Adjustment |
|-------------|-----------------|
| Light | +15-30s longer |
| Medium | Baseline |
| Dark | -15-30s shorter |

### Quick Decision Matrix

```text
IF switching to LIGHTER roast:
   → Grind FINER (2-3 clicks)
   → Temperature HIGHER (+2-4°C)
   → Time LONGER (+15-30s)
   → Ratio can be HIGHER (more water)

IF switching to DARKER roast:
   → Grind COARSER (2-3 clicks)
   → Temperature LOWER (-2-4°C)
   → Time SHORTER (-15-30s)
   → Ratio can be LOWER (less water)
```text

---

## 📊 Quick Reference: Your Grinder Settings

### Timemore 078S (Espresso)

| Setting | Use Case |
|---------|----------|
| 0.6 - 1.0 | Light roasts, high pressure |
| 1.0 - 1.8 | Medium roasts, standard |
| 1.8 - 2.6 | Dark roasts, lower extraction |

### Commandante C40 (Filter)

| Clicks | Brew Method |
|--------|-------------|
| 10-15 | Espresso-style Aeropress |
| 20-22 | Standard Aeropress |
| 23-28 | V60 (single cup) |
| 28-32 | V60 (larger brew) |
| 40-45 | Chemex |

---

## 🧪 The Scientific Method for Coffee

```text
HYPOTHESIS → Make a prediction about taste outcome
CONTROL → Keep all variables constant except ONE
TEST → Change that ONE variable
MEASURE → Time extraction, weigh output
TASTE → Evaluate objectively
RECORD → Keep a brew journal
ITERATE → Adjust based on results
```text

> 📄 **STATED**: "Keeping a brewing journal can be extremely helpful—record your variables and tasting notes for each brew" [Source: HexNub]

---

## ❓ What Sources DON'T Cover

- **Specific altitude/pressure adjustments** - Not addressed in sources
- **Water mineral composition effects** - Only briefly mentioned ("Higher TDS water will benefit from cooler temps")
- **Bean age sweet spot** - General freshness mentioned but no specific day ranges
- **Seasonal adjustment patterns** - Not discussed
- **Machine-specific temperature profiling** - Not covered for home equipment

---

## 📚 Sources

| # | Source | URL | Type |
|---|--------|-----|------|
| 1 | Espresso Aficionados | [espressoaf.com](https://espressoaf.com/guides/beginner.html) | Guide |
| 2 | Honest Coffee Guide | [honestcoffeeguide.com](https://honestcoffeeguide.com/timemore-sculptor-078s-grind-settings/) | Settings |
| 3 | Basic Barista | [thebasicbarista.com](https://thebasicbarista.com/en-us/blogs/article/comandante-grind-size-chart) | Chart |
| 4 | Coffeedesk | [coffeedesk.com](https://www.coffeedesk.com/blog/how-to-set-the-comandante-grinder/) | Guide |
| 5 | Counter Culture | [counterculturecoffee.com](https://counterculturecoffee.com/blogs/counter-culture-coffee/guide-to-the-aeropress) | Guide |
| 6 | Low Key Coffee Snobs | [lowkeycoffeesnobs.com](https://www.lowkeycoffeesnobs.com/hario-v60-recipe/) | Recipe |
| 7 | Bean Ground | [beanground.com](https://www.beanground.com/chemex-grind-size/) | Guide |
| 8 | HexNub | [hexnub.com](https://www.hexnub.com/blogs/news/chemex-ratio-a-chemex-brewing-guide) | Guide |
| 9 | Coffee Geek TV | [coffeegeek.tv](https://coffeegeek.tv/aeropress-grind-size/) | Guide |
| 10 | Daniel Norris | [danielnorris.com](https://www.danielnorris.com/blog/baratza-encore-grind-settings-for-v60-dialing-in-the-perfect-pour-over) | Guide |
| 11 | Cafely | [cafely.com](https://cafely.com/blogs/coffee-brew-guide/chemex) | Guide |
| 12 | Perfect Daily Grind | [perfectdailygrind.com](https://perfectdailygrind.com/2019/10/how-to-adjust-your-brewing-recipe-for-coffee-roast-level/) | Guide |
| 13 | Savor Suite | [savorsuite.com](https://savorsuite.com/espresso-grind-size-light-dark-roasts/) | Guide |
| 14 | QIKA Coffee | [qikacoffee.com](https://www.qikacoffee.com/news/how-to-match-coffee-grind-size-with-roast-levels-a-guide-for-perfect-extraction/) | Guide |
| 15 | Spiller & Tait | [spillerandtait.co.uk](https://www.spillerandtait.co.uk/blogs/news/how-to-adjust-your-coffee-brewing-to-fit-the-roast-level) | Guide |

---

## 🔗 Related

[[Coffee MOC]], [[Brewing Methods]], [[Grinder Settings]]

---

**Suggested location:** 3_Resources/Coffee/
**Potential MOCs:** [[Coffee MOC]], [[Brewing Techniques MOC]]
**Tags:** #coffee #brewing #espresso #pourover #grinder-settings
