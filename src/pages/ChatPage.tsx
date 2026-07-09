import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { HOVER_NEUTRAL } from "../lib/ui";
import { ChatBubble } from "../components/ChatBubble";
import { ChatInput } from "../components/ChatInput";
import { Disclaimer } from "../components/Disclaimer";
import { FailSafeLogo } from "../components/FailSafeLogo";
import { FaqPanel } from "../components/FaqPanel";
import { SourcesSidebar } from "../components/SourcesSidebar";
import { SelfServeActions } from "../components/SelfServeActions";
import {
  MOCK_POLICY,
  SOURCE_LINKS,
  SUGGESTED_PROMPTS,
  createAssistantMessage,
} from "../data/mock";
import type { ChatMessage, Conversation, Source } from "../types";

function createWelcomeMessage(): ChatMessage {
  return {
    id: `welcome-${Date.now()}`,
    role: "assistant",
    content: `Hello ${MOCK_POLICY.name.split(" ")[0]}! I'm ClaimSmart, your AI assistant for policy FS-2847193. I can help with coverage questions, claim status, filing a simple claim, or updating contact info. How can I help you today?`,
    sources: [SOURCE_LINKS.features, SOURCE_LINKS.helpCenter],
    timestamp: new Date(),
  };
}

function createConversation(id: string, title: string, messages: ChatMessage[]): Conversation {
  return { id, title, messages, updatedAt: new Date() };
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  createConversation("1", "Water damage coverage", [
    createWelcomeMessage(),
    {
      id: "u1",
      role: "user",
      content: "Am I covered for water damage?",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "a1",
      role: "assistant",
      content:
        "Based on your HomeProtect Plus policy (FS-2847193), sudden and accidental water damage from burst pipes is covered up to your dwelling limit of $350,000, minus your $1,000 deductible.",
      sources: [
        SOURCE_LINKS.waterDamage,
        SOURCE_LINKS.coverageSummary,
        SOURCE_LINKS.deductibles,
      ],
      timestamp: new Date(Date.now() - 3590000),
    },
  ]),
  createConversation("2", "Claim status CLM-44821", [
    createWelcomeMessage(),
    {
      id: "u2",
      role: "user",
      content: "What's the status of my claim?",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "a2",
      role: "assistant",
      content:
        "Your most recent claim (CLM-2026-44821) was filed on June 12, 2026 for wind damage. Status: Under review. An adjuster was assigned on June 14.",
      sources: [SOURCE_LINKS.claimStatus, SOURCE_LINKS.claimsGuide],
      timestamp: new Date(Date.now() - 86390000),
    },
  ]),
  createConversation("3", "Contact info update", [createWelcomeMessage()]),
];

function titleFromMessage(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= 40) return trimmed;
  return `${trimmed.slice(0, 40)}…`;
}

export function ChatPage() {
  const navigate = useNavigate();
  useRequireAuth();
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeId, setActiveId] = useState("1");
  const [typing, setTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [sourcesPanel, setSourcesPanel] = useState<{
    open: boolean;
    sources: Source[];
    selectedHref: string | null;
    messageId: string | null;
  }>({ open: false, sources: [], selectedHref: null, messageId: null });
  const scrollRef = useRef<HTMLDivElement>(null);

  function openSourcesPanel(sources: Source[], messageId?: string) {
    setSourcesPanel({
      open: true,
      sources,
      selectedHref: sources[0]?.href ?? null,
      messageId: messageId ?? null,
    });
  }

  function closeSourcesPanel() {
    setSourcesPanel((prev) => ({ ...prev, open: false }));
  }

  const activeConversation = conversations.find((c) => c.id === activeId) ?? conversations[0];
  const messages = activeConversation?.messages ?? [];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeId, messages, typing]);

  const updateConversation = useCallback(
    (id: string, updater: (conv: Conversation) => Conversation) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? updater(c) : c)).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
      );
    },
    [],
  );

  const switchConversation = useCallback((id: string) => {
    setActiveId(id);
    setTyping(false);
    setSidebarOpen(false);
  }, []);

  const startNewChat = useCallback(() => {
    const id = `chat-${Date.now()}`;
    const newConv = createConversation(id, "New chat", [createWelcomeMessage()]);
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(id);
    setTyping(false);
    setSidebarOpen(false);
  }, []);

  const handleSend = useCallback(
    (text: string) => {
      const conversationId = activeId;
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      updateConversation(conversationId, (conv) => {
        const isFirstUserMessage = conv.messages.every((m) => m.role === "assistant");
        return {
          ...conv,
          title: isFirstUserMessage ? titleFromMessage(text) : conv.title,
          messages: [...conv.messages, userMsg],
          updatedAt: new Date(),
        };
      });

      setTyping(true);

      if (text.toLowerCase().includes("file a new claim") || text.toLowerCase().includes("file a claim")) {
        setTimeout(() => {
          setTyping(false);
          navigate("/assistant/fnol");
        }, 800);
        return;
      }

      setTimeout(() => {
        const assistantMsg = createAssistantMessage(text, `assistant-${Date.now()}`);
        updateConversation(conversationId, (conv) => ({
          ...conv,
          messages: [...conv.messages, assistantMsg],
          updatedAt: new Date(),
        }));
        setTyping(false);
      }, 1200);
    },
    [activeId, navigate, updateConversation],
  );

  const showEmptyState = messages.length <= 1;

  return (
    <div className="flex h-[100dvh] flex-col bg-surface">
      <div className="flex min-h-0 flex-1">
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-surface pt-12 transition-transform lg:static lg:translate-x-0 lg:pt-0`}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <Link to="/" className="flex items-center gap-2">
              <FailSafeLogo size="sm" wordmark="ClaimSmart" />
            </Link>
          </div>

          <div className="p-3">
            <button
              type="button"
              onClick={startNewChat}
              className="flex w-full items-center gap-2 rounded-full bg-ink px-3 py-2.5 text-sm font-medium text-white transition hover:bg-ink-hover"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New chat
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-2">
            <p className="px-2 py-2 text-[11px] font-medium uppercase tracking-wider text-ink-faint">
              Recent
            </p>
            {conversations.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => switchConversation(chat.id)}
                className={`mb-0.5 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                  chat.id === activeId
                    ? "bg-ink font-medium text-white"
                    : `text-ink-muted ${HOVER_NEUTRAL}`
                }`}
              >
                <svg className="h-4 w-4 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </nav>

          <div className="border-t border-border p-3">
            <div className="rounded-xl border border-border bg-surface-subtle p-3">
              <p className="text-xs font-medium text-ink-muted">{MOCK_POLICY.name}</p>
              <p className="text-[11px] text-ink-muted">{MOCK_POLICY.policyNumber}</p>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className={`rounded-lg p-1.5 text-ink-muted lg:hidden ${HOVER_NEUTRAL}`}
                aria-label="Open sidebar"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-sm font-semibold text-ink">{activeConversation.title}</h1>
                <p className="text-xs text-ink-muted">Policy assistant</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/account"
                className={`hidden rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-ink sm:inline-flex ${HOVER_NEUTRAL}`}
              >
                Account
              </Link>
              <button
                type="button"
                onClick={() => setFaqOpen(true)}
                className={`rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-ink ${HOVER_NEUTRAL}`}
              >
                FAQ
              </button>
              <Link
                to="/assistant/fnol"
                className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-ink-hover"
              >
                File a claim
              </Link>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
            {showEmptyState ? (
              <div className="mx-auto flex max-w-xl flex-col items-center pt-12 text-center sm:pt-20">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface text-lg font-bold text-ink">
                  ✦
                </div>
                <h2 className="mt-5 text-2xl font-bold text-ink sm:text-3xl">
                  Hi {MOCK_POLICY.name.split(" ")[0]}, how can I help?
                </h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Coverage answers, claim updates, and filing, all in one place.
                </p>
                <SelfServeActions
                  onPrompt={handleSend}
                  onOpenFaq={() => setFaqOpen(true)}
                />
              </div>
            ) : null}

            <div className={`mx-auto max-w-2xl space-y-6 ${showEmptyState ? "mt-8" : ""}`}>
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  onPrompt={handleSend}
                  onOpenFaq={() => setFaqOpen(true)}
                  onOpenSources={(sources) => openSourcesPanel(sources, msg.id)}
                  sourcesActive={sourcesPanel.open && sourcesPanel.messageId === msg.id}
                />
              ))}

              {typing && (
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-surface">
                    AI
                  </div>
                  <div className="flex gap-1 pt-2">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <ChatInput
            onSend={handleSend}
            disabled={typing}
            suggestions={messages.length <= 1 ? SUGGESTED_PROMPTS : []}
          />
        </div>

        <SourcesSidebar
          open={sourcesPanel.open}
          sources={sourcesPanel.sources}
          selectedHref={sourcesPanel.selectedHref}
          onSelect={(href) => setSourcesPanel((prev) => ({ ...prev, selectedHref: href }))}
          onClose={closeSourcesPanel}
          onOpenFaq={() => setFaqOpen(true)}
        />
      </div>

      <Disclaimer />

      <FaqPanel
        open={faqOpen}
        onClose={() => setFaqOpen(false)}
        onAskQuestion={handleSend}
      />
    </div>
  );
}
