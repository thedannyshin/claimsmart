import type { ChatMessage, Source } from "../types";

export const DISCLAIMER_TEXT =
  "This information is for general guidance only. For a final coverage determination, please speak with a FailSafe agent at 1-800-555-0142.";

export const SUPPORT_PHONE = "1-800-555-0142";

export const MOCK_POLICY = {
  name: "Sarah Mitchell",
  policyNumber: "FS-2847193",
  email: "sarah.mitchell@email.com",
};

export const SUGGESTED_PROMPTS = [
  "Am I covered for water damage?",
  "What's the status of my claim?",
  "File a new claim",
  "Update my contact info",
];

export const SOURCE_LINKS = {
  policyOverview: { label: "Policy FS-2847193 overview", href: "/policy/overview" },
  coverageSummary: { label: "Coverage summary", href: "/policy/coverage" },
  waterDamage: { label: "HomeProtect Plus: Water damage (Sec. 4.2)", href: "/policy/coverage/water-damage" },
  deductibles: { label: "Deductibles & limits", href: "/policy/deductibles" },
  exclusions: { label: "Exclusions & endorsements", href: "/policy/exclusions" },
  claimStatus: { label: "Claim CLM-2026-44821", href: "/policy/claims/CLM-2026-44821" },
  claimsGuide: { label: "How claims work", href: "/policy/claims/guide" },
  fnol: { label: "File a first notice of loss", href: "/assistant/fnol" },
  contactUpdate: { label: "Update contact information", href: "/policy/account/contact" },
  accountPortal: { label: "FailSafe account portal", href: "/account" },
  billing: { label: "Billing & payments", href: "/policy/billing" },
  helpCenter: { label: "ClaimSmart help center", href: "/#faq" },
  features: { label: "What ClaimSmart can do", href: "/#features" },
} satisfies Record<string, Source>;

const coverageResponse =
  "Based on your HomeProtect Plus policy (FS-2847193), sudden and accidental water damage from burst pipes is covered up to your dwelling limit of $350,000, minus your $1,000 deductible. Damage from gradual leaks or poor maintenance is excluded.";

interface MockResponse {
  content: string;
  sources: Source[];
  showSelfServe?: boolean;
}

export const MOCK_RESPONSES: Record<string, MockResponse> = {
  "Am I covered for water damage?": {
    content: coverageResponse,
    sources: [
      SOURCE_LINKS.waterDamage,
      SOURCE_LINKS.coverageSummary,
      SOURCE_LINKS.deductibles,
      SOURCE_LINKS.exclusions,
    ],
  },
  "What's the status of my claim?": {
    content:
      "Your most recent claim (CLM-2026-44821) was filed on June 12, 2026 for wind damage. Status: Under review. An adjuster was assigned on June 14. Estimated resolution: 5-7 business days.",
    sources: [SOURCE_LINKS.claimStatus, SOURCE_LINKS.claimsGuide, SOURCE_LINKS.policyOverview],
  },
  "Update my contact info": {
    content:
      "I can help you update your contact information. For security, phone number and address changes require verification through your FailSafe account portal. Would you like me to send a secure link to your email on file (s***@email.com)?",
    sources: [SOURCE_LINKS.contactUpdate, SOURCE_LINKS.accountPortal],
  },
  default: {
    content:
      "I can help with coverage questions, claim status, simple claim filing, and contact updates. What would you like to do?",
    sources: [SOURCE_LINKS.features, SOURCE_LINKS.helpCenter],
    showSelfServe: true,
  },
};

const KEYWORD_RESPONSES: { pattern: RegExp; content: string; sources: Source[]; showSelfServe?: boolean }[] = [
  {
    pattern: /bill|payment|premium|invoice/i,
    content:
      "Billing questions aren't available in ClaimSmart yet. You can view invoices and payment history in your FailSafe account portal. Most billing issues are resolved there in a few clicks. Would you like me to send a secure link to your account?",
    sources: [SOURCE_LINKS.billing, SOURCE_LINKS.accountPortal],
    showSelfServe: true,
  },
  {
    pattern: /disput|denied|appeal|lawyer/i,
    content:
      "Disputed or denied claims need specialist review. I can start a callback request so an adjuster reaches you within 24 hours. Would you like me to schedule that?",
    sources: [SOURCE_LINKS.claimStatus, SOURCE_LINKS.claimsGuide],
    showSelfServe: true,
  },
  {
    pattern: /policy change|add driver|cancel|renew/i,
    content:
      "Policy changes can be done in your FailSafe account. I can walk you through the steps or send a direct link. Which change are you looking to make?",
    sources: [SOURCE_LINKS.policyOverview, SOURCE_LINKS.accountPortal],
    showSelfServe: true,
  },
  {
    pattern: /speak|talk|call|agent|human|representative/i,
    content:
      "I can help with coverage questions, claim status, filing, and contact updates. What's your question?",
    sources: [SOURCE_LINKS.features, SOURCE_LINKS.helpCenter],
    showSelfServe: true,
  },
];

export function createAssistantMessage(userText: string, id: string): ChatMessage {
  const exact = MOCK_RESPONSES[userText];
  if (exact) {
    return {
      id,
      role: "assistant",
      content: exact.content,
      sources: exact.sources,
      showSelfServe: exact.showSelfServe,
      timestamp: new Date(),
    };
  }

  const keyword = KEYWORD_RESPONSES.find((r) => r.pattern.test(userText));
  if (keyword) {
    return {
      id,
      role: "assistant",
      content: keyword.content,
      sources: keyword.sources,
      showSelfServe: keyword.showSelfServe,
      timestamp: new Date(),
    };
  }

  const fallback = MOCK_RESPONSES.default;
  return {
    id,
    role: "assistant",
    content: fallback.content,
    sources: fallback.sources,
    showSelfServe: fallback.showSelfServe,
    timestamp: new Date(),
  };
}

export const INCIDENT_TYPES = [
  "Auto accident",
  "Property damage",
  "Theft or vandalism",
  "Weather-related damage",
  "Other",
];

export const SELF_SERVE_ACTIONS = [
  { label: "Check coverage", prompt: "Am I covered for water damage?" },
  { label: "Claim status", prompt: "What's the status of my claim?" },
  { label: "File a claim", prompt: "File a new claim" },
  { label: "Browse FAQ", action: "faq" as const },
];
