export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <polyline points="4.77 1 13 1 13 9.23" />
      <line x1="1" y1="13" x2="13" y2="1" />
    </svg>
  );
}
