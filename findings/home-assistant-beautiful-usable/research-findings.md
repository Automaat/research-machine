# 🏠 Making Home Assistant Beautiful & Highly Usable

**Date:** 2025-12-27
**Tags:** #research #home-assistant #smart-home #ui-design
**Focus:** Dashboard customization, themes, custom cards, and usability best practices

---

## 📄 Source Processing

### Source 1: [Home Assistant Blog - Dashboard Chapter 1](https://www.home-assistant.io/blog/2024/03/04/dashboard-chapter-1/)

**Type:** Official documentation | **Bias:** None (first-party)

**Key Claims (verbatim quotes):**

1. "even a difference in height of 1 pixel would mean a card one would guess to be displayed on the leftmost column getting shifted all the way to the right" → Supports: Why traditional Masonry layout failed
2. "The relative positions of the cards within a section are not affected by changes in screen sizes, and so the spatial memory of the cards are retained" → Supports: Sections view benefit
3. "a UI designed with a structured layout...brings order to a page" → Supports: Grid system value
4. "as easy and intuitive as possible" + "a default dashboard that will be more useful, user-friendly, and relevant right out of the box" → Supports: Project Grace goals

---

### Source 2: [Home Assistant Blog - Dashboard Chapter 2](https://www.home-assistant.io/blog/2024/07/26/dashboard-chapter-2/)

**Type:** Official documentation | **Bias:** None (first-party)

**Key Claims (verbatim quotes):**

1. "Each card used for controls should have a clear primary action" → Supports: Usability guideline
2. "Everything that is designed to invite users to interact with should look clickable" → Supports: Visual affordance principle
3. "Features get better results than icon buttons" → Supports: UI design decision
4. Grid dimensions: "Row height reduced from 66px to 56px, Icon size decreased from 40px to 36px" → Supports: Technical specifications

---

### Source 3: [SmartHomeScene - Mushroom Cards Guide](https://smarthomescene.com/guides/mushroom-cards-complete-guide-to-a-clean-minimalistic-home-assistant-ui/)

**Type:** Tutorial/guide | **Bias:** Promotional tone, generally accurate

**Key Claims (verbatim quotes):**

1. "Independent: No need to install more cards" → Supports: Self-contained nature
2. "Each card has its own built-in UI editor, almost all of their features are configurable" → Supports: Ease of use
3. Available cards: Title, Chips, Alarm, Light, Person, Entity, Template, Cover, Fan → Supports: Feature set

---

### Source 4: [Graphite Theme GitHub](https://github.com/TilmanGriesel/graphite)

**Type:** Official repository | **Bias:** None (first-party documentation)

**Key Claims (verbatim quotes):**

1. "a modern theme that offers a soothing dark mode alongside a bright, clean light mode" → Supports: Design philosophy
2. "native device fonts" + "unified design language across all Home Assistant interfaces" → Supports: Consistency approach
3. "Graphite also offers two themes designed specifically for E-Ink displays: Graphite E-Ink Light and Graphite E-Ink Dark" → Supports: Specialized variants
4. "an experience that's both user-friendly and aesthetically pleasing, without needing extra complexity or plugins" → Supports: Design goal

---

### Source 5: [UI-Lovelace-Minimalist Wiki](https://ui-lovelace-minimalist.github.io/UI/)

**Type:** Official documentation | **Bias:** None (first-party)

**Key Claims (verbatim quotes):**

1. Uses "theme specific techniques, but uses so much more" with "button-card made by RomRaider" → Supports: Technical foundation
2. "26+ card types including Battery, Light, Thermostat, Weather, Media Player" → Supports: Component availability
3. "80+ community-contributed cards" → Supports: Extensibility
4. Four themes: "minimalist-desktop, minimalist-ios-tapbar, minimalist-mobile" → Supports: Multi-device optimization

---

### Source 6: [HaCasa Community Forum](https://community.home-assistant.io/t/hacasa-a-new-modern-dashboard/744334)

**Type:** Community post | **Bias:** Creator-authored, promotional

**Key Claims (verbatim quotes):**

1. "modern, minimalistic dashboard for Home Assistant" → Supports: Design goal
2. SOAP concept: "Significant Other Acceptance Parameters" → Supports: Household-friendly design
3. "a complete set of card designs" built on "Button-card by RomRaider" → Supports: Technical implementation

---

### Source 7: [SmartHomeScene - Best Themes 2025](https://smarthomescene.com/blog/best-home-assistant-dashboard-themes-in-2023/)

**Type:** Curated list | **Bias:** Editorial selection, generally comprehensive

**Key Claims (verbatim quotes):**

1. Catppuccin: "Community-driven pastel collection featuring four distinctive flavors: Latte, Frappé, Macchiato, and Mocha" → Supports: Theme variety
2. visionOS: "Beautiful and simple theme inspired by Apple's visionOS, adapted for Home Assistant with automatic dark mode support" → Supports: Apple-inspired aesthetic
3. Material Rounded: "Inspired by the Google Home app and Material Design 3" → Supports: Google design language
4. macOS: "Based on the macOS Monterey system-wide light and dark mode interface" → Supports: Cross-platform aesthetics

---

### Source 8: [Bubble Card GitHub](https://github.com/Clooos/Bubble-Card)

**Type:** Official repository | **Bias:** None (first-party)

**Key Claims (verbatim quotes):**

1. "minimalist and customizable card collection for Home Assistant with a nice pop-up touch" → Supports: Core purpose
2. "Modules are a powerful feature that allows you to save, reuse, and share your custom styles and templates across all of your Bubble Cards" → Supports: Reusability system
3. "fully featured and integrated editor, so toying with YAML isn't needed" → Supports: User-friendliness

---

### Source 9: [Newerest - Lovelace Dashboard Design](https://newerest.space/home-assistant-lovelace-dashboard-design/)

**Type:** Tutorial/guide | **Bias:** General best practices compilation

**Key Claims (verbatim quotes):**

1. "Place cards for related entities or functions together" → Supports: Organization principle
2. "Place the most frequently accessed or critical information/controls near the top or in prominent positions within views" → Supports: Hierarchy principle
3. "Use the Conditional card to hide information or controls that are not relevant at a particular time" → Supports: Clean interface technique
4. "Community custom cards offer powerful functionality but risk performance impacts and compatibility issues after updates. Use judiciously" → Supports: Custom card warning

---

## 🔗 Chain-of-Thought Synthesis

### 1. Use Native Sections View (2024+)

**Claim:** The new Sections view is the recommended foundation for beautiful dashboards
**Evidence:**

- [Source 1, Quote: "The relative positions of the cards within a section are not affected by changes in screen sizes, and so the spatial memory of the cards are retained"]
- [Source 1, Quote: "a UI designed with a structured layout...brings order to a page"]
**Confidence:** High
**Reasoning:** Official HA team designed this to replace problematic Masonry layout → Maintains spatial memory → Users find things where they expect them

---

### 2. Choose One Primary Card System

**Claim:** Pick either Mushroom Cards, Bubble Card, or UI-Lovelace-Minimalist - don't mix extensively
**Evidence:**

- [Source 3, Quote: "Independent: No need to install more cards"]
- [Source 9, Quote: "Community custom cards offer powerful functionality but risk performance impacts and compatibility issues after updates"]
**Confidence:** High
**Reasoning:** Each system is self-contained → Mixing increases complexity and update risk → Consistency aids usability

**Options Comparison:**

| System | Best For | Learning Curve | Quote/Evidence |
|--------|----------|----------------|----------------|
| Mushroom | Beginners, clean look | Low | "Each card has its own built-in UI editor" [Source 3] |
| Bubble Card | Pop-up heavy, mobile-first | Medium | "minimalist and customizable...with a nice pop-up touch" [Source 8] |
| UI-Lovelace-Minimalist | Maximum customization | High | "80+ community-contributed cards" [Source 5] |

---

### 3. Apply Design Principles from Project Grace

**Claim:** Follow official usability guidelines for card design
**Evidence:**

- [Source 2, Quote: "Each card used for controls should have a clear primary action"]
- [Source 2, Quote: "Everything that is designed to invite users to interact with should look clickable"]
- [Source 2, Quote: "Features get better results than icon buttons"]
**Confidence:** High
**Reasoning:** Official HA team tested these principles → Community cards following them have better adoption

---

### 4. Select a Cohesive Theme

**Claim:** Theme choice significantly impacts visual cohesion
**Evidence:**

- [Source 4, Quote: "unified design language across all Home Assistant interfaces, from the admin panel to code editors"]
- [Source 7, Multiple themes with distinct philosophies documented]
**Confidence:** High
**Reasoning:** Theme applies globally → Consistent colors/fonts across all interfaces → Professional appearance

**Top Theme Recommendations:**

| Theme | Style | Quote/Evidence |
|-------|-------|----------------|
| Graphite | Calm, minimal | "soothing dark mode alongside a bright, clean light mode" [Source 4] |
| Catppuccin | Pastel, soft | "four distinctive flavors: Latte, Frappé, Macchiato, and Mocha" [Source 7] |
| visionOS | Apple-inspired | "Beautiful and simple theme inspired by Apple's visionOS" [Source 7] |
| Material Rounded | Google-style | "Inspired by the Google Home app and Material Design 3" [Source 7] |

---

### 5. Organize by Function or Room

**Claim:** Logical organization improves usability
**Evidence:**

- [Source 9, Quote: "Place cards for related entities or functions together"]
- [Source 9, Quote: "Place the most frequently accessed or critical information/controls near the top or in prominent positions within views"]
**Confidence:** High
**Reasoning:** Related items together → Faster finding → Less cognitive load

---

### 6. Use Conditional Visibility

**Claim:** Hide irrelevant controls for cleaner interface
**Evidence:**

- [Source 9, Quote: "Use the Conditional card to hide information or controls that are not relevant at a particular time"]
**Confidence:** High
**Reasoning:** Less clutter → Easier scanning → More beautiful appearance

---

### 7. Consider Household Members (SOAP)

**Claim:** Dashboard must work for all users, not just the technical person
**Evidence:**

- [Source 6, Quote: "Significant Other Acceptance Parameters"]
- [Source 1, Quote: "a default dashboard that will be more useful, user-friendly, and relevant right out of the box"]
**Confidence:** High
**Reasoning:** Non-technical users abandon confusing interfaces → Simple = higher adoption

---

## ✅ Verification Table

| Finding | Source Quote | Exact Match? | Adjustment |
|---------|--------------|--------------|------------|
| Sections view retains spatial memory | "relative positions...not affected by changes in screen sizes" [S1] | Yes | None |
| Clear primary actions needed | "Each card used for controls should have a clear primary action" [S2] | Yes | None |
| Mushroom has built-in editors | "Each card has its own built-in UI editor" [S3] | Yes | None |
| Graphite uses native fonts | "native device fonts" [S4] | Yes | None |
| UI-Minimalist has 26+ cards | "26+ card types" [S5] | Yes | None |
| Bubble Card has module system | "Modules...save, reuse, and share your custom styles" [S8] | Yes | None |
| Custom cards can impact performance | "risk performance impacts and compatibility issues" [S9] | Yes | None |

---

## 📋 Summary with Citations

### Foundation Setup [Source: 1, 2]

- **Use Sections View** - Retains "spatial memory" across devices [Source 1]
- **Follow Grid System** - Row height 56px, icon size 36px, 8px gutters [Source 2]
- **Enable Drag-and-Drop** - Native feature, no plugins needed [Source 1]

### Theme Selection [Source: 4, 7]

Install via HACS, top recommendations:

- **Graphite** - "soothing dark mode alongside a bright, clean light mode" [Source 4]
- **Catppuccin** - Four pastel flavors (Latte, Frappé, Macchiato, Mocha) [Source 7]
- **visionOS** - Apple-inspired with "automatic dark mode support" [Source 7]
- **Material Rounded** - Google Material Design 3 inspired [Source 7]

### Custom Card System [Source: 3, 5, 8]

Choose ONE primary system:

- **Mushroom Cards** - Best for beginners, "built-in UI editor" [Source 3]
- **Bubble Card** - Pop-up focused, "minimalist and customizable" with module system [Source 8]
- **UI-Lovelace-Minimalist** - Power users, "26+ card types" + "80+ community cards" [Source 5]

### Design Principles [Source: 2, 9]

- "Each card...should have a clear primary action" [Source 2]
- "Everything...designed to invite users to interact with should look clickable" [Source 2]
- "Features get better results than icon buttons" [Source 2]
- "Place the most frequently accessed...information near the top" [Source 9]

### Organization [Source: 6, 9]

- Group by room OR function [Source 9]
- Use conditional visibility to reduce clutter [Source 9]
- Consider "Significant Other Acceptance Parameters" (SOAP) [Source 6]

---

## ❓ What Sources DON'T Cover

- **Specific performance benchmarks** - No quantitative data on dashboard loading times
- **Accessibility standards** - Limited coverage of WCAG compliance or screen reader support
- **Multi-user permission systems** - How to create different dashboards for different household roles
- **Tablet vs phone optimization** - General responsiveness mentioned but no specific breakpoints
- **Animation/transition effects** - No detailed guidance on motion design
- **Color contrast ratios** - Theme aesthetics discussed but not accessibility color science

---

## 🔧 Actionable Implementation Checklist

### Phase 1: Foundation

- [ ] Update Home Assistant to 2024.3+ for Sections view
- [ ] Enable Sections view in dashboard settings
- [ ] Configure `configuration.yaml` for themes: `frontend: themes: !include_dir_merge_named themes`

### Phase 2: Theme

- [ ] Install HACS (Home Assistant Community Store)
- [ ] Install chosen theme (Graphite, Catppuccin, or visionOS recommended)
- [ ] Apply theme in Profile > Theme settings
- [ ] Optional: Install `card-mod` for advanced theme features

### Phase 3: Custom Cards

- [ ] Choose ONE primary card system (Mushroom recommended for beginners)
- [ ] Install via HACS Frontend section
- [ ] Create test section with 2-3 cards
- [ ] Evaluate before scaling to full dashboard

### Phase 4: Organization

- [ ] Plan views by room OR function (pick one pattern)
- [ ] Place most-used controls at top
- [ ] Group related entities in same section
- [ ] Add conditional cards to hide irrelevant controls

### Phase 5: Polish

- [ ] Test on all household devices (phone, tablet, desktop)
- [ ] Get feedback from non-technical household members
- [ ] Simplify based on SOAP feedback
- [ ] Document any custom YAML for backup

---

## 📚 Sources

1. [Home Assistant Blog - Dashboard Chapter 1](https://www.home-assistant.io/blog/2024/03/04/dashboard-chapter-1/)
2. [Home Assistant Blog - Dashboard Chapter 2](https://www.home-assistant.io/blog/2024/07/26/dashboard-chapter-2/)
3. [SmartHomeScene - Mushroom Cards Guide](https://smarthomescene.com/guides/mushroom-cards-complete-guide-to-a-clean-minimalistic-home-assistant-ui/)
4. [Graphite Theme GitHub](https://github.com/TilmanGriesel/graphite)
5. [UI-Lovelace-Minimalist Wiki](https://ui-lovelace-minimalist.github.io/UI/)
6. [HaCasa Community Forum](https://community.home-assistant.io/t/hacasa-a-new-modern-dashboard/744334)
7. [SmartHomeScene - Best Themes 2025](https://smarthomescene.com/blog/best-home-assistant-dashboard-themes-in-2023/)
8. [Bubble Card GitHub](https://github.com/Clooos/Bubble-Card)
9. [Newerest - Lovelace Dashboard Design](https://newerest.space/home-assistant-lovelace-dashboard-design/)

---

## 🔗 Connections

[[Home Automation]], [[Smart Home]], [[UI/UX Design]], [[Dashboard Design]]

---

---

## 🎨 Themes Similar to Everforest Light

### Everforest Color Reference
>
> 📄 **STATED**: "A green based color scheme; it's designed to be warm and soft in order to protect developers' eyes" [Source: Everforest]

**Everforest Light Palette (for customization):**

| Element | Hex | Description |
|---------|-----|-------------|
| Background 0 | `#FFFBEF` | Warm cream base |
| Background 1 | `#F8F5E4` | Slightly muted |
| Background 2 | `#F2EFDF` | Paper-like |
| Foreground | `#5C6A72` | Muted dark gray-green |
| Green | `#8DA101` | Primary accent |
| Aqua | `#35A77C` | Secondary accent |
| Yellow | `#DFA000` | Warm highlight |
| Blue | `#3A94C5` | Cool accent |
| Grey 1 | `#A6B0A0` | Muted green-gray |
| Grey 2 | `#939F91` | Medium gray |

---

### 🏆 Best Matches for Everforest Aesthetic

#### 1. **Catppuccin Latte** (🌻 Light variant) - CLOSEST MATCH
>
> 📄 **STATED**: "Catppuccin is a community-driven pastel theme that aims to be the middle ground between low and high contrast" [Source: GitHub]

**Why similar:**

- Warm, soft light background
- Pastel accent colors
- Easy on eyes
- Can customize accent to **green** via `catppuccin-accents.zip`

**Installation:** HACS → Search "Catppuccin" → Download green accent from releases

**Customization path:** Download `catppuccin-accents.zip` → Select green accent → Place in themes folder

---

#### 2. **Graphite Light** - CUSTOMIZABLE BASE
>
> 📄 **STATED**: "a modern theme that offers a soothing dark mode alongside a bright, clean light mode" [Source: GitHub]
> 📄 **STATED**: "customize the Graphite theme's primary color and more without needing to fork the project" using Theme Patcher [Source: GitHub]

**Why consider:**

- Clean, minimalist light mode
- **Theme Patcher tool** allows custom primary color
- Good base to apply Everforest colors
- Native device fonts

**Customization:** Use Theme Patcher to set primary color to `#8DA101` (Everforest green)

---

#### 3. **Material You** - MOST FLEXIBLE
>
> 📄 **STATED**: "Create custom color themes with a variety of options and schemes" [Source: HA Forum]

**Why consider:**

- Generate entire theme from ONE base color
- Set base to Everforest green `#8DA101`
- Auto-computes complementary colors
- Full Material Design 3 compliance

**Installation:** HACS → Install theme + companion module → Set base color to Everforest green

---

#### 4. **Soft UI Theme**
>
> 📄 **STATED**: "Simple and soft Home Assistant theme based on Soft UI" [Source: SmartHomeScene]

**Why consider:**

- Soft, easy-on-eyes aesthetic
- Light mode available
- Minimalist approach similar to Everforest philosophy

---

### 🎯 Recommendation: Create Custom Everforest Theme

Since no official Everforest HA theme exists, best approach:

**Option A: Quick (Catppuccin + green accent)**

```text
1. Install Catppuccin via HACS
2. Download catppuccin-accents.zip from releases
3. Extract green accent file
4. Place in config/themes/
5. Select Catppuccin Latte with green accent
```text

**Option B: Full Everforest (Material You base)**

```yaml
# Use Material You companion module
# Set base color: #8DA101 (Everforest green)
# Auto-generates full theme
```text

**Option C: Manual (Graphite as base)**

```text
1. Install Graphite via HACS
2. Use Theme Patcher tool
3. Set primary: #8DA101
4. Set background: #FFFBEF
5. Customize remaining values
```text

---

### 📊 Theme Comparison Table

| Theme | Everforest Similarity | Customizable | Light Mode | HACS |
|-------|----------------------|--------------|------------|------|
| **Catppuccin Latte** | ⭐⭐⭐⭐ | Green accent | ✅ | ✅ |
| **Graphite Light** | ⭐⭐⭐ | Theme Patcher | ✅ | ✅ |
| **Material You** | ⭐⭐⭐ | Any color | ✅ | ✅ |
| **Soft UI** | ⭐⭐ | Limited | ✅ | ✅ |
| **Nord** | ⭐⭐ | Limited | ❌ | ✅ |

---

## 📚 Additional Sources (Theme-specific)

1. [Catppuccin Home Assistant](https://github.com/catppuccin/home-assistant)
2. [Everforest Palette](https://github.com/sainnhe/everforest/blob/master/palette.md)
3. [Material You Theme Forum](https://community.home-assistant.io/t/material-you-theme-and-utilities-a-fully-featured-implementation-of-material-design-3-expressive-for-home-assistant/623242)
4. [Nord Theme](https://github.com/home-assistant-community-themes/nord)

---

**Suggested location:** 3_Resources/Technology/Smart-Home/
**Potential MOCs:** [[Smart Home MOC]], [[Home Automation MOC]]
**Tags:** #home-assistant #dashboard #ui-design #smart-home #themes #everforest
