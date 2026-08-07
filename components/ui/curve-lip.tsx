"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The white lip that bulges then flattens as the dark footer scrolls in.
 * `tone` is the colour of the *incoming* (light) section.
 */
export function CurveLip({ tone = "bg-paper" }: { tone?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".curve-lip-shape",
        { scaleY: 1 },
        {
          scaleY: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="curve-lip bg-ink">
      <div
        className={`curve-lip-shape absolute inset-x-[-25%] bottom-0 h-[300%] origin-bottom rounded-b-[50%] ${tone}`}
      />
    </div>
  );
}
