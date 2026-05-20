# Marcin Skalski

+48 509 581 588 | Cracow, Poland
<skalskimarcin33@gmail.com> | [LinkedIn](https://www.linkedin.com/in/skalskimarcin/) | [GitHub](https://github.com/Automaat) | [Blog](https://mskalski.dev/)

---

## Professional Summary

<!-- Pick per job application. Option A for infra roles, B for AI-adjacent, C for OSS-friendly companies -->

**Option A — Platform/Infra Focus** (Stripe, Databricks):
Staff-level platform engineer with 10+ years building distributed systems at scale. Core maintainer of CNCF Kuma service mesh, KubeCon EU speaker. Led architectural initiatives spanning 14 repositories across open source and enterprise products. Track record of designing observability systems, performance frameworks, and platform tooling relied on by 1,000+ engineers processing 2M+ RPS.

**Option B — AI Infra Pivot** (Anthropic, OpenAI):
Staff-level infrastructure engineer with 10+ years building distributed systems powering high-scale platforms. Core maintainer of CNCF Kuma service mesh, KubeCon EU speaker. Expertise in service mesh architecture, distributed tracing, and Kubernetes-native infrastructure — the same systems powering AI model serving at scale.

**Option C — Open Source Emphasis** (CNCF-adjacent companies):
Staff-level engineer and CNCF project maintainer with 10+ years in distributed systems. Core contributor to Kuma service mesh (3.9k stars, 113 contributors) and Kong Mesh enterprise product. Authored 13+ architecture decision records, led observability and performance initiatives, and spoke at KubeCon EU 2025. Built platform teams processing 2M+ RPS for 1,000+ engineers.

---

## Technical Expertise

| Domain | Skills |
|--------|--------|
| **Systems & Languages** | Go (primary), Python, Java, Rust (learning), Nix (learning) |
| **Distributed Systems** | Service mesh architecture, distributed tracing, fault tolerance, load balancing, event-driven architecture |
| **Cloud Native** | Kubernetes, Envoy proxy, Docker, Terraform, Helm |
| **Data & Messaging** | Kafka, MongoDB, Elasticsearch |
| **Observability** | OpenTelemetry, Prometheus, Grafana, distributed tracing design |
| **Cloud Platforms** | AWS, GCP, multi-cloud architecture |
| **AI & Agentic Systems** | Multi-agent systems (LangGraph, LiteLLM), MCP server development, LLM integration (Claude, Ollama), Prometheus-instrumented AI pipelines |

---

## Professional Experience

### Senior Software Engineer — Kuma Service Mesh | Kong Inc

*Sep 2022 – Present | Cracow, Poland*

- Led 4+ major architectural initiatives end-to-end for CNCF Kuma (3.9k stars, 113 contributors) and Kong Mesh. Authored 13+ MADRs defining technical direction for Global Rate Limiting, MeshOPA, Inspect API, and Locality Aware Load Balancing. Regularly collaborated with sales team to translate technical capabilities into customer value. (281 PRs, 14 repos, 2 orgs in FY26.)
- Led mise migration across 6+ repos, SHA-pinned GitHub Actions for supply chain security, and pioneered AI copilot instructions for the codebase.
- Led team of 3 in designing MeshMetric — unified observability layer integrating OpenTelemetry with multiple backends, custom labels, and dynamic refresh. Unique capability in the service mesh market, directly used in enterprise sales. Now leading Kuma 3.0 observability redesign spanning metrics, logs, traces, and dashboards.
- Led Mesh Perf initiative — designed continuous benchmarking framework with automated performance testing on EKS, used to validate core abstractions like MeshService before release.
- Owned Kuma documentation strategy: built schema_viewer component from scratch, established quality gates (Vale, markdownlint, shellcheck, rubocop), created 13+ resource reference pages. 50+ PRs on kuma-website.

### Engineering Manager — Service Mesh | Allegro Sp. z o.o. (Poland's largest e-commerce)

*May 2021 – Sep 2022 | Cracow, Poland*

- Built and led Service Mesh platform team (5 engineers) from zero, owning service-to-service communication layer for Allegro's microservices ecosystem: 1,500+ services, 2M+ RPS, relied on by most of Allegro's 1,000+ engineering org. Designed simplification of core microservice SDK (1,000+ usages).
- Introduced Dependabot across 1,500+ engineering repositories, establishing automated dependency update flow org-wide. Led extraction of microservice metrics for Allegro's governance team.
- Built interactive service dependency map used by team leads, platform directors, and governance for understanding 1,500+ service topology. Created global performance dashboards, identified outliers, and tuned underperforming services across the platform.

### Software Engineer — Notifications | Allegro Sp. z o.o. (Poland's largest e-commerce)

*Dec 2018 – May 2021 | Cracow, Poland*

- Achieved 8x throughput improvement (500 to 4,000 RPS) on Allegro's notification platform serving 20M+ users across email, push, SMS, and in-app channels, directly enabling marketing campaigns at scale. Redesigned processing pipeline with concurrent architecture and replaced MongoDB queue with Kafka event streaming, reducing response times by 30% and incidents to near-zero.
- Led migration from MongoDB to Kafka-based queue system. Redesigned notification tracking service, eliminating unnecessary databases. Redesigned batch notification ingestion pipeline.

### Software Engineer — User Profiles | Sabre Poland

*Jul 2015 – Dec 2018 | Cracow, Poland*

- Developed and maintained core user profile service managing 200M+ airline passenger records. Java, Oracle. Focused on legacy code refactoring and modernization.

---

## Open Source

### CNCF Kuma Service Mesh — Core Maintainer

*2022 – Present*

- Steering committee member and core maintainer of CNCF Kuma service mesh (3.9k GitHub stars, 113 contributors, 2M+ Docker pulls, adopted by American Airlines and 150+ enterprise organizations)
- ~200 PRs reviewed per year across kumahq organization, mentoring external contributors
- Authored MADRs shaping project's architectural direction: observability, rate limiting, policy model, identity

---

## Speaking & Community

- Solo speaker at KubeCon EU 2025 London (~12,000 attendees): "What's New in Kuma: Advanced Service Mesh Capabilities"
- Program committee member for KubeCon NA 2024
- Guest on DevOps Toolkit (Viktor Farcic): "Service Mesh — Feat. Cilium, Istio, Linkerd, and Kuma"
- Speaker at Geecon, DevDays Europe (panel), 4Developers, Allegro Tech Meeting
- Conference track showrunner at Allegro Tech Meeting
- Established and hosted CNCF Kuma community calls
- YouTube channel "Głęboki Odczyt" — CS milestone papers (LLMs, distributed systems, networking)

---

## Technical Leadership & Mentoring

- Driving adoption of agentic AI tools across Kong's mesh team — mentoring engineers on Claude Code for coding, review, and daily workflows. Building production multi-agent systems and MCP servers independently
- Conducted 100+ systems design and technical interviews at Allegro, calibrating hiring bar. Redesigned systems design interview process for frontend developers
- Created and delivered systems design workshops for engineering teams
- Mentored new hires, hiring squad members, and founded technical book club at Allegro
- Founded Pethero startup (pet-sitting platform) through Cracow startup incubator program — led product development, established partnership with stray dog foundation

---

## AI Projects

- **agentic-brain** — Production-ready modular AI assistant: LangGraph agent with MCP tool calling, multi-interface (Telegram, Home Assistant, REST), Redis state, Prometheus metrics ([GitHub](https://github.com/Automaat/agentic-brain))
- **MCP Servers** — Built MCP servers for Drafts app (TypeScript) and Adobe Lightroom Classic (Lua) ([drafts-mcp](https://github.com/Automaat/drafts-mcp), [lightroom-mcp](https://github.com/Automaat/lightroom-mcp))
- **ai-casino** — Multi-agent stock trading system: 4 specialized agents (technical, sentiment, news, trader) with LiteLLM and FinBERT ([GitHub](https://github.com/Automaat/ai-casino))

---

## Education

**Languages:** English (fluent), Polish (native), Spanish (A1)

**Bachelor and Master of Computer Science** — AGH University of Science and Technology, Cracow | 2013–2018
Master thesis: "Performance comparison of eBPF metric exporters and their influence on system"
Bachelor thesis: "Predicting song popularity score using LSTM networks"
