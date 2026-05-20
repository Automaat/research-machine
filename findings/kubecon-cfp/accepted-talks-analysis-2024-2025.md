# 📊 KubeCon 2024-2025: Accepted Talks Analysis

**Date:** 2026-03-24
**Tags:** #research #kubecon #talks #analysis
**Focus:** Patterns and trends from ~1,100+ accepted talks across 7 KubeCon events

---

## 🌍 Event Overview

| Event | Location | Dates | Submissions | Accepted | Rate | Speakers |
|-------|----------|-------|-------------|----------|------|----------|
| KubeCon EU 2024 | Paris | Mar 19-22, 2024 | 2,541 | 223 | 9% | 377 |
| KubeCon NA 2024 | Salt Lake City | Nov 12-15, 2024 | 1,937 | 218 | 11% | 348 |
| KubeCon India 2024 | Delhi | Dec 11-12, 2024 | N/A | 56 | N/A | N/A |
| KubeCon China 2024 | Hong Kong | Aug 21-23, 2024 | ~500 | ~85 | ~17% | N/A |
| KubeCon EU 2025 | London | Apr 1-4, 2025 | 2,939 | 229 | ~8% | N/A |
| KubeCon NA 2025 | Atlanta | Nov 10-13, 2025 | N/A | 300+ | N/A | N/A |
| KubeCon China 2025 | Hong Kong | Jun 10-11, 2025 | N/A | N/A | N/A | N/A |

---

## 🏷️ Track Categories (12 Standard Tracks)

1. **AI + ML** — MLOps, GPU utilization, model deployment, LLM inference
2. **Application Development** — Developer productivity, tooling
3. **Cloud Native Experience** — Community, business value, lessons learned
4. **Cloud Native Novice** — Foundational concepts
5. **Connectivity** — Networking, edge, telco, service mesh
6. **Data Processing + Storage** — Databases, streaming, volumes
7. **Emerging + Advanced** — Research, HPC, early-stage projects
8. **Observability** — Metrics, logging, tracing, profiling
9. **Operations + Performance** — Autoscaling, HA, performance
10. **Platform Engineering** — IDP, CI/CD, automation, DX
11. **Security** — Threat modeling, identity, supply chain, zero trust
12. **Maintainer Track** — CNCF project updates

---

## 📈 Session Type Distribution (per event)

| Type | Count | % |
|------|-------|---|
| Breakout Sessions | 130-160 | ~60% |
| Lightning Talks | 30-40 | ~15% |
| Project Lightning Talks | 40-50 | ~18% |
| Tutorials | 5-8 | ~3% |
| Keynotes | 15-20 | ~7% |
| BoF/Contribfest/Poster | 15-26 | ~8% |

---

## 🔥 Most Popular Topics (by talk volume)

| Rank | Topic | Est. Talks | Trend |
|------|-------|------------|-------|
| 1 | **AI/ML/LLM/GPU** | 120+ | 🚀 Massive growth |
| 2 | **Security & Supply Chain** | 80+ | 📈 Steady growth |
| 3 | **Platform Engineering** | 60+ | 📈 Strong growth |
| 4 | **Observability/OpenTelemetry** | 55+ | ➡️ Steady |
| 5 | **Networking/Service Mesh/Gateway API** | 50+ | ➡️ Steady |
| 6 | **Operations/Scaling/Performance** | 50+ | ➡️ Steady |
| 7 | **eBPF/Cilium** | 25+ | 📈 Growing |
| 8 | **GitOps (Argo/Flux)** | 20+ | ➡️ Steady |
| 9 | **Data/Storage/Databases** | 20+ | ➡️ Steady |
| 10 | **WebAssembly** | 15+ | 📉 Declining |
| 11 | **Sustainability** | 10+ | 📉 Declining |

---

## 🤖 AI/ML Topic Evolution (2024 → 2025)

### 2024 Focus

- GPU scheduling & DRA (Dynamic Resource Allocation)
- LLM deployment basics
- AI at the edge
- Confidential computing for AI
- Cost optimization
- MLOps fundamentals

### 2025 Focus (new/evolved)

- 🆕 AI Agents and autonomous systems
- 🆕 Agent-native infrastructure
- 🆕 MCP (Model Context Protocol)
- 🆕 AI conformance standards
- Slurm + K8s for HPC/AI
- Multi-cluster AI scheduling
- AI observability
- LLMOps maturation
- AI security
- GenAI platform engineering

---

## 🏷️ Common Title Patterns

| Pattern | Example |
|---------|---------|
| **Problem at Company** | "Reducing Cross-Zone Egress at Spotify" |
| **Clever Wordplay/Puns** | "CEL-Ebrating Simplicity", "GitOops... I Did It Again!" |
| **Journey/Evolution** | "From Metal To Apps: LinkedIn's Platform" |
| **Provocative/Contrarian** | "Why Kubernetes Is Inappropriate for Platforms" |
| **Scale Numbers** | "Managing 7K+ Clusters", "Taming 50 Billion Time Series" |
| **Pop Culture** | "Dungeons and Deployments", "Choose Your Own Adventure" |
| **Question Format** | "Is GitOps a Broken Experience?" |

**Optimal title structure:** `[Attention Hook]: [Specific Technical Detail] [at Company/Scale]`

---

## 🏢 Top Represented Companies

| Company | Talks | Type |
|---------|-------|------|
| Google/GCP | 30+ | Vendor |
| Red Hat | 25+ | Vendor |
| Microsoft/Azure | 20+ | Vendor |
| NVIDIA | 15+ | Vendor |
| Intel | 12+ | Vendor |
| Apple | 8+ | End User |
| Solo.io | 8+ | Vendor |
| Spotify | 8+ | End User |
| CERN | 6+ | End User |
| LinkedIn | 5+ | End User |
| LEGO Group | 4+ | End User |
| Bloomberg | 4+ | End User |
| Uber | 4+ | End User |

**Company Type Split:**

- Vendors: 53% of talks (74% of speakers)
- End Users: 45% of talks (24% of speakers)
- ⚡ End users get **disproportionately high acceptance rates** — real production stories strongly preferred

---

## 🔮 Hot & Growing Trends (2025+)

- AI Agents / Agent-Native Infrastructure
- Dynamic Resource Allocation (DRA) for GPUs
- LLM Inference Optimization on Kubernetes
- AI Conformance Standards
- Platform Engineering + AI convergence
- MCP (Model Context Protocol)
- Slurm + Kubernetes for HPC/AI
- Supply Chain Security (SLSA, Sigstore, VEX)
- Cell-Based Architecture
- Gateway API (replacing Ingress)

## 📉 Declining / Plateau

- WebAssembly (fewer talks in 2025)
- Sustainability/Green Computing (peaked EU 2024)
- Basic Kubernetes operations (assumed knowledge)
- Serverless (less standalone focus)

---

## 💡 Key Insights for CFP Submissions

1. **End-user stories win** — companies like Spotify, CERN, Apple have disproportionate acceptance
2. **AI/ML is the hottest track** — but needs practical depth, not hype
3. **Production numbers matter** — "7K+ clusters", "50 billion time series" in titles
4. **Creative titles get noticed** — puns, pop culture, provocative questions stand out
5. **Cross-project talks work** — combining CNCF projects (OpenTelemetry + AI, Cilium + DRA)
6. **Co-presenting cross-company** strengthens submissions
7. **Lightning talks** are great entry point (~15% of slots, less competitive)
8. **Failure stories** resonate more than success stories

---

## 📚 Sources

- CNCF blog posts on selection process
- KubeCon schedule sites (sched.com)
- Linux Foundation event pages
- CNCF YouTube playlists
- Conference recap articles
