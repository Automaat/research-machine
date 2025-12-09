# AI Research

Research and experiments with AI tools and frameworks.

## Recent Research

### CLAUDE.md Best Practices (Nov 2025)

Comprehensive research on writing effective CLAUDE.md files for software engineering projects, including:

- Analysis of Claude Code, GitHub Copilot, Cursor, Windsurf, and Aider
- Best practices from 100+ real-world projects
- Language-specific patterns (Go, TypeScript, Python, etc.)
- Team collaboration strategies
- Large codebase patterns (300k+ LoC)

**📄 Full research:** [findings/claude-md-best-practices.md](findings/claude-md-best-practices.md)

## Tools & Templates

### Research Prompts

Evidence-based research prompts with CoT, CoVe, and self-critique to prevent hallucination.

| Prompt | Use Case |
|--------|----------|
| [grounded-research.md](tools/prompts/grounded-research.md) | Systematic 4-phase research with full source verification |
| [quick-research.md](tools/prompts/quick-research.md) | Lightweight lookup for tool configs, how-tos |

**Slash commands:**

```bash
/full-research RAG hallucination mitigation techniques
/quick-research mise task runner syntax
```

### CLAUDE.md Generator

Generate tailored CLAUDE.md files for your projects:

**For existing projects:**

```bash
# Copy the prompt and run in your project directory
cat tools/prompts/generate-claude-md-existing.md
```

**For new projects:**

```bash
# Copy the prompt to set up patterns from the start
cat tools/prompts/generate-claude-md-new.md
```

**Blank template:**

- [tools/templates/CLAUDE.md.template](tools/templates/CLAUDE.md.template)

## Project Structure

```text
/.claude/
  /commands/       # Slash commands (/full-research, /quick-research)
/findings/         # Research findings and reports
/tools/
  /templates/      # Reusable templates
  /prompts/        # Prompt engineering resources
/experiments/      # Experimental code
/benchmarks/       # Performance benchmarks
```

## Contents

- Tool evaluations
- Benchmarks
- Experiments
- Research findings

## Setup

```bash
mise install
```
