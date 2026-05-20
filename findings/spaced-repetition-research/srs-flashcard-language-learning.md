# Spaced Repetition Systems & Flashcard-Based Language Learning

**Date:** 2026-04-06
**Tags:** #research #srs #flashcards #language-learning #algorithms #app-design
**Focus:** Comprehensive research for building a flashcard-based language learning app

---

## 1. Core SRS Algorithms

### 1.1 SM-2 (SuperMemo Algorithm 2)

📅 **Created:** 1987 by Piotr Wozniak
🏗️ **Used by:** Anki (modified), Mnemosyne, hundreds of apps

**How it works:**

- 4 inputs: quality rating (0-5), repetition count, previous ease factor, previous interval
- 3 key variables:
  - **n** = repetition number (successful recalls in a row)
  - **EF** (Ease Factor) = how quickly intervals grow, initial value 2.5
  - **I** (Interval) = days until next review
- Interval schedule: I(1)=1, I(2)=6, I(n)=I(n-1)*EF for n>2
- EF updated after each review: EF' = EF + (0.1 - (5-q) *(0.08 + (5-q)* 0.02))
- If quality < 3: reset repetition count to 0, restart from I(1)=1
- EF never drops below 1.3

**Pros:**

- ✅ Extremely simple to implement (~50 lines of code)
- ✅ No ML, no datasets, no training needed
- ✅ Battle-tested for 35+ years
- ✅ Open-source, well-documented
- ✅ 200-300% better retention vs cramming
- ✅ Adapts per-card (difficult cards appear more often)

**Cons:**

- ❌ Treats each card independently (no inter-card relationships)
- ❌ "Low interval hell" — repeated failures trap cards at minimum intervals
- ❌ Same formula for everyone (no personalization)
- ❌ Only considers latest review score, ignores full review history
- ❌ Fixed intervals don't account for individual memory decay curves
- ❌ Ease factor drift: over time, many cards settle at minimum EF (1.3)
- ❌ Not designed to predict recall probability

---

### 1.2 SM-17 / SM-18 (SuperMemo)

📅 **SM-17:** 2016 | **SM-18:** 2019
🏗️ **Used by:** SuperMemo (proprietary, Windows-only)

**Key innovation: Two Component Model of Memory**

- SM-17 was first algorithm fully based on two component model of long-term memory
- Tracks both **retrievability** (probability of recall) AND **stability** (storage strength)
- Largest qualitative change in history of spaced repetition algorithms

**SM-17 specifics:**

- Uses hill climbing optimization for parameter estimation
- Predictive accuracy: 37.12% least squares metric (vs SM-2's 53.57% — lower is better)
- ~30% improvement in prediction accuracy over SM-2

**SM-18 improvements over SM-17:**

- Better approximation of the stabilization function
- Changed difficulty computation method
- Greatly simplified implementation
- Dramatically reduced computational cost (no hill climbing)
- Equal or superior effectiveness to SM-17

**Pros:**

- ✅ Most scientifically advanced algorithms (decades of research)
- ✅ Two component memory model = much better predictions
- ✅ Incremental reading feature (unique to SuperMemo)

**Cons:**

- ❌ Proprietary — cannot use in your own app
- ❌ Windows-only
- ❌ Extremely complex implementation
- ❌ Undocumented implementation details

---

### 1.3 FSRS (Free Spaced Repetition Scheduler)

📅 **Created:** 2022 by Jarrett Ye | **Current:** FSRS-6 (2025)
🏗️ **Used by:** Anki (since 23.10), RemNote, growing ecosystem
📜 **License:** MIT (fully open source)

**How it works — DSR (Difficulty, Stability, Retrievability) Model:**

Three memory state variables:

- **Stability (S):** Time in days for retrievability to drop from 100% to 90%. S=365 means 1 year before R hits 90%
- **Retrievability (R):** Probability of successful recall right now
- **Difficulty (D):** How hard it is to increase stability (range 1-10)

**Core formulas:**

🔢 **Forgetting curve (FSRS-4.5+):**

```
R(t, S) = (1 + FACTOR * t/S)^DECAY
where DECAY = -0.5, FACTOR = 19/81
```

🔢 **Interval calculation:**

```
I = S / ((desired_retention)^(1/DECAY) - 1)
```

🔢 **Stability after successful recall:**

```
S' = S * (1 + e^w9 * f(D) * f(S) * f(R) * grade_modifier)
where f(D) = (11-D)/10, f(S) = S^(-w8), f(R) = e^(w7*(1-R)) - 1
```

Key insight: Higher S → smaller stability increase (harder to make stable memories even more stable). Lower R → larger stability increase (spacing effect).

🔢 **Stability after forgetting:**

```
S' = w11 * D^(-w12) * ((S+1)^w13 - 1) * e^(w14*(1-R))
```

🔢 **Difficulty update:**

```
D' = D + e^w6 * (w4 - G)  [then mean reversion applied]
```

**Parameter count:** 21 parameters in FSRS-6 (first 4 = initial stability per rating, rest optimized via gradient descent from user's review history)

**Benchmark data (350M reviews, 9,999 users):**

- FSRS-6 beats SM-2 in **99.6%** of cases (superiority metric)
- FSRS-5 beats SM-2 in **97.4%** of cases
- 20-30% fewer reviews for same retention level
- Users report: medical students do 20-30% fewer daily reviews

**FSRS-6 new features:**

- Trainable DECAY parameter (w20) for personalized forgetting curve shape
- Same-day review handling (FSRS-5+)
- Recency weighting for better adaptation to changing study patterns

**Pros:**

- ✅ MIT licensed, open source, free
- ✅ Machine learning-based personalization from review history
- ✅ Dramatically better scheduling than SM-2 (99.6% superiority)
- ✅ 20-30% fewer reviews for same retention
- ✅ Few user-configurable parameters (algorithm figures them out)
- ✅ Implementations in Python, Rust, TypeScript, Go, Dart, Swift, C#
- ✅ Active development, strong community
- ✅ Can work with default parameters when no review history exists

**Cons:**

- ❌ Needs ~200+ reviews to optimize parameters well (cold start)
- ❌ More complex to implement than SM-2 (~100 lines minimum)
- ❌ Still relatively new (since 2022)
- ❌ Neural network approaches (RWKV) outperform FSRS by significant margin in benchmarks

---

### 1.4 Leitner System

📅 **Created:** 1970s by Sebastian Leitner
🏗️ **Used by:** Physical flashcard learners, some simple apps

**How it works:**

- Cards sorted into boxes (typically 3-5)
- All new cards start in Box 1
- Correct answer → move to next box
- Incorrect answer → back to Box 1
- Each box has increasing review intervals:
  - Box 1: every day
  - Box 2: every 2 days
  - Box 3: every 4 days
  - Box 4: every 8 days
  - Box 5: every 16 days

**Pros:**

- ✅ Dead simple to understand and implement
- ✅ Works great with physical cards
- ✅ Intuitive visual progress (cards moving through boxes)

**Cons:**

- ❌ Fixed intervals, no per-card adaptation
- ❌ No personalization whatsoever
- ❌ Harsh penalty: one mistake resets to Box 1
- ❌ Limited number of interval levels (usually 5-7 boxes)
- ❌ Massively outperformed by algorithmic approaches

---

### 🏆 1.5 Algorithm Recommendation for New App (2025-2026)

**Strong recommendation: FSRS**

| Factor | SM-2 | FSRS | Leitner |
|--------|------|------|---------|
| License | Open | MIT | N/A |
| Implementation effort | Low | Medium | Very Low |
| Accuracy | Baseline | 99.6% better | Worse |
| Personalization | None | ML-based | None |
| Review efficiency | Baseline | 20-30% fewer | Worse |
| Cold start | Works immediately | Good defaults, optimizes with data | Works immediately |
| Community/ecosystem | Huge | Growing fast | Minimal |
| Future-proof | Legacy | Active R&D | Legacy |

**Implementation strategy:**

1. Start with FSRS default parameters (no review history needed)
2. After 200+ reviews per user, run parameter optimization
3. Use the open-source implementations: [py-fsrs](https://github.com/open-spaced-repetition/py-fsrs), [rs-fsrs](https://github.com/open-spaced-repetition/rs-fsrs), [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs)
4. Set default desired retention to 90% (configurable 80-95%)
5. Fallback: SM-2 is acceptable if you need absolute simplicity, but FSRS default params work nearly as well and are equally simple to integrate

---

## 2. Optimal Flashcard Design for Language Learning

### 2.1 One-Sided vs Two-Sided Cards

📊 **Research finding:** Both directions needed for complete vocabulary acquisition

- **Receptive cards** (L2→L1): "What does 'maison' mean?" → "house"
  - Tests recognition/comprehension
  - Easier, faster to learn
  - Higher initial success rates
- **Productive cards** (L1→L2): "How do you say 'house'?" → "maison"
  - Tests production/active use
  - Harder, but more valuable for speaking
  - Research shows: receptive gains are larger than productive gains from flashcards

**🎯 Design recommendation:**

- Create BOTH directions as separate cards
- Productive direction more important for speaking goals
- Some apps (Anki) auto-generate both from one entry
- Consider weighting: show productive cards more frequently if speaking is the goal
- Don't show both directions in same session (interference)

---

### 2.2 Cloze Deletions vs Basic Cards

📊 **Wozniak's Rule #5:** "Cloze deletion is easy and effective"

**Cloze deletions** = sentence with blank: "Es importante que yo ___ español" → "hable"

**Advantages over basic Q&A cards:**

- ✅ Provides natural context (how the word actually appears in sentences)
- ✅ Tests grammar implicitly (word order, conjugation, agreement)
- ✅ Closer to real-world retrieval (you recall words in context, not isolation)
- ✅ Faster to create from existing text ("sentence mining")
- ✅ Reduces ambiguity (context constrains the answer)
- ✅ Great for grammar patterns, collocations, idioms

**When to use basic cards instead:**

- Pure vocabulary introduction (word + image)
- When context would make the answer too obvious
- Character/script learning (e.g., kanji, Arabic letters)

**🎯 Design recommendation:**

- Default to cloze deletions for intermediate+ learners
- Use basic cards for beginner vocabulary (word + image + audio)
- ONE deletion per card (multiple blanks defeats focused retrieval)
- Sentence should be authentic (from real content, not textbook-manufactured)

---

### 2.3 Image & Audio Impact on Retention

📊 **Dual Coding Theory** (Allan Paivio, 1971): verbal + visual encoding = superior recall

**Research evidence:**

- Learners score significantly higher on words annotated with **text + pictures** vs text only
- Visual processing activates different neural pathways than verbal — dual activation = stronger memory trace
- Each modality can **cross-activate** the other during recall
- Audio of native pronunciation helps with: phonological encoding, listening comprehension, reducing "reading accent"

**Specific findings:**

- Text + picture: significantly better than text alone
- Text + picture + audio: best combination for vocabulary
- Audio alone (without text): less effective than visual
- Images help memory and reduce "volatility" in recall (Wozniak Rule #6)

**🎯 Design recommendations:**

- **Always include audio** — native speaker pronunciation for every word/sentence
- **Include images for concrete nouns** — "dog" + 🐕 photo is powerful
- **Skip images for abstract words** — forced/artificial images can be counterproductive
- **Use images for context** — scene images for sentence cards help anchor memory
- Consider **graphic deletion** (image occlusion) for visual subjects (maps, diagrams)

---

### 2.4 Sentence Cards vs Word Cards vs Phrase Cards

| Type | Example | Best For | Drawbacks |
|------|---------|----------|-----------|
| **Word card** | maison → house | Beginners, raw vocabulary building | No context, no grammar, prone to interference |
| **Sentence card** | "Je vais à la ___" → "maison" | Intermediate+, grammar in context | Longer to review, harder to create well |
| **Phrase card** | "à la maison" → "at home" | Collocations, idioms, chunks | Limited to fixed expressions |

**Research consensus:**

- **Sentence mining from authentic content** = gold standard for intermediate+ learners
- "When you watch a show and hear a cool phrase, make that exact sentence into a flashcard — you remember it better because it came from something you cared about"
- Word cards acceptable for **beginners building basic vocabulary** (first 500-1000 words)
- Phrase cards excellent for **collocations and multi-word expressions** which are critical for natural fluency

**🎯 Design recommendation:**

- Beginner (0-1000 words): word cards with image + audio
- Intermediate (1000-5000): transition to sentence cloze cards from authentic content
- Advanced (5000+): sentence mining from native content (shows, books, podcasts)
- All levels: phrase cards for high-frequency collocations

---

### 2.5 The Minimum Information Principle

📊 **Wozniak's Rule #4** — the most impactful rule for card design

> "Each card should contain the smallest possible unit of knowledge. If you need more than one sentence on the back, you probably need more than one card."

**Why it matters:**

- Simple items are easier to **schedule** (the algorithm can predict recall accurately)
- Complex memories activate concepts **incompletely or in different sequences** depending on context
- Hard to produce **uniform increase in memory stability** during review of complex items
- Simple items = faster reviews = higher daily throughput

**Practical application:**

- ❌ Bad: "Conjugate 'hablar' in present tense" → "hablo, hablas, habla, hablamos, habláis, hablan"
- ✅ Good: Six separate cloze cards, one per person: "Yo ___ español" → "hablo"
- ❌ Bad: "What are the uses of 'por'?" → (paragraph of 8 uses)
- ✅ Good: Eight separate cards, each testing one usage in context

**Rule of thumb:** If the answer takes more than 5-10 seconds to evaluate, the card is too complex.

---

### 2.6 Interference Effects

📊 **Wozniak's Rule #11:** "Combat interference — similar items cause confusion and forgetting"

**What causes interference:**

- Similar-looking words: "affect" vs "effect", "ser" vs "estar"
- Same-category words learned simultaneously: colors, days of week, body parts
- Words with similar phonology in target language
- **Proactive interference:** old learning blocks new (knowing Spanish "padre" interferes with learning Italian "padre" with slightly different pronunciation)
- **Retroactive interference:** new learning disrupts old

**Research insight:** Interleaving similar items can actually **help** discrimination — but only if the learner has some base knowledge first.

**🎯 Design recommendations to combat interference:**

- **Don't introduce similar words in the same session** (space them across days)
- **Add distinguishing context cues** to similar cards
- **Use mnemonic differentiation:** if "ser" and "estar" both mean "to be", add memorable example sentences that highlight the difference
- **Personalize with examples** (Rule #14): personal references resist interference
- **Consider "minimal pairs" cards:** explicitly teach the distinction ("ser = permanent, estar = temporary: 'Soy alto' vs 'Estoy cansado'")
- For sets (days of week, etc.): don't make 7 cards simultaneously — introduce 2-3 at a time

---

## 3. Key Research Findings

### 3.1 Ebbinghaus Forgetting Curve (1885)

📊 **The foundational finding:**

- After learning new material: **50% forgotten within 30 minutes**
- After 24 hours: **70-80% forgotten**
- The curve is exponential/power-law decay, not linear
- BUT: each successful retrieval makes the curve shallower (slower forgetting)

**Modern replication (Murre & Dros, 2015, PLOS ONE):**

- Replicated Ebbinghaus with modern methodology
- Confirmed the basic shape of the forgetting curve
- The forgetting curve is not universal — it varies by material type, encoding strength, and individual

**Key implication for SRS:** The first review should happen within 1-2 days of initial learning. FSRS default initial stability values reflect this: S₀(Again)≈0.4 days, S₀(Hard)≈0.9, S₀(Good)≈2.6, S₀(Easy)≈6.4

---

### 3.2 Testing Effect (Retrieval Practice)

📊 **One of the most robust findings in cognitive psychology**

- Actively retrieving information from memory **strengthens** that memory far more than re-reading or passive review
- Roediger & Karpicke (2006): students who practiced retrieval retained **80%** after 1 week vs **36%** for re-readers
- The act of struggling to recall — even if you fail — still strengthens the memory trace
- Testing > re-studying even when total study time is equal
- Testing produces better **transfer** to new contexts (not just rote recall)

**Implication for app design:**

- ✅ ALWAYS require active recall (hide answer, attempt first)
- ❌ Never show both sides simultaneously
- ✅ Include a "reveal" step where user must consciously try before seeing answer
- ✅ Typing the answer (vs just thinking it) provides additional testing benefit

---

### 3.3 Desirable Difficulties (Robert Bjork)

📊 **Core principle:** Learning conditions that make initial encoding harder lead to better long-term retention

**Examples of desirable difficulties:**

- **Spacing** (vs massing): harder in short term, better long term
- **Interleaving** (vs blocking): mixing topics forces discrimination
- **Generation** (vs reading): producing answers > reading answers
- **Varied practice**: changing contexts strengthens generalization

**The key insight for SRS:**
> "If you review a card 5 minutes after learning it, the retrieval is trivially easy and produces little learning. If you review it 2 days later, the slight struggle to recall it produces a much stronger memory update."

This is exactly what FSRS models mathematically: lower R (more forgotten) → larger stability increase.

**Design implication:**

- Don't show cards too soon after learning (tempting but counterproductive)
- The "struggle zone" (70-90% retrievability) is where learning happens most
- FSRS default target of 90% retention is well-calibrated for this

---

### 3.4 Interleaving vs Blocking

📊 **Mixed results in language learning specifically:**

| Skill | Winner | Notes |
|-------|--------|-------|
| Vocabulary | Interleaving (slight edge) | Benefit may come from spacing, not interleaving per se |
| Grammar/conjugation | Interleaving | Helps distinguish similar tenses; Nakata & Suzuki (2019) |
| Pronunciation | Blocking | Blocking benefits pronunciation learning (Carpenter & Mueller, 2013) |

**Important nuance (Hwang, 2025):**

- For **low-achieving adolescents**, initial blocked practice was better
- Interleaving can be an "undesirable difficulty" if base knowledge is too low
- **Recommendation:** block first for beginners, then transition to interleaving

**🎯 Design recommendation:**

- New vocabulary: introduce in thematic blocks initially
- Review sessions: interleave across topics/decks
- Grammar: always interleave similar patterns (different tenses together)
- Give users control over interleaving intensity

---

### 3.5 Active Recall vs Passive Review

📊 **The spacing effect is "one of the most replicated results in all of experimental psychology"**

- Demonstrated across every age group
- In dozens of languages
- For material ranging from vocabulary to surgical procedures
- Neurons synthesize proteins that strengthen connections during spaced sessions
- During massed sessions, a competing process **blocks** those strengthening signals
- Neurons can literally "detect" whether a gap occurred between study sessions

**Quantified benefit:**

- Spaced repetition: **up to 200% better long-term retention** vs cramming
- Medical students using Anki: **5-10 point higher scores** on USMLE Step 1
- High-performing med students reviewed ~146,000 cards vs ~81,000 for low performers

---

## 4. Common Mistakes in Flashcard-Based Learning

### ❌ Mistake 1: Learning Without Understanding

- Memorizing before comprehending = fragile, quickly forgotten knowledge
- **Fix:** Ensure concept is clear before creating any cards (Wozniak Rule #1)

### ❌ Mistake 2: Cards Too Complex

- Multiple facts per card confuses the scheduling algorithm
- "The most durable flashcards contain a single clear question with a single clear answer"
- **Fix:** Apply minimum information principle ruthlessly

### ❌ Mistake 3: Passive Review (Not Covering Answer)

- Looking at both sides = feeling of familiarity without actual recall ability
- Creates dangerous **illusion of competence**
- **Fix:** Always force active recall before reveal

### ❌ Mistake 4: Adding Too Many New Cards at Once

- Leads to review pile-up and burnout within days
- Sustainable pace: **20-30 new cards/day** maximum
- **Fix:** Hard cap on daily new cards; queue system for pending cards

### ❌ Mistake 5: Inconsistent Reviews / Skipping Days

- Breaks the spacing schedule, causes pile-up
- SRS works by reviewing "right before you'd forget"
- **Fix:** Notifications, streaks, daily minimums. Keep review sessions short but daily

### ❌ Mistake 6: Vague or Ambiguous Cards

- "Photosynthesis" → ??? (too vague, where to begin?)
- **Fix:** Specific, answerable questions: "What gas do plants absorb during photosynthesis?" → "CO₂"

### ❌ Mistake 7: Isolated Facts Without Context

- "perro = dog" with no example sentence, no image, no audio
- Creates fragmented knowledge that can't be applied
- **Fix:** Context-rich cards: example sentence, image, audio, personal connection

### ❌ Mistake 8: Starting Too Late

- SRS needs weeks/months to distribute practice effectively
- Starting 2 weeks before exam captures only fraction of benefit
- **Fix:** Start immediately; SRS is a long-term system

### ❌ Mistake 9: Using Pre-Made Decks Exclusively

- Generic decks miss personal context and relevance
- "Sentence mining from content you enjoy beats any pre-made deck"
- **Fix:** Encourage user-created cards from authentic encounters with the language

### ❌ Mistake 10: Ignoring Leeches

- Some cards are repeatedly failed — "leeches" that waste review time
- They often indicate a bad card design, not a hard concept
- **Fix:** Auto-detect leeches (e.g., failed 8+ times). Prompt user to rewrite, split, or add mnemonics

---

## 5. Comparison of Existing Tools

### 5.1 Anki

| Aspect | Details |
|--------|---------|
| **Algorithm** | SM-2 (default) + FSRS (opt-in since 23.10) |
| **Price** | Free (desktop/Android), $24.99 iOS |
| **Platforms** | Windows, Mac, Linux, Android, iOS, Web (AnkiWeb) |
| **Card types** | Basic, cloze, image occlusion, custom HTML/CSS/JS |
| **Ecosystem** | Massive: thousands of shared decks, hundreds of add-ons |

**✅ Does well:**

- Ultimate customization (HTML/CSS/JS templates)
- FSRS integration makes it state-of-the-art
- Huge community, especially medical/language learning
- Add-on ecosystem (audio recorders, image scrapers, statistics)
- Offline-first, data export (open format)

**❌ Does poorly:**

- UI is dated and intimidating for new users
- Steep learning curve (needs YouTube tutorials for setup)
- Sync is clunky (AnkiWeb mediator)
- No built-in language-specific features (TTS, dictionary lookup)
- iOS app is expensive
- Card creation UX is complex

---

### 5.2 SuperMemo

| Aspect | Details |
|--------|---------|
| **Algorithm** | SM-18 (most advanced) |
| **Price** | Subscription (~$5/month or ~$60 lifetime) |
| **Platforms** | Windows only (desktop), web version exists but limited |
| **Unique feature** | Incremental reading |

**✅ Does well:**

- Most scientifically optimized algorithm (SM-18)
- Incremental reading: extract knowledge from articles → auto-generate cards
- 30+ years of research backing
- Priority queue system for managing large collections

**❌ Does poorly:**

- Windows only — dealbreaker for most
- UI is notoriously outdated and complex
- Extremely steep learning curve
- Proprietary algorithm (can't replicate)
- Small community compared to Anki
- No mobile app (only web, limited)

---

### 5.3 Memrise

| Aspect | Details |
|--------|---------|
| **Algorithm** | Proprietary (simplified SRS) |
| **Price** | Freemium ($8.49/month pro) |
| **Platforms** | Web, iOS, Android |
| **Focus** | Language learning specifically |

**✅ Does well:**

- Polished, engaging UI with gamification
- Native speaker video clips (real pronunciation in context)
- Good onboarding, low friction
- Pre-built courses for 20+ languages
- Community-created courses

**❌ Does poorly:**

- Algorithm is a black box, likely inferior to FSRS
- Limited customization (can't create complex card types)
- No cloze deletions
- Vocabulary focused, weak on grammar
- Pro features behind paywall
- Has been simplifying/removing community features over time

---

### 5.4 Mochi

| Aspect | Details |
|--------|---------|
| **Algorithm** | SM-2 variant |
| **Price** | Free tier + $7.99/month pro |
| **Platforms** | Web, Mac, Windows, Linux |
| **Unique feature** | Markdown-native card creation |

**✅ Does well:**

- Beautiful, modern, clean UI
- Markdown-based cards (developer-friendly)
- Low friction daily review experience
- Good balance of simplicity and power
- Supports cloze deletions, images, code blocks

**❌ Does poorly:**

- Small ecosystem (no massive add-on library)
- No community deck marketplace
- SM-2 algorithm (no FSRS option)
- Limited language-specific features
- Fewer card types than Anki
- No mobile app (web only on mobile)

---

### 5.5 RemNote

| Aspect | Details |
|--------|---------|
| **Algorithm** | SM-2 + FSRS (recently adopted) |
| **Price** | Free tier + $8/month pro |
| **Platforms** | Web, Mac, Windows, Linux, iOS, Android |
| **Unique feature** | Note-taking + flashcard generation hybrid |

**✅ Does well:**

- Notes → flashcards automatically (type `::` to create)
- FSRS algorithm support (one of first after Anki)
- Knowledge graph / concept linking
- Exam scheduler (set exam date, get study plan)
- PDF annotation → flashcard extraction
- Good UI, modern design

**❌ Does poorly:**

- Tries to do everything (notes + flashcards + PDF reader) — can feel bloated
- Performance issues with large collections
- Complex feature set, not as focused as pure SRS tools
- Pricing: many features behind paywall
- Smaller community than Anki
- Mobile apps less polished than desktop

---

### 5.6 Tool Comparison Matrix

| Feature | Anki | SuperMemo | Memrise | Mochi | RemNote |
|---------|------|-----------|---------|-------|---------|
| Best algorithm | FSRS ✅ | SM-18 ✅ | Proprietary ❌ | SM-2 ⚠️ | FSRS ✅ |
| UI quality | ⭐⭐ | ⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Customization | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Language features | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐ |
| Community/decks | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐ | ⭐⭐ |
| Onboarding ease | ⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Cross-platform | ⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Price | Free* | $$ | Freemium | Freemium | Freemium |
| Data portability | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

---

## 6. Actionable Design Recommendations for a New App

### 🏗️ Algorithm

1. **Use FSRS** — MIT licensed, best accuracy, active community
2. Start with default parameters, optimize after 200+ reviews
3. Default desired retention: 90% (let users adjust 80-95%)
4. Implement leech detection: flag cards failed 8+ times

### 📝 Card Design

5. **Default card type: sentence cloze** with audio
6. Support basic cards (for beginners) and cloze cards (for intermediate+)
7. One cloze deletion per card — never multi-blank
8. Always include: native audio, example sentence, optional image
9. Generate both receptive AND productive cards from each entry
10. Enforce minimum information principle in card creation UX

### 🧠 Learning Flow

11. Cap new cards at 20-30/day (user-adjustable)
12. Always force active recall before reveal
13. Support typing answers (optional but powerful)
14. Interleave review sessions across topics
15. Block introduction of similar words (space across days)

### 📊 Anti-Interference

16. Detect similar cards and warn users
17. Don't introduce confusable pairs in same session
18. Add context cues to disambiguate similar items

### 📱 Engagement

19. Daily review streaks / notifications
20. Progress visualization (cards mastered, retention rate)
21. Sentence mining feature (import from content user consumes)
22. Show estimated time-to-mastery per card/deck

### 🔬 Analytics

23. Track actual retention rate vs predicted (FSRS accuracy)
24. Show forgetting curve per user / per deck
25. Leech report with suggestions to improve cards
26. Weekly summary: reviews done, retention, new cards learned

---

## Sources

- [FSRS Algorithm Wiki](https://github.com/open-spaced-repetition/fsrs4anki/wiki/abc-of-fsrs)
- [FSRS Technical Explanation — Expertium](https://expertium.github.io/Algorithm.html)
- [FSRS Benchmark — Expertium](https://expertium.github.io/Benchmark.html)
- [Implementing FSRS in 100 Lines — Fernando Borretti](https://borretti.me/article/implementing-fsrs-in-100-lines)
- [SM-2 Algorithm Explained — Tegaru](https://tegaru.app/en/blog/sm2-algorithm-explained)
- [Algorithm SM-17 — supermemo.guru](https://supermemo.guru/wiki/Algorithm_SM-17)
- [SuperMemo Algorithm — supermemo.guru](https://supermemo.guru/wiki/SuperMemo_Algorithm)
- [20 Rules of Formulating Knowledge — SuperMemo](https://www.supermemo.com/en/blog/twenty-rules-of-formulating-knowledge)
- [Forgetting Curve — Wikipedia](https://en.wikipedia.org/wiki/Forgetting_curve)
- [Replication of Ebbinghaus Forgetting Curve — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4492928/)
- [Dual Coding Theory — ScienceDirect](https://www.sciencedirect.com/topics/neuroscience/dual-coding-theory)
- [Multimedia Input on Vocabulary Learning — Taylor & Francis](https://www.tandfonline.com/doi/full/10.1080/17501229.2022.2131791)
- [Interleaving and Rest on L2 Vocabulary — SAGE Journals](https://journals.sagepub.com/doi/10.1177/02676583251338768)
- [Interleaving vs Blocking Pronunciation — Springer](https://link.springer.com/article/10.3758/s13421-012-0291-4)
- [Undesirable Difficulty of Interleaving — Hwang 2025](https://onlinelibrary.wiley.com/doi/10.1111/lang.12659)
- [Effective Spaced Repetition — Borretti](https://borretti.me/article/effective-spaced-repetition)
- [FSRS vs SM-2 Guide — MemoForge](https://memoforge.app/blog/fsrs-vs-sm2-anki-algorithm-guide-2025/)
- [RemNote vs Others Comparison](https://help.remnote.com/en/articles/6025618-remnote-vs-anki-supermemo-and-other-spaced-repetition-tools)
- [Best Spaced Repetition Apps 2025](https://www.pdfflashcards.com/blog/spaced-repetition-apps)
- [Flashcard Best Practices — Migaku](https://migaku.com/blog/language-fun/flashcard-best-practices-language-learning)
- [Cloze Deletion Guide — Migaku](https://migaku.com/blog/language-fun/cloze-deletion-language-learning-guide)
- [Learning English Vocabulary from Word Cards — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9485613/)
- [History of FSRS for Anki — LessWrong](https://www.lesswrong.com/posts/G7fpGCi8r7nCKXsQk/the-history-of-fsrs-for-anki)
- [Spaced Repetition Anywhere — Jakob.space](https://jakob.space/blog/spaced-repetition-anywhere.html)
- [FSRS GitHub Repository](https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler)
