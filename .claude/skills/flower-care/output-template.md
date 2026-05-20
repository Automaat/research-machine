# Output Template

Polish care guide format for flower-care skill.

---

## Template

```markdown
# 🌸 [Flower Name] — Przewodnik Pielęgnacji

**Nazwa botaniczna:** _[Scientific name]_
**Rodzina:** [Family]
**Data:** YYYY-MM-DD
**Tagi:** #pielegnacja-roslin #[category]

---

## 📸 Ocena Zdjęcia

[Szczegółowy opis tego co widać na zdjęciu — stan rośliny, obserwacje wizualne]

### Stan Zdrowia: [🟢 Zdrowa | 🟡 Wymaga Uwagi | 🔴 Pilna Interwencja]

**Obserwacje:**
- [Konkretna obserwacja 1]
- [Konkretna obserwacja 2]
- [Konkretna obserwacja 3]

**Zdiagnozowane problemy:**
- [Problem 1 — poziom pilności]
- [Problem 2 — poziom pilności]

---

## 📊 Macierz Pielęgnacji

| Aspekt | Wymagania | Uwagi |
|--------|-----------|-------|
| 💧 Podlewanie | [częstotliwość, metoda] | [sezonowe dostosowania] |
| ☀️ Światło | [godziny, natężenie] | [kierunek okna] |
| 💨 Wilgotność | [zakres %] | [jak utrzymać] |
| 🌡️ Temperatura | [min-max °C] | [strefy niebezpieczne] |
| 🪴 Podłoże | [typ gleby] | [częstotliwość przesadzania] |
| 🧪 Nawożenie | [NPK, częstotliwość] | [pauza zimowa] |

---

## 💊 Plan Leczenia

[Sekcja tylko jeśli wykryto problemy]

### 🚨 Natychmiastowe Działania (Dziś)
- [ ] [Akcja 1 — szczegółowy opis]
- [ ] [Akcja 2 — szczegółowy opis]

### 📅 Krótkoterminowe (Ten Tydzień)
- [ ] [Akcja 1]
- [ ] [Akcja 2]

### 🛡️ Długoterminowa Profilaktyka
- [Wskazówka zapobiegawcza 1]
- [Wskazówka zapobiegawcza 2]
- [Wskazówka zapobiegawcza 3]

### 🛒 Potrzebne Produkty
- [Produkt 1 — do czego]
- [Produkt 2 — do czego]

---

## 📅 Kalendarz Sezonowy

### 🌱 Wiosna (Marzec-Maj)
- **Podlewanie:** [dostosowanie]
- **Nawożenie:** [rozpoczęcie/kontynuacja]
- **Pielęgnacja:** [przesadzanie, przycinanie]

### ☀️ Lato (Czerwiec-Sierpień)
- **Podlewanie:** [częstotliwość letnia]
- **Nawożenie:** [szczyt sezonu]
- **Uwaga:** [szkodniki, słońce]

### 🍂 Jesień (Wrzesień-Listopad)
- **Podlewanie:** [redukcja]
- **Nawożenie:** [zakończenie]
- **Pielęgnacja:** [przygotowanie do zimy]

### ❄️ Zima (Grudzień-Luty)
- **Podlewanie:** [minimalne]
- **Nawożenie:** [pauza]
- **Uwaga:** [przeciągi, ogrzewanie]

---

## ⚠️ Częste Błędy

- ❌ [Błąd 1 — dlaczego to problem]
- ❌ [Błąd 2 — dlaczego to problem]
- ❌ [Błąd 3 — dlaczego to problem]
- ❌ [Błąd 4 — dlaczego to problem]

---

## 🌱 Rozmnażanie

**Metody:**
- [Metoda 1 — krótki opis procesu]
- [Metoda 2 — krótki opis procesu]

**Najlepszy czas:** [kiedy]

**Wskazówki:**
- [Tip 1]
- [Tip 2]

---

## 🔗 Powiązania

[[Rośliny Doniczkowe MOC]], [[Pielęgnacja Roślin]]

---

## 📚 Źródła

- [Źródło 1](URL) — [co dostarczyło]
- [Źródło 2](URL) — [co dostarczyło]
- [Źródło 3](URL) — [co dostarczyło]
```

---

## Quick Mode Template

Simplified output for `--quick` flag:

```markdown
# 🌸 [Flower Name] — Szybki Przewodnik

**Nazwa botaniczna:** _[Scientific name]_
**Data:** YYYY-MM-DD

## 📸 Ocena

[Krótki opis stanu rośliny]

**Stan:** [🟢/🟡/🔴]

## 📊 Podstawowa Pielęgnacja

| Aspekt | Wymagania |
|--------|-----------|
| 💧 Podlewanie | [częstotliwość] |
| ☀️ Światło | [typ] |
| 💨 Wilgotność | [poziom] |
| 🌡️ Temperatura | [zakres °C] |

## ⚡ Szybkie Wskazówki

- [Tip 1]
- [Tip 2]
- [Tip 3]

## 📚 Źródła

- [Źródło](URL)
```

---

## Section Guidelines

### 📸 Ocena Zdjęcia

- Describe exactly what you see in the image
- Note leaf color, texture, any visible problems
- Comment on pot, soil, environment if visible
- Be specific — "żółte liście przy podstawie" not just "problemy"

### 📊 Macierz Pielęgnacji

- Use specific numbers (e.g., "co 7-10 dni", "6-8 godzin")
- Include seasonal variations in Uwagi column
- Cite source for each requirement

### 💊 Plan Leczenia

- Actionable checkbox items
- Start with most urgent actions
- Include specific products with Polish availability

### 📅 Kalendarz Sezonowy

- Polish season names (Wiosna, Lato, Jesień, Zima)
- Focus on changes from baseline care
- Include timing cues ("gdy temperatura >15°C")

### ⚠️ Częste Błędy

- Common mistakes specific to this plant
- Explain WHY it's a problem
- Not generic plant advice

### 📚 Źródła

- List every source consulted
- Note what information came from each
- Prioritize Tier 1 sources
