import { FormEvent, useState } from "react";
import { CHIP } from "../lib/ui";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  suggestions?: string[];
}

export function ChatInput({ onSend, disabled, suggestions = [] }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <div className="border-t border-border bg-surface px-4 py-4 sm:px-6">
      {suggestions.length > 0 && (
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {suggestions.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onSend(prompt)}
              disabled={disabled}
              className={`px-3.5 py-1.5 text-xs font-medium transition hover:border-border-strong disabled:opacity-50 ${CHIP}`}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-border bg-surface px-2 py-1.5 focus-within:border-border-strong focus-within:ring-2 focus-within:ring-ink/10">
          <label htmlFor="chat-input" className="sr-only">
            Type your message
          </label>
          <input
            id="chat-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask ClaimSmart anything about your policy…"
            disabled={disabled}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-surface transition hover:bg-ink-hover disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Send message"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
