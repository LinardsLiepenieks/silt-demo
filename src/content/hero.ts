import type { CustomerProfileMockProps } from '../components/customer-profile-mock';
import type { InboxMockProps } from '../components/inbox-mock';
import type { InsightsMockProps } from '../components/insights-mock';
import type { ReplyDraftMockProps } from '../components/reply-draft-mock';

export const hero = {
  announcement: {
    badge: 'New',
    label: 'Tide drafts replies in your voice',
    href: '#tide',
  },
  // `accentWord` is coloured with the brand accent inside the headline.
  title: 'Customer support that remembers everyone.',
  accentWord: 'remembers',
  text: 'Every conversation, order and note in one place. Teams reply 40% faster and keep CSAT above 95%.',
  primaryCta: {
    label: 'Start free trial',
    href: 'https://example.com/signup',
  },
  secondaryCta: { label: 'Book a demo', href: 'https://example.com/demo' },
};

export const heroStepLabels = ['Inbox', 'Customer', 'Draft', 'Insights'];

export const heroIntervalMs = 5000;

export const heroInbox: InboxMockProps = {
  title: 'Inbox',
  filter: 'Open · 24',
  conversations: [
    {
      name: 'Maya Ortiz',
      initials: 'MO',
      tint: 'rose',
      channel: 'Email',
      subject: 'Order arrived with a cracked lid',
      time: '2m',
      unread: true,
      sla: { label: '12m left', tone: 'warn' },
    },
    {
      name: 'Jonas Berg',
      initials: 'JB',
      tint: 'sky',
      channel: 'Chat',
      subject: 'Can I change my delivery day?',
      time: '6m',
      unread: true,
      sla: { label: '45m left', tone: 'ok' },
    },
    {
      name: 'Priya Nair',
      initials: 'PN',
      tint: 'lilac',
      channel: 'WhatsApp',
      subject: 'Thanks, the refund came through',
      time: '18m',
      unread: false,
      sla: { label: 'Replied', tone: 'done' },
    },
    {
      name: 'Tom Ellery',
      initials: 'TE',
      tint: 'sand',
      channel: 'Email',
      subject: 'Invoice for March is missing VAT',
      time: '1h',
      unread: false,
      sla: { label: '2h left', tone: 'ok' },
    },
  ],
};

export const heroCustomer: CustomerProfileMockProps = {
  name: 'Maya Ortiz',
  initials: 'MO',
  tint: 'rose',
  detail: 'Customer since 2023 · Lisbon',
  stats: [
    { label: 'Orders', value: '14' },
    { label: 'Spent', value: '€1,280' },
    { label: 'CSAT', value: '5.0' },
  ],
  timeline: [
    {
      date: 'Today',
      text: 'Reported a cracked lid on order #4821',
      kind: 'conversation',
    },
    { date: 'Mar 2', text: 'Ordered the large ceramic set', kind: 'order' },
    {
      date: 'Jan 18',
      text: 'Asked about gift wrapping, solved in 4m',
      kind: 'conversation',
    },
    { date: 'Dec 9', text: 'Ordered two travel mugs', kind: 'order' },
  ],
};

export const heroDraft: ReplyDraftMockProps = {
  to: 'Maya Ortiz',
  label: 'Drafted by Tide',
  body: "Hi Maya, I'm sorry the lid arrived cracked. I've sent a replacement for order #4821 with express shipping, so it should be with you by Thursday. No need to return the old one.",
  sources: ['Order #4821', 'Replacement policy', 'Past tone with Maya'],
  actions: { primary: 'Send', secondary: 'Edit' },
};

export const heroInsights: InsightsMockProps = {
  title: 'This week',
  metric: { label: 'Median first reply', value: '4m 12s', change: '−38%' },
  bars: [
    { day: 'Mon', value: 62 },
    { day: 'Tue', value: 78 },
    { day: 'Wed', value: 54 },
    { day: 'Thu', value: 88 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 32 },
    { day: 'Sun', value: 24 },
  ],
  csat: { label: 'CSAT', value: '96%', note: '412 ratings' },
};
