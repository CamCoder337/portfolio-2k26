"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Passion } from "@/lib/about";
import { Media } from "@/components/ui/media";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Life outside the editor, scrolled sideways.
 *
 * Every other section on this site stacks downwards, which is exactly why
 * this one does not. The card's `trait` line is the point of the section: it
 * names what the pastime feeds back into the work, so the two halves of the
 * page read as one person rather than a CV with a hobbies footnote.
 *
 * Built from a tall section with a sticky viewport inside it, not from
 * ScrollTrigger's `pin`. The height reserves the scroll distance the sideways
 * travel consumes; below md it collapses to an ordinary stack and the tween
 * never runs.
 */
export function AboutPassions({ items }: { items: Passion[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = track.current;
          if (!el) return;

          gsap.to(el, {
            /* A function so `invalidateOnRefresh` can re-measure: the distance
               depends on the track width, which changes with the viewport and
               again once the images have decoded. */
            x: () => -(el.scrollWidth - window.innerWidth),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { scope: root },
  );

  if (items.length === 0) return null;

  return (
    <section
      ref={root}
      style={
        {
          "--panels-h": `${Math.max(2, items.length) * 100}svh`,
        } as React.CSSProperties
      }
      className="relative bg-ink text-paper md:h-[var(--panels-h)]"
    >
      <p className="eyebrow px-[clamp(1.25rem,4vw,3.885rem)] pt-[clamp(3rem,7vw,6rem)] md:hidden">
        Off screen
      </p>

      {/* The label lives inside the stuck viewport, not at the top of the
          section: the section is several screens tall, so anything anchored to
          its top scrolls away before the first card has finished moving. */}
      <div className="md:sticky md:top-0 md:flex md:h-svh md:items-center md:overflow-hidden">
        <p className="eyebrow absolute top-[clamp(3rem,7vw,6rem)] left-[clamp(1.25rem,4vw,3.885rem)] hidden md:block">
          Off screen
        </p>

        {/* A grid, not a flex row, so the cards can share its rows through
            `subgrid`. A flex row only equalises the card heights; the bands
            inside them — image, name, body, rule — still measure themselves,
            so a shorter body or a name that wraps onto a second line knocks
            that card out of line with its neighbours. Sharing the rows makes
            every band line up whatever each card holds. */}
        <div
          ref={track}
          className="flex flex-col gap-8 px-[clamp(1.25rem,4vw,3.885rem)] py-[clamp(2rem,6vw,4rem)] md:grid md:w-max md:auto-cols-[min(34rem,68vw)] md:grid-flow-col md:grid-rows-[auto_auto_auto_1fr_auto] md:gap-x-10 md:gap-y-0 md:will-change-transform"
        >
          {items.map((item, index) => (
            <article
              key={item._key}
              className="flex flex-col md:row-span-5 md:grid md:grid-rows-subgrid"
            >
              {/* A card with no image still has to hold the row's height, or
                  the track jumps as it passes. The placeholder keeps the same
                  aspect ratio and reads as deliberate. */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-deep">
                {item.image ? (
                  <Media
                    src={item.image.src}
                    alt={item.image.alt}
                    sizes="(max-width: 768px) 100vw, 34rem"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-[clamp(3rem,6vw,5rem)] text-paper/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
              </div>

              <span className="eyebrow mt-6 block">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none">
                {item.name}
              </h3>

              <p className="mt-4 text-body text-paper/70">{item.body}</p>

              <p className="mt-6 self-end border-t border-hair-light pt-4 text-body text-accent md:pt-6">
                {item.trait}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
