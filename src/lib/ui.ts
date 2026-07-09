/** Cream pill — forest ink text. Use instead of green-tinted chip backgrounds. */
export const CHIP =
  "pressable rounded-lg border border-border bg-surface text-ink";

/** Neutral hover for outline buttons on cream (avoids green-on-green hover fills). */
export const HOVER_NEUTRAL = "pressable transition-colors hover:bg-hover-neutral";

/** Tactile press + fade-in for swapped content */
export const PRESSABLE = "pressable";

export const UI_ENTER = "ui-enter";

/** Section eyebrow — sentence case, no mono caps */
export const LANDING_LABEL = "text-sm font-medium text-ink-faint";

/** Soft brand pill — forest ink on neutral cream */
export const LANDING_BADGE =
  "inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3.5 py-1 text-sm font-medium text-ink";

/** Icon tile with neutral fill */
export const LANDING_ICON_BOX =
  "flex items-center justify-center border border-border bg-surface-muted text-ink";

/** Prompt chip for landing mocks */
export const LANDING_CHIP = "rounded-lg border border-border bg-surface-muted text-ink";

/** Landing display headings — Plus Jakarta Sans */
const LANDING_HEADLINE = "font-landing-display font-semibold tracking-[-0.03em]";

export const LANDING_DISPLAY =
  `${LANDING_HEADLINE} text-[2.625rem] leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]`;

export const LANDING_HERO_DISPLAY =
  "text-balance font-landing-display text-[2.5rem] font-extrabold leading-[1.12] tracking-[-0.04em] text-ink sm:text-[2.75rem] md:text-5xl lg:text-[3rem] xl:text-[3.5rem]";

export const LANDING_HERO_LEAD =
  "text-pretty max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl";

export const LANDING_H2 =
  `${LANDING_HEADLINE} text-balance text-[1.75rem] leading-[1.12] text-ink sm:text-3xl lg:text-[2.5rem]`;

export const LANDING_H3 =
  `${LANDING_HEADLINE} text-balance text-2xl leading-[1.15] text-ink sm:text-[1.75rem]`;

export const LANDING_H4 = `${LANDING_HEADLINE} text-balance text-lg leading-snug text-ink sm:text-xl`;

export const LANDING_QUOTE =
  "text-pretty font-landing-display text-2xl font-medium leading-[1.4] tracking-[-0.02em] text-ink sm:text-[1.75rem]";

export const LANDING_LEAD = "text-pretty text-lg leading-snug text-ink-muted sm:text-xl";

export const LANDING_BODY = "text-pretty text-base leading-relaxed text-ink-muted";

export const LANDING_SMALL = "text-sm leading-relaxed text-ink-muted";

export const LANDING_BTN_PRIMARY =
  "pressable inline-flex items-center justify-center whitespace-nowrap rounded-md bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-hover sm:text-base";

export const LANDING_BTN_SECONDARY =
  "pressable inline-flex items-center justify-center whitespace-nowrap rounded-md border border-border bg-surface-muted px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-hover-neutral sm:text-base";
