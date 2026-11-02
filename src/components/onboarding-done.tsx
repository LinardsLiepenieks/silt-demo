import { onboardingDone } from '../content/onboarding';
import { buttonClass } from './button';
import { BrandMark } from './brand-logo';
import { CheckIcon } from './check-icon';

/** The moment between finishing setup and landing in the inbox. */
export function OnboardingDone({
  title = onboardingDone.title,
  text = onboardingDone.text,
  action = onboardingDone.action,
  onContinue,
}: {
  title?: string;
  text?: string;
  action?: string;
  onContinue?: () => void;
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface px-4">
      <div
        role="status"
        className="flex w-full max-w-[420px] flex-col items-center rounded-3xl border border-border bg-white px-8 py-12 text-center shadow-[0_1px_2px_rgb(0_0_0/.04),0_8px_24px_rgb(0_0_0/.06)]"
      >
        <span className="relative">
          <BrandMark className="size-14" />
          <span className="absolute -right-1.5 -bottom-1.5 inline-flex size-6 items-center justify-center rounded-full border-2 border-white bg-warm text-white">
            <CheckIcon className="size-3" />
          </span>
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold tracking-[-0.03em] text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-[15px] text-muted-foreground">{text}</p>
        <button
          type="button"
          onClick={onContinue}
          className={buttonClass('secondary', 'mt-8')}
        >
          {action}
        </button>
      </div>
    </div>
  );
}
