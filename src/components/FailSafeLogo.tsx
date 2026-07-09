import type { HTMLAttributes } from "react";

const SIZES = {
  sm: { text: "text-xl", tagline: "text-xs", subbrand: "text-base" },
  md: { text: "text-2xl", tagline: "text-sm", subbrand: "text-lg" },
  lg: { text: "text-3xl tracking-[-0.06em]", tagline: "text-sm", subbrand: "text-xl" },
} as const;

export interface FailSafeLogoProps extends HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof SIZES;
  wordmark?: string;
  tagline?: string;
  subbrand?: string;
}

export function FailSafeLogo({
  size = "md",
  wordmark = "FailSafe",
  tagline,
  subbrand,
  className = "",
  ...rest
}: FailSafeLogoProps) {
  const s = SIZES[size];

  return (
    <div className={`text-ink ${className}`} {...rest}>
      <div className="flex items-baseline gap-1 leading-none">
        <span className={`failsafe-logo-wordmark ${s.text}`}>{wordmark}</span>
        {subbrand && (
          <span className={`font-sans font-normal text-ink-muted ${s.subbrand}`}> / {subbrand}</span>
        )}
      </div>
      {tagline && <p className={`mt-1.5 font-sans text-ink-muted ${s.tagline}`}>{tagline}</p>}
    </div>
  );
}
