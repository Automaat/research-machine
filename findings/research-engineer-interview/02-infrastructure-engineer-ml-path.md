# 🔧 Infrastructure Engineer → ML/Research Engineer Path

**Date:** 2025-12-22
**Tags:** #career #ML #distributed-systems #infrastructure #kubernetes #GPU
**Focus:** Leveraging distributed systems & K8s background for ML roles

---

## 📊 Your Background Advantage

### 📄 Source Evidence

**Source 9: [DeepMind Research Engineer Job Posting](https://job-boards.greenhouse.io/deepmind/jobs/6604209)**

**Key Claims:**

1. "BSc, MSc or PhD/DPhil degree...or **equivalent practical experience**" → PhD not mandatory
2. "Experience with large-scale data processing frameworks or **distributed training infrastructure**" → Infra experience valued
3. "Excellent software engineering skills with a proven ability to build **robust and scalable systems**" → SWE skills transfer

**Source 10: [JoinTaro - Transition to ML Engineer](https://www.jointaro.com/question/YqrpDDCPbsGpg0lwrKXY/looking-to-transition-to-ml-engineer-what-do-you-want-to-know/)**

**Key Claims:**

1. "If infra is your primary concern...CS is much more important than math" → CS > math for infra roles
2. "If you understand derivatives and matrix multiplication you have all the math you need for that role" → Lower math bar
3. "ML Researcher -> Applied Scientist -> ML Engineer -> ML Infrastructure Engineer" → Role spectrum exists

**Source 11: [Second Talent - ML Infrastructure Engineer](https://www.secondtalent.com/occupations/machine-learning-infrastructure-engineer/)**

**Key Claims:**

1. "ML infrastructure professionals work across...distributed training systems for large models" → Distributed systems applicable
2. "The ML infrastructure field has experienced over 400% growth in recent years" → High demand

---

## 🎯 Skills Mapping: Your Background → ML Roles

| Your Skill | Direct Application in Research Engineering |
|------------|-------------------------------------------|
| **Kubernetes** | ML training orchestration, Kubeflow, model serving |
| **Distributed systems** | Multi-GPU/TPU training, data parallelism, gradient sync |
| **Infrastructure** | Training pipelines, experiment tracking at scale |
| **Debugging at scale** | Diagnosing distributed training failures |
| **Performance optimization** | GPU utilization, memory optimization, I/O bottlenecks |

---

## 📊 Role Spectrum

```text
ML Researcher → Applied Scientist → ML Engineer → ML Infrastructure Engineer
     ↑                                                      ↑
  More ML theory                                    More systems/infra
  Less coding                                       Less ML theory
```

[Source 10: "You go in decreasing of ML knowledge and increasing order of software skills"]

**Your optimal entry points:**

1. **ML Infrastructure Engineer** - Highest leverage of current skills
2. **Research Engineer (systems-focused teams)** - Training infrastructure, scaling
3. **Applied ML Engineer** - Production ML systems

---

## 🎯 Transition Difficulty Assessment

| Factor | Assessment | Evidence |
|--------|------------|----------|
| **Math requirement** | 📉 Lower for infra-focused | [Source 10: "derivatives and matrix multiplication...all the math you need"] |
| **Systems skills transfer** | 📈 High | [Source 9: "robust and scalable systems" requirement] |
| **Competition** | 📉 Less saturated | [Source 11: "400% growth" + fewer ML PhDs have infra skills] |
| **ML depth required** | 📊 Medium | Need to understand what you're optimizing |
| **Interview coding** | 📈 Advantage | Already strong in distributed algorithms |

**Confidence:** High
**Reasoning:** Multiple sources confirm infra skills highly valued + lower ML theory bar for infrastructure-focused roles

---

## 📋 Shortened 4-5 Month Plan (Leveraging Background)

| Month | Focus | Why |
|-------|-------|-----|
| 1 | ML fundamentals + math refresh | Foundation you're missing |
| 2 | Deep learning + PyTorch | Core DL skills |
| 3 | Transformers + training dynamics | Modern architectures |
| 4 | **Distributed ML training** | Leverage your expertise |
| 5 | Interview prep + projects | Show combined skills |

### What to Skip (You Already Have)

- ❌ Basic programming/Python
- ❌ Software engineering fundamentals
- ⏩ Systems design - brief refresh on ML-specific patterns

### What to Emphasize

- ➕ Month 1-2: ML fundamentals (you need this)
- ➕ Month 3-4: Deep learning + PyTorch/JAX
- ➕ **Month 5: Distributed training deep dive** ← Your sweet spot
  - PyTorch DDP, FSDP
  - DeepSpeed, Megatron-LM
  - Data/model/pipeline parallelism
  - [Source 1: "preparing for questions about Megatron was something multiple researchers mentioned"]

---

## 🎯 Target Roles (Best Fit)

**High match (leverage infra):**

- Research Engineer, Training Infrastructure (DeepMind, OpenAI, Anthropic)
- ML Platform Engineer (Meta, Google)
- Distributed Systems Engineer, ML (OpenAI - they have this role!)
- Research Engineer, Efficiency/Scaling teams

**Medium match (need more ML):**

- Applied Research Engineer
- ML Engineer (production teams)

**Lower match (heavy ML theory):**

- Research Scientist
- Core research teams

---

## 🖥️ Hands-On Learning: GPU Programming

### 🎮 Why GPU Programming Matters

Modern ML training runs on GPUs. Understanding CUDA gives you debugging superpowers and optimization skills that pure ML practitioners lack.

### Free Courses

| Resource | Description | Link |
|----------|-------------|------|
| **freeCodeCamp CUDA Course** | 12-hour course: CUDA API, memory, kernels, PyTorch extensions | [YouTube](https://www.freecodecamp.org/news/learn-cuda-programming/) |
| **NVIDIA DLI - Intro to CUDA** | Interactive intro course | [NVIDIA Learn](https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+T-AC-01+V1) |
| **NVIDIA DLI - Modern CUDA C++** | Writing and executing GPU code | [NVIDIA Learn](https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+S-AC-04+V2) |
| **OLCF CUDA Training Series** | 13-part series from Oak Ridge National Lab | [OLCF](https://www.olcf.ornl.gov/cuda-training-series/) |
| **Oxford GPU Course** | 1-week hands-on (assumes C/C++) | [Oxford](https://people.maths.ox.ac.uk/gilesm/cuda/) |

### Hands-On Tutorials

| Resource | Focus | Link |
|----------|-------|------|
| **NVIDIA Accelerated Computing Hub** | CUDA C++ guided notebooks | [GitHub](https://github.com/NVIDIA/accelerated-computing-hub/tree/main/tutorials/cuda-cpp) |
| **Accelerated Python Tutorials** | GPU development with Python | [GitHub](https://github.com/NVIDIA/accelerated-computing-hub/tree/main/tutorials/accelerated-python) |

### 📖 Books

- **"Programming Massively Parallel Processors"** - Kirk & Hwu (the definitive CUDA book)
- **"Hands-On GPU Programming with Python and CUDA"** - Tuomanen

### 🎯 Milestone Projects

1. ✅ Implement matrix multiplication in CUDA
2. ✅ Write custom PyTorch CUDA kernel
3. ✅ Profile and optimize a training loop with Nsight

---

## ⚙️ PyTorch Distributed Training (DDP/FSDP)

### Why This is Your Sweet Spot

This bridges your infra skills and ML. You already understand distributed systems—now apply it to gradient synchronization.

### Official PyTorch Tutorials (Recommended Order)

| # | Tutorial | Description | Link |
|---|----------|-------------|------|
| 1 | **PyTorch Distributed Overview** | Conceptual overview | [PyTorch Docs](https://docs.pytorch.org/tutorials/beginner/dist_overview.html) |
| 2 | **Getting Started with DDP** | Basic setup, process spawning | [PyTorch Docs](https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html) |
| 3 | **Multi-GPU Training with DDP** | Single → 4 GPU migration | [PyTorch Docs](https://docs.pytorch.org/tutorials/beginner/ddp_series_multigpu.html) |
| 4 | **Training Real-World Models (minGPT)** | DDP on GPT, multi-node + SLURM | [PyTorch Docs](https://docs.pytorch.org/tutorials/intermediate/ddp_series_minGPT.html) |
| 5 | **Getting Started with FSDP2** | Memory-efficient large models | [PyTorch Docs](https://docs.pytorch.org/tutorials/intermediate/FSDP_tutorial.html) |
| 6 | **Advanced FSDP** | Mixed precision, sharding | [PyTorch Docs](https://docs.pytorch.org/tutorials/intermediate/FSDP_advanced_tutorial.html) |

### Key Concepts: DDP vs FSDP

| Concept | DDP | FSDP |
|---------|-----|------|
| **Use case** | Model fits in 1 GPU | Model too large for 1 GPU |
| **Memory** | Full model on each GPU | Sharded across GPUs |
| **Communication** | Gradient all-reduce | Parameter gather + gradient reduce-scatter |
| **Complexity** | Lower | Higher |

### 🎯 Milestone Projects

1. ✅ Convert single-GPU training script to DDP
2. ✅ Train model on 4+ GPUs with proper SyncBatchNorm
3. ✅ Implement FSDP for a 7B parameter model
4. ✅ Profile communication overhead with torch.profiler

---

## ☸️ AI Training on Kubernetes

### Why Your K8s Skills Apply Directly

Your K8s expertise is directly applicable here. Kubeflow is the standard for ML on K8s.

### Courses

| Resource | Level | Description | Link |
|----------|-------|-------------|------|
| **LFS147 - AI/ML with Kubeflow** | Beginner | Linux Foundation official | [Linux Foundation](https://training.linuxfoundation.org/training/introduction-to-ai-ml-toolkits-with-kubeflow-lfs147/) |
| **Pluralsight - Kubeflow Workflows** | Intermediate | End-to-end ML workflows | [Pluralsight](https://www.pluralsight.com/courses/building-end-to-end-machine-learning-workflows-kubeflow) |
| **KodeKloud - Kubeflow Guide** | Beginner | Architecture, examples | [KodeKloud](https://kodekloud.com/blog/running-ai-ml-workloads-on-kubernetes-using-kubeflow-a-beginners-guide/) |

### Kubeflow Components → Your Advantage

| Component | Purpose | Your Advantage |
|-----------|---------|----------------|
| **Kubeflow Trainer** | Distributed training (PyTorch, DeepSpeed, JAX) | Direct K8s experience applies |
| **Kubeflow Pipelines** | ML workflow orchestration | Similar to Argo/Tekton you may know |
| **Katib** | Hyperparameter tuning | Understand pod scheduling |
| **KServe** | Model serving | Familiar with Ingress, Services |

### Hands-On with Kubeflow Trainer

```bash
# Kubeflow Trainer v2 - unified API for distributed training
pip install kubeflow-trainer

# Supports: PyTorch, HuggingFace, DeepSpeed, JAX, XGBoost
```

Key features for your background:

- **Gang-scheduling** - All pods scheduled together or not at all
- **Elastic training** - Dynamic scaling during training
- **Multi-framework** - Same API for PyTorch, JAX, etc.

**GitHub:** [kubeflow/trainer](https://github.com/kubeflow/trainer)

### 🎯 Milestone Projects

1. ✅ Deploy Kubeflow on local K8s (kind/minikube)
2. ✅ Run distributed PyTorch job with Kubeflow Trainer
3. ✅ Build ML pipeline with Kubeflow Pipelines
4. ✅ Implement hyperparameter tuning with Katib
5. ✅ Deploy model with KServe + canary rollout

---

## 📋 Integrated 12-Week Learning Path

| Week | Focus | Deliverable |
|------|-------|-------------|
| 1-2 | CUDA basics | Custom CUDA kernel in PyTorch |
| 3-4 | PyTorch DDP | Multi-GPU training script |
| 5-6 | PyTorch FSDP | Train large model (7B+) |
| 7-8 | Kubeflow setup | Local cluster + first training job |
| 9-10 | Kubeflow Trainer | Distributed PyTorch on K8s |
| 11-12 | Integration project | End-to-end: custom CUDA op → distributed training → K8s deployment |

---

## 📚 Essential Resources

### Papers to Read

- [Megatron-LM](https://arxiv.org/abs/1909.08053) - Model parallelism
- [ZeRO](https://arxiv.org/abs/1910.02054) - Memory optimization (DeepSpeed)
- [PyTorch FSDP](https://arxiv.org/abs/2304.11277) - Official FSDP paper
- [FlashAttention](https://arxiv.org/abs/2205.14135) - Memory-efficient attention

### Tools to Master

- `torch.profiler` - Training profiling
- `nvidia-smi` / `nvtop` - GPU monitoring
- `Nsight Systems/Compute` - Deep GPU profiling
- `kubectl` + Kubeflow CLI - K8s ML operations

### Bridge Resources

- "Efficient Deep Learning" - Systems perspective on DL
- Ray documentation (distributed ML)
- Kubeflow + MLflow for K8s ML workflows

---

## 🎬 YouTube Learning Resources

### 🏆 Tier 1: Must-Watch for Infra Engineers

| Channel | What You'll Learn | Best For |
|---------|------------------|----------|
| **[Andrej Karpathy](https://karpathy.ai/zero-to-hero.html)** | Neural Networks: Zero to Hero | Understanding what you're optimizing |
| **[3Blue1Brown](https://www.3blue1brown.com/topics/neural-networks)** | Visual math, transformers | Attention mechanism intuition |
| **[freeCodeCamp](https://www.youtube.com/freecodecamp)** | 12-hour CUDA course (2024) | GPU programming fundamentals |

### 🖥️ GPU Programming & CUDA

| Resource | Duration | Description |
|----------|----------|-------------|
| **[freeCodeCamp CUDA Course](https://www.youtube.com/watch?v=86FAWCzIe_4)** | 12 hrs | Comprehensive CUDA programming by Elliot Arledge |
| **[CUDA Fundamentals Tutorial](https://www.youtube.com/results?search_query=cuda+fundamentals+tutorial)** | 2.5 hrs | CUDA basics, Google Colab setup, shared memory |
| **[CUDA for Physicists (2024)](https://www.youtube.com/results?search_query=cuda+programming+physicists+2024)** | 2.5 hrs | Scientific computing perspective |

**freeCodeCamp CUDA Course covers:**

- GPU importance in modern computing
- Deep learning ecosystem + GPU acceleration
- Environment setup + C/C++ refresher
- CUDA API, memory management, kernels
- Vector/matrix operations, shared memory
- PyTorch CUDA extensions

### ⚡ PyTorch Distributed Training (Official Video Series)

**[Official PyTorch DDP Video Tutorials](https://pytorch.org/tutorials/beginner/ddp_series_intro.html)**

| Video | Focus | Key Concepts |
|-------|-------|--------------|
| 1. DDP Theory | Introduction | Data parallelism, ring all-reduce |
| 2. Multi-GPU Training | Single node, 4 GPUs | DistributedSampler, SyncBatchNorm |
| 3. minGPT Training | Real-world example | Multi-node, SLURM, hydra config |
| 4. Fault Tolerance | Production readiness | Checkpointing, recovery |

**Key concepts covered:**

- DistributedSampler ensures non-overlapping batches
- Ring all-reduce for gradient synchronization
- SyncBatchNorm for BatchNorm layers across replicas
- Process groups and communication backends

### 📐 ML Fundamentals (Build Understanding)

**Andrej Karpathy's "Neural Networks: Zero to Hero"**

[Playlist](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ)

| Video | Duration | Relevance for Infra |
|-------|----------|---------------------|
| 1. micrograd | ~2.5 hrs | Backprop fundamentals |
| 7. **Let's build GPT** | ~2 hrs | Transformer architecture ⭐ |
| 8. Tokenization | ~2 hrs | Data pipeline understanding |

**Why it matters:** Understanding model internals helps you optimize training infrastructure effectively.

**3Blue1Brown Neural Networks Series**

[Playlist](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)

- Ch 5: Transformers, the tech behind LLMs (2024)
- Ch 6: Attention in transformers, step-by-step
- Ch 7: How might LLMs store facts

### 🔧 Systems & Infrastructure Channels

| Channel | Focus | Link |
|---------|-------|------|
| **NVIDIA Developer** | CUDA, GPU optimization, DL frameworks | [YouTube](https://www.youtube.com/NVIDIADeveloper) |
| **PyTorch** | Official tutorials, distributed training | [YouTube](https://www.youtube.com/PyTorch) |
| **DeepSpeed** | Microsoft's distributed training library | [YouTube](https://www.youtube.com/results?search_query=deepspeed+tutorial) |

### 🔬 Research & Staying Current

| Channel | Focus | Link |
|---------|-------|------|
| **Yannic Kilcher** | Deep paper breakdowns | [YouTube](https://www.youtube.com/YannicKilcher) |
| **Two Minute Papers** | Accessible research summaries | [YouTube](https://www.youtube.com/TwoMinutePapers) |

### 🎯 Recommended Watch Order (12-Week Plan)

**Week 1-2: GPU Fundamentals**

- freeCodeCamp CUDA Course (first 6 hours)
- NVIDIA Developer: CUDA basics videos

**Week 3-4: CUDA Advanced + PyTorch Basics**

- freeCodeCamp CUDA Course (remaining 6 hours)
- Andrej Karpathy: micrograd (understand what GPUs compute)

**Week 5-6: PyTorch DDP**

- Official PyTorch DDP Video Series (all 4 videos)
- 3Blue1Brown: Transformer chapters

**Week 7-8: Transformer Understanding**

- Andrej Karpathy: "Let's build GPT" ⭐
- 3Blue1Brown: Attention mechanism videos

**Week 9-10: Kubeflow & Orchestration**

- Linux Foundation LFS147 content
- Kubeflow community videos

**Week 11-12: Advanced Topics**

- Yannic Kilcher: Megatron-LM, ZeRO, FSDP papers
- NVIDIA Developer: Large-scale training videos

---

## ⚠️ What Sources DON'T Cover

- ❓ Specific salary impact of infra→RE transition
- ❓ Success rates for infra engineers vs general SWEs
- ❓ How much K8s specifically is valued vs general distributed systems

---

## 🔗 Sources

1. [DeepMind Research Engineer Job Posting](https://job-boards.greenhouse.io/deepmind/jobs/6604209)
2. [JoinTaro - Transition to ML Engineer](https://www.jointaro.com/question/YqrpDDCPbsGpg0lwrKXY/looking-to-transition-to-ml-engineer-what-do-you-want-to-know/)
3. [Second Talent - ML Infrastructure Engineer](https://www.secondtalent.com/occupations/machine-learning-infrastructure-engineer/)

---

**Related:** [[01-research-engineer-interview-guide]]
**Suggested location:** 3_Resources/Career/
**Potential MOCs:** [[Career Development MOC]], [[Machine Learning MOC]], [[Kubernetes MOC]]
**Tags:** #career #ML #research-engineer #distributed-systems #infrastructure #kubernetes #GPU
