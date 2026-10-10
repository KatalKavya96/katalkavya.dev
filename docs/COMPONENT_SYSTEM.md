# Component System

Build reusable primitives before page-specific duplication.

## Layout primitives

### `SiteHeader`

- fixed/sticky transparent-to-solid behavior
- active route indicator
- global command/search trigger optional
- `Let's connect` CTA

### `QuickDock`

- compact persistent shortcuts for Home, Projects, Open Source, Coding and Contact
- supplements rather than replaces the semantic primary header
- exposes the current route and keyboard-visible labels
- uses restrained size feedback and disables transition motion when requested
- uses the attributed spring-magnification primitive adopted from the local `n-portfolio` reference

### `BlurFade`

- attributed reveal primitive adopted from the local `n-portfolio` reference
- used for major Home compositions and reusable project cards
- reveals once on entry and renders statically when reduced motion is requested

### `PageShell`

Owns max-width, horizontal gutters and section spacing.

### `SectionHeader`

Eyebrow + heading + optional action.

## Hero components

### `CinematicHero`

Props should support:

- eyebrow
- title
- description
- primary/secondary CTA
- media/background variant
- floating evidence slots

Do not make a single over-generalized component if variants become unreadable. Shared layout + page-specific visual modules is preferred.

### `ProofChip`

Small floating translucent evidence card.
Limit content to title + one short line + optional state dot.

## Work components

### `ProjectFilter`

Accessible segmented/chip controls.
Synchronize selected domain with URL where appropriate.

### `FeaturedProject`

Large editorial project panel with media.

### `ProjectCard`

Reusable card with:

- media
- name/category
- concise description
- max three/four tags
- CTA

### `ProjectDemo`

Handles poster image, optional muted looping video and reduced-motion fallback.

## Open-source components

### `ContributionCard`

Large card for only important contributions.

### `ContributionRow`

Compact row for timelines/list pages.

### `ContributionTimeline`

Milestone-based, not raw-commit-based.

### `OrganizationMark`

Logo/name + concise relationship description.

## Coding components

### `ProfileCard`

Platform, handle, small activity visualization, verified stats, external link.

### `ActivityGrid`

Custom lightweight contribution/activity visualization. Must be accessible via text summary.

### `PlatformChip`

Small floating/secondary platform link.

## Shared data components

### `MetricStrip`

Max four items. Avoid reusing on every page unless it adds page-specific value.

Home may use the metric treatment inside one narrative proof panel. Values must come from the same live adapters and dated fallbacks used elsewhere.

### `TagList`

Handles overflow by limiting rather than wrapping endlessly.

### `ExternalLink`

Consistent external-link icon and safe rel handling.

## Feedback and navigation

### `CommandPalette`

Optional progressive enhancement. Never required for basic navigation.

### `BackToTop` / route utilities

Keep unobtrusive.

## Composition rule

Prefer page-specific composition of shared primitives over a generic dashboard/card engine.
