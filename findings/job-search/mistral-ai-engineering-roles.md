# Mistral AI - Engineering Roles Research

**Date:** 2026-02-27
**Tags:** #research #job-search #mistral-ai #infrastructure #platform
**Focus:** Infrastructure/Platform/Backend engineering roles matching Go + K8s + distributed systems profile

---

## Company Overview

- **Founded:** 2023 by ex-DeepMind and ex-Meta AI researchers
- **Valuation:** $14B (Sept 2025), previously $13.8B
- **Team:** 800+ employees, 30+ nationalities
- **Revenue:** $100M+ (2025)
- **Offices:** Paris (HQ), London, Palo Alto, Singapore, Germany
- **CTO:** Timothee Lacroix (co-founder)
- **Recent acquisition:** Koyeb (Feb 2026) - serverless deployment platform, 13 engineers joined
- **Products:** LLMs (Mistral/Magistral), Mistral Compute (AI cloud), AI Studio, Mistral Vibe (CLI dev tool)

---

## Relevant Open Roles

### 1. Software Engineer, Compute Infrastructure (Paris/London/Remote EU)

**Match level: EXCELLENT**

**Responsibilities:**

- Design, build, operate scalable Kubernetes-based platform for large-scale AI/HPC workloads
- Full lifecycle cluster management: bootstrapping, provisioning, global operations
- Build automation, monitoring, orchestration tooling
- CI/CD pipelines for system reliability, availability, observability
- Zero-trust security model: IAM, VPC, access controls
- Incident resolution with root-cause analysis

**Requirements:**

- Strong proficiency in **Golang** (preferred language)
- Deep understanding of **Kubernetes internals**
- Containerization: Docker, Kubernetes, OpenStack
- IaC: Terraform or CloudFormation
- Observability: **Prometheus, Grafana, ELK, Datadog**
- Distributed systems and SRE experience
- Reliability KPI management

**Nice-to-have:**

- HPC workload managers (Slurm)
- Distributed storage (Lustre, Ceph)
- Open-source contributions

**Location:** Paris or London primary. Remote considered for: France, UK, Germany, Belgium, Netherlands, Spain, Italy. First week onboarding in Paris (covered), then 2+ days/month.

**Benefits:** Competitive salary + equity, health insurance, transport/sport allowance, meal vouchers, private pension, parental leave, **visa sponsorship**

---

### 2. Site Reliability Engineer (Paris/London)

**Match level: STRONG**

**Responsibilities:**

- Shape reliability, scalability, performance of platform and customer-facing apps
- Monitoring, alerting, incident response systems
- CI/CD, containerization, orchestration workflows
- Collaborate with AI/ML researchers on model-training experiments
- Design scalable, highly available infrastructure for web services + ML workloads
- On-call rotation with root cause analysis
- Infrastructure automation with Kubernetes, Flux, Terraform

**Requirements:**

- 5+ years SWE experience
- Proficiency in **Python, Go, C++, or Rust**
- **Kubernetes (bare metal)**, Grafana, Prometheus
- Cross-datacenter and distributed systems experience
- Stack profiling and optimization (millisecond-level)
- Docker, Terraform, Flux
- Monitoring: Prometheus, Grafana, ELK Stack
- Cloud: AWS, GCP, or Azure
- Master's in CS/Engineering or equivalent

**Location:** Hybrid Paris (priority), London also accepted

---

### 3. Software Engineer, Deployment Infrastructure (Paris/London)

**Match level: STRONG**

**Responsibilities:**

- Deploy and integrate products (models, APIs, AI Studio) across multiple infra configs
- Cloud providers to self-hosted (private cloud, on-premises) solutions
- Fast, reliable product launches
- Deployment automation for velocity and scalability
- Architecture for multi-environment deployability (including on-prem)
- Cross-functional feature development
- AI safety on third-party platforms

**Requirements:**

- 5+ years professional experience
- Master's in CS or related
- Backend development: **Python, Golang**
- Infrastructure: **Docker, CI/CD, Kubernetes, Helm, Terraform**
- Cloud ecosystem knowledge + LLM deployment understanding

---

### 4. Software Engineer, Backend (Paris AND London - separate postings)

**Match level: MODERATE**

- Open to all levels: fresh grad to **senior and staff engineers**
- Backend-focused engineering
- Less infrastructure-specific but still relevant

---

### 5. Applied AI Engineer, Senior/Staff DevOps/SRE (NYC, Singapore)

**Match level: MODERATE (wrong location)**

- Customer-facing deployment engineering
- GPU stack through infrastructure, backend, and frontend
- Onboarding customers on deployment and integration
- Senior/Staff level explicitly in title

---

### 6. Lead Site Reliability Engineer (Paris) - CLOSED Jan 2026

**Match level: EXCELLENT (but closed)**

- 10+ years DevOps/SRE experience required
- Team leadership (hiring, onboarding, roadmaps)
- **Docker, Kubernetes, Prometheus, Grafana, Terraform, Python/Go/Bash**
- AI/ML environment experience preferred
- HPC and Slurm familiarity preferred
- 3 days/week minimum on-site Paris
- May reopen or similar role may appear

---

### 7. Infrastructure Solution Architect - EMEA

**Match level: MODERATE**

- More solutions/consulting focused
- DevOps/SRE/Cloud Solution Architect background
- Deploying AI products in production
- Containerization, CI/CD, cloud platforms

---

## Tech Stack Summary

| Technology | Usage at Mistral |
|---|---|
| **Golang** | Primary language for compute infrastructure |
| **Python** | Primary for ML/AI, also for SRE scripting |
| **Kubernetes** | Core platform (bare metal + cloud) |
| **Docker** | Standard containerization |
| **Terraform** | Infrastructure as code |
| **Flux** | GitOps for K8s |
| **Prometheus + Grafana** | Monitoring and observability |
| **ELK Stack** | Logging |
| **Datadog** | Additional observability |
| **Slurm** | HPC workload management |
| **OpenStack** | Some infra orchestration |
| **Helm** | K8s package management |
| **InfiniBand XDR** | Network fabric for GPU clusters |
| **NVIDIA GPUs** | Compute (cutting-edge) |

---

## Compensation

### Paris/European Roles

- Base salary: estimated **EUR 100K-180K** for senior engineering (market data for similar Series C deep-tech)
- Equity: significant component (early-stage AI unicorn)
- No public salary bands for EU roles

### US Roles (for reference)

- H1B data: mean $303K, median $300K, range $280K-$330K
- AI Researcher (mid): ~$490K TC
- Staff AI Researcher: $700K-$950K TC
- Average US salary: ~$241K

### Benefits (EU)

- Competitive salary + equity
- Health insurance
- Transport allowance
- Sport allowance
- Meal vouchers (Swile likely)
- Private pension plan
- Generous parental leave
- **Visa sponsorship available**

---

## Visa & EU Citizens

- **EU/EEA citizens do NOT need a work permit** for France - free movement
- Mistral explicitly offers visa sponsorship (listed in benefits)
- As a Polish/EU citizen, you have full right to work in Paris with no visa needed
- Just need to register with French authorities after arrival
- Mistral requires either residing in or relocating to Paris/London for most roles
- Remote EU considered for some roles (France, UK, Germany, Belgium, Netherlands, Spain, Italy)

---

## Interview Process

### Structure (5 stages for Lead SRE, likely similar for senior roles)

1. **Intro call** - recruiter screen, background discussion
2. **Culture interview** - values and team fit
3. **System design interview** - architecture and infrastructure design
4. **Live coding** - LeetCode-style or practical coding
5. **Deep dive technical + culture-fit** - detailed technical discussion

### Key Details

- Timeline: ~15 days average, 4-6 weeks from first contact to offer
- Difficulty: 2.56/5 on Glassdoor (SRE/DevOps rated easiest of engineering roles)
- SRE/DevOps interviews rated **easier** than Applied AI or Senior SWE
- May include take-home assignments: design small experiment, write up methodology
- Emphasis on: clean codebase + written analysis of tradeoffs and limitations
- Founding team from DeepMind/Meta - high technical bar but practical focus

### Preparation Focus

- System design: distributed systems, K8s platform architecture, observability
- Coding: Go or Python, practical infrastructure problems
- Domain: LLM deployment, GPU cluster management, HPC basics
- Culture: low-ego, creative, fast-paced startup mindset

---

## Engineering Culture

- **Small teams:** founder Arthur Mensch advocates max 5-person teams
- **French-heavy research:** 55/99 authors on Magistral paper from French institutions
- **Fast-paced startup:** grew from 0 to 800+ in ~2.5 years
- **Full-stack AI ambition:** models + compute + deployment (Koyeb acquisition)
- **Open-weight philosophy:** strong commitment to open-source AI
- **Multicultural:** 30+ nationalities, though French-educated researchers predominate
- **Infrastructure is strategic:** Mistral Compute launched June 2025, Koyeb acquired Feb 2026
- **CTO-led engineering:** Timothee Lacroix oversees all engineering including Koyeb integration

---

## Profile Fit Analysis

### Strong Matches

- **Go** is the preferred language for compute infrastructure
- **Kubernetes** is the core platform technology (bare metal + cloud)
- **Distributed systems** experience directly needed
- **Cloud infrastructure** is central to their Mistral Compute product
- **Observability** (Prometheus, Grafana, Datadog) is a key requirement
- **Terraform** IaC experience maps directly

### Gaps to Address

- **HPC/Slurm** - nice-to-have, could study basics
- **GPU cluster management** - learn NVIDIA GPU orchestration concepts
- **AI/ML workload specifics** - understand inference serving, model training infrastructure
- **OpenStack** - mentioned but not critical
- **InfiniBand networking** - specialized HPC networking

### Recommended Target Roles (priority order)

1. **Software Engineer, Compute Infrastructure** - best match, Go + K8s core
2. **Site Reliability Engineer** - strong match, Go/Python + K8s + observability
3. **Software Engineer, Deployment Infrastructure** - good match, Go + K8s + cloud
4. **Software Engineer, Backend (Paris)** - accepts staff level, broader scope

---

## Action Items

- [ ] Apply to Software Engineer, Compute Infrastructure (top priority)
- [ ] Apply to Site Reliability Engineer (Paris)
- [ ] Apply to SW Engineer, Deployment Infrastructure
- [ ] Tailor resume: emphasize Go, Kubernetes, distributed systems, observability, Terraform
- [ ] Add HPC/GPU infrastructure knowledge to prep topics
- [ ] Study: Slurm basics, GPU orchestration on K8s, LLM inference serving
- [ ] Prepare system design: "Design a multi-tenant K8s platform for AI workloads"
- [ ] Watch for Lead SRE role reopening (was closed Jan 2026)
- [ ] Research Koyeb's tech stack for interview talking points

---

## Sources

- [Mistral AI Careers](https://mistral.ai/careers)
- [Mistral Jobs - Lever](https://jobs.lever.co/mistral)
- [Compute Infrastructure Role](https://jobs.lever.co/mistral/d60f6c60-ad5e-4753-af8a-56365b7db8b8)
- [SRE Role](https://jobs.lever.co/mistral/6e16e4fa-a60b-4270-a815-06b0450fb597)
- [Deployment Infrastructure Role](https://jobs.lever.co/mistral/31364497-4081-454a-b50c-12d15daf6876)
- [Backend Engineer Paris](https://jobs.lever.co/mistral/e76d2957-2bf6-4d8f-90a2-29bf9a927823)
- [Backend Engineer London](https://jobs.lever.co/mistral/77b8339f-da37-4f38-b554-1d154f72ca8f)
- [Senior/Staff DevOps/SRE NYC](https://jobs.lever.co/mistral/fb15ec7f-d9e9-4246-9d36-486d46c289e4)
- [Koyeb Acquisition - TechCrunch](https://techcrunch.com/2026/02/17/mistral-ai-buys-koyeb-in-first-acquisition-to-back-its-cloud-ambitions/)
- [Mistral AI Salaries - NAHC](https://www.nahc.io/blog/how-much-do-you-get-paid-at-mistral-ai-hfffz)
- [Mistral AI Salaries - Levels.fyi](https://www.levels.fyi/companies/mistral-ai/salaries)
- [Interview Process - Glassdoor](https://www.glassdoor.com/Interview/Mistral-AI-Interview-Questions-E9945031.htm)
- [General Catalyst Job Board - Compute Infra](https://jobs.generalcatalyst.com/companies/mistral-ai-2/jobs/53443675-software-engineer-compute-infrastructure)
- [DevOps Projects HQ - SRE Details](https://devopsprojectshq.com/mistral-site-reliability-engineer/)
- [Mistral AI Wikipedia](https://en.wikipedia.org/wiki/Mistral_AI)
- [Worktugal - Mistral Hiring](https://worktugal.com/mistral-ai-jobs-europe/)
