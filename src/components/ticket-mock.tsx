import type { ReactNode } from 'react';
import { routedTicket } from '../content/journey';
import { Avatar, MockCard, type Tint } from './mock-card';

export type TicketProps = {
  id: string;
  subject: string;
  customer: { name: string; detail: string; tint: Tint };
  tags: { label: string; tint: Tint }[];
  priority: string;
  assignee: { name: string; team: string; tint: Tint };
  /** Why the ticket went where it did. */
  reason: string;
};

const tagTints: Record<Tint, string> = {
  mint: 'bg-tint-mint',
  sand: 'bg-tint-sand',
  sky: 'bg-tint-sky',
  rose: 'bg-tint-rose',
  lilac: 'bg-tint-lilac',
  accent: 'bg-accent-soft',
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

/** An inbox ticket after it has been tagged, prioritised and assigned. */
export function TicketMock({
  id = routedTicket.id,
  subject = routedTicket.subject,
  customer = routedTicket.customer,
  tags = routedTicket.tags,
  priority = routedTicket.priority,
  assignee = routedTicket.assignee,
  reason = routedTicket.reason,
}: Partial<TicketProps>) {
  return (
    <MockCard>
      <div className="flex items-start gap-3">
        <Avatar
          name={customer.name}
          tint={customer.tint}
          className="size-9 text-xs"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">
            {id} · {customer.name}
          </p>
          <p className="mt-0.5 text-sm leading-snug font-semibold">{subject}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {customer.detail}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag.label}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tagTints[tag.tint]}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
      <div className="mt-4 divide-y divide-border border-y border-border">
        <Field label="Priority">
          <span className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="size-2 rounded-full bg-[#d98a2b]" />
            {priority}
          </span>
        </Field>
        <Field label="Assignee">
          <span className="flex items-center gap-2 text-xs font-semibold">
            <Avatar
              name={assignee.name}
              tint={assignee.tint}
              className="size-6 text-[10px]"
            />
            {assignee.name}
            <span className="font-normal text-muted-foreground">
              {assignee.team}
            </span>
          </span>
        </Field>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-accent-strong">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="size-3.5 shrink-0"
        >
          <path
            d="M3 8h8M8 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {reason}
      </p>
    </MockCard>
  );
}
