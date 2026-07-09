import {
  ChatThreadPreview,
  FnolStepPreview,
  PreviewShell,
  ChatHeaderPreview,
  ChatInputPreview,
  VerifiedFeaturePreview,
} from "./AppPreviews";

import { HeroAnimatedPreview } from "./HeroAnimatedPreview";

export function HeroProductMock() {
  return <HeroAnimatedPreview />;
}

export function CoverageFeatureMock() {
  return (
    <PreviewShell>
      <div className="flex h-[22rem] flex-col sm:h-[24rem]">
        <ChatHeaderPreview title="Water damage coverage" />
        <ChatThreadPreview variant="coverage" />
        <ChatInputPreview />
      </div>
    </PreviewShell>
  );
}

export function ClaimsFeatureMock() {
  return <FnolStepPreview />;
}

export function VerifiedFeatureMock() {
  return <VerifiedFeaturePreview />;
}
