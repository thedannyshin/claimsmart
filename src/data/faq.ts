export interface FaqItem {
  question: string;
  answer: string;
  prompt?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do I need a separate account?",
    answer:
      "No. ClaimSmart is included with FailSafe. Sign in with your existing login.",
    prompt: "How do I sign in?",
  },
  {
    question: "What can ClaimSmart help with?",
    answer:
      "Coverage questions, claim status lookups, simple first notice of loss filing, and contact information updates, personalized to your policy.",
    prompt: "What can you help me with?",
  },
  {
    question: "How do I sign in?",
    answer:
      'Tap "Sign in" on the homepage. ClaimSmart uses your existing FailSafe account.',
    prompt: "How do I sign in?",
  },
  {
    question: "How do I file a claim?",
    answer:
      'Click "File a claim" in the header or type "File a new claim" in the chat. The 3-step flow takes about 3 minutes and you can attach photos of damage.',
    prompt: "File a new claim",
  },
  {
    question: "How do I check my claim status?",
    answer:
      'Ask "What\'s the status of my claim?" in chat. ClaimSmart shows your most recent claim, adjuster assignment, and estimated next steps with links to the claim record.',
    prompt: "What's the status of my claim?",
  },
  {
    question: "What photos should I include when filing a claim?",
    answer:
      "Include clear photos of the damage, the affected area, and any related receipts or repair estimates if you have them. You can add images during step 2 of the first notice of loss flow.",
    prompt: "File a new claim",
  },
  {
    question: "Can ClaimSmart answer questions about my specific policy?",
    answer:
      "Yes. After you sign in, answers are based on your HomeProtect Plus policy documents, not generic insurance FAQs. Each response links to the source section you can read in full.",
    prompt: "Am I covered for water damage?",
  },
  {
    question: "Can I update my contact information?",
    answer:
      "ClaimSmart can start a contact update and send a secure link to your FailSafe account portal. Phone and address changes require verification there for security.",
    prompt: "Update my contact info",
  },
  {
    question: "What if my question is about billing or a disputed claim?",
    answer:
      "Billing can usually be resolved in your FailSafe account portal. For disputed claims, ClaimSmart can schedule a callback. An adjuster will reach out within 24 hours.",
    prompt: "I have a billing question",
  },
  {
    question: "Does ClaimSmart replace speaking with FailSafe?",
    answer:
      "ClaimSmart handles routine coverage and claims questions quickly. For a final coverage determination or complex situations, a FailSafe agent can review your case. The compliance line is 1-800-555-0142.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. ClaimSmart requires you to sign in with FailSafe and only accesses your policy data after authentication.",
  },
  {
    question: "How long do most questions take?",
    answer:
      "Most routine coverage and status questions are answered in under 2 minutes. Filing a first notice of loss typically takes about 3 minutes with photos attached.",
    prompt: "What can you help me with?",
  },
];
