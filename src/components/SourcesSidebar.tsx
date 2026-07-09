import { useNavigate } from "react-router-dom";
import { resolveSourceContent } from "../data/policyPages";
import { HOVER_NEUTRAL } from "../lib/ui";
import { SourceArticle, SourceListItem } from "./SourceArticle";
import type { Source } from "../types";

interface SourcesSidebarProps {
  open: boolean;
  sources: Source[];
  selectedHref: string | null;
  onSelect: (href: string) => void;
  onClose: () => void;
  onOpenFaq?: () => void;
}

export function SourcesSidebar({
  open,
  sources,
  selectedHref,
  onSelect,
  onClose,
  onOpenFaq,
}: SourcesSidebarProps) {
  const navigate = useNavigate();
  const selected = selectedHref ? resolveSourceContent(selectedHref) : null;
  const selectedSource = sources.find((s) => s.href === selectedHref);

  if (!open) return null;

  function handleOpenExternal(href: string) {
    if (href === "/#faq") {
      onOpenFaq?.();
      onClose();
      return;
    }
    if (href.startsWith("/#")) {
      navigate("/" + href.slice(1));
      onClose();
      return;
    }
    navigate(href);
    onClose();
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/20 xl:hidden"
        onClick={onClose}
        aria-label="Close sources panel"
      />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-surface shadow-card xl:static xl:z-0 xl:h-full xl:min-h-0 xl:w-80 xl:shrink-0 xl:shadow-none 2xl:w-96">
        <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-ink">Sources</h2>
            <p className="text-[11px] text-ink-muted">{sources.length} referenced articles</p>
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

        <div className="shrink-0 border-b border-border px-2 py-2">
          <ul className="space-y-0.5">
            {sources.map((source) => {
              const article = resolveSourceContent(source.href);
              if (!article) return null;
              return (
                <li key={source.href + source.label}>
                  <SourceListItem
                    title={article.title}
                    category={article.category}
                    readTime={article.readTime}
                    active={selectedHref === source.href}
                    onClick={() => onSelect(source.href)}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          {selected && selectedSource ? (
            <>
              <SourceArticle article={selected} compact />

              {!selectedSource.href.startsWith("/policy/") && (
                <button
                  type="button"
                  onClick={() => handleOpenExternal(selectedSource.href)}
                  className="mt-6 w-full rounded-full bg-ink py-2.5 text-xs font-medium text-white transition hover:bg-ink-hover"
                >
                  Open {selectedSource.label}
                </button>
              )}

              {selected.related.length > 0 && (
                <footer className="mt-8 border-t border-border pt-5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">
                    Continue reading
                  </p>
                  <ul className="mt-3 space-y-2">
                    {selected.related.map((related) => {
                      const relatedArticle = resolveSourceContent(related.href);
                      if (!relatedArticle) return null;
                      return (
                        <li key={related.href + related.label}>
                          <button
                            type="button"
                            onClick={() => onSelect(related.href)}
                            className="group w-full rounded-lg border border-border bg-surface p-2.5 text-left transition hover:border-border-strong"
                          >
                            <p className="text-[10px] text-ink-faint">{relatedArticle.category}</p>
                            <p className="mt-0.5 text-xs font-medium text-ink group-hover:text-ink-muted">
                              {relatedArticle.title}
                            </p>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </footer>
              )}
            </>
          ) : (
            <p className="text-sm text-ink-muted">Select a source to read.</p>
          )}
        </div>
      </aside>
    </>
  );
}
