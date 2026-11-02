import type { ReactNode } from 'react';
import { Link, routes } from '../lib/router';
import { BrandWordmark } from './brand-logo';

/**
 * Sign in and sign up: the form on the left, a calm tinted panel on the
 * right. The panel drops below the form on small screens.
 */
export function AuthLayout({
  title = 'Welcome back',
  text,
  children,
  aside,
  footer,
}: {
  title?: string;
  text?: string;
  children?: ReactNode;
  aside?: ReactNode;
  /** Below the form, e.g. the link to the other auth screen. */
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-dvh bg-background lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col px-4 sm:px-8 lg:px-12">
        <header className="flex h-16 items-center">
          <Link
            href={routes.landing}
            aria-label="Halcyon home"
            className="rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30"
          >
            <BrandWordmark />
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center py-10 lg:py-16">
          <div className="w-full max-w-[400px]">
            <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-[2.125rem]">
              {title}
            </h1>
            {text && (
              <p className="mt-2 text-base text-muted-foreground">{text}</p>
            )}
            <div className="mt-8">{children}</div>
            {footer && (
              <div className="mt-8 text-sm text-muted-foreground">{footer}</div>
            )}
          </div>
        </main>
      </div>
      {aside && (
        <aside className="px-4 pb-4 sm:px-8 sm:pb-8 lg:p-4 lg:pl-0">
          <div className="flex h-full items-center justify-center rounded-[32px] bg-surface px-6 py-12 sm:px-12 lg:px-16">
            {aside}
          </div>
        </aside>
      )}
    </div>
  );
}

/** Link-styled text used for the cross links on the auth screens. */
export const authLinkClass =
  'font-semibold text-accent-strong underline-offset-4 outline-none hover:underline focus-visible:underline';
