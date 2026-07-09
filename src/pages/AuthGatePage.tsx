import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FailSafeLogo } from "../components/FailSafeLogo";
import { HOVER_NEUTRAL } from "../lib/ui";
import { isAuthenticated, setAuthenticated } from "../lib/auth";

export function AuthGatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const next = searchParams.get("next") || "/account";

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(next, { replace: true });
    }
  }, [navigate, next]);

  function completeLogin() {
    setAuthenticated();
    navigate(next, { replace: true });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email && password.length >= 4) {
        completeLogin();
      } else {
        setError("Please enter your credentials to continue.");
        setLoading(false);
      }
    }, 900);
  }

  function handleDemoLogin() {
    setLoading(true);
    setTimeout(completeLogin, 600);
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10";

  return (
    <div className="flex min-h-screen bg-surface">
      <div className="flex w-full flex-col justify-center bg-surface px-6 py-12 sm:px-12 lg:w-[480px] lg:shrink-0 lg:px-16 xl:w-[520px]">
        <Link to="/" className="mb-10 inline-flex">
          <FailSafeLogo size="lg" />
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-ink">Sign in to your account</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Access your policy, billing, and ClaimSmart assistant.
        </p>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className={`flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-surface py-2.5 text-sm font-medium text-ink disabled:opacity-60 ${HOVER_NEUTRAL}`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            disabled={loading}
            className={`flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface py-2.5 text-sm font-medium text-ink disabled:opacity-60 ${HOVER_NEUTRAL}`}
          >
            Continue with SSO
            <svg className="h-3.5 w-3.5 text-ink-faint" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-ink-faint">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className={inputClass}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-ink">
                Password
              </label>
              <span className="text-xs font-medium text-accent">Forgot password?</span>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="pressable w-full rounded-full bg-ink py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-hover disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="pressable mt-4 w-full text-center text-sm text-ink-muted transition-colors hover:text-ink disabled:opacity-60"
        >
          Continue as <span className="font-medium text-ink">Sarah Mitchell</span> (demo)
        </button>

        <p className="mt-8 text-xs leading-relaxed text-ink-faint">
          By signing in, you agree to FailSafe&apos;s Terms of Service and Privacy Policy.
        </p>
      </div>

      <div className="relative hidden flex-1 items-center justify-center border-l border-border bg-surface-subtle p-12 lg:flex">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-card">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">Account portal</p>
          <h2 className="mt-2 text-xl font-bold text-ink">Your policy, one place</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>View policy documents</li>
            <li>Pay bills and manage autopay</li>
            <li>Open ClaimSmart assistant</li>
            <li>Track claims and file FNOL</li>
          </ul>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-ink">HomeProtect Plus</p>
            <p className="mt-1 text-xs text-ink-muted">FS-2847193 · Active</p>
            <div className="chip mt-3 inline-block px-2.5 py-1 text-[10px] font-medium">
              ClaimSmart ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
