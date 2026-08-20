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
        {/* The reference keeps four tiles in the first row on a phone but only
            two in the second; four apiece leaves 100px slivers. */}
        <Row items={showcase.rowTwo} className="showcase-row-2" mobileCount={2} />
      </div>
    </section>
  );
}

function Row({
  items,
  className,
  mobileCount = items.length,
}: {
  items: ShowcaseItem[];
  className: string;
  /** How many tiles survive below md; the rest are dropped. */
  mobileCount?: number;
}) {
  return (
    <div className={`flex w-[116%] -translate-x-[8%] gap-4 md:gap-6 ${className}`}>
      {items.map((item, i) => (
        <div
          key={item.src}
          className={`relative aspect-[4/3] flex-1 overflow-hidden bg-paper-mute ${
            i >= mobileCount ? "hidden md:block" : ""
          }`}
        >
          {/* Branched rather than passing `video={item.video}`: the boolean
              cannot pick a side of the Media union, and the image side has to
              state its alt. These tiles are a decorative band — the section
              already carries the accessible name "Selected visuals" — so an
              empty alt is the right answer, declared rather than defaulted. */}
          {item.video ? (
            <Media
              src={item.src}
              video
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <Media
              src={item.src}
              alt=""
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          )}
        </div>
      ))}
    </div>
  );
}
