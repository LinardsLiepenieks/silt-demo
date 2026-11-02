import { useRef } from 'react';
import { OnboardingShell } from '../components/onboarding-shell';
import { SegmentedControl } from '../components/segmented-control';
import { SelectField } from '../components/select-field';
import { TextField } from '../components/text-field';
import { workspaceStep as copy } from '../content/onboarding';
import { routes, useRouter } from '../lib/router';
import { slugify, useOnboarding } from '../lib/session';
import { useFieldErrors } from '../lib/use-field-errors';

/** Step 1: company name with a live workspace URL, team size and trade. */
export function OnboardingWorkspace() {
  const { navigate } = useRouter();
  const [data, update] = useOnboarding();
  const form = useRef<HTMLFormElement>(null);
  const slug = slugify(data.company) || copy.urlFallback;

  const errors = {
    company: data.company.trim() ? undefined : copy.errors.company,
    teamSize: data.teamSize ? undefined : copy.errors.teamSize,
    sells: data.sells ? undefined : copy.errors.sells,
  };
  const { shown, blur, check } = useFieldErrors(errors, form);

  return (
    <OnboardingShell
      step={1}
      title={copy.title}
      text={copy.text}
      formRef={form}
      onSubmit={() => check() && navigate(routes.channels)}
    >
      <TextField
        label={copy.company}
        placeholder={copy.companyPlaceholder}
        autoComplete="organization"
        autoFocus
        value={data.company}
        onChange={(event) => update({ company: event.target.value })}
        onBlur={blur('company')}
        error={shown('company')}
        hint={
          <span className="inline-flex flex-wrap items-center gap-x-1">
            {copy.urlLabel}
            <span className="font-medium text-foreground">
              {copy.urlPrefix}
              <span className={data.company ? 'text-accent-strong' : ''}>
                {slug}
              </span>
            </span>
          </span>
        }
      />
      <SegmentedControl
        label={copy.teamSize}
        options={copy.teamSizes}
        value={data.teamSize}
        onChange={(teamSize) => update({ teamSize })}
        error={shown('teamSize')}
      />
      <SelectField
        label={copy.sells}
        placeholder={copy.sellsPlaceholder}
        options={copy.sellsOptions}
        value={data.sells}
        onChange={(event) => update({ sells: event.target.value })}
        onBlur={blur('sells')}
        error={shown('sells')}
      />
    </OnboardingShell>
  );
}
