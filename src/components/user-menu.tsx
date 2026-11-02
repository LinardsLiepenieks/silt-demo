import { useEffect, useId, useRef, useState } from 'react';
import { inboxCopy } from '../content/inbox';
import { demoUser, type User } from '../lib/session';
import { ChevronDownIcon } from './chevron-down-icon';
import { Avatar } from './mock-card';

/** The signed-in person, with a menu holding Sign out. */
export function UserMenu({
  user = demoUser,
  onSignOut,
  placement = 'up',
  compact = false,
}: {
  user?: User;
  onSignOut?: () => void;
  /** Which way the menu opens from the button. */
  placement?: 'up' | 'down';
  /** Only the avatar, for narrow top bars. */
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    root.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label={inboxCopy.accountMenu}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-2.5 rounded-xl p-1.5 text-left outline-none hover:bg-white focus-visible:ring-[3px] focus-visible:ring-accent/30"
      >
        <Avatar name={user.name} tint="accent" className="size-8 text-xs" />
        {!compact && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-foreground">
                {user.name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </span>
            <ChevronDownIcon
              className={`size-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={inboxCopy.accountMenu}
          className={`absolute z-20 w-56 rounded-xl border border-border bg-white p-1.5 shadow-[0_1px_2px_rgb(0_0_0/.04),0_8px_24px_rgb(0_0_0/.08)] ${
            placement === 'up'
              ? 'bottom-full left-0 mb-2'
              : 'top-full right-0 mt-2'
          }`}
        >
          <div className="px-2.5 py-2">
            <p className="truncate text-sm font-semibold text-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            role="menuitem"
            onClick={onSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-foreground outline-none hover:bg-surface focus-visible:bg-surface"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
              <path
                d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            {inboxCopy.signOut}
          </button>
        </div>
      )}
    </div>
  );
}
