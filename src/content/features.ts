import type { FeatureCardProps } from '../components/feature-cards';

export const featuresHeading = {
  eyebrow: 'Everything your team needs',
  title: 'One place for every conversation',
};

export const featureCards: FeatureCardProps[] = [
  { title: 'Shared inbox', href: '#inbox', vignette: 'inbox' },
  { title: 'Live chat', href: '#chat', vignette: 'chat' },
  { title: 'Help center', href: '#help-center', vignette: 'help' },
  { title: 'Automations', href: '#automations', vignette: 'automations' },
  { title: 'Reports', href: '#reports', vignette: 'reports' },
  { title: 'Surveys', href: '#surveys', vignette: 'surveys' },
];
