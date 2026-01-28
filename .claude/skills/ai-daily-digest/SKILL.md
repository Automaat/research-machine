---
name: ai-daily-digest
description: Daily AI news digest covering technical advances, business news, and engineering impact. Aggregates from research papers, tech blogs, HN, newsletters. Use daily for staying current on AI developments.
argument-hint: "[--focus technical|business|engineering|leadership]"
allowed-tools: WebSearch, WebFetch, Read, Write
user-invocable: true
---

# AI Daily Digest Skill

Generate comprehensive daily AI news digest with technical, business, and engineering coverage.

## Arguments

Parse from `$ARGUMENTS`:
- `--focus [technical|business|engineering|leadership|all]` — Default: all

## State File

Track last run date in:
```
./findings/ai-daily-digest/.last-run
```

Format: `YYYY-MM-DD`

## Friday Weekly Recap Mode

When running on Friday, automatically enable broader research:

- **Extended date range:** Cover full week (7 days) regardless of last run
- **More search queries:** Add "this week in AI", "AI weekly roundup" patterns
- **Lower-tier sources:** Include more community sources (Reddit, Twitter)
- **Catch-up section:** Add "📅 Stories You Might Have Missed" section
- **Digest title:** Use "Weekly Recap" instead of "Daily Digest"
- **Blog discovery:** Search for new indie bloggers (see below)

### Blog Discovery (Friday)

Search for new interesting smaller blogs:
```
"AI blog" OR "ML blog" interesting {date_range}
site:substack.com AI machine learning
site:medium.com AI LLM practical (filter by quality)
site:dev.to AI machine learning tutorial
HN "Show HN" AI blog
```

When finding new quality blogs:
1. Add to "🆕 New Blogs Discovered" section in digest
2. Suggest adding to `sources.md` if consistently good

Quality signals:
- Original content (not aggregation)
- Technical depth
- Practical examples
- Active (posted in last 3 months)

## Workflow

### Phase 1: Setup

1. Read `sources.md` for search patterns and URLs
2. Read `output-template.md` for digest format
3. Parse arguments for focus area
4. **Read `.last-run` file:**
   - If exists: set date range from last run date to today
   - If missing: default to past 7 days (first run)
5. Calculate days since last run for digest header
6. **Friday check:** If today is Friday, enable weekly recap mode

### Phase 2: Technical Research

**Skip if focus excludes technical**

Search patterns:
- `AI LLM breakthrough OR release site:arxiv.org {date_range}`
- `AI model release OR launch {date_range}`
- `LLM framework tool release {date_range}`
- `site:huggingface.co blog {date_range}`
- `site:openai.com blog {date_range}`
- `site:anthropic.com news {date_range}`

Collect:
- New model releases (GPT, Claude, Gemini, Llama, etc.)
- Research paper highlights
- Framework/tool updates (LangChain, LlamaIndex, vLLM, etc.)
- Benchmark results

### Phase 3: Business Research

**Skip if focus excludes business**

Search patterns:
- `AI startup funding OR acquisition {date_range}`
- `AI company valuation OR investment {date_range}`
- `site:techcrunch.com AI {date_range}`
- `site:venturebeat.com AI {date_range}`
- `OpenAI OR Anthropic OR Google AI business {date_range}`

Collect:
- Funding rounds
- Acquisitions/mergers
- Product launches
- Partnership announcements
- Market analysis

### Phase 4: Engineering Impact Research

**Skip if focus excludes engineering**

Search patterns:
- `AI coding assistant OR developer tools {date_range}`
- `AI engineering workflow productivity {date_range}`
- `AI job market developer skills {date_range}`
- `site:news.ycombinator.com AI OR LLM {date_range}`
- `site:reddit.com/r/MachineLearning {date_range}`
- `site:reddit.com/r/LocalLLaMA {date_range}`

Collect:
- New dev tools and integrations
- Workflow automation updates
- Job market trends
- Community discussions and sentiment

### Phase 5: Leadership Research

**Skip if focus excludes leadership**

Search patterns:
- `AI leadership engineering management {date_range}`
- `AI team strategy CTO VP engineering {date_range}`
- `site:hbr.org AI leadership management`
- `site:mckinsey.com AI leadership`
- `AI transformation organizational change {date_range}`
- `engineering leadership AI adoption {date_range}`

Collect:
- AI strategy for engineering orgs
- Team structure changes due to AI
- Leadership perspectives on AI adoption
- Org transformation case studies
- Skills and competencies for AI era

### Phase 6: Newsletter & Blog Aggregation

Fetch and extract from:
- Simon Willison's blog (simonwillison.net)
- Latent Space blog
- The Batch (deeplearning.ai)
- TLDR AI newsletter archives

**Indie bloggers** (check for recent posts):
- Lilian Weng, Jay Alammar, Eugene Yan
- Chip Huyen, Vicki Boykis, Hamel Husain
- Sebastian Ruder, swyx, François Chollet

Search pattern: `site:{blog_url} {date_range}`

### Phase 7: Synthesis

1. **Deduplicate** — Remove duplicate stories across sources
2. **Rank** — Score by:
   - Source credibility (tier 1: arxiv, official blogs; tier 2: tech news; tier 3: social)
   - Engagement signals
   - Relevance to engineering work
3. **Categorize** — Assign to template sections
4. **Top 5** — Select most impactful stories

### Phase 8: Generate Digest

1. Load `output-template.md`
2. Fill sections with collected items
3. Format:
   - Each item: `**[Title]** — [1-line summary] [Source: URL]`
   - Include source URLs
   - Add personal takeaways section

### Phase 9: Save

**Step 1:** Create directories if needed
```bash
mkdir -p ./findings/ai-daily-digest
```

**Step 2:** Write digest to Obsidian Inbox
```
/Users/marcin.skalski@konghq.com/Library/Mobile Documents/iCloud~md~obsidian/Documents/second-brain/0_Inbox/ai-digest/{YYYY-MM-DD}.md
```
Create `0_Inbox/ai-digest/` directory if needed.

**Step 3:** Write archive copy
```
./findings/ai-daily-digest/ai-digest-{YYYY-MM-DD}.md
```

**Step 4: CRITICAL — Update state file**
```
./findings/ai-daily-digest/.last-run
```
Use Write tool to save today's date in `YYYY-MM-DD` format (e.g., `2026-01-28`).
File contains only the date string, nothing else.

**Verification:** Confirm all 3 files written successfully before completing.

## Output Requirements

- Use emojis for section headers (per Obsidian conventions)
- Bullet points over paragraphs
- Include wikilinks to existing vault notes where relevant
- All items must have source URLs
- Top 5 stories section required
- Personal takeaways with actionable items
- Show coverage period in header (e.g., "Coverage: Jan 25 - Jan 28 (3 days)")

## Error Handling

- If WebSearch fails for a source, log and continue with others
- Minimum viable digest: at least 5 items total across categories
- If < 5 items found, expand date range by 1 day and retry
- Only update `.last-run` on successful digest generation

## Example Invocations

```bash
# Full digest since last run
/ai-digest

# Technical focus only
/ai-digest --focus technical

# Business news only
/ai-digest --focus business
```
