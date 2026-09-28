import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
    const mm = gsap.matchMedia();

    mm.add(
        {
            isDesktop: "(min-width: 48rem)",
            isMobile: "(max-width: 47.99rem)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
            const { isDesktop, reduceMotion } = context.conditions;

            if (reduceMotion) return;

            const distance = isDesktop ? 48 : 28;

            /* Manifesto */
            const timeLine = gsap.timeline({
                scrollTrigger: {
                    trigger: '.manifesto',
                    start: 'top 65%',
                    once: true,
                },
                defaults: {
                    ease: "power3.out"
                }
            });

            timeLine
                .from('.manifesto .section-index', {
                    autoAlpha: 0,
                    duration: 0.4,
                })
                .from('.manifesto h2', {
                    y: distance,
                    autoAlpha: 0,
                    duration: 0.9
                },
                    "-=0.15")
                .from('.manifesto-content > p', {
                    y: 20,
                    autoAlpha: 0,
                    duration: 0.7
                },
                    "-=0.4"
                );

            /* Rhythm */
            const rhythmTimeLine = gsap.timeline({
                scrollTrigger: {
                    trigger: '.rhythm',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            })

            rhythmTimeLine
                .fromTo('.rhythm h2 span:nth-child(1)',
                    {
                        x: isDesktop ? -80 : -30,
                    },
                    {
                        x: isDesktop ? 80 : 30,
                        ease: 'none'
                    },
                    0
                )
                .fromTo(
                    ".rhythm h2 span:nth-child(2)",
                    {
                        x: isDesktop ? 60 : 20,
                    },
                    {
                        x: isDesktop ? -60 : -20,
                        ease: "none",
                    },
                    0,
                )
                .fromTo(
                    ".rhythm h2 span:nth-child(3)",
                    {
                        x: isDesktop ? -50 : -20,
                    },
                    {
                        x: isDesktop ? 90 : 35,
                        ease: "none",
                    },
                    0,
                );

            /* Finale */
            gsap.from(".finale h2 span", {
                y: isDesktop ? 48 : 28,
                autoAlpha: 0,
                duration: isDesktop ? 1 : 0.8,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".finale",
                    start: "top 65%",
                    once: true,
                },
            });
        }
    );

    return () => mm.revert();
}