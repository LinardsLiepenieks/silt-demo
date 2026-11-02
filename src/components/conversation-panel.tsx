import { useState, type FormEvent } from 'react';
import {
  conversations as sampleConversations,
  inboxCopy,
  type Conversation,
} from '../content/inbox';
import { Button } from './button';
import { Avatar } from './mock-card';

/** One conversation: header with Resolve, the thread and a reply box. */
export function ConversationPanel({
  conversation = sampleConversations[0],
  onReply,
  onToggleResolved,
  onBack,
}: {
  conversation?: Conversation;
  onReply?: (text: string) => void;
  onToggleResolved?: () => void;
  /** Shown on narrow screens to return to the list. */
  onBack?: () => void;
}) {
  const [draft, setDraft] = useState('');
  const { name, initials, tint, channel, email, subject, messages, resolved } =
    conversation;

  const send = (event?: FormEvent) => {
    event?.preventDefault();
    if (!draft.trim()) return;
    onReply?.(draft.trim());
    setDraft('');
  };

  return (
    <section aria-label={subject} className="flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-6">
        {onBack && (
          <button
            type="button"
            aria-label={inboxCopy.back}
            onClick={onBack}
            className="-ml-1.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-surface focus-visible:ring-[3px] focus-visible:ring-accent/30 lg:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        )}
        <Avatar
          name={name}
          initials={initials}
          tint={tint}
          className="size-10 text-sm"
        />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-base font-bold tracking-[-0.02em] text-foreground">
            {subject}
          </h2>
          <p className="truncate text-[13px] text-muted-foreground">
            {name} · {channel} · {email}
          </p>
        </div>
        <Button
          variant={resolved ? 'secondary' : 'primary'}
          className="h-9 px-3.5"
          onClick={onToggleResolved}
        >
          {resolved ? inboxCopy.reopen : inboxCopy.resolve}
        </Button>
      </header>
      <ol className="flex flex-1 flex-col gap-4 overflow-y-auto bg-surface/60 px-4 py-6 sm:px-6">
        {messages.map((message, index) => {
          const mine = message.from === 'agent';
          return (
            <li
              key={index}
              className={`flex max-w-[85%] flex-col gap-1 sm:max-w-[70%] ${mine ? 'items-end self-end' : 'items-start'}`}
            >
              <span className="text-[11px] text-muted-foreground">
                {message.author} · {message.time}
              </span>
              <p
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  mine
                    ? 'rounded-br-md bg-accent text-white'
                    : 'rounded-bl-md border border-border bg-white text-foreground'
                }`}
              >
                {message.text}
              </p>
            </li>
          );
        })}
      </ol>
      <form
        onSubmit={send}
        className="flex items-end gap-2 border-t border-border bg-white p-3 sm:p-4"
      >
        <label htmlFor={`reply-${conversation.id}`} className="sr-only">
          {inboxCopy.replyLabel(name)}
        </label>
        <textarea
          id={`reply-${conversation.id}`}
          rows={2}
          value={draft}
          placeholder={inboxCopy.replyPlaceholder}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            // Enter sends; Shift+Enter starts a new line.
            if (event.key === 'Enter' && !event.shiftKey) send(event);
          }}
          className="min-h-11 flex-1 resize-none rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-accent focus:ring-[3px] focus:ring-accent/20"
        />
        <Button type="submit" className="h-11" disabled={!draft.trim()}>
          {inboxCopy.send}
        </Button>
      </form>
    </section>
  );
}
