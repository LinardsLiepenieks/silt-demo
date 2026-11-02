import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { headerCtas, type NavEntry } from '../content/navigation';
import { ChevronDownIcon } from './chevron-down-icon';

// The hamburger and the full-screen menu below the mobile top bar. The panel
// is portaled to <body> so it covers the page below the sticky header.
export function MobileNav({ entries }: { entries: NavEntry[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close();
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      )
        close();
    };
    const desktop = window.matchMedia('(min-width: 64rem)');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    desktop.addEventListener('change', close);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', close);
    };
  }, [open]);

  const bar =
    'block h-0.5 w-4 rounded-full bg-current transition-transform duration-200 origin-center';

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="relative inline-flex h-9 w-9 flex-col items-center justify-center rounded-lg p-2 hover:bg-surface focus:outline-none"
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={`${bar} ${open ? 'translate-y-0.5 rotate-45' : '-translate-y-1'}`}
        />
        <span className={`${bar} ${open ? '-rotate-45' : 'translate-y-1'}`} />
      </button>
      {createPortal(
        <div
          ref={panelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col border-t border-border bg-background px-4 pt-4 pb-6 transition-[opacity,translate,visibility] duration-150 lg:hidden ${
            open
              ? 'visible translate-y-0 opacity-100'
              : 'invisible -translate-y-1 opacity-0'
          }`}
        >
          <nav className="flex-1 overflow-y-auto">
            <ul className="flex flex-col divide-y divide-border">
              {entries.map((entry) =>
                entry.kind === 'link' ? (
                  <li key={entry.label}>
                    <a href={entry.href} className="block py-3.5 font-semibold">
                      {entry.label}
                    </a>
                  </li>
                ) : (
                  <li key={entry.label}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 font-semibold [&::-webkit-details-marker]:hidden">
                        <span>{entry.label}</span>
                        <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="flex flex-col gap-3 pb-4 pl-1">
                        {entry.items.map((item) => (
                          <li key={item.title}>
                            <a href={item.href} className="block">
                              <span className="block text-sm font-medium">
                                {item.title}
                              </span>
                              <span className="block text-sm text-muted-foreground">
                                {item.description}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="grid grid-cols-2 gap-2 pt-4">
            <a
              href={headerCtas.signIn.href}
              className="flex h-11 items-center justify-center rounded-lg border border-border text-sm font-semibold"
            >
              {headerCtas.signIn.label}
            </a>
            <a
              href={headerCtas.trial.href}
              className="flex h-11 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white"
            >
              {headerCtas.trial.label}
            </a>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
