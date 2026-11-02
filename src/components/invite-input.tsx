import { useId, type KeyboardEvent } from 'react';
import { teamStep as copy } from '../content/onboarding';
import type { Invite, Role } from '../lib/session';
import { isEmail } from '../lib/validation';
import { ChevronDownIcon } from './chevron-down-icon';
import { FieldError, fieldBorder } from './text-field';

/**
 * Adds every comma- or space-separated address in `raw` to `invites`.
 * Stops at the first invalid or duplicate one and returns it as `rest`.
 */
export function addInvites(invites: Invite[], raw: string) {
  const list = [...invites];
  const parts = raw.split(/[,\s]+/).filter(Boolean);
  for (let index = 0; index < parts.length; index++) {
    const email = parts[index].toLowerCase();
    const error = !isEmail(email)
      ? copy.errors.invalid
      : list.some((invite) => invite.email === email)
        ? copy.errors.duplicate
        : '';
    if (error)
      return { invites: list, rest: parts.slice(index).join(', '), error };
    list.push({ email, role: 'Agent' });
  }
  return { invites: list, rest: '', error: '' };
}

const sampleInvites: Invite[] = [
  { email: 'sam@cartacoffee.com', role: 'Admin' },
  { email: 'noor@cartacoffee.com', role: 'Agent' },
];

/** Email chips with a role each, fed by a text input. */
export function InviteInput({
  invites = sampleInvites,
  onInvitesChange,
  draft = '',
  onDraftChange,
  error,
  onErrorChange,
}: {
  invites?: Invite[];
  onInvitesChange?: (invites: Invite[]) => void;
  draft?: string;
  onDraftChange?: (draft: string) => void;
  error?: string;
  onErrorChange?: (error: string) => void;
}) {
  const id = useId();

  const commit = (raw: string) => {
    const result = addInvites(invites, raw);
    onInvitesChange?.(result.invites);
    onDraftChange?.(result.rest);
    onErrorChange?.(result.error);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      // Enter adds a chip here rather than submitting the step.
      event.preventDefault();
      if (draft.trim()) commit(draft);
    } else if (event.key === 'Backspace' && !draft && invites.length) {
      onInvitesChange?.(invites.slice(0, -1));
    }
  };

  const setRole = (email: string, role: Role) =>
    onInvitesChange?.(
      invites.map((invite) =>
        invite.email === email ? { ...invite, role } : invite,
      ),
    );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {copy.invite}
        </label>
        <div
          className={`flex h-11 items-center rounded-xl border bg-white transition-[border-color,box-shadow] focus-within:ring-[3px] ${fieldBorder(Boolean(error))}`}
        >
          <input
            id={id}
            type="email"
            autoComplete="off"
            placeholder={copy.invitePlaceholder}
            value={draft}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={`${id}-message`}
            onChange={(event) => {
              const value = event.target.value;
              onErrorChange?.('');
              // Pasting a list adds everything up to the last comma.
              if (value.includes(',')) commit(value);
              else onDraftChange?.(value);
            }}
            onKeyDown={onKeyDown}
            className="h-full min-w-0 flex-1 rounded-xl bg-transparent px-3.5 text-[15px] outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        {error ? (
          <FieldError id={`${id}-message`}>{error}</FieldError>
        ) : (
          <p id={`${id}-message`} className="text-[13px] text-muted-foreground">
            {copy.inviteHint}
          </p>
        )}
      </div>
      {invites.length > 0 && (
        <ul aria-label="Invited" className="flex flex-wrap gap-2">
          {invites.map((invite) => (
            <li
              key={invite.email}
              className="flex max-w-full items-center gap-1 rounded-full border border-border bg-surface py-1 pr-1 pl-3 text-sm"
            >
              <span className="min-w-0 truncate font-medium text-foreground">
                {invite.email}
              </span>
              <span className="relative ml-1 flex items-center">
                <select
                  aria-label={copy.roleLabel(invite.email)}
                  value={invite.role}
                  onChange={(event) =>
                    setRole(invite.email, event.target.value as Role)
                  }
                  className="h-7 cursor-pointer appearance-none rounded-full bg-white pr-6 pl-2.5 text-xs font-semibold text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30"
                >
                  {copy.roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-1.5 size-3.5 text-muted-foreground" />
              </span>
              <button
                type="button"
                aria-label={copy.remove(invite.email)}
                onClick={() =>
                  onInvitesChange?.(
                    invites.filter((item) => item.email !== invite.email),
                  )
                }
                className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-white hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-accent/30"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-3.5"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.2"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
