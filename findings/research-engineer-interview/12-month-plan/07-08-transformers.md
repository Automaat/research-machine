# 📅 Months 7-8: Transformers & Modern ML (120-150 hours)

**Tags:** #career #ML #preparation #12-month-plan #transformers #llm

---

## 🎯 Goals

- Deep understanding of transformer architecture
- Implement transformer from scratch (no HuggingFace)
- Train nanoGPT on custom corpus
- Fine-tune LLM with LoRA
- Understand distributed training concepts

---

## 📆 Month 7: Transformer Architecture Deep Dive

### Attention Is All You Need (Mandatory Deep Study)

Read this paper 3+ times. Know every detail.

### Self-Attention Mathematics

- Query, Key, Value intuition
- Scaled dot-product attention: why scale by √d_k
- Softmax as soft selection
- Attention weights interpretation

### Multi-Head Attention

- Why multiple heads (different subspaces)
- Head concatenation and projection
- Attention patterns visualization

### Positional Encodings

- Why position matters (permutation invariance)
- Sinusoidal encodings (derivation)
- Learned positional embeddings
- Rotary Position Embeddings (RoPE)
- Relative position encodings

### Architecture Details

- Layer normalization: pre-LN vs post-LN (training stability)
- Feed-forward networks: why 4x hidden dim?
- Residual connections: gradient flow
- Encoder vs decoder attention patterns

### Implementation

- Build transformer encoder from scratch
- Build transformer decoder from scratch
- Implement causal masking
- Test on toy tasks

---

## 📆 Month 8: LLMs & Training at Scale

### Pre-training

- **Tokenization:** BPE, WordPiece, SentencePiece, Unigram
- **Language modeling:** Causal LM vs masked LM
- **Scaling laws:** Chinchilla, compute-optimal training
- **Perplexity:** What it measures, limitations

### Post-training

- **Instruction tuning:** Supervised fine-tuning on instructions
- **LoRA:** Low-rank adaptation mathematics
- **RLHF:** Reward model → PPO pipeline
- **DPO:** Direct preference optimization (simpler alternative)

### Inference Optimization

- **KV cache:** Why and how it works
- **Sampling:** Temperature, top-k, top-p (nucleus)
- **Speculative decoding:** Draft model acceleration
- **Quantization:** INT8, INT4, GPTQ
- **FlashAttention:** IO-aware attention algorithm

### Distributed Training (Interview Hot Topic!)

- **Data parallelism:** DDP basics
- **Model parallelism:** Tensor vs pipeline
- **ZeRO optimization:** Stages 1, 2, 3
- **FSDP:** Fully Sharded Data Parallel
- **Megatron-LM:** Model parallelism at scale

---

## 📚 Resources

| Topic | Resource | Link |
|-------|----------|------|
| Paper | Attention Is All You Need | [arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762) |
| Implementation | nanoGPT | [github.com/karpathy/nanoGPT](https://github.com/karpathy/nanoGPT) |
| Implementation | minGPT | [github.com/karpathy/minGPT](https://github.com/karpathy/minGPT) |
| Annotated | The Annotated Transformer | [nlp.seas.harvard.edu/annotated-transformer](https://nlp.seas.harvard.edu/annotated-transformer/) |
| Paper | Llama 3 | [ai.meta.com/research/publications/llama-3](https://ai.meta.com/research/publications/llama-3/) |
| Paper | Megatron-LM | [arxiv.org/abs/1909.08053](https://arxiv.org/abs/1909.08053) |
| Docs | HuggingFace Parallelism | [huggingface.co/docs/transformers/parallelism](https://huggingface.co/docs/transformers/parallelism) |
| Blog | Lilian Weng | [lilianweng.github.io](https://lilianweng.github.io/) |
| Paper | LoRA | [arxiv.org/abs/2106.09685](https://arxiv.org/abs/2106.09685) |
| Paper | FlashAttention | [arxiv.org/abs/2205.14135](https://arxiv.org/abs/2205.14135) |

---

## 🎬 YouTube Watch List

### Month 7: Transformers

1. **Andrej Karpathy** - Let's build GPT ⭐⭐ (essential!)
2. **3Blue1Brown** - Attention in transformers
3. **3Blue1Brown** - How might LLMs store facts
4. **Yannic Kilcher** - Attention Is All You Need

### Month 8: Modern LLMs

1. **Andrej Karpathy** - Tokenization
2. **Yannic Kilcher** - LoRA, RLHF papers
3. **HuggingFace** - Distributed training tutorials

---

## ✅ Milestones

### Month 7

- [ ] Read "Attention Is All You Need" 3+ times
- [ ] ✅ Implement transformer from scratch (no HuggingFace)
- [ ] Can write attention equations on whiteboard

### Month 8

- [ ] ✅ Train nanoGPT on custom corpus
- [ ] ✅ Fine-tune open-source LLM with LoRA
- [ ] Understand distributed training tradeoffs

---

## 📝 Transformer from Scratch Requirements

Build complete transformer with:

```python
class MultiHeadAttention:
    # Q, K, V projections
    # Scaled dot-product attention
    # Multi-head concatenation

class TransformerBlock:
    # Multi-head attention
    # Feed-forward network
    # Layer norm (pre-LN)
    # Residual connections

class Transformer:
    # Embedding layer
    # Positional encoding
    # N transformer blocks
    # Output projection
```

Test on:

- Copy task (learn to copy sequences)
- Sorting task
- Simple translation

---

## 🎯 Interview Hot Topics

Prepare detailed answers for:

1. **"Walk me through self-attention"**
   - Write equations, explain each part

2. **"Why scale by √d_k?"**
   - Variance analysis, softmax behavior

3. **"Why multi-head attention?"**
   - Different representation subspaces

4. **"How does KV cache work?"**
   - Memory/compute tradeoff for inference

5. **"Explain RLHF pipeline"**
   - Reward model training → PPO

6. **"Data vs model parallelism?"**
   - When to use which, communication costs

7. **"What's FlashAttention?"**
   - IO-aware algorithm, tiling

8. **"Why LoRA works?"**
   - Low-rank updates, parameter efficiency

---

## 📝 Self-Assessment Checklist

**Architecture:**

- [ ] Can implement attention from scratch
- [ ] Know why √d_k scaling
- [ ] Understand pre-LN vs post-LN
- [ ] Can explain RoPE

**LLMs:**

- [ ] Know RLHF vs DPO tradeoffs
- [ ] Understand LoRA mathematics
- [ ] Can explain KV cache

**Distributed:**

- [ ] Know ZeRO stages
- [ ] Understand tensor vs pipeline parallelism
- [ ] Can explain communication costs

---

**Navigation:** [[05-06-deep-learning|← Months 5-6]] | [[09-10-specialization|Months 9-10 →]]
