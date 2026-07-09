/** Local stock photos (Unsplash) — see public/landing/README for credits */

export const LANDING_PHOTOS = {
  heroLifestyle: {
    src: "/landing/hero-lifestyle.jpg",
    alt: "Policyholder reviewing insurance documents on a laptop at home",
  },
  homePolicy: {
    src: "/landing/home-policy.jpg",
    alt: "Modern home representing HomeProtect Plus coverage",
  },
  supportDesk: {
    src: "/landing/support-desk.jpg",
    alt: "Customer receiving friendly support at a service desk",
  },
  claimDamage: {
    src: "/landing/claim-damage.jpg",
    alt: "Home repair work documenting property damage for a claim",
  },
  mobileClaim: {
    src: "/landing/mobile-claim.jpg",
    alt: "Person filing a claim using a smartphone",
  },
  avatars: [
    { src: "/landing/avatar-1.jpg", alt: "Sarah, FailSafe policyholder" },
    { src: "/landing/avatar-2.jpg", alt: "James, FailSafe policyholder" },
    { src: "/landing/avatar-3.jpg", alt: "Priya, FailSafe policyholder" },
  ],
} as const;

export const FEATURE_PHOTOS = {
  Coverage: LANDING_PHOTOS.homePolicy,
  Claims: LANDING_PHOTOS.claimDamage,
  Verified: LANDING_PHOTOS.supportDesk,
} as const;
