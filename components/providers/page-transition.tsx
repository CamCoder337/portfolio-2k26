"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisStore } from "@/lib/lenis-store";
import { route } from "@/lib/intro-state";
import { navLinks } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Height of the curved lip that leads and trails the curtain, in vh.
 * The lip is a child pinned just outside the panel box, so the panel has to
 * travel 100 + LIP to take it fully off screen at either end — stopping at
 * 100 leaves the curve parked over the viewport until it is hidden, which
 * reads as the shape freezing and then vanishing.
 */
const LIP_VH = 22;
const PARK = 100 + LIP_VH;

const NavigateContext = createContext<(href: string) => void>(() => {});

export const useTransitionNavigate = () => useContext(NavigateContext);

/** Slug/title pairs, resolved server-side and handed down — the curtain runs
 *  on the client and cannot query Sanity itself. */
export type ProjectLabel = { slug: string; title: string };

/** Human label shown on the curtain while the next route loads. */
function labelFor(href: string, projectLabels: ProjectLabel[]) {
  const match = navLinks.find((l) => l.href === href);
  if (match) return match.label;
  const project = projectLabels.find((p) => `/work/${p.slug}` === href);
  return project?.title ?? "";
}

/**
 * Curtain transition between routes: a dark panel sweeps up with a curved
 * leading edge, the router swaps the page underneath, then the panel keeps
 * travelling up and drags its curved trailing edge off-screen.
 */
export function PageTransition({
  children,
  projectLabels,
}: {
  children: React.ReactNode;
  projectLabels: ProjectLabel[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const panel = useRef<HTMLDivElement>(null);
  const topLip = useRef<HTMLDivElement>(null);
  const bottomLip = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  /* Route we are travelling to; null means no curtain is up. */
  const target = useRef<string | null>(null);
  const first = useRef(true);
  const frames = useRef(0);
  const [labelText, setLabelText] = useState("");

  /* gsap owns the curtain transform from the first frame. Parking at PARK
     rather than 100 keeps the curved lip — which hangs outside the panel box —
     off screen too. */
  useEffect(() => {
    gsap.set(panel.current, { yPercent: PARK });
    gsap.set([topLip.current, bottomLip.current], { scaleY: 0 });
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || target.current) return;
      target.current = href;
      route.fromTransition = true;
      setLabelText(labelFor(href, projectLabels));
      lenisStore.current?.stop();

      /* Warm the route now so the push at the end of the cover commits
         immediately instead of stalling under a motionless curtain. */
      router.prefetch(href);

      gsap
        .timeline()
        .set(panel.current, { visibility: "visible", yPercent: PARK })
        .set(topLip.current, { scaleY: 1 })
        .set(bottomLip.current, { scaleY: 0 })
        .set(label.current, { autoAlpha: 0, y: 24 })
        .to(panel.current, {
          yPercent: 0,
          duration: 1,
          ease: "power2.inOut",
          force3D: true,
        })
        /* Leading curve flattens as the panel lands. */
        .to(topLip.current, { scaleY: 0, duration: 0.7, ease: "power2.inOut" }, "<")
        .to(label.current, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.4")
        .call(() => router.push(href));
    },
    [pathname, router, projectLabels],
  );

  /* Reveal once the new route has committed. */
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    /* Back/forward buttons swap the page without a curtain — just realign. */
    if (!target.current) {
      lenisStore.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    /* `force` is required: Lenis ignores scrollTo while stopped. */
    lenisStore.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    /* Measure the incoming page while it is still hidden. Refreshing once,
       here, keeps the layout thrash out of the reveal — doing it on start or
       on complete dropped a frame right where the motion has to be smooth. */
    ScrollTrigger.refresh();

    let reveal: gsap.core.Timeline | null = null;

    /* Give the incoming page two frames to mount, paint and settle. Playing
       immediately meant the first heavy paint landed inside the tween, and
       gsap's lag smoothing turned that long frame into a visible hitch. */
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        reveal = gsap
          .timeline({
            onComplete: () => {
              target.current = null;
              route.fromTransition = false;
              lenisStore.current?.start();
            },
          })
          .set(topLip.current, { scaleY: 0 })
          .set(bottomLip.current, { scaleY: 1 })
          /* Travels PARK, not 100, so the trailing curve clears the viewport
             instead of parking over the top of the page. The eased tail then
             plays out off screen rather than looking like a stall. */
          .to(panel.current, {
            yPercent: -PARK,
            duration: 1.05,
            ease: "power2.inOut",
            force3D: true,
          })
          .to(label.current, { autoAlpha: 0, duration: 0.3 }, "<")
          .set(panel.current, { visibility: "hidden", yPercent: PARK });
      });
      frames.current = raf2;
    });
    frames.current = raf1;

    return () => {
      cancelAnimationFrame(frames.current);
      reveal?.kill();
    };
  }, [pathname]);

  /* A stalled navigation must never leave the page locked under the curtain. */
  useEffect(() => {
    const release = () => {
      if (!target.current) return;
      target.current = null;
      lenisStore.current?.start();
      gsap.set(panel.current, { visibility: "hidden", yPercent: 100 });
    };
    window.addEventListener("pagehide", release);
    return () => window.removeEventListener("pagehide", release);
  }, []);

  return (
    <NavigateContext.Provider value={navigate}>
      {children}

      <div
        aria-hidden="true"
        className="curtain pointer-events-none fixed inset-0 z-[120] overflow-hidden"
      >
        {/* No CSS transform here: a `translate-y-full` class would stack on top
            of gsap's yPercent and park the curtain a full screen too low. */}
        <div
          ref={panel}
          className="curtain-panel invisible absolute inset-0 bg-ink"
        >
          {/* Heights must stay equal to LIP_VH — the travel distance is
              derived from them. */}
          <div
            ref={topLip}
            className="absolute inset-x-0 bottom-full origin-bottom rounded-t-[50%] bg-ink"
            style={{ height: `${LIP_VH}vh` }}
          />
          <div
            ref={bottomLip}
            className="absolute inset-x-0 top-full origin-top rounded-b-[50%] bg-ink"
            style={{ height: `${LIP_VH}vh` }}
          />
          <p
            ref={label}
            className="absolute inset-0 grid place-items-center text-lead text-paper opacity-0"
          >
            <span className="flex items-center gap-3">
              <span className="inline-block size-2 rounded-full bg-paper" />
              {labelText}
            </span>
          </p>
        </div>
      </div>
    </NavigateContext.Provider>
  );
}
