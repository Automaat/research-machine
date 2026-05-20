# 🧠 Language Learning with Flashcards — Comprehensive Research

**Date:** 2026-04-06
**Tags:** #research #language-learning #flashcards #spanish #SRS #app-design
**Focus:** Building a personal Spanish learning flashcard app

---

## 1. 📊 Spaced Repetition Systems (SRS) — The Core Engine

### The Science

- **Ebbinghaus Forgetting Curve (1885):** Without review, ~56% of new material forgotten within 1 hour, ~66% after 1 day, ~75% after 6 days
- **Testing Effect (Roediger & Karpicke, 2006):** Active recall during testing produces stronger memory traces than re-reading. Retrieval practice boosts long-term retention by 50-80%
- **Desirable Difficulties (Bjork, 1994):** Making retrieval harder (longer intervals, interleaving) strengthens memory, even though it *feels* less effective
- **Spacing Effect:** Distributed practice over time vastly outperforms massed practice (cramming). One of the most robust findings in cognitive psychology

### Algorithm Comparison

| Algorithm | Pros | Cons | Best For |
|-----------|------|------|----------|
| **Leitner System** | Dead simple (5 boxes), intuitive | Fixed intervals, no personalization | Paper flashcards, beginners |
| **SM-2 (SuperMemo 2)** | Well-understood, battle-tested (Anki uses it), simple math | No per-user optimization, fixed ease factor decay | Proven default for any SRS app |
| **SM-17/18** | Most theoretically advanced, models memory at neuronal level | Proprietary (SuperMemo), extremely complex, needs massive data | SuperMemo only |
| **FSRS (Free Spaced Repetition Scheduler)** | Open-source, ML-optimized, outperforms SM-2 by ~15-30% in studies, personalized | Newer (less battle-tested), needs ~1000 reviews for full optimization | **Recommended for new app** |
| **Half-Life Regression (Duolingo)** | Designed for millions of users, A/B tested extensively | Proprietary, designed for Duolingo's specific use case | Large-scale platforms |

### 🏆 Recommendation: FSRS

- Created by Jarrett Ye, adopted by Anki in v23.10+ as alternative scheduler
- Uses a 19-parameter model trained on user review history
- **Open-source implementations:**
  - `ts-fsrs` (TypeScript) — npm package, most actively maintained
  - `go-fsrs` (Go) — lightweight
  - `py-fsrs` (Python) — reference implementation
  - `fsrs-rs` (Rust) — high performance, used by Anki
  - `rs-fsrs` / `fsrs4anki` — Anki integration
- Default parameters work well for cold-start; personalization kicks in after ~1000 reviews
- Key advantage: adapts to individual memory patterns, not just item difficulty

### SM-2 Algorithm (Fallback/Simple Option)

```
If grade >= 3 (correct):
  interval = previous_interval * ease_factor
  ease_factor = max(1.3, ease_factor + (0.1 - (5-grade) * (0.08 + (5-grade) * 0.02)))
If grade < 3 (incorrect):
  interval = 1 day
  ease_factor unchanged (but repeated failures decrease it)

Initial intervals: 1 day → 6 days → then EF-based
```

---

## 2. 🃏 Optimal Flashcard Design

### Card Types (Best → Worst for Language Learning)

1. **Cloze Deletion in Sentences** — "Yo ___ (querer) ir al parque" → Best for grammar + context
2. **Sentence Cards (i+1)** — Full sentence with ONE unknown element. Krashen's comprehensible input in card form
3. **Image + Word Cards** — Photo/illustration paired with target word. Dual coding theory: 2 memory traces > 1
4. **Audio → Meaning Cards** — Hear Spanish, produce English. Critical for listening comprehension
5. **Basic Word Cards** — Single word front/back. Fast to create but weakest retention
6. **Reverse Cards (Productive)** — English → Spanish. Harder but essential for speaking/writing

### The Minimum Information Principle (Wozniak)

- Each card should test exactly ONE piece of knowledge
- **Bad:** "What are the conjugations of 'hablar'?" (too many answers)
- **Good:** "Yo ___ (hablar) español" → "hablo"
- Smaller atomic cards = higher retention + more precise scheduling

### Research-Backed Design Rules

- **Add audio to every card** — Dual encoding (visual + auditory) improves retention ~30% (Mayer, 2009)
- **Add images where possible** — Paivio's Dual Coding Theory: concrete words with images retained 2x better
- **Use sentences, not isolated words** — Nation (2001): words learned in context transfer better to real use
- **One direction per card** — Receptive (Spanish→English) and productive (English→Spanish) are different skills; schedule separately
- **Avoid similar cards close together** — Interference: "pero" vs "perro", "ser" vs "estar" should not appear in same session initially

### Card Templates for Spanish

```
TYPE 1: Vocabulary (Receptive)
Front: 🔊 [audio] "la mariposa" + 🦋 [image]
Back: butterfly

TYPE 2: Vocabulary (Productive)  
Front: butterfly 🦋
Back: 🔊 la mariposa

TYPE 3: Cloze Sentence
Front: "Ella ___ (tener) tres gatos"
Back: "tiene" — She has three cats

TYPE 4: Listening Comprehension
Front: 🔊 [full sentence audio only]
Back: Written sentence + translation

TYPE 5: Conjugation Pattern
Front: "hablar — yo — presente"
Back: "hablo"

TYPE 6: Gender
Front: "mariposa — ¿el o la?"
Back: "la mariposa" (feminine)
```

---

## 3. 🇪🇸 Spanish-Specific Strategies

### Vocabulary Coverage by Frequency

| Words Known | Text Comprehension | CEFR Level |
|-------------|-------------------|------------|
| 250 | ~65% | Pre-A1 |
| 500 | ~75% | A1 |
| 1,000 | ~82% | A1-A2 |
| 2,000 | ~88% | A2-B1 |
| 3,000 | ~92% | B1 |
| 5,000 | ~95% | B1-B2 |
| 8,000 | ~97% | B2-C1 |
| 10,000+ | ~98%+ | C1+ |

- **Target for "quick fluency":** 3,000-5,000 words covers 92-95% of daily conversation
- **FSI estimate:** Spanish is Category I (easiest for English speakers) — ~600-750 classroom hours for professional proficiency
- **Realistic self-study:** A1 in 2-3 months, B1 in 6-9 months, B2 in 12-18 months with consistent daily practice

### Cognate Goldmine 🏆

- ~1,000+ Spanish-English cognates due to shared Latin roots
- **Patterns to teach systematically:**
  - `-tion` → `-ción`: nation → nación, information → información
  - `-ty` → `-dad`: university → universidad, city → ciudad  
  - `-ous` → `-oso`: famous → famoso, delicious → delicioso
  - `-ment` → `-mento`: moment → momento, document → documento
  - `-ble` → `-ble`: possible → posible, terrible → terrible
  - `-al` → `-al`: animal → animal, hospital → hospital
  - `-ence/-ance` → `-encia/-ancia`: independence → independencia
- **App idea:** "Cognate engine" — teach patterns first, then unlock hundreds of words instantly

### False Friends (Falsos Amigos) — Must Include

| Spanish | Looks Like | Actually Means |
|---------|-----------|----------------|
| embarazada | embarrassed | pregnant |
| éxito | exit | success |
| constipado | constipated | having a cold |
| sensible | sensible | sensitive |
| realizar | realize | to carry out/achieve |
| actual | actual | current |
| asistir | assist | to attend |
| carpeta | carpet | folder |
| librería | library | bookstore |
| molestar | molest | to bother |

### Verb Conjugation Strategy

**Priority order for learning:**

1. Present indicative (daily use ~60% of spoken Spanish)
2. Preterite (completed past actions)
3. Imperfect (descriptions, habitual past)
4. Present progressive (estar + gerund)
5. Near future (ir + a + infinitive) — easier than future tense
6. Imperative (commands)
7. Conditional
8. Subjunctive (introduce at B1+, don't front-load)

**Most important irregular verbs first:**
ser, estar, ir, tener, hacer, poder, querer, saber, decir, venir, dar, ver, poner, salir

### Regional Considerations

- **Default to Latin American Spanish** — larger speaker population, more consistent pronunciation
- **Key differences to flag:**
  - `vosotros` (Spain only) vs `ustedes` (Latin America)
  - `coger` (Spain: to take, Latin America: vulgar)
  - Pronunciation: Spain has /θ/ for c/z (ceceo), Latin America doesn't
- **App setting:** Let user choose region, adjust audio/vocabulary accordingly

---

## 4. 🧪 Memory Science & Mnemonics

### Keyword Method (Atkinson & Raugh, 1975)

- Find English word that *sounds like* the Spanish word, create vivid mental image
- **Example:** "perro" (dog) → "pear" → Imagine a dog balancing a pear on its nose
- **Research:** 50-100% improvement in initial vocabulary acquisition vs rote memorization
- **App integration:** AI-generate keyword associations + images for each new word

### Dual Coding Theory (Paivio, 1971)

- Verbal + visual encoding creates 2 independent memory traces
- Images improve word retention by 200-300% for concrete nouns
- Less effective for abstract words — use context sentences instead
- **App:** Auto-generate or source images for concrete vocabulary

### Levels of Processing (Craik & Lockhart, 1972)

- **Shallow:** "Does this word contain the letter 'a'?" → Poor retention
- **Structural:** "Does this word rhyme with X?" → Moderate retention  
- **Deep/Semantic:** "Use this word in a sentence about your life" → Best retention
- **App implication:** Include exercises that force deep processing (sentence creation, personal connections)

### Sleep & Review Timing

- **Pre-sleep review is optimal** — Memory consolidation happens during sleep (Walker, 2017)
- New memories replayed during slow-wave sleep, strengthened during REM
- **Optimal schedule:** Review new cards in evening, review due cards in morning
- **App feature:** Suggest optimal review times based on user's sleep schedule

### Context vs. Isolation

- **Initial learning:** Some context helps (sentence > isolated word), but too much overwhelms
- **i+1 Principle (Krashen):** Sentence should contain exactly ONE unknown element
- **Transfer:** Words learned in varied contexts transfer better to new situations
- **App:** Show same word in 3-5 different sentence contexts over time

### Chunking for Vocabulary

Group by:

- **Semantic fields:** kitchen items, emotions, travel, body parts
- **Morphological families:** trabajo/trabajar/trabajador
- **Collocations:** "hacer ejercicio", "tener hambre", "dar un paseo"
- **Situational:** ordering at restaurant, asking directions, at the doctor
- **NOT alphabetical** — no cognitive benefit

### Interleaving vs. Blocking

- **Blocking:** Study all food words, then all travel words (feels easier, less effective)
- **Interleaving:** Mix categories within session (feels harder, 20-50% better retention)
- **App:** Default to interleaved review; offer topic-focused sessions as supplement only

---

## 5. 🤖 AI-Powered Features for the App

### LLM Conversation Practice

- **Chatbot tutor:** Practice conversations with AI in Spanish at user's level
- Adjust complexity based on CEFR level
- Correct errors inline with explanations
- Role-play scenarios: restaurant, shopping, doctor, travel
- **Tech:** Claude API / GPT-4 with system prompt constraining language level

### AI-Generated Content

- **Contextual example sentences** for each vocabulary word at user's level
- **Mnemonic generation:** AI creates keyword mnemonics + vivid descriptions for each word
- **Story generation:** Short stories using recently learned vocabulary (graded readers on demand)
- **Card generation from content:** User pastes article/URL → AI extracts vocabulary + creates cards

### Pronunciation

- **TTS options for Spanish:**
  - ElevenLabs — most natural, expensive
  - Google Cloud TTS — good quality, affordable, multiple Spanish voices (ES, MX, AR, CO)
  - Amazon Polly — decent, cheap
  - Azure Cognitive Services — good neural voices
  - OpenAI TTS — excellent quality
  - Edge TTS (free) — surprisingly good, Microsoft neural voices
- **STT for pronunciation checking:**
  - Whisper (OpenAI) — best accuracy, can run locally
  - Google Speech-to-Text
  - Azure Speech Services — has pronunciation assessment API (scores phonemes)
  - **Azure Pronunciation Assessment** is the most detailed: scores at phoneme, word, and sentence level

### Adaptive Difficulty

- Track accuracy per word, category, grammar point
- Auto-adjust session difficulty
- Identify weak areas and increase review frequency
- Suggest when user is ready for next CEFR level

---

## 6. 📱 Beyond Flashcards — Complementary Features

### Reading Practice

- **Graded readers:** AI-generated stories at user's level
- **Tap-to-translate:** Read Spanish text, tap unknown words to add to deck
- **Immersion mode:** Replace random English words in articles with Spanish equivalents (like Toucan browser extension)

### Listening Practice

- **Dictation exercises:** Listen to sentence, type what you hear
- **Speed control:** Slow down audio for beginners
- **Minimal pairs:** Practice distinguishing similar sounds (pero/perro, caro/carro)

### Writing Practice

- **Sentence reconstruction:** Given words, build correct sentence
- **Free writing with AI correction:** Write paragraph, get grammar feedback
- **Translation challenges:** Translate English → Spanish with scoring

### Grammar Exercises

- **Conjugation drills:** Timed verb conjugation practice
- **Gender agreement:** Match articles to nouns
- **Sentence transformation:** Change tense, person, mood

### Gamification (Evidence-Based)

- **Streaks** — Most impactful single mechanic (Duolingo data). 7-day streak = 2x retention vs sporadic use
- **Daily goals** — "Review 20 cards" more effective than "Study 30 minutes" (clear completion signal)
- **Progress visualization** — Words known, % of frequency list covered, CEFR progress bar
- **Spaced repetition forecast** — Show upcoming review load, celebrate "zero reviews due"
- **Avoid:** Leaderboards (demotivating for slower learners), excessive XP systems (distract from learning)

---

## 7. 🏗️ Technical Architecture Recommendations

### Data Model (Core Entities)

```
Card {
  id, deck_id, card_type, 
  front_content, back_content,
  audio_url, image_url,
  tags[], cefr_level,
  created_at
}

ReviewLog {
  id, card_id, 
  rating (1=Again, 2=Hard, 3=Good, 4=Easy),
  review_duration_ms,
  scheduled_date, actual_date,
  state (new/learning/review/relearning)
}

FSRSParams {
  card_id,
  difficulty, stability, 
  due_date, last_review,
  elapsed_days, scheduled_days,
  reps, lapses, state
}

UserProgress {
  user_id, 
  words_known, cards_mature,
  current_streak, longest_streak,
  daily_reviews_target,
  review_time_preference
}

Deck {
  id, name, description,
  cefr_level, category,
  card_count
}
```

### Recommended Stack

- **Frontend:** React Native (iOS + Android) or Swift (iOS-only for speed)
- **Backend:** Lightweight — most logic can be client-side
- **Database:** SQLite (offline-first, like Anki) + optional cloud sync
- **SRS Engine:** `ts-fsrs` or `fsrs-rs` (via WASM)
- **TTS:** Edge TTS (free) for MVP, ElevenLabs/OpenAI for premium
- **AI features:** Claude API for conversation, mnemonics, content generation
- **Audio storage:** Pre-generate TTS for core vocabulary, on-demand for user-added cards

### Offline-First Architecture

- All cards, scheduling data, and core audio stored locally
- AI features require network (conversation, mnemonic generation)
- Sync via simple event log (CRDT-like) for multi-device
- Pre-download deck audio packs

---

## 8. 📚 Content Sources

### Frequency Lists

- **Wikipedia frequency lists** — Based on subtitle corpora, freely available
- **Corpus del Español** (Mark Davies, BYU) — 2 billion word corpus
- **OpenSubtitles frequency list** — Based on movie/TV subtitles, reflects spoken Spanish
- **Wiktionary frequency lists** — Community-maintained

### Sentence Sources

- **Tatoeba** — 500k+ Spanish sentences with translations, CC-licensed
- **OpenSubtitles** — Parallel corpus, conversational Spanish
- **News articles** — For advanced vocabulary in context

### Audio

- **Forvo** — Native speaker pronunciations (API available)
- **TTS generation** — For consistent quality across all cards
- **Tatoeba audio** — Some sentences have native recordings

---

## 9. 🎯 Recommended MVP Feature Set

### Phase 1 — Core (Week 1-2)

- [ ] FSRS scheduling engine (use `ts-fsrs`)
- [ ] Basic card types: vocabulary (receptive + productive), cloze sentence
- [ ] Pre-built deck: Top 1000 Spanish words with audio (TTS-generated)
- [ ] Daily review sessions with streak tracking
- [ ] Simple progress stats (words known, daily reviews)

### Phase 2 — Enhanced Learning (Week 3-4)

- [ ] Image support on cards
- [ ] Cognate pattern lessons (unlock vocabulary fast)
- [ ] Verb conjugation drill mode
- [ ] Listening-only card type
- [ ] CEFR level tracking

### Phase 3 — AI Features (Week 5-6)

- [ ] AI mnemonic generation for each word
- [ ] AI conversation practice (text-based)
- [ ] Auto-generate cards from pasted text/URLs
- [ ] AI-generated example sentences in context

### Phase 4 — Advanced (Week 7+)

- [ ] Pronunciation practice with STT scoring
- [ ] Graded reader with tap-to-add
- [ ] Immersion text replacement
- [ ] Dictation exercises
- [ ] Multi-device sync

---

## 10. 🔑 Key Takeaways

1. **Use FSRS** — It's the state-of-the-art open-source SRS algorithm, 15-30% better than SM-2
2. **Sentence cards > word cards** — Context dramatically improves retention and transfer
3. **Audio on every card** — Dual encoding is one of the strongest memory effects
4. **Exploit cognates** — English-Spanish cognate patterns can unlock 1000+ words fast
5. **Cloze deletions for grammar** — More effective than explicit grammar rules
6. **Interleave everything** — Mix topics in review sessions
7. **Evening learning, morning review** — Leverage sleep consolidation
8. **Deep processing** — Force users to engage with meaning, not just recognize
9. **Streaks work** — Simple daily streak is the most effective gamification
10. **i+1 sentences** — Each sentence should have exactly one unknown element

---

## Sources & References

- Ebbinghaus, H. (1885). Memory: A Contribution to Experimental Psychology
- Roediger & Karpicke (2006). "Test-Enhanced Learning" — Psychological Science
- Bjork, R. (1994). "Memory and Metamemory Considerations in the Training of Human Beings"
- Krashen, S. (1982). Principles and Practice in Second Language Acquisition
- Nation, I.S.P. (2001). Learning Vocabulary in Another Language
- Paivio, A. (1971). Imagery and Verbal Processes (Dual Coding Theory)
- Craik & Lockhart (1972). "Levels of Processing" — Journal of Verbal Learning
- Atkinson & Raugh (1975). "An Application of the Mnemonic Keyword Method"
- Mayer, R. (2009). Multimedia Learning
- Walker, M. (2017). Why We Sleep
- Wozniak, P. — SuperMemo documentation on SM-2 through SM-18
- Ye, J. — FSRS algorithm paper and open-spaced-repetition GitHub org
- Davies, M. — Corpus del Español (BYU)

---

**Suggested location:** 3_Resources/Language-Learning/
**Potential MOCs:** [[Language Learning]], [[Spanish]], [[Memory Science]], [[App Development]]
**Tags:** #flashcards #SRS #spanish #FSRS #language-learning #app-design
