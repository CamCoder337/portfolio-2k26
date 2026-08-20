"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Milestone } from "@/lib/about";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * How I got here.
 *
 * The rule draws itself as the section passes: the same scrubbed `scaleY`
 * trick the curve lip uses at the foot of every light page, turned onto the
 * vertical axis and anchored at the top instead of the bottom.
 */
export function AboutTimeline({ items }: { items: Milestone[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".timeline-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      gsap.to(".timeline-row", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  if (items.length === 0) return null;

  return (
    <section ref={root} className="shell py-[clamp(3rem,8vw,7rem)]">
      <p className="eyebrow mb-10">How I got here</p>

      <div className="relative pl-8 md:pl-16">
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 h-full w-px bg-hair"
        />
        <span
          aria-hidden="true"
          className="timeline-progress absolute top-0 left-0 h-full w-px origin-top scale-y-0 bg-ink"
        />

        <ol>
          {items.map((item) => (
            <li
              key={item._key}
              className="timeline-row relative translate-y-14 pb-[clamp(2.5rem,5vw,4.5rem)] opacity-0 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-[0.55em] -left-8 size-1.5 -translate-x-1/2 rounded-full bg-ink md:-left-16"
              />

              <div className="grid gap-3 md:grid-cols-[6rem_1fr] md:gap-10">
                <span className="eyebrow md:pt-2">{item.year}</span>
                <div>
                  <h3 className="text-[clamp(1.3rem,2.2vw,2rem)] leading-tight">
                    {item.title}
                  </h3>
                  {item.body && (
                    <p className="mt-3 max-w-xl text-body text-ink-soft">
                      {item.body}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
