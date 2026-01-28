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

---

## Phase 2: Chain-of-Thought Synthesis

Connect sources systematically:

1. **Claim:** [Your synthesized point]
   - **Evidence:** [Source N, Quote: "..."]
   - **Confidence:** High/Medium/Low
   - **Reasoning chain:** Source A states X → Source B confirms Y → Therefore Z

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
