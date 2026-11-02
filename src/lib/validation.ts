export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export type PasswordCheck = { label: string; met: boolean };

/** The four checks behind the strength meter; the score is how many pass. */
export function passwordChecks(password: string): PasswordCheck[] {
  return [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'A number', met: /\d/.test(password) },
    {
      label: 'Upper and lower case',
      met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    { label: 'A symbol', met: /[^A-Za-z0-9]/.test(password) },
  ];
}

export const passwordScore = (password: string) =>
  passwordChecks(password).filter((check) => check.met).length;
