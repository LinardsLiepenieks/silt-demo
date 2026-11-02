import { signInAside, signUpAside } from '../content/auth';
import { CheckIcon } from './check-icon';
import { InboxMock } from './inbox-mock';
import { Avatar } from './mock-card';

/** The sign-in panel: one customer's words. */
export function AuthQuote({
  quote = signInAside.quote,
  author = signInAside.author,
}: Partial<typeof signInAside>) {
  return (
    <figure className="flex max-w-[440px] flex-col gap-8">
      <svg viewBox="0 0 32 24" aria-hidden="true" className="h-6 w-8 text-warm">
        <path
          fill="currentColor"
          d="M0 24V14C0 6 4 1.5 12 0l1.5 3.5C9 5 7 7.5 6.8 11H12v13zm18 0V14c0-8 4-12.5 12-14l1.5 3.5C27 5 25 7.5 24.8 11H30v13z"
        />
      </svg>
      <blockquote className="font-display text-2xl leading-snug font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-[1.75rem]">
        {quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar
          name={author.name}
          tint={author.tint}
          className="size-10 text-sm"
        />
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">
            {author.name}
          </span>
          <span className="text-sm text-muted-foreground">{author.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** The sign-up panel: what the first afternoon looks like, beside the inbox. */
export function AuthProductVignette({
  title = signUpAside.title,
  points = signUpAside.points,
}: Partial<typeof signUpAside>) {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-8">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-foreground">
          {title}
        </h2>
        <ul className="mt-4 flex flex-col gap-2.5">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2.5 text-[15px] text-foreground"
            >
              <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                <CheckIcon className="size-3" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
      <InboxMock />
    </div>
  );
}
