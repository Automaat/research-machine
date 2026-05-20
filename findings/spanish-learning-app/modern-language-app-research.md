# 🇪🇸 Modern Language Learning App — Research & Architecture Guide

**Date:** 2026-04-06
**Tags:** #research #language-learning #spanish #ai #srs #architecture
**Focus:** AI-powered features, SRS algorithms, TTS/STT, open-source ecosystem, innovative app patterns

---

## 1. 🤖 AI-Powered Features (2025-2026 State of Art)

### LLM-Based Conversation Practice (Chatbot Tutors)

The leading apps in this space:

- **Langua** — most realistic AI conversations, voices cloned from native speakers, detailed feedback on mistakes, vocabulary integration from your study sessions, optional grammar drills triggered by errors
- **Speak** (speak.com) — video call features with animated characters, AI-powered "Explain My Answer" and "Roleplay" modes, strong speaking focus
- **Talkpal** — realistic AI interactions with detailed feedback, good for building speaking confidence
- **Talkio AI** — 40+ languages, 134 dialects, 400+ AI tutors, real-time pronunciation feedback, $10/mo

**Key architectural pattern for chatbot tutors:**

- Use an LLM (Claude, GPT-4o) with a system prompt defining the tutor persona, learner level (CEFR A1-C2), and conversation constraints
- Maintain conversation history + learner profile (known vocab, weak grammar points)
- After each exchange, run a secondary LLM call for error detection/correction feedback
- Track vocabulary encountered in conversations for SRS integration
- A 2025 study showed 75% improvement in speaking scores over 8 weeks with AI practice apps

### AI-Generated Example Sentences in Context

- **Clozemaster approach:** cloze deletion (fill-in-the-blank) within real sentences, ordered by word frequency
- **LLM generation:** Generate contextual example sentences at the learner's level, using known vocabulary + 1 new word (i+1 comprehensible input)
- **Tatoeba corpus** (tatoeba.org) — 10M+ sentences with translations, open data, can be mined for authentic examples
- **Implementation:** Generate 3-5 example sentences per new word showing different usage contexts, grammatical patterns, and collocations

### Adaptive Difficulty Based on Learner Performance

- **Duolingo model:** spacing algorithm + adaptive paths that raise/lower difficulty based on performance
- **FSRS approach:** the algorithm inherently adapts — difficulty, stability, and retrievability are tracked per card and adjusted after every review
- **Beyond card-level:** track performance by grammar topic, vocabulary domain, and skill type (listening/reading/writing/speaking) to adapt lesson selection
- **Zone of proximal development:** present material slightly above current competence — if struggling, slow down and reinforce basics

### AI-Powered Pronunciation Feedback

**Dedicated pronunciation APIs (recommended for production):**

| Provider | Languages | Granularity | Pricing | Notes |
|----------|-----------|-------------|---------|-------|
| **SpeechSuper** | 8 langs (incl. Spanish) | Phoneme, syllable, word, sentence | Per-request | Scores pronunciation, fluency, rhythm, completeness |
| **Speechace** | Multiple | Phoneme-level | Subscription plans | Patented tech, used in exam prep, Fortune 500s |
| **ELSA API** | Multiple | Various levels | Per-request | Trained on 195 countries' accent data, unscripted + scripted modes |
| **Azure Speech** | 140+ locales | Word + phoneme | $16/1M chars | Pronunciation assessment built into Speech Service, IPA support |
| **Chivox** | Multiple | Pronunciation + oral | Enterprise | Widely used in smart education products |

**Open-source STT (for transcription, NOT pronunciation scoring):**

- **Whisper** (openai/whisper) — 680K hours training data, good Spanish support, but NOT designed for phoneme-level pronunciation assessment
- **whisper.cpp** (ggerganov/whisper.cpp) — CPU-optimized Whisper port, runs in browser via WASM
- **Approach:** Use Whisper for transcription → compare with target text → identify word-level mismatches. For phoneme-level feedback, you need a dedicated API

### Automatic Card Generation from Content

**Tools and approaches:**

- **Memo.ai** — upload PDFs, videos, websites → auto-generate flashcards, notes, tests
- **AnkiDecks** (anki-decks.com) — AI flashcard gen from PDFs, slides, video, notes; 50+ languages
- **vocabsieve** (github.com/FreeLanguageTools/vocabsieve) — sentence mining tool, auto-creates Anki cards with translations
- **mpvacious** (github.com/Ajatt-Tools/mpvacious) — TV show → Anki flashcard automation
- **fluentcards** (github.com/katspaugh/fluentcards) — Kindle lookup → Anki converter

**DIY pipeline for a custom app:**

1. Extract text from content (article, subtitle file, podcast transcript via Whisper)
2. Tokenize + lemmatize with spaCy (Spanish model: `es_core_news_sm` or `es_dep_news_trf`)
3. Filter against user's known vocabulary list
4. Look up unknown words in dictionary (Wiktionary data via wiktextract)
5. Rank by frequency (use `wordfreq` library — 44 languages)
6. Generate cloze cards with the original sentence as context
7. Add TTS audio for the sentence
8. Feed into SRS scheduler

### Image Generation for Visual Mnemonics

- **Research finding:** AI-generated mnemonic images significantly improved immediate AND delayed vocabulary recall vs. traditional methods
- **DALL-E 2** was preferred over Midjourney/Stable Diffusion in comparative studies for mnemonic quality
- **AnkiAIUtils: Illustrator** — existing Anki add-on that generates mnemonic images via AI
- **Keyword Method + Image Gen:** Generate image that visually links L1 keyword sound-alike to L2 word meaning
- **Implementation options:**
  - OpenAI DALL-E 3 API ($0.04-0.12/image) — best quality
  - Stable Diffusion (self-hosted, free) — good for batch generation
  - FLUX (open-source) — newer alternative with strong quality

---

## 2. 📚 Beyond Flashcards — Complementary Features

### Reading Practice with Integrated Lookups

**Self-hosted open-source reading tools:**

- **LinguaCafe** (github.com/simjanos-dev/LinguaCafe) — self-hosted, 27 languages including Spanish, word-level tracking, phrase saving, TTS integration, review system built-in
- **LUTE v3** (github.com/LuteOrg/lute-v3) — Python/Flask, learning through reading, modernized rewrite of LWT
- **Readlang** — browser extension, translate + save words while reading, auto-creates flashcards with SRS
- **KOReader** (github.com/koreader/koreader) — cross-platform ebook reader with integrated dictionaries

**Commercial reading apps for Spanish:**

- **Readle** — CEFR-graded (A1-B2) news + stories, audio narration, tap-to-translate, $70/yr
- **Eppika** — adapted bestsellers A1-C1, native audio narration, $6.99/mo
- **EWA** — 10K+ books, video courses from movie clips, 40K flashcards

**Key features to implement:**

- Tap/click word → instant dictionary lookup + example sentences
- Color-code words by familiarity level (unknown, learning, known)
- Long-press → add to SRS with sentence context
- Track reading stats (words read, new words encountered, reading speed)

### Listening Comprehension Exercises

- **Graded listening:** audio at different speeds (0.75x, 1.0x, 1.25x)
- **Dictation exercises:** listen → type what you hear → compare
- **Fill-in-the-blank from audio:** play sentence with one word muted, learner fills gap
- **Dual subtitles:** Spanish + English simultaneously (Sabi extension pattern)
- **Podcast mining:** transcribe Spanish podcasts with Whisper → create comprehension questions with LLM → mine vocabulary

### Writing/Typing Practice

- **Productive recall:** show English → type Spanish (harder than recognition)
- **Sentence construction:** given words, construct grammatically correct sentence
- **LLM-powered correction:** submit written text → get grammar/vocabulary feedback with explanations
- **Cloze typing:** fill in missing word from sentence (Clozemaster model)
- **Progressive difficulty:** word → phrase → sentence → paragraph

### Mini Grammar Exercises

- **Pattern-based:** identify grammar pattern from examples, then produce it
- **Error correction:** spot the grammar mistake in a sentence
- **Conjugation drills:** verb tense-specific practice
- **LLM-generated:** create exercises targeting specific weak grammar points identified from review data
- **Grammar as a side effect:** learn grammar through exposure in context, with explicit rules available on-demand

### Story-Based Learning (Graded Readers)

- **CEFR levels:** A1 (beginner) through C1 (advanced)
- **AI-generated stories:** use LLM to create stories at target level using learner's known vocabulary + target new words
- **Interactive stories:** choose-your-own-adventure format where choices require comprehension
- **Audio + text sync:** highlighted text following along with narration
- **Embedded comprehension checks:** questions after each section

### Immersion Tools

**Browser extensions pattern:**

- **Toucan** — replaces random words on websites with target language translations
- **Fluent** — similar word replacement approach during normal browsing
- **Language Immersion for Chrome** — novice to fluent modes, progressive replacement

**App-native immersion:**

- Replace N% of UI text with Spanish (configurable difficulty)
- Daily notification vocabulary (push notification with word of the day in context)
- Spanish-only mode for app sections the learner has mastered

---

## 3. 🔧 Technical Implementation

### FSRS Algorithm — Libraries & Implementations

**The Free Spaced Repetition Scheduler (FSRS)** is the state-of-art SRS algorithm (2023+), based on the DSR model (Difficulty, Stability, Retrievability). Default parameters trained on ~700M reviews from 20K users.

**Complete implementation matrix:**

| Language | Library | Version | Optimization | URL |
|----------|---------|---------|-------------|-----|
| **TypeScript** | ts-fsrs | v6 | No | github.com/open-spaced-repetition/ts-fsrs |
| **Rust** | fsrs-rs | v6 | Yes (Burn) | github.com/open-spaced-repetition/fsrs-rs |
| **Python** | py-fsrs | v6 | Yes | github.com/open-spaced-repetition/py-fsrs |
| **Go** | go-fsrs | v5 | No | github.com/open-spaced-repetition/go-fsrs |
| **Swift** | swift-fsrs | v5 | No | github.com/open-spaced-repetition/swift-fsrs |
| **Kotlin** | FSRS-Kotlin | v6 | No | github.com/open-spaced-repetition/FSRS-Kotlin |
| **Dart** | dart-fsrs | v4.5 | No | github.com/open-spaced-repetition/dart-fsrs |
| **Java** | rs-fsrs-java | v5 | No (Rust binding) | github.com/open-spaced-repetition/rs-fsrs-java |
| **C** | rs-fsrs-c | v5 | No (Rust binding) | github.com/open-spaced-repetition/rs-fsrs-c |
| **Node.js** | rs-fsrs-nodejs | v5 | No (Rust binding) | github.com/open-spaced-repetition/rs-fsrs-nodejs |
| **Scala** | fsrs4s | v6 | No | github.com/jwbargsten/fsrs4s |

**Minimal alternatives:**

- **femto-fsrs** (github.com/RickCarlino/femto-fsrs) — FSRS in ~100 lines of TypeScript, good for understanding the algorithm
- **simple-ts-fsrs** (github.com/AustinShelby/simple-ts-fsrs) — minimal implementation

**ts-fsrs key API:**

```typescript
import { fsrs, Card, Rating } from 'ts-fsrs';

const f = fsrs(); // create scheduler with default params
const card = new Card(); // new card
const now = new Date();

// Schedule next review — returns options for each rating
const scheduling = f.repeat(card, now);

// User rates the card
const { card: updatedCard, log } = scheduling[Rating.Good];
// updatedCard contains: due, stability, difficulty, elapsed_days, scheduled_days, reps, lapses, state
```

**Card states:** New → Learning → Review → Relearning
**Rating options:** Again (1), Hard (2), Good (3), Easy (4)

**go-fsrs key structures:**

```go
type Card struct {
    Due           time.Time
    Stability     float64
    Difficulty    float64
    ElapsedDays   uint64
    ScheduledDays uint64
    Reps          uint64
    Lapses        uint64
    State         State
    LastReview    time.Time
}

type Parameters struct {
    RequestRetention float64
    MaximumInterval  float64
    Weights          Weights
    Decay            float64
    Factor           float64
}
```

### TTS APIs for Spanish (Quality Comparison)

| Provider | Spanish Quality | Pricing | Latency | SSML/IPA | Best For |
|----------|----------------|---------|---------|----------|----------|
| **Google Cloud TTS** | ⭐⭐⭐⭐⭐ Very good across variants | $16-160/1M chars | 150-300ms | ✅ Full SSML + IPA | Best language coverage, phoneme control |
| **ElevenLabs** | ⭐⭐⭐⭐ Good European Spanish | $0.30/1K chars ($300/1M) | 400-800ms | ✅ SSML | Best naturalness |
| **Azure Cognitive** | ⭐⭐⭐⭐ Good | $16/1M chars (neural) | 200-400ms | ✅ SSML + IPA/X-SAMPA + viseme | Widest locale coverage (140+), lip-sync |
| **OpenAI TTS** | ⭐⭐⭐ Secondary focus | $15-30/1M chars | 80-150ms | ❌ No SSML | Fastest, simplest API |
| **Deepgram Aura-2** | ⭐⭐⭐⭐ 10+ Spanish voices w/ regional accents | Competitive | Low | Limited | Regional accent variety |
| **Kokoro 82M** | ⭐⭐⭐ Functional but English-primary | Free (self-hosted) | 50-150ms | ❌ | Cost savings, offline |
| **edge-tts** | ⭐⭐⭐⭐ Good (Azure voices) | Free (uses Edge API) | Variable | Limited | Zero cost, good quality |

**🏆 Recommended architecture for a Spanish learning app:**

1. **Primary:** Google Cloud TTS — best Spanish quality + phoneme-level IPA control for pronunciation teaching
2. **Fallback/offline:** Kokoro 82M self-hosted — Apache licensed, OpenAI-compatible API, runs on CPU
3. **Free alternative:** edge-tts (github.com/rany2/edge-tts) — uses Microsoft Edge's TTS API, high quality, free

**Open-source TTS options:**

- **Kokoro 82M** (huggingface.co/hexgrad/Kokoro-82M) — 82M params, Apache license, ~210x realtime on RTX 4090, ~90x on 3090 Ti, runs on CPU
  - **kokoro-web** (github.com/eduardolat/kokoro-web) — self-hosted web UI, OpenAI-compatible API
- **Coqui TTS** (github.com/coqui-ai/TTS) — open-source TTS library, multiple models
- **edge-tts** (github.com/rany2/edge-tts) — high-quality TTS via Microsoft Edge API, zero cost

### Speech-to-Text for Pronunciation Checking

**Recommended approach (layered):**

1. **Transcription layer:** Whisper (openai/whisper or whisper.cpp for edge/offline)
   - Transcribe learner speech → compare with target text
   - Identify word-level mismatches (missed words, wrong words)
   - Good for: dictation exercises, conversation practice transcription

2. **Pronunciation scoring layer:** Use a dedicated API
   - **Azure Speech Pronunciation Assessment** — best balance of features + cost, IPA phoneme scores
   - **SpeechSuper** — purpose-built, phoneme/syllable/word/sentence scoring
   - **ELSA API** — trained on non-native accent data from 195 countries

3. **Lightweight local approach:**
   - Whisper transcription → if transcription matches target, pronunciation is "good enough"
   - Compare Whisper's confidence scores per word segment
   - This is a pragmatic 80/20 solution, not phoneme-accurate

### Offline-First Architecture

**Key principles:**

- All data stored locally by default (SQLite or IndexedDB)
- SRS algorithm runs entirely client-side (ts-fsrs / swift-fsrs / dart-fsrs)
- TTS audio can be pre-downloaded for current study deck
- Sync when online (conflict resolution needed)

**Tech stack options:**

| Approach | Frontend | Storage | Sync | Good For |
|----------|----------|---------|------|----------|
| **Mobile-native** | Swift (iOS) / Kotlin (Android) | SQLite + swift-fsrs/FSRS-Kotlin | Custom or CRDTs | Best UX, offline first |
| **Cross-platform** | Flutter/Dart | SQLite + dart-fsrs | Firebase/Supabase | Single codebase |
| **Web + PWA** | React/Next.js | IndexedDB + ts-fsrs | CouchDB/PouchDB | Web-first with offline |
| **Hybrid** | React Native/Expo | SQLite + ts-fsrs | Supabase realtime | Good compromise |

**Sync strategies:**

- **CRDTs** (Conflict-free Replicated Data Types) — best for offline-first, no conflicts
- **Last-write-wins** — simple, works for single-user
- **Anki model:** update sequence numbers (USN) for sync tracking, graves table for deletions

### Data Models for Flashcard Apps

**Anki's proven schema (simplified for a custom app):**

```sql
-- Notes: raw content (one note can generate multiple cards)
CREATE TABLE notes (
    id          TEXT PRIMARY KEY,  -- UUID
    created_at  INTEGER NOT NULL,  -- epoch ms
    updated_at  INTEGER NOT NULL,
    note_type   TEXT NOT NULL,     -- 'basic', 'cloze', 'audio', 'image'
    fields      TEXT NOT NULL,     -- JSON: {"front": "...", "back": "...", "audio": "...", "context": "..."}
    tags        TEXT DEFAULT '',   -- space-separated
    source      TEXT DEFAULT '',   -- where this came from (article URL, podcast, etc.)
    sort_field  TEXT DEFAULT ''    -- for duplicate detection
);

-- Cards: individual review items generated from notes
CREATE TABLE cards (
    id              TEXT PRIMARY KEY,
    note_id         TEXT NOT NULL REFERENCES notes(id),
    deck_id         TEXT NOT NULL,
    ordinal         INTEGER DEFAULT 0,  -- which template generated this card
    -- FSRS scheduling fields
    state           INTEGER DEFAULT 0,  -- 0=new, 1=learning, 2=review, 3=relearning
    due             INTEGER NOT NULL,   -- next review timestamp (epoch ms)
    stability       REAL DEFAULT 0,
    difficulty      REAL DEFAULT 0,
    elapsed_days    INTEGER DEFAULT 0,
    scheduled_days  INTEGER DEFAULT 0,
    reps            INTEGER DEFAULT 0,
    lapses          INTEGER DEFAULT 0,
    last_review     INTEGER DEFAULT 0,
    -- metadata
    created_at      INTEGER NOT NULL,
    updated_at      INTEGER NOT NULL,
    suspended       INTEGER DEFAULT 0
);

-- Review log: complete history for analytics + FSRS optimization
CREATE TABLE review_log (
    id          TEXT PRIMARY KEY,
    card_id     TEXT NOT NULL REFERENCES cards(id),
    rating      INTEGER NOT NULL,     -- 1=Again, 2=Hard, 3=Good, 4=Easy
    state       INTEGER NOT NULL,     -- card state at time of review
    due         INTEGER NOT NULL,     -- when card was due
    stability   REAL NOT NULL,        -- stability at review time
    difficulty  REAL NOT NULL,        -- difficulty at review time
    elapsed_days INTEGER NOT NULL,
    scheduled_days INTEGER NOT NULL,
    review_time INTEGER NOT NULL,     -- time spent reviewing (ms)
    reviewed_at INTEGER NOT NULL      -- epoch ms
);

-- Decks
CREATE TABLE decks (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    parent_id   TEXT,
    created_at  INTEGER NOT NULL,
    settings    TEXT DEFAULT '{}'     -- JSON: retention target, max interval, etc.
);

-- Vocabulary tracking (language-learning specific)
CREATE TABLE vocabulary (
    id          TEXT PRIMARY KEY,
    word        TEXT NOT NULL,        -- lemmatized form
    language    TEXT NOT NULL,        -- 'es', 'en'
    frequency   INTEGER DEFAULT 0,   -- corpus frequency rank
    familiarity INTEGER DEFAULT 0,   -- 0=unknown, 1=seen, 2=learning, 3=known
    first_seen  INTEGER,
    last_seen   INTEGER,
    contexts    TEXT DEFAULT '[]',    -- JSON array of sentence contexts
    notes       TEXT DEFAULT ''       -- personal notes
);

-- Indexes
CREATE INDEX idx_cards_due ON cards(deck_id, state, due);
CREATE INDEX idx_cards_note ON cards(note_id);
CREATE INDEX idx_revlog_card ON review_log(card_id);
CREATE INDEX idx_vocab_word ON vocabulary(word, language);
CREATE INDEX idx_vocab_familiarity ON vocabulary(familiarity);
```

**Card types for a language learning app:**

| Type | Front | Back | Use Case |
|------|-------|------|----------|
| **Basic** | Spanish word/phrase | English translation + audio | Recognition (receptive) |
| **Reverse** | English meaning | Spanish word + audio | Production (productive) |
| **Cloze** | Sentence with blank: "Yo ___ al parque" | Missing word: "voy" | Context + grammar |
| **Audio** | Audio clip of word/sentence | Written Spanish + translation | Listening comprehension |
| **Image** | Image | Spanish word + audio | Visual association |
| **Sentence** | Full Spanish sentence | Translation + word-by-word breakdown | Reading comprehension |
| **Conjugation** | Infinitive + tense + subject | Conjugated form | Grammar drill |

---

## 4. 📦 Open Source Projects Worth Studying

### Core SRS / Flashcard

| Project | Language | What It Does | URL |
|---------|----------|-------------|-----|
| **Anki** | Python/Rust | The reference SRS app, SQLite, FSRS support | github.com/ankitects/anki |
| **AnkiDroid** | Kotlin | Android Anki client, well-documented DB schema | github.com/ankidroid/Anki-Android |
| **Mochi Cards** | - | Modern SRS with Markdown, offline-first | mochi.cards |
| **FSRS4Anki** | JS/Python | FSRS optimizer for Anki | github.com/open-spaced-repetition/fsrs4anki |
| **femto-fsrs** | TypeScript | FSRS in ~100 lines | github.com/RickCarlino/femto-fsrs |
| **LibreLingo** | Python/JS | Open-source Duolingo alternative | github.com/LibreLingo/LibreLingo |

### Reading / Immersion

| Project | Language | What It Does | URL |
|---------|----------|-------------|-----|
| **LinguaCafe** | PHP/Vue | Self-hosted reading tool, 27 languages, word tracking | github.com/simjanos-dev/LinguaCafe |
| **LUTE v3** | Python/Flask | Learning Using Texts, reading-based learning | github.com/LuteOrg/lute-v3 |
| **vocabsieve** | Python | Sentence mining → Anki cards with translations | github.com/FreeLanguageTools/vocabsieve |
| **mpvacious** | Lua | TV show → Anki flashcard automation | github.com/Ajatt-Tools/mpvacious |
| **voracious** | JS | Language-learning focused video player | github.com/rsimmons/voracious |

### Translation / NLP

| Project | Language | What It Does | URL |
|---------|----------|-------------|-----|
| **LibreTranslate** | Python | Self-hosted translation API (Argos Translate backend) | github.com/LibreTranslate/LibreTranslate |
| **Argos Translate** | Python | Offline translation library (OpenNMT) | github.com/argosopentech/argos-translate |
| **spaCy** | Python | NLP: tokenization, lemmatization, POS tagging | github.com/explosion/spaCy |
| **wordfreq** | Python | Word frequency data for 44 languages | github.com/rspeer/wordfreq |
| **wiktextract** | Python | High-quality Wiktionary data extraction to JSON | github.com/tatuylonen/wiktextract |

### Speech / Audio

| Project | Language | What It Does | URL |
|---------|----------|-------------|-----|
| **Whisper** | Python | OpenAI's speech-to-text, 680K hours training | github.com/openai/whisper |
| **whisper.cpp** | C++ | CPU-optimized Whisper, WASM browser support | github.com/ggerganov/whisper.cpp |
| **Kokoro 82M** | Python | Open-weight TTS, Apache license, 82M params | huggingface.co/hexgrad/Kokoro-82M |
| **kokoro-web** | Go | Self-hosted Kokoro TTS web UI + OpenAI API | github.com/eduardolat/kokoro-web |
| **edge-tts** | Python | Free TTS via Microsoft Edge API | github.com/rany2/edge-tts |
| **Coqui TTS** | Python | Open-source TTS library | github.com/coqui-ai/TTS |

### Dictionary / Data

| Project | Language | What It Does | URL |
|---------|----------|-------------|-----|
| **Wiktionary-Dictionaries** | Python | 300+ language dictionaries from Wiktionary | github.com/Vuizur/Wiktionary-Dictionaries |
| **wikdict-gen** | Python | Downloadable dictionaries in multiple formats | github.com/karlb/wikdict-gen |
| **pyglossary** | Python | Dictionary format conversion | github.com/ilius/pyglossary |
| **WordDumb** | Python | Add word-wise definitions to ebooks | github.com/xxyzz/WordDumb |

---

## 5. 💡 Innovative Features from Newer Apps

### What Each App Does Differently

**Clozemaster:**

- 🎯 **Cloze-only approach** — every exercise is fill-in-the-blank in a real sentence
- 📊 Words ordered by frequency (most common first)
- 🎮 Gamified (points, leaderboards, streaks)
- ✅ Best for: intermediate+ learners who know basics, need mass vocabulary exposure
- 🔑 Key insight: context-based active recall outperforms isolated word memorization

**Lingvist:**

- 🧠 Adaptive algorithm personalizes to your level from first session
- 📈 Focuses purely on vocabulary flashcards with spaced repetition
- 📝 Shows words in sentence context but tests individual word knowledge
- ✅ Best for: efficient vocabulary acquisition with adaptive difficulty

**Speakly:**

- 📊 Teaches words in order of **statistical relevance** (most commonly used in real life first)
- 🔄 All four skills: reading, writing, listening, speaking in every session
- 🌍 Real-life conversations and cultural context
- ✅ Best for: practical communication ability fast

**LingoDeer:**

- 📖 Grammar-focused with structured lessons (not just vocabulary)
- 🎯 Detailed grammar explanations before exercises
- 🗣️ Good for Asian + European languages
- ✅ Best for: learners who want structured grammar progression

**Languagenut:**

- 🏫 Designed for classroom use with teacher dashboards
- 🎮 Game-based activities (matching, word-building)
- 📊 Curriculum-aligned content
- ✅ Best for: structured, school-style learning paths

### Context-Based vs. Isolated Vocabulary

**Evidence strongly favors context-based:**

- Words learned in context have stronger memory traces (episodic + semantic encoding)
- Cloze exercises force processing of grammar + meaning simultaneously
- Isolated word pairs (word ↔ translation) lead to "translation reflex" — always thinking through L1
- Context shows collocations, prepositions, word order patterns

**Implementation recommendation:**

- Primary mode: cloze sentences (Clozemaster pattern)
- Secondary: example sentences with word highlighted
- Tertiary: isolated flashcard as quick review only
- Always provide sentence audio, not just word audio

### Productive vs. Receptive Vocabulary Training

**The gap problem:** Most apps prioritize receptive (understand when you see/hear it) over productive (can use it in speech/writing). Receptive vocabulary is typically 2-3x larger than productive.

**Bridge the gap with:**

1. **L1 → L2 production cards** (see English → type Spanish)
2. **Sentence construction** (given words, make a sentence)
3. **Speaking exercises** (see prompt → speak answer → STT verification)
4. **Writing prompts** (LLM evaluates your written response)
5. **Cloze from audio** (hear sentence, type missing word — combines listening + production)

**Progressive difficulty for production:**

- Recognition → Forced choice (multiple choice) → Cloze (constrained production) → Free recall (type from memory) → Free production (use in novel sentence)

---

## 6. 🏗️ Architectural Recommendations

### Recommended Tech Stack for a Personal Spanish App

```
┌─────────────────────────────────────────┐
│              Mobile / Web UI            │
│  (React Native / Flutter / Next.js PWA) │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────┴──────────────────────┐
│           Local Data Layer              │
│  SQLite (mobile) / IndexedDB (web)      │
│  + ts-fsrs / swift-fsrs / dart-fsrs     │
│  + Offline-first sync                   │
└──────────────────┬──────────────────────┘
                   │ (when online)
┌──────────────────┴──────────────────────┐
│           Backend Services              │
│  ┌───────────┐  ┌──────────────────┐   │
│  │ LLM API   │  │ TTS API          │   │
│  │ (Claude/  │  │ (Google Cloud /  │   │
│  │  GPT-4o)  │  │  Kokoro local)   │   │
│  └───────────┘  └──────────────────┘   │
│  ┌───────────┐  ┌──────────────────┐   │
│  │ STT API   │  │ Pronunciation    │   │
│  │ (Whisper) │  │ (Azure/ELSA)     │   │
│  └───────────┘  └──────────────────┘   │
│  ┌───────────┐  ┌──────────────────┐   │
│  │ Image Gen │  │ Translation      │   │
│  │ (DALL-E 3)│  │ (LibreTranslate) │   │
│  └───────────┘  └──────────────────┘   │
└─────────────────────────────────────────┘
```

### MVP Feature Priority

1. **Core SRS engine** — FSRS via ts-fsrs, basic/cloze/reverse cards
2. **Spanish TTS** — Google Cloud or edge-tts for audio on every card
3. **Cloze exercises** — sentence-based learning from frequency lists
4. **Reading mode** — tap-to-lookup with auto-card creation
5. **AI conversation** — LLM chatbot tutor with error correction
6. **Pronunciation** — Whisper transcription for basic checking
7. **Adaptive difficulty** — leverage FSRS + grammar topic tracking
8. **Content import** — articles, podcasts, YouTube subtitles → cards
9. **Visual mnemonics** — AI image generation for difficult words
10. **Immersion tools** — progressive word replacement in UI

### Data Sources for Spanish Content

- **Tatoeba** (tatoeba.org) — 10M+ sentences with translations, CC license
- **OpenSubtitles** (opensubtitles.org) — movie/TV subtitles for authentic language
- **wordfreq** — Spanish frequency lists
- **Wiktionary** (via wiktextract) — comprehensive dictionary data
- **News in Slow Spanish** — graded news content
- **SpanishDict** — comprehensive dictionary + conjugation tables

---

## 🔗 Related

[[Language Learning]], [[Spaced Repetition]], [[FSRS]], [[Spanish]], [[AI Tools]]

## Sources

- [awesome-fsrs](https://github.com/open-spaced-repetition/awesome-fsrs)
- [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs)
- [go-fsrs](https://github.com/open-spaced-repetition/go-fsrs)
- [Anki Database Structure](https://github.com/ankidroid/Anki-Android/wiki/Database-Structure)
- [awesome-language-learning](https://github.com/Vuizur/awesome-language-learning)
- [LinguaCafe](https://github.com/simjanos-dev/LinguaCafe)
- [LUTE v3](https://github.com/LuteOrg/lute-v3)
- [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate)
- [Kokoro-82M TTS](https://huggingface.co/hexgrad/Kokoro-82M)
- [kokoro-web](https://github.com/eduardolat/kokoro-web)
- [edge-tts](https://github.com/rany2/edge-tts)
- [whisper.cpp](https://github.com/ggerganov/whisper.cpp)
- [SpeechSuper API](https://www.speechsuper.com/)
- [Speechace API](https://www.speechace.com/)
- [ELSA API](https://elsaspeak.com/en/elsa-api/)
- [Azure Pronunciation Assessment](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment)
- [femto-fsrs](https://github.com/RickCarlino/femto-fsrs)
- [Clozemaster](https://www.clozemaster.com/)
- [TTS API comparison for language apps (dev.to)](https://dev.to/pocket_linguist/text-to-speech-in-2026-comparing-5-tts-apis-for-language-apps-606)
- [Best TTS APIs 2026 (Speechmatics)](https://www.speechmatics.com/company/articles-and-news/best-tts-apis-in-2025-top-12-text-to-speech-services-for-developers)
- [AI Language Learning Apps 2026 (LanguaTalk)](https://languatalk.com/blog/whats-the-best-ai-for-language-learning/)
- [Text-to-Image for Vocabulary Learning (arXiv)](https://arxiv.org/abs/2501.17099)
- [AnkiAIUtils Illustrator](https://forums.ankiweb.net/t/i-made-ankiaiutils-illustrator-ai-powered-visual-mnemonics-for-anki-cards/53683)
- [vocabsieve](https://github.com/FreeLanguageTools/vocabsieve)
- [wordfreq](https://github.com/rspeer/wordfreq)
- [wiktextract](https://github.com/tatuylonen/wiktextract)
- [spaCy](https://github.com/explosion/spaCy)
