import { useEffect, useState } from 'react';
import { CopyLinkButton } from '../components/copy-link-button';
import { addInvites, InviteInput } from '../components/invite-input';
import { OnboardingDone } from '../components/onboarding-done';
import { OnboardingShell } from '../components/onboarding-shell';
import {
  onboardingActions,
  teamStep as copy,
  workspaceStep,
} from '../content/onboarding';
import { routes, useRouter } from '../lib/router';
import {
  currentUser,
  demoUser,
  fakeRequest,
  signIn,
  slugify,
  useOnboarding,
} from '../lib/session';

/** Step 3: invite teammates by email, then finish setup. */
export function OnboardingTeam() {
  const { navigate } = useRouter();
  const [data, update] = useOnboarding();
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [phase, setPhase] = useState<'editing' | 'saving' | 'done'>('editing');
  const slug = slugify(data.company) || workspaceStep.urlFallback;

  const goToInbox = () => navigate(routes.inbox);

  useEffect(() => {
    if (phase !== 'done') return;
    const timer = setTimeout(goToInbox, 1800);
    return () => clearTimeout(timer);
  }, [phase]);

  const complete = async () => {
    setPhase('saving');
    await fakeRequest(600);
    if (!currentUser()) signIn(demoUser);
    setPhase('done');
  };

  const finish = () => {
    // An address typed but not yet added still counts.
    if (draft.trim()) {
      const result = addInvites(data.invites, draft);
      update({ invites: result.invites });
      setDraft(result.rest);
      setError(result.error);
      if (result.error) return;
    }
    complete();
  };

  if (phase === 'done') return <OnboardingDone onContinue={goToInbox} />;

  return (
    <OnboardingShell
      step={3}
      title={copy.title}
      text={copy.text}
      submitLabel={onboardingActions.finish}
      loading={phase === 'saving'}
      onSubmit={finish}
      onBack={() => navigate(routes.channels)}
      onSkip={complete}
    >
      <InviteInput
        invites={data.invites}
        onInvitesChange={(invites) => update({ invites })}
        draft={draft}
        onDraftChange={setDraft}
        error={error}
        onErrorChange={setError}
      />
      <div className="flex flex-col gap-3 rounded-2xl bg-surface p-4 sm:flex-row sm:items-center">
        <p className="min-w-0 flex-1 truncate font-mono text-[13px] text-muted-foreground">
          {copy.inviteLink(slug)}
        </p>
        <CopyLinkButton
          text={copy.inviteLink(slug)}
          label={copy.copyLink}
          copiedLabel={copy.copied}
        />
      </div>
    </OnboardingShell>
  );
}
