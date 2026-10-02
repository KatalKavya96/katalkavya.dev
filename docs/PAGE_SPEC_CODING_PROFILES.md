# Page Spec — Coding Profiles

Reference: `references/04-coding-profiles-reference.png`

## Identity

This page should communicate practice, consistency and exploration — not status anxiety or competitive-score obsession.

Distinct hero background: warm, dark coding desk / monitor / city-window environment.
Do not use globe or mountain motifs.

## Hero

Eyebrow: `Coding Profiles`
Headline direction: `Code, solve, build, grow.`
Supporting copy: coding activity, repositories, problem solving and technical exploration across selected platforms.

Primary CTA: `View GitHub`
Secondary CTA: `Explore profiles`

### Floating platform chips

Five compact chips on desktop: GitHub, LeetCode, Kaggle, HackerRank, and Codeforces. The chips use official platform marks and link to Kavya's profiles. Hide them on phones, where the desk image and copy need the space.

## Summary strip

Show four verified values: public GitHub repositories, merged authored PRs, LeetCode problems solved, and Codeforces contest rating. Fetch current values server-side where reliable, retaining dated verified snapshots for upstream failures. Never use counts copied from the reference artwork.

Do not show rank/percentile unless verified, current and actually useful.

## Primary profiles

Show four primary profile cards: GitHub, LeetCode, Codeforces, and Kaggle. Each live value comes from that platform's public endpoint when available, with a dated verified fallback. Secondary platforms stay linked without fabricated metrics.
Order: GitHub, LeetCode, Kaggle, Codeforces.

Each card contains:

- platform and handle,
- why it matters,
- one small visualization,
- only relevant verified metrics,
- link.

Do not recreate the entire platform UI.

## Secondary profiles

Use linked cards for CodeChef, HackerRank, GeeksforGeeks, Hugging Face, and Tableau Public. As Kavya requested, CodeChef, HackerRank, GeeksforGeeks, and Tableau show no numbers without a dependable public metrics feed.

## GitHub activity

The GitHub card shows a compact 26-week authored PR preview. A separate 52-week ribbon beneath the four cards gives the broader timeline. Both use authored PR dates, not invented activity.

## Languages

If shown, avoid fake percentages.
Prefer `Used recently in` / project-backed language evidence over arbitrary skill percentages.

## Mobile

- Hero platform chips removed or simplified.
- Stats become 2×2.
- Cards stack.
- Contribution graph scrolls horizontally or uses a mobile-specific condensed view.

## Visual composition

At the 1672×941 reference viewport, the warm dusk desk hero, four-value strip, four graph cards, and PR activity ribbon are visible together. The hero image is the main light source; cards use quiet, dark material layers. A small command search trigger sits in the header. Hover and route motion remain subtle and obey reduced-motion settings.
