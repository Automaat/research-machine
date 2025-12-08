# 🚀 Raycast Workflow Optimization: Developer + Photography Edition

**Date:** 2025-12-06
**Tags:** #productivity #raycast #developer #photography #automation
**Focus:** Moving beyond basic Spotlight replacement for dev + creative workflows

---

## 🎯 Quick Wins (Start Here)

### Free Built-in Features

**📋 Clipboard History**

- Unlimited retention (vs Spotlight's 8hrs)
- Never lose copied content again
- Access with ⌘+Shift+C (customizable)
- Search through clipboard history

**🪟 Window Management**

- Built-in window snapping (replace Rectangle/Magnet)
- Type `lh` = left half, `rh` = right half, `max` = maximize
- No need for third-party window managers
- Custom layouts via script commands

**✂️ Snippets**

- Text expansion: `;email` → <your@email.com>
- Dynamic placeholders: `{date}`, `{clipboard}`, `{cursor}`
- Examples for devs:
  - `;bug` → bug report template with date/project
  - `;pr` → PR description template
  - `;sign` → email signature
- Photography: `;copy` → copyright notice, `;meta` → metadata template

**🔗 Quicklinks**

- Custom shortcuts to anything (URLs, files, deep links)
- Variable placeholders for searches
- Examples:
  - `gh` → open GitHub dashboard
  - `code projectname` → open project in VS Code
  - `photos` → open specific Lightroom catalog
  - `goog {query}` → Google search with query

---

## 👨‍💻 Developer Workflow Essentials

### 🔧 Must-Have Extensions

**GitHub Integration** ([GitHub Extension](https://www.raycast.com/raycast/github))

- Manage PRs, issues, workflows without browser
- Search repos, check CI status
- **NEW 2025:** GitHub Copilot integration - start/track coding tasks from Raycast
- Review PRs, merge, comment inline

**VS Code**

- Quick project switching
- Install extensions from marketplace
- Access Command Palette commands
- Open recent files/folders

**Homebrew**

- Search & install packages via GUI
- Update all packages
- Manage services

**Git Commands**

- Custom git script commands
- Quick status, diff, log from anywhere
- Commit templates via snippets

### ⚡ Automation Examples for Devs

**Script Commands** ([GitHub](https://github.com/raycast/script-commands))

- Bash/Python/Node scripts triggered from launcher
- No terminal needed for frequent tasks
- Community library: 300+ ready-made scripts

**Example automations:**

- `dev-setup` → Open VS Code + browser + terminal in specific layout
- `git-clean` → Clean branches, pull latest, prune
- `test-watch` → Run tests in watch mode
- `deploy-staging` → Deploy to staging with one keystroke

**Quicklink Examples:**

- `jira {query}` → Search JIRA
- `localhost:3000` → Open local dev server
- `docs react` → React docs search
- `npm {package}` → NPM package search

---

## 📸 Photography Workflow

### 🎨 Creative Tools

**Imageflow Extension** ([Imageflow](https://www.raycast.com/Godruoyi/image-flow))

- Batch image optimization
- Workflow processing for files
- Quick format conversions

**File Management**

- Lightning-fast file search (faster than Finder)
- Recent files access
- Path copying/opening in Terminal

**Design Tools Category**

- Figma integration
- Color picker & management
- Icon libraries
- Screen recording tools

### 📁 File Organization Tips

**Quicklinks for photos:**

- `lr2025` → Current year Lightroom catalog
- `raw` → RAW storage folder
- `export` → Export destination
- `backup` → Backup drive

**Snippets for metadata:**

- `;copy` → © 2025 Your Name. All rights reserved.
- `;gear` → Camera/lens metadata template
- `;location` → Location tagging template

---

## 🤖 AI Features (Raycast Pro - $8/mo)

### Models Available

- **Claude 3.7 Sonnet** (recommended for coding)
- **GPT-4o** (general purpose)
- **Perplexity** (research with sources)
- **o3-mini** (fast reasoning)
- **Mixtral, Llama 3** (alternatives)

### 💡 AI Use Cases

**Quick AI (Floating Window)**

- Hotkey → instant AI chat overlay
- Works over any app
- Selected text → AI processing
- Results → insert or copy

**AI Commands (30+ built-in)**

- "Fix grammar" on selected text
- "Explain code" for complex functions
- "Generate commit message" from git diff
- "Summarize" articles/docs
- Create custom commands for your workflow

**Photography AI uses:**

- Generate image descriptions/alt text
- Write captions for social media
- Create batch rename patterns
- Generate metadata keywords

**Developer AI uses:**

- Code explanation/documentation
- Bug analysis from error logs
- Refactoring suggestions
- Write tests for functions
- Generate regex patterns

### 💰 Cost Comparison

- Individual subscriptions: ChatGPT Plus ($20) + Claude Pro ($20) = $40/mo
- Raycast Pro: $8/mo (all models included)
- **Savings: ~80%** vs individual subs

### 🔒 Privacy Option

- Use local LLM via Ollama (free)
- Full data privacy, no cloud
- Works with Raycast AI features
- Slightly slower but completely offline

---

## 🎓 Getting Started Roadmap

### Week 1: Foundations

1. **Replace Spotlight shortcut** (⌘+Space → Raycast)
   - Disable Spotlight: System Settings → Keyboard → Shortcuts
   - Set Raycast to ⌘+Space
2. **Learn core features:**
   - Launch apps by typing
   - File search (type filename)
   - Calculator (just type math)
   - Clipboard history (⌘+Shift+C)
3. **Add 3 snippets** you use daily
4. **Create 3 quicklinks** to frequent destinations

### Week 2: Essential Extensions

1. Install core extensions:
   - GitHub (if you use it)
   - VS Code
   - Window Management
   - Google Calendar
2. **Disable unused commands** (Settings → Extensions)
   - Reduces clutter in search
   - Faster results
3. **Set custom hotkeys** for top 5 commands
   - Example: ⌘+⌥+G → GitHub Notifications

### Week 3: Automation

1. **Browse script commands** ([GitHub](https://github.com/raycast/script-commands))
   - Install 2-3 community scripts
   - Modify one for your needs
2. **Create first script command:**
   - Use "Create Script Command" in Raycast
   - Start simple (e.g., open project folders)
3. **Advanced quicklinks** with variables
   - Search shortcuts for Google/GitHub/docs

### Week 4: AI Exploration (Optional)

1. **Trial Raycast Pro** (if interested in AI)
   - 30-day trial available
   - Test Claude for code review
   - Try Quick AI for writing tasks
2. **OR set up local LLM:**
   - Install Ollama
   - Configure Raycast to use local models
   - Privacy + free forever

---

## 🏆 Advanced Power User Tips

### Hyper Key Setup

- Raycast supports "hyper key" (⌘+⌥+⌃+⇧ all at once)
- Use Karabiner to remap Caps Lock → Hyper
- Dedicate hyper+key combos to Raycast commands
- No conflicts with app shortcuts

### Window Layout Automation

**Multi-monitor dev setup:**

```bash
# Script command: coding-layout
#!/bin/bash
# Opens VS Code left, Chrome right, Terminal bottom
# Save as script command for instant workspace
```

**Photo editing layout:**

```bash
# Script command: photo-edit
# Opens Lightroom, Photoshop, Finder in preset positions
```

### Context-Aware Snippets

- Use `{clipboard}` placeholder for dynamic content
- Example: `;jira` → `[{clipboard}](https://jira.company.com/{clipboard})`
- Copy ticket number → type `;jira` → instant markdown link

### Extension Combinations

- **Linear + GitHub** → Link issues to PRs from launcher
- **Todoist + Calendar** → Add tasks with due dates
- **Slack + Notion** → Save messages to notes

---

## 📦 Recommended Extension List

### Core (Everyone)

- ✅ Clipboard History (built-in)
- ✅ Window Management (built-in)
- ✅ Calculator (built-in)
- ✅ Snippets (built-in)
- ✅ Quicklinks (built-in)

### Developer

- 🔧 GitHub
- 🔧 VS Code
- 🔧 Homebrew
- 🔧 Kill Process
- 🔧 Speed Test
- 🔧 Google Translate (for docs)

### Photography/Creative

- 🎨 Imageflow
- 🎨 Color Picker
- 🎨 Figma (if you design)
- 🎨 Screen Recording

### Productivity (Optional)

- 📅 Google Calendar
- ✔️ Todoist
- 📝 Notion
- 💬 Slack
- 🌐 Browser bookmarks

### AI (Pro Only)

- 🤖 Quick AI
- 🤖 AI Commands
- 🤖 Web Search (AI with sources)

---

## 🚨 Common Pitfalls to Avoid

❌ **Installing too many extensions at once**

- Start with 5-7 essential ones
- Add gradually as needs emerge
- Disable unused commands to reduce noise

❌ **Not disabling unused commands**

- Each extension has multiple commands
- Disable what you won't use (Settings → Extensions)
- Keeps search results clean

❌ **Ignoring custom hotkeys**

- Most powerful feature for speed
- Assign hotkeys to top 5-10 commands
- Muscle memory = massive time savings

❌ **Complex script commands too early**

- Start with simple ones
- Use community scripts first
- Build complexity gradually

---

## 💡 Workflow Ideas: Dev + Photo Combo

### Morning Routine Script

```bash
#!/bin/bash
# Opens: Email, Calendar, GitHub, Todoist, Slack
# Sets window layout for productivity
# Checks for system updates
```

### Context Switching

**Dev mode:**

- Hotkey → Opens VS Code, terminal, browser, docs
- Quicklink: `dev {project}` → CD to project + open in code

**Photo mode:**

- Hotkey → Opens Lightroom, Photoshop, Finder
- Quicklink: `shoot {date}` → Opens specific shoot folder

### Export Automation

**Photo export snippet:**

```text
;export
📸 Exported from Lightroom
Camera: Sony A7IV
Lens: 24-70mm f/2.8
Date: {date}
© 2025 Your Name
```

### Cross-Workflow Tools

- **AI for both:** Code docs + image captions
- **Clipboard:** Code snippets ↔ file paths ↔ metadata
- **Quicklinks:** Project folders for code + photo projects
- **Snippets:** Copyright for code (license) + photos

---

## 🔗 Essential Resources

**Official:**

- [Raycast Store](https://www.raycast.com/store) - Browse 1900+ extensions
- [Script Commands Repo](https://github.com/raycast/script-commands) - Community automation
- [Raycast Manual](https://manual.raycast.com) - Full documentation
- [Developers API](https://developers.raycast.com) - Build extensions

**Community:**

- [Awesome Raycast](https://github.com/j3lte/awesome-raycast) - Curated list
- [Extension Examples](https://github.com/raycast/extensions) - Official examples

**Learning:**

- [Getting Started with Script Commands](https://www.raycast.com/blog/getting-started-with-script-commands)
- [Mastering Raycast for Developers](https://www.git-tower.com/blog/mastering-raycast)

---

## 🎯 Quick Action Plan

**Today:**

1. Replace Spotlight with Raycast (⌘+Space)
2. Enable Clipboard History
3. Try window management (type `lh`, `rh`, `max`)

**This Week:**

1. Install GitHub + VS Code extensions
2. Create 3 personal snippets
3. Add 3 quicklinks you'll use daily

**This Month:**

1. Explore 5+ extensions from store
2. Try 1-2 script commands
3. Consider Raycast Pro trial for AI

**Long-term:**

1. Build custom script commands for your workflow
2. Create window layout automations
3. Master AI commands for coding + creative work

---

## 🤔 Next Steps & Considerations

**Questions to explore:**

- Which specific dev tools/services to integrate? (Jira, Linear, Figma?)
- Photo management: Lightroom Classic or CC?
- Team collaboration: Worth exploring Raycast Teams?
- Local LLM vs cloud: Privacy vs convenience trade-off?

**Potential deep dives:**

- Custom script commands for photo batch processing
- Git workflow automation via Raycast
- AI-powered commit message generation
- Image metadata extraction automation

---

## Sources

- [Raycast Official](https://www.raycast.com/)
- [Raycast AI Features](https://www.raycast.com/core-features/ai)
- [Raycast Tips & Tricks](https://whatpulse.org/blog/2025-01-24-raycast-tips-and-tricks)
- [4 Ways Raycast Is Better Than Spotlight](https://www.makeuseof.com/ways-raycast-is-better-than-spotlight-on-mac/)
- [Raycast Store](https://www.raycast.com/store)
- [GitHub Extension](https://www.raycast.com/raycast/github)
- [Mastering Raycast for Developers](https://www.git-tower.com/blog/mastering-raycast)
- [Script Commands Getting Started](https://www.raycast.com/blog/getting-started-with-script-commands)
- [Script Commands GitHub](https://github.com/raycast/script-commands)
- [Imageflow Extension](https://www.raycast.com/Godruoyi/image-flow)
- [Raycast AI Models](https://www.raycast.com/blog/more-ai-models)
- [Essential Extensions Guide](https://medium.com/@bhanu1776/raycasts-top-extensions-for-mac-power-users-31008579b2bd)
- [Quicklinks Documentation](https://manual.raycast.com/quicklinks)
- [Raycast vs Spotlight 2025](https://www.drbuho.com/review/macos-tahoe-spotlight-vs-raycast)
- [GitHub Copilot Integration](https://github.blog/changelog/2025-08-28-start-and-track-copilot-coding-agent-tasks-from-raycast/)
