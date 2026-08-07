"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MaskedWordsProps = {
  text: string;
  className?: string;
  /** Delay between consecutive words. */
  stagger?: number;
  as?: "p" | "h1" | "h2" | "h3" | "h4";
};

/**
 * Splits a string into word-level masks and slides each one up as the block
 * enters the viewport — the `span-line / span-line-inner` pattern of the original.
 */
export function MaskedWords({
  text,
  className = "",
  stagger = 0.025,
  as: Tag = "p",
}: MaskedWordsProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* A `to` tween, not `fromTo`: ScrollTrigger.refresh() would re-apply the
         hidden start values of a fromTo whose trigger has already fired. */
      gsap.to(".masked-word-inner", {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <Tag ref={root as never} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="mask-line">
          <span className="masked-word-inner inline-block translate-y-[120%] will-change-transform">
            {word}
          </span>
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}
