# Grounded Research: $ARGUMENTS

## Critical Grounding Rules

**STRICT REQUIREMENTS:**

1. ONLY use information explicitly present in sources you find
2. Every factual claim MUST include inline citation: [Source: X, Quote: "..."]
3. If information not in sources → state "Not found in provided sources"
4. Distinguish clearly between:
   - 📄 **STATED**: Direct from source (with quote)
   - 🔗 **INFERRED**: Logical connection between sources (explain reasoning)
   - ❓ **UNCERTAIN**: Reasonable but unverified (flag explicitly)

**FORBIDDEN:**

- Making claims without source backing
- Paraphrasing in ways that change meaning
- Filling gaps with "general knowledge"
- Assuming unstated information

---

## Phase 1: Source Processing

Search for and read 3-5 high-quality sources.
Prioritize: official docs > meta-analyses > highly-cited papers > tutorials.

For EACH source, extract:

### Source [N]: [Title/URL]

**Key Claims (verbatim quotes):**

1. "[Exact quote]" → Supports: [what this evidences]
2. "[Exact quote]" → Supports: [what this evidences]

**Source Limitations:**

- Type: [docs/paper/blog/etc.]
- Potential bias: [if any]

---

## Phase 2: Chain-of-Thought Synthesis

Connect sources systematically:

1. **Claim:** [Your synthesized point]
   - **Evidence:** [Source N, Quote: "..."]
   - **Confidence:** High/Medium/Low
   - **Reasoning chain:** Source A states X → Source B confirms Y → Therefore Z

---

## Phase 3: Grounded Verification

### 3.1 Extract Your Claims

List each factual claim from your synthesis.

### 3.2 Verify Against Sources

| Claim | Source Quote Supporting | Exact Match? | Adjustment Needed |
|-------|------------------------|--------------|-------------------|
| [claim] | "[quote]" from Source N | Yes/Partial/No | [correction] |

### 3.3 Flag Ungrounded Content

Remove or mark as speculation anything not traceable to source.

---

## Phase 4: Self-Critique

| Check | Pass/Fail |
|-------|-----------|
| Every claim has citation? | |
| Quotes are verbatim? | |
| No "common knowledge" gap-filling? | |
| Uncertainties flagged? | |

**If any FAIL:** Revise before output.

---

## Output Format

### Summary

[Key findings - every sentence with [Source: N] citation]

### Evidence Table

| Finding | Source | Verbatim Quote | Confidence |
|---------|--------|----------------|------------|
| [claim] | [N] | "[exact words]" | High/Med/Low |

### What Sources DON'T Cover

[Gaps - what wasn't found]

### Sources

[List all sources with URLs]
