import { useId, type SelectHTMLAttributes } from 'react';
import { ChevronDownIcon } from './chevron-down-icon';
import { FieldError, fieldBorder } from './text-field';

/** A labelled native select with a placeholder option and inline error. */
export function SelectField({
  label = 'What do you sell?',
  options = ['Physical products', 'Software', 'Services'],
  placeholder = 'Choose one',
  error,
  ...select
}: Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  label?: string;
  options?: string[];
  placeholder?: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <div
        className={`relative flex h-11 items-center rounded-xl border bg-white transition-[border-color,box-shadow] focus-within:ring-[3px] ${fieldBorder(Boolean(error))}`}
      >
        <select
          id={id}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-full w-full cursor-pointer appearance-none rounded-xl bg-transparent pr-10 pl-3.5 text-[15px] outline-none ${
            select.value ? 'text-foreground' : 'text-muted-foreground'
          }`}
          {...select}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3.5 size-4 text-muted-foreground" />
      </div>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}
