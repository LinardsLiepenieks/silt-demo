import type { Tint } from '../components/mock-card';
import { demoPassword, demoUser } from '../lib/session';

export const signInCopy = {
  title: 'Welcome back',
  text: 'Sign in to pick up where your team left off.',
  email: 'Email',
  password: 'Password',
  remember: 'Remember me',
  forgot: 'Forgot password?',
  resetSent: (email: string) =>
    email
      ? `We sent a reset link to ${email}.`
      : 'Enter your email above and we’ll send you a reset link.',
  submit: 'Sign in',
  google: 'Continue with Google',
  divider: 'or',
  mismatch: 'That email and password don’t match.',
  switchPrompt: 'New to Halcyon?',
  switchLink: 'Create an account',
  demo: `Demo: ${demoUser.email} / ${demoPassword}`,
};

export const signUpCopy = {
  title: 'Start your free trial',
  text: '14 days, every feature, no card needed.',
  name: 'Full name',
  email: 'Work email',
  password: 'Password',
  terms: 'I agree to the Terms and Privacy Policy',
  submit: 'Create account',
  switchPrompt: 'Already have an account?',
  switchLink: 'Sign in',
  strength: ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'],
};

export const authErrors = {
  nameRequired: 'Enter your name',
  emailRequired: 'Enter your email',
  emailInvalid: 'Enter a valid email, like you@company.com',
  passwordRequired: 'Enter your password',
  passwordShort: 'Use at least 8 characters',
  passwordWeak: 'Add a number, a symbol or mixed case',
  termsRequired: 'Accept the terms to continue',
};

export const signInAside = {
  quote:
    'Our replies used to start with “Could you send your order number?” Now they start with the answer.',
  author: {
    name: 'Lena Brandt',
    role: 'Support lead, Fernway',
    tint: 'sky' as Tint,
  },
};

export const signUpAside = {
  title: 'Set up in an afternoon',
  points: [
    'Connect email and chat in a few clicks',
    'Invite your team, no per-seat surprises',
    'Hal drafts replies from day one',
  ],
};
