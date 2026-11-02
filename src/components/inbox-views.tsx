import { inboxCopy, type InboxView } from '../content/inbox';

const viewIcons: Record<InboxView, string> = {
  inbox: 'M4 13h4l1.5 2.5h5L16 13h4M5.5 5h13L20 13v6H4v-6z',
  mine: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0',
  unassigned:
    'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM9 9.5a3 3 0 1 1 3 3v1.5M12 17v.1',
  resolved: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM8.5 12.5l2.5 2.5 4.5-5',
};

/**
 * The inbox views with their counts: a vertical list in the sidebar,
 * horizontal tabs on narrow screens.
 */
export function InboxViews({
  views = inboxCopy.views,
  counts = { inbox: 5, mine: 2, unassigned: 2, resolved: 2 },
  active = 'inbox',
  onSelect,
  layout = 'vertical',
}: {
  views?: { id: InboxView; label: string }[];
  counts?: Record<InboxView, number>;
  active?: InboxView;
  onSelect?: (view: InboxView) => void;
  layout?: 'vertical' | 'horizontal';
}) {
  const vertical = layout === 'vertical';
  return (
    <nav aria-label={inboxCopy.viewsLabel}>
      <ul
        className={
          vertical
            ? 'flex flex-col gap-0.5'
            : '-mx-1 flex gap-0.5 overflow-x-auto px-1 [scrollbar-width:none]'
        }
      >
        {views.map((view) => {
          const selected = view.id === active;
          return (
            <li key={view.id} className="shrink-0">
              <button
                type="button"
                aria-current={selected ? 'page' : undefined}
                onClick={() => onSelect?.(view.id)}
                className={`flex w-full items-center rounded-lg text-sm font-semibold transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30 ${
                  vertical ? 'h-9 gap-2.5 px-2.5' : 'h-8 gap-1.5 px-2.5'
                } ${
                  selected
                    ? 'bg-white text-foreground shadow-[0_1px_2px_rgb(0_0_0/.06)]'
                    : 'text-muted-foreground hover:bg-white/70 hover:text-foreground'
                }`}
              >
                {vertical && (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-[18px]"
                  >
                    <path
                      d={viewIcons[view.id]}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
                <span className="flex-1 text-left">{view.label}</span>
                <span
                  className={`text-xs tabular-nums ${selected ? 'text-accent-strong' : 'text-muted-foreground'}`}
                >
                  {counts[view.id]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
