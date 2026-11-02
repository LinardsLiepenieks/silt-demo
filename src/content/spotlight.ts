import type { Tint } from '../components/mock-card';

export type SpotlightMetric = {
  label: string;
  before: string;
  after: string;
  /** Bar lengths from 0 to 1 for each period. */
  bars: { before: number; after: number };
  /** Shown beside the value once the after period is picked. */
  change?: string;
};

export const spotlight = {
  title: 'Built for teams who answer every message',
  quote:
    'We used to answer fast or answer well. Now the reply already knows the customer, so we get to do both.',
  author: {
    name: 'Priya Nair',
    role: 'Head of Support, Carta Coffee',
    tint: 'sand' as Tint,
  },
  caseStudy: {
    company: 'Carta Coffee',
    periods: { before: 'Before', after: 'With Halcyon' },
    metrics: [
      {
        label: 'First response time',
        before: '2h 50m',
        after: '1h 40m',
        change: '−41%',
        bars: { before: 1, after: 0.59 },
      },
      {
        label: 'Customer satisfaction',
        before: '4.1',
        after: '4.8',
        change: '+0.7',
        bars: { before: 0.82, after: 0.96 },
      },
      {
        label: 'Solved by the help center',
        before: '9%',
        after: '26%',
        change: '×3',
        bars: { before: 0.09, after: 0.26 },
      },
    ] satisfies SpotlightMetric[],
    footnote: '2,300 tickets a month · 5 agents',
    cta: {
      label: 'Read the story',
      href: 'https://example.com/stories/carta-coffee',
    },
  },
};
