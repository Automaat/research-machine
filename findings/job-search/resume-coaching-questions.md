# 📝 Resume Coaching: Questions to Answer

**Date:** 2026-02-24
**Purpose:** Answer these to generate Staff-level bullet rewrites for `resume.tex`
**Status:** ⏳ Awaiting answers

---

## 🏗️ Structure Decision

New section order (approved):

```
Name / Contact / Links
PROFESSIONAL SUMMARY (new)
TECHNICAL EXPERTISE (rewrite of Skills)
PROFESSIONAL EXPERIENCE (Kong, Allegro TL, Allegro SWE, Sabre)
OPEN SOURCE & TECHNICAL LEADERSHIP (new)
SPEAKING & COMMUNITY (new)
EDUCATION (brief)
```

**Removed:** Projects (Whisper Hotkey), Soft Skills row, "Extra-Curricular Activities" (split into two)

---

## 🔵 Kong Inc — Senior Software Engineer (Sep 2022 - Now)

### Bullet 1: "Core contributor to CNCF Kuma + Kong Mesh + SaaS platform"

1. **Kuma scale?** GitHub stars, contributors, companies in production, downloads?
2. **What technical decisions did YOU drive?** Architecture designed, RFCs authored, trade-offs evaluated?
3. **"SaaS platform from ground up"** — your specific role? Architecture design? How many teams? Current scale?
4. **Kong Mesh enterprise** — how does your work bridge OSS ↔ enterprise? Did you define convergence strategy?

### Bullet 2: "Driving Mesh Perf initiative"

5. **How many teams involved?** Just yours or cross-team?
6. **Regressions caught?** Concrete examples of production issues prevented?
7. **Performance SLAs established?** Adopted beyond your team?
8. **State before you started?** Was there any perf testing at all?

### Bullet 3: "Led MeshMetric policy development"

9. **How many deployments/services use MeshMetric?** Scale numbers?
10. **"No proxy restarts"** — before state? How painful was old approach? Downtime avoided?
11. **Alternatives evaluated?** (Prometheus vs OTel?) Trade-offs navigated?

### Bullet 4: "Owner of Kuma documentation"

12. **Docs impact quantified?** Monthly visitors, support ticket reduction, contributor onboarding time?
13. **Staff signal strength?** Keep or deprioritize in favor of stronger technical bullets?

### Bullet 5: "Community growth and product marketing"

14. **KubeCon talks count + topics?**
15. **Community growth?** Slack members, contributors — from X to Y?
16. **Product roadmap influence?** Community feedback → product decision example?

---

## 🟡 Allegro — Team Leader, Service Mesh (May 2021 - Sep 2022)

### Bullet 1: "Rebuild team from scratch, 5 people, 1500+ services, 2M RPS"

17. **How many engineering teams depended on your platform?** (e.g., "50+ teams")
18. **Technical strategy** — did you define mesh adoption strategy across Allegro?
19. **What was the biggest cross-team decision you made?**

### Bullet 2: "On call for mission critical services, coordinating company-wide incidents"

20. **Incident commander role** — how many major incidents coordinated?
21. **Post-incident process** — did you establish/improve it? Adopted org-wide?

### Bullet 3: "Created several for developers like services connections map and httpie plugin"

22. **This sentence is incomplete** — "Created several" what? Tools? Libraries?
23. **Adoption numbers?** How many engineers used these tools?
24. **Internal developer tools** — any that became standard across org?

### Bullet 4: "Redesigning deployment process, guide for migrations at scale"

25. **Scale of deployment redesign?** Number of services affected, deploys/day before vs after?
26. **Migration guide** — how many teams used it? Was it adopted as standard?

---

## 🟢 Allegro — Software Engineer, Notifications (Dec 2018 - May 2021)

### Bullet 1: "800% throughput improvement (500→4000 RPS)"

27. **Business context?** How many users did notification platform serve?
28. **What would have happened without this?** Business impact of the bottleneck?

### Bullet 2: "Rewrote to concurrent approach, MongoDB→Kafka, 30% latency reduction"

29. **These two bullets describe same work** — merge into one. What's a SECOND achievement from this 2.5yr role?
30. **Other achievements?** Real-time delivery architecture? Template system? New notification channels? Scale of events processed?

---

## 🔴 Sabre — Software Engineer (Jul 2015 - Dec 2018)

### Bullet: "Worked on one of the Sabre core services, 200M+ airline user profiles"

31. **3.5 years, one fragment bullet** — what else did you accomplish?
32. **Architecture details?** High-availability, global data centers, latency requirements?
33. **Scale metrics?** RPS, p99 latency, data volume, global distribution?
34. **Any technical decisions you drove?** Even as a junior/mid engineer — migrations, refactors, new features?

---

## 🟣 Extra Activities (to split into OSS + Speaking sections)

### AI Guild

35. **Impact of AI Guild?** How many teams adopted AI tooling? Measurable productivity gains?

### Interviews

36. **"100+ interviews"** — at Kong, Allegro, or both? Did you redesign the interview process?

### Systems Design Workshops

37. **Attendance?** How many engineers participated? Was it recurring?

---

## 📐 Summary Section

After answering above, will draft 3 summary options:

1. **Platform/Infra Focus** — Stripe, Databricks, traditional infra roles
2. **AI Infra Pivot** — Anthropic, OpenAI, AI-adjacent roles
3. **Open Source Emphasis** — CNCF-adjacent companies

---

## 🔗 Related

- [[resume-rewrite-staff-400k]] — Prior analysis
- [[staff-engineer-resume-playbook]] — Playbook
- [[profile]] — Job search criteria
