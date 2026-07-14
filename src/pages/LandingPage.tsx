import { useRef } from "react";
import { FailSafeLogo } from "../components/FailSafeLogo";
import { Link } from "react-router-dom";
import { SiteHeader } from "../components/SiteHeader";
import { FaqAccordion } from "../components/FaqAccordion";
import {
  ClaimsFeatureMock,
  CoverageFeatureMock,
  HeroProductMock,
  VerifiedFeatureMock,
} from "../components/landing/FeatureMocks";
import {
  LandingCell,
  LandingFrame,
  LandingGrid,
  LandingGridCell,
  LandingHero,
  LandingHeroCopy,
  LandingHeroShowcase,
  LandingPageRoot,
  LandingRow,
  LandingSections,
  LandingSplit,
} from "../components/landing/LandingLayout";
import { TestimonialCarousel } from "../components/landing/TestimonialCarousel";
import {
  FEATURE_ICONS,
  IconChat,
  IconCheck,
  IconLogin,
} from "../components/landing/LandingIcons";
import {
  LANDING_BODY,
  LANDING_BTN_PRIMARY,
  LANDING_BTN_SECONDARY,
  LANDING_HERO_DISPLAY,
  LANDING_HERO_LEAD,
  LANDING_H2,
  LANDING_H3,
  LANDING_H4,
  LANDING_ICON_BOX,
  LANDING_LABEL,
  LANDING_LEAD,
  LANDING_SMALL,
} from "../lib/ui";
import { useLandingScrollAnimations } from "../hooks/useLandingScrollAnimations";

const LANDING_CTA = "Sign in";

const features = [
  {
    label: "Coverage",
    title: "Stop guessing what's covered",
    description:
      "Plain-English answers from your policy, not a generic FAQ. Each response links to the source section.",
    reverse: false,
    Mock: CoverageFeatureMock,
  },
  {
    label: "Claims",
    title: "Status and filing in one place",
    description:
      "See your adjuster, timeline, and next steps. File a claim in three guided steps with photos.",
    reverse: true,
    Mock: ClaimsFeatureMock,
  },
  {
    label: "Trust",
    title: "Answers you can verify",
    description:
      "Sign in with FailSafe. Every response links to the policy section behind the answer.",
    reverse: false,
    Mock: VerifiedFeatureMock,
  },
];

const STEPS = [
  {
    icon: IconLogin,
    title: "Sign in",
    body: "Use your FailSafe login. No new password.",
  },
  {
    icon: IconChat,
    title: "Ask or file",
    body: "Coverage answers, claim status, or filing in chat.",
  },
  {
    icon: IconCheck,
    title: "Done",
    body: "Most answers in under 2 minutes.",
  },
];

function FeatureCopy({
  label,
  title,
  description,
  showCta,
}: {
  label: string;
  title: string;
  description: string;
  showCta?: boolean;
}) {
  const FeatureIcon = FEATURE_ICONS[label as keyof typeof FEATURE_ICONS];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span className={`h-9 w-9 ${LANDING_ICON_BOX}`}>
          <FeatureIcon className="h-4 w-4" />
        </span>
        <p className={LANDING_LABEL}>{label}</p>
      </div>
      <h2 className={`mt-8 ${LANDING_H3}`}>{title}</h2>
      <p className={`mt-5 max-w-lg ${LANDING_BODY}`}>{description}</p>
      {showCta && (
        <div className="mt-10">
          <Link to="/login" className={LANDING_BTN_PRIMARY}>
            {LANDING_CTA}
          </Link>
        </div>
      )}
    </div>
  );
}

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useLandingScrollAnimations(rootRef);

  return (
    <LandingPageRoot ref={rootRef}>
      <SiteHeader variant="marketing" grid />

      <LandingHero>
        <LandingHeroCopy>
          <div className="w-full max-w-xl lg:max-w-[34rem] xl:max-w-[36rem]">
          <h1 className={LANDING_HERO_DISPLAY} data-hero-item>
            Answers from your policy
          </h1>
          <p className={`mt-8 ${LANDING_HERO_LEAD}`} data-hero-item>
            ClaimSmart is built into FailSafe. Ask about coverage, claims, or filing. Every answer
            links to your policy documents.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 lg:justify-start" data-hero-item>
            <Link to="/login" className={LANDING_BTN_PRIMARY}>
              {LANDING_CTA}
            </Link>
            <a href="#how-it-works" className={LANDING_BTN_SECONDARY}>
              How it works
            </a>
          </div>
          <p className={`mt-8 ${LANDING_SMALL} text-ink-muted`} data-hero-item>
            Included with FailSafe. Most answers in under 2 minutes.
          </p>
          </div>
        </LandingHeroCopy>

        <LandingHeroShowcase>
          <HeroProductMock />
        </LandingHeroShowcase>
      </LandingHero>

      <LandingSections>
        <LandingFrame id="features">
          <LandingRow>
            <LandingCell>
              <div className="landing-scroll-reveal">
                <p className={LANDING_LABEL}>What you can do</p>
                <h2 className={`mt-6 max-w-2xl ${LANDING_H2}`}>
                  Coverage, claims, and filing in one chat
                </h2>
              </div>
            </LandingCell>
          </LandingRow>

          {features.map((f, index) => (
            <LandingRow key={f.label}>
              <LandingSplit
                reverse={f.reverse}
                left={<FeatureCopy {...f} showCta={index === 0} />}
                right={
                  <div className="flex h-full items-center">
                    <f.Mock />
                  </div>
                }
              />
            </LandingRow>
          ))}
        </LandingFrame>

        <LandingFrame id="how-it-works">
          <LandingRow>
            <LandingCell>
              <div className="landing-scroll-reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={LANDING_LABEL}>How it works</p>
                  <h2 className={`mt-6 max-w-2xl ${LANDING_H2}`}>Three steps to get started</h2>
                </div>
                <Link to="/login" className={`${LANDING_BTN_PRIMARY} shrink-0`}>
                  {LANDING_CTA}
                </Link>
              </div>
            </LandingCell>
          </LandingRow>
          <LandingGrid cols={3} className="landing-scroll-stagger">
            {STEPS.map((s) => {
              const StepIcon = s.icon;
              return (
                <LandingGridCell key={s.title}>
                  <div className="landing-scroll-inner">
                    <div className={`h-10 w-10 ${LANDING_ICON_BOX}`}>
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <h3 className={`mt-5 ${LANDING_H4}`}>{s.title}</h3>
                    <p className={`mt-3 ${LANDING_BODY}`}>{s.body}</p>
                  </div>
                </LandingGridCell>
              );
            })}
          </LandingGrid>
        </LandingFrame>

        <LandingFrame tone="contrast" id="testimonials" aria-label="Policyholder testimonials">
          <TestimonialCarousel />
        </LandingFrame>

        <LandingFrame id="faq">
          <LandingRow>
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              <LandingCell className="border-b border-border lg:border-b-0 lg:border-r lg:border-border">
                <div className="landing-scroll-reveal">
                  <p className={LANDING_LABEL}>FAQ</p>
                  <h2 className={`mt-6 ${LANDING_H2}`}>Common questions</h2>
                  <p className={`mt-5 max-w-sm ${LANDING_LEAD}`}>
                    Sign in with FailSafe. No extra account needed.
                  </p>
                </div>
              </LandingCell>
              <LandingCell>
                <div className="landing-scroll-reveal">
                  <FaqAccordion className="rounded-md" defaultExpanded={0} />
                </div>
              </LandingCell>
            </div>
          </LandingRow>
        </LandingFrame>

        <LandingFrame>
          <div className="landing-scroll-reveal grid gap-6 p-8 sm:grid-cols-3 sm:items-center sm:p-10 lg:p-12">
            <div className={`flex items-center gap-2.5 ${LANDING_SMALL}`}>
              <FailSafeLogo size="md" tagline="Insurance" />
            </div>
            <p className="text-xs text-ink-faint sm:text-center">
              Photos from{" "}
              <a
                href="https://unsplash.com"
                className="underline hover:text-ink-muted"
                target="_blank"
                rel="noreferrer"
              >
                Unsplash
              </a>
              {" · "}ClaimSmart © 2026 FailSafe
            </p>
            <Link to="/login" className="text-sm font-medium text-ink-muted hover:text-ink sm:text-right">
              Open ClaimSmart →
            </Link>
          </div>
        </LandingFrame>
      </LandingSections>
    </LandingPageRoot>
  );
}
