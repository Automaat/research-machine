# 🔬 Grounded Research Prompt

> Evidence-based research prompt combining CoT, CoVe, and Self-Critique
> with strict source grounding to prevent hallucination.

## 📚 Scientific Basis

| Technique | Paper | Key Insight |
|-----------|-------|-------------|
| Chain-of-Thought | [Wei et al. 2022][cot] (~13,800 citations) | Step-by-step reasoning improves complex tasks |
| Chain-of-Verification | [Dhuliawala et al. 2023][cove] | Independent verification reduces hallucinations 23% |
| Self-Refine | [Madaan et al. 2023][selfrefine] | Iterative critique improves output ~20% |
| Quote-then-Answer | [FRONT Framework][front] | Verbatim quotes anchor generation |
| Interleaved Citation | [ReClaim][reclaim] | Alternating reference→claim prevents drift |

[cot]: https://arxiv.org/abs/2201.11903
[cove]: https://arxiv.org/abs/2309.11495
[selfrefine]: https://arxiv.org/abs/2303.17651
[front]: https://openreview.net/forum?id=7atXKldh-r
[reclaim]: https://arxiv.org/html/2407.01796v1

### ⚠️ Limitations from Research

- **CoT**: [Meta-analysis][cot-limits] shows benefits mainly for math/logic
- **Self-correction**: [MIT survey][mit] found unreliable without external feedback
- **Best results**: [Stanford 2024][stanford] showed 96% hallucination reduction requires RAG + guardrails

[cot-limits]: https://www.marktechpost.com/2024/09/22/chain-of-thought-cot-prompting-a-comprehensive-analysis-reveals-limited-effectiveness-beyond-math-and-symbolic-reasoning/
[mit]: https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00713/125177/When-Can-LLMs-Actually-Correct-Their-Own-Mistakes
[stanford]: https://www.voiceflow.com/blog/prevent-llm-hallucinations

---

## 📋 The Prompt

```markdown
# Grounded Research Task: [TOPIC]

## Critical Grounding Rules

**STRICT REQUIREMENTS:**

1. ONLY use information explicitly present in provided sources
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

## Phase 1: Source Processing (REQUIRED BEFORE ANY ANALYSIS)

For EACH source provided, extract:

### Source [N]: [Title/URL]

**Key Claims (verbatim quotes):**

1. "[Exact quote]" → Supports: [what this evidences]
2. "[Exact quote]" → Supports: [what this evidences]

**Source Limitations:**

- Study type: [meta-analysis/RCT/opinion/etc.]
- Sample/scope: [if applicable]
- Potential bias: [funding, methodology issues]

---

## Phase 2: Chain-of-Thought Synthesis

Connect sources systematically:

1. **Claim:** [Your synthesized point]
   - **Evidence:** [Source N, Quote: "..."]
   - **Confidence:** High/Medium/Low
   - **Reasoning chain:** Source A states X → Source B confirms Y → Therefore Z

2. [Repeat for each claim]

---

## Phase 3: Grounded Verification (CoVe + External Anchoring)

### 3.1 Extract Your Claims

List each factual claim from your synthesis.

### 3.2 Verify Against Sources (NOT your memory)

For each claim, answer:

| Claim | Source Quote Supporting | Exact Match? | Adjustment Needed |
|-------|------------------------|--------------|-------------------|
| [claim] | "[quote]" from Source N | Yes/Partial/No | [correction] |

### 3.3 Flag Ungrounded Content

List anything you stated that CANNOT be traced to a specific source quote.
**Action:** Remove or mark as speculation.

---

## Phase 4: Self-Critique (Grounding Focus)

Rate yourself honestly:

| Check | Pass/Fail | Evidence |
|-------|-----------|----------|
| Every claim has citation? | | |
| Quotes are verbatim (not paraphrased loosely)? | | |
| No "common knowledge" gap-filling? | | |
| Uncertainties explicitly flagged? | | |
| Source limitations acknowledged? | | |

**If any FAIL:** Revise before final output.

---

## Output Format

### Summary

[Key findings - every sentence must have [Source: N] citation]

### Evidence Table

| Finding | Source | Verbatim Quote | Confidence |
|---------|--------|----------------|------------|
| [claim] | [N] | "[exact words]" | High/Med/Low |

### What Sources DON'T Cover

[Explicitly state gaps - what user might expect but isn't in sources]

### Synthesis Confidence

- **Strongly supported:** [claims with multiple source convergence]
- **Single-source:** [claims from one source only]
- **Inferred:** [logical connections not explicitly stated]
```

---

## 🎯 Usage Guide

### When to Use Full Process

- Complex multi-faceted questions
- High-stakes decisions requiring accuracy
- Novel/contested topics
- Literature reviews

### Simplified Version (skip Phase 4)

- Well-established topics
- Quick overviews
- Time-constrained research

### For Maximum Reliability

Combine this prompt with:

- Actual RAG system (document retrieval)
- Multiple source verification
- Human review of critical claims

---

## 🔑 Key Anti-Hallucination Mechanisms

1. **Quote-first pattern** - Forces extraction before synthesis
2. **Explicit "not found" requirement** - Eliminates gap-filling
3. **Verbatim quote citations** - Traceable claims
4. **Source-to-claim verification table** - External anchor for CoVe
5. **Grounding-focused self-critique** - Specific checkpoints

---

## 📖 Further Reading

- [The Prompt Report](https://arxiv.org/abs/2406.06608) - Comprehensive 58-technique taxonomy
- [AGREE Framework](https://arxiv.org/abs/2311.09533) - Google's grounding enhancement
- [Awesome LLM Attributions](https://github.com/HITsz-TMG/awesome-llm-attributions) - Curated paper list
- [RAG Hallucination Review](https://www.mdpi.com/2227-7390/13/5/856) - Systematic review of mitigation
