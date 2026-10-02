# Kavya Katal Portfolio

A premium, responsive engineering portfolio for Kavya Katal. Public repositories, authored pull requests, and user-supplied profile URLs now ground the initial content.

## Start here

Codex and contributors must read `AGENTS.md` first.

The design references are stored in `references/`. They define direction, not literal pixel-perfect requirements. The final implementation must preserve the same visual language while improving spacing, responsiveness, accessibility and factual accuracy.

## Stack

- Next.js App Router
- React + TypeScript (strict)
- CSS variables and custom responsive CSS
- Typed content with server-side GitHub, Codeforces, LeetCode, and Kaggle adapters

## Run locally

```bash
npm install
npm run dev
```

The primary pages use rich editorial heroes and scrollable project collections. Mobile layouts stack for readability. All routes currently have `noindex` metadata while personal role details, contact email, and resume are being collected.

## Live data and private project editor

Copy `.env.example` to `.env.local` and set the server-only values there. Never commit `.env.local` or paste tokens into a public issue.

`GITHUB_TOKEN` enables reliable GitHub project, PR, and profile reads. Without it, the site uses dated verified public snapshots when GitHub blocks anonymous requests. Codeforces, LeetCode, and Kaggle metrics update from their public endpoints when available, with dated verified values as fallback. Other linked coding platforms do not show invented metrics.

`/admin` is a private project editor. Create a GitHub OAuth App for the local callback `http://localhost:3000/api/auth/github/callback`, and another for the deployed domain's callback. Set its client ID and secret, plus a random `AUTH_SECRET` of at least 32 characters. Only Kavya's verified GitHub account ID is permitted. Set `GITHUB_CONTENT_TOKEN` to a fine-grained token scoped to this portfolio repository with **Contents: read/write** and **Metadata: read**. The OAuth token verifies the signed-in user; the repository-scoped token remains on the server and saves curation to `src/content/curation.json` through GitHub's Contents API.

In the editor, choose from your GitHub repositories or paste a public repository URL, assign up to four domains, reorder, remove, and restore cards. New public repositories on `KatalKavya96` created after the curation cutoff appear automatically. Manually added organization repositories can be curated in the same editor. Public visitors cannot access these controls.

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
