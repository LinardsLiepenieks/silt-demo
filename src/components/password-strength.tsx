import { signUpCopy } from '../content/auth';
import { passwordChecks } from '../lib/validation';
import { CheckIcon } from './check-icon';

const segmentTones = ['bg-warm', 'bg-warm', 'bg-accent/60', 'bg-accent'];

/** Four-segment meter and the checks behind it, updating as the user types. */
export function PasswordStrength({
  password = '',
  labels = signUpCopy.strength,
}: {
  password?: string;
  labels?: string[];
}) {
  const checks = passwordChecks(password);
  const score = checks.filter((check) => check.met).length;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-3">
        <div className="grid flex-1 grid-cols-4 gap-1.5" aria-hidden="true">
          {segmentTones.map((tone, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-colors duration-200 ${
                index < score ? segmentTones[score - 1] : 'bg-border'
              }`}
            />
          ))}
        </div>
        <span
          aria-live="polite"
          className="w-16 text-right text-xs font-semibold text-muted-foreground"
        >
          {password ? labels[score] : ''}
        </span>
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {checks.map((check) => (
          <li
            key={check.label}
            className={`flex items-center gap-1.5 text-[13px] transition-colors ${
              check.met ? 'text-accent-strong' : 'text-muted-foreground'
            }`}
          >
            <span
              className={`inline-flex size-4 shrink-0 items-center justify-center rounded-full ${
                check.met ? 'bg-accent text-white' : 'border border-border'
              }`}
            >
              {check.met && <CheckIcon className="size-3" />}
            </span>
            {check.label}
            <span className="sr-only">
              {check.met ? '(done)' : '(missing)'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
