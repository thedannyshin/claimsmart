import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authLoginPath, isAuthenticated } from "../lib/auth";

export function useRequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(authLoginPath(location.pathname + location.search), { replace: true });
    }
  }, [location.pathname, location.search, navigate]);
}
