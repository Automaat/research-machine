# 🌐 Microsoft Edge Research

**Date:** 2025-12-06
**Tags:** #research #browser #productivity #tools
**Focus:** Features, configuration, extensions for software engineers

---

## 🚀 Key Features for Software Engineers

### 🤖 Built-in AI APIs (Developer Preview)

- **Phi-4-mini model** runs locally in browser
- **Prompt API** - Easy model prompting from web apps
- **Writing Assistance APIs** - Generate, summarize, edit text
- **Translator API** (coming soon) - Text translations
- 💡 **Why it matters:** Build AI features without remote servers/infrastructure costs

### 🛠️ DevTools Excellence

- **Full Chrome DevTools parity** (same Chromium engine)
- **Protocol Monitor** - Debug CDP messages (Edge 142+)
- **VS Code Integration** - Edit local files directly, live sync
- **Copilot Integration** - Explain source code in DevTools
- **Experimental Features** - Access via `edge://flags`
- 🔑 **Shortcuts:** F12 or Cmd+Option+I

### 📑 Tab Management (Best-in-Class)

| Feature | Benefit |
|---------|---------|
| **Vertical Tabs** | Side panel, better for many tabs |
| **Sleeping Tabs** | 32% less memory, 37% less CPU |
| **AI Tab Grouping** | Auto-organize by content |
| **Split Screen** | Two pages side-by-side in one tab |
| **Workspaces** | Separate contexts, real-time sync |

### 🔧 Developer Productivity

- **Collections** - Save websites, images, snippets per project
- **Install as App** - Pin docs/tools to dock
- **Immersive Reader** - Focus mode for documentation
- **Profile Switching** - Separate work/personal/client contexts

---

## ⚙️ Configuration Recommendations

### 🏴 Essential Flags (`edge://flags`)

```text
# Recommended flags to enable:
edge://flags/#edge-show-feature-recommendations → Disable (less noise)
edge://flags/#edge-autoplay-user-setting-block-option → Enable (block autoplay)
edge://flags/#edge-tab-groups-auto-create → Enable (AI grouping)
edge://flags/#edge-vertical-tabs → Enable (if not visible)
edge://flags/#smooth-scrolling → Enable (better UX)
edge://flags/#enable-reader-mode → Enable (reading mode)
```

### 🔐 Privacy Settings

```text
Settings > Privacy, Search, and Services:
├── Tracking Prevention → Strict
├── Send "Do Not Track" → On
├── Clear browsing data on close → Configure per need
└── Password Monitor → Enable (dark web scanning)
```

### ⌨️ Keyboard Shortcuts (macOS)

| Action | Shortcut |
|--------|----------|
| DevTools | `Cmd+Option+I` |
| Vertical Tabs Toggle | `Cmd+Shift+,` |
| Collections | `Cmd+Shift+Y` |
| Split Screen | Click icon in toolbar |
| Tab Search | `Cmd+Shift+A` |
| Reading Mode | `F9` |
| Install as App | `...` → Apps → Install |

### 🌙 Performance Tuning

```text
Settings > System and Performance:
├── Startup boost → Enable
├── Sleeping tabs → Enable (set to 5-15 min)
├── Efficiency mode → Enable when on battery
└── Hardware acceleration → Enable (usually)
```

---

## 📦 Extensions by Category

### 💻 Developer Essentials

| Extension | Purpose |
|-----------|---------|
| **[Octotree](https://microsoftedge.microsoft.com/addons/detail/octotree-github-code-tree/)** | GitHub code tree navigation |
| **[JSON Formatter](https://microsoftedge.microsoft.com/addons/detail/json-formatter/)** | Pretty-print JSON |
| **[Wappalyzer](https://microsoftedge.microsoft.com/addons/detail/wappalyzer/)** | Detect website tech stacks |
| **[React DevTools](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/)** | React debugging |
| **[Redux DevTools](https://microsoftedge.microsoft.com/addons/detail/redux-devtools/)** | State debugging |
| **[Window Resizer](https://microsoftedge.microsoft.com/addons/detail/window-resizer/)** | Responsive design testing |
| **[daily.dev](https://microsoftedge.microsoft.com/addons/detail/dailydev/)** | Dev news aggregator |

### 📝 Writing & Documentation

| Extension | Purpose |
|-----------|---------|
| **[Microsoft Editor](https://microsoftedge.microsoft.com/addons/detail/microsoft-editor/)** | Grammar/spelling (native) |
| **[LanguageTool](https://microsoftedge.microsoft.com/addons/detail/languagetool/)** | Multi-language proofreading |
| **[Text Blaze](https://microsoftedge.microsoft.com/addons/detail/text-blaze/)** | Text expansion/templates |
| **[Web Highlights](https://microsoftedge.microsoft.com/addons/detail/web-highlights/)** | Highlight & annotate pages |
| **[Scribe](https://microsoftedge.microsoft.com/addons/detail/scribe/)** | Auto-generate how-to guides |

### 🎯 Focus & Productivity

| Extension | Purpose |
|-----------|---------|
| **[Momentum](https://microsoftedge.microsoft.com/addons/detail/momentum/)** | Beautiful new tab + focus |
| **[Workona](https://microsoftedge.microsoft.com/addons/detail/workona/)** | Tab/project management |
| **[StayFocusd](https://microsoftedge.microsoft.com/addons/detail/stayfocusd/)** | Block distracting sites |
| **[Pomodoro Timer](https://microsoftedge.microsoft.com/addons/detail/pomodoro-timer/)** | Time-boxing |
| **[Todoist](https://microsoftedge.microsoft.com/addons/detail/todoist/)** | Task management |
| **[Noisli](https://chrome.google.com/webstore/detail/noisli/)** | Background noise generator |

### 🔒 Privacy & Security

| Extension | Purpose |
|-----------|---------|
| **[uBlock Origin](https://microsoftedge.microsoft.com/addons/detail/ublock-origin/)** | Ad/tracker blocker |
| **[Bitwarden](https://microsoftedge.microsoft.com/addons/detail/bitwarden/)** | Password manager |
| **[HTTPS Everywhere](https://microsoftedge.microsoft.com/addons/detail/https-everywhere/)** | Force HTTPS |
| **[Ghostery](https://microsoftedge.microsoft.com/addons/detail/ghostery/)** | Privacy tracker |

### 🎨 Design & Visual

| Extension | Purpose |
|-----------|---------|
| **[ColorZilla](https://microsoftedge.microsoft.com/addons/detail/colorzilla/)** | Color picker/eyedropper |
| **[Dark Reader](https://microsoftedge.microsoft.com/addons/detail/dark-reader/)** | Dark mode everywhere |
| **[GoFullPage](https://microsoftedge.microsoft.com/addons/detail/gofullpage/)** | Full page screenshots |
| **[Fonts Ninja](https://microsoftedge.microsoft.com/addons/detail/fonts-ninja/)** | Identify fonts on any site |

### 🎮 Fun & Unexpected

| Extension | What Makes It Special |
|-----------|----------------------|
| **[Animal Crossing Typing Sounds](https://chrome.google.com/webstore/detail/animal-crossing/)** | 🎵 Plays AC sounds when typing |
| **[Virtual Cats](https://chrome.google.com/webstore/detail/virtual-cats/)** | 🐱 Cats chase your cursor |
| **[Laser Cat](https://chrome.google.com/webstore/detail/laser-cat/)** | 😼 Harmless laser chaos |
| **[Sweezy YouTube Progress Bar](https://chrome.google.com/webstore/detail/sweezy/)** | 🌈 Funky progress bar animations |
| **[Custom Cursors](https://microsoftedge.microsoft.com/addons/detail/custom-cursors/)** | ✨ Personalize mouse pointer |
| **[T-Rex Runner](https://chrome.google.com/webstore/detail/t-rex/)** | 🦖 Chrome dino game anytime |
| **[1000 Mines](https://chrome.google.com/webstore/detail/1000-mines/)** | 💣 Strategic Minesweeper variant |
| **[Arcade Classics](https://chrome.google.com/webstore/detail/arcade-classics/)** | 👾 Tetris, Pac-Man, Pong in browser |
| **[AI Theme Generator](https://microsoftedge.microsoft.com/addons/detail/ai-theme-generator/)** | 🎨 Generate custom browser themes |
| **[Beyond20](https://chrome.google.com/webstore/detail/beyond20/)** | 🎲 D&D dice rolls in browser |

---

## 🔗 Integration with Your Ecosystem

### 🚀 Raycast Integration

```bash
# Install Raycast Edge extension
# Enables: Quick tab search, history, bookmarks

# Create quicklinks for frequent Edge actions:
# - Open specific Collections
# - Jump to DevTools on current page
# - Open edge://flags
# - Open specific profiles
```

**Workflows:**

- `edge collections` → Quick access to saved research
- `edge dev` → Open DevTools on active tab
- Edge window management via Raycast's built-in feature

### 📓 Obsidian Integration

**Capture → Process → Connect:**

1. **Web Highlights** extension → Annotate articles
2. **Collections** → Stage content before processing
3. **Markdownify** (or copy as markdown) → Import to vault
4. **Edge + CleanShot X** → Annotated screenshots into notes

**Workflow Pattern:**

```text
Edge Collection (research topic)
    → Export/copy content
    → Obsidian Inbox (0_Inbox/)
    → Process to 3_Resources/[domain]/
    → Connect via [[wikilinks]]
```

### 🤖 Claude Code Synergy

- **Edge DevTools + Claude Code** - Debug web apps while Claude helps
- **Edge Collections** - Save reference docs per project
- **Reading Mode** - Focus on documentation
- **Split Screen** - Docs on one side, app on other

### 👻 Ghostty Pairing

- Both are modern, Rust/performance-focused tools
- Edge's DevTools Protocol works with headless automation
- Use Edge for web testing alongside Ghostty terminal

### 📊 Profile Strategy

```text
Profiles to create:
├── 🏠 Personal (default)
├── 💼 Work (Kong)
├── 🔬 Research (no distractions, strict privacy)
└── 🧪 Dev/Testing (experimental flags enabled)
```

---

## 💡 Pro Tips

### 🏃 Quick Wins

1. **Sleeping tabs** alone saves significant battery
2. **Vertical tabs** transform multi-tab workflows
3. **Collections** beat bookmarks for project research
4. **Split screen** for docs + app development

### ⚡ Power User Features

- `edge://about` - All internal pages
- `edge://net-internals` - Network debugging
- `edge://tracing` - Performance tracing
- `edge://gpu` - Graphics debugging
- `edge://media-internals` - Media debugging

### 🔄 Chrome Extension Compatibility

- Edge uses Chromium = Chrome extensions work
- Install from Chrome Web Store directly
- Some extensions may need "Allow from other stores" enabled

---

## 📚 Sources

### Features & Productivity

- [Microsoft Edge Build 2025 Innovations](https://blogs.windows.com/msedgedev/2025/05/19/empowering-developers-and-organizations-microsoft-edge-innovations-at-build/)
- [Edge Features & Tips](https://www.microsoft.com/en-us/edge/features)
- [Edge for Business AI Browser](https://blogs.windows.com/msedgedev/2025/11/18/edge-for-business-presents-the-worlds-first-secure-enterprise-ai-browser/)

### Hidden Features

- [10 Hidden Edge Features](https://www.webnots.com/10-hidden-microsoft-edge-features-that-will-change-the-way-you-browse/)
- [Edge Tab Tricks](https://www.xda-developers.com/microsoft-edge-tab-tricks-windows-power-users/)
- [Edge Flags Guide](https://windowsforum.com/threads/exploring-edge-flags-unlock-experimental-features-in-microsoft-edge.360646/)

### DevTools

- [Edge DevTools Overview](https://learn.microsoft.com/en-us/microsoft-edge/devtools/overview)
- [DevTools Experimental Features](https://learn.microsoft.com/en-us/microsoft-edge/devtools/experimental-features/)
- [JavaScript Debugging](https://learn.microsoft.com/en-us/microsoft-edge/devtools/javascript/reference)

### Extensions

- [40 Best Edge Extensions](https://everhour.com/blog/microsoft-edge-extensions/)
- [Edge Extensions for Developers](https://daily.dev/blog/edge-browser-extension-essentials-for-developers)
- [Fun Chrome Extensions 2025](https://chrome-stats.com/blog/best-of/fun)

---

## 🎯 Recommended Setup Order

1. ⚙️ Configure privacy settings (Strict tracking prevention)
2. 🏴 Enable essential flags (autoplay block, AI tab groups)
3. 📊 Create work/personal profiles
4. 📑 Enable vertical tabs
5. 💤 Configure sleeping tabs (5-15 min)
6. 📦 Install core extensions:
   - uBlock Origin (privacy)
   - Octotree (GitHub)
   - Dark Reader (eyes)
   - JSON Formatter (dev)
7. 🎮 Add one fun extension (typing sounds? cats?)
8. 🔗 Set up Raycast integration

---

**Suggested Obsidian location:** 3_Resources/Tools/
**Potential MOCs:** [[Tools MOC]], [[Productivity MOC]]
**Tags:** #browser #edge #productivity #dev-tools
