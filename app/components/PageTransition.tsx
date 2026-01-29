"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;

    const tl = gsap.timeline();

    // Entry animation
    tl.set(overlayRef.current, { scaleY: 0, transformOrigin: "bottom" })
      .set(containerRef.current, { opacity: 0, y: 20 })
      .to(overlayRef.current, {
        scaleY: 1,
        duration: 0.4,
        ease: "power3.inOut",
      })
      .add(() => setDisplayChildren(children))
      .to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.4,
        ease: "power3.inOut",
      })
      .to(
        containerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [pathname, children]);

  return (
    <>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-[#dd5608] pointer-events-none"
        style={{ transform: "scaleY(0)" }}
      />

      {/* Page content */}
      <div ref={containerRef} className="w-full min-h-screen">
        {displayChildren}
      </div>
    </>
  );
}
