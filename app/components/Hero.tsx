"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current?.querySelectorAll(".title-line") || [],
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#fff",
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(222, 106, 8, 0.15) 0, transparent 50%),
          radial-gradient(at 100% 100%, rgba(0, 0, 255, 0.1) 0, transparent 50%),
          radial-gradient(at 100% 0%, rgba(222, 106, 8, 0.05) 0, transparent 50%),
          radial-gradient(at 0% 100%, rgba(0, 0, 255, 0.08) 0, transparent 50%)
        `,
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-[#0000FF]/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-[#dd5608]/10 blur-3xl" />

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-6 bg-transparent">
        {/* Logo */}
        <div className="w-10 h-10 rounded-full bg-black overflow-hidden flex items-center justify-center">
          <span className="text-white text-xs font-bold">CD</span>
        </div>

        {/* Status Badge + CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dd5608]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
              Available for freelance
            </span>
          </div>
          <button
            className="bg-[#dd5608] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider"
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Hire Me
          </button>
        </div>
      </header>

      {/* Side text - Left */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden lg:block">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30">
          Scroll to Explore — 2024 Portfolio
        </p>
      </div>

      {/* Side text - Right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30">
          Creative Software Engineer
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="w-full flex flex-col items-center justify-center">
          <h1
            ref={titleRef}
            className="text-center select-none"
            style={{
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
            }}
          >
            <span className="title-line block text-[#181311] text-[72px] sm:text-[120px] font-bold">
              CREATIVE
            </span>
            <span className="title-line block text-[#dd5608] text-[72px] sm:text-[120px] font-bold italic">
              DEV
            </span>
          </h1>

          <div className="mt-8 max-w-[280px]">
            <p
              ref={subtitleRef}
              className="text-[#181311] text-sm font-medium leading-relaxed text-center opacity-80"
            >
              Crafting high-end digital experiences through code, motion, and
              kinetic typography.
            </p>
          </div>
        </div>
      </main>

      {/* Bottom padding for dock */}
      <div className="h-28 shrink-0" />
    </section>
  );
}
