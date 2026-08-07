"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Globe } from "@/components/ui/globe";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Hairline the wireframe globe rolls along as the section scrolls past. */
export function LineGlobe() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".line-globe-ball",
        { xPercent: -50, left: "0%" },
        {
          left: "100%",
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
    <div ref={root} className="relative overflow-hidden">
      <div className="hair" />
      <div className="line-globe-ball absolute top-1/2 -translate-y-1/2">
        <Globe />
      </div>
    </div>
  );
}
