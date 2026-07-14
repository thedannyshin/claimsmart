import { useEffect, useRef, useState, type SVGProps } from "react";
import { TESTIMONIALS } from "../../data/testimonials";
import { HOVER_NEUTRAL, LANDING_H2, LANDING_H4, LANDING_LABEL, LANDING_QUOTE, LANDING_SMALL, UI_ENTER } from "../../lib/ui";
import { LandingCell, LandingGrid, LandingGridCell, LandingRow } from "./LandingLayout";

function IconChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function IconChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const animateSlides = useRef(false);
  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[index];

  useEffect(() => {
    TESTIMONIALS.forEach((testimonial) => {
      const img = new Image();
      img.src = testimonial.avatarSrc;
    });
  }, []);

  const goTo = (next: number) => {
    animateSlides.current = true;
    setIndex((next + total) % total);
  };

  const slideEnter = animateSlides.current ? UI_ENTER : "";

  return (
    <>
      <LandingRow>
        <LandingCell>
          <div className="landing-scroll-reveal">
            <p className={LANDING_LABEL}>What policyholders say</p>
            <h2 className={`mt-6 max-w-2xl ${LANDING_H2}`}>Less hold time. More clarity.</h2>
          </div>
        </LandingCell>
      </LandingRow>

      <LandingGrid cols={2} className="testimonial-grid divide-border-contrast">
        <LandingGridCell className="flex min-h-[22rem] flex-col justify-between sm:min-h-[26rem] lg:min-h-[28rem]">
          <div className="flex h-full flex-col justify-between">
            <blockquote key={current.id} className={`max-w-prose ${LANDING_QUOTE} ${slideEnter}`}>
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div key={`${current.id}-meta`} className={slideEnter}>
              <p className={LANDING_H4}>{current.name}</p>
              <p className={`mt-1 ${LANDING_SMALL}`}>{current.detail}</p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  className={`flex h-10 w-10 items-center justify-center border border-border-contrast bg-surface-contrast-muted text-ink-on-contrast ${HOVER_NEUTRAL}`}
                  aria-label="Previous testimonial"
                >
                  <IconChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  className={`flex h-10 w-10 items-center justify-center border border-border-contrast bg-surface-contrast-muted text-ink-on-contrast ${HOVER_NEUTRAL}`}
                  aria-label="Next testimonial"
                >
                  <IconChevronRight className="h-5 w-5" />
                </button>

                <div className="ml-2 flex gap-2" role="tablist" aria-label="Choose testimonial">
                  {TESTIMONIALS.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Testimonial from ${t.name}`}
                      onClick={() => {
                        animateSlides.current = true;
                        setIndex(i);
                      }}
                      className={`pressable h-2 w-2 rounded-full transition-all duration-300 ease-out ${
                        i === index ? "w-6 landing-contrast-dot-active" : `landing-contrast-dot ${HOVER_NEUTRAL}`
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </LandingGridCell>

        <LandingGridCell className="!p-0">
          <div className="testimonial-headshot-panel">
            <div key={current.id} className={`testimonial-headshot-square ${slideEnter}`}>
              <img
                src={current.avatarSrc}
                alt={current.avatarAlt}
                className="testimonial-headshot h-full w-full object-cover object-[center_20%]"
                width={448}
                height={448}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </LandingGridCell>
      </LandingGrid>
    </>
  );
}
