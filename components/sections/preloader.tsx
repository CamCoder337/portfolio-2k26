"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { greetings } from "@/lib/site";
import { intro } from "@/lib/intro-state";
import { lenisStore } from "@/lib/lenis-store";

/**
 * Height of the curved lip trailing the overlay, in vh. The overlay must
 * travel 100 + LIP to take that curve off screen; stopping at 100 leaves it
 * sitting over the top of the page until the component unmounts, which reads
 * as the shape freezing and then popping out.
 */
const LIP_VH = 25;
const EXIT = 100 + LIP_VH;

/**
 * Dark intro overlay that cycles greetings, then lifts away with a curved edge.
 * Runs once per full page load, never on client-side navigation.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(intro.played);

  useGSAP(
    () => {
      if (intro.played) return;
      lenisStore.current?.stop();

      const tl = gsap.timeline({
        onComplete: () => {
          intro.played = true;
          lenisStore.current?.start();
          setDone(true);
        },
      });

      greetings.forEach((_, i) => {
        tl.call(() => setIndex(i), undefined, i === 0 ? 0.4 : "+=0.15");
      });

      tl.to(".preloader-word", { autoAlpha: 0, duration: 0.3 }, "+=0.25")
        /* Curve bulges out first, then the whole overlay carries it away. */
        .to(
          ".preloader-curve",
          { scaleY: 1, duration: 0.6, ease: "power2.out" },
          "<",
        )
        .to(
          root.current,
          {
            yPercent: -EXIT,
            duration: 1.15,
            ease: "power2.inOut",
            force3D: true,
          },
          "<0.15",
        );

      return () => {
        tl.kill();
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[130] grid place-items-center bg-ink text-paper"
    >
      <p className="preloader-word flex items-center gap-3 text-lead">
        <span className="inline-block size-2 rounded-full bg-paper" />
        {greetings[index]}
      </p>
      <div
        className="preloader-curve absolute inset-x-0 top-full origin-top scale-y-0 rounded-b-[50%] bg-ink"
        style={{ height: `${LIP_VH}vh` }}
      />
    </div>
  );
}
