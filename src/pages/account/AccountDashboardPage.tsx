import { Link } from "react-router-dom";
import { PortalLayout } from "../../components/PortalLayout";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { MOCK_POLICY } from "../../data/mock";
import { CHIP } from "../../lib/ui";

export function AccountDashboardPage() {
  useRequireAuth();

  return (
    <PortalLayout
      title={`Welcome back, ${MOCK_POLICY.name.split(" ")[0]}`}
      subtitle="Manage your policy, billing, and claims in one place."
    >
      <Link
        to="/assistant"
        className="group block overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-soft transition hover:shadow-card"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">ClaimSmart</p>
            <h2 className="mt-1 text-lg font-bold text-ink">Open ClaimSmart</h2>
            <p className="mt-2 max-w-md text-sm text-ink-muted">
              Ask coverage questions, check claim status, or file a first notice of loss with your
              AI assistant.
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-ink-hover">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </Link>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">Active policy</p>
          <p className="mt-2 text-lg font-bold text-ink">HomeProtect Plus</p>
          <p className="text-sm text-ink-muted">{MOCK_POLICY.policyNumber}</p>
          <p className="mt-3 text-xs text-ink-faint">Renews Jan 1, 2027</p>
          <Link to="/account/policy" className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover">
            View documents →
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">Recent claim</p>
          <p className="mt-2 text-lg font-bold text-ink">CLM-2026-44821</p>
          <p className="text-sm text-ink-muted">Wind damage · Under review</p>
          <span className={`mt-3 inline-block px-2.5 py-1 text-[10px] font-medium text-ink-muted ${CHIP}`}>
            Under review
          </span>
          <Link to="/policy/claims/CLM-2026-44821" className="mt-4 block text-sm font-medium text-accent hover:text-accent-hover">
            View claim →
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-ink">Quick links</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Pay bill", href: "/account/billing", desc: "View invoices & autopay" },
            { label: "Update contact", href: "/account/contact", desc: "Phone, email, address" },
            { label: "File a claim", href: "/assistant/fnol", desc: "First notice of loss" },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="rounded-2xl border border-border bg-surface p-4 transition hover:border-border-strong hover:shadow-soft"
            >
              <p className="text-sm font-medium text-ink">{item.label}</p>
              <p className="mt-1 text-xs text-ink-muted">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
