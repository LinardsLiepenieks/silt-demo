import { useState } from 'react';
import { BrandMark, BrandWordmark } from '../components/brand-logo';
import { ConversationList } from '../components/conversation-list';
import { ConversationPanel } from '../components/conversation-panel';
import { InboxViews } from '../components/inbox-views';
import { UserMenu } from '../components/user-menu';
import {
  conversations as initialConversations,
  inboxCopy,
  type Conversation,
  type InboxView,
} from '../content/inbox';
import { routes, useRouter } from '../lib/router';
import { currentUser, demoUser, signOut } from '../lib/session';

const inView: Record<InboxView, (item: Conversation) => boolean> = {
  inbox: (item) => !item.resolved,
  mine: (item) => !item.resolved && item.assignee === 'me',
  unassigned: (item) => !item.resolved && item.assignee === null,
  resolved: (item) => item.resolved,
};

const now = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/**
 * The signed-in app: views on the left, the conversation list, and the open
 * conversation. Narrow screens show the list or the conversation, not both.
 */
export function Inbox() {
  const { navigate } = useRouter();
  const user = currentUser() ?? demoUser;
  const [items, setItems] = useState(initialConversations);
  const [view, setView] = useState<InboxView>('inbox');
  const [selectedId, setSelectedId] = useState<string | null>(
    initialConversations[0].id,
  );
  const [reading, setReading] = useState(false);

  const counts = Object.fromEntries(
    inboxCopy.views.map(({ id }) => [id, items.filter(inView[id]).length]),
  ) as Record<InboxView, number>;
  const visible = items.filter(inView[view]);
  const selected = items.find((item) => item.id === selectedId);
  const activeLabel = inboxCopy.views.find((item) => item.id === view)?.label;

  const change = (
    id: string,
    patch: (item: Conversation) => Partial<Conversation>,
  ) =>
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...patch(item) } : item,
      ),
    );

  const select = (id: string) => {
    setSelectedId(id);
    setReading(true);
    change(id, () => ({ unread: false }));
  };

  const selectView = (next: InboxView) => {
    setView(next);
    setReading(false);
    setSelectedId(items.find(inView[next])?.id ?? null);
  };

  const leave = () => {
    signOut();
    navigate(routes.landing);
  };

  return (
    <div className="flex h-dvh flex-col bg-background lg:flex-row">
      {/* Sidebar on wide screens; a top bar with view tabs on narrow ones. */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface p-3 lg:flex">
        <div className="px-2 pt-1 pb-5">
          <BrandWordmark />
        </div>
        <InboxViews counts={counts} active={view} onSelect={selectView} />
        <div className="mt-auto">
          <UserMenu user={user} onSignOut={leave} />
        </div>
      </aside>
      <div
        className={`flex flex-col gap-3 border-b border-border bg-surface px-4 pt-3 pb-2.5 lg:hidden ${reading ? 'hidden' : ''}`}
      >
        <div className="flex items-center justify-between">
          <BrandMark className="size-8" />
          <UserMenu user={user} onSignOut={leave} placement="down" compact />
        </div>
        <InboxViews
          counts={counts}
          active={view}
          onSelect={selectView}
          layout="horizontal"
        />
      </div>

      <section
        aria-label={activeLabel}
        className={`min-h-0 flex-1 overflow-y-auto border-border lg:w-[360px] lg:flex-none lg:border-r ${reading ? 'hidden lg:block' : ''}`}
      >
        <h1 className="hidden px-5 pt-5 pb-1 font-display text-xl font-bold tracking-[-0.03em] text-foreground lg:block">
          {activeLabel}
        </h1>
        <ConversationList
          conversations={visible}
          selectedId={selectedId}
          onSelect={select}
          label={activeLabel}
        />
      </section>

      <main
        className={`min-h-0 min-w-0 flex-1 ${reading ? 'flex' : 'hidden lg:flex'} flex-col`}
      >
        {selected ? (
          <ConversationPanel
            key={selected.id}
            conversation={selected}
            onBack={() => setReading(false)}
            onToggleResolved={() =>
              change(selected.id, (item) => ({ resolved: !item.resolved }))
            }
            onReply={(text) =>
              change(selected.id, (item) => ({
                messages: [
                  ...item.messages,
                  { from: 'agent', author: 'You', text, time: now() },
                ],
                assignee: item.assignee ?? 'me',
                sla: { label: 'Replied', tone: 'done' },
              }))
            }
          />
        ) : (
          <p className="m-auto text-sm text-muted-foreground">
            {inboxCopy.noSelection}
          </p>
        )}
      </main>
    </div>
  );
}
