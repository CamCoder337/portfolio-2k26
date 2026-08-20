"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ServiceItem } from "@/lib/about";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * What I offer, as rule-separated rows.
 *
 * The hover fill is the site's own button mechanic — an accent panel rising
 * from the bottom with a rounded top half that flattens as it lands — applied
 * to a list row instead of a button. It sits above the row background and
 * below the text, so no negative z-index is involved.
 */
export function AboutServices({ items }: { items: ServiceItem[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".service-row", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  if (items.length === 0) return null;

  return (
    <section ref={root} className="shell py-[clamp(3rem,8vw,7rem)]">
      <p className="eyebrow mb-6">What I can help you with</p>

      <ul className="border-t border-hair">
        {items.map((item) => (
          <li
            key={item._key}
            className="service-row group relative translate-y-14 overflow-hidden border-b border-hair opacity-0"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 translate-y-full rounded-[50%_50%_0_0] bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:rounded-none"
            />

            <div className="relative grid gap-4 px-[clamp(0.5rem,2vw,1.5rem)] py-[clamp(2rem,4vw,3.5rem)] transition-colors duration-500 md:grid-cols-[4rem_1fr_1.2fr] md:gap-10">
              <span className="eyebrow transition-colors duration-500 group-hover:text-paper">
                {item.index}
              </span>
              <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none transition-colors duration-500 group-hover:text-paper">
                {item.title}
              </h3>
              <p className="max-w-xl text-body text-ink-soft transition-colors duration-500 group-hover:text-paper">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
