---
description: Comprehensive grounded research with rigorous source verification. Use when user needs thorough research with verbatim citations, fact-checking verification, or academic-level source grounding on complex topics.
argument-hint: [topic]
allowed-tools: WebSearch, WebFetch, Read, Task
---

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

**Funding & Sponsorship:**

- 💰 **Funder/Sponsor:** [Organization/company funding the study, or "Not disclosed"]
- 🏢 **Author Affiliations:** [Key affiliations that may indicate conflicts]
- ⚠️ **Conflict of Interest:** [Declared COIs, or "None declared", or "Not stated"]
- 🎯 **Sponsor Alignment:** [Does the conclusion align with sponsor's commercial interests? Yes/No/N/A]

---

## Phase 2: Chain-of-Thought Synthesis

Connect sources systematically:

1. **Claim:** [Your synthesized point]
   - **Evidence:** [Source N, Quote: "..."]
   - **Confidence:** High/Medium/Low
   - **Sponsorship Bias Risk:** 🟢 None / 🟡 Possible / 🔴 Likely — [brief explanation if applicable]
   - **Reasoning chain:** Source A states X → Source B confirms Y → Therefore Z

⚠️ **Bias Check:** When multiple sources agree, verify they don't share the same funder. Industry-funded studies with conclusions favoring the sponsor's product should be weighted lower. Prefer independently funded or publicly funded research when available.

---

## Phase 3: Grounded Verification (Subagent)

**IMPORTANT:** Use Task tool to spawn a verification subagent with clean context.

Pass to subagent:

1. Your synthesis claims (Phase 2 output)
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

Flag as UNGROUNDED anything not directly traceable to source quote.

SPONSORSHIP BIAS CHECK:
For each claim backed primarily by industry-funded sources:
1. Is there independent corroboration from non-industry sources?
2. Does the claim directly benefit the funding organization?
3. Rate sponsorship bias risk: 🟢 None / 🟡 Possible / 🔴 Likely
```

Integrate subagent findings back into your output.

---

## Phase 4: Self-Critique

| Check | Pass/Fail |
|-------|-----------|
| Every claim has citation? | |
| Quotes are verbatim? | |
| No "common knowledge" gap-filling? | |
| Uncertainties flagged? | |
| Funding/sponsorship identified per source? | |
| Industry-funded claims independently corroborated? | |

**If any FAIL:** Revise before output.

---

## Output Format

**IMPORTANT: Always output TL;DR FIRST, before any phases or detailed analysis.**

### TL;DR

[2-3 sentence bottom-line answer. Plain language, no citations. What does the user need to know?]

---

*Detailed analysis follows below.*

### Summary

[Key findings - every sentence with [Source: N] citation]

### Evidence Table

| Finding | Source | Verbatim Quote | Confidence | Bias Risk |
|---------|--------|----------------|------------|-----------|
| [claim] | [N] | "[exact words]" | High/Med/Low | 🟢/🟡/🔴 |

### Sponsorship & Bias Map

| Source | Funder/Sponsor | Author Affiliations | Declared COI | Conclusion Favors Sponsor? |
|--------|---------------|---------------------|--------------|---------------------------|
| [N] | [org] | [affiliations] | [yes/no/undisclosed] | [yes/no/N/A] |

**⚠️ Bias Warnings:** [Flag any findings that rely primarily on industry-funded sources without independent corroboration]

### What Sources DON'T Cover

[Gaps - what wasn't found]

### Sources

[List all sources with URLs]
