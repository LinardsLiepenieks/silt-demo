import { useEffect, useState } from 'react';
import { Button } from './button';
import { CheckIcon } from './check-icon';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers and some sandboxed previews block the async API.
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

/** Copies `text` and says "Copied" for two seconds. */
export function CopyLinkButton({
  text = 'https://halcyon.app/join/your-company',
  label = 'Copy invite link',
  copiedLabel = 'Copied',
}: {
  text?: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      variant="secondary"
      className="h-10 px-4"
      onClick={async () => setCopied(await copyText(text))}
    >
      {copied ? (
        <CheckIcon className="size-4 text-accent" />
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
          <path
            d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </Button>
  );
}
