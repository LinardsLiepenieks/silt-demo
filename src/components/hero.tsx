import { useRef, type ReactNode } from 'react';
import { hero, heroIntervalMs, heroStepLabels } from '../content/hero';
import { Link } from '../lib/router';
import { useSlideshow } from '../lib/use-slideshow';
import { ArrowRightIcon } from './arrow-right-icon';
import { CustomerProfileMock } from './customer-profile-mock';
import { InboxMock } from './inbox-mock';
import { InsightsMock } from './insights-mock';
import { ReplyDraftMock } from './reply-draft-mock';
import { SlideshowSteps } from './slideshow-steps';

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16"
      />
    </svg>
  );
}

const ctaBase =
  'inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-colors duration-200 active:scale-[0.98] sm:w-auto';

/** Colours one word of the headline with the brand accent. */
function Headline({
  title,
  accentWord,
}: {
  title: string;
  accentWord: string;
}) {
  const at = title.indexOf(accentWord);
  if (at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className="text-warm">{accentWord}</span>
      {title.slice(at + accentWord.length)}
    </>
  );
}

/**
 * The opening section: headline, two calls to action and a product panel
 * whose four views take turns on the right.
 */
export function Hero({
  title = hero.title,
  accentWord = hero.accentWord,
  text = hero.text,
}: {
  title?: string;
  accentWord?: string;
  text?: string;
}) {
  return (
    <section className="bg-[radial-gradient(60%_70%_at_0%_0%,var(--color-accent-soft),transparent_70%),radial-gradient(50%_60%_at_100%_10%,var(--color-warm-soft),transparent_70%)]">
      <div className="container grid grid-cols-1 items-center gap-12 pt-10 pb-16 md:pt-14 md:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,580px)]">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <Announcement />
          <h1 className="max-w-[640px] font-display text-[44px] leading-[1.05] font-bold tracking-[-0.035em] text-balance text-foreground sm:text-6xl hero:text-7xl">
            <Headline title={title} accentWord={accentWord} />
          </h1>
          <p className="max-w-[500px] text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {text}
          </p>
          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className={`${ctaBase} bg-accent text-white shadow-sm hover:bg-accent-strong`}
            >
              {hero.primaryCta.label}
              <ArrowRightIcon className="size-4" />
            </Link>
            <a
              href={hero.secondaryCta.href}
              className={`${ctaBase} border border-border bg-white text-foreground hover:bg-surface`}
            >
              <CalendarIcon />
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <ProductSlideshow />
      </div>
    </section>
  );
}

function Announcement() {
  const { badge, label, href } = hero.announcement;
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-full bg-accent-soft py-1 pr-3 pl-1 text-sm font-medium text-accent-strong transition-colors hover:bg-tint-mint"
    >
      <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold">
        {badge}
      </span>
      {label}
      <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}

const slides: ReactNode[] = [
  <InboxMock key="inbox" />,
  <CustomerProfileMock key="customer" />,
  <ReplyDraftMock key="draft" />,
  <InsightsMock key="insights" />,
];

// The four views stack in one grid cell, so the panel takes the tallest
// one's height, and cross-fade as the steps advance.
export function ProductSlideshow({
  labels = heroStepLabels,
  intervalMs = heroIntervalMs,
}: {
  labels?: string[];
  intervalMs?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const { active, select, animating, cycle } = useSlideshow(
    root,
    slides.length,
    intervalMs,
  );
  return (
    <div
      ref={root}
      className="mx-auto flex w-full max-w-[600px] flex-col items-center gap-6 rounded-[32px] bg-linear-to-br from-accent-soft via-surface to-warm-soft px-5 pt-10 pb-6 sm:px-10 sm:pt-14 lg:mr-0"
    >
      <div className="grid w-full justify-items-center">
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <div
              key={labels[index]}
              aria-hidden={!isActive}
              inert={!isActive}
              className={`col-start-1 row-start-1 flex w-full items-center justify-center transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none ${
                isActive
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-2 opacity-0'
              }`}
            >
              {slide}
            </div>
          );
        })}
      </div>
      <SlideshowSteps
        labels={labels}
        active={active}
        onSelect={select}
        animating={animating}
        cycle={cycle}
        intervalMs={intervalMs}
        variant="light"
        className="gap-1.5 sm:gap-2"
      />
    </div>
  );
}
