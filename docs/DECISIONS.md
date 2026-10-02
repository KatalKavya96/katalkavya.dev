# Decisions Log

Record durable product/engineering decisions here.

## D-001 — Visual system

**Status:** Accepted

Use a dark, cinematic, Apple-inspired but original visual language: large typography, generous negative space, restrained glass, subtle motion and evidence-led content.

## D-002 — Page-specific hero identities

**Status:** Accepted

The Home cosmic sphere motif is exclusive to Home. Projects, Open Source and Coding Profiles use distinct environmental backgrounds to avoid repetitive visual identity.

## D-003 — Density

**Status:** Accepted

Production layouts will be more spacious than the concept mockups. When forced to choose between more content and better hierarchy, curate/remove content.

## D-004 — Data integrity

**Status:** Accepted

Mockup metrics are not production data. No public stats or accomplishment claims ship without verification.

## D-005 — Static-first architecture

**Status:** Accepted

Pages render from typed normalized content and server/static sources. Third-party API availability must not block core page rendering.

## D-006 — Kavya identity and content gate

**Status:** Accepted  
**Date:** 2026-10-01

The repository's previous Vardhman names, projects, roles, and metrics were reference material. The initial implementation used generic development samples. D-008 supersedes that temporary content gate with public-source-backed entries. The site remains `noindex` until Kavya reviews personal roles, contact details, and media.

Filters, project detail pages, contribution timelines, and coding activity graphics follow the real content. They are deferred rather than filled with fabricated examples.

## D-007 — Implementation and imagery

**Status:** Accepted  
**Date:** 2026-10-01

Use Next.js App Router, strict TypeScript, and CSS variables with custom CSS. Native CSS handles the restrained visual effects without an animation or utility CSS dependency. Home's sphere is CSS-drawn. Projects, Open Source, and Coding use separate generated images optimized to WebP and served through `next/image`.

## D-008 — Verified public content and one-screen desktop layout

**Status:** Superseded by D-009
**Date:** 2026-10-01

The Git remote identifies Kavya's public GitHub account. Repository READMEs and authored PRs supply the initial project and contribution descriptions; Kavya supplied eight additional profile URLs. The four primary pages now fit a curated hero and evidence row in a common desktop viewport. Phones retain vertical scrolling for legibility. The dated GitHub snapshot records 177 authored and 148 merged PRs; the site shows only the merged count with its verification date. Personal role details and outcomes beyond public evidence remain conservative.

## D-009 — Live public evidence and private curation

**Status:** Accepted
**Date:** 2026-10-02

Kavya requested six visible projects, automatic discovery of newer public repositories, repository-specific PR histories, and an owner-only editor. The four main pages may scroll on desktop to keep that evidence legible. GitHub repository and PR reads are server-side and cached, with dated verified snapshots when an upstream endpoint fails. Codeforces, LeetCode, and Kaggle use their respective public endpoints; platforms without reliable public data remain links without fabricated metrics.

The editor uses GitHub OAuth to verify Kavya's numeric account ID, an HMAC-signed HttpOnly session, and a separate repository-scoped Contents token to write `src/content/curation.json`. Public visitors have no editor controls or write endpoint access. Auto-discovered projects become explicit curation entries when reordered or assigned domains. Subtle background motion and the organization ribbon stop when reduced motion is requested.

## D-010 — Coding Profiles reference composition

**Status:** Accepted
**Date:** 2026-10-02

Use a warm, photorealistic dusk desk image tailored to the Coding Profiles reference. Fit the hero, four verified summary values, four primary graph cards, and PR activity ribbon in the first screen at the supplied reference viewport while allowing mobile cards to stack and scroll. The header command search indexes public pages, current curated projects, and profile links. Unsupported coding platforms remain linked without invented numbers, per Kavya's direction.

## D-011 — Unique organization ribbon

**Status:** Accepted
**Date:** 2026-10-02

The Open Source ribbon renders each verified organization once. It measures the available space and pans that single track only when it overflows, reversing smoothly at the ends. Its label has a separate column and the moving links remain clipped to the track. Motion pauses during interaction and is disabled for reduced-motion visitors.

---

## Decision template

### D-XXX — Title

**Status:** Proposed / Accepted / Reversed
**Date:** YYYY-MM-DD

**Context:**

**Decision:**

**Consequences:**
