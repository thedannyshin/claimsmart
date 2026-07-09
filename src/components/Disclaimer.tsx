import { DISCLAIMER_TEXT, SUPPORT_PHONE } from "../data/mock";

export function Disclaimer() {
  return (
    <div
      role="note"
      aria-label="Legal disclaimer"
      className="shrink-0 border-t border-warning-border bg-warning-bg px-4 py-2.5"
    >
      <p className="mx-auto max-w-5xl text-center text-[11px] leading-relaxed text-warning-text sm:text-xs">
        {DISCLAIMER_TEXT.replace(SUPPORT_PHONE, "")}
        <span className="text-warning-text/80">{SUPPORT_PHONE}</span>.
      </p>
    </div>
  );
}
