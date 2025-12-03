# 🥊 Ruff vs Other Python Linters

## Comparison of Python linting tools for strict configurations

---

## 📊 Quick Comparison

| Tool | Speed | Rules | Auto-fix | Format | All-in-One |
| ---- | ----- | ----- | -------- | ------ | ---------- |
| **Ruff** | ⚡⚡⚡⚡⚡ | 800+ | ✅ 90% | ✅ | ✅ |
| Flake8 | ⚡⚡ | 400+ | ❌ | ❌ | ❌ |
| Pylint | ⚡ | 500+ | ⚠️ Limited | ❌ | ❌ |
| Black | ⚡⚡⚡⚡ | Format only | ✅ 100% | ✅ | ❌ |
| isort | ⚡⚡⚡ | Imports only | ✅ 100% | ✅ | ❌ |
| Bandit | ⚡⚡ | Security only | ❌ | ❌ | ❌ |
| mypy | ⚡⚡ | Type check | ❌ | ❌ | ❌ |

**Winner:** Ruff (fastest, most comprehensive, all-in-one)

---

## ⚡ Performance Benchmarks

### Real-world Project (10k LOC)

```bash
# Traditional toolchain
black .           # 2.5s
isort .           # 1.8s
flake8 .          # 12.3s
bandit -r .       # 8.7s
pylint src/       # 28.4s
# Total: ~53.7s

# Ruff
ruff check --fix . # 0.4s
ruff format .      # 0.3s
# Total: ~0.7s

# Speedup: 76x faster! 🚀
```

### Large Project (100k LOC)

```bash
# Traditional
~8-12 minutes

# Ruff
~15-20 seconds

# Speedup: 24-48x faster! 🚀
```

---

## 🔍 Feature Comparison

### Ruff

**Pros:**

- ⚡ 10-100x faster (written in Rust)
- 🛠️ 90% auto-fix rate
- 📦 Single tool replaces 15+ linters
- 🔒 Built-in security scanning (Bandit)
- 🎨 Built-in formatter (Black-compatible)
- 📚 800+ rules across 59 categories
- 🤖 Excellent for AI workflows
- 🔧 Zero config to get started
- 📖 Excellent documentation
- 🆕 Actively developed (2025+)

**Cons:**

- 🆕 Relatively new (2022)
- 🧪 Some rules still in preview
- 🔧 Limited plugin ecosystem (by design)

**Best for:**

- New projects
- AI-assisted development
- Fast iteration cycles
- CI/CD pipelines
- Teams wanting consistency

---

### Flake8

**Pros:**

- 🏛️ Mature and stable
- 🔌 Rich plugin ecosystem
- 📚 Well-documented
- 🤝 Wide adoption

**Cons:**

- 🐌 10-100x slower than Ruff
- ❌ No auto-fix (requires autopep8)
- ❌ No formatting
- 🔧 Complex configuration
- 📦 Requires multiple plugins
- ⚠️ Maintenance mode (limited updates)

**Best for:**

- Legacy projects
- Teams requiring specific plugins
- Conservative environments

**Migration to Ruff:**

```bash
# Flake8 config
[flake8]
max-line-length = 88
extend-ignore = E203

# Ruff equivalent
[tool.ruff]
line-length = 88
[tool.ruff.lint]
ignore = ["E203"]
```

---

### Pylint

**Pros:**

- 🔍 Most comprehensive analysis
- 📊 Detailed reports
- 🎯 Opinionated best practices
- 🔢 Code complexity metrics

**Cons:**

- 🐢 Slowest linter (5-10min on large projects)
- 🤯 Overwhelming for beginners
- ⚙️ Complex configuration
- 🚫 False positives common
- ⚠️ Limited auto-fix

**Best for:**

- Code audits
- Learning Python best practices
- Projects prioritizing thoroughness over speed

**Ruff includes Pylint rules:**

```toml
[tool.ruff.lint]
select = ["PL"]  # All Pylint rules
# PLC - Convention
# PLE - Error
# PLR - Refactoring
# PLW - Warning
```

---

### Black

**Pros:**

- 🎨 Opinionated formatting
- ✅ 100% auto-fix
- 🤝 Wide adoption
- 📏 Consistent style

**Cons:**

- 📝 Formatting only (no linting)
- 🔒 Limited configuration options
- ❌ Doesn't catch bugs

**Best for:**

- Teams wanting zero-config formatting
- Projects using Black already

**Ruff is Black-compatible:**

```bash
# Black
black .

# Ruff (same output)
ruff format .

# Drop-in replacement!
```

---

### isort

**Pros:**

- 📦 Import organization
- 🔧 Flexible configuration
- ✅ Auto-fix

**Cons:**

- 📦 Imports only
- ⚙️ Configuration can be complex
- 🐌 Slower than Ruff

**Best for:**

- Projects needing fine-grained import control

**Ruff includes isort:**

```toml
[tool.ruff.lint]
select = ["I"]  # isort

[tool.ruff.lint.isort]
known-first-party = ["myapp"]
lines-after-imports = 2
```

---

### Bandit

**Pros:**

- 🔒 Security-focused
- 🎯 Finds common vulnerabilities
- 📚 OWASP-aligned

**Cons:**

- 🐌 Slower than Ruff
- ❌ No auto-fix
- ⚠️ False positives
- 🔍 Security only

**Best for:**

- Security audits
- Compliance requirements

**Ruff includes Bandit:**

```toml
[tool.ruff.lint]
select = ["S"]  # All Bandit rules

# Example rules:
# S101 - assert used
# S102 - exec used
# S103 - os.chmod with bad permissions
# S104 - hardcoded bind all interfaces
# S105 - hardcoded password
# S106 - hardcoded password func arg
# S107 - hardcoded password default arg
```

---

### mypy

**Pros:**

- 🔍 Static type checking
- 🎯 Catches type errors
- 📚 Industry standard for types
- 🔧 Gradual typing support

**Cons:**

- 🐌 Slower than Ruff
- 📝 Types only (no linting/formatting)
- ⚙️ Complex configuration
- 🤯 Steep learning curve

**Best for:**

- Type-safe projects
- Large codebases
- Teams using strict typing

**Complementary to Ruff:**

```bash
# Use both together
ruff check --fix .  # Linting
ruff format .       # Formatting
mypy .              # Type checking
```

---

## 🎯 Tool Combinations

### Traditional Stack (❌ Not Recommended)

```bash
black .            # Format
isort .            # Import sort
flake8 .           # Lint
bandit -r .        # Security
pylint src/        # Deep analysis
mypy .             # Type check

# Total: 6 tools, ~1-5 min, complex config
```

### Modern Stack ✅ (Recommended)

```bash
ruff check --fix . # Lint + Security + Auto-fix
ruff format .      # Format
mypy .             # Type check (optional)

# Total: 2 tools, ~5-10 sec, simple config
```

### Minimalist Stack ✅ (Maximum Speed)

```bash
ruff check --fix . # Everything

# Total: 1 tool, ~2-5 sec
```

---

## 🔄 Migration Guide

### From Flake8

```bash
# 1. Install Ruff
pip install ruff

# 2. Convert config (mostly compatible)
# Flake8's select/ignore map directly to Ruff

# 3. Run once
ruff check --fix .

# 4. Remove Flake8
pip uninstall flake8
```

### From Black + isort

```bash
# 1. Install Ruff
pip install ruff

# 2. Ruff is Black-compatible by default
# No config changes needed!

# 3. Replace commands
ruff format .  # Instead of: black . && isort .

# 4. Remove old tools
pip uninstall black isort
```

### From Pylint

```bash
# 1. Install Ruff
pip install ruff

# 2. Enable Pylint rules
[tool.ruff.lint]
select = ["PL"]

# 3. Much faster, but slightly different
ruff check --select PL .

# 4. Optional: keep Pylint for deep audits
```

### From Everything

```bash
# 1. Install Ruff
pip install ruff

# 2. Enable ALL rules
[tool.ruff.lint]
select = ["ALL"]

# 3. Migrate ignore patterns
# Most Flake8/Pylint codes work in Ruff

# 4. Remove all old tools
pip uninstall black isort flake8 bandit pylint autopep8
```

---

## 📈 Rule Coverage Comparison

### Security Rules

| Tool | Rules | Auto-fix |
| ---- | ----- | -------- |
| **Ruff (S)** | 120+ | ✅ Some |
| Bandit | 100+ | ❌ |
| Flake8-bandit | 100+ | ❌ |
| Pylint | ~30 | ⚠️ Few |

### Code Quality

| Tool | Rules | Auto-fix |
| ---- | ----- | -------- |
| **Ruff** | 800+ | ✅ 90% |
| Flake8 | 400+ | ❌ |
| Pylint | 500+ | ⚠️ ~10% |

### Performance Rules

| Tool | Rules | Auto-fix |
| ---- | ----- | -------- |
| **Ruff (PERF)** | 40+ | ✅ Most |
| Flake8-performance | 20+ | ❌ |
| Pylint | ~10 | ❌ |

---

## 💰 Cost-Benefit Analysis

### Developer Time (1 year, 5 developers)

**Traditional Stack:**

```text
Waiting for linters: 5 devs × 5 min/day × 250 days = 104 hours/year
Configuration time: ~20 hours initial + ~10 hours/year maintenance
Total: ~134 hours/year = $20,000+ (@ $150/hr)
```

**Ruff:**

```text
Waiting for linter: 5 devs × 10 sec/day × 250 days = 3.5 hours/year
Configuration time: ~2 hours initial + ~1 hour/year maintenance
Total: ~6.5 hours/year = $975 (@ $150/hr)

Savings: $19,025/year! 💰
```

---

## 🎓 Recommendations

### For New Projects

**Use Ruff exclusively** ✅

- Fastest setup
- Best developer experience
- Lowest maintenance

```toml
[tool.ruff]
line-length = 88
target-version = "py311"

[tool.ruff.lint]
select = ["ALL"]
```

### For Existing Projects (Flake8/Black)

**Migrate to Ruff** ✅

- Drop-in replacement
- Immediate speed boost
- Minimal config changes

### For Legacy Projects (Pylint)

**Gradual migration** ⚠️

1. Add Ruff alongside Pylint
2. Enable Ruff's PL rules
3. Fix critical issues
4. Deprecate Pylint

### For Type-Heavy Projects

**Ruff + mypy** ✅

- Ruff for linting/formatting
- mypy for type checking
- Best of both worlds

---

## 🔮 Future Outlook

### Ruff (2025+)

- ✅ Active development
- ✅ Growing ecosystem
- ✅ Industry adoption increasing
- ✅ Backed by Astral (well-funded)

### Traditional Tools

- ⚠️ Maintenance mode (Flake8)
- ⚠️ Slower development (Pylint)
- ✅ Still stable and supported
- ❓ Uncertain long-term future

**Verdict:** Ruff is the future of Python linting 🚀

---

## 📊 Community Adoption

### Downloads (PyPI, monthly)

- **Ruff:** 15M+ downloads/month (growing)
- Black: 30M+ downloads/month (stable)
- Flake8: 25M+ downloads/month (declining)
- Pylint: 20M+ downloads/month (stable)

### GitHub Stars

- **Ruff:** 35k+ ⭐ (2022-2025)
- Black: 38k+ ⭐ (2016-2025)
- Flake8: 3k+ ⭐
- Pylint: 5k+ ⭐

### Major Adopters

- **Ruff:** FastAPI, Pandas, Pydantic, Jupyter, Airflow
- Many teams migrating from legacy tools

---

## 🏁 Conclusion

**TL;DR:**

- 🥇 **Best choice:** Ruff (speed + features + all-in-one)
- 🥈 **Second best:** Black + Flake8 (if can't use Ruff)
- 🥉 **Third best:** Pylint (deep analysis, slow)

**Migration priority:**

1. New projects → Ruff immediately
2. Fast-paced teams → Ruff ASAP
3. Legacy codebases → Gradual migration
4. Enterprise/conservative → Evaluate first

**Final recommendation:** Use Ruff for everything except static type checking (mypy). 🎯

---

**Last Updated:** 2025-12-03
**Ruff Version:** 0.8.4+
