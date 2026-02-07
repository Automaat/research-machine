# AI-Ready Personal Knowledge Base: Best Practices

**Date:** 2026-02-02
**Tags:** #research #ai #pkm #obsidian
**Focus:** Structuring notes for optimal AI/LLM retrieval and comprehension

---

## 🎯 Key Findings Summary

The most impactful changes for AI-readiness:

1. **`summary` field in frontmatter** — instant context without parsing entire note
2. **Atomic notes** (200-500 words) — fits LLM context windows perfectly
3. **Liberal wikilinks** — enables graph traversal for related context
4. **Bullet points over tables** — LLMs parse bullets significantly better

---

## 📁 File Naming Conventions

**Principles:**

- Plain-language, descriptive titles (e.g., `User frustration peaks at checkout step 3` not `UX-Notes-2024`)
- Most salient info first (topic > date if topic matters more)
- Hyphens between words, underscores between elements: `2025-01-15_client-feedback_project-alpha`
- Avoid ambiguous abbreviations — spell out when in doubt
- Include keywords that aid future search

**Why this helps AI:**

- Descriptive titles = better semantic matching
- Consistent naming = predictable retrieval patterns
- Keywords in filenames boost vector/semantic search accuracy

---

## 📋 Metadata/Frontmatter

**Essential fields for AI comprehension:**

```yaml
---
title: Descriptive plain-language title
date: YYYY-MM-DD
tags: [topic1, topic2]
type: note | literature | moc | project
source: URL or [[Internal Link]]
status: draft | active | archived
confidence: low | medium | high  # your certainty level
summary: One-sentence TL;DR for AI context  # CRITICAL
related: [[Note1]], [[Note2]]
---
```

**Why each field matters:**

- `summary` — instant context without parsing entire note ⭐
- `confidence` — AI knows when to treat info as tentative
- `type` — enables filtering by note category
- `related` — explicit connections for graph navigation
- Keep frontmatter **flat** (no nesting) for Obsidian compatibility

---

## 📝 Note Structure Patterns

### Atomic Notes

- ✅ One idea per note
- ✅ Self-contained (understandable without other context)
- ✅ 200-500 words ideal for LLM context windows
- ✅ Each note answers: What is this? Why does it matter?

### AI-Optimized Template

```markdown
# [Topic Name]

**Summary:** [1-2 sentences - critical for AI retrieval]

## Key Points
- Point 1
- Point 2
- Point 3

## Context
Why this matters, connections to other ideas

## Source
[[Citation]] or [URL](link)

## Related
[[Note1]], [[Note2]], [[MOC]]
```

### MOCs (Maps of Content)

- Hub notes that link related atomic notes
- Provide AI with navigational structure
- Include brief descriptions of each linked note

### For RAG/AI Retrieval

- 📌 Add section summaries after each heading (reinforces key points in embedding space)
- 📌 Use bullet points over tables (LLMs parse bullets better)
- 📌 Avoid deeply nested content — keep structure flat (max 3 levels)

---

## 🔗 Linking Strategies

**For AI navigation:**

- **Liberal wikilinks** — every concept that exists as a note should link
- **Bidirectional links** — Obsidian auto-creates backlinks, use them
- **Hub-and-spoke** — MOCs as hubs, atomic notes as spokes
- **Avoid orphans** — every note links to/from at least one other

**Link types:**

- `[[Related Topic]]` — standard connection
- `[[Source Note]]` — provenance tracking
- `[[MOC - Domain]]` — categorical placement

**Graph benefits:**

- AI can traverse connections to find related context
- Backlinks provide "what links here" context
- Dense linking = richer retrieval possibilities

---

## 🏷️ Tag Taxonomy

**Hierarchical but simple:**

```text
#domain/subdomain (e.g., #tech/ai, #health/nutrition)
#type/note, #type/moc, #type/project
#status/active, #status/archived
#source/book, #source/article, #source/conversation
```

**Best practices:**

- Max 2-3 levels of hierarchy
- Consistent vocabulary (don't mix `#AI` and `#artificial-intelligence`)
- Tags for facets, wikilinks for connections
- Use tags for cross-cutting concerns (status, type)
- Use links for topical relationships

**For AI searchability:**

- Tags enable filtered searches (`#tech/ai AND #status/active`)
- Consistent taxonomy = reliable categorization
- Auto-tagging via AI can maintain consistency

---

## 💡 PKM Community Insights

**From Zettelkasten.de:**

- Atomic notes + explicit links = "little machines" AI can process
- Background reasoning notes justify complex prompts
- Link structure notes to atomic notes for domain organization

**From Obsidian community:**

- Smart Connections plugin for semantic search across vault
- Dataview for structured queries on frontmatter
- Note Companion for AI-assisted organization

**From RAG research (AWS, Cambridge):**

- Break monolithic docs into atomic units
- Generate synthetic questions per chunk for better retrieval
- Section summaries improve embedding accuracy
- Bullet lists > tables for LLM parsing

**Critical insight:**
> "Stay in the loop — if you push yourself to add links, that makes you think expansively about related concepts. AI assistance is valuable, but the cognitive work of linking builds understanding."

---

## ✅ AI-Ready Note Checklist

- [ ] Descriptive, plain-language title
- [ ] YAML frontmatter with `summary` field
- [ ] One core idea per note (atomic)
- [ ] Section summaries after headings
- [ ] Bullet points, not tables
- [ ] Liberal wikilinks to related notes
- [ ] Connected to at least one MOC
- [ ] Consistent tags from taxonomy
- [ ] Source/provenance documented
- [ ] Confidence level indicated

---

## 📚 Sources

- [Buildin.AI - Personal Knowledge Management with AI](https://buildin.ai/blog/personal-knowledge-management-system-with-ai)
- [AWS - Documentation Best Practices for RAG](https://docs.aws.amazon.com/prescriptive-guidance/latest/writing-best-practices-rag/best-practices.html)
- [Zettelkasten.de - How to Build Your Zettelkasten to Master AI](https://zettelkasten.de/posts/how-to-build-zettelkasten-master-ai/)
- [Nicole van der Hoeven - YAML Frontmatter](https://notes.nicolevanderhoeven.com/obsidian-playbook/Using+Obsidian/03+Linking+and+organizing/YAML+Frontmatter)
- [Cambridge Research - Question-Based Retrieval using Atomic Units](https://arxiv.org/abs/2405.12363)
- [Renamer.ai - File Naming Conventions Best Practices](https://renamer.ai/insights/file-naming-conventions-best-practices)
- [Enterprise Knowledge - Taxonomies and Ontologies](https://enterprise-knowledge.com/extending-taxonomies-to-ontologies/)
- [Squirro - GenAI Needs Taxonomy & Ontology](https://squirro.com/squirro-blog/genai-taxonomy-ontology)
- [Obsidian Forum - AI Empowered Zettelkasten](https://forum.obsidian.md/t/ai-empowered-zettelkasten-with-ner-and-graph-llm/79112)
- [The Effortless Academic - Adding AI to Obsidian Notes](https://effortlessacademic.com/adding-ai-to-your-obsidian-notes-with-smartconnections-and-copilot/)
- [Cohere - Augmenting PKM](https://txt.cohere.com/augmenting-pkm/)
