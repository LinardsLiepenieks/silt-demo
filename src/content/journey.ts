import type { ChatWidgetProps } from '../components/chat-mock';
import type { JourneySlide } from '../components/customer-journey';
import type { WeeklyInsightProps } from '../components/weekly-insight-mock';
import type { ReplyComposerProps } from '../components/reply-composer-mock';
import type { SurveyProps } from '../components/survey-mock';
import type { TicketProps } from '../components/ticket-mock';

export const journeyHeading = {
  eyebrow: 'How it works',
  title: ['See Halcyon at work.', "One customer's question, start to finish."],
  text: 'Maya just moved and needs her coffee order sent to the new address. Here is what happens next.',
};

// How long each slide stays before the next one fades in.
export const journeyIntervalMs = 10000;

export const chatWidget: ChatWidgetProps = {
  title: 'Fernway Coffee support',
  status: 'Typically replies in 2 minutes',
  messages: [
    {
      author: 'Hal',
      time: '9:41',
      text: 'Hi Maya, welcome back. How can we help today?',
      fromAssistant: true,
    },
    {
      author: 'Maya',
      time: '9:42',
      text: 'I just moved. Can I change the address on order #4821 before it ships?',
      fromCustomer: true,
    },
  ],
  placeholder: 'Write a message…',
};

export const routedTicket: TicketProps = {
  id: '#4821',
  subject: 'Change delivery address before shipping',
  customer: {
    name: 'Maya Lindqvist',
    detail: 'Live chat · 6 orders since 2024',
    tint: 'rose',
  },
  tags: [
    { label: 'Shipping', tint: 'sky' },
    { label: 'Address change', tint: 'sand' },
    { label: 'Returning customer', tint: 'lilac' },
  ],
  priority: 'High · ships today',
  assignee: { name: 'Jonas Berg', team: 'Orders', tint: 'sky' },
  reason: 'Sent to Orders: it ships in 3 hours',
};

export const draftedReply: ReplyComposerProps = {
  to: 'Maya Lindqvist',
  history: [
    { label: 'Order', value: '#4821 · 2 bags, monthly' },
    { label: 'Status', value: 'Packing, ships 13:00' },
    { label: 'Last contact', value: 'Gift note, 3 weeks ago' },
  ],
  draft:
    "Hi Maya, done. Order #4821 now goes to your new place on Linden Street, and it still ships today. I've moved your monthly plan over too, so next month's bags find you too.",
  agent: { name: 'Jonas Berg', tint: 'sky' },
  note: 'Drafted from 6 past orders',
  sendLabel: 'Send reply',
};

export const satisfactionSurvey: SurveyProps = {
  question: 'How did we do with your question today?',
  scale: ['Not great', 'Really helpful'],
  rating: 5,
  comment:
    'Sorted in four minutes, and he moved my subscription without me asking.',
  customer: { name: 'Maya Lindqvist', tint: 'rose' },
};

export const weeklyInsight: WeeklyInsightProps = {
  period: 'Weekly insight · Sep 1 – 7',
  topic: 'Changing a delivery address',
  count: '38 asks',
  trend: '+12 on last week',
  daily: [3, 4, 5, 4, 6, 7, 9],
  suggestion: {
    label: 'Suggested help article',
    title: 'How to change your delivery address before an order ships',
    action: 'Draft article',
  },
};

export const journeySlides: JourneySlide[] = [
  {
    step: 'Asks',
    eyebrow: '9:42 am',
    title: 'Maya asks from the chat on your site',
    text: 'The chat widget knows who she is and what she ordered, so she never has to repeat herself or dig out an order number.',
    tint: 'mint',
    mock: { kind: 'chat', ...chatWidget },
  },
  {
    step: 'Routes',
    eyebrow: '9:42 am',
    title: 'It lands with the right person',
    text: 'Hal tags the question, sees the order ships today and sends it to Orders with high priority. Nobody has to triage by hand.',
    tint: 'sky',
    mock: { kind: 'ticket', ...routedTicket },
  },
  {
    step: 'Replies',
    eyebrow: '9:45 am',
    title: 'A reply that already knows her',
    text: "Jonas sees Maya's order history beside the draft. He checks it, adds a line about her subscription and sends.",
    tint: 'sand',
    mock: { kind: 'reply', ...draftedReply },
  },
  {
    step: 'Follows up',
    eyebrow: '9:46 am',
    title: 'Maya tells you how it went',
    text: 'A one-tap survey follows every solved conversation. Scores and comments go straight into your reports.',
    tint: 'rose',
    mock: { kind: 'survey', ...satisfactionSurvey },
  },
  {
    step: 'Learns',
    eyebrow: 'Monday',
    title: 'Next time, the answer is already there',
    text: 'Halcyon spots that 38 people asked the same thing this week and suggests a help article, so the next Maya finds the answer herself.',
    tint: 'lilac',
    mock: { kind: 'insight', ...weeklyInsight },
  },
];
