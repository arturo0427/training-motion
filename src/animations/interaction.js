import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initInteraction() {
    const mm = gsap.matchMedia();

    mm.add(
        {
            pointerInteraction:
                "(min-width: 48rem) and (hover: hover) and (pointer: fine)",
            touchInteraction:
                "(max-width: 47.99rem), (hover: none), (pointer: coarse)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
            const {
                pointerInteraction,
                touchInteraction,
                reduceMotion
            } = context.conditions;

            if (reduceMotion) return;

            let cleanupPointer;
            let cleanupTouch;
            if (pointerInteraction) {
                cleanupPointer = initPointerInteraction();
            }

            if (touchInteraction) {
                cleanupTouch = initTouchInteraction();
            }

            return () => {
                cleanupPointer?.();
                cleanupTouch?.();
            }
        }
    );

    return () => mm.revert();
};

function initPointerInteraction() {
    const section = document.querySelector(".interaction");
    const visual = document.querySelector(".interaction-visual");

    if (!section || !visual) return;

    const moveX = gsap.quickTo(visual, "x", {
        duration: 0.6,
        ease: "power3.out",
    });

    const moveY = gsap.quickTo(visual, "y", {
        duration: 0.6,
        ease: "power3.out",
    });

    let pointerX = 0;
    let pointerY = 0;
    let hasPointerPosition = false;

    const updateVisualPosition = () => {
        if (!hasPointerPosition) return;

        const sectionRect = section.getBoundingClientRect();
        const visualRect = visual.getBoundingClientRect();

        const currentX = Number(gsap.getProperty(visual, "x")) || 0;
        const currentY = Number(gsap.getProperty(visual, "y")) || 0;

        const radiusX = visualRect.width / 2;
        const radiusY = visualRect.height / 2;

        const baseCenterX =
            visualRect.left + radiusX - currentX;

        const baseCenterY =
            visualRect.top + radiusY - currentY;

        const pointerInsideSection =
            pointerX >= sectionRect.left &&
            pointerX <= sectionRect.right &&
            pointerY >= sectionRect.top &&
            pointerY <= sectionRect.bottom;

        if (!pointerInsideSection) {
            moveX(0);
            moveY(0);
            return;
        }

        const rawX = pointerX - baseCenterX;
        const rawY = pointerY - baseCenterY;

        const minX =
            sectionRect.left + radiusX - baseCenterX;

        const maxX =
            sectionRect.right - radiusX - baseCenterX;

        const minY =
            sectionRect.top + radiusY - baseCenterY;

        const maxY =
            sectionRect.bottom - radiusY - baseCenterY;

        const x = gsap.utils.clamp(minX, maxX, rawX);
        const y = gsap.utils.clamp(minY, maxY, rawY);

        moveX(x);
        moveY(y);
    };

    const handlePointerMove = (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        hasPointerPosition = true;

        updateVisualPosition();
    };

    const handleScroll = () => {
        updateVisualPosition();
    };

    section.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
        section.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("scroll", handleScroll);
    };
}

function initTouchInteraction() {
    const visual = document.querySelector(".interaction-visual");

    if (!visual) return;

    const animation = gsap.fromTo(
        visual,
        {
            yPercent: -25,
            scale: 0.9,
        },
        {
            yPercent: 25,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
                trigger: ".interaction",
                start: "top 85%",
                end: "bottom 15%",
                scrub: 0.6,
            },
        },
    );

    return () => animation.kill();
}