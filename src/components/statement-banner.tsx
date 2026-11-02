import { statement } from '../content/statement';
import { ArrowRightIcon } from './arrow-right-icon';

/** A soft accent panel with the page's one-line promise and a link onward. */
export function StatementBanner({
  title = statement.title,
  text = statement.text,
  cta = statement.cta,
}: Partial<typeof statement>) {
  return (
    <section className="container py-8 md:py-12">
      <div className="relative overflow-hidden rounded-4xl bg-accent-soft px-6 py-16 text-center md:py-24">
        <Waves />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <h2 className="font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-base text-pretty text-muted-foreground md:text-lg">
            {text}
          </p>
          <a
            href={cta.href}
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-strong focus-visible:ring-[3px] focus-visible:ring-accent/30 focus-visible:outline-none"
          >
            {cta.label}
            <ArrowRightIcon className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Soft wave lines running across the panel, stretched to its width.
function Waves() {
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {rows.map((row) => {
        const y = 250 + row * 26;
        return (
          <path
            key={row}
            d={`M0 ${y} C 200 ${y - 50}, 400 ${y + 50}, 600 ${y} S 1000 ${y - 50}, 1200 ${y}`}
            opacity={0.08 + row * 0.03}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
