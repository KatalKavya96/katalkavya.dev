# Codex Master Build Prompt

Copy/paste this into Codex at the start of the implementation session.

---

You are implementing my personal engineering portfolio in this repository.

Before writing code, read `AGENTS.md` in full and then read all documentation it requires. Treat `AGENTS.md` as the repository development contract. Inspect the reference images under `references/`, but do not copy their placeholder metrics or make the production site as dense as the concept mockups.

The portfolio's core identity is:

- AI/ML engineering
- Agentic AI and multi-agent systems
- Open-source engineering
- software/product engineering
- technical exploration and problem solving

Visual direction:

- premium modern dark UI
- Apple-inspired restraint, not an Apple clone
- large high-quality typography
- generous negative space
- minimal, purposeful glass surfaces
- cinematic but readable page-specific backgrounds
- subtle purposeful motion
- excellent responsive behavior

Critical visual rule: every major page must have a distinct hero identity. The cosmic/network sphere is Home-only. Projects uses a warm builder workspace. Open Source uses a mountain/trail contribution metaphor. Coding Profiles uses a warm coding-desk/city-window environment.

Critical content rule: do not invent stats, ranks, PRs, stars, contribution counts, dates or outcomes. Treat any numbers visible in design mockups as placeholders unless verified in repository content or explicitly supplied by me.

Start with the implementation plan in `docs/IMPLEMENTATION_PLAN.md` and build in phases. Do not jump to later pages before the shared foundation and current phase are stable.

For this session:

1. inspect the repository and report its current state,
2. identify the current implementation phase,
3. propose the smallest coherent plan for the next phase,
4. implement it with production-quality TypeScript and responsive behavior,
5. run formatting/lint/typecheck/build/tests as available,
6. update `CHANGELOG.md` and `docs/DECISIONS.md` where appropriate,
7. summarize changed files, validation and any content still needing verification.

Do not introduce unnecessary dependencies or broad unrelated refactors. Prefer server components/static rendering, semantic HTML, accessible interactions and optimized media. Respect reduced motion.

The site must feel spacious and pleasant. When in doubt, remove low-value UI rather than shrinking or crowding it.
