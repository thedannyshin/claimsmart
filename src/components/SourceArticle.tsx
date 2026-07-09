import type { PolicyPageContent } from "../data/policyPages";
import { HOVER_NEUTRAL } from "../lib/ui";

const CALLOUT_STYLES = {
  info: "border-border bg-surface-subtle text-ink-muted",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  note: "border-border bg-surface text-ink-muted",
};

interface SourceArticleProps {
  article: PolicyPageContent;
  compact?: boolean;
}

export function SourceArticle({ article, compact }: SourceArticleProps) {
  return (
    <article className={compact ? "space-y-4" : "space-y-5"}>
      <header>
        <span className="inline-block rounded-full border border-border bg-surface px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-muted">
          {article.category}
        </span>
        <h1
          className={`mt-3 font-bold leading-snug text-ink ${
            compact ? "text-lg" : "text-xl"
          }`}
        >
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="mt-1 text-xs text-ink-muted">{article.subtitle}</p>
        )}
        <p className="mt-3 text-[11px] text-ink-faint">
          Updated {article.updatedAt} · {article.readTime}
        </p>
      </header>

      <p
        className={`leading-relaxed text-ink ${
          compact ? "text-sm font-medium" : "border-l-2 border-accent/30 pl-3 text-sm"
        }`}
      >
        {article.summary}
      </p>

      <div className="space-y-5">
        {article.sections.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <h2 className="text-xs font-semibold uppercase tracking-wide text-ink">
                {section.heading}
              </h2>
            )}
            {section.paragraphs?.map((p, j) => (
              <p
                key={j}
                className={`leading-relaxed text-ink-muted ${section.heading ? "mt-2" : ""} text-sm`}
              >
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className={`space-y-1.5 ${section.heading || section.paragraphs ? "mt-2" : ""}`}>
                {section.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-ink-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.callout && (
              <div
                className={`mt-3 rounded-xl border px-3 py-2.5 text-xs leading-relaxed ${
                  CALLOUT_STYLES[section.callout.variant]
                }`}
              >
                {section.callout.text}
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

interface SourceListItemProps {
  title: string;
  category: string;
  readTime: string;
  active?: boolean;
  onClick: () => void;
}

export function SourceListItem({
  title,
  category,
  readTime,
  active,
  onClick,
}: SourceListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border px-3 py-2.5 text-left transition ${
        active
          ? "border-ink bg-surface-subtle"
          : `border-transparent bg-transparent ${HOVER_NEUTRAL}`
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-ink-faint">
          {category}
        </span>
        <span className="shrink-0 text-[10px] text-ink-faint">{readTime}</span>
      </div>
      <p className="mt-1 text-xs font-semibold leading-snug text-ink">{title}</p>
    </button>
  );
}
