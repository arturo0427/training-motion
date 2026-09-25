import { gsap } from "gsap";

export function initIntro() {
    const mm = gsap.matchMedia();

    mm.add(
        {
            isDesktop: "(min-width: 48rem)",
            isMobile: "(max-width: 47.99rem)",
            reduceMotion: "(prefers-reduced-motion: reduce)"
        },
        (context) => {
            const { isDesktop, reduceMotion } = context.conditions;

            if (reduceMotion) return;

            const distance = isDesktop ? 64 : 32;
            const duration = isDesktop ? 1 : 0.8;
            const stagger = isDesktop ? 0.1 : 0.07;

            const timeline = gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });

            timeline
                .from(".hero-title span", {
                    y: distance,
                    autoAlpha: 0,
                    duration,
                    stagger
                })
                .from(
                    ".section-label",
                    {
                        y: 20,
                        autoAlpha: 0,
                        duration: 0.6
                    },
                    "-=0.45"
                )
                .from(
                    [".site-header", ".scroll-hint"],
                    {
                        y: 16,
                        autoAlpha: 0,
                        duration: 0.6,
                        stagger: 0.08
                    },
                    "-=0.35"
                );
        }
    );

    return () => mm.revert();
}