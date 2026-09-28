# MOTION / 01

> A minimalist creative development experiment exploring how motion can guide attention, create rhythm, and add meaning to interaction.

[Live Experience](https://arturo0427.github.io/training-motion/)

![MOTION / 01 Preview](https://arturo0427.github.io/training-motion/og-image.png)

## Overview

**MOTION / 01** is a creative web development experiment focused on motion as part of the experience rather than as decoration.

The project explores how typography, scroll, pointer input, responsive behavior, and animation can work together to create a simple but intentional digital narrative.

The experience follows five moments:

1. **Digital Experiences In Motion.**
2. **Motion is not decoration.**
3. **Control the rhythm.**
4. **Move. React. Respond.**
5. **Make people feel something.**

## Goals

The goal of this project was not to build a feature-heavy website. It was to practice the foundations of creative development through a focused experience:

- Build a clear visual hierarchy before adding motion.
- Use animation to support storytelling.
- Create scroll-driven motion with GSAP and ScrollTrigger.
- Design different interaction strategies for desktop and touch devices.
- Keep motion progressive and accessible.
- Maintain strong performance despite animation.
- Treat responsive behavior as a design decision, not only a layout adjustment.

## Tech Stack

- HTML5
- CSS3
- JavaScript
- [GSAP](https://gsap.com/)
- ScrollTrigger
- Vite
- GitHub Pages

## Motion System

### Intro

The hero uses a short entrance sequence to establish hierarchy and rhythm.

The animation introduces:

- the main headline;
- the section label;
- the header;
- the scroll hint.

The motion is intentionally brief so the interface becomes usable immediately.

### Scroll-driven reveals

The manifesto and finale use one-time reveal animations triggered by scroll position.

These sections are designed as narrative pauses rather than continuous motion.

### Scrubbed typography

The **Control the rhythm** section maps horizontal movement directly to scroll progress.

This creates a stronger relationship between user input and visual rhythm.

### Pointer interaction

On desktop devices with a fine pointer, the visual element follows the cursor using GSAP `quickTo()`.

The implementation:

- converts global pointer coordinates into local section coordinates;
- calculates the visual element's real rendered center;
- constrains movement with `gsap.utils.clamp()`;
- recalculates position during scroll;
- keeps the visual inside the interaction section.

### Touch interaction

Touch devices do not attempt to imitate mouse behavior.

Instead, the visual reacts to scroll using a subtle vertical movement and scale change.

This keeps the interaction appropriate for the input method while preserving the same design idea.

## Responsive Motion

The project uses capability-based interaction decisions in addition to viewport size.

Desktop interaction targets devices with:

```css
(min-width: 48rem) and (hover: hover) and (pointer: fine)
```

Touch interaction targets smaller or coarse-pointer devices.

The result is not simply a reduced desktop animation. Each device receives an interaction that fits the way it is actually used.

## Accessibility

Accessibility was treated as part of the experience.

The project includes:

- semantic landmarks;
- a single `h1` and structured section headings;
- `aria-labelledby` for major sections;
- decorative visuals hidden from assistive technologies;
- visible keyboard focus states;
- descriptive links;
- `prefers-reduced-motion` support;
- accessible text contrast.

When reduced motion is requested, the content remains visible and usable without relying on animation.

## Performance

The project was audited in production with Lighthouse after deployment.

Final Lighthouse results:

| Category | Desktop | Mobile |
| --- | ---: | ---: |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

The experience primarily animates `transform` and opacity-related properties, avoiding unnecessary layout-heavy animation.

The production page remains intentionally lightweight.

## Project Structure

```text
training-motion/
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   └── sitemap.xml
├── src/
│   ├── animations/
│   │   ├── intro.js
│   │   ├── interaction.js
│   │   └── scroll.js
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── vite.config.js
```

Animation responsibilities are separated by behavior instead of placing all motion logic in a single file.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The project is built with Vite and deployed as a GitHub Pages project site.

Production:

**https://arturo0427.github.io/training-motion/**

## Key Lessons

This experiment reinforced several ideas that will continue to guide future creative development work:

- Motion should support hierarchy and meaning.
- Static content should work before animation is introduced.
- Scroll animation does not always need to be scrubbed.
- Desktop and mobile interactions should not automatically behave the same way.
- Real device testing reveals issues that desktop emulation can miss.
- Measuring performance is more useful than optimizing blindly.
- Accessibility and reduced-motion behavior should be designed intentionally.
- Constraints often produce a stronger experience than adding more effects.

## Author

**Arturo Muñoz**

Creative Web Developer in progress — focused on motion, interaction, and immersive web experiences.

[LinkedIn](https://ec.linkedin.com/in/arturom0427)
