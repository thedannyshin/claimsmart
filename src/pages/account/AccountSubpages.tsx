import { Link } from "react-router-dom";
import { PortalLayout } from "../../components/PortalLayout";
import { SourceArticle } from "../../components/SourceArticle";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { POLICY_PAGES } from "../../data/policyPages";
import { CHIP, HOVER_NEUTRAL } from "../../lib/ui";

const POLICY_DOCS = [
  { slug: "overview", label: "Policy overview" },
  { slug: "coverage", label: "Coverage summary" },
  { slug: "coverage/water-damage", label: "Section 4.2: Water damage" },
  { slug: "deductibles", label: "Deductibles & limits" },
  { slug: "exclusions", label: "Exclusions & endorsements" },
  { slug: "claims/guide", label: "How claims work" },
];

export function AccountPolicyPage() {
  useRequireAuth();

  return (
    <PortalLayout title="Policy documents" subtitle="Your HomeProtect Plus policy booklet and guides.">
      <div className="grid gap-3 sm:grid-cols-2">
        {POLICY_DOCS.map((doc) => {
          const article = POLICY_PAGES[doc.slug];
          return (
            <Link
              key={doc.slug}
              to={`/policy/${doc.slug}`}
              className="rounded-xl border border-border bg-surface p-4 transition hover:border-border-strong hover:shadow-soft"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-ink-faint">
                {article.category}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{doc.label}</p>
              <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{article.summary}</p>
              <p className="mt-2 text-[10px] text-ink-faint">{article.readTime}</p>
            </Link>
          );
        })}
      </div>
    </PortalLayout>
  );
}

export function AccountBillingPage() {
  useRequireAuth();
  const article = POLICY_PAGES.billing;

  return (
    <PortalLayout title="Billing & payments" subtitle="Manage premiums, invoices, and payment methods.">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="text-sm font-medium text-ink">Current balance</p>
            <p className="mt-1 text-2xl font-semibold text-ink">$1,284.00</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium text-ink-muted ${CHIP}`}>
            Autopay on
          </span>
        </div>
        <div className="mt-6">
          <SourceArticle article={article} compact />
        </div>
        <button
          type="button"
          className="mt-6 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-hover"
        >
          Make a payment
        </button>
      </div>
    </PortalLayout>
  );
}

export function AccountContactPage() {
  useRequireAuth();
  const article = POLICY_PAGES["account/contact"];

  return (
    <PortalLayout title="Contact information" subtitle="Update how FailSafe reaches you.">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-ink-faint">Email</dt>
            <dd className="mt-1 text-sm font-medium text-ink">sarah.mitchell@email.com</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-faint">Phone</dt>
            <dd className="mt-1 text-sm font-medium text-ink">(555) 482-0193</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs text-ink-faint">Mailing address</dt>
            <dd className="mt-1 text-sm font-medium text-ink">42 Maple Drive, Portland, OR 97201</dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-border pt-6">
          <SourceArticle article={article} compact />
        </div>
        <button
          type="button"
          className={`mt-6 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-ink ${HOVER_NEUTRAL}`}
        >
          Edit contact info
        </button>
      </div>
    </PortalLayout>
  );
}
