"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/icons";
import { Media } from "@/components/ui/media";
import { Globe } from "@/components/ui/globe";
import { enterDelay } from "@/lib/intro-state";
import { TopBar } from "@/components/sections/top-bar";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Both parallax layers share one ScrollTrigger instead of two measuring
         the same element, and run on the compositor via force3D. */
      const drift = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      /* Background drifts slower than the page — the -3 scroll speed. */
      drift
        .to(".hero-backdrop", { yPercent: 14, ease: "none", force3D: true }, 0)
        .to(".hero-drift", { yPercent: -45, ease: "none", force3D: true }, 0);

      /* Wait out the preloader on a cold load, but not when the home page is
         reached through a client-side transition. */
      gsap.fromTo(
        ".hero-enter",
        { y: "50vh" },
        {
          y: 0,
          duration: 1.2,
          stagger: 0.06,
          ease: "power3.out",
          force3D: true,
          delay: enterDelay(),
        },
      );

      /* Endless name ticker. Two copies is the minimum for a seamless -50%
         loop; four doubled the amount of 15vw text repainted every frame. */
      const marquee = gsap.to(".hero-marquee-track", {
        xPercent: -50,
        duration: 26,
        ease: "none",
        repeat: -1,
        force3D: true,
      });

      /* Scrolling steers the ticker: it runs backwards while scrolling up and
         speeds up with the scroll velocity, then settles back to its idle
         drift. Both copies are identical, so reversing stays seamless. */
      let direction = 1;

      const velocityTrigger = ScrollTrigger.create({
        onUpdate: (self) => {
          direction = self.direction;
          const boost = gsap.utils.clamp(
            1,
            5,
            Math.abs(self.getVelocity()) / 500,
          );
          gsap.to(marquee, {
            timeScale: direction * boost,
            duration: 0.25,
            overwrite: true,
          });
        },
      });

      const settle = () =>
        gsap.to(marquee, {
          timeScale: direction,
          duration: 0.9,
          overwrite: true,
        });
      ScrollTrigger.addEventListener("scrollEnd", settle);

      return () => {
        ScrollTrigger.removeEventListener("scrollEnd", settle);
        velocityTrigger.kill();
      };
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      className="relative h-svh overflow-hidden bg-hero-canvas text-paper"
    >
      {/* The reference does not stretch the portrait across the viewport: the
          image is fitted to the container height and centred, leaving the
          stone background exposed either side. object-cover would crop and
          zoom it. Narrow screens still cover, or it would letterbox. */}
      <div className="hero-backdrop absolute inset-x-0 -top-[11.5%] h-[126.5%]">
        <Media
          src="/media/home/hero.png"
          alt=""
          priority
          sizes="100vw"
          fit="object-cover md:object-contain"
        />
      </div>

      {/* Location plaque. Below md the reference drops the plaque entirely and
          keeps only the globe, tucked into the bottom right corner — the full
          256px plaque at mid height collides with the role text on a phone. */}
      <div className="hero-enter absolute right-4 bottom-6 left-auto md:top-[44%] md:right-auto md:bottom-auto md:left-0">
        <div className="relative flex items-center rounded-r-full md:h-[6.5rem] md:w-[16rem] md:bg-ink md:pl-11">
          <p className="hidden text-[1.08rem] leading-[1.2] text-paper md:block">
            Located
            <br />
            in
            <br />
            {site.location}
          </p>
          {/* 67px on a phone — the reference's 96px box holds a disc inset by
              14.4px, not a 96px disc. */}
          <Globe className="size-[4.2rem] md:absolute md:right-[0.95rem] md:size-[4.55rem]" />
        </div>
      </div>

      {/* Role: bottom left on a phone, right hand column from md up. */}
      <div className="hero-drift absolute inset-x-0 bottom-[6%] md:top-[36%] md:bottom-auto">
        <div className="hero-enter shell grid grid-cols-12">
          {/* Four columns, not three: "Software & QA Engineer" is longer than
              the reference's role line and wrapped onto a third line. */}
          <div className="col-span-9 md:col-span-4 md:col-start-9">
            <ArrowUpRight className="mb-6 size-4 rotate-90 md:mb-14" />
            {/* The page's only h1. It sits here rather than on the name ticker
                below because "Freelance Software & QA Engineer" says what the
                page is about, where a name and an em dash say nothing. Purely
                a tag swap — the type scale is unchanged. */}
            <h1 className="text-[clamp(1.5rem,2.3vw,2.3rem)] leading-[1.4]">
              {site.role.split(" ")[0]}
              <br />
              Software &amp; QA Engineer
            </h1>
          </div>
        </div>
      </div>

      {/* Name ticker along the bottom edge.
          No overflow-hidden here: the header already clips horizontally, and
          clipping at the line box sliced the descenders off g, p and y. The
          0.25em bottom padding matches the reference's own descender room. */}
      <div className="hero-drift absolute inset-x-0 bottom-[26%] md:bottom-[4%]">
        <div className="hero-enter">
          <div className="hero-marquee-track flex w-max pb-[0.25em] will-change-transform">
            {/* Two copies so the loop can wrap seamlessly, which is exactly why
                these must not be headings: the marquee shipped two identical
                h1 elements into the HTML. They are typographic, not semantic —
                the real h1 is the role line above. */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                aria-hidden={i === 1}
                className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em] text-display whitespace-nowrap"
              >
                <span>{site.name}</span>
                <span>—</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last child so it paints above the absolute backdrop layer. */}
      <TopBar />
    </header>
  );
}
