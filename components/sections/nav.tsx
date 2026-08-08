"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navLinks, socialLinks } from "@/lib/site";
import { UnderlineLink } from "@/components/ui/buttons";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowUpRight } from "@/components/ui/icons";
import { TransitionLink } from "@/components/ui/transition-link";
import { lenisStore } from "@/lib/lenis-store";
import { useMenu } from "@/components/providers/menu";

export function Nav() {
  /* Shared with the top bar's "Menu" button, which replaces the inline links
     on small screens. */
  const { open, toggle, close } = useMenu();
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  /* One paused timeline, played forward and reversed. Two competing tweens on
     the same targets was the source of the half-open panel. */
  useGSAP(
    () => {
      /* Written with gsap.set rather than a CSS class: gsap resolves an
         existing translateX(100%) into `x` px, so animating `xPercent`
         afterwards would never move the panel. */
      gsap.set(".nav-panel", { xPercent: 100, x: 0 });
      gsap.set(".nav-reveal", { y: 40, autoAlpha: 0 });
      gsap.set(".nav-backdrop", { autoAlpha: 0 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".nav-backdrop", { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0)
        .to(".nav-panel", { xPercent: 0, duration: 0.9, ease: "power3.inOut" }, 0)
        .to(
          ".nav-reveal",
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.055, ease: "power3.out" },
          0.35,
        );
    },
    { scope: root },
  );

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;

    if (open) {
      lenisStore.current?.stop();
      timeline.timeScale(1).play();
    } else {
      lenisStore.current?.start();
      timeline.timeScale(1.4).reverse();
    }
  }, [open]);

  /* Panel links close the menu themselves; back/forward has to be caught here. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", close);
    };
  }, [close]);

  /* The burger only exists once the header has been scrolled past. */
  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.55);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      gsap.to(".nav-burger", {
        scale: scrolled || open ? 1 : 0,
        duration: 0.6,
        ease: scrolled || open ? "back.out(1.7)" : "power3.in",
      });
    },
    { dependencies: [scrolled, open], scope: root },
  );

  return (
    <div ref={root}>
      {/* Hamburger — above the panel so it doubles as the close button.
          Held at scale 0 over the header, exactly like the reference, and
          popped in once the page has been scrolled past it. */}
      <div className="nav-burger fixed top-7 right-7 z-[105] scale-0">
        <Magnetic strength={40}>
          <button
            type="button"
            onClick={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="group relative isolate grid size-[4.4rem] place-items-center overflow-hidden rounded-full bg-ink text-paper"
          >
            {/* Accent fill drops in from above, as on the reference button. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 -translate-y-full rounded-[0_0_50%_50%] bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:rounded-none"
            />

            <span
              className={`relative block h-2.5 w-6 transition-opacity duration-300 ${
                open ? "" : "group-hover:opacity-0"
              }`}
            >
              <span
                className={`absolute inset-x-0 top-0 h-px bg-paper transition-transform duration-500 ease-[var(--ease-in-out-quart)] ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-paper transition-transform duration-500 ease-[var(--ease-in-out-quart)] ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>

            {!open && (
              <span className="absolute inset-0 grid translate-y-2 place-items-center text-[0.9rem] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Menu
              </span>
            )}
          </button>
        </Magnetic>
      </div>

      {/* Backdrop */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
        onClick={close}
        className={`nav-backdrop fixed inset-0 z-[95] bg-ink/40 ${
          open ? "" : "pointer-events-none"
        }`}
      />

      {/* Slide-in panel: dark column plus the static curved lip on its left */}
      <div
        className="nav-panel fixed top-0 right-0 z-[100] h-full w-[calc(min(100vw,33.75rem)+5.4rem)]"
        aria-hidden={!open}
      >
        <div className="absolute inset-y-0 left-0 w-[5.4rem] overflow-hidden">
          <div className="absolute top-1/2 left-0 h-[150%] w-[41.85rem] -translate-y-1/2 rounded-[50%] bg-ink" />
        </div>

        <div className="absolute inset-y-0 right-0 flex w-[min(100vw,33.75rem)] flex-col justify-between bg-ink px-10 pt-32 pb-12 text-paper">
          <div>
            <p className="nav-reveal eyebrow mb-6 border-b border-hair-light pb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href} className="nav-reveal">
                    <TransitionLink
                      href={link.href}
                      onClick={close}
                      className="group flex items-center gap-4 py-1 text-[clamp(2rem,2.9vw,2.9rem)] leading-[1.25]"
                    >
                      <span
                        className={`inline-block size-1.5 rounded-full bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                          active ? "scale-100" : "scale-0 group-hover:scale-100"
                        }`}
                      />
                      <span
                        className={`-ml-[1.375rem] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[1.375rem] ${
                          active ? "translate-x-[1.375rem]" : ""
                        }`}
                      >
                        {link.label}
                      </span>
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="nav-reveal">
            <p className="eyebrow mb-4 border-b border-hair-light pb-4">Socials</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <UnderlineLink href={social.href} external>
                    <span className="inline-flex items-center gap-1">
                      {social.label}
                      <ArrowUpRight className="size-2.5" />
                    </span>
                  </UnderlineLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
