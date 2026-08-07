"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisStore } from "@/lib/lenis-store";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the page with Lenis and hands the RAF loop to GSAP's ticker so
 * ScrollTrigger reads positions from the same frame Lenis just wrote.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    /* `lerp` rather than `duration`: the duration/easing pair restarts a timed
       ease on every wheel event, which reads as floaty and lagging behind the
       cursor. A per-frame lerp tracks input tightly, like the reference. */
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisStore.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    /* Lag smoothing stays ON. With lagSmoothing(0) — the usual Lenis snippet —
       any long frame (rendering the incoming route, decoding a video) is
       replayed in full and the transition curtain teleports instead of
       sliding. Treat stalls over 500ms as a single 33ms frame. */
    gsap.ticker.lagSmoothing(500, 33);

    /* Images settle after hydration and shift every trigger below them. */
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  return <>{children}</>;
}
