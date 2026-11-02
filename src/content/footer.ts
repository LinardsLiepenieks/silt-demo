export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const footerTagline = 'Customer support that remembers every customer.';

export const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Shared inbox', href: '#shared-inbox' },
      { label: 'Live chat', href: '#live-chat' },
      { label: 'Help center', href: '#help-center' },
      { label: 'Automations', href: '#automations' },
      { label: 'Reports', href: '#reports' },
      { label: 'Surveys', href: '#surveys' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Customers', href: '#customers' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Guides', href: '#guides' },
      { label: 'Blog', href: '#blog' },
      { label: 'Docs', href: 'https://example.com/docs' },
      { label: 'Status', href: 'https://example.com/status' },
    ],
  },
  {
    title: 'Integrations',
    links: [
      { label: 'Email', href: '#integrations-email' },
      { label: 'Slack', href: '#integrations-slack' },
      { label: 'Shopify', href: '#integrations-shopify' },
      { label: 'Stripe', href: '#integrations-stripe' },
      { label: 'All integrations', href: '#integrations' },
    ],
  },
];

export const socialLinks = {
  x: { label: 'Tidewell on X', href: 'https://example.com/x' },
  linkedIn: {
    label: 'Tidewell on LinkedIn',
    href: 'https://example.com/linkedin',
  },
  youTube: {
    label: 'Tidewell on YouTube',
    href: 'https://example.com/youtube',
  },
};

export const legalLinks: FooterLink[] = [
  { label: 'Terms', href: '#terms' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Cookies', href: '#cookies' },
];

export const copyright = '© 2026 Tidewell. A Silt demo.';
