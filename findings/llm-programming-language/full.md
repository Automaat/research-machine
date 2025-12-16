# 🤖 LLM-Native Programming Language Design

**Date:** 2025-12-15
**Tags:** #research #llm #programming-languages #ai #constrained-decoding
**Focus:** Programming language design optimized for LLM generation/modification (not human-friendly)

---

## 🎯 Key Findings

### 📄 STATED (Direct from sources)

1. **Explicit static typing preferred over implicit/dynamic**
   - "Implicit types will be harder to work with than explicit types.
     Good for Java, bad for Scala" [Source: Lobsters]
   - MoonBit uses "structured type systems that help large models
     'more accurately recognize patterns and structures in code'" [Source: MoonBit]

2. **AST/tree-based representation outperforms flat tokens**
   - "Many LLMs treat code as simple sequences, neglecting its structured nature" [Source: AST-T5]
   - AST-T5 achieves +2-3 point improvements by "retaining code structure" via dynamic programming

3. **Context-free grammars (CFGs) enable guaranteed validity**
   - XGrammar achieves "100% structural correctness" using CFGs [Source: XGrammar]
   - "Up to 100x speedup over existing solutions" [Source: XGrammar]
   - "Context-Free Grammars (CFGs) provide more expressiveness than regex" [Source: Constrained Decoding Guide]

4. **JSON-like structured formats work well with constrained generation**
   - "3.5x on JSON schema workload, 10x on CFG workload" speedup [Source: XGrammar]
   - "Constrained decoding, regardless of framework, achieves higher performance
     than unconstrained setting" (~3% improvement) [Source: JSONSchemaBench]

5. **Current tokenizers unsuited for machine-readable formats**
   - "Tokenizers of existing LLMs are not built to work with LLVM IR" [Source: LLM IR Paper]
   - "Using a tokenizer for natural language doesn't transfer well for machine languages" [Source: LLM IR Paper]

6. **LLMs cannot anticipate future constraints**
   - "The model does not know what is coming in advance: it generates predictions
     only based on the tokens that precede it" [Source: Constrained Decoding Guide]
   - Language must ensure partial outputs remain valid at each generation step

---

## 🔗 INFERRED (Logical connections between sources)

### Hypothetical LLM-Native Language Features

Based on research synthesis, such a language might feature:

```lisp
(FUNCTION
  (NAME "calculate_sum")
  (PARAMS
    (PARAM (TYPE int) (NAME x))
    (PARAM (TYPE int) (NAME y)))
  (RETURN_TYPE int)
  (BODY
    (RETURN
      (ADD (VAR x) (VAR y)))))
```

**Design principles:**

- 🌳 Linearized AST with explicit node types
- 📍 Every construct has deterministic, fixed-position grammar rules
- 🚫 No context-dependent resolution (no implicit imports, inference, dynamic dispatch)
- 📝 Verbose but unambiguous—human readability sacrificed for machine parsability
- ✅ Monotonically valid—every prefix is a valid partial program

---

## 📊 Evidence Table

| Finding | Source | Verbatim Quote | Confidence |
|---------|--------|----------------|------------|
| Explicit types better | Lobsters | "Implicit types will be harder to work with than explicit types" | 🟢 High |
| Structure matters | AST-T5 | "neglecting its structured nature" | 🟢 High |
| CFGs guarantee validity | XGrammar | "100% structural correctness" | 🟢 High |
| JSON constraints work | XGrammar | "3.5x on JSON schema workload" | 🟢 High |
| Tokenizers need work | LLM IR Paper | "Tokenizers of existing LLMs are not built to work with LLVM IR" | 🟢 High |
| Models can't look ahead | Constrained Decoding | "model does not know what is coming in advance" | 🟢 High |
| Constraints improve quality | JSONSchemaBench | "achieves higher performance than the unconstrained setting" | 🟢 High |

---

## 🛠️ Existing Approaches

### Languages/Tools for LLM Interaction

| Tool | Description | Approach |
|------|-------------|----------|
| **[[LMQL]]** | Language Model Query Language | Python control flow + string interpolation for LLM interaction |
| **[[SudoLang]]** | Pseudocode for LLMs | Natural language + programming constructs |
| **[[MoonBit]]** | AI-friendly language | Static types, simple syntax, fast analysis |
| **[[XGrammar]]** | Structured generation engine | CFG-based constrained decoding |
| **[[Outlines]]** | Structured text generation | Regex/JSON schema constraints |

### Key Constrained Decoding Frameworks

- **Guidance** - Highest compliance rate, best throughput
- **XGrammar** - 100x speedup, CFG support
- **Outlines** - Flexible but slower compilation
- **llama.cpp grammar** - Integrated with inference

---

## 🏆 Existing Languages Aligned with Research

### 1. Lisp/Scheme/Clojure (S-expressions) — Best Match

**Why:** Near-perfect alignment with research principles

- "Code is already data" - homoiconicity
  [Source: [SIGPLAN](https://blog.sigplan.org/2020/03/25/homoiconicity-lisp-and-program-synthesis/)]
- "Lisp's hallmark feature—homoiconicity—naturally complements the capabilities of large language
  models, which benefit from easily parseable and manipulable structures"
  [Source: [arXiv](https://arxiv.org/html/2506.10021v1)]
- AST is literally the syntax - no parsing ambiguity
- "The adoption of S-expressions makes it much more conducive to generate and programmatically interact" [Source: [arXiv](https://arxiv.org/html/2410.16690v2)]

```clojure
(defn add [x y] (+ x y))  ; This IS the AST
```

### 2. Rust — Compiler as Verifier

**Why:** Explicit types + immediate feedback loop

- "Rust's compiler adds significant advantage... detailed, structured errors at compile time...
  for LLMs, it's an immediate feedback loop" [Source: [RunMat](https://runmat.org/blog/why-rust)]
- "Tighter distributions generally yield more reliable, idiomatic generations" - consistent formatting via rustfmt
- "Using Rust as a 'verification layer' for LLM-generated code" [Source: [RunMat](https://runmat.org/blog/why-rust)]

### 3. Go — Simple & Explicit

**Why:** Minimal syntax variation

- Explicit error handling (no exceptions)
- `gofmt` enforces single style
- Explicit types (no inference beyond `:=`)
- Simple grammar, few keywords

### 4. [[MoonBit]] — Designed for LLMs

**Why:** Purpose-built for AI code generation

- "Designed in a simple and clear way, which not only allows big models to understand MoonBit
  easily" [Source: [MoonBit](https://www.moonbitlang.com/blog/ai-coding)]
- Static types, fast analysis, explicit everything

### 📊 Alignment Matrix

| Criterion | Lisp | Rust | Go | MoonBit | Python |
|-----------|------|------|-----|---------|--------|
| Explicit types | ❌ | ✅ | ✅ | ✅ | ❌ |
| AST = Syntax | ✅ | ❌ | ❌ | ❌ | ❌ |
| Consistent formatting | ⚠️ | ✅ | ✅ | ✅ | ❌ |
| No implicit behavior | ✅ | ✅ | ✅ | ✅ | ❌ |
| Compiler feedback | ❌ | ✅ | ✅ | ✅ | ❌ |
| Simple grammar | ✅ | ❌ | ✅ | ✅ | ⚠️ |

### ⚠️ Why Python Dominates Benchmarks (But Isn't Ideal)

- "LLMs perform best in Python, likely due to Python's abundance in training data" [Source: [Medium](https://medium.com/@sunnypatel124555/automated-code-generation-with-large-language-models-llms-0ad32f4b37c8)]
- Most benchmarks (HumanEval, MBPP, SWE-bench) are Python-only
- **Not because Python is LLM-friendly** — because training data is Python-heavy

### 💡 Recommendation

**For LLM-native experimentation:**

1. **Clojure/Racket** - S-expressions are closest to "AST-as-syntax"
2. **Rust** - Best compiler feedback loop for verification
3. **Go** - Simplest grammar among mainstream languages

**Interesting hybrid:** Train LLM to generate S-expressions, transpile to target language.

---

## ❓ What Sources DON'T Cover (Gaps)

- 🔴 No production LLM-native language exists yet (only design principles)
- 🔴 No benchmarks comparing human-readable vs machine-readable code generation
- 🔴 No research on optimal token vocabulary for code-only LLMs
- 🔴 Unclear how to handle semantic constraints beyond syntactic validity
- 🔴 No studies on training LLMs specifically on non-human-readable formats
- 🔴 Unknown: Would LLMs trained on such formats transfer to human-readable code?

---

## 💡 Speculative Design Directions

### Option A: Linearized AST (S-expression style)

```lisp
(module
  (import (std io))
  (fn main (args (list string)) int
    (call io.println (str "Hello"))
    (return 0)))
```

### Option B: JSON-based IR

```json
{
  "type": "function",
  "name": "main",
  "params": [{"name": "args", "type": "list<string>"}],
  "return": "int",
  "body": [
    {"type": "call", "fn": "io.println", "args": ["Hello"]},
    {"type": "return", "value": 0}
  ]
}
```

### Option C: Tagged binary format

- Fixed-width opcodes
- Explicit length prefixes
- No ambiguous parsing states
- Directly maps to bytecode

---

## 🔗 Related Notes

- [[Constrained Decoding]]
- [[AST Representations for Code]]
- [[LLM Code Generation]]
- [[Tokenization Strategies]]

---

## 📚 Sources

1. [MoonBit AI Coding Blog](https://www.moonbitlang.com/blog/ai-coding)
2. [AST-T5: Structure-Aware Pretraining - arXiv](https://arxiv.org/abs/2401.03003) (ICML 2024)
3. [XGrammar Paper - arXiv](https://arxiv.org/abs/2411.15100) (Nov 2024)
4. [Constrained Decoding Guide](https://www.aidancooper.co.uk/constrained-decoding/)
5. [JSONSchemaBench - arXiv](https://arxiv.org/html/2501.10868v1) (Jan 2025)
6. [LLMs and Compiler IR - arXiv](https://arxiv.org/html/2502.06854) (Feb 2025)
7. [LMQL](https://lmql.ai/)
8. [SudoLang - Medium](https://medium.com/javascript-scene/sudolang-a-powerful-pseudocode-programming-language-for-llms-d64d42aa719b)
9. [Lobsters Discussion](https://lobste.rs/s/abmrbs/are_there_characteristics_languages)

---

## 🎯 Next Steps

- [ ] Explore [[XGrammar]] implementation details
- [ ] Research [[TOKOMPILER]] for code-specific tokenization
- [ ] Investigate [[MoonBit]] design decisions deeper
- [ ] Create prototype grammar for LLM-native language
- [ ] Connect to [[Code Generation MOC]]
