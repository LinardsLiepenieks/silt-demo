import { useState } from 'react';
import { spotlight, type SpotlightMetric } from '../content/spotlight';
import { ArrowRightIcon } from './arrow-right-icon';
import { Avatar, type Tint } from './mock-card';

type Period = 'before' | 'after';

/** A case-study card whose metrics switch between before and after. */
export function CaseStudyTile({
  company = spotlight.caseStudy.company,
  periods = spotlight.caseStudy.periods,
  metrics = spotlight.caseStudy.metrics,
  footnote = spotlight.caseStudy.footnote,
  cta = spotlight.caseStudy.cta,
  initialPeriod = 'after',
}: {
  company?: string;
  periods?: Record<Period, string>;
  metrics?: SpotlightMetric[];
  footnote?: string;
  cta?: { label: string; href: string };
  initialPeriod?: Period;
}) {
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const after = period === 'after';

  return (
    <div className="flex w-full flex-col rounded-3xl border border-border bg-white p-6 shadow-[0_1px_2px_rgb(0_0_0/.04),0_8px_24px_rgb(0_0_0/.06)] sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="flex items-center gap-2 font-display text-lg font-bold tracking-[-0.02em]">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5">
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M10 4c-2.5 3-2.5 9 0 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          {company}
        </span>
        <div
          role="group"
          aria-label="Compare periods"
          className="relative grid grid-cols-2 rounded-full bg-surface p-1 text-xs font-semibold"
        >
          {/* The white thumb slides under whichever period is picked. */}
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none ${
              after ? 'translate-x-full' : ''
            }`}
          />
          {(['before', 'after'] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={period === key}
              onClick={() => setPeriod(key)}
              className={`relative cursor-pointer rounded-full px-3.5 py-1.5 whitespace-nowrap transition-colors ${
                period === key
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {periods[key]}
            </button>
          ))}
        </div>
      </div>

      <dl className="mt-8 flex flex-col gap-6">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-end justify-between gap-4">
              <dt className="text-sm text-muted-foreground">{metric.label}</dt>
              <dd className="flex items-center gap-2">
                {metric.change && (
                  <span
                    className={`rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-strong transition-[opacity,translate] duration-300 motion-reduce:transition-none ${
                      after ? 'opacity-100' : 'translate-x-1 opacity-0'
                    }`}
                  >
                    {metric.change}
                  </span>
                )}
                {/* Both values share one cell and cross-fade. */}
                <span className="grid text-right font-display text-2xl font-bold whitespace-nowrap sm:text-3xl tracking-[-0.03em] tabular-nums">
                  {(['before', 'after'] as const).map((key) => (
                    <span
                      key={key}
                      aria-hidden={period !== key}
                      className={`col-start-1 row-start-1 transition-[opacity,translate] duration-300 motion-reduce:transition-none ${
                        period === key
                          ? 'opacity-100'
                          : `opacity-0 ${key === 'after' ? 'translate-y-2' : '-translate-y-2'}`
                      }`}
                    >
                      {metric[key]}
                    </span>
                  ))}
                </span>
              </dd>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-surface">
              <div
                className={`h-full rounded-full transition-[width,background-color] duration-500 ease-out motion-reduce:transition-none ${
                  after ? 'bg-accent' : 'bg-foreground/25'
                }`}
                style={{ width: `${metric.bars[period] * 100}%` }}
              />
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">{footnote}</p>
        <a
          href={cta.href}
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
        >
          {cta.label}
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}

/** A customer's quote beside the numbers from their case study. */
export function CustomerSpotlight({
  title = spotlight.title,
  quote = spotlight.quote,
  author = spotlight.author,
}: {
  title?: string;
  quote?: string;
  author?: { name: string; role: string; tint: Tint };
}) {
  return (
    <section className="px-4 py-16 md:px-12 md:py-24 xl:px-36 xl:pt-28">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-10 max-w-[820px] font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-5xl md:mb-14 xl:text-[64px]">
          {title}
        </h2>
        <div className="flex flex-col items-center gap-10 rounded-[28px] bg-surface p-6 sm:p-10 lg:flex-row lg:gap-16 lg:p-14">
          <figure className="flex w-full flex-col gap-8 lg:max-w-[500px]">
            <QuoteIcon />
            <blockquote className="font-display text-2xl leading-[1.3] font-semibold tracking-[-0.02em] text-foreground md:text-[30px]">
              {quote}
            </blockquote>
            <figcaption className="flex items-center gap-4">
              <Avatar
                name={author.name}
                tint={author.tint}
                className="size-12 text-base"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-foreground">{author.name}</p>
                <p className="text-sm text-muted-foreground">{author.role}</p>
              </div>
            </figcaption>
          </figure>
          <div className="w-full lg:flex-1">
            <CaseStudyTile />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 32 24" aria-hidden="true" className="h-6 w-8 text-warm">
      <path
        fill="currentColor"
        d="M0 24V14C0 6.5 4 1.6 11 0l1.5 3.4C8.4 4.9 6.6 7.6 6.4 11H12v13H0Zm19 0V14c0-7.5 4-12.4 11-14l1.5 3.4c-4.1 1.5-5.9 4.2-6.1 7.6H31v13H19Z"
      />
    </svg>
  );
}
