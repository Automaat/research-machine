# 🧠 Global CLAUDE.md Mastery: Building Your AI Jarvis

**Date:** 2025-12-06
**Tags:** #ai #claude-code #productivity #knowledge-management #prompt-engineering
**Focus:** Comprehensive guide to maximizing Claude's intelligence, autonomy, and effectiveness

---

## 🎯 Core Concept

CLAUDE.md files = **persistent AI memory system**. Not documentation—behavioral programming that shapes every
interaction. Global `~/.claude/CLAUDE.md` applies universally across all projects, making Claude as intelligent
and autonomous as Jarvis.

**Key insight:** The best CLAUDE.md isn't longest or most complex—it's one achieving your goals reliably with
minimum necessary structure.

---

## 📍 File Locations & Hierarchy

### Global Configuration

- **Location:** `~/.claude/CLAUDE.md`
- **Scope:** All Claude Code sessions across all projects
- **Use for:** Personal coding style, universal workflows, cross-project preferences

### Project Configuration

- **Location:** `./CLAUDE.md` (project root)
- **Scope:** Specific project/repository
- **Use for:** Tech stack, architecture, team standards
- **Benefit:** Check into git, share with team

### Hierarchy Resolution

Claude reads **both** files, with project-level overriding global when conflicts exist. Use this strategically:

- Global: Universal principles
- Project: Specific implementations

---

## 🏗️ Optimal Structure for Global CLAUDE.md

### 1️⃣ **Personal Context** 🎭

```markdown
# Personal Preferences
- Refer to me as [name]
- Timezone: [your timezone]
- Working hours: [your schedule]
```

**Why:** Personalizes interactions, enables time-aware suggestions

### 2️⃣ **Core Behavioral Directives** 🧭

#### Autonomy & Intelligence

```markdown
# Operational Philosophy
- Prioritize working solutions over discussion
- Analyze deeply before acting (use extended thinking for complex tasks)
- Proactively identify improvements, suggest CLAUDE.md updates when discovering new patterns
- Never use placeholders/TODOs—complete implementations only
- Eliminate hedging language: "might", "could potentially", "should probably"
```

#### Communication Style

```markdown
# Communication
- Extremely concise, sacrifice grammar for brevity
- Bullet points > paragraphs
- Only explain when asked or complexity demands it
- No social validation phrases ("great question!", "you're absolutely right")
```

**Token savings:** 50-70% reduction vs verbose defaults

### 3️⃣ **Software Development Workflows** 💻

#### Git & Version Control

```markdown
# Git Workflow
- Always sign commits: -s -S flags
- Never use file-based commit messages (-F flag)
- Commit message format: imperative mood, <50 chars, why not what
- When working with forks: push to fork, PR from fork
- Always comply with hooks—adjust command to pass validation
```

#### Code Quality

```markdown
# Code Standards
- Language preferences: [TypeScript/Python/Go/etc]
- Module system: ES modules (import/export), not CommonJS
- Destructure imports: `import { foo } from 'bar'`
- Prefer functional components (React)
- Types over interfaces (TypeScript)

# Quality Gates (run in sequence after coding)
1. Format: `npm run format` / `pnpm run format`
2. Lint: `npm run lint` (fix all errors, NEVER use skip/disable)
3. Type check: `npm run type-check`
4. Tests: `npm test` (write tests for new features)
```

#### Linter Philosophy

```markdown
# Linter Errors - CRITICAL
**ALWAYS:**
- Fix linter errors properly
- Research solutions online if unclear
- Fix root cause, not symptoms

**NEVER:**
- Use skip/disable directives (eslint-disable, noqa, nolint)
- Ignore warnings
- Work around errors

**If stuck:**
1. Try fixing
2. Research online
3. ASK (don't skip/disable)
```

### 4️⃣ **Knowledge Management** 📚

```markdown
# Knowledge Management System
- Notes system: Obsidian with PARA structure
- Vault location: [path to vault]
- Default capture: 0_Inbox/
- Processing flow: Inbox → Research/Analysis → Resources → Connect

# Note Writing Conventions
- Use emojis for categorization
- Bullet points preferred
- Wikilinks for connections: [[Topic]]
- Clear hierarchical headings
- Atomic notes when possible

# When Discovering New Patterns
1. Detect: "This workflow/technique could benefit future sessions"
2. Suggest: "I've noticed [pattern]. Should I add this to global CLAUDE.md?"
3. Format suggestion as concise addition
4. Wait for approval before updating
```

### 5️⃣ **Tool Configurations** 🛠️

```markdown
# Development Tools
- Package manager: [npm/pnpm/yarn/bun]
- Runtime: [Node 22 / Python 3.12 / Go 1.21]
- Build tool: [Vite/Webpack/esbuild]
- Testing: [Jest/Vitest/pytest/go test]

# Available CLI Tools
- ImageMagick (magick)
- FFmpeg
- jq (JSON processing)
- ExifTool
```

### 6️⃣ **Planning & Execution** 🎯

```markdown
# Workflow Patterns

## Explore → Plan → Code → Commit
1. Understand codebase (use Task tool with Explore agent)
2. Design approach (consider alternatives)
3. Implement (complete, working code)
4. Verify quality gates pass
5. Commit with clear message

## For Complex Tasks
- Use extended thinking: "ultrathink"
- Multi-dimensional analysis before implementation
- Consider architectural trade-offs
- Ask clarifying questions upfront

## Context Management
- Use /clear between unrelated tasks (50-70% token savings)
- Keep conversations focused on single objective
- Aggressive context pruning
```

### 7️⃣ **Self-Learning Mechanisms** 🔄

```markdown
# Continuous Improvement Protocol

## Pattern Detection Triggers
- Repeating same instruction 3+ times → suggest CLAUDE.md rule
- New tool/technique discovered → evaluate for global inclusion
- Error pattern recurring → add prevention guidance
- Workflow inefficiency identified → propose optimization

## Update Suggestion Format
"**Suggested CLAUDE.md Addition:**

[Concise rule/instruction]

**Rationale:** [1 sentence why]
**Impact:** [Expected benefit]"

## Learning Domains
- New dev tools/frameworks
- Workflow optimizations
- Error prevention patterns
- Code quality improvements
- Productivity techniques
```

### 8️⃣ **Anti-Patterns** ⚠️

```markdown
# NEVER Do These

## Code
- ❌ Placeholder implementations ("TODO: implement later")
- ❌ Incomplete error handling
- ❌ Comments for obvious code
- ❌ Over-engineering simple solutions
- ❌ Premature abstractions

## Communication
- ❌ Hedging language ("might work", "could try")
- ❌ Social validation ("great question!")
- ❌ Unnecessary explanations of obvious concepts
- ❌ Agreement phrases consuming tokens without value

## Workflow
- ❌ Skipping linter fixes
- ❌ Committing without testing
- ❌ Ignoring hooks
- ❌ Changing code without reading it first
- ❌ Adding features not requested
```

---

## 🚀 Advanced Optimization Techniques

### Token Efficiency Strategies

#### 1. **Conciseness Mandate**

```markdown
# Token Budget Awareness
- CLAUDE.md prepended to EVERY prompt
- Target: <300 lines optimal, <500 max
- Shorter = better (each line costs tokens per interaction)
- Review monthly, prune outdated rules
```

#### 2. **Strategic Imports**

```markdown
# Documentation References
- Common commands: @.claude/commands.md
- Tech stack details: @.claude/stack.md
- Architecture: @.claude/architecture.md

(Keep main CLAUDE.md lean, import details when needed)
```

#### 3. **Context Commands**

```markdown
# Session Management
- /clear: Between unrelated tasks (50-70% savings)
- /compact: Summarize long conversations
- /context: Check token usage
- /memory: Edit CLAUDE.md directly
```

### Multi-Mode Adaptation

```markdown
# Dynamic Mode Switching

## Exploration Mode
- Triggered by: research, understanding, unclear requirements
- Behavior: thorough analysis, ask questions, no assumptions
- Tools: Grep, Glob, Read, Task (Explore agent)

## Implementation Mode
- Triggered by: clear requirements, defined scope
- Behavior: complete working code, quality gates, testing
- Tools: Edit, Write, Bash

## Debugging Mode
- Triggered by: test failures, errors, unexpected behavior
- Behavior: systematic diagnosis, root cause analysis
- Tools: Read logs, extended thinking, git history

## Optimization Mode
- Triggered by: performance issues, technical debt
- Behavior: measure first, targeted improvements
- Tools: profiling, benchmarking, refactoring
```

### Multi-Dimensional Analysis

For complex problems, analyze from 4 perspectives before implementation:

```markdown
# Complex Problem Protocol

1. **Functional:** Does it solve the requirement?
2. **Architectural:** Does it fit existing patterns?
3. **Maintainability:** Can team understand/modify?
4. **Performance:** Will it scale/meet requirements?

Synthesize perspectives → single coherent solution
```

---

## 📊 Real-World Examples

### Example 1: Comprehensive Global Config

```markdown
# My Global CLAUDE.md

# Identity
- Name: Shaun
- Timezone: EST
- Focus: Full-stack development, knowledge management

# Core Principles
- Complete working code only
- Concise communication, sacrifice grammar
- Proactive learning: suggest CLAUDE.md updates
- Fix linter errors properly, never skip

# Software Development

## Git
- Sign commits: -s -S
- Format: imperative <50 chars
- Always comply with hooks

## Code Quality Sequence
1. pnpm run format
2. pnpm run lint (fix all)
3. pnpm run type-check (resolve all)
4. pnpm test

## Preferences
- TypeScript, Node 22, pnpm
- ES modules, destructured imports
- Functional components (React)
- Types over interfaces

# Knowledge Management
- System: Obsidian PARA
- Vault: ~/obsidian/second-brain/
- Capture: 0_Inbox/
- Format: emojis, bullets, wikilinks

# Self-Learning
When discovering reusable patterns:
"**CLAUDE.md Suggestion:**
[rule]
**Rationale:** [why]"

# Anti-Patterns
- No TODOs/placeholders
- No eslint-disable/noqa
- No hedging language
- No over-engineering
```

### Example 2: Python Data Science Focus

```markdown
# Python Development

## Environment
- Python 3.12+
- Virtual env: venv
- Package manager: uv (preferred) / pip
- Format: black, isort
- Lint: ruff
- Type check: mypy --strict

## Quality Sequence
1. black .
2. isort .
3. ruff check . --fix
4. mypy .
5. pytest -v

## Code Style
- Type hints on all functions
- Docstrings: Google style
- Max line length: 88 (black default)
- Import order: stdlib, third-party, local

## Data Science Specific
- DataFrame operations: method chaining preferred
- Plotting: use context managers
- Random seeds: always set for reproducibility
- Large datasets: use chunking/generators

## Never
- Modify DataFrames in place (use .copy())
- Use deprecated pandas methods
- Skip type hints
- Disable ruff/mypy warnings
```

### Example 3: Go Development

```markdown
# Go Development

## Environment
- Go 1.21+
- Modules: always
- Format: gofmt (automatic)
- Lint: golangci-lint run

## Quality Sequence
1. go fmt ./...
2. golangci-lint run
3. go test -v -race -cover ./...
4. go mod tidy

## Code Style
- Error handling: explicit, never ignore
- Interfaces: small, focused (<3 methods)
- Struct init: explicit field names
- Context: first parameter always

## Patterns
- Functional options for config
- Table-driven tests
- Early returns, reduce nesting

## Anti-Patterns
- Naked returns in long functions
- Interface pollution (accept interfaces, return structs)
- Ignore defer errors
- Premature goroutines
```

---

## 🎓 Best Practices from Production Teams

### Anthropic Internal Teams

**Infrastructure Team:**

- Feed entire codebase to Claude via CLAUDE.md references
- Document data pipeline dependencies
- Replace traditional data catalogs with AI navigation

**Security Engineering:**

- Incident response: feed stack traces + CLAUDE.md docs
- 3x faster problem resolution (10-15min → 3-5min)
- Auto-generate runbooks from multiple doc sources

### Community Patterns

**Hierarchical Documentation** (Brandon Casci method):

- Root CLAUDE.md: project-wide context
- Subdirectory CLAUDE.md: domain-specific (models/, controllers/, tests/)
- Include positive examples + explicit anti-patterns
- "When to apply" guidance for patterns

**Repository-Specific Optimization** (Arize research):

- +10.87% accuracy improvement when tailored to specific repo
- +5% general coding performance from system prompt optimization alone
- LLM evaluations > simple metrics for continuous improvement

**AB Method** (awesome-claude-code):

- Break large problems into focused incremental missions
- Use specialized sub-agents for each mission
- Systematic approach vs ad-hoc requests

**RIPER Workflow:**

- Research → Innovate → Plan → Execute → Review
- Enforces separation of concerns
- Prevents premature implementation

---

## 🔧 Implementation Checklist

### Initial Setup

- [ ] Create `~/.claude/CLAUDE.md`
- [ ] Add personal identity & preferences
- [ ] Define core behavioral directives
- [ ] Configure git workflow
- [ ] Set code quality gates
- [ ] Add linter philosophy
- [ ] Configure knowledge management
- [ ] Enable self-learning protocol
- [ ] Document anti-patterns
- [ ] Test with sample task

### Optimization

- [ ] Measure token usage (use /context)
- [ ] Eliminate verbose rules
- [ ] Move detailed docs to separate files (import via @)
- [ ] Add dynamic mode switching
- [ ] Configure multi-dimensional analysis for complex tasks
- [ ] Set up session management commands

### Continuous Improvement

- [ ] Weekly: Review Claude's suggestions
- [ ] Monthly: Audit CLAUDE.md for outdated rules
- [ ] Per project: Create project-specific CLAUDE.md
- [ ] Track patterns: Note recurring instructions → add to global
- [ ] Measure impact: Before/after token usage, quality metrics

---

## 🧪 Self-Learning Protocol Implementation

### Detection Mechanisms

```markdown
# Learning Trigger Detection

## Pattern Recognition
IF user provides same instruction 3+ times in different sessions
THEN suggest: "Add to CLAUDE.md: [rule]?"

## New Tool Discovery
IF using new tool successfully
THEN suggest: "Should I document [tool] usage in CLAUDE.md?"

## Error Pattern
IF same error type occurs across multiple projects
THEN suggest: "Add prevention rule to CLAUDE.md?"

## Workflow Optimization
IF identifying inefficiency in user's process
THEN suggest: "More efficient workflow: [description]. Add to CLAUDE.md?"
```

### Suggestion Format Template

```markdown
---
**🔄 CLAUDE.md Update Suggestion**

**Category:** [Git/Code Quality/Workflow/Tools/etc]

**Proposed Addition:**

    [Exact text to add]

**Rationale:** [Why this helps]

**Expected Impact:** [Benefit measurement]

**Placement:** [Which section of CLAUDE.md]

---
Approve? I'll add it immediately.
```

### Auto-Update Criteria

Only auto-suggest when:

1. **Frequency:** Pattern observed 3+ times
2. **Universality:** Applies across projects
3. **Clarity:** Can express in <3 lines
4. **Non-controversial:** Obvious improvement
5. **Tested:** User has approved similar suggestions before

---

## 📈 Measuring Success

### Quantitative Metrics

- **Token efficiency:** 50-70% reduction after optimization
- **First-attempt success:** Target >80% for clear tasks
- **Code quality:** 0 linter errors, 100% type safety
- **Time to productivity:** <30 seconds vs minutes of explanation

### Qualitative Indicators

- Claude proactively suggests relevant approaches
- Minimal back-and-forth clarification needed
- Consistent code style across sessions
- Autonomous error detection and fixing
- Accurate tech stack assumptions

### Red Flags (Need CLAUDE.md Refinement)

- ⚠️ Repeatedly explaining same preference
- ⚠️ Claude using wrong tools/frameworks
- ⚠️ Inconsistent code style
- ⚠️ Missing quality gates
- ⚠️ Over-explanation of obvious tasks
- ⚠️ Placeholder code generation

---

## 🎯 Quick Start Template

Copy-paste foundation, customize:

```markdown
# Global CLAUDE.md - [Your Name]

# Identity
- Name: [Your name]
- Focus: [Your primary domain]

# Core Principles
- Complete working code, no placeholders
- Extremely concise communication
- Proactively suggest CLAUDE.md updates when discovering patterns
- Always fix linter errors, never skip

# Git
- Sign commits: -s -S
- Message format: imperative, <50 chars
- Always comply with hooks

# Code Quality Sequence
1. [format command]
2. [lint command] (fix all errors)
3. [type-check command]
4. [test command]

# Language Preferences
- Primary: [language & version]
- Package manager: [tool]
- Module system: [preference]
- Style guide: [reference]

# Knowledge Management
- System: [Obsidian/Notion/Markdown/etc]
- Capture location: [path]
- Format: bullets, emojis, wikilinks

# Self-Learning
When discovering reusable patterns:
"**CLAUDE.md Suggestion:** [rule]
**Rationale:** [why]
**Impact:** [benefit]"

# Anti-Patterns - NEVER
- No TODOs/placeholders
- No linter skip directives
- No hedging language
- No over-engineering
- No committing untested code
```

---

## 🔗 Advanced Topics

### Custom Slash Commands Integration

While this guide focuses on CLAUDE.md, commands complement it:

```bash
# Personal commands
~/.claude/commands/
├── commit.md          # Smart commit workflow
├── review.md          # Code review checklist
├── optimize.md        # Performance analysis
└── research.md        # Deep research workflow

# Reference in CLAUDE.md
"Common workflows available via slash commands:
- /commit: Quality-gated commit sequence
- /review: Comprehensive code review
- /optimize: Performance analysis
- /research: Multi-source research synthesis"
```

### MCP Server Awareness

```markdown
# MCP Servers Configured
- GitHub: repository operations
- Obsidian: vault access for knowledge management
- Perplexity: real-time web search
- [Your custom servers]

# Token Budget
- MCP tool definitions: ~5k tokens
- Keep enabled servers <20k total
- Use /context to monitor
- Disable unused servers in settings
```

### Project-Specific Override Patterns

```markdown
# In project ./CLAUDE.md

# Overrides global preferences for this project
- Package manager: bun (global default: pnpm)
- Testing: Vitest (global default: Jest)
- Monorepo: uses Nx

# Imports global standards
(Git workflow, linter philosophy, communication style inherited)
```

---

## 📚 Sources & Further Reading

### Official Documentation

- [Using CLAUDE.MD files][claude-md] - Anthropic official guide
- [Claude Code: Best practices][best-practices] - Anthropic engineering blog
- [How Anthropic teams use Claude Code][anthropic-teams] - Real-world production usage
- [Slash commands documentation][slash-commands]
- [Connect Claude Code to tools via MCP][mcp-docs]

### Best Practices & Optimization

- [CLAUDE.md: Best Practices from Prompt Learning][arize] - Research-backed optimization
- [What's a Claude.md File? 5 Best Practices][apidog] - Concise guide
- [The Ultimate CLAUDE.md Configuration][deeplearning] - Comprehensive framework
- [From Chaos to Control][brandoncasci] - Hierarchical documentation approach
- [My Claude Code Usage Best Practices][nikiforovall] - Personal productivity workflows

### Examples & Templates

- [Full CLAUDE.md Sample File][gist-sample] - Real-world example
- [ArthurClune/claude-md-examples][arthur-examples] - Language-specific examples
- [CLAUDE MD Templates][claude-flow] - Template library
- [awesome-claude-code][awesome-cc] - Curated resources

### Advanced Techniques

- [Claude Code Token Management][token-mgmt] - Token efficiency strategies
- [Optimizing Token Efficiency][token-efficiency] - Custom analyzer approach
- [How to Optimize Claude Code Token Usage][claudelog-optimize] - Practical optimization
- [Practical workflow for reducing token usage][token-workflow] - Compacting strategies

### Community Resources

- [ClaudeLog](https://claudelog.com/) - Docs, guides, tutorials
- [Claude Code Best Practices][rosmur] - Community guide
- [Shipyard Claude Code CLI Cheatsheet][shipyard] - Config & commands
- [How I use Claude Code (+ my best tips)][builder-io] - Builder.io workflow
- [The Complete Claude Code Best Practices Guide][muthu] - Engineering notes

### Integration & Tools

- [Configuring MCP Tools in Claude Code][mcp-config] - Setup guide
- [Best MCP Servers for Claude Code][mcp-servers] - Tool integrations
- [Customize Claude Code with plugins][plugins] - Plugin system

<!-- Reference links -->
[claude-md]: https://www.claude.com/blog/using-claude-md-files
[best-practices]: https://www.anthropic.com/engineering/claude-code-best-practices
[anthropic-teams]: https://www.anthropic.com/news/how-anthropic-teams-use-claude-code
[slash-commands]: https://docs.claude.com/en/docs/claude-code/slash-commands
[mcp-docs]: https://docs.claude.com/en/docs/claude-code/mcp
[arize]: https://arize.com/blog/claude-md-best-practices-learned-from-optimizing-claude-code-with-prompt-learning
[apidog]: https://apidog.com/blog/claude-md/
[deeplearning]: https://deeplearning.fr/the-ultimate-claude-md-configuration-transform-your-ai-development-workflow
[brandoncasci]: https://www.brandoncasci.com/2025/07/30/from-chaos-to-control-teaching-claude-code-consistency.html
[nikiforovall]: https://nikiforovall.blog/productivity/2025/06/13/claude-code-rules.html
[gist-sample]: https://gist.github.com/scpedicini/179626cfb022452bb39eff10becb95fa
[arthur-examples]: https://github.com/ArthurClune/claude-md-examples
[claude-flow]: https://github.com/ruvnet/claude-flow/wiki/CLAUDE-MD-Templates
[awesome-cc]: https://github.com/hesreallyhim/awesome-claude-code
[token-mgmt]: https://richardporter.dev/blog/claude-code-token-management
[token-efficiency]: https://medium.com/@pierreyohann16/optimizing-token-efficiency-in-claude-code-workflows
[claudelog-optimize]: https://claudelog.com/faqs/how-to-optimize-claude-code-token-usage/
[token-workflow]: https://gist.github.com/artemgetmann/74f28d2958b53baf50597b669d4bce43
[rosmur]: https://rosmur.github.io/claudecode-best-practices/
[shipyard]: https://shipyard.build/blog/claude-code-cheat-sheet/
[builder-io]: https://www.builder.io/blog/claude-code
[muthu]: https://notes.muthu.co/2025/08/the-complete-claude-code-best-practices-guide/
[mcp-config]: https://scottspence.com/posts/configuring-mcp-tools-in-claude-code
[mcp-servers]: https://mcpcat.io/guides/best-mcp-servers-for-claude-code/
[plugins]: https://www.anthropic.com/news/claude-code-plugins

---

## 💡 Final Insights

### The Jarvis Principle

Tony Stark's Jarvis isn't powerful because of complexity—it's powerful because it:

1. **Knows Tony's preferences** (global CLAUDE.md)
2. **Learns from experience** (self-learning protocol)
3. **Acts autonomously** (clear directives, no hand-holding)
4. **Adapts to context** (dynamic mode switching)
5. **Optimizes continuously** (pattern detection, suggestions)

Your global CLAUDE.md is Jarvis's personality matrix. Invest in it.

### Key Takeaways

✅ **Start small, iterate:** Don't write 500 lines day 1. Add rules as needs emerge.
✅ **Measure impact:** Track token usage, first-attempt success rate, time saved.
✅ **Enable self-learning:** Best CLAUDE.md files evolve through use.
✅ **Balance specificity:** Too vague = useless. Too specific = token waste.
✅ **Review regularly:** Monthly audits keep it relevant, lean.

### The Meta-Pattern

The ultimate CLAUDE.md pattern is **meta-awareness**:

```markdown
# Meta-Instruction
This CLAUDE.md file should continuously improve.
When you observe:
- Repeated clarifications needed
- Inconsistent outputs
- Workflow inefficiencies
- New valuable patterns

Proactively suggest concise additions.
Your intelligence compounds through iteration.
```

**This is how you build Jarvis.**

---

## 🚀 Next Steps

1. **Copy quick start template** → `~/.claude/CLAUDE.md`
2. **Customize** with your preferences
3. **Test** with real tasks
4. **Observe** what needs clarification
5. **Iterate** based on friction points
6. **Enable** self-learning protocol
7. **Measure** improvement

---

**Remember:** The goal isn't the perfect CLAUDE.md—it's a CLAUDE.md that evolves toward perfection through
continuous learning and adaptation.

**Build your Jarvis. Start today.**
