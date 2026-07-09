import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FailSafeLogo } from "./FailSafeLogo";
import { clearAuthenticated } from "../lib/auth";
import { MOCK_POLICY } from "../data/mock";

const NAV = [
  { label: "Overview", href: "/account", icon: "home" },
  { label: "ClaimSmart", href: "/assistant", icon: "chat" },
  { label: "Policy documents", href: "/account/policy", icon: "doc" },
  { label: "Billing", href: "/account/billing", icon: "billing" },
  { label: "Contact info", href: "/account/contact", icon: "contact" },
];

function NavIcon({ type }: { type: string }) {
  const className = "h-4 w-4 shrink-0 opacity-70";
  if (type === "home")
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    );
  if (type === "chat")
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    );
  if (type === "billing")
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m3.75-2.25V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0 1 1.123-.08m-5.801 0c1.01-.05 1.787-.854 1.787-1.854V4.125A2.25 2.25 0 0 1 13.5 1.875h-3c-1.01 0-1.875.875-1.875 1.875v.75c0 1.001.776 1.804 1.787 1.854m-5.801 0H18" />
      </svg>
    );
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

interface PortalLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function PortalLayout({ children, title, subtitle }: PortalLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  function signOut() {
    clearAuthenticated();
    navigate("/");
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface lg:flex">
        <div className="border-b border-border px-5 py-4">
          <Link to="/account" className="flex items-center">
            <FailSafeLogo size="md" tagline="Account portal" />
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map((item) => {
            const active =
              item.href === "/account"
                ? location.pathname === "/account"
                : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-ink font-medium text-white"
                    : "text-ink-muted hover:bg-hover-neutral hover:text-ink-muted"
                }`}
              >
                <NavIcon type={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="rounded-xl border border-border bg-surface-subtle p-3">
            <p className="text-xs font-medium text-ink-muted">{MOCK_POLICY.name}</p>
            <p className="text-[11px] text-ink-muted">{MOCK_POLICY.policyNumber}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="mt-3 w-full text-left text-xs text-ink-muted hover:text-ink-muted/80"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-border bg-surface px-4 py-4 sm:px-6 lg:hidden">
          <div className="flex items-center justify-between">
            <Link to="/account" className="text-sm font-semibold text-ink">
              FailSafe Account
            </Link>
            <Link to="/assistant" className="text-xs font-medium text-ink-muted hover:text-ink">
              ClaimSmart
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
