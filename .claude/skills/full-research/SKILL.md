---
name: full-research
description: Comprehensive grounded research with rigorous source verification. Use when user needs thorough research with verbatim citations, fact-checking verification, or academic-level source grounding on complex topics.
argument-hint: [topic]
allowed-tools: WebFetch, Read, Task
user-invocable: true
context: fork
agent: Explore
---

# Grounded Research: $ARGUMENTS

## Grounding Rules

1. Use only information explicitly present in discovered sources
2. Include inline citation for every factual claim: [Source: X, Quote: "..."]
3. When information is absent from sources, state "Not found in provided sources"
4. Classify each claim:
   - 📄 **STATED**: Direct from source (with quote)
   - 🔗 **INFERRED**: Logical connection between sources (explain reasoning)
   - ❓ **UNCERTAIN**: Reasonable but unverified (flag explicitly)

Avoid: unsourced claims, meaning-altering paraphrases, "general knowledge" gap-filling, unstated assumptions.

---

## Phase 1: Source Processing

Search for and read 3-5 high-quality sources.
Prioritize: official docs > meta-analyses > highly-cited papers > tutorials.

For each source, extract:

<example>
### Source [N]: [Title/URL]

**Key Claims (verbatim quotes):**

1. "[Exact quote]" → Supports: [what this evidences]
2. "[Exact quote]" → Supports: [what this evidences]

**Source Limitations:**

- Type: [docs/paper/blog/etc.]
- Potential bias: [if any]

**Funding & Sponsorship:**

- 💰 **Funder/Sponsor:** [Organization/company funding the study, or "Not disclosed"]
- 🏢 **Author Affiliations:** [Key affiliations that may indicate conflicts]
- ⚠️ **Conflict of Interest:** [Declared COIs, or "None declared", or "Not stated"]
- 🎯 **Sponsor Alignment:** [Does the conclusion align with sponsor's commercial interests? Yes/No/N/A]
</example>

---

## Phase 2: Chain-of-Thought Synthesis

Re-anchor: every claim needs a verbatim quote and source number.

Connect sources systematically:

1. **Claim:** [Synthesized claim]
   - **Evidence:** [Source N, Quote: "..."]
   - **Confidence:** High/Medium/Low
   - **Sponsorship Bias Risk:** 🟢 None / 🟡 Possible / 🔴 Likely — [brief explanation if applicable]
   - **Reasoning chain:** Source A states X → Source B confirms Y → Therefore Z

When multiple sources agree, verify they do not share the same funder — because shared funding can create correlated bias. Weight industry-funded studies with sponsor-aligned conclusions lower. Prefer independently funded or publicly funded research.

---

## Phase 3: Grounded Verification (Subagent)

Use Task tool to spawn a verification subagent with clean context.

Pass to subagent:

1. Synthesis claims (Phase 2 output)
2. All source URLs and their extracted quotes

Subagent prompt:

```markdown
You are a fact-checking agent. Verify these claims against provided sources.

CLAIMS TO VERIFY:
[paste synthesis claims]

SOURCES WITH QUOTES:
[paste source extracts]

For each claim:
1. Find supporting quote in sources
2. Check if quote actually supports claim (exact match vs stretched interpretation)
3. Flag any claim without direct source backing

Output format:
| Claim | Source Quote | Match Quality | Issue |
|-------|--------------|---------------|-------|

Flag as UNGROUNDED anything not directly traceable to a source quote.

SPONSORSHIP BIAS CHECK:
For each claim backed primarily by industry-funded sources:
1. Is there independent corroboration from non-industry sources?
2. Does the claim directly benefit the funding organization?
3. Rate sponsorship bias risk: 🟢 None / 🟡 Possible / 🔴 Likely
```

Integrate subagent findings back into your output.

---

## Phase 4: Self-Critique

Re-anchor grounding rules: every claim needs a citation, no gap-filling, uncertainties flagged.

| Check | Pass/Fail |
|-------|-----------|
| Every claim has citation? | |
| Quotes are verbatim? | |
| No "common knowledge" gap-filling? | |
| Uncertainties flagged? | |
| Funding/sponsorship identified per source? | |
| Industry-funded claims independently corroborated? | |

If any check fails, revise the relevant section before producing output.

---

## Output Format

Output TL;DR first, before any phases or detailed analysis.

### TL;DR

[2-3 sentence bottom-line answer. Plain language, no citations. What does the user need to know?]

---

*Detailed analysis follows below.*

### Summary

[Key findings - every sentence with [Source: N] citation]

<example>
### Evidence Table

| Claim | Source | Verbatim Quote | Confidence | Bias Risk |
|-------|--------|----------------|------------|-----------|
| [claim] | [N] | "[exact words]" | High/Med/Low | 🟢/🟡/🔴 |

### Sponsorship & Bias Map

| Source | Funder/Sponsor | Author Affiliations | Declared COI | Conclusion Favors Sponsor? |
|--------|---------------|---------------------|--------------|---------------------------|
| [N] | [org] | [affiliations] | [yes/no/undisclosed] | [yes/no/N/A] |

**Bias Warnings:** [Flag any claims that rely primarily on industry-funded sources without independent corroboration]
</example>

### What Sources Don't Cover

[Gaps - what wasn't found]

### Sources

[List all sources with URLs]

---

## Edge Cases

- **Fewer than 3 sources found:** State the gap explicitly, reduce confidence ratings, note limited evidence in TL;DR
- **All sources share a funder:** Flag correlated bias risk prominently, search for independent corroboration before synthesizing
- **Subagent flags claims as UNGROUNDED:** Remove or reclassify as ❓ UNCERTAIN with explanation — do not keep ungrounded claims in the final output
- **Contradictory sources:** Present both positions with quotes, do not pick a winner without evidence-based reasoning

<example>
Input: "Research the health effects of intermittent fasting"
Output: TL;DR first, then 3-5 source extracts with funding/bias metadata, synthesis claims with evidence chains, verification subagent table, self-critique checklist, and final structured output with Evidence Table and Sponsorship Map.
</example>
