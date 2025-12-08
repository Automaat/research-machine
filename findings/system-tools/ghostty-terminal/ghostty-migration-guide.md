# 👻 Ghostty Terminal: iTerm Migration Guide

**Date:** 2025-12-05
**Tags:** #terminal #ghostty #iterm #tooling #performance
**Focus:** Migration from iTerm2 to Ghostty with config recommendations

## 🚀 Why Ghostty?

### Performance

- **4x faster** text rendering vs iTerm
- **50% less memory** (~100MB vs ~220MB)
- **GPU-accelerated** via Metal (macOS) / OpenGL/Vulkan (Linux)
- **2ms latency** during 10k-line scrolls (37% better than Alacritty)
- **60 FPS maintained** during heavy I/O (GPU decoupling)

### Architecture

- Written in **Zig** by Mitchell Hashimoto (HashiCorp co-founder)
- Native **SwiftUI** app on macOS (real windowing, menus, settings GUI)
- **GTK4** on Linux
- Multi-renderer: Metal/OpenGL/Vulkan/Software

### Migration Benefits

- ✅ Shell configs (.zshrc, .bashrc) work immediately - no changes needed
- ✅ Text-based config (versionable with Git!)
- ✅ Zero-config start, customize later
- ✅ Native platform UI (not custom-drawn)

---

## 🎨 Cool Features to Try

### 1. Quick Terminal (Dropdown) 🎯

iTerm's dropdown replacement - system-wide hotkey toggle:

```conf
keybind = global:shift+escape=toggle_quick_terminal
macos-hidden = always
```

### 2. GPU Acceleration ⚡

Enable for maximum performance:

```conf
gpu-acceleration = true
renderer = auto  # or: metal (macOS), opengl, vulkan (Linux)
```

### 3. Themes 🌈

Hundreds of built-in themes, auto dark/light mode:

```bash
# List all themes
ghostty +list-themes
```

```conf
# In config
theme = catppuccin-mocha
# OR auto-switch with system
theme = system
```

Built-in themes location: `/Applications/Ghostty.app/Contents/Resources/ghostty/themes/`

### 4. Split Panes & Tabs 📐

Native platform splits (not tmux replacement, but solid):

**Default shortcuts (macOS):**

- `Cmd+D` - split right
- `Cmd+Shift+D` - split down
- `Cmd+Ctrl+Arrow` - navigate splits
- `Cmd+T` - new tab
- `Cmd+1-9` - jump to tab

**Custom Emacs-like sequences:**

```conf
keybind = ctrl+x>2=new_split:down
keybind = ctrl+x>3=new_split:right
keybind = ctrl+x>0=close_surface
```

### 5. Custom Keybindings 🎹

Flexible keybind system with prefixes:

```conf
# Global (works when unfocused - macOS only)
keybind = global:cmd+grave_accent=toggle_quick_terminal

# Unconsumed (sends to program too)
keybind = unconsumed:ctrl+a=reload_config

# All surfaces (affects all splits)
keybind = all:ctrl+shift+r=reload_config

# Reload config on-the-fly
keybind = cmd+shift+comma=reload_config  # default
```

**List available keybinds:**

```bash
ghostty +list-keybinds
```

### 6. Font Configuration 🔤

Embeds **JetBrains Mono** + Nerd Fonts by default:

```conf
font-family = "JetBrains Mono"
font-size = 14
font-thicken = true  # better visibility

# Disable ligatures (if preferred)
font-feature = -calt
```

### 7. Security Features 🔒

Built-in protections:

```conf
clipboard-paste-protection = true  # warns about dangerous pastes (newlines, etc)
title-report = false  # default, prevents security issues
```

### 8. Performance Tuning ⚙️

Optimize for your workflow:

```conf
# Scrollback
scrollback-limit = 10000

# Memory
image-storage-limit = 320000000

# Disable transparency for perf
background-opacity = 1.0

# Disable cursor blink
cursor-style-blink = false
```

---

## ⚡ Quick Start Config

**Location:** `~/.config/ghostty/config` or `~/Library/Application Support/com.mitchellh.ghostty/config` (macOS)

**Minimal recommended:**

```conf
# Theme
theme = catppuccin-mocha

# Font
font-size = 14
font-thicken = true

# Quick terminal
keybind = global:cmd+grave_accent=toggle_quick_terminal

# Performance
gpu-acceleration = true
renderer = auto

# Security
clipboard-paste-protection = true

# Reload config easily
keybind = cmd+shift+comma=reload_config
```

**Open config:**

```bash
# Via CLI
ghostty +show-config --default --docs

# Or keyboard shortcut
Cmd+,  # opens settings GUI
```

---

## 🔧 Advanced Config

### Platform-Specific Config

Use optional includes:

```conf
# Main config
config-file = ?~/.config/ghostty/macos.conf
config-file = ?~/.config/ghostty/linux.conf
```

Prefix with `?` makes file optional.

### Version Control Setup

```bash
cd ~/.config
git init
git add ghostty/
git commit -m "Initial Ghostty config"
```

Treat config like code - experiment safely, revert if needed.

### Config Generator Tool

Visual config builder: [ghostty.zerebos.com](https://ghostty.zerebos.com/)

Features:

- Interactive settings
- Font playground
- Cursor/selection previews
- Color palette previews

---

## 📊 Comparison: Ghostty vs iTerm2

| Feature | Ghostty | iTerm2 |
|---------|---------|--------|
| **Speed** | 4x faster text render | Standard |
| **Memory** | ~100MB | ~220MB |
| **Rendering** | GPU (Metal) | CPU |
| **Config** | Text file | GUI + profiles |
| **Customization** | Good (hundreds of options) | Legendary (everything) |
| **Splits/Tabs** | Native platform UI | Custom implementation |
| **Scripting** | Limited | Extensive |
| **Maturity** | New (v1.0 in 2025) | Battle-tested (years) |
| **Philosophy** | Speed, correctness, clean | Max features, max control |

**Use Ghostty if:** Speed, native feel, clean config, GPU perf
**Use iTerm2 if:** Need max customization, scripting, tmux deep integration

---

## ⚠️ Known Limitations

- Cmd+F search still evolving (documented)
- No saved split layouts (yet) - requested feature
- No broadcast to all panes (yet) - in discussion
- Quick terminal doesn't support tabs on macOS
- Global keybinds macOS-only

---

## 🛠️ Installation

**macOS:**

```bash
brew install --cask ghostty
```

**Set as default terminal:**
System Settings → Default Terminal → Ghostty (or use Discussion #7762 for automation)

---

## 📚 Resources & Tools

**Official:**

- [Ghostty Docs](https://ghostty.org/docs)
- [Config Reference](https://ghostty.org/docs/config/reference)
- [Keybind Actions](https://ghostty.org/docs/config/keybind/reference)
- [GitHub](https://github.com/ghostty-org/ghostty)

**Community:**

- [Config Generator](https://ghostty.zerebos.com/)
- [Themes Collection](https://itsfoss.com/ghostty-themes/)
- [Migration Guide](https://www.vojtechstruhar.com/blog/040-switch-from-iterm2-to-ghostty-on-macos/)

**Config Examples:**

- [Mike Bommarito's Config](https://michaelbommarito.com/wiki/programming/tools/ghostty-configuration/)
- [Minimal Config](https://samuellawrentz.com/blog/minimal-ghostty-config/)
- [Complete Setup Guide](https://www.bitdoze.com/ghostty-terminal/)

---

## 🎯 Next Steps

- Try zero-config first (sensible defaults!)
- Add quick terminal hotkey
- Pick theme from built-ins
- Enable GPU acceleration
- Version control your config
- Customize keybinds for workflow

---

**Suggested location:** 3_Resources/Tools/
**Potential MOCs:** [[Development Tools]], [[Terminal Setup]], [[macOS Setup]]
**Tags:** #terminal #ghostty #performance #tools

## Sources

- [GitHub - ghostty-org/ghostty](https://github.com/ghostty-org/ghostty)
- [macOS Terminal Comparison: Warp vs. Ghostty vs. iTerm2](https://blog.apps.deals/2025-09-23-macos-terminal-comparison-warp-ghostty-default)
- [Compare Ghostty vs. iTerm2 - Terminal Trove](https://terminaltrove.com/compare/terminals/ghostty-vs-iterm2/)
- [Switch from iTerm2 to Ghostty on MacOS](https://www.vojtechstruhar.com/blog/040-switch-from-iterm2-to-ghostty-on-macos/)
- [My lil' Ghostty terminal config](https://birchtree.me/blog/my-lil-ghosty-terminal-config-2/)
- [Ghostty vs. iTerm2: The Future of Terminal Emulators?](https://medium.com/@eric_abell/ghostty-vs-iterm-2a5e3e526af9)
- [Ghostty Config Reference](https://ghostty.org/docs/config/reference)
- [Ghostty Configuration Guide](https://michaelbommarito.com/wiki/programming/tools/ghostty-configuration/)
- [Ghostty Keybindings](https://ghostty.org/docs/config/keybind)
- [Ghostty Features](https://ghostty.org/docs/features)
- [14 Themes for Beautifying Your Ghostty Terminal](https://itsfoss.com/ghostty-themes/)
- [Ghostty Config: Power Up Your Terminal](https://centlinux.com/ghostty-config/)
- [Mastering Ghostty GPU Performance](https://undercodetesting.com/mastering-ghostty-the-gpu-accelerated-terminal-for-modern-workflows/)
- [Ghostty Split Panes Discussion](https://github.com/ghostty-org/ghostty/discussions/2480)
- [Ghostty - Emacs-like Split Panes](https://themkat.net/2025/01/02/ghostty_config_first_impressions.html)
