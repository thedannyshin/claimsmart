import { Link, useParams } from "react-router-dom";
import { MOCK_POLICY } from "../data/mock";
import { POLICY_PAGES } from "../data/policyPages";
import { SourceArticle } from "../components/SourceArticle";

export function PolicyPage() {
  const { "*": slug } = useParams();
  const path = slug ?? "overview";
  const page = POLICY_PAGES[path] ?? POLICY_PAGES.overview;

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-surface px-4 py-4 sm:px-6">
        <Link to="/assistant" className="text-xs text-ink-muted hover:text-ink">
          ← Back to ClaimSmart
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
          <SourceArticle article={page} />
        </div>

        {page.related.length > 0 && (
          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
              Continue reading
            </p>
            <ul className="mt-3 space-y-2">
              {page.related.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className="block rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink transition hover:border-border-strong"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-ink-faint">{MOCK_POLICY.policyNumber}</p>
      </main>
    </div>
  );
}
