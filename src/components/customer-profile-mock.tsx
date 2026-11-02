import { heroCustomer } from '../content/hero';
import { Avatar, MockCard, type Tint } from './mock-card';

export type CustomerEvent = {
  date: string;
  text: string;
  kind: 'order' | 'conversation';
};

export type CustomerProfileMockProps = {
  name: string;
  initials: string;
  tint: Tint;
  detail: string;
  stats: { label: string; value: string }[];
  timeline: CustomerEvent[];
};

const kindLabel: Record<CustomerEvent['kind'], string> = {
  order: 'Order',
  conversation: 'Chat',
};

/** One customer's profile: headline numbers and their history with you. */
export function CustomerProfileMock({
  name = heroCustomer.name,
  initials = heroCustomer.initials,
  tint = heroCustomer.tint,
  detail = heroCustomer.detail,
  stats = heroCustomer.stats,
  timeline = heroCustomer.timeline,
}: Partial<CustomerProfileMockProps>) {
  return (
    <MockCard>
      <div className="flex items-center gap-3">
        <Avatar
          name={name}
          initials={initials}
          tint={tint}
          className="size-11 text-sm"
        />
        <div>
          <h4 className="font-display text-base font-bold tracking-[-0.02em] text-foreground">
            {name}
          </h4>
          <p className="text-xs text-muted-foreground">{detail}</p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-surface px-3 py-2">
            <dt className="text-[11px] text-muted-foreground">{stat.label}</dt>
            <dd className="font-display text-sm font-bold text-foreground">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      <ol className="mt-4 flex flex-col">
        {timeline.map((event, index) => (
          <li
            key={event.date + event.text}
            className="relative flex gap-3 pb-3 last:pb-0"
          >
            {index < timeline.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-3 bottom-0 left-[5px] w-px bg-border"
              />
            )}
            <span
              aria-hidden="true"
              className={`relative mt-1 size-[11px] shrink-0 rounded-full border-2 border-white ${
                event.kind === 'order'
                  ? 'bg-tint-sand ring-1 ring-[#e3cfa6]'
                  : 'bg-accent'
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground">
                  {kindLabel[event.kind]}
                </span>
                <span>{event.date}</span>
              </div>
              <p className="text-[13px] leading-snug text-muted-foreground">
                {event.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </MockCard>
  );
}
