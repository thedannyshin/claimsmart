import { useState } from "react";
import { FAQ_ITEMS } from "../data/faq";
import { HOVER_NEUTRAL } from "../lib/ui";

interface FaqAccordionProps {
  /** Index of the item expanded on first render. Pass null to start collapsed. */
  defaultExpanded?: number | null;
  onAskQuestion?: (question: string) => void;
  className?: string;
}

export function FaqAccordion({
  defaultExpanded = 0,
  onAskQuestion,
  className = "",
}: FaqAccordionProps) {
  const [expanded, setExpanded] = useState<number | null>(defaultExpanded);

  return (
    <ul className={`divide-y divide-border rounded-md border border-border bg-surface ${className}`}>
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = expanded === i;
        return (
          <li key={item.question}>
            <button
              type="button"
              id={`faq-question-${i}`}
              onClick={() => setExpanded(isOpen ? null : i)}
              className={`flex w-full items-start justify-between gap-3 px-5 py-4 text-left sm:px-6 ${HOVER_NEUTRAL}`}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="font-semibold text-ink">{item.question}</span>
              <svg
                className={`mt-1 h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 ease-out ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <div
              className="ui-accordion-panel"
              data-open={isOpen ? "true" : "false"}
            >
              <div className="overflow-hidden">
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="border-t border-border px-5 pb-5 pt-3 sm:px-6"
                >
                  <p className="text-sm leading-relaxed text-ink-muted">{item.answer}</p>
                  {onAskQuestion && (
                    <button
                      type="button"
                      onClick={() => onAskQuestion(item.prompt ?? item.question)}
                      className="pressable mt-3 text-xs font-medium text-ink transition-colors hover:text-ink-muted"
                    >
                      Ask ClaimSmart →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
