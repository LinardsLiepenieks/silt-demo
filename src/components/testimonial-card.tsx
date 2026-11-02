import { testimonials, type Testimonial } from '../content/testimonials';
import { Avatar } from './mock-card';

type CardProps = Pick<Testimonial, 'quote' | 'name' | 'role' | 'tint'>;

export function TestimonialCard({
  quote = testimonials[0].quote,
  name = testimonials[0].name,
  role = testimonials[0].role,
  tint = testimonials[0].tint,
}: Partial<CardProps>) {
  return (
    <figure className="flex w-80 flex-col gap-6 rounded-3xl border border-border bg-white p-7 shadow-[0_1px_2px_rgb(0_0_0/.04),0_12px_32px_rgb(0_0_0/.08)]">
      <svg viewBox="0 0 32 24" aria-hidden="true" className="h-5 w-7 text-warm">
        <path
          fill="currentColor"
          d="M0 24V14C0 6.3 4.2 1.6 12 0l1.6 3.4C9 4.8 6.9 7.4 6.6 11H12v13H0Zm19 0V14c0-7.7 4.2-12.4 12-14l1.6 3.4C28 4.8 25.9 7.4 25.6 11H31v13H19Z"
        />
      </svg>
      <blockquote className="font-display text-xl leading-[1.35] font-semibold tracking-[-0.02em] text-foreground">
        {quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <Avatar name={name} tint={tint} className="size-10 text-sm" />
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{name}</span>
          <span className="text-sm text-muted-foreground">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
