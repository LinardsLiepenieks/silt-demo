import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { NavEntry, NavMenuItem } from '../content/navigation';
import { ChevronDownIcon } from './chevron-down-icon';

// A short delay before the first open, instant switching while a menu was
// just open, and a grace period when the pointer leaves a trigger for its panel.
const OPEN_DELAY_MS = 50;
const CLOSE_DELAY_MS = 150;
const SKIP_DELAY_MS = 300;

const itemClass =
  'group inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium whitespace-nowrap text-foreground outline-none transition-colors hover:bg-surface focus-visible:ring-[3px] focus-visible:ring-accent/30 data-[state=open]:bg-surface';

const isMouse = (event: PointerEvent) => event.pointerType === 'mouse';

export function NavMenu({ entries }: { entries: NavEntry[] }) {
  const [open, setOpen] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const openTimer = useRef(0);
  const closeTimer = useRef(0);
  const skipTimer = useRef(0);
  const skipDelay = useRef(false);
  // A menu closed by clicking its trigger stays closed until the pointer leaves.
  const clickClosed = useRef('');

  useEffect(() => {
    window.clearTimeout(skipTimer.current);
    if (open) skipDelay.current = true;
    else
      skipTimer.current = window.setTimeout(
        () => (skipDelay.current = false),
        SKIP_DELAY_MS,
      );
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen('');
    };
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen('');
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  useEffect(
    () => () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(skipTimer.current);
    },
    [],
  );

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };

  const enterTrigger = (label: string) => {
    if (clickClosed.current === label) return;
    clearTimers();
    if (skipDelay.current) setOpen(label);
    else
      openTimer.current = window.setTimeout(
        () => setOpen(label),
        OPEN_DELAY_MS,
      );
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(''), CLOSE_DELAY_MS);
  };

  const toggle = (label: string) => {
    clearTimers();
    clickClosed.current = open === label ? label : '';
    setOpen(open === label ? '' : label);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="relative flex max-w-max flex-1 items-center justify-center"
    >
      <ul className="flex flex-1 list-none items-center justify-center gap-1">
        {entries.map((entry) => {
          if (entry.kind === 'link') {
            return (
              <li key={entry.label} className="relative">
                <a href={entry.href} className={itemClass}>
                  {entry.label}
                </a>
              </li>
            );
          }
          const isOpen = open === entry.label;
          const contentId = `nav-menu-${entry.label.toLowerCase()}`;
          return (
            <li key={entry.label} className="relative">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                data-state={isOpen ? 'open' : 'closed'}
                className={`${itemClass} gap-1 pr-2.5`}
                onPointerMove={(event) => {
                  if (isMouse(event) && open !== entry.label)
                    enterTrigger(entry.label);
                  else if (isMouse(event)) clearTimers();
                }}
                onPointerLeave={(event) => {
                  if (!isMouse(event)) return;
                  clickClosed.current = '';
                  window.clearTimeout(openTimer.current);
                  if (open) scheduleClose();
                }}
                onClick={() => toggle(entry.label)}
              >
                {entry.label}
                <ChevronDownIcon
                  className={`relative top-px size-3.5 text-muted-foreground transition duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {/* Always mounted so opening and closing are CSS transitions,
                  which reverse smoothly when interrupted mid-way. */}
              <div
                id={contentId}
                data-state={isOpen ? 'open' : 'closed'}
                className={`absolute top-full left-0 mt-2 origin-top-left overflow-hidden rounded-xl border border-border bg-background p-2 text-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_rgb(0_0_0/0.06)] transition-[opacity,scale,translate,visibility] duration-200 ${
                  isOpen
                    ? 'visible translate-y-0 scale-100 opacity-100'
                    : 'pointer-events-none invisible -translate-y-1 scale-[0.98] opacity-0'
                }`}
                onPointerEnter={(event) => isMouse(event) && clearTimers()}
                onPointerLeave={(event) => isMouse(event) && scheduleClose()}
              >
                <ul className={entry.listClassName}>
                  {entry.items.map((item) => (
                    <NavMenuLink key={item.title} item={item} />
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function NavMenuLink({ item }: { item: NavMenuItem }) {
  return (
    <li>
      <a
        href={item.href}
        className="relative flex flex-col gap-1 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors hover:bg-surface focus-visible:ring-[3px] focus-visible:ring-accent/30"
      >
        <div className="pr-5 text-sm leading-tight font-semibold">
          {item.title}
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        {item.isExternal && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-2.5 right-2.5 h-3.5 w-3.5 text-muted-foreground"
            aria-hidden="true"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        )}
      </a>
    </li>
  );
}
