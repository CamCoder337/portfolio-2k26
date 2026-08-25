"use client";

import { navLinks, site } from "@/lib/site";
import { UnderlineLink } from "@/components/ui/buttons";
import { Magnetic } from "@/components/ui/magnetic";
import { TransitionLink } from "@/components/ui/transition-link";
import { useMenu } from "@/components/providers/menu";

/**
 * Credit and inline nav sitting on top of a page header.
 *
 * Rendered *inside* the header, as the last child, and positioned absolutely
 * with `z-index: auto` on purpose: coming last in DOM order keeps it above
 * sibling absolute layers such as the hero backdrop without needing one.
 *
 * The colour is themed, not blended. The reference sets the bar to solid white
 * over its dark headers (home, contact) and to ink over the light ones (work,
 * about, case studies) — measured at rgb(255,255,255) and rgb(28,29,32), with
 * `mix-blend-mode: normal` throughout. Blending instead of theming turned the
 * white text into rgb(106,102,98) against the hero's grey canvas.
 */
export function TopBar({ dark = false }: { dark?: boolean }) {
  const { open, toggle } = useMenu();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0">
      <div
        className={`shell flex items-start justify-between py-8 text-body ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        <Magnetic strength={16}>
          <TransitionLink
            href="/"
            className="group pointer-events-auto flex items-baseline gap-2 whitespace-nowrap"
          >
            <span className="text-[0.7em]">©</span>
            <span>
              {site.name.split(" ")[0]}
            </span>
            {/* Surname slides out from behind the first name on hover. */}
            <span className="inline-block max-w-0 overflow-hidden transition-[max-width] duration-500 ease-[var(--ease-out-expo)] group-hover:max-w-[9ch]">
              {site.name.split(" ")[1]}
            </span>
          </TransitionLink>
        </Magnetic>

        <nav className="pointer-events-auto mr-24 hidden items-center gap-10 md:flex">
          {navLinks.slice(1).map((link) => (
            <UnderlineLink key={link.href} href={link.href}>
              {link.label}
            </UnderlineLink>
          ))}
        </nav>

        {/* Below md the reference swaps the inline links for a single "Menu"
            trigger; the round burger only turns up once you have scrolled. */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="pointer-events-auto flex items-center gap-2 md:hidden"
        >
          <span className="inline-block size-1.5 rounded-full bg-current" />
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </div>
  );
}
