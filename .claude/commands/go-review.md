---
description: Manual Go code review against 100go.co best practices
argument-hint: [file-path|pattern|PR-URL]
allowed-tools: Read,Grep,Glob,Bash(gh:*,git:*)
---

# Go Code Review

Review Go code against 100+ common mistakes from <https://100go.co/>

## Target

Input: @$ARGUMENTS

**If GitHub PR URL:**

1. Extract PR number using `gh` CLI
2. Fetch PR diff: `gh pr diff <number>`
3. Identify changed Go files
4. Review only changed lines in context

**If file path/pattern:**

1. Use Glob to find files
2. Read and review entire files

## Review Guidelines

**Reference**: `~/.claude/skills/go-code-review/knowledge-base.md`

**Follow**: Linter error handling from `~/.claude/CLAUDE.md`:

- Fix properly, research if unclear
- Never use skip/disable directives
- Fix root cause, not symptoms

### Report ONLY if ALL true

1. Traced exact execution path showing issue
2. Verified params/return values don't prevent issue
3. Checked full function context (not isolated lines)
4. Can explain precisely why current code is wrong
5. Issue exists in actual runtime behavior
6. No defensive code/guards that prevent issue

### If ANY doubt: don't report

## Priority Checks

**Critical:**

- Error handling (#48-54): ignored, incorrect wrapping/comparison
- Concurrency (#58, 69, 70, 74): races, mutex misuse, sync copying
- Resource leaks (#26, 28, 76, 79): unclosed, memory leaks

**Major:**

- Interface design (#5-7): pollution, wrong side, returning
- Goroutine lifecycle (#62, 63): no stop, loop var issues
- Testing (#83, 86): no race flag, sleep usage

**Minor:**

- Organization (#1, 2, 15): shadowing, nesting, docs
- Performance (#21, 27, 39): init, maps, strings

## Output Format

For each issue:

- **Severity**: Critical/Major/Minor
- **Location**: file:line
- **Mistake**: #X - Name
- **Current**: code snippet
- **Fix**: suggested change
- **Why**: rationale from knowledge base

Group by severity. Prioritize critical/major. Be extremely concise.
