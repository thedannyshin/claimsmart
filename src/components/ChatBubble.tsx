import { SourcesTrigger } from "./Sources";
import { SelfServeActions } from "./SelfServeActions";
import type { ChatMessage, Source } from "../types";

interface ChatBubbleProps {
  message: ChatMessage;
  onPrompt?: (prompt: string) => void;
  onOpenFaq?: () => void;
  onOpenSources?: (sources: Source[]) => void;
  sourcesActive?: boolean;
}

export function ChatBubble({
  message,
  onPrompt,
  onOpenFaq,
  onOpenSources,
  sourcesActive,
}: ChatBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md border border-border bg-surface-muted px-4 py-2.5 text-sm leading-relaxed text-ink-muted sm:max-w-[70%]">
          {message.content}
        </div>
      </div>
    );
  }

  const showSelfServe = message.showSelfServe && onPrompt && onOpenFaq;

  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-surface">
        AI
      </div>
      <div className="min-w-0 max-w-[90%] rounded-2xl border border-border bg-surface px-4 py-3 shadow-soft sm:max-w-[80%]">
        <div className="text-sm leading-relaxed text-ink">{message.content}</div>
        {message.sources && message.sources.length > 0 && onOpenSources && (
          <SourcesTrigger
            sources={message.sources}
            active={sourcesActive}
            onOpen={onOpenSources}
            className="mt-2.5"
          />
        )}
        {showSelfServe && (
          <SelfServeActions onPrompt={onPrompt} onOpenFaq={onOpenFaq} compact />
        )}
      </div>
    </div>
  );
}
