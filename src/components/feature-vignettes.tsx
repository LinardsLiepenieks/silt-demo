import type { ReactNode } from 'react';
import { Avatar } from './mock-card';

// Small coded UI scenes for the feature cards. Each has a resting state and
// a second state the card cross-fades to while hovered.

export type VignetteKind =
  'inbox' | 'chat' | 'help' | 'automations' | 'reports' | 'surveys';

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="w-full rounded-2xl border border-border bg-white p-5 text-left shadow-[0_1px_2px_rgb(0_0_0/.04),0_8px_24px_rgb(0_0_0/.06)]">
      {children}
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg px-1 py-2 text-sm text-foreground">
      {children}
    </div>
  );
}

const inboxRows = [
  { subject: 'Where is my parcel?', channel: 'Email' },
  { subject: 'Discount code not working', channel: 'Chat' },
  { subject: 'Change billing address', channel: 'Email' },
];
const assignees = [
  { name: 'Sam Reyes', tint: 'sky' },
  { name: 'Ana Duarte', tint: 'rose' },
  { name: 'Leo Brandt', tint: 'sand' },
] as const;

function InboxScene({ assigned }: { assigned: boolean }) {
  return (
    <Panel>
      {inboxRows.map((row, index) => (
        <Row key={row.subject}>
          {assigned ? (
            <Avatar
              name={assignees[index].name}
              tint={assignees[index].tint}
              className="size-6 text-[10px]"
            />
          ) : (
            <span className="size-6 shrink-0 rounded-full border border-dashed border-muted-foreground/40" />
          )}
          <span className="min-w-0 flex-1 truncate">{row.subject}</span>
          <span className="text-xs text-muted-foreground">
            {assigned ? assignees[index].name.split(' ')[0] : row.channel}
          </span>
        </Row>
      ))}
    </Panel>
  );
}

function Bubble({
  from,
  children,
}: {
  from: 'them' | 'us';
  children: ReactNode;
}) {
  return (
    <p
      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-snug ${
        from === 'us'
          ? 'self-end rounded-br-md bg-accent text-white'
          : 'self-start rounded-bl-md bg-surface text-foreground'
      }`}
    >
      {children}
    </p>
  );
}

function ChatScene({ answered }: { answered: boolean }) {
  return (
    <Panel>
      <div className="flex min-h-[150px] flex-col justify-end gap-2">
        <Bubble from="them">Is the blue kettle back in stock?</Bubble>
        {answered ? (
          <Bubble from="us">
            Yes, it ships today. Want me to reserve one?
          </Bubble>
        ) : (
          <span className="flex gap-1 self-end rounded-2xl bg-tint-mint px-3 py-2.5">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="size-1.5 rounded-full bg-accent/60" />
            ))}
          </span>
        )}
      </div>
    </Panel>
  );
}

const articles = [
  'Returns and refunds',
  'Changing your order',
  'Shipping times',
];

function HelpScene({ searched }: { searched: boolean }) {
  return (
    <Panel>
      <div className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-sm">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-3.5 text-muted-foreground"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.5"
            d="M11 18a7 7 0 1 0 0-14a7 7 0 0 0 0 14m5-2l4 4"
          />
        </svg>
        <span
          className={searched ? 'text-foreground' : 'text-muted-foreground'}
        >
          {searched ? 'return a gift' : 'Search articles'}
        </span>
      </div>
      <ul className="mt-2">
        {articles.map((title, index) => (
          <li
            key={title}
            className={`rounded-lg px-2.5 py-1.5 text-sm ${
              searched && index === 0
                ? 'bg-accent-soft font-medium text-accent-strong'
                : searched
                  ? 'text-muted-foreground/50'
                  : 'text-foreground'
            }`}
          >
            {title}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function Step({
  label,
  text,
  tone,
}: {
  label: string;
  text: string;
  tone: string;
}) {
  return (
    <div className="w-full rounded-xl border border-border bg-white px-3 py-2 text-left shadow-sm">
      <span
        className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tone}`}
      >
        {label}
      </span>
      <p className="mt-1 text-sm text-foreground">{text}</p>
    </div>
  );
}

function AutomationsScene({ built }: { built: boolean }) {
  return (
    <div className="flex w-full flex-col items-center">
      <Step
        label="When"
        text="A message mentions “refund”"
        tone="bg-tint-sky text-[#285a85]"
      />
      <span className="h-4 w-px bg-border" />
      {built ? (
        <Step
          label="Then"
          text="Tag Billing and assign to Ana"
          tone="bg-accent-soft text-accent-strong"
        />
      ) : (
        <span className="flex h-[54px] w-full items-center justify-center rounded-xl border border-dashed border-muted-foreground/40 text-sm text-muted-foreground">
          + Add action
        </span>
      )}
    </div>
  );
}

const week = [
  [40, 58],
  [55, 64],
  [35, 70],
  [62, 82],
  [48, 76],
];

function ReportsScene({ later }: { later: boolean }) {
  return (
    <Panel>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">Solved this week</span>
        <span className="font-display text-lg font-bold text-foreground">
          {later ? '350' : '240'}
        </span>
      </div>
      <div className="mt-3 flex h-24 items-end gap-2">
        {week.map(([before, after], index) => (
          <span
            key={index}
            className={`flex-1 rounded-md ${later ? 'bg-accent' : 'bg-tint-mint'}`}
            style={{ height: `${later ? after : before}%` }}
          />
        ))}
      </div>
    </Panel>
  );
}

const scores = ['1', '2', '3', '4', '5'];

function SurveysScene({ rated }: { rated: boolean }) {
  return (
    <Panel>
      <p className="text-center text-sm font-medium text-foreground">
        {rated ? 'Thanks, Maya!' : 'How did we do today?'}
      </p>
      <div className="mt-3 flex justify-center gap-1.5">
        {scores.map((score, index) => (
          <span
            key={score}
            className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ${
              rated && index === 4
                ? 'bg-accent text-white'
                : rated
                  ? 'bg-surface text-muted-foreground/50'
                  : 'bg-surface text-foreground'
            }`}
          >
            {score}
          </span>
        ))}
      </div>
    </Panel>
  );
}

const scenes: Record<VignetteKind, (hovered: boolean) => ReactNode> = {
  inbox: (on) => <InboxScene assigned={on} />,
  chat: (on) => <ChatScene answered={on} />,
  help: (on) => <HelpScene searched={on} />,
  automations: (on) => <AutomationsScene built={on} />,
  reports: (on) => <ReportsScene later={on} />,
  surveys: (on) => <SurveysScene rated={on} />,
};

/** Both states of one scene; the parent card's hover picks which shows. */
export function FeatureVignette({ kind }: { kind: VignetteKind }) {
  const layer =
    'col-start-1 row-start-1 flex items-center transition-opacity duration-[900ms] ease-out';
  return (
    <div className="grid w-full">
      <div className={`${layer} group-hover:opacity-0`}>
        {scenes[kind](false)}
      </div>
      <div
        aria-hidden="true"
        className={`${layer} opacity-0 group-hover:opacity-100`}
      >
        {scenes[kind](true)}
      </div>
    </div>
  );
}
