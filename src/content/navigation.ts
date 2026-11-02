export const siteUrl = '#';

export type NavMenuItem = {
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
};

export type NavEntry =
  | { kind: 'link'; label: string; href: string }
  | {
      kind: 'menu';
      label: string;
      items: NavMenuItem[];
      listClassName: string;
    };

const productItems: NavMenuItem[] = [
  {
    title: 'Shared inbox',
    description: 'Email, chat and social in one queue your team shares.',
    href: '#shared-inbox',
  },
  {
    title: 'Live chat',
    description: 'Talk to customers on your site while they browse.',
    href: '#live-chat',
  },
  {
    title: 'Help center',
    description: 'Answers customers can find without writing in.',
    href: '#help-center',
  },
  {
    title: 'Automations',
    description: 'Route, tag and follow up without the busywork.',
    href: '#automations',
  },
  {
    title: 'Reports',
    description: 'Response times, volume and trends at a glance.',
    href: '#reports',
  },
  {
    title: 'Surveys',
    description: 'Ask how it went right after every conversation.',
    href: '#surveys',
  },
];

const resourceItems: NavMenuItem[] = [
  {
    title: 'Guides',
    description: 'Practical playbooks for small support teams.',
    href: '#guides',
  },
  {
    title: 'Integrations',
    description: 'Connect the tools your team already uses.',
    href: '#integrations',
  },
  {
    title: 'Docs',
    description: 'Set up, configure and build on Tidewell.',
    href: 'https://example.com/docs',
    isExternal: true,
  },
  {
    title: 'Blog',
    description: 'Notes on support, product and craft.',
    href: '#blog',
  },
];

const companyItems: NavMenuItem[] = [
  {
    title: 'About',
    description: 'Who we are and why we build Tidewell.',
    href: '#about',
  },
  {
    title: 'Careers',
    description: 'Join a small, remote team.',
    href: '#careers',
  },
  {
    title: 'Contact',
    description: 'Talk to a person, not a form.',
    href: '#contact',
  },
];

export const navEntries: NavEntry[] = [
  {
    kind: 'menu',
    label: 'Product',
    items: productItems,
    listClassName: 'grid w-[520px] grid-cols-2 gap-1',
  },
  { kind: 'link', label: 'Pricing', href: '#pricing' },
  { kind: 'link', label: 'Customers', href: '#customers' },
  {
    kind: 'menu',
    label: 'Resources',
    items: resourceItems,
    listClassName: 'grid w-[300px] gap-1',
  },
  {
    kind: 'menu',
    label: 'Company',
    items: companyItems,
    listClassName: 'grid w-[280px] gap-1',
  },
];

export const headerCtas = {
  signIn: { label: 'Sign in', href: 'https://example.com/sign-in' },
  trial: { label: 'Start free trial', href: 'https://example.com/start' },
};
