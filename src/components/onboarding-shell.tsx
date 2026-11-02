import type { FormEvent, ReactNode, Ref } from 'react';
import { onboardingActions, onboardingSteps } from '../content/onboarding';
import { Link, routes } from '../lib/router';
import { ArrowRightIcon } from './arrow-right-icon';
import { BrandWordmark } from './brand-logo';
import { Button } from './button';
import { OnboardingSteps } from './onboarding-steps';

/**
 * The frame every onboarding step shares: progress, a titled card holding the
 * step's fields, and Back / Skip / Continue. The card is a form, so Enter
 * continues.
 */
export function OnboardingShell({
  step = 1,
  title = 'Name your workspace',
  text,
  children,
  onSubmit,
  onBack,
  onSkip,
  submitLabel = onboardingActions.next,
  loading = false,
  formRef,
}: {
  step?: number;
  title?: string;
  text?: string;
  children?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  /** Hidden on the first step. */
  onBack?: () => void;
  /** Shows "Skip for now" when given. */
  onSkip?: () => void;
  submitLabel?: string;
  loading?: boolean;
  formRef?: Ref<HTMLFormElement>;
}) {
  return (
    <div className="min-h-dvh bg-surface">
      <header className="container flex h-16 items-center justify-between">
        <Link
          href={routes.landing}
          aria-label="Halcyon home"
          className="rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30"
        >
          <BrandWordmark />
        </Link>
        <span className="text-sm font-medium text-muted-foreground">
          {onboardingActions.stepOf(step, onboardingSteps.length)}
        </span>
      </header>
      <main className="mx-auto flex w-full max-w-[600px] flex-col gap-8 px-4 pt-6 pb-16 sm:pt-12">
        <OnboardingSteps current={step} />
        <form
          ref={formRef}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit?.(event);
          }}
          className="rounded-3xl border border-border bg-white shadow-[0_1px_2px_rgb(0_0_0/.04),0_8px_24px_rgb(0_0_0/.06)]"
        >
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-[-0.03em] text-foreground sm:text-[1.75rem]">
                {title}
              </h1>
              {text && (
                <p className="mt-1.5 text-[15px] text-muted-foreground">
                  {text}
                </p>
              )}
            </div>
            {children}
          </div>
          <div className="flex items-center gap-2 border-t border-border px-4 py-4 sm:px-8">
            {onBack && (
              <Button
                variant="secondary"
                className="px-4 sm:px-5"
                onClick={onBack}
                disabled={loading}
              >
                {onboardingActions.back}
              </Button>
            )}
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              {onSkip && (
                <Button
                  variant="ghost"
                  className="px-2.5 sm:px-5"
                  onClick={onSkip}
                  disabled={loading}
                >
                  {onboardingActions.skip}
                </Button>
              )}
              <Button type="submit" className="px-4 sm:px-5" loading={loading}>
                {submitLabel}
                <ArrowRightIcon className="hidden size-4 sm:block" />
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
