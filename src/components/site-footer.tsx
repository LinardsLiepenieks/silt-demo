import type { ReactNode } from 'react';
import {
  copyright,
  footerColumns,
  footerTagline,
  legalLinks,
  socialLinks,
  type FooterColumn,
} from '../content/footer';
import { siteUrl } from '../content/navigation';
import { BrandWordmark } from './brand-logo';
import { ChevronDownIcon } from './chevron-down-icon';

const linkClass =
  'block text-sm text-muted-foreground transition-colors hover:text-foreground';

function StrokeIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SocialLinks() {
  const icons = [
    {
      ...socialLinks.x,
      icon: (
        <path d="m4 4l11.733 16H20L8.267 4zm0 16l6.768-6.768m2.46-2.46L20 4" />
      ),
    },
    {
      ...socialLinks.linkedIn,
      icon: (
        <>
          <path d="M8 11v5m0-8v.01M12 16v-5m4 5v-3a2 2 0 1 0-4 0" />
          <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
        </>
      ),
    },
    {
      ...socialLinks.youTube,
      icon: (
        <>
          <path d="M2 8a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
          <path d="m10 9l5 3l-5 3z" />
        </>
      ),
    },
  ];
  return (
    <div className="flex items-center gap-2">
      {icons.map(({ href, label, icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
        >
          <StrokeIcon>{icon}</StrokeIcon>
        </a>
      ))}
    </div>
  );
}

function ColumnLinks({ column }: { column: FooterColumn }) {
  return column.links.map((link) => (
    <li key={link.label}>
      <a href={link.href} className={linkClass}>
        {link.label}
      </a>
    </li>
  ));
}

// Below lg each column folds into a native <details> accordion.
function FooterAccordion({ column }: { column: FooterColumn }) {
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {column.title}
        <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <ul className="space-y-3 pb-5">
        <ColumnLinks column={column} />
      </ul>
    </details>
  );
}

function FooterLinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <div className="mb-4 text-sm font-semibold">{column.title}</div>
      <ul className="space-y-3">
        <ColumnLinks column={column} />
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container pt-14 pb-10 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-6 lg:gap-8">
          <div className="space-y-5 lg:col-span-2">
            <a href={siteUrl} aria-label="Tidewell" className="inline-flex">
              <BrandWordmark />
            </a>
            <p className="max-w-64 text-sm text-muted-foreground">
              {footerTagline}
            </p>
            <SocialLinks />
          </div>
          <div className="border-t border-border lg:hidden">
            {footerColumns.map((column) => (
              <FooterAccordion key={column.title} column={column} />
            ))}
          </div>
          {footerColumns.map((column) => (
            <div key={column.title} className="hidden lg:block">
              <FooterLinkColumn column={column} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p>{copyright}</p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
