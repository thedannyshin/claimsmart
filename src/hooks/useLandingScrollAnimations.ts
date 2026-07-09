import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useLandingScrollAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!scope.current || prefersReducedMotion()) return;

      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");

      if (heroItems.length) {
        gsap.from(heroItems, {
          autoAlpha: 0,
          y: 32,
          duration: 0.95,
          stagger: 0.11,
          ease: "power3.out",
        });
      }

      ScrollTrigger.batch(".landing-scroll-reveal", {
        start: "top 86%",
        once: true,
        onEnter: (elements) => {
          gsap.from(elements, {
            autoAlpha: 0,
            y: 44,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.12,
          });
        },
      });

      ScrollTrigger.batch(".landing-scroll-stagger", {
        start: "top 84%",
        once: true,
        onEnter: (containers) => {
          containers.forEach((container) => {
            const inners = container.querySelectorAll<HTMLElement>(".landing-scroll-inner");
            if (!inners.length) return;

            gsap.from(inners, {
              autoAlpha: 0,
              y: 24,
              duration: 0.75,
              ease: "power2.out",
              stagger: 0.09,
            });
          });
        },
      });

      gsap.utils.toArray<HTMLElement>(".landing-scroll-split").forEach((split) => {
        const inners = split.querySelectorAll<HTMLElement>(".landing-scroll-inner");
        if (!inners.length) return;

        gsap.from(inners, {
          autoAlpha: 0,
          y: 28,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: split,
            start: "top 78%",
            once: true,
          },
        });
      });

      ScrollTrigger.refresh();
    },
    { scope }
  );
}
