import { heroInsights } from '../content/hero';
import { MockCard } from './mock-card';

export type InsightsMockProps = {
  title: string;
  metric: { label: string; value: string; change: string };
  /** Reply volume per day, 0–100 of the chart's height. */
  bars: { day: string; value: number }[];
  csat: { label: string; value: string; note: string };
};

/** A week of support at a glance: reply speed, volume and satisfaction. */
export function InsightsMock({
  title = heroInsights.title,
  metric = heroInsights.metric,
  bars = heroInsights.bars,
  csat = heroInsights.csat,
}: Partial<InsightsMockProps>) {
  const peak = Math.max(...bars.map((bar) => bar.value));
  return (
    <MockCard>
      <h4 className="font-display text-base font-bold tracking-[-0.02em] text-foreground">
        {title}
      </h4>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground">{metric.label}</p>
          <p className="font-display text-2xl font-bold tracking-[-0.03em] text-foreground">
            {metric.value}
          </p>
        </div>
        <span className="mb-1 rounded-md bg-accent-soft px-1.5 py-0.5 text-xs font-medium text-accent-strong">
          {metric.change}
        </span>
      </div>
      <div className="mt-4 flex h-28 items-end gap-2">
        {bars.map((bar) => (
          <div
            key={bar.day}
            className="flex h-full flex-1 flex-col items-center gap-1.5"
          >
            <div className="flex w-full flex-1 items-end">
              <div
                className={`w-full rounded-md ${bar.value === peak ? 'bg-accent' : 'bg-tint-mint'}`}
                style={{ height: `${bar.value}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{bar.day}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface px-3 py-2.5">
        <svg
          viewBox="0 0 36 36"
          aria-hidden="true"
          className="size-9 -rotate-90"
        >
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="4"
          />
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${parseFloat(csat.value)} 100`}
          />
        </svg>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{csat.label}</p>
          <p className="font-display text-base font-bold text-foreground">
            {csat.value}
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{csat.note}</span>
      </div>
    </MockCard>
  );
}
