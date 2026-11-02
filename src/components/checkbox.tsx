import type { InputHTMLAttributes, ReactNode } from 'react';
import { CheckIcon } from './check-icon';

/** A native checkbox drawn as a rounded square with a tick. */
export function Checkbox({
  label = 'Remember me',
  invalid = false,
  ...input
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode;
  invalid?: boolean;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-foreground select-none">
      <span className="relative inline-flex size-[18px] shrink-0">
        <input
          type="checkbox"
          aria-invalid={invalid || undefined}
          className={`peer size-full cursor-pointer appearance-none rounded-[5px] border bg-white transition-colors outline-none checked:border-accent checked:bg-accent focus-visible:ring-[3px] focus-visible:ring-accent/30 ${
            invalid ? 'border-warm-strong' : 'border-[#c9ceca]'
          }`}
          {...input}
        />
        <CheckIcon className="pointer-events-none absolute inset-0 m-auto size-3 text-white opacity-0 peer-checked:opacity-100" />
      </span>
      {label}
    </label>
  );
}
