"use client";

import { navLinks, site } from "@/lib/site";
import { UnderlineLink } from "@/components/ui/buttons";
import { Magnetic } from "@/components/ui/magnetic";
import { TransitionLink } from "@/components/ui/transition-link";

/**
 * Credit and inline nav sitting on top of a page header.
 *
 * Rendered *inside* the header, as the last child, and positioned absolutely
 * with `z-index: auto` on purpose:
 *  - a z-index or `position: fixed` would make it a stacking context, and
 *    mix-blend-difference would then blend against an empty backdrop, leaving
 *    the text white and invisible on light pages;
 *  - coming last in DOM order keeps it above sibling absolute layers such as
 *    the hero backdrop, without needing one.
 */
export function TopBar() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0">
      <div className="shell flex items-start justify-between py-8 text-body text-paper mix-blend-difference">
        <Magnetic strength={16}>
          <TransitionLink
            href="/"
            className="group pointer-events-auto flex items-baseline gap-2 whitespace-nowrap"
          >
            <span className="text-[0.7em]">©</span>
            <span>Code by {site.name.split(" ")[0]}</span>
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
      </div>
    </div>
  );
}
