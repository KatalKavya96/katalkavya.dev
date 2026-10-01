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

**Status:** Accepted  
**Date:** 2026-10-01

The Git remote identifies Kavya's public GitHub account. Repository READMEs and authored PRs supply the initial project and contribution descriptions; Kavya supplied eight additional profile URLs. The four primary pages now fit a curated hero and evidence row in a common desktop viewport. Phones retain vertical scrolling for legibility. The dated GitHub snapshot records 177 authored and 148 merged PRs; the site shows only the merged count with its verification date. Personal role details and outcomes beyond public evidence remain conservative.

---

## Decision template

### D-XXX — Title

**Status:** Proposed / Accepted / Reversed
**Date:** YYYY-MM-DD

**Context:**

**Decision:**

**Consequences:**
