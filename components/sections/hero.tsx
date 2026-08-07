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
      className="relative h-svh overflow-hidden bg-muted text-paper"
    >
      {/* The reference does not stretch the portrait across the viewport: the
          image is fitted to the container height and centred, leaving the
          stone background exposed either side. object-cover would crop and
          zoom it. Narrow screens still cover, or it would letterbox. */}
      <div className="hero-backdrop absolute inset-x-0 -top-[10%] h-[120%]">
        <Media
          src="/media/home/hero.jpg"
          alt=""
          priority
          sizes="100vw"
          fit="object-cover md:object-contain"
        />
      </div>

      {/* Location plaque: flush to the left edge, roughly at mid height */}
      <div className="hero-enter absolute top-[44%] left-0">
        <div className="relative flex h-[6.5rem] w-[16rem] items-center rounded-r-full bg-ink pl-11">
          <p className="text-[1.08rem] leading-[1.2] text-paper">
            {site.location.split(" ").slice(0, 1)}
            <br />
            in the
            <br />
            Netherlands
          </p>
          <Globe className="absolute right-[0.95rem] size-[4.55rem]" />
        </div>
      </div>

      {/* Role, right hand side */}
      <div className="hero-drift absolute inset-x-0 top-[36%]">
        <div className="hero-enter shell grid grid-cols-12">
          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <ArrowUpRight className="mb-14 size-4 rotate-90" />
            <h2 className="text-[clamp(1.5rem,2.3vw,2.3rem)] leading-[1.4]">
              {site.role.split(" ")[0]}
              <br />
              Designer &amp; Developer
            </h2>
          </div>
        </div>
      </div>

      {/* Name ticker along the bottom edge.
          No overflow-hidden here: the header already clips horizontally, and
          clipping at the line box sliced the descenders off g, p and y. The
          0.25em bottom padding matches the reference's own descender room. */}
      <div className="hero-drift absolute inset-x-0 bottom-[4%]">
        <div className="hero-enter">
          <div className="hero-marquee-track flex w-max pb-[0.25em] will-change-transform">
            {Array.from({ length: 2 }).map((_, i) => (
              <h1
                key={i}
                className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em] text-display whitespace-nowrap"
              >
                <span>{site.name}</span>
                <span>—</span>
              </h1>
            ))}
          </div>
        </div>
      </div>

      {/* Last child so it paints above the absolute backdrop layer. */}
      <TopBar />
    </header>
  );
}
