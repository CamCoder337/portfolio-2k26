"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { PracticeItem } from "@/lib/about";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The day-to-day work: a held left column against a scrolling right one.
 *
 * The column is held with `position: sticky` rather than ScrollTrigger's
 * `pin`. They look identical, but pinning injects a spacer element into the
 * layout, and this page already hands its scroll to Lenis and its route
 * changes to a GSAP curtain. Sticky leaves nothing to unwind.
 */
export function AboutPractice({ items }: { items: PracticeItem[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".practice-row").forEach((row, index) => {
        /* `to`, never `fromTo`: a ScrollTrigger.refresh() re-applies a
           fromTo's start values on a trigger that already fired, and the row
           disappears. The hidden state lives in the class list instead. */
        gsap.to(row, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });

        /* `onEnter`/`onEnterBack` rather than `onToggle`: a toggle-based
           range leaves a gap between two rows where neither is active, and
           the counter freezes on whichever fired last. Entering a row and
           staying on it until the next one is entered is what a reader sees. */
        ScrollTrigger.create({
          trigger: row,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });
    },
    { scope: root },
  );

  if (items.length === 0) return null;

  return (
    <section ref={root} className="shell py-[clamp(4rem,9vw,8rem)]">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="lg:sticky lg:top-[18vh] lg:self-start">
          <p className="eyebrow mb-6">Day to day</p>
          <h2 className="text-[clamp(2rem,4vw,3.4rem)] leading-[1.05]">
            Building it,
            <br />
            then proving
            <br />
            it holds.
          </h2>
          {/* Deliberately not a restatement of the page's opening line above
              the portrait, which already says that one person does both. This
              introduces the list on the right instead. */}
          <p className="mt-8 max-w-sm text-body text-ink-soft">
            Below is what a week actually contains. The order shifts, but the
            shape does not: build something, find out how it fails, make that
            failure impossible.
          </p>

          <p className="mt-10 flex items-baseline gap-2 text-body text-muted tabular-nums">
            <span className="text-ink">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(items.length).padStart(2, "0")}</span>
          </p>
        </div>

        <ul className="border-t border-hair">
          {items.map((item, index) => (
            <li
              key={item._key}
              className="practice-row translate-y-14 border-b border-hair py-[clamp(2rem,4vw,3.5rem)] opacity-0"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-[clamp(1.4rem,2.4vw,2.2rem)] leading-none">
                  {item.label}
                </h3>
                <span className="eyebrow shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-5 max-w-xl text-body text-ink-soft">
                {item.body}
              </p>

              {item.tools.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-hair px-3 py-1 text-eyebrow text-muted uppercase"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
