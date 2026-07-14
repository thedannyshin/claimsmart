import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function revealOnScroll(
  targets: HTMLElement[],
  { y = 28, start = "top 88%" }: { y?: number; start?: string } = {}
) {
  if (!targets.length) return;

  gsap.set(targets, { autoAlpha: 0, y });

  ScrollTrigger.batch(targets, {
    start,
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
  });
}

export function useLandingScrollAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!scope.current || prefersReducedMotion()) return;

      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" }
        );
      }

      revealOnScroll(gsap.utils.toArray<HTMLElement>(".landing-scroll-reveal"));
      revealOnScroll(gsap.utils.toArray<HTMLElement>(".landing-scroll-split"), { y: 24, start: "top 85%" });

      const staggerItems = gsap.utils.toArray<HTMLElement>(".landing-scroll-stagger .landing-scroll-inner");
      if (staggerItems.length) {
        gsap.set(staggerItems, { autoAlpha: 0, y: 20 });

        ScrollTrigger.batch(staggerItems, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.07,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });
      }
    },
    { scope }
  );
}
