# Motion & Interaction

## Principle

Motion exists to explain depth, hierarchy, state or continuity.
If removing an animation does not reduce understanding or delight, it is optional.

## Motion language

- Enter/reveal: 350–650ms
- Hover: 160–240ms
- Route/section transitions: 400–700ms
- Easing: smooth spring or cubic-bezier with minimal overshoot

Avoid excessive bouncy motion.

## Hero backgrounds

Use very slow, subtle parallax or light movement.

- 8–18px total movement range
- no rapid particles
- no continuously orbiting dozens of elements

## Floating chips

May drift 2–5px over long intervals if motion is not distracting.
Pause/disable for reduced motion.

## Project cards

On hover:

- border/highlight adjustment
- media scale <= 1.02
- translateY <= 4px
- arrow moves a few pixels

Do not lift cards dramatically.

## Filters

Use layout animation to reflow cards. Preserve position and avoid jumpy re-rendering.

## Demo media

- muted
- loop only when valuable
- lazy load below fold
- poster image first
- pause when out of viewport when practical

## Scroll

No forced scroll hijacking.
No horizontal-scroll storytelling for core content.
Sticky sections are allowed only if they remain intuitive on trackpad, mouse and mobile.

## Reduced motion

Under `prefers-reduced-motion: reduce`:

- remove parallax/drift,
- replace video autoplay with poster,
- simplify layout transitions,
- keep state changes immediate and understandable.

# Current live motion

The page-specific hero images drift slowly without moving text. Home's sphere has a restrained ambient motion. The Open Source organization ribbon moves slowly, pauses on hover, and stops for `prefers-reduced-motion`. PR timelines open on pointer hover or keyboard focus; clicking pins a timeline until it is clicked again. Mobile visitors use tap. The corner live dot pulses gently and also respects reduced motion.
