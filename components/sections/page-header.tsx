"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/site";
import { enterDelay } from "@/lib/intro-state";
import { TopBar } from "@/components/sections/top-bar";

type PageHeaderProps = {
  /** One entry per rendered line. */
  lines: string[];
  dark?: boolean;
  /** Sets the round portrait inline at the start of the first line. */
  avatar?: boolean;
  children?: React.ReactNode;
};

/**
 * Oversized page title that unmasks line by line, as on /work and /about.
 */
export function PageHeader({
  lines,
  dark = false,
  avatar = false,
  children,
}: PageHeaderProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".page-header-line", {
        y: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        delay: enterDelay(),
      });
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      className={`relative pt-[clamp(9rem,18vw,16rem)] pb-[clamp(3rem,7vw,7rem)] ${
        dark ? "bg-ink text-paper" : ""
      }`}
    >
      <div className="shell">
        <h1 className="text-[clamp(2.75rem,7.5vw,7rem)] leading-[1.02]">
          {lines.map((line, i) => (
            <span key={i} className="mask-line block">
              <span className="page-header-line block translate-y-[120%] will-change-transform">
                {i === 0 && avatar && (
                  /* Sits on the baseline, so it stays inside the line box the
                     mask clips to. */
                  <Image
                    src={site.avatar}
                    alt=""
                    width={150}
                    height={150}
                    className="mr-[0.15em] inline-block size-[0.9em] rounded-full object-cover"
                  />
                )}
                {line}
              </span>
            </span>
          ))}
        </h1>
        {children}
      </div>

      <TopBar />
    </header>
  );
}
