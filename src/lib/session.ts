import { useEffect, useState } from 'react';

// Front-end-only auth and onboarding state. Nothing leaves the browser.

export type User = { name: string; email: string };

export const demoUser: User = {
  name: 'Alex Morgan',
  email: 'demo@halcyon.app',
};
export const demoPassword = 'halcyon123';

const userKey = 'halcyon.user';
const onboardingKey = 'halcyon.onboarding';

// Storage can throw in private windows or sandboxed previews.
function read<T>(storage: Storage, key: string): T | null {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(storage: Storage, key: string, value: unknown) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep working in memory only.
  }
}

function remove(key: string) {
  try {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  } catch {
    // Nothing stored.
  }
}

export function currentUser(): User | null {
  return (
    read<User>(localStorage, userKey) ?? read<User>(sessionStorage, userKey)
  );
}

/** "Remember me" keeps the session in localStorage; otherwise it ends with the tab. */
export function signIn(user: User, remember = false) {
  remove(userKey);
  write(remember ? localStorage : sessionStorage, userKey, user);
}

export function signOut() {
  remove(userKey);
  remove(onboardingKey);
}

export function credentialsMatch(email: string, password: string) {
  return (
    email.trim().toLowerCase() === demoUser.email && password === demoPassword
  );
}

/** Resolves after `ms`, standing in for a network round trip. */
export const fakeRequest = (ms = 700) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export type TeamSize = '1–5' | '6–20' | '21–50' | '50+';
export type Role = 'Agent' | 'Admin';
export type Invite = { email: string; role: Role };

export type Onboarding = {
  company: string;
  teamSize: TeamSize | '';
  sells: string;
  channels: string[];
  supportEmail: string;
  invites: Invite[];
};

export const emptyOnboarding: Onboarding = {
  company: '',
  teamSize: '',
  sells: '',
  channels: [],
  supportEmail: '',
  invites: [],
};

/** A new account starts onboarding from a blank slate. */
export const resetOnboarding = () => remove(onboardingKey);

/** Onboarding answers, kept in sessionStorage so Back and reloads restore them. */
export function useOnboarding() {
  const [data, setData] = useState<Onboarding>(() => ({
    ...emptyOnboarding,
    ...read<Onboarding>(sessionStorage, onboardingKey),
  }));
  useEffect(() => write(sessionStorage, onboardingKey, data), [data]);
  const update = (patch: Partial<Onboarding>) =>
    setData((current) => ({ ...current, ...patch }));
  return [data, update] as const;
}

/** "Halden & Co." → "halden-co". */
export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);
}
