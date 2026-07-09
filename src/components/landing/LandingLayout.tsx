import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { HeroAbstractBackground } from "./HeroAbstractBackground";

/** Content width — header and frames align to this */
export const LANDING_MAX = "mx-auto w-full max-w-[90rem]";

/** Header inner shell (no border) */
export const LANDING_SHELL = LANDING_MAX;

export const LandingPageRoot = forwardRef<HTMLDivElement, { children: ReactNode }>(function LandingPageRoot(
  { children },
  ref
) {
  return (
    <div ref={ref} className="landing-page landing-diagonal-bg min-h-screen">
      {children}
    </div>
  );
});

export function LandingSections({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${LANDING_MAX} flex flex-col gap-10 px-4 pb-12 pt-10 sm:gap-12 sm:px-6 sm:pt-12 lg:gap-14 lg:px-8 lg:pt-14 lg:pb-16`}
    >
      {children}
    </div>
  );
}

interface LandingHeroProps {
  children: ReactNode;
  className?: string;
}

/** Full-bleed hero band — fills viewport below header */
export function LandingHero({ children, className = "" }: LandingHeroProps) {
  return (
    <div className="landing-hero-band">
      <div className="landing-hero-3d" aria-hidden>
        <HeroAbstractBackground />
      </div>
      <section className={`relative z-10 flex min-h-0 w-full flex-1 overflow-hidden ${className}`}>
        <div className="landing-scroll-hero grid min-h-0 w-full flex-1 grid-rows-[auto_auto] gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:grid-rows-none lg:items-center lg:gap-12 lg:px-0 lg:py-10 xl:gap-16 xl:py-12">
          {children}
        </div>
      </section>
    </div>
  );
}

export function LandingHeroCopy({ children, className = "" }: LandingCellProps) {
  return (
    <div
      className={`landing-hero-copy-gutter relative z-10 flex min-h-0 w-full flex-col items-center justify-center bg-surface text-center lg:max-w-none lg:items-start lg:justify-center lg:bg-transparent lg:text-left ${className}`}
    >
      {children}
    </div>
  );
}

interface LandingHeroShowcaseProps {
  children: ReactNode;
  className?: string;
}

export function LandingHeroShowcase({ children, className = "" }: LandingHeroShowcaseProps) {
  return (
    <div
      className={`landing-hero-showcase relative flex w-full items-center justify-center lg:h-full lg:min-h-0 ${className}`}
    >
      <div className="landing-hero-mock-frame relative z-10 w-full max-w-2xl sm:max-w-[32rem] lg:max-w-[36rem] xl:max-w-[40rem] 2xl:max-w-[44rem]">
        {children}
      </div>
    </div>
  );
}

interface LandingFrameProps {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "contrast";
}

export function LandingFrame({ children, className = "", id, tone = "light" }: LandingFrameProps) {
  const toneClass =
    tone === "contrast"
      ? "landing-frame-contrast border-border-contrast bg-surface-contrast"
      : "border-border bg-surface";

  return (
    <div
      id={id}
      className={`overflow-hidden border ${toneClass} [&>.landing-row:last-child]:border-b-0 ${className}`}
    >
      {children}
    </div>
  );
}

interface LandingRowProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function LandingRow({ children, className = "", id }: LandingRowProps) {
  return (
    <section id={id} className={`landing-row border-b border-border ${className}`}>
      {children}
    </section>
  );
}

interface LandingCellProps {
  children: ReactNode;
  className?: string;
}

export function LandingCell({ children, className = "" }: LandingCellProps) {
  return <div className={`p-8 sm:p-12 lg:p-14 xl:p-16 ${className}`}>{children}</div>;
}

interface LandingSplitProps {
  left: ReactNode;
  right: ReactNode;
  reverse?: boolean;
  leftClassName?: string;
  rightClassName?: string;
}

export function LandingSplit({
  left,
  right,
  reverse = false,
  leftClassName = "",
  rightClassName = "",
}: LandingSplitProps) {
  return (
    <div className="landing-scroll-split grid lg:grid-cols-2">
      <LandingCell
        className={`${reverse ? "lg:order-2 lg:border-l" : "lg:border-r"} border-border ${leftClassName}`}
      >
        <div className="landing-scroll-inner h-full">{left}</div>
      </LandingCell>
      <LandingCell className={`${reverse ? "lg:order-1" : ""} ${rightClassName}`}>
        <div className="landing-scroll-inner h-full">{right}</div>
      </LandingCell>
    </div>
  );
}

interface LandingGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: 2 | 3 | 4 | 6;
  className?: string;
}

export function LandingGrid({ children, cols = 3, className = "", ...rest }: LandingGridProps) {
  const colClass =
    cols === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : cols === 4
        ? "grid-cols-2 lg:grid-cols-4"
        : cols === 6
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={`grid divide-x divide-y divide-border ${colClass} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function LandingGridCell({ children, className = "" }: LandingCellProps) {
  return <div className={`p-8 sm:p-10 lg:p-12 xl:p-14 ${className}`}>{children}</div>;
}
