"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site, socialLinks } from "@/lib/site";
import type { Project } from "@/lib/work";
import { ArrowUpRight } from "@/components/ui/icons";
import { PillButton, RoundButton, UnderlineLink } from "@/components/ui/buttons";
import { Media } from "@/components/ui/media";
import { TransitionLink } from "@/components/ui/transition-link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Default footer: the "Let's work together" call to action. */
export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-parallax",
        { yPercent: -14 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-ink text-paper">
      <div className="footer-parallax pt-[clamp(4rem,9vw,8rem)] pb-12">
        <div className="shell">
          <div className="relative flex items-center gap-6">
            <h2 className="flex flex-wrap items-center gap-x-6 gap-y-2 text-title">
              {/* 0.85em matches the reference's 75px portrait against its
                  88.2px headline. */}
              <Image
                src={site.avatar}
                alt=""
                width={150}
                height={150}
                className="size-[0.85em] shrink-0 rounded-full object-cover"
              />
              <span>Let&rsquo;s work</span>
              <span>together</span>
            </h2>
            <ArrowUpRight className="size-4 shrink-0 rotate-[15deg]" />
          </div>

          {/* Margins clear half the button either side of the rule: the
              reference leaves 76px above it on a phone and 95px on desktop,
              against a half-button of 72 and 86.5. Anything tighter and the
              button lands on the headline. */}
          <div className="relative mt-[clamp(5.5rem,7vw,6.5rem)] border-t border-hair-light pt-28 md:pt-10">
            {/* The reference centres this button exactly on the rule — measured
                dead on at 390px and within half a pixel at 1440px — and insets
                it from the right edge rather than sitting flush. */}
            <div className="absolute top-0 right-7 -translate-y-1/2 md:right-[5.4rem]">
              <RoundButton href="/contact">Get in touch</RoundButton>
            </div>

            <div className="flex flex-wrap gap-4">
              <PillButton href={`mailto:${site.email}`} dark>
                {site.email}
              </PillButton>
              <PillButton href={site.phoneHref} dark>
                {site.phone}
              </PillButton>
            </div>
          </div>
        </div>

        <FooterMeta className="shell mt-[clamp(4rem,8vw,7rem)]" />
      </div>
    </footer>
  );
}

/** Case-study footer: next project teaser plus the index link. */
export function CaseFooter({
  next,
  projectCount,
}: {
  next: Project;
  projectCount: number;
}) {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="shell pt-[clamp(4rem,9vw,8rem)] pb-12">
        <p className="eyebrow mb-6 text-center">Next case</p>

        <TransitionLink
          href={`/work/${next.slug}`}
          className="group mx-auto block w-fit text-center"
        >
          <h2 className="text-[clamp(2.5rem,7vw,6rem)] leading-none transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
            {next.title}
          </h2>
          <div
            className="relative mx-auto mt-8 aspect-[16/9] w-full max-w-3xl overflow-hidden"
            style={{ backgroundColor: next.tint }}
          >
            <Media
              src={next.thumb}
              alt={next.title}
              sizes="(max-width: 768px) 100vw, 768px"
              tint={next.tint}
            />
          </div>
        </TransitionLink>

        <div className="mt-12 flex justify-center">
          <PillButton href="/work" count={projectCount} dark>
            All work
          </PillButton>
        </div>

        <FooterMeta className="mt-[clamp(4rem,8vw,7rem)]" />
      </div>
    </footer>
  );
}

/** Version / local time / socials strip shared by every footer variant. */
export function FooterMeta({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-8 text-body sm:grid-cols-3 ${className}`}>
      <div>
        <p className="eyebrow mb-2">Version</p>
        <p>{site.edition}</p>
      </div>
      <div>
        <p className="eyebrow mb-2">Local time</p>
        <LocalTime />
      </div>
      <div>
        <p className="eyebrow mb-2">Socials</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 md:pr-24">
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
  );
}

/** Rendered after mount so the server HTML never disagrees on the clock. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: site.timezone,
          timeZoneName: "shortOffset",
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return <p suppressHydrationWarning>{time ?? "—"}</p>;
}
