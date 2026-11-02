import type { TeamSize } from '../lib/session';

export const onboardingSteps = ['Workspace', 'Channels', 'Team'];

export const onboardingActions = {
  back: 'Back',
  next: 'Continue',
  skip: 'Skip for now',
  finish: 'Finish setup',
  stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
};

export const workspaceStep = {
  title: 'Name your workspace',
  text: 'This is where your team will answer customers.',
  company: 'Company name',
  companyPlaceholder: 'Carta Coffee',
  urlLabel: 'Your workspace:',
  urlPrefix: 'halcyon.app/',
  urlFallback: 'your-company',
  teamSize: 'Team size',
  teamSizes: ['1–5', '6–20', '21–50', '50+'] as TeamSize[],
  sells: 'What do you sell?',
  sellsPlaceholder: 'Choose one',
  sellsOptions: [
    'Physical products',
    'Software',
    'Services',
    'Subscriptions',
    'Something else',
  ],
  errors: {
    company: 'Enter your company name',
    teamSize: 'Choose your team size',
    sells: 'Choose what you sell',
  },
};

export type ChannelId = 'email' | 'chat' | 'whatsapp' | 'instagram' | 'phone';

export const channelsStep = {
  title: 'Where do customers reach you?',
  text: 'Pick every channel you answer today. You can add more later.',
  channels: [
    { id: 'email', label: 'Email', description: 'Your support inbox' },
    { id: 'chat', label: 'Live chat', description: 'A widget on your site' },
    { id: 'whatsapp', label: 'WhatsApp', description: 'Business number' },
    { id: 'instagram', label: 'Instagram', description: 'Direct messages' },
    { id: 'phone', label: 'Phone', description: 'Calls and voicemail' },
  ] as { id: ChannelId; label: string; description: string }[],
  supportEmail: 'Support address',
  supportEmailPlaceholder: 'support@yourcompany.com',
  errors: {
    none: 'Pick at least one channel to continue',
    supportEmail: 'Enter the address customers write to',
    supportEmailInvalid: 'Enter a valid email address',
  },
};

export const teamStep = {
  title: 'Invite your team',
  text: 'Add teammates by email. They’ll get an invite once you finish.',
  invite: 'Email addresses',
  invitePlaceholder: 'name@company.com',
  inviteHint: 'Press Enter or comma to add',
  roles: ['Agent', 'Admin'] as const,
  roleLabel: (email: string) => `Role for ${email}`,
  remove: (email: string) => `Remove ${email}`,
  copyLink: 'Copy invite link',
  copied: 'Copied',
  inviteLink: (slug: string) => `https://halcyon.app/join/${slug}`,
  errors: {
    invalid: 'That doesn’t look like an email address',
    duplicate: 'Already on the list',
  },
};

export const onboardingDone = {
  title: 'Your inbox is ready',
  text: 'Taking you there now…',
  action: 'Go to inbox',
};
