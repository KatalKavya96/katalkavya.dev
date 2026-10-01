# QA Checklist

Use this before every meaningful merge/release.

## Content

- [ ] No invented metrics, dates, ranks, PR numbers, stars or outcomes.
- [ ] Project descriptions clearly state what was built.
- [ ] Collaborative work identifies the user's contribution accurately.
- [ ] Links point to correct repositories/PRs/profiles.
- [ ] No placeholder copy is visible in production.

## Visual hierarchy

- [ ] Page feels spacious rather than dashboard-like.
- [ ] There is one clear hero message.
- [ ] Hero has no more than 2 CTAs.
- [ ] Metric strip has no more than 4 values.
- [ ] Grid cards are not overloaded with tags/stats.
- [ ] Major pages use distinct hero backgrounds.
- [ ] The Home planet motif is not reused elsewhere.

## Responsive

- [ ] 360px
- [ ] 390/430px
- [ ] tablet portrait
- [ ] laptop ~1366/1440px
- [ ] desktop 1600–1920px
- [ ] ultra-wide does not stretch content excessively

## Interaction

- [ ] keyboard navigation works
- [ ] visible focus states
- [ ] active filters announced/understandable
- [ ] no hover-only information
- [ ] external links safe
- [ ] videos can pause / do not trap attention

## Accessibility

- [ ] heading hierarchy correct
- [ ] contrast sufficient
- [ ] image alt text appropriate
- [ ] reduced motion respected
- [ ] screen reader names exist for icon-only controls

## Performance

- [ ] no giant unoptimized hero image
- [ ] below-fold images lazy-load
- [ ] demo videos compressed/lazy
- [ ] no unnecessary client components
- [ ] no heavy animation dependency for trivial effects
- [ ] CLS visually negligible

## Engineering

- [ ] format passes
- [ ] lint passes
- [ ] typecheck passes
- [ ] production build passes
- [ ] tests/smoke tests pass where present
- [ ] `CHANGELOG.md` updated
- [ ] `docs/DECISIONS.md` updated if needed
