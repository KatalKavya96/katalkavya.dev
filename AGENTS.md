# AGENTS.md — Portfolio Development Contract

This file is the highest-priority project instruction for Codex and any coding agent working in this repository.

## 1. Mission

Build and maintain a premium, modern, minimal personal portfolio that communicates Kavya's engineering identity quickly and proves depth progressively.

The site must make a visitor understand, without hunting:

- what Kavya builds,
- where Kavya's strongest technical depth is,
- what Kavya has actually shipped,
- which open-source systems Kavya has contributed to,
- how Kavya thinks and learns as an engineer,
- and where to inspect evidence: demos, repositories, pull requests, architecture, code and case studies.

This is not a generic resume template, not a dashboard, and not a neon hacker website. It is a calm, high-craft engineering portfolio.

## 2. Mandatory reading order before any implementation

Before changing UI, architecture, content structure, dependencies, data fetching or animation, read:

1. `AGENTS.md`
2. `docs/PRODUCT_BRIEF.md`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/INFORMATION_ARCHITECTURE.md`
5. the relevant `docs/PAGE_SPEC_*.md`
6. `docs/COMPONENT_SYSTEM.md`
7. `docs/MOTION_INTERACTION.md`
8. `docs/CONTENT_AND_DATA.md`
9. `docs/ENGINEERING_ARCHITECTURE.md`
10. `docs/ACCESSIBILITY_PERFORMANCE.md`
11. `docs/QA_CHECKLIST.md`

If a proposed change conflicts with these files, stop and resolve the conflict deliberately. Do not silently drift.

## 3. Non-negotiable product principles

### 3.1 Spacious over dense

- Every page must feel calm and breathable.
- Remove secondary information before shrinking it.
- Avoid dashboard-style information density.
- Prefer one dominant idea per viewport.
- No section exists merely to fill space.

### 3.2 Proof over self-claims

Avoid unsupported phrases such as "expert", "best", "10x developer", "top engineer", or arbitrary proficiency percentages.
Use evidence instead: shipped projects, contribution links, architecture, code, demos, decisions and verified metrics.

### 3.3 Progressive depth

The site should reveal depth in layers:

1. identity,
2. selected work,
3. case study,
4. architecture/decisions,
5. code/evidence.

Do not force technical detail into the first screen.

### 3.4 Cohesive system, distinct pages

All pages use the same design system, typography, spacing, surfaces, navigation and interaction language.
However, major pages MUST NOT reuse the same hero background concept.

- Home: dark cosmic/network sphere motif.
- Projects: warm cinematic builder workspace / laptop environment.
- Open Source: dusk mountain ridge / illuminated contribution path metaphor.
- Coding Profiles: intimate coding desk / city-window environment.

Never place the same planet/globe motif on Projects, Open Source and Coding Profiles.

### 3.5 Apple-inspired, not Apple-copied

Aim for premium restraint, strong typography, precise spacing, material depth, subtle blur, crisp hierarchy and polished motion.
Do not copy Apple layouts, assets, icons, product imagery, wording or trademarked presentation verbatim.

## 4. Data integrity rules

- NEVER invent GitHub counts, PR numbers, stars, ranks, streaks, solved-problem counts, organizations, dates, job history, awards or outcomes.
- Never treat mockup text as factual data.
- Unverified values must remain absent or clearly marked as placeholders in development only.
- Production UI must render verified content only.
- GitHub-derived values should come from a typed data adapter when practical.
- Coding-platform values may be manually curated if APIs are unreliable, but must include a `lastVerified` field in the content model.

## 5. UI density limits

Unless a page spec explicitly overrides this:

- Hero: max 2 CTAs.
- Hero floating proof items: max 4.
- Metric strip: max 4 metrics.
- Major grid: max 3 cards per row on large screens.
- Tag row: show max 4 tags before collapsing/omitting.
- Navigation: max 6 primary links plus one CTA.
- Avoid two dense data sections back-to-back.
- Keep section spacing generous: 112–160px desktop, 72–104px tablet, 56–80px mobile.
- For the current primary-page design, Home, Projects, Open Source, and Coding compose hero and selected evidence within one common desktop viewport. Curate content to preserve readability; phones use a vertical flow.

## 6. Visual rules

- Dark, near-black foundation with restrained elevated surfaces.
- One primary cool accent family; green/amber may indicate state, not decorate everything.
- Large editorial headings with high contrast.
- Use glass effects sparingly and only when they help layering.
- Background photography/illustration must remain subordinate to text.
- Use soft overlays to protect readability.
- Avoid excessive gradients, glow, particles, noisy borders and ornamental widgets.
- Do not make every card visually equal. Establish a clear hierarchy.

## 7. Interaction rules

- Motion must communicate hierarchy, state, depth or navigation.
- No constant movement that competes with reading.
- Hover movement should generally stay within 2–6px.
- Respect `prefers-reduced-motion` everywhere.
- Autoplay media must be muted, non-blocking and have a poster/fallback.
- Use route transitions and reveal animations subtly; never delay content for animation.

## 8. Engineering rules

- TypeScript strict mode.
- No `any` unless documented in an unavoidable integration boundary.
- Prefer server components by default; add client components only for interaction.
- Keep content separate from components.
- No project/profile copy hard-coded deep inside presentation components.
- Components should be small, composable and named by purpose.
- Prefer semantic HTML over div-only structures.
- Every interactive element must be keyboard accessible.
- No dependency may be added solely for a trivial effect achievable cleanly with CSS.
- Do not add heavy WebGL/3D libraries unless the visual cannot be achieved performantly otherwise.
- Use `next/image` or the framework's optimized image path for production media.
- All external links must safely open with appropriate `rel` attributes.
- Run formatting, linting, type checking and build validation before considering work complete.

## 9. Content hierarchy

Prioritize after Kavya supplies evidence:

1. Kavya's strongest verified flagship work.
2. Meaningful verified open-source engineering contributions, if applicable.
3. Shipped product work with clear evidence, if applicable.
4. Technical experiments and learning lab.
5. Coding/problem-solving profiles, if relevant.

Do not dump every repository or classroom exercise onto the main Projects page. Curate.

## 10. Responsive behavior

Design desktop first only as a visual reference, not as the implementation model.
Every component must be intentionally designed for:

- 360–430px phones,
- tablets,
- common laptops,
- large desktop screens.

On mobile:

- reduce decorative media before reducing text clarity,
- collapse filters horizontally or into a compact selector,
- stack cards,
- hide low-value floating proof chips,
- never rely on hover.

## 11. Update discipline

For every meaningful change:

1. identify the page/feature and governing docs,
2. state what is changing and why,
3. implement the smallest coherent change,
4. validate responsive/accessibility/performance implications,
5. update `CHANGELOG.md`,
6. update `docs/DECISIONS.md` if architecture, data, visual rules or behavior changed,
7. update the relevant spec if the intended product behavior itself changed.

Never let implementation become the only source of truth.

## 12. Definition of done

A task is not done until:

- it matches the relevant visual/product spec,
- copy is concise and factual,
- no fake metrics are present,
- mobile/tablet/desktop are checked,
- keyboard/focus behavior is correct,
- reduced motion is handled,
- no avoidable layout shift is introduced,
- media is optimized,
- typecheck/lint/build pass,
- and docs/changelog are current.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
