import { useRef, useState, type FormEvent } from 'react';
import { AuthProductVignette } from '../components/auth-asides';
import { AuthLayout, authLinkClass } from '../components/auth-layout';
import { Button } from '../components/button';
import { Checkbox } from '../components/checkbox';
import { PasswordField } from '../components/password-field';
import { PasswordStrength } from '../components/password-strength';
import { FieldError, TextField } from '../components/text-field';
import { authErrors, signUpCopy } from '../content/auth';
import { Link, routes, useRouter } from '../lib/router';
import { fakeRequest, resetOnboarding, signIn } from '../lib/session';
import { useFieldErrors } from '../lib/use-field-errors';
import { isEmail, passwordScore } from '../lib/validation';

export function SignUp() {
  const { navigate } = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [pending, setPending] = useState(false);

  const errors = {
    name: name.trim() ? undefined : authErrors.nameRequired,
    email: !email.trim()
      ? authErrors.emailRequired
      : !isEmail(email)
        ? authErrors.emailInvalid
        : undefined,
    password: !password
      ? authErrors.passwordRequired
      : password.length < 8
        ? authErrors.passwordShort
        : passwordScore(password) < 3
          ? authErrors.passwordWeak
          : undefined,
    terms: terms ? undefined : authErrors.termsRequired,
  };
  const { shown, blur, check } = useFieldErrors(errors, form);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!check()) return;
    setPending(true);
    await fakeRequest(700);
    signIn({ name: name.trim(), email: email.trim() });
    resetOnboarding();
    navigate(routes.workspace);
  };

  return (
    <AuthLayout
      title={signUpCopy.title}
      text={signUpCopy.text}
      aside={<AuthProductVignette />}
      footer={
        <>
          {signUpCopy.switchPrompt}{' '}
          <Link href={routes.signIn} className={authLinkClass}>
            {signUpCopy.switchLink}
          </Link>
        </>
      }
    >
      <form
        ref={form}
        noValidate
        onSubmit={submit}
        className="flex flex-col gap-5"
      >
        <TextField
          label={signUpCopy.name}
          autoComplete="name"
          placeholder="Alex Morgan"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={blur('name')}
          error={shown('name')}
        />
        <TextField
          label={signUpCopy.email}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={blur('email')}
          error={shown('email')}
        />
        <div className="flex flex-col gap-3">
          <PasswordField
            label={signUpCopy.password}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={blur('password')}
            error={shown('password')}
          />
          <PasswordStrength password={password} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Checkbox
            label={signUpCopy.terms}
            checked={terms}
            invalid={Boolean(shown('terms'))}
            onChange={(event) => setTerms(event.target.checked)}
          />
          {shown('terms') && (
            <FieldError id="terms-error">{shown('terms')}</FieldError>
          )}
        </div>
        <Button type="submit" className="w-full" loading={pending}>
          {signUpCopy.submit}
        </Button>
      </form>
    </AuthLayout>
  );
}
