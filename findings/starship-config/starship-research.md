# Starship Config Research 🚀

**Date:** 2025-12-05
**Tags:** #research #terminal #starship #config
**Focus:** Minimal, practical config for Go/Python/Rust/K8s/mise workflow

## Key Findings 💡

### What Starship Does

- ⚡ **Blazing fast** prompt written in Rust
- 🎯 **Context-aware** - shows language versions only when relevant files detected
- 🔧 **100+ modules** available, all optional
- 📦 **Default is minimal** - add what you need
- 🎨 **Nerd Font support** for pretty icons

### Performance Design 🏎️

- **Lazy evaluation** - only computes when needed
- **Parallel module processing** - uses Rayon for concurrency
- **Smart caching** - directory contents, git status
- **Configurable timeouts** - prevents hanging (default: 500ms per module)
- **`starship timings`** - debug slow modules

### Language Module Behavior 📚

**Automatic detection:**

- **Python** - shows when `*.py`, `pyproject.toml`, `requirements.txt`, or venv detected
- **Go** - shows when `go.mod`, `go.sum`, `*.go` files present
- **Rust** - shows when `Cargo.toml`, `Cargo.lock`, `*.rs` files present

**No manual switching needed** - modules auto-hide when not relevant

### Mise Integration Status 🔄

- **No native mise module yet** (as of Dec 2025)
- Active discussions: [Issue #5654](https://github.com/starship/starship/issues/5654), [Discussion #1554](https://github.com/jdx/mise/discussions/1554)
- **Workaround:** Language modules (python, golang, rust) show versions from PATH
- **Since mise activates tools to PATH** - Starship will show correct versions

### Kubernetes Module 🐳

- **Disabled by default** - can be noisy
- Shows: context + namespace from kubeconfig
- **Context aliases** - shorten long cluster names
- **Pattern matching** - different styles for prod/dev

## Recommended Config 🎯

```toml
# ~/.config/starship.toml
# Minimal config for Go/Python/Rust/K8s workflow
# Keep it clean, fast, and useful

# Format: what shows and in what order
format = """
$directory\
$git_branch\
$golang\
$python\
$rust\
$kubernetes\
$line_break\
$character"""

# Don't add blank line before prompt
add_newline = false

# Directory: shorten long paths
[directory]
truncation_length = 3
truncate_to_repo = true
format = "[$path]($style)[$read_only]($read_only_style) "
style = "bold cyan"

# Git: just show branch, keep it simple
[git_branch]
symbol = " "
format = "on [$symbol$branch]($style) "
style = "bold purple"

# Golang: show version when in Go project
[golang]
symbol = " "
format = "via [$symbol($version )]($style)"
style = "bold cyan"

# Python: show version + venv when in Python project
[python]
symbol = " "
format = 'via [${symbol}${pyenv_prefix}(${version) )(\($virtualenv\) )]($style)'
style = "yellow bold"

# Rust: show version when in Rust project
[rust]
symbol = " "
format = "via [$symbol($version )]($style)"
style = "bold red"

# Kubernetes: disabled by default, enable if you want
# Uncomment to enable
[kubernetes]
disabled = true
symbol = "☸ "
format = 'on [$symbol$context( \($namespace\))]($style) '
style = "bold blue"

# Optional: shorten k8s context names
# [[kubernetes.contexts]]
# context_pattern = "arn:aws:eks:.*:.*:cluster/(.*)"
# context_alias = "$1"

# Prompt character: changes color based on success/failure
[character]
success_symbol = "[❯](bold green)"
error_symbol = "[❯](bold red)"
```

## What You'll See 👀

**In a Go project:**

```text
~/projects/myapp on main via 1.21.5
❯
```

**In a Python venv:**

```text
~/work/api via 3.12.1 (venv)
❯
```

**In a Rust project with git:**

```text
~/rust/cli on feature/new via 1.74.0
❯
```

**With K8s enabled:**

```text
~/infra on main on prod-cluster (default)
❯
```

## Configuration Tips 🔧

### Keep It Fast

- **Only enable modules you need** - disabled = true for unused modules
- **Use `truncate_to_repo`** - don't show full path inside git repos
- **Avoid complex custom commands** - they add latency
- **Check performance:** `starship timings` shows module execution time

### Nerd Fonts Required 🎨

Config uses Nerd Font icons (will show as boxes/missing in VSCode, but render correctly in Ghostty):

- Go gopher icon
- Python logo
- Rust gear icon
- Git branch symbol
- Kubernetes helm symbol

**Install Nerd Font for Ghostty:**

1. Download from [nerdfonts.com](https://www.nerdfonts.com)
2. Popular choices: JetBrainsMono Nerd Font, FiraCode Nerd Font, Hack Nerd Font
3. Configure in Ghostty: `font-family = "JetBrainsMono Nerd Font"`

### Customization Ideas 💭

**If you want more:**

- `$cmd_duration` - show slow command times
- `$status` - show exit codes
- `$time` - current time
- `$docker_context` - Docker context
- `$aws` - AWS profile

**If you want less:**

- Remove language modules you rarely use
- Disable git status details (already minimal with just branch)
- Single-line everything (already configured)

## Installation 📦

```bash
# Install Starship
brew install starship

# Add to your shell rc file (~/.zshrc or ~/.bashrc)
eval "$(starship init zsh)"  # or bash

# Save config
mkdir -p ~/.config
# Copy config above to ~/.config/starship.toml

# Test
starship config
```

## Alternatives Considered ❌

**Why not native prompts?**

- Slower (shell script vs Rust binary)
- Harder to configure consistently
- No cross-shell support

**Why not Oh My Zsh/Powerlevel10k?**

- More bloated
- Zsh-only
- Starship is faster and simpler

## Next Steps 🎯

1. Install Starship via brew
2. Install Nerd Font for Ghostty
3. Copy recommended config to `~/.config/starship.toml`
4. Add `eval "$(starship init zsh)"` to shell rc
5. Test with different project types
6. Tweak modules/colors to taste

## Related

Future: Create [[Ghostty Terminal]] MOC, connect to [[Terminal Setup]]

---

**Suggested location:** 3_Resources/Development/Terminal/
**Tags:** #starship #terminal #config #ghostty #productivity

## Sources

- [Starship Official Config](https://starship.rs/config/)
- [Starship Presets](https://starship.rs/presets/)
- [Nerd Font Symbols Preset](https://starship.rs/presets/nerd-font)
- [Starship Performance FAQ](https://starship.rs/faq/)
- [GitHub Starship Repository](https://github.com/starship/starship)
- [Mise Starship Integration Discussion](https://github.com/jdx/mise/discussions/1554)
- [Starship K8s Module Examples](https://medium.com/@petolofsson/supercharge-your-kubernetes-workflow-with-essential-tools-starship-kubectx-kubecolor-and-k9s-c2ce5eb88d23)
- [Starship Performance Blog](https://blog.ffff.lt/posts/starship-subtle-slowness/)
- [Better Stack Mise Guide](https://betterstack.com/community/guides/scaling-nodejs/mise-explained/)
