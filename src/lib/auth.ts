export function isAuthenticated(): boolean {
  return sessionStorage.getItem("claimsmart_auth") === "true";
}

export function setAuthenticated(): void {
  sessionStorage.setItem("claimsmart_auth", "true");
}

export function clearAuthenticated(): void {
  sessionStorage.removeItem("claimsmart_auth");
}

export function authLoginPath(next?: string): string {
  if (!next) return "/login";
  return `/login?next=${encodeURIComponent(next)}`;
}
