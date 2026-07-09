import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AccountBillingPage,
  AccountContactPage,
  AccountPolicyPage,
} from "./pages/account/AccountSubpages";
import { AccountDashboardPage } from "./pages/account/AccountDashboardPage";
import { AuthGatePage } from "./pages/AuthGatePage";
import { ChatPage } from "./pages/ChatPage";
import { FnolFlowPage } from "./pages/FnolFlowPage";
import { LandingPage } from "./pages/LandingPage";
import { PolicyPage } from "./pages/PolicyPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthGatePage />} />
        <Route path="/account" element={<AccountDashboardPage />} />
        <Route path="/account/policy" element={<AccountPolicyPage />} />
        <Route path="/account/billing" element={<AccountBillingPage />} />
        <Route path="/account/contact" element={<AccountContactPage />} />
        <Route path="/assistant" element={<ChatPage />} />
        <Route path="/assistant/fnol" element={<FnolFlowPage />} />
        <Route path="/policy/*" element={<PolicyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
