// The Halcyon mark (a low sun over calm water) and the wordmark beside it.
// The name is live text, so it stays editable on a canvas.

export function BrandMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--color-accent-soft)" />
      <path d="M9 17a7 7 0 0 1 14 0Z" fill="var(--color-warm)" />
      <path
        d="M6.5 20.5c2.4-1.6 4.8-1.6 7.2 0s4.8 1.6 7.2 0 3.6-1.6 4.6-.8M9.5 24.5c2.2-1.3 4.4-1.3 6.5 0s4.3 1.3 6.5 0"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <BrandMark className="size-8" />
      <span className="font-display text-xl font-bold tracking-[-0.02em] text-foreground">
        Halcyon
      </span>
    </span>
  );
}
