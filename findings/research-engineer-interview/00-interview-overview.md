# 🎯 Research Engineer Interview Guide

**Date:** 2025-12-22
**Tags:** #research #career #ML #interview #preparation
**Focus:** Software Engineer → Research Engineer transition without ML background

---

## 📋 Interview Structure

### 🏢 Interview Format by Company

| Company | Rounds | Unique Elements |
|---------|--------|-----------------|
| **OpenAI** | 6 | Non-Leetcode coding, ML debugging, 2-part research discussion |
| **DeepMind** | 5+ | ML debugging (most "out of distribution"), stats/ML/CS split technical |
| **Google** | 8+ | Open-ended coding (no test cases), AI pipeline deep-dives |
| **Meta** | 6-8 | Research talk, 3 research interviews, heavy behavioral |
| **Amazon** | 5-7 | Leadership Principles 30-50% of time, research depth interview |
| **Microsoft Research** | Variable | Informal, no mandatory coding for some roles |

### 📝 Core Interview Components

1. **Coding Interview** - Not pure Leetcode; emphasis on ML-adjacent problems
2. **ML Fundamentals** - Theory + practical understanding
3. **ML Debugging** - Unique to research roles (fix bugs in neural network code)
4. **Research Discussion** - Present past work + discuss papers (40-55 min presentation)
5. **Behavioral** - Culture fit, collaboration style

---

## 🎯 Key Topics (2024-2025)

### Transformers & LLMs

- Self-attention, multi-head attention
- Positional encodings (absolute/relative)
- KV cache, tokenization, scaling laws
- RLHF, DPO, RAG, instruction tuning

### Deep Learning

- Backpropagation, gradient flow
- Optimization (SGD, Adam, momentum)
- Regularization techniques
- Overfitting vs underfitting

### Systems & Scaling

- Data/model/pipeline parallelism
- ZeRO, FSDP optimizations
- Distributed training
- Inference optimization (quantization, FlashAttention)

---

## 📚 Essential Resources

### 📖 Books

- "Cracking the Coding Interview" - McDowell
- "Hands-on Machine Learning" - Géron
- "Deep Learning" - Goodfellow et al.
- "Grokking the Machine Learning Interview"
- "Introduction to Machine Learning Interviews" - Chip Huyen

### 🎥 Courses

- [fast.ai](https://www.fast.ai/) - Practical Deep Learning
- Andrew Ng's ML/DL Specialization (Coursera)
- Stanford CS229 (YouTube)
- Google's ML Crash Course

---

## 🎬 YouTube Learning Resources

### 🏆 Tier 1: Must-Watch (Core Curriculum)

| Channel | What You'll Learn | Best For |
|---------|------------------|----------|
| **[Andrej Karpathy](https://karpathy.ai/zero-to-hero.html)** | Neural Networks: Zero to Hero - builds from backprop to GPT | Transformers, practical implementation |
| **[3Blue1Brown](https://www.3blue1brown.com/topics/neural-networks)** | Visual intuition for math, neural networks, transformers | Math foundations, attention mechanism |
| **[StatQuest (Josh Starmer)](https://www.youtube.com/statquest)** | Statistics & ML algorithms explained simply | ML fundamentals, algorithm intuition |
| **[fast.ai (Jeremy Howard)](https://www.youtube.com/c/howardjeremyp)** | Practical Deep Learning for Coders | Top-down learning, getting results fast |

### 📚 Andrej Karpathy's "Neural Networks: Zero to Hero"

**[Playlist](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ)** - Gold standard for learning neural networks from scratch.

| Video | Duration | What You Build |
|-------|----------|----------------|
| 1. micrograd | ~2.5 hrs | Backprop engine from scratch |
| 2. makemore pt1 | ~1.5 hrs | Bigram language model |
| 3. makemore pt2 | ~2 hrs | MLP character-level model |
| 4. makemore pt3 | ~1.5 hrs | Activations, gradients, BatchNorm |
| 5. makemore pt4 | ~1.5 hrs | Becoming a backprop ninja |
| 6. makemore pt5 | ~1 hr | WaveNet-like model |
| 7. **Let's build GPT** | ~2 hrs | GPT from scratch (essential!) |
| 8. Tokenization | ~2 hrs | BPE tokenizer from scratch |

### 📐 3Blue1Brown Neural Networks Series

**[Playlist](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)**

| Video | Focus |
|-------|-------|
| Chapter 1 | But what is a neural network? |
| Chapter 2 | Gradient descent, how neural networks learn |
| Chapter 3 | What is backpropagation really doing? |
| Chapter 4 | Backpropagation calculus |
| Chapter 5 | Transformers, the tech behind LLMs (2024) |
| Chapter 6 | Attention in transformers, step-by-step |
| Chapter 7 | How might LLMs store facts |

### 🔧 Tier 2: Practical Skills & Hands-On

| Channel | Focus | Link |
|---------|-------|------|
| **Sentdex** | Python ML, OpenCV, practical projects | [YouTube](https://www.youtube.com/sentdex) |
| **Codebasics** | End-to-end projects, MLOps | [YouTube](https://www.youtube.com/codebasics) |
| **Krish Naik** | In-depth tutorials, NLP, real-world projects | [YouTube](https://www.youtube.com/krishnaik06) |
| **Tech With Tim** | Beginner-friendly Python & ML | [YouTube](https://www.youtube.com/TechWithTim) |
| **freeCodeCamp** | Long-form comprehensive courses | [YouTube](https://www.youtube.com/freecodecamp) |

### 🔬 Tier 3: Research & Staying Current

| Channel | Focus | Link |
|---------|-------|------|
| **Yannic Kilcher** | Deep paper breakdowns, technical analysis | [YouTube](https://www.youtube.com/YannicKilcher) |
| **Two Minute Papers** | Accessible research summaries | [YouTube](https://www.youtube.com/TwoMinutePapers) |
| **Lex Fridman Podcast** | Long interviews with AI researchers | [YouTube](https://www.youtube.com/lexfridman) |
| **Abhishek Thakur** | Applied ML, Kaggle strategies | [YouTube](https://www.youtube.com/AbhishekThakur) |
| **DeepLearning.AI** | Andrew Ng's structured content | [YouTube](https://www.youtube.com/c/Deeplearningai) |

### 📺 University Lectures (Free on YouTube)

| Course | Instructor | Best Version |
|--------|------------|--------------|
| **CS229: Machine Learning** | Andrew Ng | [Autumn 2018](https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU) |
| **CS231n: CNN for Visual Recognition** | Fei-Fei Li, Karpathy | [Spring 2017](https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv) |
| **CS224n: NLP with Deep Learning** | Chris Manning | [Winter 2021](https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ) |

### 💻 Practice

- [LeetCode](https://leetcode.com/) - Coding
- [Kaggle](https://www.kaggle.com/) - Competitions & datasets
- [Sasha Rush's Tensor Puzzles](https://github.com/srush/Tensor-Puzzles)
- [deep-ml.com](https://deep-ml.com/), [mlengineer.io](https://mlengineer.io/)

### 📄 Key Papers & Repos

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Andrej Karpathy's nanoGPT](https://github.com/karpathy/nanoGPT)
- [Josh Achiam's Key Papers in Deep RL](https://spinningup.openai.com/en/latest/spinningup/keypapers.html)

---

## 🏁 Key Takeaways

1. **Preparation beats talent** - "It's not the smartest who clears the interviews - it's the most prepared"
2. **200+ hours minimum** for skill building
3. **Implementation > theory** - "implement and debug ML algorithms, going from math in a paper to running code"
4. **Specialize in 1-2 domains**
5. **PhD not required** for RE roles
6. **ML debugging is unique** to research interviews
7. **SWE skills transfer well** - focus on adding ML layer

---

## 📅 Preparation Plans

- [[6-month-plan/00-overview|6-Month Plan]] - Intensive (20-25 hrs/week)
- [[12-month-plan/00-overview|12-Month Plan]] - Sustainable (15-20 hrs/week)

---

## 🔗 Sources

1. [TeamRora - 2025 Technical Interview Guide for AI Researchers](https://www.teamrora.com/post/the-2025-technical-interview-guide-for-ai-researchers)
2. [80000 Hours - ML Engineering Career Transition Guide](https://80000hours.org/articles/ml-engineering-career-transition-guide/)
3. [GitHub - Machine Learning for Software Engineers](https://github.com/ZuzooVn/machine-learning-for-software-engineers)
4. [Chip Huyen - ML Interviews Book](https://huyenchip.com/ml-interviews-book/)
5. [Towards Data Science - 2024 MLE Interview Survival Guide](https://towardsdatascience.com/2024-survival-guide-for-machine-learning-engineer-interviews-e74eccef4645/)
6. [GitHub - Patrick Loeber ML Study Plan](https://github.com/patrickloeber/ml-study-plan)
7. [Towards Data Science - SWE to MLE Transition](https://towardsdatascience.com/make-the-switch-from-software-engineer-to-ml-engineer-7a4948730c97/)
8. [GitHub - alirezadir/Machine-Learning-Interviews](https://github.com/alirezadir/Machine-Learning-Interviews)

---

**Related:** [[02-infrastructure-engineer-ml-path]]
**Suggested location:** 3_Resources/Career/
**Potential MOCs:** [[Career Development MOC]], [[Machine Learning MOC]]
**Tags:** #career #interview #ML #research-engineer #preparation
