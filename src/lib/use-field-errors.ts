import { useState, type RefObject } from 'react';
import { flushSync } from 'react-dom';

/**
 * Shows a field's error once it has been left or the form submitted, and
 * keeps it live after that so fixing the value clears it as you type.
 */
export function useFieldErrors<Field extends string>(
  errors: Partial<Record<Field, string>>,
  formRef: RefObject<HTMLFormElement | null>,
) {
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const shown = (field: Field) =>
    submitted || touched[field] ? errors[field] : undefined;

  const blur = (field: Field) => () =>
    setTouched((current) => ({ ...current, [field]: true }));

  /** Reveals every error; returns true when the form is valid. */
  const check = () => {
    // Render the errors now so the first invalid field can take focus.
    flushSync(() => setSubmitted(true));
    const valid = Object.values(errors).every((error) => !error);
    if (!valid)
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
    return valid;
  };

  return { shown, blur, check };
}
