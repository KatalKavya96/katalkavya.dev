# Engineering Architecture

## Stack

Use a modern React/Next.js architecture with current stable dependencies at initialization.

Recommended:

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- `motion`/Framer Motion only where animation adds value
- Lucide React for system icons
- Zod only where runtime validation is actually useful
- pnpm

## Suggested structure

```text
src/
  app/
    (site)/
      page.tsx
      projects/
        page.tsx
        [slug]/page.tsx
      open-source/page.tsx
      coding/page.tsx
      lab/page.tsx
      journey/page.tsx
      about/page.tsx
    api/                 # only when necessary
    layout.tsx
    globals.css
  components/
    layout/
    hero/
    projects/
    open-source/
    coding/
    shared/
  content/
  lib/
    github/
    content/
    seo/
    utils/
  styles/
public/
  media/
    projects/
    backgrounds/
    profiles/
  icons/
```

## Rendering strategy

- Static/server-rendered by default.
- Client components only for filters, command palette, video controls, animated interactive diagrams, etc.
- Use revalidation for public external data.
- Do not block page render on live third-party API responses.

## Data adapters

Create an adapter boundary so UI consumes normalized internal models.
Example:

```text
GitHub API -> github adapter -> normalized contribution/project data -> UI
```

UI must not know raw external API response shapes.

## Styling

Centralize design tokens in CSS variables.
Tailwind utilities are fine, but recurring visual recipes should become components/classes rather than 40-class copy-paste strings.

## Images and video

- Generate responsive sizes.
- Prefer AVIF/WebP for background imagery.
- MP4/WebM demo loops compressed aggressively.
- Provide posters.
- Lazy-load below-fold assets.

## Testing

At minimum:

- typecheck
- lint
- production build
- critical component/unit tests where logic exists
- Playwright smoke tests for primary routes when implementation stabilizes

Recommended smoke flows:

- navigation works,
- project filters work,
- project detail opens,
- external link attributes are correct,
- mobile menu works,
- reduced-motion page is usable.

## Dependency discipline

Before adding a package ask:

- Is this needed?
- Can native platform/CSS do it cleanly?
- What is the bundle/runtime cost?
- Is it maintained?

Document significant dependency choices in `docs/DECISIONS.md`.
