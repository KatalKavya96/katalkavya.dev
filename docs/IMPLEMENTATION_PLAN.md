# Implementation Plan

Build in phases. Do not attempt every effect at once.

## Phase 0 — Foundation

- initialize Next.js + TypeScript + Tailwind + pnpm
- establish lint/type/build scripts
- create design tokens
- add global page shell/header/footer
- set metadata foundation
- copy optimized reference/placeholder assets

Exit criteria: clean responsive shell, no page-specific polish yet.

## Phase 1 — Home

- cinematic Home hero
- network/globe visual treatment
- capability strip
- 3 featured project cards
- minimal proof/exploration sections

Exit criteria: Home fully responsive and polished.

## Phase 2 — Projects

- unique warm workspace hero
- domain filters
- flagship project module
- curated project grid
- content model + project detail route shell

Exit criteria: filter state and mobile layouts solid.

## Phase 3 — Project case study template

- problem/context
- architecture
- engineering decisions
- demo/media
- code/evidence links
- learnings

Use Kavya's strongest confirmed project as the first full case study after content collection.

## Phase 4 — Open Source

- unique mountain/path hero
- verified proof strip
- featured contribution cards
- timeline
- organization section
- GitHub adapter where justified

## Phase 5 — Coding Profiles

- unique coding desk hero
- profile data model
- four primary profile cards
- GitHub activity visualization
- lightweight secondary-profile links

## Phase 6 — Lab / Journey / About

Build with the same system but distinct page motifs.
Do not design them as copies of Projects.

## Phase 7 — Data integrations

- GitHub server adapter/caching
- verified coding-profile data collection
- graceful fallback states

Do not block earlier UI progress on external APIs.

## Phase 8 — Polish

- motion refinement
- keyboard and focus pass
- reduced-motion pass
- video compression
- image tuning
- Playwright smoke tests
- SEO/OG
- final performance audit

## Priority rule

Correct hierarchy, strong copy, real proof and excellent responsive layout come before decorative animation.
