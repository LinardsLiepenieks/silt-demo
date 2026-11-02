import { useRef, useState, type PointerEvent } from 'react';
import {
  testimonials as defaultTestimonials,
  testimonialsHeading,
  type Testimonial,
} from '../content/testimonials';
import { TestimonialCard } from './testimonial-card';

type Placement = { x: number; y: number; z: number };

// From lg up the cards lie in a loose pile you can rearrange by dragging;
// below that they sit upright in a row you scroll sideways.
export function TestimonialPile({
  eyebrow = testimonialsHeading.eyebrow,
  title = testimonialsHeading.title,
  text = testimonialsHeading.text,
  testimonials = defaultTestimonials,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  testimonials?: Testimonial[];
}) {
  const [placements, setPlacements] = useState<Placement[]>(() =>
    testimonials.map((t, i) => ({ x: t.x, y: t.y, z: i + 1 })),
  );
  const [dragging, setDragging] = useState<number | null>(null);
  const drag = useRef<{ index: number; dx: number; dy: number } | null>(null);
  const topZ = useRef(testimonials.length);

  const pickUp = (index: number) => (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const placement = placements[index];
    drag.current = {
      index,
      dx: event.clientX - placement.x,
      dy: event.clientY - placement.y,
    };
    topZ.current += 1;
    const z = topZ.current;
    setPlacements((all) => all.map((p, i) => (i === index ? { ...p, z } : p)));
    setDragging(index);
  };

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current) return;
    const x = event.clientX - current.dx;
    const y = event.clientY - current.dy;
    setPlacements((all) =>
      all.map((p, i) => (i === current.index ? { ...p, x, y } : p)),
    );
  };

  const drop = () => {
    drag.current = null;
    setDragging(null);
  };

  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent-strong">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 hidden text-lg text-muted-foreground lg:block">
            {text}
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-14 hidden h-[640px] max-w-[1280px] lg:block">
        {testimonials.map((testimonial, i) => {
          const { x, y, z } = placements[i];
          const lifted = dragging === i;
          return (
            <div
              key={testimonial.name}
              onPointerDown={pickUp(i)}
              onPointerMove={move}
              onPointerUp={drop}
              onPointerCancel={drop}
              className={`absolute top-0 left-1/2 cursor-grab touch-none select-none ${
                lifted
                  ? 'cursor-grabbing'
                  : '[transition:rotate_.25s_ease-out,scale_.25s_ease-out]'
              } hover:scale-[1.02]`}
              style={{
                translate: `${x}px ${y}px`,
                rotate: `${lifted ? 0 : testimonial.rotate}deg`,
                scale: lifted ? '1.04' : undefined,
                zIndex: z,
              }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] lg:hidden">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="shrink-0 snap-center">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </section>
  );
}
