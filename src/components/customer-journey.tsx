import { useRef } from 'react';
import {
  journeyHeading,
  journeyIntervalMs,
  journeySlides,
} from '../content/journey';
import { useSlideshow } from '../lib/use-slideshow';
import { ChatMock, type ChatWidgetProps } from './chat-mock';
import {
  WeeklyInsightMock,
  type WeeklyInsightProps,
} from './weekly-insight-mock';
import type { Tint } from './mock-card';
import {
  ReplyComposerMock,
  type ReplyComposerProps,
} from './reply-composer-mock';
import { SlideshowSteps } from './slideshow-steps';
import { SurveyMock, type SurveyProps } from './survey-mock';
import { TicketMock, type TicketProps } from './ticket-mock';

export type JourneyMock =
  | ({ kind: 'chat' } & ChatWidgetProps)
  | ({ kind: 'ticket' } & TicketProps)
  | ({ kind: 'reply' } & ReplyComposerProps)
  | ({ kind: 'survey' } & SurveyProps)
  | ({ kind: 'insight' } & WeeklyInsightProps);

export type JourneySlide = {
  /** Short label on the step pill. */
  step: string;
  eyebrow: string;
  title: string;
  text: string;
  /** The slide's flat backdrop. */
  tint: Tint;
  mock: JourneyMock;
};

const backdrops: Record<Tint, string> = {
  mint: 'bg-tint-mint',
  sand: 'bg-tint-sand',
  sky: 'bg-tint-sky',
  rose: 'bg-tint-rose',
  lilac: 'bg-tint-lilac',
  accent: 'bg-accent-soft',
};

function SlideMock({ mock }: { mock: JourneyMock }) {
  switch (mock.kind) {
    case 'chat':
      return <ChatMock {...mock} />;
    case 'ticket':
      return <TicketMock {...mock} />;
    case 'reply':
      return <ReplyComposerMock {...mock} />;
    case 'survey':
      return <SurveyMock {...mock} />;
    case 'insight':
      return <WeeklyInsightMock {...mock} />;
  }
}

/** One moment in Maya's question: copy on the left, product UI on the right. */
export function JourneySlideCard({
  slide = journeySlides[0],
  index = 0,
}: {
  slide?: JourneySlide;
  /** Position in the journey, shown as "Step 1". */
  index?: number;
}) {
  return (
    <div
      className={`grid h-full grid-cols-1 content-center items-center gap-8 rounded-[28px] p-6 sm:p-8 md:grid-cols-2 md:gap-12 md:p-12 xl:p-16 ${backdrops[slide.tint]}`}
    >
      <div className="flex max-w-[460px] flex-col gap-4">
        <p className="text-sm font-medium text-foreground/60">
          Step {index + 1} · {slide.eyebrow}
        </p>
        <h3 className="font-display text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-foreground md:text-4xl xl:text-[40px]">
          {slide.title}
        </h3>
        <p className="text-base leading-relaxed text-foreground/75 md:text-lg">
          {slide.text}
        </p>
      </div>
      <div className="flex items-center justify-center md:justify-end">
        <SlideMock mock={slide.mock} />
      </div>
    </div>
  );
}

/** "How it works": one customer question as a cross-fading, auto-playing slideshow. */
export function CustomerJourney({
  eyebrow = journeyHeading.eyebrow,
  title = journeyHeading.title,
  text = journeyHeading.text,
  slides = journeySlides,
  intervalMs = journeyIntervalMs,
}: {
  eyebrow?: string;
  /** Each line of the headline. */
  title?: string[];
  text?: string;
  slides?: JourneySlide[];
  intervalMs?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const { active, select, animating, cycle } = useSlideshow(
    root,
    slides.length,
    intervalMs,
  );

  return (
    <section className="px-4 py-16 md:px-12 md:py-24 xl:px-36 xl:pt-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <p className="text-sm font-semibold text-accent">{eyebrow}</p>
          <h2 className="max-w-[1000px] font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-5xl xl:text-[64px]">
            {title.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-2 max-w-[640px] text-lg text-muted-foreground">
            {text}
          </p>
        </div>
        <div ref={root} className="relative">
          <div className="relative min-h-[760px] sm:min-h-[700px] md:min-h-[480px]">
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <div
                  key={slide.step}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className={`absolute inset-0 transition-opacity duration-400 ease-[ease] motion-reduce:transition-none ${
                    isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <JourneySlideCard slide={slide} index={index} />
                </div>
              );
            })}
          </div>
          <SlideshowSteps
            labels={slides.map((slide) => slide.step)}
            active={active}
            onSelect={select}
            animating={animating}
            cycle={cycle}
            intervalMs={intervalMs}
            variant="light"
            className="mt-8 flex-wrap justify-center gap-2"
          />
        </div>
      </div>
    </section>
  );
}
