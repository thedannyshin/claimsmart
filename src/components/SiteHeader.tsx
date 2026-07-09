import { Link } from "react-router-dom";
import { FailSafeLogo } from "./FailSafeLogo";
import { isAuthenticated } from "../lib/auth";
import { LANDING_SHELL } from "./landing/LandingLayout";
import { HOVER_NEUTRAL, LANDING_BTN_PRIMARY } from "../lib/ui";

interface SiteHeaderProps {
  variant?: "marketing" | "app";
  showAuth?: boolean;
  /** Align header with bordered landing grid */
  grid?: boolean;
}

export function SiteHeader({ variant = "marketing", showAuth = true, grid = false }: SiteHeaderProps) {
  const signedIn = isAuthenticated();
  const authHref = signedIn ? "/account" : "/login";
  const shell = grid ? `${LANDING_SHELL}` : "mx-auto max-w-6xl";

  return (
    <header
      className={`border-b border-border ${
        grid ? "landing-page sticky top-0 z-50 bg-surface" : "bg-surface"
      }`}
    >
      <div className={`${shell} flex h-16 items-center justify-between px-5 sm:px-8 lg:px-10`}>
        <Link to="/" className="pressable flex items-center">
          <FailSafeLogo
            size="lg"
            subbrand={variant === "app" ? "ClaimSmart" : undefined}
          />
        </Link>

        {variant === "marketing" && (
          <nav className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
            <a href="#features" className="pressable transition-colors hover:text-ink">
              Features
            </a>
            <a href="#how-it-works" className="pressable transition-colors hover:text-ink">
              How it works
            </a>
            <a href="#testimonials" className="pressable transition-colors hover:text-ink">
              Reviews
            </a>
            <a href="#faq" className="pressable transition-colors hover:text-ink">
              FAQ
            </a>
          </nav>
        )}

        {variant === "app" && (
          <div className="hidden items-center gap-3 text-xs text-ink-muted sm:flex">
            <span className="border border-border bg-surface px-2.5 py-1 font-medium text-ink-muted">
              FS-2847193
            </span>
          </div>
        )}

        {showAuth && (
          <div className="flex items-center gap-2 sm:gap-3">
            {!grid && (
              <Link
                to={authHref}
                className={`hidden rounded-full border border-border px-4 py-2 text-sm font-medium text-ink sm:inline-flex ${HOVER_NEUTRAL}`}
              >
                {signedIn ? "Account" : "Sign in"}
              </Link>
            )}
            <Link
              to={signedIn ? "/account" : "/login"}
              className={
                grid
                  ? LANDING_BTN_PRIMARY + " !px-4 !py-2 text-sm"
                  : "pressable rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-hover"
              }
            >
              {signedIn ? "Open ClaimSmart" : grid ? "Sign in" : "Get started"}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
