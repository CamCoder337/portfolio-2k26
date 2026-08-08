/**
 * Wireframe globe used in the hero plaque and on the about page line.
 *
 * Matches the reference: the disc itself is transparent — what you see behind
 * it is the page — and carries a solid white globe glyph that rocks between
 * +15deg and -15deg over 5.4s (it does not spin). The coloured fill sits at
 * opacity 0 until hover, pulsing between the accent and a red.
 *
 * The glyph is drawn as one SVG rather than the reference's stack of clipped,
 * inset-box-shadow ellipses: at 67px the two are indistinguishable, and the
 * ratios stay legible.
 */
export function Globe({ className = "size-14" }: { className?: string }) {
  return (
    <div
      className={`group relative grid shrink-0 place-items-center overflow-hidden rounded-full ${className}`}
    >
      <span
        aria-hidden="true"
        className="animate-digital-ball absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
      />

      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        /* 70% of the disc, as on the reference (47px inside 67px). */
        className="animate-globe-wobble relative h-[70%] w-[70%] text-paper"
      >
        <circle cx="24" cy="24" r="23" strokeWidth="2" />
        <ellipse cx="24" cy="24" rx="15.5" ry="23" strokeWidth="1.5" />
        <ellipse cx="24" cy="24" rx="7" ry="23" strokeWidth="1.5" />
        <ellipse cx="24" cy="24" rx="23" ry="8.5" strokeWidth="1.5" />
        {/* Solid equator, the reference's filled middle band. */}
        <line x1="1" y1="24" x2="47" y2="24" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
