import type { Source } from "../types";

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: { variant: "info" | "warning" | "note"; text: string };
}

export interface PolicyPageContent {
  title: string;
  subtitle?: string;
  category: string;
  updatedAt: string;
  readTime: string;
  summary: string;
  sections: ArticleSection[];
  related: Source[];
}

export const POLICY_PAGES: Record<string, PolicyPageContent> = {
  overview: {
    title: "Policy overview",
    subtitle: `HomeProtect Plus · ${"FS-2847193"}`,
    category: "Policy document",
    updatedAt: "Jan 1, 2026",
    readTime: "4 min read",
    summary:
      "Your active homeowners policy covers dwelling, personal property, liability, and loss of use with a standard $1,000 deductible.",
    sections: [
      {
        heading: "Policyholder details",
        paragraphs: [
          "Named insured: Sarah Mitchell. Property address on file. Policy term effective January 1, 2026 through January 1, 2027.",
        ],
      },
      {
        heading: "Coverage at a glance",
        bullets: [
          "Dwelling: $350,000",
          "Personal property: $175,000",
          "Personal liability: $300,000",
          "Loss of use: $70,000",
          "Standard deductible: $1,000 per occurrence",
        ],
      },
      {
        callout: {
          variant: "info",
          text: "This overview summarizes your declarations page. Specific perils, exclusions, and endorsements are defined in the full policy booklet.",
        },
      },
    ],
    related: [],
  },
  coverage: {
    title: "Coverage summary",
    subtitle: "HomeProtect Plus declarations",
    category: "Policy document",
    updatedAt: "Jan 1, 2026",
    readTime: "5 min read",
    summary:
      "Your policy provides four core coverage types plus optional endorsements for specific perils like water damage and wind.",
    sections: [
      {
        heading: "Dwelling coverage (Coverage A)",
        paragraphs: [
          "Pays to repair or rebuild your home's structure after a covered loss. Replacement cost basis applies to the primary dwelling.",
        ],
      },
      {
        heading: "Personal property (Coverage C)",
        paragraphs: [
          "Covers belongings inside your home. Special limits apply to jewelry, electronics, and collectibles unless scheduled separately.",
        ],
      },
      {
        heading: "Included perils",
        bullets: [
          "Fire and smoke",
          "Windstorm and hail",
          "Theft and vandalism",
          "Sudden water damage from plumbing (see Section 4.2)",
          "Falling objects",
        ],
      },
    ],
    related: [],
  },
  "coverage/water-damage": {
    title: "Section 4.2: Water damage",
    subtitle: "Peril-specific coverage provisions",
    category: "Policy document",
    updatedAt: "Jan 1, 2026",
    readTime: "6 min read",
    summary:
      "Sudden and accidental water damage from burst pipes and appliance overflows is covered up to your dwelling limit, minus your deductible.",
    sections: [
      {
        heading: "What is covered",
        paragraphs: [
          "FailSafe covers sudden and accidental discharge or overflow of water from plumbing, heating, air conditioning, or household appliances. This includes burst pipes, ruptured water heaters, and overflow from washing machines when the event is sudden and unforeseen.",
        ],
        bullets: [
          "Burst or frozen pipes (after reasonable precautions)",
          "Water heater rupture",
          "Appliance overflow (dishwasher, washing machine)",
          "Accidental discharge from plumbing fixtures",
        ],
      },
      {
        heading: "What is not covered",
        paragraphs: [
          "Damage that occurs gradually over time or results from poor maintenance is excluded under standard HomeProtect Plus terms.",
        ],
        bullets: [
          "Gradual leaks or seepage",
          "Mold resulting from unresolved moisture",
          "Poor maintenance or wear and tear",
          "Flood or surface water (requires separate flood endorsement)",
          "Water backup from sewers or drains (requires endorsement)",
        ],
      },
      {
        heading: "Your limits for this peril",
        bullets: [
          "Dwelling limit: $350,000",
          "Deductible: $1,000 per occurrence",
          "Personal property sub-limit for water damage: $175,000",
        ],
      },
      {
        callout: {
          variant: "warning",
          text: "If you discover active leaking, shut off the water supply and document damage with photos before cleanup. This helps your adjuster process the claim faster.",
        },
      },
    ],
    related: [],
  },
  deductibles: {
    title: "Deductibles & limits",
    subtitle: "Financial terms of your policy",
    category: "Policy document",
    updatedAt: "Jan 1, 2026",
    readTime: "3 min read",
    summary:
      "Your standard deductible is $1,000 per occurrence. Dwelling and personal property limits define the maximum FailSafe will pay for a covered loss.",
    sections: [
      {
        heading: "How deductibles work",
        paragraphs: [
          "The deductible is subtracted from your claim payment. If approved repairs cost $8,500 and your deductible is $1,000, FailSafe pays $7,500.",
        ],
      },
      {
        heading: "Current limits",
        bullets: [
          "Standard deductible: $1,000",
          "Wind/hail deductible: $1,000 (same as standard)",
          "Dwelling limit: $350,000",
          "Personal property limit: $175,000",
          "Liability limit: $300,000",
        ],
      },
    ],
    related: [],
  },
  exclusions: {
    title: "Exclusions & endorsements",
    subtitle: "What your base policy does not cover",
    category: "Policy document",
    updatedAt: "Jan 1, 2026",
    readTime: "5 min read",
    summary:
      "Standard exclusions apply to flood, earthquake, intentional acts, and gradual deterioration. Endorsements can add coverage for specific risks.",
    sections: [
      {
        heading: "Standard exclusions",
        bullets: [
          "Flood and surface water",
          "Earth movement (earthquake, landslide)",
          "Intentional loss by an insured",
          "Gradual deterioration and wear",
          "Government action and nuclear hazard",
          "Business property beyond incidental limits",
        ],
      },
      {
        heading: "Available endorsements",
        paragraphs: [
          "You may add endorsements to extend coverage. Contact your agent or review your account portal to see endorsements on your policy.",
        ],
        bullets: [
          "Water backup and sump overflow",
          "Scheduled personal property",
          "Home business coverage",
          "Equipment breakdown",
        ],
      },
    ],
    related: [],
  },
  "claims/guide": {
    title: "How claims work",
    subtitle: "FailSafe claims process guide",
    category: "Claims guide",
    updatedAt: "Mar 2026",
    readTime: "4 min read",
    summary:
      "After you file a first notice of loss, an adjuster is assigned within 2 business days. Most straightforward claims resolve in 5-7 business days.",
    sections: [
      {
        heading: "Step 1: Report the loss",
        paragraphs: [
          "File a first notice of loss through ClaimSmart or your FailSafe account. Include the date, type of incident, description, and photos if available.",
        ],
      },
      {
        heading: "Step 2: Adjuster assignment",
        paragraphs: [
          "A licensed adjuster reviews your claim and may contact you for additional details or schedule an inspection.",
        ],
      },
      {
        heading: "Step 3: Resolution",
        paragraphs: [
          "Once approved, payment is issued minus your deductible. Track every step in ClaimSmart without calling the service center.",
        ],
      },
    ],
    related: [],
  },
  "claims/CLM-2026-44821": {
    title: "Claim CLM-2026-44821",
    subtitle: "Wind damage · Under review",
    category: "Claim record",
    updatedAt: "Jun 14, 2026",
    readTime: "2 min read",
    summary:
      "Filed June 12, 2026 for wind damage to roof and siding. Adjuster assigned June 14. Inspection pending.",
    sections: [
      {
        heading: "Timeline",
        bullets: [
          "Jun 12, 2026: First notice of loss filed",
          "Jun 13, 2026: Claim received and validated",
          "Jun 14, 2026: Adjuster Michael Torres assigned",
          "Pending: On-site inspection",
        ],
      },
      {
        heading: "Reported damage",
        paragraphs: [
          "Policyholder reported wind damage to roof shingles and siding on the north-facing exterior following a storm on June 11, 2026.",
        ],
      },
      {
        callout: {
          variant: "note",
          text: "Estimated resolution for straightforward wind claims is 5-7 business days after inspection is complete.",
        },
      },
    ],
    related: [],
  },
  "account/contact": {
    title: "Contact information",
    subtitle: "Account settings",
    category: "Account guide",
    updatedAt: "Mar 2026",
    readTime: "2 min read",
    summary:
      "Update phone, email, or mailing address through the FailSafe account portal. Identity verification is required for security.",
    sections: [
      {
        heading: "What you can update",
        bullets: [
          "Primary phone number",
          "Email address",
          "Mailing address",
          "Emergency contact",
        ],
      },
      {
        heading: "Verification",
        paragraphs: [
          "Changes to contact information require a one-time verification code sent to your email or phone on file.",
        ],
      },
    ],
    related: [],
  },
  billing: {
    title: "Billing & payments",
    subtitle: "Premium and invoice management",
    category: "Account guide",
    updatedAt: "Mar 2026",
    readTime: "3 min read",
    summary:
      "View invoices, payment history, and update payment methods in your FailSafe account portal.",
    sections: [
      {
        heading: "Payment options",
        bullets: [
          "Autopay from checking or credit card",
          "One-time online payment",
          "Paperless billing enrollment",
        ],
      },
      {
        heading: "Billing cycle",
        paragraphs: [
          "HomeProtect Plus premiums are billed annually. Your next renewal date is January 1, 2027.",
        ],
      },
    ],
    related: [],
  },
};

export const EXTERNAL_SOURCE_PAGES: Record<string, PolicyPageContent> = {
  "/#features": {
    title: "What ClaimSmart can do",
    subtitle: "Product guide",
    category: "ClaimSmart help",
    updatedAt: "Sep 2026",
    readTime: "3 min read",
    summary:
      "ClaimSmart is your AI assistant for coverage questions, claim status, FNOL filing, and contact updates.",
    sections: [
      {
        heading: "Supported today",
        bullets: [
          "Coverage questions in natural language",
          "Claim status lookups",
          "Simple first notice of loss filing",
          "Contact information updates",
        ],
      },
    ],
    related: [],
  },
  "/#faq": {
    title: "ClaimSmart help center",
    subtitle: "Frequently asked questions",
    category: "ClaimSmart help",
    updatedAt: "Sep 2026",
    readTime: "4 min read",
    summary: "Answers to common questions about using ClaimSmart with your FailSafe policy.",
    sections: [
      {
        paragraphs: [
          "Open the FAQ panel from the chat header to browse questions about coverage, filing, billing, and account security.",
        ],
      },
    ],
    related: [],
  },
  "/account": {
    title: "FailSafe account portal",
    subtitle: "Your policyholder dashboard",
    category: "Account guide",
    updatedAt: "Mar 2026",
    readTime: "1 min read",
    summary: "Manage billing, policy changes, contact information, and account settings online.",
    sections: [
      {
        paragraphs: [
          "Use your policyholder credentials to access the full FailSafe account portal for changes not available in ClaimSmart.",
        ],
      },
    ],
    related: [],
  },
  "/assistant/fnol": {
    title: "File a first notice of loss",
    subtitle: "Start a new claim",
    category: "Claims guide",
    updatedAt: "Sep 2026",
    readTime: "3 min read",
    summary:
      "Report a new claim in three guided steps. Attach photos of damage and receive a claim number immediately.",
    sections: [
      {
        heading: "Before you begin",
        bullets: [
          "Date and location of the incident",
          "Description of damage or loss",
          "Photos if available",
          "Contact phone number",
        ],
      },
    ],
    related: [],
  },
};

// Inject related links after definition to avoid circular refs
POLICY_PAGES.overview.related = [
  { label: POLICY_PAGES.coverage.title, href: "/policy/coverage" },
  { label: POLICY_PAGES.deductibles.title, href: "/policy/deductibles" },
];
POLICY_PAGES.coverage.related = [
  { label: POLICY_PAGES["coverage/water-damage"].title, href: "/policy/coverage/water-damage" },
  { label: POLICY_PAGES.exclusions.title, href: "/policy/exclusions" },
];
POLICY_PAGES["coverage/water-damage"].related = [
  { label: POLICY_PAGES.deductibles.title, href: "/policy/deductibles" },
  { label: POLICY_PAGES.exclusions.title, href: "/policy/exclusions" },
];
POLICY_PAGES.deductibles.related = [
  { label: POLICY_PAGES.coverage.title, href: "/policy/coverage" },
  { label: POLICY_PAGES.overview.title, href: "/policy/overview" },
];
POLICY_PAGES.exclusions.related = [
  { label: POLICY_PAGES.coverage.title, href: "/policy/coverage" },
  { label: POLICY_PAGES["coverage/water-damage"].title, href: "/policy/coverage/water-damage" },
];
POLICY_PAGES["claims/guide"].related = [
  { label: "File a first notice of loss", href: "/assistant/fnol" },
  { label: POLICY_PAGES["claims/CLM-2026-44821"].title, href: "/policy/claims/CLM-2026-44821" },
];
POLICY_PAGES["claims/CLM-2026-44821"].related = [
  { label: POLICY_PAGES["claims/guide"].title, href: "/policy/claims/guide" },
  { label: "File a first notice of loss", href: "/assistant/fnol" },
];

export function policySlugFromHref(href: string): string | null {
  if (!href.startsWith("/policy/")) return null;
  return href.slice("/policy/".length) || "overview";
}

export function resolveSourceContent(href: string): PolicyPageContent | null {
  const slug = policySlugFromHref(href);
  if (slug) return POLICY_PAGES[slug] ?? POLICY_PAGES.overview;
  return EXTERNAL_SOURCE_PAGES[href] ?? null;
}

export function articleExcerpt(article: PolicyPageContent, maxLength = 90): string {
  if (article.summary.length <= maxLength) return article.summary;
  return `${article.summary.slice(0, maxLength).trim()}…`;
}
