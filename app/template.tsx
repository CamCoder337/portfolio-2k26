"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// Map pathname to readable page title
function getPageTitle(pathname: string): string {
  const routes: Record<string, string> = {
    "/": "HOME",
    "/about": "ABOUT",
    "/projects": "PROJECTS",
    "/contact": "CONTACT",
  };
  return routes[pathname] || "PAGE";
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current || !titleRef.current) return;

    const tl = gsap.timeline();

    // Entry animation with page title
    tl.set(containerRef.current, { opacity: 0, y: 20 })
      .set(titleRef.current, { opacity: 0, y: 20 })
      // Overlay scales up from bottom
      .to(overlayRef.current, {
        scaleY: 1,
        duration: 0.5,
        ease: "power2.inOut",
      })
      // Title fades in
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      // Brief hold
      .to({}, { duration: 0.2 })
      // Title fades out
      .to(titleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: "power2.in",
      })
      // Overlay scales down from top
      .to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.5,
        ease: "power2.inOut",
      }, "-=0.15")
      // Content fades in
      .to(
        containerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.25"
      );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      {/* Transition overlay with page title */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none origin-bottom"
        style={{
          transform: "scaleY(0)",
          backgroundColor: "#dd5608",
        }}
      >
        <span
          ref={titleRef}
          className="text-white text-4xl md:text-5xl font-bold tracking-[0.3em] uppercase"
          style={{ opacity: 0 }}
        >
          {pageTitle}
        </span>
      </div>

      {/* Page content */}
      <div ref={containerRef} className="w-full">
        {children}
      </div>
    </>
  );
}
