#!/bin/bash
# Ghostty Setup Script for Claude Code Users

set -e

echo "🚀 Setting up Ghostty..."

# Install Ghostty
if ! command -v ghostty &> /dev/null; then
    echo "📦 Installing Ghostty via Homebrew..."
    brew install --cask ghostty
else
    echo "✅ Ghostty already installed"
fi

# Create config directory
CONFIG_DIR="$HOME/Library/Application Support/com.mitchellh.ghostty"
mkdir -p "$CONFIG_DIR"

# Backup existing config
if [ -f "$CONFIG_DIR/config" ]; then
    echo "💾 Backing up existing config..."
    cp "$CONFIG_DIR/config" "$CONFIG_DIR/config.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Copy config
echo "📝 Installing optimized config..."
cp ghostty-config.conf "$CONFIG_DIR/config"

# Init git for version control
if [ ! -d "$CONFIG_DIR/.git" ]; then
    echo "🔧 Setting up Git version control..."
    cd "$CONFIG_DIR"
    git init
    git add config
    git commit -m "Initial Ghostty config for Claude Code"
    echo "✅ Config now version controlled"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📖 Quick start:"
echo "  • Cmd+\` - Toggle quick terminal"
echo "  • Cmd+, - Open settings"
echo "  • Ctrl+X 2 - Split horizontal"
echo "  • Ctrl+X 3 - Split vertical"
echo "  • Cmd+Shift+, - Reload config"
echo ""
echo "🎨 Try different themes:"
echo "  ghostty +list-themes"
echo ""
echo "📂 Config location:"
echo "  $CONFIG_DIR/config"
echo ""
echo "📚 Full guide:"
echo "  ./ghostty-migration-guide.md"
