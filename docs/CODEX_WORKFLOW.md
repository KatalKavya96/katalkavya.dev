# Codex Workflow

## Before coding

Codex must:

1. read `AGENTS.md`,
2. read the relevant specs,
3. inspect the existing implementation before replacing anything,
4. inspect the matching image in `references/`,
5. identify whether requested content is verified or placeholder.

## Planning format

For a non-trivial task, first produce a concise implementation plan containing:

- files to touch,
- components/data affected,
- responsive considerations,
- accessibility/performance risks,
- what will be validated.

Do not produce a huge speculative architecture document for a small UI edit.

## During implementation

- preserve established design tokens,
- reuse components where semantics match,
- do not create generic abstractions prematurely,
- keep content outside presentation components,
- avoid broad refactors not required by the task,
- preserve route behavior unless explicitly changing it.

## Visual fidelity

Use references for:

- hierarchy,
- tone,
- composition,
- density,
- material language.

Do not blindly reproduce mockup text, fake metrics or baked UI screenshots.
Production should be calmer and more spacious than the mockup if there is tension.

## After implementation

Codex must run the project's available equivalents of:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

Run tests if present.

Then summarize:

- what changed,
- validation performed,
- any intentionally deferred work,
- any content/data still needing verification.

Update `CHANGELOG.md` for meaningful user-visible changes.

## When requirements conflict

Priority:

1. explicit current user request
2. `AGENTS.md`
3. relevant page/product/design spec
4. existing implementation conventions
5. best engineering judgment

If the current user request intentionally changes a rule, update the governing documentation in the same change so the repository remains consistent.
