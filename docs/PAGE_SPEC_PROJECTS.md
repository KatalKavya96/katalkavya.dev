# Page Spec — Projects

Reference: `references/02-projects-reference.png`

## Identity

This page should feel like a calm product studio, not a portfolio grid.

Distinct hero background: warm evening workspace / laptop / city or studio environment.
Do not use the Home globe.

## Hero

Eyebrow: `Projects`
Headline direction: `Ideas to real systems.`
Supporting copy: concise statement about AI/ML systems, products, open-source engineering and experiments that were designed, built and shipped.

Primary CTA: `Explore projects`
Secondary: `Case studies`

No metrics in the hero.

## Filters

Use a horizontally scrollable domain filter row reflected in the `domain` query parameter. Show the complete curated set, starting with at least six cards and allowing the page to scroll.

Use a single quiet filter row:

- All
- AI / ML
- Agentic AI
- Open Source
- Full Stack / Product
- Experiments

Filtering must animate layout subtly and preserve URL state via query param when reasonable.

## Flagship project

One large feature panel immediately after filters.
Default flagship: Kavya's strongest verified project after content collection. The design preview uses a generic sample panel.

Show:

- name,
- one-sentence purpose,
- max four tags,
- status if factual,
- one CTA,
- large product/TUI visual or muted looping demo.

Do not duplicate the same information in separate side widgets.

## Remaining projects

3-column desktop grid, 1-column mobile.
Cards should be large enough to breathe.
Curate only Kavya's confirmed projects. The development preview may use clearly labeled sample cards to review spacing and visual hierarchy.

New public repositories created after the curation cutoff appear automatically in creation order as experiments. The owner can assign domains, reorder, remove, and restore them in the private editor. Small repositories may be hidden from the public collection there.

## Card anatomy

1. visual/demo area
2. project name + category
3. concise one/two-line description
4. up to three tags
5. arrow/CTA

No giant stack of stats inside project cards.

## Optional final section

`How I build` with four steps: Idea → Build → Iterate → Ship.
Keep it editorial and sparse, not a workflow dashboard.

## Mobile

- Hero image becomes atmospheric background.
- Filters horizontally scroll.
- Flagship media stacks beneath copy.
- No autoplay video on constrained/mobile connections unless lightweight and user-friendly.
