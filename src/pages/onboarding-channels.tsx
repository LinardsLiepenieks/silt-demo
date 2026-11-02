import { useRef } from 'react';
import { ChannelCard } from '../components/channel-card';
import { OnboardingShell } from '../components/onboarding-shell';
import { FieldError, TextField } from '../components/text-field';
import { channelsStep as copy } from '../content/onboarding';
import { routes, useRouter } from '../lib/router';
import { slugify, useOnboarding } from '../lib/session';
import { useFieldErrors } from '../lib/use-field-errors';
import { isEmail } from '../lib/validation';

/** Step 2: the channels customers write in on; Email asks for its address. */
export function OnboardingChannels() {
  const { navigate } = useRouter();
  const [data, update] = useOnboarding();
  const form = useRef<HTMLFormElement>(null);
  const emailOn = data.channels.includes('email');

  const errors = {
    channels: data.channels.length ? undefined : copy.errors.none,
    supportEmail: !emailOn
      ? undefined
      : !data.supportEmail.trim()
        ? copy.errors.supportEmail
        : !isEmail(data.supportEmail)
          ? copy.errors.supportEmailInvalid
          : undefined,
  };
  const { shown, blur, check } = useFieldErrors(errors, form);

  const toggle = (id: string) =>
    update({
      channels: data.channels.includes(id)
        ? data.channels.filter((channel) => channel !== id)
        : [...data.channels, id],
    });

  const slug = slugify(data.company);

  return (
    <OnboardingShell
      step={2}
      title={copy.title}
      text={copy.text}
      formRef={form}
      onSubmit={() => check() && navigate(routes.team)}
      onBack={() => navigate(routes.workspace)}
      onSkip={() => navigate(routes.team)}
    >
      <div className="flex flex-col gap-2">
        <div
          role="group"
          aria-label={copy.title}
          className="grid gap-2.5 sm:grid-cols-2"
        >
          {copy.channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              {...channel}
              selected={data.channels.includes(channel.id)}
              onToggle={() => toggle(channel.id)}
            />
          ))}
        </div>
        {shown('channels') && (
          <FieldError id="channels-error">{shown('channels')}</FieldError>
        )}
      </div>
      {emailOn && (
        <div className="rounded-2xl bg-surface p-4">
          <TextField
            label={copy.supportEmail}
            type="email"
            autoComplete="off"
            placeholder={
              slug ? `support@${slug}.com` : copy.supportEmailPlaceholder
            }
            value={data.supportEmail}
            onChange={(event) => update({ supportEmail: event.target.value })}
            onBlur={blur('supportEmail')}
            error={shown('supportEmail')}
          />
        </div>
      )}
    </OnboardingShell>
  );
}
