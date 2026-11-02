import {
  conversations as sampleConversations,
  inboxCopy,
  type Conversation,
} from '../content/inbox';
import { slaStyles } from './inbox-mock';
import { Avatar } from './mock-card';

/** Conversation rows; clicking one selects it. */
export function ConversationList({
  conversations = sampleConversations,
  selectedId = sampleConversations[0]?.id,
  onSelect,
  label = 'Conversations',
}: {
  conversations?: Conversation[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  label?: string;
}) {
  if (!conversations.length)
    return (
      <p className="px-4 py-16 text-center text-sm text-muted-foreground">
        {inboxCopy.empty}
      </p>
    );
  return (
    <ul aria-label={label} className="flex flex-col gap-0.5 p-2">
      {conversations.map((item) => {
        const selected = item.id === selectedId;
        return (
          <li key={item.id}>
            <button
              type="button"
              aria-current={selected ? 'true' : undefined}
              onClick={() => onSelect?.(item.id)}
              className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30 ${
                selected ? 'bg-accent-soft/70' : 'hover:bg-surface'
              }`}
            >
              <Avatar
                name={item.name}
                initials={item.initials}
                tint={item.tint}
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span
                    className={`truncate text-sm text-foreground ${item.unread ? 'font-bold' : 'font-semibold'}`}
                  >
                    {item.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {item.channel}
                  </span>
                  <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                    {item.time}
                  </span>
                </span>
                <span className="mt-0.5 flex items-center gap-2">
                  <span
                    className={`min-w-0 flex-1 truncate text-[13px] ${item.unread ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    {item.subject}
                  </span>
                  {item.unread && (
                    <span
                      aria-label="Unread"
                      className="size-2 shrink-0 rounded-full bg-accent"
                    />
                  )}
                </span>
                <span
                  className={`mt-1.5 inline-block rounded-md px-1.5 py-0.5 text-[11px] font-medium ${
                    slaStyles[item.resolved ? 'done' : item.sla.tone]
                  }`}
                >
                  {item.resolved ? 'Resolved' : item.sla.label}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
