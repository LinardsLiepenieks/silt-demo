import { useId, useRef, type KeyboardEvent } from 'react';
import { FieldError } from './text-field';

/**
 * A single choice from a few options, as a radio group drawn as joined
 * segments. Arrow keys move between options.
 */
export function SegmentedControl<Option extends string>({
  label = 'Team size',
  options = ['1–5', '6–20', '21–50', '50+'] as Option[],
  value,
  onChange,
  error,
}: {
  label?: string;
  options?: Option[];
  value?: Option | '';
  onChange?: (value: Option) => void;
  error?: string;
}) {
  const id = useId();
  const group = useRef<HTMLDivElement>(null);
  const selectedIndex = value ? options.indexOf(value) : -1;

  const onKeyDown = (event: KeyboardEvent) => {
    const step =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? -1
          : 0;
    if (!step) return;
    event.preventDefault();
    const next =
      (Math.max(selectedIndex, 0) + step + options.length) % options.length;
    onChange?.(options[next]);
    group.current
      ?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      [next]?.focus();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span
        id={`${id}-label`}
        className="text-sm font-semibold text-foreground"
      >
        {label}
      </span>
      <div
        ref={group}
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onKeyDown={onKeyDown}
        tabIndex={-1}
        className={`grid outline-none grid-flow-col auto-cols-fr gap-1 rounded-xl border bg-surface p-1 ${
          error ? 'border-warm-strong' : 'border-border'
        }`}
      >
        {options.map((option, index) => {
          const checked = option === value;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked || (selectedIndex < 0 && index === 0) ? 0 : -1}
              onClick={() => onChange?.(option)}
              className={`h-9 rounded-lg text-sm font-semibold transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-accent/30 ${
                checked
                  ? 'bg-white text-foreground shadow-[0_1px_2px_rgb(0_0_0/.08)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}
