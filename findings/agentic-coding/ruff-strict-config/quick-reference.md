# 🚀 Ruff Quick Reference

## Quick command reference and rule category cheatsheet

---

## ⚡ Common Commands

### Basic Operations

```bash
ruff check .                    # Check all files
ruff check --fix .              # Auto-fix issues
ruff format .                   # Format code (Black-compatible)
ruff check --watch .            # Watch mode
```

### Selective Checking

```bash
ruff check --select S .         # Security only
ruff check --select F,E,W .     # Pyflakes + pycodestyle
ruff check --select ALL .       # All rules (800+)
ruff check --ignore D .         # Ignore docstrings
```

### Output Formats

```bash
ruff check --output-format=text .
ruff check --output-format=json .
ruff check --output-format=github .     # GitHub Actions
ruff check --output-format=gitlab .     # GitLab CI
```

### Statistics & Info

```bash
ruff check --statistics .       # Show rule counts
ruff check --show-fixes .       # Show available fixes
ruff rule S102                  # Explain specific rule
ruff --version                  # Version info
```

### Configuration

```bash
ruff check --config pyproject.toml .
ruff check --isolated .         # Ignore config files
```

---

## 📋 Rule Categories Cheatsheet

### Core Python (Always Enable)

```toml
"F"   # Pyflakes - undefined names, unused imports
"E"   # pycodestyle errors - PEP 8 violations
"W"   # pycodestyle warnings - style issues
"I"   # isort - import organization
```

### Bug Prevention (Highly Recommended)

```toml
"B"    # bugbear - likely bugs
"BLE"  # blind-except - catch without specificity
"RUF"  # Ruff-specific improvements
"PIE"  # misc improvements
```

### Security (Critical)

```toml
"S"    # bandit - security vulnerabilities
"G"    # logging-format - logging security
"LOG"  # logging best practices
```

### Modernization

```toml
"UP"    # pyupgrade - modern syntax
"FURB"  # refurb - modernization
"FLY"   # flynt - f-string conversion
"FA"    # future-annotations
```

### Performance

```toml
"PERF"  # Perflint - performance anti-patterns
"NPY"   # NumPy-specific
"PD"    # pandas-vet
```

### Code Quality

```toml
"C90"   # mccabe - complexity
"SIM"   # simplify - simplification
"RET"   # return - return statements
"TRY"   # tryceratops - exception handling
"PTH"   # use-pathlib - modern paths
```

### Type Checking

```toml
"ANN"   # annotations - type hints
"TC"    # type-checking - TYPE_CHECKING blocks
"PYI"   # pyi - type stub files
```

### Naming & Style

```toml
"N"     # pep8-naming
"A"     # builtins - shadowing prevention
"Q"     # quotes - quote consistency
```

### Docstrings & Comments

```toml
"D"     # pydocstyle - docstring style
"DOC"   # pydoclint - docstring consistency
"TD"    # todos - TODO format
"FIX"   # fixme - FIXME/HACK comments
```

### Testing

```toml
"PT"    # pytest-style
"T10"   # debugger - debugger detection
"T20"   # print - print statement detection
```

### Async/Concurrency

```toml
"ASYNC" # async patterns
```

### Date/Time

```toml
"DTZ"   # datetimez - timezone awareness
```

### Import Management

```toml
"I"     # isort - sorting
"ICN"   # import-conventions - aliases
"TID"   # tidy-imports - organization
"INP"   # no-pep420 - require __init__.py
```

### Comprehensions & Collections

```toml
"C4"    # comprehensions
"COM"   # commas - trailing commas
```

### String Handling

```toml
"ISC"   # implicit-str-concat
"FLY"   # flynt - f-strings
"Q"     # quotes
```

### Exception Handling

```toml
"TRY"   # tryceratops
"EM"    # errmsg - exception messages
"RSE"   # raise - raise statements
"BLE"   # blind-except
```

### Misc Quality

```toml
"ERA"   # eradicate - commented code
"PGH"   # pygrep-hooks - pattern checks
"FBT"   # boolean-trap
"ARG"   # unused-arguments
"SLF"   # self - private access
"SLOT"  # slots - __slots__ usage
```

### Pylint Equivalents

```toml
"PL"    # Pylint (includes PLC, PLE, PLR, PLW)
```

### Framework-Specific

```toml
"DJ"    # Django
"FAST"  # FastAPI
"AIR"   # Airflow
```

---

## 🎯 Common Patterns

### Strict Everything

```toml
[tool.ruff.lint]
select = ["ALL"]
ignore = ["E501", "COM812", "ISC001"]  # Formatter conflicts only
```

### Security-Focused

```toml
[tool.ruff.lint]
select = ["F", "E", "W", "B", "S", "DTZ", "ASYNC", "LOG"]
```

### Performance-Focused

```toml
[tool.ruff.lint]
select = ["F", "E", "W", "PERF", "NPY", "PD", "UP", "SIM"]
```

### Type-Safety-Focused

```toml
[tool.ruff.lint]
select = ["F", "E", "W", "ANN", "TC", "FA", "PYI"]
```

### Minimal (Essential Only)

```toml
[tool.ruff.lint]
select = ["F", "E", "W", "I"]  # Flake8 + isort baseline
```

---

## 🔧 Per-File Overrides

### Tests

```toml
"tests/**/*.py" = ["S101", "ANN", "D", "PLR2004", "ARG"]
```

- `S101` - Allow assert
- `ANN` - No type annotations
- `D` - No docstrings
- `PLR2004` - Magic values OK
- `ARG` - Unused fixtures OK

### Scripts

```toml
"scripts/**/*.py" = ["T20", "T10"]
```

- `T20` - Allow print
- `T10` - Allow debugger

### **init**.py

```toml
"__init__.py" = ["F401", "F403", "E402"]
```

- `F401` - Unused imports (re-exports)
- `F403` - Star imports
- `E402` - Import not at top

### Migrations

```toml
"migrations/**/*.py" = ["D", "ANN", "N999"]
```

- `D` - No docstrings
- `ANN` - No annotations
- `N999` - Invalid module name OK

---

## 🛠️ Integration Snippets

### Pre-commit

```yaml
- repo: https://github.com/astral-sh/ruff-pre-commit
  rev: v0.8.4
  hooks:
    - id: ruff
      args: [--fix]
    - id: ruff-format
```

### GitHub Actions

```yaml
- uses: astral-sh/ruff-action@v2
  with:
    args: 'check --no-fix --output-format=github'
```

### Makefile

```makefile
lint:
 ruff check --fix .
 ruff format .

check:
 ruff check --no-fix .

watch:
 ruff check --watch .
```

### VS Code

```json
{
  "ruff.enable": true,
  "ruff.organizeImports": true,
  "ruff.fixAll": true,
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll": "explicit",
      "source.organizeImports": "explicit"
    }
  }
}
```

---

## 📊 Rule Priority Matrix

| Priority | Categories | When to Enable |
| -------- | ---------- | -------------- |
| **P0** | F, E, W, I | Always (baseline) |
| **P1** | B, S, UP, RUF | Immediately after P0 |
| **P2** | PERF, SIM, C90, RET, TRY, PTH | Week 2-3 |
| **P3** | N, A, Q, ERA, PGH | Month 1 |
| **P4** | ANN, D, PL | Month 2+ (mature projects) |
| **P5** | TD, FIX, DOC | Optional (public APIs) |

---

## 🚫 Rules to Ignore for AI Coding

### Too Verbose (Early Iterations)

```toml
ignore = [
    "D100", "D101", "D102", "D103",  # Missing docstrings
    "TD002", "TD003",                 # TODO formatting
    "FIX002",                         # TODO comments exist
]
```

### AI-Generated Patterns

```toml
ignore = [
    "B008",   # Function call in defaults (FastAPI)
    "EM101",  # String literals in exceptions
    "TRY003", # Long exception messages
]
```

### Formatter Conflicts

```toml
ignore = [
    "E501",   # Line too long
    "COM812", # Trailing comma
    "ISC001", # Implicit string concat
]
```

---

## ⚙️ Complexity Tuning

```toml
[tool.ruff.lint.mccabe]
max-complexity = 10  # Default: 10, strict: 5-8, relaxed: 12-15

[tool.ruff.lint.pylint]
max-args = 5         # Default: 5, relaxed: 7-8
max-branches = 12    # Default: 12, strict: 8-10
max-returns = 6      # Default: 6, strict: 3-4
max-statements = 50  # Default: 50, strict: 30-40
```

---

## 💡 Pro Tips

1. **Always use `--fix`** - Saves 90% of manual work
2. **Enable rules progressively** - F/E/W → B/S → PERF/SIM → ALL
3. **Per-file ignores > blanket ignores** - Be specific
4. **Security rules are non-negotiable** - Never ignore S, B, DTZ
5. **Watch mode during development** - `ruff check --watch .`
6. **CI should fail on violations** - No `--fix` in CI
7. **Review auto-fixes** - Especially TRY, SIM, PERF rules
8. **Update regularly** - `pip install -U ruff`

---

## 🔍 Debugging Rules

### Find which rule triggered

```bash
ruff check file.py  # Shows rule code (e.g., F401)
```

### Get rule documentation

```bash
ruff rule F401      # Detailed explanation
ruff rule S102      # Security rule info
```

### Test single rule

```bash
ruff check --select F401 .      # Only check F401
ruff check --ignore F401 .      # Check everything except F401
```

### Preview rules (experimental)

```toml
[tool.ruff]
preview = true  # Enable preview rules
```

---

## 📦 Installation

```bash
# pip
pip install ruff

# pipx (isolated)
pipx install ruff

# uv (fastest)
uv tool install ruff

# Homebrew
brew install ruff

# Check version
ruff --version
```

---

**Last Updated:** 2025-12-03
**Ruff Version:** 0.8.4+
