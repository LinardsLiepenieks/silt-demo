import { chatWidget } from '../content/journey';
import { BrandMark } from './brand-logo';
import { Avatar, MockCard, type Tint } from './mock-card';

export type ChatMessage = {
  author: string;
  time: string;
  text: string;
  /** Customer messages sit on the right in the accent colour. */
  fromCustomer?: boolean;
  /** Sent by Hal, shown with the brand mark instead of initials. */
  fromAssistant?: boolean;
  tint?: Tint;
};

export type ChatWidgetProps = {
  title: string;
  status: string;
  messages: ChatMessage[];
  /** Placeholder in the message box. */
  placeholder: string;
};

/** The live chat widget on a store's site, mid-conversation. */
export function ChatMock({
  title = chatWidget.title,
  status = chatWidget.status,
  messages = chatWidget.messages,
  placeholder = chatWidget.placeholder,
}: Partial<ChatWidgetProps>) {
  return (
    <MockCard className="max-w-[380px] overflow-hidden p-0!">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <BrandMark className="size-7" />
        <div className="min-w-0">
          <p className="text-sm font-semibold">{title}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" />
            {status}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-surface/60 px-4 py-4">
        {messages.map((message) =>
          message.fromCustomer ? (
            <div key={message.time + message.text} className="flex justify-end">
              <div className="max-w-[80%]">
                <p className="rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-sm leading-snug text-white">
                  {message.text}
                </p>
                <p className="mt-1 text-right text-[11px] text-muted-foreground">
                  {message.author} · {message.time}
                </p>
              </div>
            </div>
          ) : (
            <div
              key={message.time + message.text}
              className="flex items-end gap-2"
            >
              {message.fromAssistant ? (
                <BrandMark className="size-7 shrink-0" />
              ) : (
                <Avatar
                  name={message.author}
                  tint={message.tint}
                  className="size-7 text-[11px]"
                />
              )}
              <div className="max-w-[80%]">
                <p className="rounded-2xl rounded-bl-md border border-border bg-white px-3.5 py-2.5 text-sm leading-snug">
                  {message.text}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {message.author} · {message.time}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <span className="flex-1 truncate text-sm text-muted-foreground">
          {placeholder}
        </span>
        <span
          aria-hidden="true"
          className="flex size-7 items-center justify-center rounded-full bg-accent text-white"
        >
          <svg viewBox="0 0 16 16" className="size-3.5">
            <path
              d="M8 13V3M3.5 7.5 8 3l4.5 4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </MockCard>
  );
}
