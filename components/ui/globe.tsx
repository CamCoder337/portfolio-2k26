/**
 * Wireframe globe used in the hero plaque and on the about page line.
 * Everything inside scales off the outer size, so the caller only sets that.
 */
export function Globe({ className = "size-14" }: { className?: string }) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full bg-ink ${className}`}
    >
      <div
        className="relative h-[57%] w-[57%] animate-spin rounded-full border border-paper/70"
        style={{ animationDuration: "9s" }}
      >
        <span className="absolute inset-y-0 left-1/2 w-1/2 -translate-x-1/2 rounded-[50%] border border-paper/50" />
        <span className="absolute inset-y-0 left-1/2 w-1/4 -translate-x-1/2 rounded-[50%] border border-paper/40" />
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/50" />
        <span className="absolute inset-x-0 top-1/4 h-px bg-paper/30" />
        <span className="absolute inset-x-0 bottom-1/4 h-px bg-paper/30" />
      </div>
    </div>
  );
}
