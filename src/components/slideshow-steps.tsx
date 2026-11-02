// Numbered pills that pick a slideshow step. The active pill opens to show
// its label, and a ring around its number fills over the step's interval.

type Variant = 'overlay' | 'light';

const styles: Record<
  Variant,
  {
    pill: string;
    circle: string;
    label: string;
    ring: string;
    ringWidth: number;
  }
> = {
  // Glass pills laid over the hero's coloured panel.
  overlay: {
    pill: 'bg-black/25 hover:bg-black/30 data-[active=true]:bg-black/30 data-[active=true]:pr-3 sm:data-[active=true]:pr-4',
    circle:
      'w-6 h-6 sm:w-8 sm:h-8 text-white text-sm sm:text-base bg-white/20 group-data-[active=true]:bg-white/40 before:absolute before:inset-0 before:rounded-full before:p-px before:bg-linear-to-b before:from-white/80 before:to-white/15 before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:transition-opacity group-data-[active=true]:before:opacity-0',
    label: 'text-white text-xs sm:text-sm',
    ring: 'white',
    ringWidth: 3,
  },
  // Plain pills on a white page.
  light: {
    pill: 'bg-black/5 hover:bg-black/10 data-[active=true]:bg-black/10 data-[active=true]:pr-4',
    circle:
      'w-8 h-8 text-black/80 text-sm bg-white group-data-[active=true]:bg-black group-data-[active=true]:text-white',
    label: 'text-black/80 text-sm',
    ring: 'black',
    ringWidth: 2,
  },
};

const springy = 'cubic-bezier(.34,1.56,.64,1)';

export function SlideshowSteps({
  labels,
  active,
  onSelect,
  animating,
  cycle,
  intervalMs,
  variant,
  className = '',
}: {
  labels: string[];
  active: number;
  onSelect: (index: number) => void;
  animating: boolean;
  cycle: number;
  intervalMs: number;
  variant: Variant;
  className?: string;
}) {
  const s = styles[variant];
  return (
    <div className={`flex items-center ${className}`}>
      {labels.map((label, index) => {
        const isActive = index === active;
        return (
          <button
            key={label}
            type="button"
            data-active={isActive}
            aria-pressed={isActive}
            onClick={() => onSelect(index)}
            style={{
              transition: `padding .4s ${springy}, background-color .2s ease`,
            }}
            className={`group flex cursor-pointer items-center rounded-full p-1 ${s.pill}`}
          >
            <span
              aria-hidden="true"
              className={`relative flex flex-shrink-0 items-center justify-center overflow-visible rounded-full font-medium transition-colors duration-200 ${s.circle}`}
            >
              <svg
                className="pointer-events-none absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] overflow-visible opacity-0 group-data-[active=true]:opacity-100"
                viewBox="0 0 44 44"
                style={
                  variant === 'overlay'
                    ? { filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))' }
                    : undefined
                }
              >
                {isActive && (
                  <circle
                    // A new key restarts the fill whenever the step changes.
                    key={cycle}
                    cx="22"
                    cy="22"
                    r="19"
                    fill="none"
                    stroke={s.ring}
                    strokeWidth={s.ringWidth}
                    strokeLinecap="round"
                    pathLength={100}
                    transform="rotate(-90 22 22)"
                    style={{
                      strokeDasharray: 100,
                      strokeDashoffset: 100,
                      animation: `slideshow-progress ${intervalMs}ms linear forwards`,
                      animationPlayState: animating ? 'running' : 'paused',
                    }}
                  />
                )}
              </svg>
              <span className="relative">{index + 1}</span>
            </span>
            <span
              className={`inline-block overflow-hidden font-medium whitespace-nowrap ${s.label} ${
                isActive
                  ? 'max-w-[200px] pl-2 opacity-100'
                  : 'max-w-0 pl-0 opacity-0'
              }`}
              style={{
                transition: `max-width .4s ${springy}, opacity .25s ease, padding-left .4s ${springy}`,
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
