# 📅 Month 4: Transformers & Modern ML (80-100 hours)

**Tags:** #career #ML #preparation #month-4 #transformers #llm

---

## 🎯 Goals

- Deep understanding of transformer architecture
- Master attention mechanisms
- Understand modern LLM training and inference
- Implement transformer from scratch

---

## 📆 Week 1-2: Transformer Architecture

### Attention Is All You Need (Mandatory Deep Study)
- Self-attention mechanism (Q, K, V)
- Scaled dot-product attention (why scale?)
- Multi-head attention (why multiple heads?)
- Positional encodings (sinusoidal, learned, RoPE)

### Transformer Components
- Encoder-decoder structure
- Layer normalization (pre-LN vs post-LN)
- Feed-forward networks
- Residual connections

### Implementation
- Build transformer encoder from scratch
- Build transformer decoder from scratch
- Understand causal masking

---

## 📆 Week 3-4: LLMs & Modern Techniques

### Pre-training
- Tokenization (BPE, WordPiece, SentencePiece)
- Language modeling objective
- Scaling laws (Chinchilla)
- Perplexity metric

### Post-training
- Instruction tuning
- LoRA and parameter-efficient fine-tuning
- RLHF (Reinforcement Learning from Human Feedback)
- DPO (Direct Preference Optimization)

### Inference
- KV cache (why and how)
- Sampling schemes (temperature, top-k, top-p)
- Speculative decoding
- Quantization (INT8, INT4)
- FlashAttention (memory-efficient attention)

### Distributed Training (Interview Hot Topic)
- Data parallelism
- Model parallelism (tensor, pipeline)
- ZeRO optimization
- FSDP
- Megatron-LM concepts

---

## 📚 Resources

| Topic | Resource | Link |
|-------|----------|------|
| Paper | Attention Is All You Need | [arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762) |
| Implementation | Andrej Karpathy's nanoGPT | [github.com/karpathy/nanoGPT](https://github.com/karpathy/nanoGPT) |
| Paper | Llama 3 | [ai.meta.com/research/publications/llama-3](https://ai.meta.com/research/publications/llama-3/) |
| Docs | HuggingFace Transformers | [huggingface.co/docs/transformers](https://huggingface.co/docs/transformers/) |
| Distributed | HuggingFace Distributed Training | [huggingface.co/docs/transformers/parallelism](https://huggingface.co/docs/transformers/parallelism) |
| Paper | Megatron-LM | [arxiv.org/abs/1909.08053](https://arxiv.org/abs/1909.08053) |
| Blog | Lilian Weng's Blog | [lilianweng.github.io](https://lilianweng.github.io/) |

### 📖 Reading List

1. **"Attention Is All You Need"** - Read 3+ times
2. **"Llama 3"** paper - Modern architecture decisions
3. **Megatron paper** - Model parallelism (interview topic!)

---

## 🎬 YouTube Watch List

### Week 1-2: Transformers
1. **3Blue1Brown** - Attention in transformers ⭐
2. **3Blue1Brown** - How might LLMs store facts
3. **Andrej Karpathy** - Let's build GPT ⭐⭐ (essential!)

### Week 3-4: Modern LLMs
1. **Andrej Karpathy** - Tokenization
2. **Yannic Kilcher** - Attention Is All You Need breakdown
3. **Yannic Kilcher** - RLHF, DPO explanations

---

## ✅ Milestone

**Implement nanoGPT, train on small corpus**

### Project Steps
1. Clone nanoGPT repo
2. Study the code thoroughly
3. Train on Shakespeare dataset
4. Modify architecture (experiment!)
5. Train on your own dataset

### What You Should Understand
- Every line of the transformer implementation
- Why each hyperparameter matters
- Memory/compute tradeoffs
- Training dynamics

---

## 📝 Self-Assessment Checklist

- [ ] Can implement self-attention from scratch
- [ ] Understand why we scale by √d_k
- [ ] Know difference between encoder/decoder attention
- [ ] Can explain positional encoding options
- [ ] Understand KV cache optimization
- [ ] Know RLHF vs DPO tradeoffs
- [ ] Can explain data vs model parallelism
- [ ] Understand FlashAttention at high level

---

## 🎯 Interview Hot Topics

These come up frequently in research engineer interviews:

1. **"Walk me through self-attention"** - Be able to write equations
2. **"Why multi-head attention?"** - Different representation subspaces
3. **"How does KV cache work?"** - Memory optimization for inference
4. **"Explain RLHF"** - Reward model → PPO training
5. **"Data vs model parallelism"** - When to use which
6. **"What's FlashAttention?"** - IO-aware attention algorithm

---

## 🔗 Code References

- [nanoGPT](https://github.com/karpathy/nanoGPT) - Minimal GPT implementation
- [minGPT](https://github.com/karpathy/minGPT) - Even more minimal
- [Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/) - Line-by-line explanation

---

**Navigation:** [[03-month-3-deep-learning|← Month 3]] | [[05-month-5-specialization|Month 5 →]]
