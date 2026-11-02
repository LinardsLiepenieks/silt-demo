export function ArrowRightIcon({
  className = 'h-4 w-4',
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 12h14m-6 6l6-6m-6-6l6 6"
      />
    </svg>
  );
}
