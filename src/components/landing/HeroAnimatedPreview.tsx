import { useEffect, useRef, useState } from "react";
import {
  AssistantBubblePreview,
  ChatInputPreview,
  PreviewShell,
  UserBubblePreview,
} from "./AppPreviews";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sourceLabel?: string;
};

const WELCOME =
  "I'm ClaimSmart, your FailSafe assistant. Ask about coverage, claims, or filing.";

const EXCHANGES = [
  {
    question: "Am I covered for water damage?",
    answer:
      "Sudden and accidental water damage from burst pipes is covered up to $350,000, minus your $1,000 deductible.",
    source: "Section 4.2: Water damage",
  },
  {
    question: "What about my wind and hail deductible?",
    answer: "Wind and hail losses use a separate $2,500 deductible under Section 8.1.",
    source: "Section 8.1: Wind & hail",
  },
  {
    question: "Can I check my open claim status?",
    answer:
      "Claim CLM-44821 is in review. Your adjuster is assigned and the next update is expected within 2 business days.",
    source: "Claims portal",
  },
] as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function typeText(
  text: string,
  onUpdate: (value: string) => void,
  charMs: number,
  signal: AbortSignal
) {
  return new Promise<void>((resolve) => {
    let i = 0;
    const tick = () => {
      if (signal.aborted) {
        resolve();
        return;
      }
      i += 1;
      onUpdate(text.slice(0, i));
      if (i >= text.length) {
        resolve();
        return;
      }
      window.setTimeout(tick, charMs);
    };
    tick();
  });
}

function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    const id = window.setTimeout(() => resolve(), ms);
    signal.addEventListener("abort", () => {
      window.clearTimeout(id);
      resolve();
    });
  });
}

export function HeroAnimatedPreview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [assistantDraft, setAssistantDraft] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!threadRef.current) return;
    threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages, assistantDraft]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function run() {
      if (prefersReducedMotion()) {
        setMessages([
          { id: "welcome", role: "assistant", text: WELCOME },
          ...EXCHANGES.flatMap((exchange, index) => [
            { id: `user-${index}`, role: "user" as const, text: exchange.question },
            {
              id: `assistant-${index}`,
              role: "assistant" as const,
              text: exchange.answer,
              sourceLabel: exchange.source,
            },
          ]),
        ]);
        return;
      }

      let id = 0;
      const nextId = () => {
        id += 1;
        return String(id);
      };

      await wait(500, signal);
      setAssistantDraft("");
      await typeText(WELCOME, setAssistantDraft, 18, signal);
      setMessages([{ id: nextId(), role: "assistant", text: WELCOME }]);
      setAssistantDraft("");

      for (const exchange of EXCHANGES) {
        await wait(550, signal);

        setInputText("");
        await typeText(exchange.question, setInputText, 36, signal);
        await wait(280, signal);
        setMessages((prev) => [...prev, { id: nextId(), role: "user", text: exchange.question }]);
        setInputText("");

        await wait(450, signal);

        setAssistantDraft("");
        await typeText(exchange.answer, setAssistantDraft, 20, signal);
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            text: exchange.answer,
            sourceLabel: exchange.source,
          },
        ]);
        setAssistantDraft("");
      }
    }

    void run();
    return () => controller.abort();
  }, []);

  return (
    <PreviewShell className="landing-hero-mock w-full shadow-none">
      <div className="landing-hero-mock-inner flex flex-col">
        <header className="shrink-0 border-b border-border bg-surface px-4 py-3 sm:px-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">ClaimSmart</p>
              <p className="mt-0.5 truncate text-xs text-ink-muted">HomeProtect Plus · FS-2847193</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2 py-1 text-[10px] font-medium text-ink-muted">
              <span className="hero-live-dot h-1.5 w-1.5 rounded-full bg-ink" aria-hidden />
              Live policy
            </span>
          </div>
        </header>

        <div ref={threadRef} className="min-h-0 flex-1 overflow-hidden px-4 py-4 sm:px-5">
          <div className="space-y-3">
            {messages.map((message) =>
              message.role === "user" ? (
                <UserBubblePreview key={message.id}>{message.text}</UserBubblePreview>
              ) : (
                <AssistantBubblePreview
                  key={message.id}
                  sourceLabel={message.sourceLabel}
                  sourcesActive={message.sourceLabel != null}
                >
                  {message.text}
                </AssistantBubblePreview>
              )
            )}
            {assistantDraft ? <AssistantBubblePreview>{assistantDraft}</AssistantBubblePreview> : null}
          </div>
        </div>

        <div className="shrink-0">
          <ChatInputPreview value={inputText} />
        </div>
      </div>
    </PreviewShell>
  );
}
