import type { ReactNode } from 'react';
import {
  customerLogos,
  customersHeading,
  type CustomerGlyph,
  type CustomerLogo,
} from '../content/customers';

/**
 * Fictional customer wordmarks in one ink colour. They wrap into centred rows
 * on small screens and sit in a single row on wide ones.
 */
export function CustomerLogos({
  heading = customersHeading,
  logos = customerLogos,
}: {
  heading?: string;
  logos?: CustomerLogo[];
}) {
  return (
    <section className="container py-12 lg:py-16">
      <p className="mb-6 text-center text-sm text-muted-foreground">
        {heading}
      </p>
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12 xl:max-w-none xl:flex-nowrap xl:justify-between xl:gap-x-4">
        {logos.map((logo) => (
          <li key={logo.name}>
            <Wordmark {...logo} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Wordmark({ name, glyph, style }: CustomerLogo) {
  return (
    <span className="flex items-center gap-1.5 text-lg whitespace-nowrap text-foreground/75 sm:text-xl">
      <svg
        viewBox="0 0 20 20"
        className="size-[1.1em] shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {glyphs[glyph]}
      </svg>
      <span className={`font-display leading-none ${style}`}>{name}</span>
    </span>
  );
}

const glyphs: Record<CustomerGlyph, ReactNode> = {
  peak: <path d="M2 16 8 6l3.5 5L14 8l4 8z" />,
  loop: (
    <path d="M10 10c-2-3-6-3-6 0s4 3 6 0 6-3 6 0-4 3-6 0" strokeWidth="2.2" />
  ),
  bean: (
    <>
      <ellipse cx="10" cy="10" rx="5.5" ry="7.5" transform="rotate(30 10 10)" />
      <path d="M7 15c1-3 5-7 6-10" />
    </>
  ),
  monogram: (
    <>
      <rect x="2.5" y="2.5" width="15" height="15" rx="3.5" />
      <path d="M7.5 6.5v7M12.5 6.5v7M7.5 10h5" strokeWidth="1.8" />
    </>
  ),
  pine: <path d="M10 2 4 11h3l-3 5h12l-3-5h3zM10 16v2.5" />,
  tiles: (
    <>
      <rect
        x="2.5"
        y="2.5"
        width="6.5"
        height="6.5"
        rx="1.5"
        fill="currentColor"
        stroke="none"
      />
      <rect x="11" y="2.5" width="6.5" height="6.5" rx="3.25" />
      <rect x="2.5" y="11" width="6.5" height="6.5" rx="3.25" />
      <rect
        x="11"
        y="11"
        width="6.5"
        height="6.5"
        rx="1.5"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  leaf: <path d="M4 16C4 8 9 3 17 3c0 8-5 13-13 13zM4 16l7-7" />,
  wheel: (
    <>
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <path d="M10 3v5.5M10 11.5V17M3 10h5.5M11.5 10H17" strokeWidth="1.2" />
    </>
  ),
};
