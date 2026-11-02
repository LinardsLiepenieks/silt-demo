import { weeklyInsight } from '../content/journey';
import { MockCard } from './mock-card';

export type WeeklyInsightProps = {
  period: string;
  topic: string;
  count: string;
  trend: string;
  /** Questions per day, oldest first; the bars are scaled to the largest. */
  daily: number[];
  suggestion: { label: string; title: string; action: string };
};

/** A weekly report that turns a repeated question into an article idea. */
export function WeeklyInsightMock({
  period = weeklyInsight.period,
  topic = weeklyInsight.topic,
  count = weeklyInsight.count,
  trend = weeklyInsight.trend,
  daily = weeklyInsight.daily,
  suggestion = weeklyInsight.suggestion,
}: Partial<WeeklyInsightProps>) {
  const max = Math.max(...daily, 1);
  return (
    <MockCard>
      <p className="text-xs text-muted-foreground">{period}</p>
      <p className="mt-1 text-sm font-semibold">{topic}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-3xl font-bold tracking-[-0.03em]">
            {count}
          </p>
          <p className="mt-0.5 text-xs font-medium text-accent-strong">
            {trend}
          </p>
        </div>
        <div aria-hidden="true" className="flex h-14 items-end gap-1.5">
          {daily.map((value, index) => (
            <span
              key={index}
              className={`w-3 rounded-sm ${
                index === daily.length - 1 ? 'bg-accent' : 'bg-tint-mint'
              }`}
              style={{ height: `${(value / max) * 100}%` }}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-dashed border-accent/40 bg-accent-soft/60 p-3">
        <p className="text-[11px] font-medium text-accent-strong">
          {suggestion.label}
        </p>
        <p className="mt-1 text-sm leading-snug font-semibold">
          {suggestion.title}
        </p>
        <span className="mt-3 inline-block rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-accent-strong shadow-sm">
          {suggestion.action}
        </span>
      </div>
    </MockCard>
  );
}
