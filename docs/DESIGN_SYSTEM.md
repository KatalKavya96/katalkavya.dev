# Design System

## 1. Design character

Premium, dark, cinematic, spacious, modern and technically precise.

Reference mood: Apple-level restraint + Linear/Raycast/Vercel clarity, but with an original engineering identity.

## 2. Core palette

Use CSS variables rather than scattering raw values.

Suggested starting tokens:

```css
:root {
  --bg: #050608;
  --bg-soft: #080a0d;
  --surface: rgba(15, 18, 24, 0.72);
  --surface-solid: #0d1015;
  --surface-elevated: #12161d;
  --text: #f5f7fa;
  --text-secondary: #b4bac4;
  --text-tertiary: #777f8b;
  --border: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.16);
  --accent: #8b7cff;
  --success: #55d994;
  --warning: #efb35f;
  --info: #6f92ff;
}
```

Accent colors are semantic and restrained. Do not turn every section into a different color theme.

## 3. Typography

Primary: Geist, Inter or another neutral high-quality grotesk/sans.
Technical/metadata: Geist Mono or JetBrains Mono.

Use system fallbacks and do not ship proprietary font files.

Suggested desktop scale:

- Display XL: 88–104px / 0.95–1.0 line-height
- Display: 64–80px
- H1: 56–72px
- H2: 38–48px
- H3: 24–30px
- Body large: 18–21px
- Body: 15–17px
- Meta: 12–14px

Use fluid `clamp()` values in implementation.

## 4. Layout

- Max outer width: ~1540px
- Main content width: 1280–1400px depending on section
- Minimum desktop page gutters: 48px
- Large-screen gutters: 64–88px
- Mobile gutters: 20–24px
- Grid gap: 20–28px
- Section spacing: 112–160px desktop

The visual mockups are denser than the intended production site. Production should add more breathing room.

## 5. Surfaces

Cards:

- low-contrast border,
- 18–28px radius,
- dark translucent surface,
- subtle inner highlight,
- no giant shadow stacks.

Glass:

- reserve for floating proof chips, header/search surfaces and selected hero overlays,
- avoid glass on every card.

## 6. Hero imagery identity

Each major page must have a distinct environmental metaphor.

### Home

Cosmic/network sphere only here. Represents an interconnected body of work.

### Projects

Warm evening studio/workspace with laptop or product environment. Represents making and shipping.

### Open Source

Dusk mountain ridge, illuminated trail, path or connected peaks. Represents public contribution and accumulated progress.

### Coding Profiles

Dark warm coding desk, monitor, city lights/window, intimate work environment. Represents practice and consistency.

### Future pages

Lab, Journey and About must receive their own visual motif. Do not reuse the four above.

Hero visuals must have:

- sufficient dark overlay,
- no essential information baked into the image,
- responsive focal positioning,
- static fallback,
- optimized delivery.

## 7. Imagery policy

Use imagery as atmosphere and context, not decoration overload.
Avoid random stock photos unrelated to the content.
Prefer custom/generated art direction or authentic project screenshots.

## 8. Icons

Use one consistent icon library.

- 16–20px inline icons
- 22–28px feature icons
- no mix of outline, emoji and skeuomorphic icons in the same interface
- brand logos may use their actual identity where appropriate

## 9. Buttons

Primary: light/white surface on dark background.
Secondary: subtle border/transparent surface.
Tertiary: text + arrow.

Do not place more than two large buttons in a hero.

## 10. Tags

Small, quiet pills. Tags communicate scope, not decoration.
Display up to four; omit low-value tags.

## 11. Navigation

Desktop:
`Home · Projects · Open Source · Coding Profiles/Lab · Journey · About`
with a single right-side CTA: `Let's connect`.

Use an active dot/underline rather than a heavy active tab.

Mobile: compact menu/drawer; retain immediate access to Projects and Contact.

## 12. Information density test

Before adding any element ask:

- Does it add new information?
- Is it needed at this hierarchy level?
- Is this the best place for it?
- Can it be revealed after interaction instead?

If not, remove it.
