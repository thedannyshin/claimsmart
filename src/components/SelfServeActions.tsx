import { SELF_SERVE_ACTIONS } from "../data/mock";
import { CHIP } from "../lib/ui";

interface SelfServeActionsProps {
  onPrompt: (prompt: string) => void;
  onOpenFaq: () => void;
  compact?: boolean;
}

export function SelfServeActions({ onPrompt, onOpenFaq, compact }: SelfServeActionsProps) {
  return (
    <div className={compact ? "mt-3" : "mt-4"}>
      {!compact && (
        <p className="text-xs font-medium text-ink-muted">Quick actions</p>
      )}
      <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-2"}`}>
        {SELF_SERVE_ACTIONS.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() =>
              action.action === "faq" ? onOpenFaq() : onPrompt(action.prompt!)
            }
            className={`px-3 py-1 text-xs font-medium transition hover:border-border-strong ${CHIP}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
