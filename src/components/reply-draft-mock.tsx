import { heroDraft } from '../content/hero';
import { BrandMark } from './brand-logo';
import { MockCard } from './mock-card';

export type ReplyDraftMockProps = {
  to: string;
  label: string;
  body: string;
  sources: string[];
  actions: { primary: string; secondary: string };
};

/** A reply Tide has drafted, with the records it drew on. */
export function ReplyDraftMock({
  to = heroDraft.to,
  label = heroDraft.label,
  body = heroDraft.body,
  sources = heroDraft.sources,
  actions = heroDraft.actions,
}: Partial<ReplyDraftMockProps>) {
  return (
    <MockCard>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          To <span className="font-medium text-foreground">{to}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft py-0.5 pr-2.5 pl-1 font-medium text-accent-strong">
          <BrandMark className="size-4" />
          {label}
        </span>
      </div>
      <p className="mt-3 rounded-xl border border-border p-3 text-sm leading-relaxed text-foreground">
        {body}
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-accent"
        />
      </p>
      <div className="mt-3">
        <p className="text-[11px] font-medium text-muted-foreground">Sources</p>
        <ul className="mt-1.5 flex flex-wrap gap-1.5">
          {sources.map((source) => (
            <li
              key={source}
              className="rounded-md bg-surface px-2 py-1 text-xs text-foreground"
            >
              {source}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
        >
          {actions.secondary}
        </button>
        <button
          type="button"
          className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
        >
          {actions.primary}
        </button>
      </div>
    </MockCard>
  );
}
