import { useCallback, useEffect, useRef, useState } from 'react';
import { featureCards, featuresHeading } from '../content/features';
import { FeatureVignette, type VignetteKind } from './feature-vignettes';

export type FeatureCardProps = {
  title: string;
  href: string;
  /** Which coded scene the card shows; it moves to a second state on hover. */
  vignette: VignetteKind;
};

// Gap between cards, matching `gap-5` on the list.
const cardGap = 20;

/** One tall product card; it lifts and its scene changes state on hover. */
export function FeatureCard({
  title = 'Shared inbox',
  href = '#',
  vignette = 'inbox',
}: Partial<FeatureCardProps>) {
  return (
    <a
      href={href}
      className="group flex aspect-[4/5] flex-col justify-between gap-6 rounded-[28px] border border-border bg-surface p-6 transition-transform duration-300 ease-out hover:-translate-y-1 md:p-8"
    >
      <div className="flex flex-1 items-center">
        <FeatureVignette kind={vignette} />
      </div>
      <h3 className="font-display text-2xl leading-tight font-bold tracking-[-0.03em] text-foreground md:text-[28px]">
        {title}
      </h3>
    </a>
  );
}

function ScrollButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Scroll features ${direction === 'prev' ? 'left' : 'right'}`}
      disabled={disabled}
      onClick={onClick}
      className="pointer-events-auto flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-foreground shadow-[0_1px_2px_rgb(0_0_0/.04),0_8px_24px_rgb(0_0_0/.06)] transition-all duration-200 hover:scale-105 hover:bg-surface disabled:pointer-events-none disabled:opacity-0 md:size-12"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`size-4 md:size-5 ${
          // The next arrow nudges right a few times to hint at more cards.
          direction === 'next' && !disabled
            ? 'motion-safe:animate-[feature-scroll-nudge_2.6s_ease-in-out_1.2s_3]'
            : ''
        }`}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={direction === 'prev' ? 'm15 6l-6 6l6 6' : 'm9 6l6 6l-6 6'}
        />
      </svg>
    </button>
  );
}

/** A snapping row of feature cards with arrows. */
export function FeatureCards({
  eyebrow = featuresHeading.eyebrow,
  title = featuresHeading.title,
  cards = featureCards,
}: {
  eyebrow?: string;
  title?: string;
  cards?: FeatureCardProps[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const element = scroller.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    setAtStart(element.scrollLeft <= 4);
    setAtEnd(element.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scrollByCard = (sign: 1 | -1) => {
    const element = scroller.current;
    if (!element) return;
    const card = element.querySelector('li');
    const step = card
      ? card.getBoundingClientRect().width + cardGap
      : element.clientWidth * 0.8;
    element.scrollBy({ left: sign * step, behavior: 'smooth' });
  };

  return (
    <section className="bg-background pt-16 pb-10 md:pt-24 md:pb-14 xl:pt-28">
      <div className="px-6 md:px-12 xl:px-36">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-accent">{eyebrow}</p>
          <h2 className="font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-foreground md:text-5xl xl:text-6xl">
            {title}
          </h2>
        </div>
      </div>
      <div className="relative mt-10 md:mt-16 xl:mt-20">
        <div
          ref={scroller}
          onScroll={update}
          className="snap-x snap-mandatory scroll-pl-6 overflow-x-auto [scrollbar-width:none] md:scroll-pl-12 xl:scroll-pl-36 [&::-webkit-scrollbar]:hidden"
        >
          <ul className="m-0 flex list-none gap-5 px-6 py-2 md:px-12 xl:px-36">
            {cards.map((card) => (
              <li
                key={card.title}
                className="w-[280px] shrink-0 snap-start sm:w-[340px] md:w-[400px]"
              >
                <FeatureCard {...card} />
              </li>
            ))}
          </ul>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 md:px-4 xl:px-8">
          <ScrollButton
            direction="prev"
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
          />
          <ScrollButton
            direction="next"
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
          />
        </div>
      </div>
    </section>
  );
}
