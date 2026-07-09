import type { ReactNode } from "react";
import { FailSafeLogo } from "../FailSafeLogo";
import { MOCK_POLICY, SUGGESTED_PROMPTS } from "../../data/mock";
import { CHIP, LANDING_CHIP } from "../../lib/ui";

const WELCOME =
  "Hello Sarah! I'm ClaimSmart, your AI assistant for policy FS-2847193. I can help with coverage questions, claim status, filing a simple claim, or updating contact info. How can I help you today?";

const WATER_ANSWER =
  "Based on your HomeProtect Plus policy (FS-2847193), sudden and accidental water damage from burst pipes is covered up to your dwelling limit of $350,000, minus your $1,000 deductible.";

function ChatIcon({ className = "h-4 w-4 shrink-0 opacity-50" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
      />
    </svg>
  );
}

export function PreviewShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none select-none overflow-hidden border border-border bg-surface ${className}`}
      aria-hidden
    >
      {children}
    </div>
  );
}

export function ChatSidebarPreview({
  activeTitle = "Water damage coverage",
}: {
  activeTitle?: string;
}) {
  const chats = ["Water damage coverage", "Claim status CLM-44821", "Contact info update"];

  return (
    <aside className="flex w-44 shrink-0 flex-col border-r border-border bg-surface sm:w-52">
      <div className="flex items-center border-b border-border px-3 py-2.5">
        <div className="flex items-center gap-2">
          <FailSafeLogo size="sm" wordmark="ClaimSmart" />
        </div>
      </div>

      <div className="p-2.5">
        <div className="flex w-full items-center gap-2 rounded-full bg-ink px-3 py-2 text-xs font-medium text-white">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New chat
        </div>
      </div>

      <nav className="flex-1 px-1.5">
        <p className="px-2 py-1.5 text-xs font-medium text-ink-faint">Recent</p>
        {chats.map((title) => {
          const active = title === activeTitle;
          return (
            <div
              key={title}
              className={`mb-0.5 flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-left text-xs ${
                active ? "bg-ink font-medium text-white" : "text-ink-muted"
              }`}
            >
              <ChatIcon className={`h-3.5 w-3.5 shrink-0 ${active ? "opacity-70" : "opacity-50"}`} />
              <span className="truncate">{title}</span>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-border p-2.5">
        <div className="rounded-xl border border-border bg-surface-subtle p-2.5">
          <p className="text-[11px] font-medium text-ink-muted">{MOCK_POLICY.name}</p>
          <p className="text-[10px] text-ink-muted">{MOCK_POLICY.policyNumber}</p>
        </div>
      </div>
    </aside>
  );
}

export function ChatHeaderPreview({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-3 py-2.5 sm:px-4">
      <div className="min-w-0">
        <h1 className="truncate text-sm font-semibold text-ink">{title}</h1>
        <p className="text-[11px] text-ink-muted">Policy assistant</p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="hidden rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-ink sm:inline">
          Account
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-ink">FAQ</span>
        <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium text-white">File a claim</span>
      </div>
    </header>
  );
}

export function UserBubblePreview({ children }: { children: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md border border-border bg-surface-muted px-3 py-2 text-xs leading-relaxed text-ink-muted sm:max-w-[70%] sm:text-sm">
        {children}
      </div>
    </div>
  );
}

export function AssistantBubblePreview({
  children,
  sourceCount,
  sourcesActive,
  sourceLabel,
}: {
  children: string;
  sourceCount?: number;
  sourcesActive?: boolean;
  sourceLabel?: string;
}) {
  const showSources = sourceLabel != null || (sourceCount != null && sourceCount > 0);

  return (
    <div className="flex gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-surface">
        AI
      </div>
      <div className="min-w-0 max-w-[90%] rounded-2xl border border-border bg-surface px-3 py-2.5 sm:max-w-[80%]">
        <div className="text-xs leading-relaxed text-ink sm:text-sm">{children}</div>
        {showSources && (
          <div
            className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium sm:text-[11px] ${
              sourcesActive ? "border-ink" : ""
            } ${CHIP}`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            {sourceLabel ?? "Sources"}
            {!sourceLabel && sourceCount != null && sourceCount > 0 && (
              <span className="rounded-full bg-surface-subtle px-1.5 text-[10px] text-ink-faint">{sourceCount}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatInputPreview({
  showSuggestions = false,
  value = "",
  placeholder = "Ask ClaimSmart anything about your policy…",
}: {
  showSuggestions?: boolean;
  value?: string;
  placeholder?: string;
}) {
  return (
    <div className="border-t border-border bg-surface px-3 py-3 sm:px-4">
      {showSuggestions && (
        <div className="mb-3 flex flex-wrap justify-center gap-1.5">
          {SUGGESTED_PROMPTS.slice(0, 2).map((prompt) => (
            <span key={prompt} className={`px-3 py-1 text-[10px] font-medium sm:text-xs ${LANDING_CHIP}`}>
              {prompt}
            </span>
          ))}
        </div>
      )}
      <div
        className={`mx-auto flex max-w-2xl items-center gap-2 rounded-full border bg-surface px-2 py-1.5 ${
          value ? "border-ink" : "border-border"
        }`}
      >
        <span
          className={`flex-1 truncate px-3 py-1.5 text-xs sm:text-sm ${
            value ? "text-ink" : "text-ink-faint"
          }`}
        >
          {value || placeholder}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 ${
            value ? "bg-ink text-surface" : "bg-surface-subtle text-ink-faint"
          }`}
        >
          <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function ChatThreadPreview({
  variant = "coverage",
  showSuggestions = false,
}: {
  variant?: "coverage" | "welcome";
  showSuggestions?: boolean;
}) {
  return (
    <div className="flex-1 overflow-hidden px-3 py-4 sm:px-5 sm:py-5">
      <div className="mx-auto max-w-2xl space-y-4">
        {variant === "welcome" ? (
          <div className="flex flex-col items-center pt-4 text-center sm:pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface text-base font-bold text-ink sm:h-12 sm:w-12 sm:text-lg">
              ✦
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink sm:text-xl">Hi Sarah, how can I help?</h2>
            <p className="mt-1.5 text-xs text-ink-muted sm:text-sm">
              Coverage answers, claim updates, and filing, all in one place.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {["Check coverage", "Claim status", "File a claim", "FAQ"].map((label) => (
                <span key={label} className={`px-3 py-1 text-[10px] font-medium sm:text-xs ${LANDING_CHIP}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <>
            <AssistantBubblePreview sourceCount={2}>{WELCOME}</AssistantBubblePreview>
            <UserBubblePreview>Am I covered for water damage?</UserBubblePreview>
            <AssistantBubblePreview sourceCount={3} sourcesActive>
              {WATER_ANSWER}
            </AssistantBubblePreview>
          </>
        )}
      </div>
      {variant === "welcome" && showSuggestions && (
        <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-1.5">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <span key={prompt} className={`px-3 py-1 text-[10px] font-medium sm:text-xs ${LANDING_CHIP}`}>
              {prompt}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function ChatAppPreview({
  title = "Water damage coverage",
  variant = "coverage",
  showSources = false,
  size = "default",
}: {
  title?: string;
  variant?: "coverage" | "welcome";
  showSources?: boolean;
  size?: "default" | "hero";
}) {
  const heightClass =
    size === "hero" ? "h-[30rem] sm:h-[34rem] lg:h-[38rem] xl:h-[40rem]" : "h-[26rem] sm:h-[28rem]";

  return (
    <PreviewShell className={size === "hero" ? "shadow-none" : ""}>
      <div className={`flex ${heightClass}`}>
        <ChatSidebarPreview activeTitle={title} />
        <div className="flex min-w-0 flex-1 flex-col">
          <ChatHeaderPreview title={title} />
          <ChatThreadPreview variant={variant} showSuggestions={variant === "welcome"} />
          <ChatInputPreview showSuggestions={variant === "welcome"} />
        </div>
        {showSources && <SourcesPanelPreview />}
      </div>
    </PreviewShell>
  );
}

export function SourcesPanelPreview({ className = "" }: { className?: string }) {
  const sources = [
    { title: "Section 4.2: Water damage", category: "Policy document", active: true },
    { title: "Coverage summary", category: "Policy document", active: false },
    { title: "Deductibles & limits", category: "Policy document", active: false },
  ];

  return (
    <aside className={`flex min-h-0 flex-col bg-surface ${className}`}>
      <header className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2.5">
        <h2 className="text-xs font-semibold text-ink sm:text-sm">Sources</h2>
      </header>

      <div className="shrink-0 border-b border-border px-1.5 py-1.5">
        <ul className="space-y-0.5">
          {sources.map((source) => (
            <li key={source.title}>
              <div
                className={`w-full rounded-lg border px-2.5 py-2 text-left ${
                  source.active ? "border-ink bg-surface" : "border-transparent"
                }`}
              >
                <p className="text-[10px] text-ink-faint">{source.category}</p>
                <p className="mt-1 text-[11px] font-semibold leading-snug text-ink">{source.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-3 py-3">
        <p className="text-[10px] text-ink-faint">Policy document</p>
        <p className="mt-2 text-sm font-bold leading-snug text-ink">Section 4.2: Water damage</p>
        <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
          Sudden and accidental water damage from burst pipes is covered up to your dwelling limit, minus your
          deductible.
        </p>
      </div>
    </aside>
  );
}

/** Verified feature — answer + sources panel, no cramped 3-column chat */
export function VerifiedFeaturePreview() {
  return (
    <PreviewShell>
      <div className="flex h-[24rem] flex-col">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <FailSafeLogo size="sm" wordmark="ClaimSmart" className="shrink-0" />
          <span className="text-[11px] font-medium text-ink">Signed in as {MOCK_POLICY.name}</span>
          <span className={`ml-auto px-2 py-0.5 text-[10px] font-medium ${CHIP}`}>SSO</span>
        </div>

        <div className="grid min-h-0 flex-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-border p-4 lg:border-b-0 lg:border-r lg:p-5">
            <UserBubblePreview>Am I covered for water damage?</UserBubblePreview>
            <div className="mt-4">
              <AssistantBubblePreview sourceCount={3} sourcesActive>
                Sudden and accidental water damage from burst pipes is covered up to $350,000, minus your $1,000
                deductible.
              </AssistantBubblePreview>
            </div>
          </div>

          <SourcesPanelPreview className="min-h-[12rem] lg:min-h-0" />
        </div>
      </div>
    </PreviewShell>
  );
}

export function FnolStepPreview() {
  return (
    <PreviewShell>
      <div className="h-1 bg-border">
        <div className="h-full w-2/3 bg-accent" />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">Description</h3>
        <p className="mt-1 text-sm text-ink-muted">Tell us more about the loss</p>

        <div className="mt-5">
          <p className="text-sm font-medium text-ink">Incident description</p>
          <div className="mt-1.5 min-h-[6.5rem] rounded-xl border border-border px-3.5 py-2.5 text-sm leading-relaxed text-ink-muted">
            Kitchen pipe burst on June 12. Water damaged cabinets and flooring in the kitchen and adjacent hallway…
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-ink">
            Photos of damage <span className="font-normal text-ink-faint">(optional, up to 5)</span>
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Help your adjuster assess the claim faster. JPG, PNG, HEIC, or WebP · max 10 MB each.
          </p>
          <div className="mt-3 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-subtle px-4 py-6">
            <svg className="h-6 w-6 text-ink-faint" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
              />
            </svg>
            <span className="mt-2 text-sm font-medium text-ink">Add photos</span>
            <span className="mt-0.5 text-xs text-ink-faint">Tap to browse or take a photo</span>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

export function PortalDashboardPreview() {
  return (
    <PreviewShell>
      <div className="flex h-[26rem] sm:h-[28rem]">
        <aside className="hidden w-44 shrink-0 flex-col border-r border-border bg-surface sm:flex">
          <div className="border-b border-border px-4 py-3">
            <FailSafeLogo size="sm" tagline="Account portal" />
          </div>
          <nav className="flex-1 space-y-0.5 p-2.5">
            {[
              { label: "Overview", active: true },
              { label: "ClaimSmart", active: false },
              { label: "Policy documents", active: false },
              { label: "Billing", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl px-2.5 py-2 text-xs ${
                  item.active ? "bg-ink font-medium text-white" : "text-ink-muted"
                }`}
              >
                {item.label}
              </div>
            ))}
          </nav>
          <div className="border-t border-border p-2.5">
            <div className="rounded-xl border border-border bg-surface-subtle p-2.5">
              <p className="text-[11px] font-medium text-ink-muted">{MOCK_POLICY.name}</p>
              <p className="text-[10px] text-ink-muted">{MOCK_POLICY.policyNumber}</p>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">Welcome back, Sarah</h2>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">Manage your policy, billing, and claims in one place.</p>

          <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-surface p-4">
            <p className="text-sm font-medium text-accent">ClaimSmart</p>
            <p className="mt-1 text-base font-bold text-ink">Open ClaimSmart</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
              Ask coverage questions, check claim status, or file a first notice of loss with your AI assistant.
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div className="rounded-3xl border border-border bg-surface p-3">
              <p className="text-xs font-medium text-ink-faint">Active policy</p>
              <p className="mt-1.5 text-sm font-bold text-ink">HomeProtect Plus</p>
              <p className="text-[11px] text-ink-muted">{MOCK_POLICY.policyNumber}</p>
            </div>
            <div className="rounded-3xl border border-border bg-surface p-3">
              <p className="text-xs font-medium text-ink-faint">Recent claim</p>
              <p className="mt-1.5 text-sm font-bold text-ink">CLM-2026-44821</p>
              <span className={`mt-2 inline-block px-2 py-0.5 text-[9px] font-medium text-ink-muted ${CHIP}`}>
                Under review
              </span>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}
