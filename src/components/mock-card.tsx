import type { ReactNode } from 'react';

export type Tint = 'mint' | 'sand' | 'sky' | 'rose' | 'lilac' | 'accent';

// Full class names so Tailwind finds them. Initials use a deeper tone of
// the same hue so they stay readable on the pale fill.
const avatarTints: Record<Tint, string> = {
  mint: 'bg-tint-mint text-accent-strong',
  sand: 'bg-tint-sand text-[#7a5a1e]',
  sky: 'bg-tint-sky text-[#285a85]',
  rose: 'bg-tint-rose text-[#8a3446]',
  lilac: 'bg-tint-lilac text-[#4f4386]',
  accent: 'bg-accent text-white',
};

/** The white product-UI card the journey and hero mocks sit in. */
export function MockCard({
  children,
  className = 'max-w-[380px]',
}: {
  children: ReactNode;
  /** Width and spacing additions; defaults to a 380px-wide card. */
  className?: string;
}) {
  return (
    <div
      className={`w-full rounded-2xl border border-border bg-white p-5 text-left text-foreground shadow-[0_1px_2px_rgb(0_0_0/.04),0_8px_24px_rgb(0_0_0/.06)] ${className}`}
    >
      {children}
    </div>
  );
}

/** First letters of the first and last word: "Maya Lindqvist" → "ML". */
export function initialsOf(name: string) {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/** A round initials avatar in one of the soft tints. */
export function Avatar({
  name = 'Maya Lindqvist',
  initials,
  tint = 'mint',
  className = 'size-8 text-xs',
}: {
  /** Gives the initials and the accessible label. */
  name?: string;
  /** Overrides the initials taken from `name`. */
  initials?: string;
  tint?: Tint;
  /** Size and text size, e.g. `size-10 text-sm`. */
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={name}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-[-0.01em] select-none ${avatarTints[tint]} ${className}`}
    >
      {initials ?? initialsOf(name)}
    </span>
  );
}
