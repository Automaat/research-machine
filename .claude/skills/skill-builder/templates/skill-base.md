# Base SKILL.md Template

Use this as starting point. Replace all `{placeholders}`.

---

```yaml
---
name: {skill-name}
description: {one-line-description}
argument-hint: "{required-args} [--optional flags]"
allowed-tools: {Tool1, Tool2, Tool3}
user-invocable: true
---
```

# {Skill Name}

{Brief description of what skill does and when to use it.}

## Arguments

Parse from `$ARGUMENTS`:

- **{arg1}:** Required — {description}
- **--{flag}:** Optional — {description, default value}

## Workflow

### Phase 1: Setup

- Parse arguments
- {Read supporting files if any}
- {Check state if recurring}

### Phase 2: {Main Action}

{Core logic of the skill}

- Step 1
- Step 2
- Step 3

### Phase 3: {Process/Transform}

{If needed - synthesis, transformation, etc.}

### Phase 4: Output

{Generate and save output}

1. Format according to output-template.md
2. Save to {location}
3. {Update state if recurring}

## Output Requirements

- {Format requirement 1}
- {Format requirement 2}
- {Include X, Y, Z}

## Error Handling

- **{Error case 1}:** {How to handle}
- **{Error case 2}:** {How to handle}

## Quality Checklist

Before completing:

- [ ] {Check 1}
- [ ] {Check 2}
- [ ] {Check 3}
