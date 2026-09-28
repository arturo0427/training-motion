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

        const rect = section.getBoundingClientRect();
        const radius = visual.offsetHeight / 2;

        const pointerInsideSection =
            pointerX >= rect.left &&
            pointerX <= rect.right &&
            pointerY >= rect.top &&
            pointerY <= rect.bottom;

        if (!pointerInsideSection) {
            moveX(0);
            moveY(0);
            return;
        }

        const originX = rect.width / 2;
        const originY = visual.offsetTop + radius;

        const localPointerX = pointerX - rect.left;
        const localPointerY = pointerY - rect.top;

        const rawX = localPointerX - originX;
        const rawY = localPointerY - originY;

        const minX = -(originX - radius);
        const maxX = rect.width - originX - radius;

        const minY = -(originY - radius);
        const maxY = section.clientHeight - originY - radius;

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
            y: -24,
            scale: 0.92,
        },
        {
            y: 24,
            scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".interaction",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        },
    );

    return () => animation.kill();
}