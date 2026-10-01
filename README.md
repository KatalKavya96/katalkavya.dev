# Kavya Katal Portfolio

A premium, responsive portfolio design for Kavya Katal. The site is currently in content collection: only Kavya's name is verified in this repository.

## Start here

Codex and contributors must read `AGENTS.md` first.

The design references are stored in `references/`. They define direction, not literal pixel-perfect requirements. The final implementation must preserve the same visual language while improving spacing, responsiveness, accessibility and factual accuracy.

## Stack

- Next.js App Router
- React + TypeScript (strict)
- CSS variables and custom responsive CSS
- Typed local content; external data adapters may be added when real sources are supplied

## Run locally

```bash
npm install
npm run dev
```

Development mode includes labeled design samples so layout can be reviewed. Production builds omit sample project/profile/contribution cards until verified content is available. All routes currently have `noindex` metadata during content collection.

Use current stable package versions when the project is initialized and commit the lockfile.

## Documentation map

- `docs/PRODUCT_BRIEF.md` — audience, goals and portfolio narrative
- `docs/DESIGN_SYSTEM.md` — visual foundation and page identities
- `docs/INFORMATION_ARCHITECTURE.md` — routes and content hierarchy
- `docs/PAGE_SPEC_*.md` — page-level requirements
- `docs/COMPONENT_SYSTEM.md` — reusable component contracts
- `docs/MOTION_INTERACTION.md` — animation and interaction rules
- `docs/CONTENT_AND_DATA.md` — content schemas and factual-data rules
- `docs/ENGINEERING_ARCHITECTURE.md` — codebase structure
- `docs/ACCESSIBILITY_PERFORMANCE.md` — quality budgets
- `docs/SEO_ANALYTICS.md` — metadata and measurement
- `docs/IMPLEMENTATION_PLAN.md` — phased build sequence
- `docs/QA_CHECKLIST.md` — definition-of-done checks
- `docs/CODEX_WORKFLOW.md` — how Codex should work in this repository
- `docs/CONTENT_INVENTORY.md` — content candidates and missing assets
- `docs/DECISIONS.md` — architecture/product decision log
- `CHANGELOG.md` — meaningful implementation history

## Reference mockups

- `references/01-home-reference.png`
- `references/02-projects-reference.png`
- `references/03-open-source-reference.png`
- `references/04-coding-profiles-reference.png`

## Important

Numbers visible inside design mockups are visual placeholders unless separately verified. Do not ship them as facts.
