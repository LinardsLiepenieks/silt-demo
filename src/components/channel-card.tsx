import type { ChannelId } from '../content/onboarding';
import { CheckIcon } from './check-icon';

const icons: Record<ChannelId, string> = {
  email: 'M4 6h16v12H4zM4 7l8 6 8-6',
  chat: 'M5 5h14v10H9l-4 4z',
  whatsapp:
    'M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5zM9 8.5c0 3.5 3 6.5 6.5 6.5',
  instagram:
    'M7 3.5h10A3.5 3.5 0 0 1 20.5 7v10a3.5 3.5 0 0 1-3.5 3.5H7A3.5 3.5 0 0 1 3.5 17V7A3.5 3.5 0 0 1 7 3.5zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17 6.8v.1',
  phone:
    'M6.5 3.5h3l1.5 4-2 1.5a10 10 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z',
};

/** A channel the workspace answers on, toggled on or off. */
export function ChannelCard({
  id = 'email',
  label = 'Email',
  description = 'Your support inbox',
  selected = false,
  onToggle,
}: {
  id?: ChannelId;
  label?: string;
  description?: string;
  selected?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30 ${
        selected
          ? 'border-accent bg-accent-soft/60'
          : 'border-border bg-white hover:bg-surface'
      }`}
    >
      <span
        className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
          selected ? 'bg-accent text-white' : 'bg-surface text-foreground'
        }`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
          <path
            d={icons[id]}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">
          {label}
        </span>
        <span className="block truncate text-[13px] text-muted-foreground">
          {description}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`inline-flex size-5 shrink-0 items-center justify-center rounded-full transition-colors ${
          selected ? 'bg-accent text-white' : 'border border-border'
        }`}
      >
        {selected && <CheckIcon className="size-3" />}
      </span>
    </button>
  );
}
