import { onboardingSteps } from '../content/onboarding';
import { Link, routes } from '../lib/router';
import { CheckIcon } from './check-icon';

const stepRoutes = [routes.workspace, routes.channels, routes.team];

/** Numbered steps over a progress bar; finished steps link back. */
export function OnboardingSteps({
  current = 1,
  labels = onboardingSteps,
}: {
  /** 1-based. */
  current?: number;
  labels?: string[];
}) {
  return (
    <nav aria-label="Setup progress" className="flex flex-col gap-4">
      <ol className="flex items-center justify-between gap-2 sm:justify-start sm:gap-8">
        {labels.map((label, index) => {
          const step = index + 1;
          const done = step < current;
          const active = step === current;
          const content = (
            <>
              <span
                className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  done
                    ? 'bg-accent text-white'
                    : active
                      ? 'bg-foreground text-white'
                      : 'border border-border bg-white text-muted-foreground'
                }`}
              >
                {done ? <CheckIcon className="size-3.5" /> : step}
              </span>
              <span
                className={`text-sm font-semibold ${active || done ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                {label}
              </span>
            </>
          );
          return (
            <li key={label} aria-current={active ? 'step' : undefined}>
              {done ? (
                <Link
                  href={stepRoutes[index]}
                  className="flex items-center gap-2.5 rounded-lg outline-none hover:opacity-80 focus-visible:ring-[3px] focus-visible:ring-accent/30"
                >
                  {content}
                </Link>
              ) : (
                <span className="flex items-center gap-2.5">{content}</span>
              )}
            </li>
          );
        })}
      </ol>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={labels.length}
        aria-valuenow={current}
        aria-label={`Step ${current} of ${labels.length}`}
        className="h-1 overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${(current / labels.length) * 100}%` }}
        />
      </div>
    </nav>
  );
}
