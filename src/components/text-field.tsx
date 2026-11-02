import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

export const fieldBorder = (invalid: boolean) =>
  invalid
    ? 'border-warm-strong focus-within:ring-warm/25'
    : 'border-border focus-within:border-accent focus-within:ring-accent/20';

export function FieldError({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <p id={id} className="text-[13px] font-medium text-warm-strong">
      {children}
    </p>
  );
}

/** A labelled input with an inline error, an optional hint and trailing slot. */
export function TextField({
  label = 'Email',
  error,
  hint,
  labelAction,
  trailing,
  className = '',
  ...input
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label?: string;
  error?: string;
  hint?: ReactNode;
  /** Sits at the right of the label row, e.g. "Forgot password?". */
  labelAction?: ReactNode;
  /** Sits inside the input on the right, e.g. a show/hide toggle. */
  trailing?: ReactNode;
  className?: string;
}) {
  const id = useId();
  const messageId = `${id}-message`;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </label>
        {labelAction}
      </div>
      <div
        className={`flex h-11 items-center rounded-xl border bg-white transition-[border-color,box-shadow] focus-within:ring-[3px] ${fieldBorder(Boolean(error))}`}
      >
        <input
          id={id}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className="h-full min-w-0 flex-1 rounded-xl bg-transparent px-3.5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70"
          {...input}
        />
        {trailing}
      </div>
      {error ? (
        <FieldError id={messageId}>{error}</FieldError>
      ) : (
        hint && (
          <p id={messageId} className="text-[13px] text-muted-foreground">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
