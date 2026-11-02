import type { InboxConversation } from '../components/inbox-mock';

export type InboxView = 'inbox' | 'mine' | 'unassigned' | 'resolved';

export type Message = {
  from: 'customer' | 'agent';
  author: string;
  text: string;
  time: string;
};

export type Conversation = InboxConversation & {
  id: string;
  email: string;
  assignee: 'me' | 'teammate' | null;
  resolved: boolean;
  messages: Message[];
};

export const inboxCopy = {
  views: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'mine', label: 'Mine' },
    { id: 'unassigned', label: 'Unassigned' },
    { id: 'resolved', label: 'Resolved' },
  ] as { id: InboxView; label: string }[],
  viewsLabel: 'Views',
  empty: 'Nothing here. Nice work.',
  noSelection: 'Pick a conversation to read it.',
  back: 'All conversations',
  resolve: 'Resolve',
  reopen: 'Reopen',
  replyLabel: (name: string) => `Reply to ${name}`,
  replyPlaceholder: 'Write a reply…',
  send: 'Send',
  signOut: 'Sign out',
  accountMenu: 'Account menu',
  assigned: { me: 'You', teammate: 'Sam Patel', none: 'Unassigned' },
};

export const conversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Maya Ortiz',
    initials: 'MO',
    tint: 'rose',
    email: 'maya.ortiz@example.com',
    channel: 'Email',
    subject: 'Order arrived with a cracked lid',
    time: '2m',
    unread: true,
    sla: { label: '12m left', tone: 'warn' },
    assignee: 'me',
    resolved: false,
    messages: [
      {
        from: 'customer',
        author: 'Maya Ortiz',
        text: 'Hi! My order #4821 arrived today but the lid on the large jar is cracked. Could you help?',
        time: '10:42',
      },
    ],
  },
  {
    id: 'c2',
    name: 'Jonas Berg',
    initials: 'JB',
    tint: 'sky',
    email: 'jonas@example.com',
    channel: 'Chat',
    subject: 'Can I change my delivery day?',
    time: '6m',
    unread: true,
    sla: { label: '45m left', tone: 'ok' },
    assignee: null,
    resolved: false,
    messages: [
      {
        from: 'customer',
        author: 'Jonas Berg',
        text: 'I won’t be home on Friday. Can my delivery come on Saturday instead?',
        time: '10:38',
      },
    ],
  },
  {
    id: 'c3',
    name: 'Tom Ellery',
    initials: 'TE',
    tint: 'sand',
    email: 'tom@ellery.example.com',
    channel: 'Email',
    subject: 'Invoice for March is missing VAT',
    time: '1h',
    unread: false,
    sla: { label: '2h left', tone: 'ok' },
    assignee: 'me',
    resolved: false,
    messages: [
      {
        from: 'customer',
        author: 'Tom Ellery',
        text: 'Our accountant noticed the March invoice doesn’t show VAT. Could you send a corrected copy?',
        time: '09:51',
      },
      {
        from: 'agent',
        author: 'You',
        text: 'Thanks Tom, I’ve asked our billing team for a corrected invoice. I’ll send it over today.',
        time: '09:58',
      },
    ],
  },
  {
    id: 'c4',
    name: 'Aiko Tanaka',
    initials: 'AT',
    tint: 'lilac',
    email: 'aiko@example.com',
    channel: 'Instagram',
    subject: 'Is the blue glaze back in stock?',
    time: '1h',
    unread: false,
    sla: { label: '3h left', tone: 'ok' },
    assignee: null,
    resolved: false,
    messages: [
      {
        from: 'customer',
        author: 'Aiko Tanaka',
        text: 'Love the new mugs! Any idea when the blue glaze is back?',
        time: '09:40',
      },
    ],
  },
  {
    id: 'c5',
    name: 'Daniel Okafor',
    initials: 'DO',
    tint: 'mint',
    email: 'daniel.okafor@example.com',
    channel: 'Phone',
    subject: 'Voicemail: wholesale pricing',
    time: '2h',
    unread: false,
    sla: { label: '4h left', tone: 'ok' },
    assignee: 'teammate',
    resolved: false,
    messages: [
      {
        from: 'customer',
        author: 'Daniel Okafor',
        text: 'Voicemail, 0:48. Runs two cafés in Leeds and would like wholesale pricing for 40 cups a month.',
        time: '08:55',
      },
    ],
  },
  {
    id: 'c6',
    name: 'Priya Nair',
    initials: 'PN',
    tint: 'lilac',
    email: 'priya@example.com',
    channel: 'WhatsApp',
    subject: 'Thanks, the refund came through',
    time: '18m',
    unread: false,
    sla: { label: 'Replied', tone: 'done' },
    assignee: 'me',
    resolved: true,
    messages: [
      {
        from: 'agent',
        author: 'You',
        text: 'Your refund is on its way, it should show in 2–3 days.',
        time: 'Yesterday',
      },
      {
        from: 'customer',
        author: 'Priya Nair',
        text: 'Thanks, the refund came through. Lovely service as always.',
        time: '10:26',
      },
    ],
  },
  {
    id: 'c7',
    name: 'Hugo Lindqvist',
    initials: 'HL',
    tint: 'sky',
    email: 'hugo@example.com',
    channel: 'Email',
    subject: 'Gift wrapping for a corporate order',
    time: 'Mon',
    unread: false,
    sla: { label: 'Replied', tone: 'done' },
    assignee: 'teammate',
    resolved: true,
    messages: [
      {
        from: 'customer',
        author: 'Hugo Lindqvist',
        text: 'Can you gift wrap 25 sets with a printed card?',
        time: 'Mon',
      },
      {
        from: 'agent',
        author: 'Sam Patel',
        text: 'We can. I’ve added wrapping and cards to the order at no extra cost.',
        time: 'Mon',
      },
    ],
  },
];
