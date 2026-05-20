# RAG vs Agentic Chatbot Evaluation Guide

**Date:** 2026-02-27
**Tags:** #evaluation #rag #agents #llm #metrics

---

## 🎯 Goal

Compare a **RAG chatbot** vs an **Agentic chatbot** on the same queries with fair,
reproducible metrics.

---

## 🧱 Step 1: Build a Shared Test Set

This is the foundation. Do this first.

- **50–100 realistic user queries** from your actual use case
- Each query needs:
  - `question` — the input
  - `ground_truth` — correct answer (for reference-based metrics)
  - `reference_contexts` — relevant source chunks (for RAG context recall)
- Include **edge cases**: ambiguous queries, multi-part questions, unanswerable questions
- Keep the test set **stable** — don't change it between runs

```jsonc
// test_case example
{
  "question": "How do I reset my password?",
  "ground_truth": "Go to Settings > Security > Reset Password and follow the email link.",
  "reference_contexts": ["doc_chunk_42", "doc_chunk_17"]
}
```

---

## 📊 Step 2: Metrics to Implement

### Shared metrics (run on BOTH systems)

| Metric | What it measures | Tool |
|--------|-----------------|------|
| **Faithfulness** | Are claims grounded in source material? 0–1 | RAGAS |
| **Answer Relevancy** | Does the response address the question? | RAGAS |
| **Factual Correctness** | Factually accurate vs ground truth? | RAGAS |
| **Task Completion** | Did it achieve the user's goal? | DeepEval |

### RAG-only metrics

| Metric | What it measures | Tool |
|--------|-----------------|------|
| **Context Precision** | Are retrieved chunks relevant (not noisy)? | RAGAS |
| **Context Recall** | Were all needed chunks retrieved? | RAGAS |
| **Noise Sensitivity** | Does irrelevant context degrade output? | RAGAS |

> Skip `NDCG@k` / `Precision@k` unless you need to debug the retriever in isolation.

### Agentic-only metrics

| Metric | What it measures | Tool |
|--------|-----------------|------|
| **Tool Call Accuracy** | Correct tool invoked? (exact match) | RAGAS / DeepEval |
| **Tool Call F1** | Precision vs recall on tool usage | RAGAS |
| **Agent Goal Accuracy** | End-state achieved? | RAGAS |
| **Step Efficiency** | Unnecessary steps taken? | DeepEval / Braintrust |

---

## 🛠️ Step 3: Tooling Setup

### Option A — RAGAS (recommended for RAG, covers agents too)

```bash
pip install ragas
```

```python
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall,
)
from datasets import Dataset

data = {
    "question": [...],
    "answer": [...],          # your chatbot's output
    "contexts": [[...]],      # retrieved chunks (list of lists)
    "ground_truth": [...],
}

result = evaluate(Dataset.from_dict(data), metrics=[
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall,
])
print(result)
```

### Option B — DeepEval (better for agentic)

```bash
pip install deepeval
```

```python
from deepeval import evaluate
from deepeval.metrics import (
    AnswerRelevancyMetric,
    FaithfulnessMetric,
    TaskCompletionMetric,
    ToolCorrectnessMetric,
)
from deepeval.test_case import LLMTestCase, LLMAgentTestCase

# For RAG
test_case = LLMTestCase(
    input="How do I reset my password?",
    actual_output=rag_bot.answer("How do I reset my password?"),
    expected_output="...",
    retrieval_context=[...],
)

# For Agent
agent_test_case = LLMAgentTestCase(
    input="Book me a flight to Warsaw",
    actual_output=agent_bot.run("Book me a flight to Warsaw"),
    tools_called=agent_bot.get_trace(),   # list of tool calls
    expected_tools=["search_flights", "book_flight"],
)

evaluate([test_case], [AnswerRelevancyMetric(), FaithfulnessMetric()])
evaluate([agent_test_case], [ToolCorrectnessMetric(), TaskCompletionMetric()])
```

---

## 🔍 Step 4: Evaluation Modes

### Black-box (start here)

Run the full system, score final output only.
Good for: overall quality comparison between RAG and agent.

### Component-level (debug failures)

- **RAG:** evaluate retriever alone (context precision/recall), then generator alone (faithfulness)
- **Agent:** trace each step, score tool calls individually, then end-to-end goal

Enable tracing for your agent:

```python
# LangChain example
from langchain.callbacks import LangChainTracer
tracer = LangChainTracer()
agent.run(query, callbacks=[tracer])
```

---

## ⚡ Step 5: LLM-as-Judge Setup

Most metrics use an LLM judge internally. Configure it once:

```python
# RAGAS
from ragas.llms import LangchainLLMWrapper
from langchain_anthropic import ChatAnthropic

judge_llm = LangchainLLMWrapper(ChatAnthropic(model="claude-sonnet-4-6"))

# set globally
from ragas import evaluate
result = evaluate(..., llm=judge_llm)
```

> Use a **different, stronger model** as judge than the one powering your chatbots.
> Using the same model introduces self-grading bias.

---

## 🧪 Step 6: Stress Testing (Both Systems)

Run these additional test categories:

| Category | What to test |
|----------|-------------|
| **Robustness** | Same question rephrased 3 different ways |
| **Edge cases** | Multi-part questions, ambiguous queries |
| **Hallucination probe** | Questions with false premises, unanswerable queries |
| **Adversarial** | Prompt injection attempts, jailbreaks |

Flag: does one system degrade more on adversarial inputs?

---

## 📋 Step 7: Comparison Scorecard

After running eval, fill this out:

| Dimension | RAG Bot | Agent Bot | Winner |
|-----------|---------|-----------|--------|
| Faithfulness | | | |
| Answer Relevancy | | | |
| Factual Correctness | | | |
| Task Completion | | | |
| Context Precision (RAG only) | N/A | | — |
| Tool Accuracy (Agent only) | | N/A | — |
| Step Efficiency | | | |
| Avg Latency | | | |
| Avg Cost/query | | | |
| Adversarial resilience | | | |

---

## ⚠️ Common Pitfalls

- **Don't use the same LLM as judge AND as chatbot** — self-grading bias
- **Don't change test set between runs** — results become incomparable
- **Don't skip component eval** — overall score hides where failures happen
- **Agentic eval is expensive** — start with 20–30 cases, scale up after tuning
- **Faithfulness ≠ Correctness** — faithful to wrong retrieved context still fails

---

## 🔒 Optional: Safety Evaluation (Giskard)

```bash
pip install giskard
```

Add on top of RAGAS for both systems:

- Prompt injection resilience
- Hallucination on out-of-domain queries
- Harmful content / policy adherence

---

## Sources

- [RAGAS docs](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/)
- [DeepEval agent guide](https://www.confident-ai.com/blog/llm-agent-evaluation-complete-guide)
- [Evidently AI RAG guide](https://www.evidentlyai.com/llm-guide/rag-evaluation)
- [Braintrust agent eval](https://www.braintrust.dev/articles/ai-agent-evaluation-framework)
