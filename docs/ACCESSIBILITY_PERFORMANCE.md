# Accessibility & Performance

## Accessibility baseline

Target WCAG 2.2 AA for core flows.

Requirements:

- semantic landmarks,
- one logical H1 per page,
- visible keyboard focus,
- full keyboard navigation,
- meaningful image alt text,
- decorative images use empty alt,
- controls have accessible names,
- color is never the only state indicator,
- sufficient contrast over cinematic imagery,
- no hover-only essential information.

## Motion accessibility

Respect `prefers-reduced-motion` globally.
Autoplay video should become poster/static state when reduced motion is requested.

## Performance goals

Target on production pages:

- LCP <= 2.5s on realistic mobile connection
- CLS <= 0.1
- INP <= 200ms
- Lighthouse performance/accessibility/SEO in the 90s, with 95+ preferred for key pages

Do not chase a score by damaging UX, but investigate regressions.

## Budgets

- Keep above-the-fold JS minimal.
- Do not load video until needed.
- Avoid heavy 3D libraries for atmosphere.
- Hero background should be optimized and responsive.
- Fonts: minimal weights/subsets.
- Icons: tree-shaken, no full library payload.

## Background image readability

Every cinematic hero needs:

- dark gradient overlay,
- strong text contrast,
- responsive crop/focal point,
- no text baked into background,
- no critical visual behind body copy.

## Mobile

Test at 360px width.
Nothing may require horizontal page scrolling, except intentionally scrollable data visualizations/chip rows with visible affordance.
