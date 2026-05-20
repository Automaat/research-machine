---
name: technical-debt-manager
description: Analyze repo for technical debt, research language-specific best practices, create umbrella tracker issue with one subissue per finding
argument-hint: "[--focus area] [--label label-name]"
allowed-tools: Bash, Read, Glob, Grep, WebSearch, WebFetch
user-invocable: true
context: fork
agent: Explore
---

# Technical Debt Manager

Analyze current repo for technical debt by exploring codebase and researching version-specific best practices. Produce an umbrella ☂️ tracker issue plus one subissue per finding, all rated across 4 axes (impact, effort, contagion, business alignment) with concrete, actionable fix descriptions. Subissues are linked to the umbrella via `gh-add-subissue`.

## Arguments

Parse from `$ARGUMENTS`:

- **--focus:** Optional — Narrow analysis to specific area (e.g., `error-handling`, `tests`, `dependencies`, `architecture`). Default: full scan.
- **--label:** Optional — GitHub issue label. Default: `tech-debt`

## Scope

Analyze technical debt in software repositories with a GitHub remote. Not designed for non-code repos (docs-only, design assets) or repos without version control.

---

## Workflow

### Phase 1: Repo Discovery

**1a. Detect language & framework:**

- Read project config files to identify stack:
  - `package.json`, `tsconfig.json` → TypeScript/JavaScript + framework
  - `go.mod` → Go
  - `pyproject.toml`, `setup.py`, `requirements.txt` → Python + framework
  - `Cargo.toml` → Rust
  - `Gemfile` → Ruby
  - `pom.xml`, `build.gradle` → Java/Kotlin
  - `mise.toml`, `.tool-versions` → Additional tool hints
- Identify test framework, linter, formatter from config
- Note monorepo structure if applicable

**1b. Codebase overview:**

- Glob for directory structure (top 2 levels)
- Count files per language
- Identify entry points, main modules
- Check for CI/CD config (`.github/workflows/`, `Makefile`, etc.)

**1c. Check existing debt items:**

- Search for existing `tech-debt` labeled issues: `gh issue list --label tech-debt --state open`
- Read CLAUDE.md / AGENTS.md, README, CONTRIBUTING for known debt items/conventions
- Note any existing TODO/FIXME/HACK conventions

### Phase 2: Research Modern Practices

**2a. Detect specific versions:**

- Extract language VERSION from config (e.g., `"engines": {"node": ">=20"}`, `go 1.22` in go.mod)
- Extract framework VERSION (e.g., `"react": "^18.2"`, `"next": "14.1"`)
- Note: version-specific best practices differ significantly (e.g., Go 1.22 vs 1.18, React 18 vs 17)

**2b. Monorepo handling:**

- If monorepo detected (multiple `package.json`, workspace config, `apps/` + `packages/`), research separately per app/package
- Note shared dependencies and cross-package patterns

**2c. Search for current best practices.**

Search queries (adapt to detected stack — include detected version):

- `"{language} {version} best practices {year}" maintainable code`
- `"{framework} {version} common anti-patterns {year}"`
- `"{language} {version} migration guide" breaking changes` (if version is behind latest)
- `"{language} technical debt indicators checklist"`

Use the available web search capability, then fetch the result pages to extract specific recommendations. Save research summary internally for Phase 3 comparison.

### Phase 3: Codebase Analysis

Re-read the priority axes (Phase 4) before starting — record ratings as findings are discovered, not retroactively.

Read [references/grep-patterns.md](references/grep-patterns.md) before starting this phase.

Run analysis across these categories. For each finding, record: file:line, description, why it matters, fix approach.

**3a. Self-Admitted Debt (SATD markers) & Complexity**

- Search for `TODO`, `FIXME`, `HACK`, `XXX`, `WORKAROUND` comments with Grep
  - Extract 3 lines context around each match
  - Classify severity: `TODO` (low) → `FIXME` (medium) → `HACK` (high) → `XXX` (critical)
  - Check age via `git blame` on flagged lines — older = higher priority
  - Group by theme clusters (e.g., "error handling TODOs", "performance FIXMEs")
- Compare patterns found against Phase 2 research findings
- Apply code quality grep patterns from [references/grep-patterns.md](references/grep-patterns.md)

**3b. Architecture**

- Compare project structure against language-specific recommendations from Phase 2
- Apply architecture grep patterns from [references/grep-patterns.md](references/grep-patterns.md)

**3c. Dependencies**

- Check for outdated dependencies: `gh api repos/{owner}/{repo}/dependabot/alerts` or manual check
- Identify pinning issues (too loose or too strict version ranges)
- Check for deprecated packages
- Apply dependency grep patterns from [references/grep-patterns.md](references/grep-patterns.md)

**3d. Testing**

- Identify untested modules (no corresponding test file)
- Compare test patterns against Phase 2 testing best practices
- Apply testing grep patterns from [references/grep-patterns.md](references/grep-patterns.md)

**3e. DevOps & Tooling**

- Compare CI/CD setup against Phase 2 recommendations
- Apply DevOps grep patterns from [references/grep-patterns.md](references/grep-patterns.md)

**3f. Documentation Debt**

- Apply documentation grep patterns from [references/grep-patterns.md](references/grep-patterns.md)

**3g. Security Debt**

- Cross-reference dependencies with `gh api repos/{owner}/{repo}/dependabot/alerts`
- Apply security grep patterns from [references/grep-patterns.md](references/grep-patterns.md)

**If `--focus` specified:** Only run the matching sub-phase (3a-3g).

### Phase 4: Prioritize Findings

Rate each finding on 4 axes:

| Rating | Impact | Effort | Contagion | Business Alignment |
|--------|--------|--------|-----------|-------------------|
| **High** | Causes bugs, security risk, blocks features | >1 day, architectural change | Foundational — touches architecture, affects many modules | Blocks product goals, compliance, or release velocity |
| **Medium** | Degrades developer experience, slows development | Hours, localized change | Spreads — affects 2-5 modules or shared patterns | Slows feature delivery but doesn't block |
| **Low** | Style, minor inconsistency, nice-to-have | Minutes, simple fix | Isolated — contained to 1 module | No direct business impact |

> **Contagion** (from Riot Games tech debt taxonomy): How much does this debt propagate? Isolated debt in a single module is less urgent than foundational debt baked into architecture that every new feature inherits.

**Priority matrix:**

- 🔴 **Critical Path Block:** High impact + High contagion → Do first even if high effort
- 🔴 **Quick Wins:** High impact + Low effort + Low contagion → Do immediately
- 🟠 **Strategic:** High impact + High effort → Plan & schedule, consider business alignment
- 🟡 **Velocity Improvers:** Medium impact + Low effort → Batch together
- ⚪ **Backlog:** Low impact → Track, do opportunistically

### Phase 5: Create GitHub Issues

Recall the actionability standard and quality checklist (end of this file) before composing issues.

**Output structure:** one ☂️ umbrella tracker issue + one child subissue per finding, linked via `gh-add-subissue`.

**5a. Verify repo has GitHub remote:**

- `gh repo view --json nameWithOwner -q .nameWithOwner`
- If no remote, save as local markdown file instead: `${XDG_DATA_HOME:-$HOME/.local/share}/sai/technical-debt-manager/debt-report-{date}.md` (skip rest of Phase 5)

**5b. Check for existing label:**

- `gh label list --search tech-debt`
- If missing: `gh label create tech-debt --description "Technical debt items" --color "D93F0B"`

**5c. Create umbrella issue first** (so children can reference it).

Read [references/issue-template.md](references/issue-template.md) for both umbrella and child body structures. Use the **Umbrella Tracker** template. Initially create with placeholder subissue list (or empty) — it will be rewritten in 5e.

```bash
PARENT_URL=$(gh issue create --title "☂️ Tech Debt Audit: {repo} ({date})" --label tech-debt --body-file umbrella.md)
PARENT=$(echo "$PARENT_URL" | grep -oE '[0-9]+$')
```

**5d. Create one child issue per finding, link to umbrella.**

For each finding, write a body using the **Child Issue** template from `references/issue-template.md`. Title format: conventional commits (`type(scope): description`), max 70 chars. Map priority → type:

- Critical / Quick Win deps/build issues → `fix`, `build`, `chore`
- Strategic perf → `perf`
- Test coverage → `test`
- Refactors → `refactor`
- Docs → `docs`
- Plugin features → `feat`

```bash
for finding in findings; do
  CHILD_URL=$(gh issue create --title "$TITLE" --label tech-debt --body-file "$body")
  CHILD=$(echo "$CHILD_URL" | grep -oE '[0-9]+$')
  gh-add-subissue "$PARENT" "$CHILD"  # script in ~/.local/bin/
done
```

`gh-add-subissue` uses the GraphQL `addSubIssue` mutation with the `sub_issues` feature header. If the script is unavailable, fall back to inline GraphQL:

```bash
# Resolve node IDs, then link
PID=$(gh api graphql -f query='query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){issue(number:$n){id}}}' -f o=OWNER -f r=REPO -F n=$PARENT --jq .data.repository.issue.id)
CID=$(gh api graphql -f query='query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){issue(number:$n){id}}}' -f o=OWNER -f r=REPO -F n=$CHILD --jq .data.repository.issue.id)
gh api graphql -H "GraphQL-Features: sub_issues" -f query='mutation($p:ID!,$c:ID!){addSubIssue(input:{issueId:$p,subIssueId:$c}){issue{number}}}' -f p=$PID -f c=$CID
```

**5e. Rewrite umbrella body as tracker** (now that all child numbers exist).

Replace umbrella body using the **Umbrella Tracker** template, listing each child as `- [ ] #N — title` grouped by priority bucket.

```bash
gh issue edit "$PARENT" --body-file tracker.md
```

### Phase 6: Measurement Recommendations

Read [references/measurement-template.md](references/measurement-template.md) and append its content to the **umbrella** issue body (after the Summary table). Do not duplicate into child issues.

### Phase 7: Summary

Display in chat:

```
Tech debt audit complete

Umbrella: {parent-issue-url}
Subissues: {child-issue-numbers, comma-separated}
Findings: {total-count}
  Critical + Quick wins: {count}
  Strategic: {count}
  Velocity improvers: {count}
  Backlog: {count}

Top recommendation: {single most impactful action — reference child #}
```

---

## Error Handling

- **No GitHub remote:** Save report as `${XDG_DATA_HOME:-$HOME/.local/share}/sai/technical-debt-manager/debt-report-{date}.md`
- **No findings:** Create issue noting clean audit, mention practices verified
- **Rate limited on web search:** Proceed with codebase analysis only, note limited research in issue
- **Very large repo:** Focus on src/lib/app directories, skip vendor/generated/node_modules
- **`--focus` area not applicable:** Inform user, suggest valid areas for this repo

**Do not:**

- Report style-only issues (naming, formatting) as technical debt — those belong in linter config
- Count a finding twice under different categories; deduplicate before Phase 4
- Recommend rewrites without a migration path that fits the actionability standard

## Actionability Standard

Every finding's "Fix" field must pass this litmus test: can a developer start work within 2 days without architectural redesign? If no, break into smaller items.

<example>
Input: A bare exception handler found at `src/api.py:42`
Finding entry:
- [ ] **Bare exception swallows errors** — `src/api.py:42`
  Impact: Silent failures mask bugs in production
  Contagion: Low — isolated to one handler
  Fix: Replace `except:` with `except ValueError as e: logger.error(f'Invalid input: {e}')`
  Effort: Minutes
</example>

<example>
Input: A 65-line function with 4 nested ifs at `main.go:120-185`
Finding entry:
- [ ] **God function in main.go** — `main.go:120-185`
  Impact: Untestable, hard to modify without regressions
  Contagion: Medium — called from 3 handlers
  Fix: Extract `parseConfig()` into `pkg/config/parser.go`, flatten nested ifs with early returns
  Effort: Hours
</example>

<example>
Input: Wildcard dependency pin `"lodash": "*"` in `package.json:15`
Finding entry:
- [ ] **Wildcard dependency pin** — `package.json:15`
  Impact: Allows breaking changes on install
  Contagion: Low — single dependency
  Fix: Pin `lodash` from `*` to `^4.17.21`
  Effort: Minutes
</example>

## Quality Checklist

Before creating issues, verify:

- [ ] Language and framework correctly identified (including version)
- [ ] Web research completed with current-year sources
- [ ] Every finding has file:line reference (or module-level for architecture)
- [ ] Every finding has concrete fix approach (passes actionability standard)
- [ ] All 4 priority axes rated
- [ ] Findings grouped by priority matrix
- [ ] Summary table counts are accurate
- [ ] No duplicate findings
- [ ] Research context section links findings to best practices

After creating issues, verify:

- [ ] Umbrella issue title starts with ☂️
- [ ] Each child issue title follows conventional commits format (`type(scope): description`)
- [ ] Each child issue references the umbrella in its body (`**Parent:** #N`)
- [ ] Every child is linked to umbrella via `gh-add-subissue` (parent shows correct subissue count)
- [ ] Umbrella body is the tracker (not duplicated finding bodies)
