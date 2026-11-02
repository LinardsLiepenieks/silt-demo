import { useRef, useState, type FormEvent } from 'react';
import { AuthQuote } from '../components/auth-asides';
import { AuthLayout, authLinkClass } from '../components/auth-layout';
import { Button } from '../components/button';
import { Checkbox } from '../components/checkbox';
import { PasswordField } from '../components/password-field';
import { TextField } from '../components/text-field';
import { authErrors, signInCopy } from '../content/auth';
import { Link, routes, useRouter } from '../lib/router';
import {
  credentialsMatch,
  demoUser,
  fakeRequest,
  signIn,
} from '../lib/session';
import { useFieldErrors } from '../lib/use-field-errors';
import { isEmail } from '../lib/validation';

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]">
      <path
        fill="currentColor"
        d="M21.6 10.2H12v3.9h5.5c-.5 2.5-2.6 4-5.5 4a6.1 6.1 0 1 1 0-12.2c1.5 0 2.9.5 4 1.4l2.9-2.9A10.1 10.1 0 0 0 12 1.9a10.1 10.1 0 1 0 0 20.2c5.1 0 9.8-3.7 9.8-10.1 0-.6-.1-1.2-.2-1.8Z"
      />
    </svg>
  );
}

export function SignIn() {
  const { navigate } = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [pending, setPending] = useState<'form' | 'google' | null>(null);
  const [mismatch, setMismatch] = useState(false);
  const [resetNote, setResetNote] = useState('');

  const errors = {
    email: !email.trim()
      ? authErrors.emailRequired
      : !isEmail(email)
        ? authErrors.emailInvalid
        : undefined,
    password: !password
      ? authErrors.passwordRequired
      : password.length < 8
        ? authErrors.passwordShort
        : undefined,
  };
  const { shown, blur, check } = useFieldErrors(errors, form);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setMismatch(false);
    if (!check()) return;
    setPending('form');
    await fakeRequest(700);
    if (credentialsMatch(email, password)) {
      signIn({ ...demoUser, email: email.trim() }, remember);
      navigate(routes.inbox);
    } else {
      setPending(null);
      setMismatch(true);
    }
  };

  const continueWithGoogle = async () => {
    setPending('google');
    await fakeRequest(900);
    signIn(demoUser, remember);
    navigate(routes.inbox);
  };

  return (
    <AuthLayout
      title={signInCopy.title}
      text={signInCopy.text}
      aside={<AuthQuote />}
      footer={
        <>
          {signInCopy.switchPrompt}{' '}
          <Link href={routes.signUp} className={authLinkClass}>
            {signInCopy.switchLink}
          </Link>
        </>
      }
    >
      <Button
        variant="secondary"
        className="w-full"
        loading={pending === 'google'}
        disabled={pending === 'form'}
        onClick={continueWithGoogle}
      >
        <GoogleGlyph />
        {signInCopy.google}
      </Button>
      <div className="my-6 flex items-center gap-3 text-xs font-medium text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        {signInCopy.divider}
        <span className="h-px flex-1 bg-border" />
      </div>
      <form
        ref={form}
        noValidate
        onSubmit={submit}
        className="flex flex-col gap-5"
      >
        {mismatch && (
          <p
            role="alert"
            className="rounded-xl bg-warm-soft px-3.5 py-3 text-sm font-medium text-warm-strong"
          >
            {signInCopy.mismatch}
          </p>
        )}
        <TextField
          label={signInCopy.email}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setMismatch(false);
          }}
          onBlur={blur('email')}
          error={shown('email')}
        />
        <div className="flex flex-col gap-2">
          <PasswordField
            label={signInCopy.password}
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setMismatch(false);
            }}
            onBlur={blur('password')}
            error={shown('password')}
            labelAction={
              <button
                type="button"
                onClick={() =>
                  setResetNote(
                    signInCopy.resetSent(isEmail(email) ? email.trim() : ''),
                  )
                }
                className={`text-sm ${authLinkClass}`}
              >
                {signInCopy.forgot}
              </button>
            }
          />
          {resetNote && (
            <p
              role="status"
              className="rounded-xl bg-accent-soft px-3.5 py-2.5 text-[13px] font-medium text-accent-strong"
            >
              {resetNote}
            </p>
          )}
        </div>
        <Checkbox
          label={signInCopy.remember}
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
        />
        <Button
          type="submit"
          className="w-full"
          loading={pending === 'form'}
          disabled={pending === 'google'}
        >
          {signInCopy.submit}
        </Button>
        <p className="text-center text-[13px] text-muted-foreground">
          {signInCopy.demo}
        </p>
      </form>
    </AuthLayout>
  );
}
