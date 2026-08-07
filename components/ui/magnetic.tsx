"use client";

import { useRef, cloneElement, type ReactElement } from "react";
import gsap from "gsap";

type MagneticProps = {
  children: ReactElement;
  /** How far the child is dragged toward the cursor, in px. */
  strength?: number;
};

/**
 * Pulls its child toward the cursor while hovered and springs it back on exit.
 * Mirrors the `data-strength` behaviour on the reference site's buttons.
 */
export function Magnetic({ children, strength = 25 }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const { left, top, width, height } = node.getBoundingClientRect();
    const x = (event.clientX - (left + width / 2)) / (width / 2);
    const y = (event.clientY - (top + height / 2)) / (height / 2);
    gsap.to(node, {
      x: x * strength,
      y: y * strength,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const reset = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)" });
  };

  return (
    <div
      onMouseMove={move}
      onMouseLeave={reset}
      className="inline-flex will-change-transform"
    >
      {cloneElement(children, { ref } as Record<string, unknown>)}
    </div>
  );
}
