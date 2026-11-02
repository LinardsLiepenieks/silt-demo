import { draftedReply } from '../content/journey';
import { Avatar, MockCard, type Tint } from './mock-card';

export type ReplyComposerProps = {
  to: string;
  /** What the agent can see about the customer while replying. */
  history: { label: string; value: string }[];
  draft: string;
  agent: { name: string; tint: Tint };
  /** Small note under the draft, e.g. where it came from. */
  note: string;
  sendLabel: string;
};

/** A reply drafted from the customer's order history, ready to send. */
export function ReplyComposerMock({
  to = draftedReply.to,
  history = draftedReply.history,
  draft = draftedReply.draft,
  agent = draftedReply.agent,
  note = draftedReply.note,
  sendLabel = draftedReply.sendLabel,
}: Partial<ReplyComposerProps>) {
  return (
    <MockCard>
      <div className="rounded-xl bg-surface p-3">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-xs">
          {history.map((item) => (
            <div key={item.label} className="contents">
              <dt className="text-muted-foreground">{item.label}</dt>
              <dd className="text-right font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">To {to}</p>
      <p className="mt-1.5 text-sm leading-relaxed">{draft}</p>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent-strong">
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3">
          <path
            d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4Z"
            fill="currentColor"
          />
        </svg>
        {note}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="flex items-center gap-2 text-xs font-medium">
          <Avatar
            name={agent.name}
            tint={agent.tint}
            className="size-6 text-[10px]"
          />
          {agent.name}
        </span>
        <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white">
          {sendLabel}
        </span>
      </div>
    </MockCard>
  );
}
