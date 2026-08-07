"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { showcase, type ShowcaseItem } from "@/lib/site";
import { Media } from "@/components/ui/media";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Two rows of media sliding in opposite directions as the section passes. */
export function Showcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scrub = {
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };

      gsap.fromTo(
        ".showcase-row-1",
        { xPercent: 8 },
        { xPercent: -8, ease: "none", scrollTrigger: scrub },
      );
      gsap.fromTo(
        ".showcase-row-2",
        { xPercent: -8 },
        { xPercent: 8, ease: "none", scrollTrigger: scrub },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="overflow-hidden py-[clamp(3rem,7vw,7rem)]"
      aria-label="Selected visuals"
    >
      <div className="flex flex-col gap-4 md:gap-6">
        <Row items={showcase.rowOne} className="showcase-row-1" />
        <Row items={showcase.rowTwo} className="showcase-row-2" />
      </div>
    </section>
  );
}

function Row({
  items,
  className,
}: {
  items: ShowcaseItem[];
  className: string;
}) {
  return (
    <div className={`flex w-[116%] -translate-x-[8%] gap-4 md:gap-6 ${className}`}>
      {items.map((item) => (
        <div
          key={item.src}
          className="relative aspect-[4/3] flex-1 overflow-hidden bg-paper-mute"
        >
          <Media src={item.src} video={item.video} sizes="25vw" />
        </div>
      ))}
    </div>
  );
}
