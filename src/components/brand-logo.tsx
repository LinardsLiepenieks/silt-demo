// The Tidewell mark (two waves in a rounded square) and the wordmark
// beside it. The name is live text, so it stays editable on a canvas.

export function BrandMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--color-accent)" />
      <path
        d="M7 13.5c3-3 6-3 9 0s6 3 9 0M7 19.5c3-3 6-3 9 0s6 3 9 0"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
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
        Tidewell
      </span>
    </span>
  );
}
