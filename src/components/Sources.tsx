import type { Source } from "../types";
import { CHIP } from "../lib/ui";

interface SourcesTriggerProps {
  sources: Source[];
  active?: boolean;
  onOpen: (sources: Source[]) => void;
  className?: string;
}

export function SourcesTrigger({ sources, active, onOpen, className = "" }: SourcesTriggerProps) {
  if (sources.length === 0) return null;

  return (
    <button
      type="button"
      onClick={() => onOpen(sources)}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium transition ${
        active ? "border-ink" : "hover:border-border-strong"
      } ${CHIP} ${className}`}
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
      Sources
      <span className="rounded-full bg-surface-subtle px-1.5 text-[10px] text-ink-faint">{sources.length}</span>
    </button>
  );
}
