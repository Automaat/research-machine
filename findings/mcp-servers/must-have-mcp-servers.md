# 🔌 Must-Have MCP Servers for Claude Code

**Date:** 2025-12-08
**Tags:** #research #mcp #claude-code #developer-tools #ai
**Focus:** MCP servers that add real value to Claude Code (not duplicating CLI)

---

## 📋 Overview

Model Context Protocol (MCP) = universal standard for AI ↔ external tools integration

- Released by Anthropic Nov 2024
- Adopted by OpenAI (Mar 2025), Google Gemini (Apr 2025)
- 8M+ downloads by Apr 2025 (up from 100k in Nov 2024)
- Think "USB-C for AI applications"

---

## ⚠️ Claude Code Already Has

**Don't waste MCPs on things Claude Code does natively:**

| Built-in | What it does | Skip these MCPs |
|----------|--------------|-----------------|
| Read/Write/Edit/Glob/Grep | File operations | Filesystem MCP |
| Bash | Any CLI tool | Docker MCP, Git MCP |
| `gh` CLI | GitHub operations | GitHub MCP (often worse) |
| WebSearch/WebFetch | Web access | Generic search MCPs |

**Key insight:** "A lot of MCPs could have been CLI invocations" - GitHub MCP often performs worse than `gh` CLI directly.

---

## 🎯 MCPs That Actually Add Value

### ✅ Use MCP When It Provides

1. **Semantic/LSP features** - go-to-definition, references (CLI can't do this)
2. **Stateful sessions** - persistent memory, shared context
3. **Rich content** - images, structured data, not just text
4. **Cleaner output** - structured JSON vs verbose CLI output
5. **Complex auth** - OAuth flows handled by MCP

---

## 🧠 Tier 1: High Value for Claude Code

| Server | Why it adds value | Install |
|--------|-------------------|---------|
| **[Context7](https://github.com/upstash/context7)** | Up-to-date library docs, solves stale training data | `npx -y @upstash/context7-mcp@latest` |
| **[mcp-language-server](https://github.com/isaacphi/mcp-language-server)** | Real LSP: definitions, references, diagnostics, hover | `go install github.com/isaacphi/mcp-language-server@latest` |
| **[Playwright MCP](https://github.com/microsoft/playwright-mcp)** | Visual browser state, screenshots, accessibility | `npx -y @anthropic/mcp-playwright` |
| **[Memory/Mem0](https://github.com/mem0ai/mem0)** | Persistent memory across sessions | `pip install mem0` |

---

## 💻 Language-Specific MCPs

### 🐹 Go - **gopls has OFFICIAL MCP** ✨

Built into gopls! No extra install needed.

```bash
# Start gopls with MCP
gopls -mcp.listen=:8092
```

**Tools:** `go_to_definition`, `find_references`, `hover`, `diagnostics`, `symbols`, `formatting`

**Config:**

```json
{
  "mcpServers": {
    "gopls": {
      "url": "http://localhost:8092/sessions/1"
    }
  }
}
```

**Verdict:** ✅ Use it - official, semantic features CLI can't provide

---

### 🦀 Rust + Clippy

| MCP | Tools | Install |
|-----|-------|---------|
| **[cargo-mcp](https://crates.io/crates/cargo-mcp)** | `cargo_clippy`, `cargo_check`, `cargo_test`, `cargo_fmt`, `cargo_build` | `cargo install cargo-mcp` |
| **[rust-analyzer MCP](https://github.com/dexwritescode/rust-mcp)** | `find_definition`, `find_references`, `apply_clippy_suggestions` | `cargo install rust-analyzer-mcp` |

**Config:**

```json
{
  "mcpServers": {
    "cargo": {
      "command": "cargo-mcp"
    }
  }
}
```

**Verdict:** ⚖️ Optional - `cargo clippy --message-format=json` works, but MCP adds LSP features

---

### 🟦 TypeScript + oxlint

**No oxlint MCP exists yet** 😕

| Option | Status |
|--------|--------|
| oxlint MCP | ❌ Doesn't exist |
| [biome-mcp-server](https://github.com/RyuzakiShinji/biome-mcp-server) | Unofficial, lint + format |
| [@eslint/mcp](https://www.npmjs.com/package/@eslint/mcp) | Official ESLint: `npx @eslint/mcp@latest` |

**Verdict:** ❌ Stick with CLI - `oxlint` via Bash is fine

---

### 🐍 Python + ruff + pyrefly

| MCP | What it does | Install |
|-----|--------------|---------|
| **[mcp-pyrefly](https://github.com/kimasplund/mcp-pyrefly)** | Real-time type checking (1.8M lines/sec) | `uvx mcp-pyrefly` |
| **[mcp-pyrefly-autotype](https://github.com/lolpack/mcp-pyrefly-autotype)** | Auto-add type annotations | `pip install mcp-pyrefly-autotype` |

**No ruff MCP** - but pyrefly uses ruff parser internally

**Config:**

```json
{
  "mcpServers": {
    "pyrefly": {
      "command": "uvx",
      "args": ["mcp-pyrefly"]
    }
  }
}
```

**Verdict:** ✅ Use pyrefly MCP for types, `ruff check` via CLI for linting

---

## 🔍 Code Quality & Analysis MCPs

| MCP | What it does | When to use |
|-----|--------------|-------------|
| **[ESLint MCP](https://eslint.org/docs/latest/use/mcp)** | Official ESLint integration | `eslint --mcp` flag |
| **[Pylint MCP](https://github.com/matthew-sayer/pylint_mcp)** | Python linting with LLM-friendly output | Structured analysis |
| **[Codacy MCP](https://www.pulsemcp.com/servers/codacy)** | Multi-lang static analysis, coverage | Enterprise quality gates |
| **[mcp-code-checker](https://github.com/MarcusJellinghaus/mcp-code-checker)** | Pylint + Pytest with fix suggestions | LLM-optimized prompts |
| **[AST MCP Server](https://github.com/angrysky56/ast-mcp-server)** | AST/ASG parsing, multi-language | Deep code structure analysis |

---

## 🧪 Testing MCPs

| MCP | Languages | Install |
|-----|-----------|---------|
| **[Test Runner MCP](https://www.npmjs.com/package/test-runner-mcp)** | Pytest, Jest, Go, Rust, Bats, Flutter | `npx -y test-runner-mcp` |
| **[Pytest MCP Server](https://github.com/tosin2013/pytest-mcp-server)** | Python (debugging focus) | 9 debugging principles |
| **[pytest-mcp](https://pypi.org/project/pytest-mcp/)** | MCP server evaluation | Coverage, metrics |

---

## 📚 Documentation MCPs

| MCP | What it does |
|-----|--------------|
| **[Context7](https://github.com/upstash/context7)** | Library docs injection (just add "use context7" to prompt) |
| **[Sourcegraph MCP](https://github.com/divar-ir/sourcegraph-mcp)** | Cross-repo code search, pattern matching |
| **[OpenAPI/Swagger MCP](https://github.com/Vizioz/Swagger-MCP)** | Auto-generate tools from any API spec |
| **[AWS OpenAPI MCP](https://awslabs.github.io/mcp/servers/openapi-mcp-server)** | Dynamic tools from OpenAPI specs |

---

## 🚀 Productivity MCPs (Worth Adding)

### 📝 Knowledge Management

| Server | Purpose | Why use |
|--------|---------|---------|
| **[Obsidian MCP](https://github.com/cyanheads/obsidian-mcp-server)** | Vault access | Search, wikilinks, tags - richer than file read |
| **[Notion MCP](https://mcp.composio.dev/notion)** | Workspace | Pages, databases, complex queries |

### ✅ Project Management

| Server | When useful |
|--------|-------------|
| **[Linear MCP](https://mcp.composio.dev/linear)** | Heavy Linear user, richer than CLI |
| **[Zapier MCP](https://zapier.com/blog/claude-mcp-servers/)** | Cross-app automation (6000+ apps) |

### 💬 Communication (Situational)

| Server | When useful |
|--------|-------------|
| **[Slack MCP](https://mcp.composio.dev/slack)** | Heavy automation needs |
| **[Gmail MCP](https://mcp.composio.dev/gmail)** | Email workflows |

---

## 📊 Decision Matrix: MCP vs CLI

| Tool | Has MCP? | Use MCP? | Reasoning |
|------|----------|----------|-----------|
| **gopls** | ✅ Official | ✅ Yes | Semantic features |
| **golangci-lint** | ❌ | - | CLI fine |
| **cargo/clippy** | ✅ | ⚖️ Optional | LSP features nice, CLI works |
| **rust-analyzer** | ✅ | ✅ Yes | Definitions, refs |
| **oxlint** | ❌ | - | CLI only |
| **ruff** | ❌ | - | CLI only |
| **pyrefly** | ✅ | ✅ Yes | Fast type checking |
| **eslint** | ✅ Official | ⚖️ Optional | Structured output |
| **git** | ✅ | ❌ No | `git` CLI better |
| **gh (GitHub)** | ✅ | ❌ No | `gh` CLI better |
| **docker** | ✅ | ❌ No | `docker` CLI fine |

---

## ⚡ Recommended Config

### Polyglot Dev (Go, Rust, TS, Python)

```json
{
  "mcpServers": {
    "gopls": {
      "url": "http://localhost:8092/sessions/1"
    },
    "pyrefly": {
      "command": "uvx",
      "args": ["mcp-pyrefly"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    }
  }
}
```

**Note:** Start gopls separately: `gopls -mcp.listen=:8092`

Save to: `~/.claude.json` (global) or `.mcp.json` (project)

### Verify Setup

```bash
claude mcp list        # List configured servers
/mcp                   # Check status inside Claude Code
claude --mcp-debug     # Debug connection issues
```

---

## ⚠️ Security Considerations

- Apr 2025: Invariant Labs discovered "tool poisoning" vulnerability
- **Mitigations:**
  - Input validation
  - Output sanitization
  - Audit logging
  - Least privilege for file access
- Token limits: `MAX_MCP_OUTPUT_TOKENS` env var (default 25k)

---

## 🔗 Resources

- [Claude Code MCP Docs](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [Official MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)
- [gopls MCP (official)](https://go.dev/gopls/features/mcp)
- [Context7](https://github.com/upstash/context7)
- [MCP vs CLI Benchmark](https://mariozechner.at/posts/2025-08-15-mcp-vs-cli/)

---

## 📍 Action Items

- [ ] Start gopls with `-mcp.listen=:8092`
- [ ] Install Context7 for up-to-date docs
- [ ] Set up pyrefly MCP for Python type checking
- [ ] Test Playwright MCP for e2e/visual testing
- [ ] Evaluate cargo-mcp vs CLI for Rust workflow

---

**Suggested location:** 3_Resources/Developer-Tools/
**Potential MOCs:** [[AI Tools MOC]], [[Claude Code MOC]], [[Developer Productivity MOC]]
**Tags:** #mcp #claude-code #ai-tools #developer-experience
