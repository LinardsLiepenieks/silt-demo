import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white shadow-sm hover:bg-accent-strong',
  secondary: 'border border-border bg-white text-foreground hover:bg-surface',
  ghost: 'text-muted-foreground hover:bg-surface hover:text-foreground',
};

/** Shared button look, also used by links styled as buttons. */
export function buttonClass(variant: ButtonVariant = 'primary', extra = '') {
  return `inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold whitespace-nowrap transition-colors duration-150 outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30 disabled:cursor-not-allowed ${variants[variant]} ${extra}`;
}

export function Spinner({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`animate-spin ${className}`}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

/** A button with an optional loading state that keeps its width. */
export function Button({
  variant = 'primary',
  loading = false,
  className = '',
  type = 'button',
  children = 'Continue',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
}) {
  return (
    <button
      type={type}
      aria-busy={loading || undefined}
      className={`relative ${buttonClass(variant, className)}`}
      {...props}
      disabled={props.disabled || loading}
    >
      <span
        className={`inline-flex items-center gap-2 ${loading ? 'invisible' : ''}`}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
    </button>
  );
}
