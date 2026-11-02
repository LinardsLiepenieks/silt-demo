import type { Tint } from '../components/mock-card';

export const testimonialsHeading = {
  eyebrow: 'In their words',
  title: 'Support leads on their first month',
  text: 'Pick a card up and move it around.',
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  tint: Tint;
  /** Where the card lands in the desktop pile: px from the pile's centre and top. */
  x: number;
  y: number;
  /** Rotation in degrees. */
  rotate: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'We stopped asking customers for their order number. Halcyon already has it open next to the reply.',
    name: 'Priya Nair',
    role: 'Head of Support, Carta Coffee',
    tint: 'sand',
    x: -630,
    y: 40,
    rotate: -6,
  },
  {
    quote:
      "Hal's drafts sound like our team on a good day. I edit a word or two and send.",
    name: 'Jonas Berg',
    role: 'Support Lead, Northfield',
    tint: 'mint',
    x: -320,
    y: 0,
    rotate: 3,
  },
  {
    quote:
      'Monday mornings used to be a wall of tickets. Now the weekend queue is sorted by the time we log in.',
    name: 'Amara Okafor',
    role: 'Customer Care Manager, Pinecrest',
    tint: 'sky',
    x: 0,
    y: 30,
    rotate: -2,
  },
  {
    quote:
      'Our help center writes its own to-do list. The articles it suggests are the questions we keep answering.',
    name: 'Leo Martins',
    role: 'Support Ops, Mosaic Labs',
    tint: 'lilac',
    x: 310,
    y: -10,
    rotate: 5,
  },
  {
    quote:
      'New hires answer real customers in their first week, because every conversation shows what we did last time.',
    name: 'Sofia Reyes',
    role: 'Team Lead, Fernway',
    tint: 'rose',
    x: -490,
    y: 300,
    rotate: 4,
  },
  {
    quote:
      'Five of us look after twenty thousand customers, and it finally feels calm.',
    name: 'Tom Ellery',
    role: 'Founder, Quanta Bikes',
    tint: 'accent',
    x: -160,
    y: 330,
    rotate: -4,
  },
  {
    quote:
      'Shift handovers are one click. Whoever picks it up sees the whole story.',
    name: 'Hana Sato',
    role: 'Support Manager, Halden & Co',
    tint: 'sand',
    x: 170,
    y: 300,
    rotate: 2,
  },
];
