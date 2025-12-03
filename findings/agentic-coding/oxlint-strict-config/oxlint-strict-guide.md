# 🚀 Oxlint Strict Configuration for AI-Enhanced Workflows

**Date:** 2025-12-03
**Tags:** #research #tooling #linting #ai-coding
**Focus:** Maximum strictness + AI coding optimization

---

## 🎯 Overview

Comprehensive oxlint config enabling 600+ rules across 13 plugins, optimized for:

- ⚡ **Speed**: 50-100x faster than ESLint (0.7s for 4800+ files)
- 🤖 **AI-friendly**: Clear patterns AI tools understand
- 🛡️ **Safety**: Catch errors before they reach production
- 📚 **Maintainability**: Consistent patterns across codebase

---

## 📦 Installation

```bash
# Install oxlint + type-aware support
pnpm add -D oxlint oxlint-tsgolint

# Or with npm
npm install -D oxlint oxlint-tsgolint

# Or with yarn
yarn add -D oxlint oxlint-tsgolint
```

---

## ⚙️ Configuration

Copy [.oxlintrc.json](./.oxlintrc.json) to project root.

### Categories Enabled

| Category | Severity | Rules | Purpose |
| -------- | -------- | ----- | ------- |
| `correctness` | error | ~200 | Code that is outright wrong |
| `suspicious` | error | ~150 | Code likely to be wrong |
| `pedantic` | warn | 158+ | Extra strict patterns |
| `perf` | warn | ~50 | Performance optimizations |
| `style` | warn | ~100 | Consistency |
| `restriction` | warn | ~50 | Prevent dangerous patterns |

### Plugins Enabled (13 total)

```json
[
  "eslint",      // Core rules
  "typescript",  // TS-specific
  "react",       // React patterns
  "unicorn",     // Modern JS
  "oxc",         // Oxc-specific
  "jsx-a11y",    // Accessibility
  "nextjs",      // Next.js optimization
  "jest",        // Testing
  "jsdoc",       // Documentation
  "import",      // Import organization
  "node",        // Node.js patterns
  "promise",     // Async handling
  "react-perf"   // React performance
]
```

---

## 🤖 AI Coding Optimizations

### Why This Config Helps AI

#### 1. **Type Safety = Context Clarity**

```typescript
// ❌ AI struggles with ambiguity
function process(data: any) { ... }

// ✅ AI understands intent
function process(data: UserData): ProcessedResult { ... }
```

**Rules enforced:**

- `typescript/no-explicit-any`: error
- `typescript/no-unsafe-*`: error
- `typescript/strict-boolean-expressions`: warn

#### 2. **Modern Patterns = Better Training Data**

AI models trained on modern codebases perform better with modern syntax.

```javascript
// ❌ Old pattern (AI less confident)
var items = [];
for (var i = 0; i < data.length; i++) {
  items.push(transform(data[i]));
}

// ✅ Modern pattern (AI highly confident)
const items = data.map(transform);
```

**Rules enforced:**

- `eslint/no-var`: error
- `eslint/prefer-const`: error
- `unicorn/no-for-loop`: warn
- `unicorn/prefer-array-flat-map`: warn

#### 3. **Explicit Over Implicit**

Reduce cognitive load for both humans and AI.

```javascript
// ❌ Implicit coercion
if (value) { ... }

// ✅ Explicit intent
if (value !== null && value !== undefined) { ... }
```

**Rules enforced:**

- `eslint/no-implicit-coercion`: warn
- `typescript/strict-boolean-expressions`: warn
- `eslint/consistent-return`: error

#### 4. **Promise Handling**

AI often misses async edge cases.

```typescript
// ❌ Floating promise (AI might miss)
fetchData();

// ✅ Explicit handling
await fetchData();
// or
void fetchData();
```

**Rules enforced:**

- `typescript/no-floating-promises`: error
- `typescript/no-misused-promises`: error
- `promise/catch-or-return`: error

#### 5. **Documentation as Context**

JSDoc provides critical context for AI understanding.

```typescript
/**
 * Processes user data with validation
 * @param {UserData} data - Raw user input
 * @returns {ProcessedData} Validated and transformed data
 * @throws {ValidationError} If data is invalid
 */
function processUserData(data: UserData): ProcessedData { ... }
```

**Rules enforced:**

- `jsdoc/require-jsdoc`: warn (public functions)
- `jsdoc/check-param-names`: warn
- `jsdoc/check-alignment`: warn

---

## 🚀 Usage

### Basic

```bash
# Lint entire project
pnpm dlx oxlint

# With type-aware rules (10x faster than typescript-eslint)
pnpm dlx oxlint --type-aware

# Auto-fix (limited support for type-aware rules)
pnpm dlx oxlint --fix
```

### CI/CD Integration

```yaml
# .github/workflows/lint.yml
name: Lint
on: [push, pull_request]

jobs:
  oxlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm dlx oxlint --type-aware --deny-warnings
```

### VSCode Integration

Install extension: [Oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)

```json
// .vscode/settings.json
{
  "oxc.enable": true,
  "oxc.lint.enable": true,
  "oxc.lint.run": "onType"
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "lint:strict": "oxlint --type-aware --deny-warnings"
  }
}
```

---

## 🔧 Migration from ESLint

### Option 1: Dual Setup (Recommended)

Run oxlint first for speed, ESLint for remaining rules.

```bash
# Install compatibility plugin
pnpm add -D eslint-plugin-oxlint

# Update eslint.config.js
import oxlint from 'eslint-plugin-oxlint';

export default [
  oxlint.configs['flat/recommended'], // Disables conflicting rules
  // ... rest of config
];

# Run both
pnpm dlx oxlint && pnpm dlx eslint .
```

### Option 2: Full Migration

Replace ESLint entirely (may lose some specialized rules).

```bash
# Remove ESLint
pnpm remove eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Install oxlint
pnpm add -D oxlint oxlint-tsgolint
```

---

## 📊 Performance Comparison

| Tool | Files | Time | Relative |
| ---- | ----- | ---- | -------- |
| typescript-eslint | 4800 | ~60s | 1x |
| ESLint | 4800 | ~45s | 1.3x |
| **oxlint** | 4800 | **0.7s** | **85x** |
| **oxlint (type-aware)** | 4800 | **<10s** | **6x** |

### Benchmarks from VSCode repository

---

## 🎛️ Customization

### Disable Specific Rules

```json
{
  "rules": {
    "unicorn/no-null": "off",  // If null is needed
    "jsdoc/require-jsdoc": "off"  // If no JSDoc required
  }
}
```

### Adjust Pedantic Severity

```json
{
  "categories": {
    "pedantic": "off"  // Too strict for your team
  }
}
```

### Framework-Specific

```json
// React-only project
{
  "plugins": ["eslint", "typescript", "react", "jsx-a11y", "react-perf"]
}

// Node.js backend
{
  "plugins": ["eslint", "typescript", "node", "promise", "unicorn"]
}
```

---

## ⚠️ Known Limitations

### Type-Aware Rules

- ✅ Works great in VSCode extension
- ⚠️ CLI auto-fix limited (fixes don't apply yet)
- ⚠️ Monorepos: may hang on 100+ projects

### Current Workarounds

```bash
# If type-aware hangs in monorepo
oxlint --type-aware --max-workers 4

# Or disable for specific paths
{
  "ignorePatterns": ["packages/legacy/*"]
}
```

---

## 🔗 Integration with Other Tools

### Prettier

Oxlint focuses on logic/correctness, not formatting.

```json
{
  "scripts": {
    "lint": "oxlint",
    "format": "prettier --write .",
    "check": "oxlint && prettier --check ."
  }
}
```

### Husky + lint-staged

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "oxlint --fix",
      "prettier --write"
    ]
  }
}
```

### TypeScript Compiler

Oxlint complements, doesn't replace `tsc`.

```bash
# Full check
pnpm dlx oxlint --type-aware && tsc --noEmit
```

---

## 🎓 Learning Resources

### Official Docs

- [Oxlint Configuration](https://oxc.rs/docs/guide/usage/linter/config)
- [Rules List](https://oxc.rs/docs/guide/usage/linter/rules)
- [Type-Aware Linting](https://oxc.rs/docs/guide/usage/linter/type-aware)

### Related

[[AI Coding Best Practices]], [[TypeScript Strict Mode]], [[Linting Strategy]]

---

## 🆘 Troubleshooting

### "Rule not found"

Check rule is supported: `pnpm dlx oxlint --rules`

### "Type-aware slow"

- Reduce workers: `--max-workers 2`
- Check tsconfig is valid
- Use `--tsconfig path/to/tsconfig.json`

### "Too many warnings"

Start with just `correctness` category:

```json
{
  "categories": {
    "correctness": "error"
  }
}
```

Then gradually enable: `suspicious` → `pedantic` → `perf` → `style`

---

## ✅ Next Steps

- [ ] Copy `.oxlintrc.json` to project root
- [ ] Install dependencies: `pnpm add -D oxlint oxlint-tsgolint`
- [ ] Run: `pnpm dlx oxlint --type-aware`
- [ ] Fix errors incrementally (category by category)
- [ ] Add to CI/CD pipeline
- [ ] Install VSCode extension
- [ ] Configure pre-commit hooks

---

**Sources:**

- [Oxlint Configuration Docs](https://oxc.rs/docs/guide/usage/linter/config)
- [Getting Started with Oxlint](https://betterstack.com/community/guides/scaling-nodejs/oxlint-explained/)
- [Type-Aware Linting](https://oxc.rs/blog/2025-08-17-oxlint-type-aware)
- [Oxlint v1.0 Stable](https://oxc.rs/blog/2025-06-10-oxlint-stable)
- [GitHub - eslint-plugin-oxlint](https://github.com/oxc-project/eslint-plugin-oxlint)

---

**Suggested location:** `3_Resources/Development/Tooling/`
**Potential MOCs:** [[Linting]], [[AI Coding Tools]], [[TypeScript Development]]
**Tags:** #oxlint #linting #typescript #ai-coding #tooling
