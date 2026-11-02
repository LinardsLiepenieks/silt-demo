import { heroInbox } from '../content/hero';
import { Avatar, MockCard, type Tint } from './mock-card';

type SlaTone = 'warn' | 'ok' | 'done';

export type InboxConversation = {
  name: string;
  initials: string;
  tint: Tint;
  channel: string;
  subject: string;
  time: string;
  unread: boolean;
  sla: { label: string; tone: SlaTone };
};

export type InboxMockProps = {
  title: string;
  filter: string;
  conversations: InboxConversation[];
};

export const slaStyles: Record<SlaTone, string> = {
  warn: 'bg-tint-sand text-[#8a5a12]',
  ok: 'bg-accent-soft text-accent-strong',
  done: 'bg-surface text-muted-foreground',
};

/** A shared inbox: conversations from every channel with their reply deadlines. */
export function InboxMock({
  title = heroInbox.title,
  filter = heroInbox.filter,
  conversations = heroInbox.conversations,
}: Partial<InboxMockProps>) {
  return (
    <MockCard>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-display text-base font-bold tracking-[-0.02em] text-foreground">
          {title}
        </h4>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {filter}
        </span>
      </div>
      <ul className="-mx-2 flex flex-col">
        {conversations.map((item) => (
          <li
            key={item.name}
            className="flex items-start gap-3 rounded-xl px-2 py-2.5 first:bg-surface"
          >
            <Avatar
              name={item.name}
              initials={item.initials}
              tint={item.tint}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`truncate text-sm text-foreground ${item.unread ? 'font-semibold' : 'font-medium'}`}
                >
                  {item.name}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {item.channel}
                </span>
                <span className="ml-auto text-[11px] text-muted-foreground">
                  {item.time}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <p className="min-w-0 flex-1 truncate text-[13px] text-muted-foreground">
                  {item.subject}
                </p>
                {item.unread && (
                  <span
                    aria-label="Unread"
                    className="size-2 shrink-0 rounded-full bg-accent"
                  />
                )}
              </div>
              <span
                className={`mt-1.5 inline-block rounded-md px-1.5 py-0.5 text-[11px] font-medium ${slaStyles[item.sla.tone]}`}
              >
                {item.sla.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </MockCard>
  );
}
