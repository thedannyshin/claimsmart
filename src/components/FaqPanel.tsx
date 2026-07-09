import { useEffect } from "react";
import { FaqAccordion } from "./FaqAccordion";
import { HOVER_NEUTRAL } from "../lib/ui";

interface FaqPanelProps {
  open: boolean;
  onClose: () => void;
  onAskQuestion?: (question: string) => void;
}

export function FaqPanel({ open, onClose, onAskQuestion }: FaqPanelProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[1px]"
        onClick={onClose}
        aria-label="Close FAQ"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-panel-title"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-surface shadow-card"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 id="faq-panel-title" className="text-base font-semibold text-ink">
              FAQ
            </h2>
            <p className="text-xs text-ink-muted">Common questions</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg p-1.5 text-ink-muted ${HOVER_NEUTRAL}`}
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FaqAccordion
            defaultExpanded={0}
            onAskQuestion={(question) => {
              onAskQuestion?.(question);
              onClose();
            }}
          />
        </div>

        <footer className="border-t border-border px-5 py-4">
          <p className="text-center text-xs text-ink-muted">
            Still have questions?{" "}
            {onAskQuestion && (
              <button
                type="button"
                onClick={() => {
                  onAskQuestion("What can you help me with?");
                  onClose();
                }}
                className="font-medium text-ink hover:text-ink-muted"
              >
                Ask ClaimSmart
              </button>
            )}
          </p>
        </footer>
      </aside>
    </>
  );
}
