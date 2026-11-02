import { useState, type ComponentProps } from 'react';
import { TextField } from './text-field';

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="3" />
        {!open && <path d="M4 4l16 16" />}
      </g>
    </svg>
  );
}

/** A text field whose value can be shown or hidden. */
export function PasswordField({
  label = 'Password',
  ...props
}: Omit<ComponentProps<typeof TextField>, 'type' | 'trailing'>) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      label={label}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
          className="mr-1.5 inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-surface hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-accent/30"
        >
          <EyeIcon open={visible} />
        </button>
      }
      {...props}
    />
  );
}
