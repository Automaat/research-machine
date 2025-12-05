# 👻 Ghostty Terminal Setup

Comprehensive research & config for migrating from iTerm to Ghostty, optimized for Claude Code usage.

## 📁 Files

- **[ghostty-migration-guide.md](ghostty-migration-guide.md)** - Full research, features, comparisons
- **[ghostty-config-fixed.conf](ghostty-config-fixed.conf)** - ✅ **VALIDATED** config (use this!)
- **[ghostty-config-starter.conf](ghostty-config-starter.conf)** - ⚠️ Has invalid options, use fixed version
- **[setup.sh](setup.sh)** - Automated setup script

## ⚡ Quick Setup

```bash
cd findings/ghostty-terminal
./setup.sh
```

## 🎯 Key Features for Claude Code

1. **Quick Terminal** - `Cmd+\`` dropdown access
2. **Large Scrollback** - 50k lines for long AI output
3. **GPU Acceleration** - Smooth during heavy generation
4. **Smart Splits** - Emacs/Vim style navigation
5. **Paste Protection** - Safe for AI-generated commands
6. **Version Controlled** - Git track your config changes

## 🔧 Manual Setup

```bash
# Copy config
cp ghostty-config-starter.conf ~/Library/Application\ Support/com.mitchellh.ghostty/config

# Or edit directly
open ~/Library/Application\ Support/com.mitchellh.ghostty/config
```

## 📖 Learn More

Read [ghostty-migration-guide.md](ghostty-migration-guide.md) for:

- Performance benchmarks
- All features explained
- Advanced configurations
- Troubleshooting
- Community resources
