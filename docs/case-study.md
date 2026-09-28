# MOTION / 01 — Case Study Draft

> **Status:** Draft for review  
> This is a working draft. Read it, adjust anything that does not sound like you, and only publish it later inside your personal portfolio.

## Project Overview

**MOTION / 01** is a creative web development experiment focused on using motion as part of the experience rather than as decoration.

The project explores how typography, scroll, pointer input, responsive behavior, and animation can work together to create a simple but intentional digital narrative.

**Role:** Creative Developer  
**Year:** 2026  
**Stack:** HTML, CSS, JavaScript, GSAP, ScrollTrigger, Vite  
**Live experience:** https://arturo0427.github.io/training-motion/  
**Source code:** Add GitHub repository URL here

---

## 01 — The Idea

The project started with a simple idea:

> **Motion is not decoration.**

The goal was not to build a page with as many animations as possible. The goal was to understand how motion can support hierarchy, rhythm, interaction, and storytelling.

The experience follows a progression:

1. **Digital Experiences In Motion.**
2. **Motion is not decoration.**
3. **Control the rhythm.**
4. **Move. React. Respond.**
5. **Make people feel something.**

Each section was designed to have a different level of visual energy.

The motion curve moves from impact, to calm, to energy, to interaction, and finally back to calm.

---

## 02 — Visual Direction

Before adding animation, the project was designed as a static experience.

The visual direction is intentionally minimal:

- large editorial typography;
- strong visual hierarchy;
- generous negative space;
- asymmetric compositions;
- a mostly monochromatic palette;
- restrained use of decorative elements.

The goal was to create a composition strong enough to work without JavaScript.

Motion was added only after the structure, hierarchy, and responsive layout were defined.

This process reinforced an important principle:

> A weak composition does not become strong just because it moves.

---

## 03 — Storytelling Through Motion

Motion was treated as part of the narrative.

### Hero

The hero establishes the first moment of impact.

The headline enters in a short staggered sequence, followed by secondary information.

The goal was to create hierarchy without delaying access to the content.

### Manifesto

The manifesto slows the experience down.

Instead of continuous movement, it uses a one-time reveal to introduce the idea:

> **Motion is not decoration.**

This section acts as a pause after the hero.

### Rhythm

The **Control the rhythm** section increases the visual energy.

Its three lines move horizontally in different directions while the user scrolls.

The animation is scrubbed, meaning the movement is directly connected to scroll progress.

This creates a stronger relationship between user input and visual rhythm.

### Interaction

The **Move. React. Respond.** section becomes the most interactive moment of the experience.

On desktop, a visual element reacts directly to pointer movement.

On touch devices, the interaction changes to a scroll-driven movement instead of attempting to reproduce mouse behavior.

### Finale

The final section reduces motion again.

The typography is revealed with a simple entrance animation around the message:

> **Make people feel something.**

The goal is to finish with a calmer moment after the interaction peak.

---

## 04 — Responsive Interaction

One of the main decisions in the project was not to treat mobile as a smaller version of desktop.

The interaction model changes depending on the input capabilities of the device.

### Desktop

For devices with a fine pointer and hover support, the visual element follows the pointer.

The interaction uses:

- pointer coordinates;
- `getBoundingClientRect()`;
- GSAP transforms;
- `gsap.utils.clamp()`;
- `gsap.quickTo()`.

The visual is constrained so it remains inside the interaction section.

### Touch Devices

Touch devices do not have the same pointer behavior.

Instead of simulating a mouse interaction, the visual responds subtly to scroll with movement and scale.

This keeps the interaction appropriate for the device while preserving the same conceptual role.

The main lesson was:

> Responsive design is not only about changing layout. Interaction should also adapt to how the device is actually used.

---

## 05 — Technical Challenge: Pointer Coordinates

The pointer interaction was one of the most useful technical challenges in the project.

At first, moving the visual directly toward `clientX` and `clientY` was not enough.

The browser reports pointer coordinates relative to the viewport, while the visual has its own position inside the section and may already be transformed.

The solution required calculating:

- the section bounds;
- the visual's real rendered bounds;
- the visual center;
- the current GSAP `x` and `y` transform values;
- the pointer position relative to that center;
- the allowed movement limits.

The resulting value is constrained with `gsap.utils.clamp()` before being passed to the animation.

Another issue appeared when the pointer remained still while the user scrolled.

The mouse coordinates had not changed, but the section had moved relative to the viewport.

The interaction therefore recalculates the visual position during scroll as well as pointer movement.

This challenge helped clarify the difference between:

- viewport coordinates;
- local element coordinates;
- layout position;
- transform position.

---

## 06 — Progressive Enhancement

The project was designed so the content remains understandable without animation.

The page structure and visual hierarchy are defined in HTML and CSS first.

JavaScript enhances the experience instead of being required for the page to make sense.

The hero content is not hidden permanently in CSS while waiting for JavaScript.

If the animation layer fails, the content remains visible.

This approach also supports reduced-motion users more safely.

---

## 07 — Reduced Motion and Accessibility

The project respects:

```css
prefers-reduced-motion: reduce
```

When reduced motion is enabled, the animation systems return early and the page remains static and readable.

Other accessibility decisions include:

- semantic page structure;
- one main `h1`;
- structured section headings;
- section relationships with `aria-labelledby`;
- decorative visuals hidden from assistive technologies;
- visible keyboard focus;
- descriptive links;
- accessible text contrast.

During the final Lighthouse review, the secondary text color was found to have insufficient contrast against the background.

The original muted color:

```text
#727272
```

was changed to:

```text
#686868
```

This preserved the visual hierarchy while improving readability.

---

## 08 — Performance

Performance was measured after the project was deployed instead of being optimized based only on assumptions.

Final Lighthouse results:

| Category | Desktop | Mobile |
| --- | ---: | ---: |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

The project remains intentionally lightweight.

The main animation strategy relies primarily on transform and opacity-related properties instead of repeatedly changing layout-heavy properties.

The performance review also reinforced another lesson:

> A Lighthouse warning is not automatically a problem that needs code changes.

Potential optimizations were evaluated based on their actual effect on the experience and measured metrics before deciding whether they were worth implementing.

---

## 09 — What I Learned

This project changed the way I think about creative development.

At the beginning, it was easy to think mainly about how elements should move.

By the end, the more important question became:

> **Why should this element move?**

Some of the main lessons were:

- Motion should reinforce hierarchy and meaning.
- Animation should be added after the static experience works.
- Not every scroll animation needs to use `scrub`.
- Desktop and mobile interactions do not need to behave the same way.
- Pointer interactions require understanding coordinate systems, not only animation APIs.
- Real-device testing matters.
- Accessibility is part of design.
- Performance should be measured before optimizing.
- More effects do not automatically create a better experience.

---

## 10 — Outcome

MOTION / 01 became the first complete experiment in my path toward creative web development.

The project combines visual hierarchy, responsive layout, motion, user interaction, accessibility, and performance in one focused experience.

It is intentionally small in scope.

Its purpose was not to demonstrate a large application architecture, but to develop stronger fundamentals around designing and building motion-driven web experiences.

---

## Final Experience

**Live project**  
https://arturo0427.github.io/training-motion/

**Source code**  
Add GitHub repository URL here

**Motion preview**  
Add video or portfolio preview here when available.

---

## Notes Before Publishing

Before converting this draft into the final portfolio case study:

- Rewrite anything that does not sound like your own voice.
- Confirm the exact GitHub repository URL.
- Add the final motion preview.
- Decide which technical details belong in the visual portfolio page and which should remain only in the README.
- Add screenshots or short clips between sections instead of publishing a wall of text.
- Keep the final case study shorter than this draft if the visual design can communicate part of the story.
