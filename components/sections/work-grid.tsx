"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/lib/site";
import { TransitionLink } from "@/components/ui/transition-link";
import { Media } from "@/components/ui/media";

type WorkGridProps = {
  items: Project[];
  /** Work index shows the country column; the home teaser does not. */
  detailed?: boolean;
  heading?: string;
};

export function WorkGrid({
  items,
  detailed = false,
  heading = "Recent work",
}: WorkGridProps) {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const moveX = useRef<((v: number) => void) | null>(null);
  const moveY = useRef<((v: number) => void) | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      moveX.current = gsap.quickTo(preview.current, "x", {
        duration: 0.7,
        ease: "power3.out",
      });
      moveY.current = gsap.quickTo(preview.current, "y", {
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      gsap.to(preview.current, {
        scale: active === null ? 0 : 1,
        autoAlpha: active === null ? 0 : 1,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { dependencies: [active], scope: root },
  );

  const track = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = root.current?.getBoundingClientRect();
    if (!bounds) return;
    moveX.current?.(event.clientX - bounds.left);
    moveY.current?.(event.clientY - bounds.top);
  };

  return (
    <section
      ref={root}
      onMouseMove={track}
      className="shell relative hidden pb-[clamp(3rem,6vw,6rem)] md:block"
    >
      {heading && <p className="eyebrow mb-6">{heading}</p>}

      <ul className="border-t border-hair">
        {items.map((project, i) => (
          <li key={project.slug} className="border-b border-hair">
            <TransitionLink
              href={`/work/${project.slug}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group flex items-baseline gap-6 py-[clamp(1.5rem,2.6vw,2.6rem)]"
            >
              <h3 className="flex-1 text-item transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[clamp(0.5rem,2vw,2.5rem)]">
                {project.title}
              </h3>
              {detailed && (
                <p className="hidden w-48 text-body text-muted lg:block">
                  {project.country}
                </p>
              )}
              <p className="text-body text-ink-soft transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-x-[clamp(0.5rem,2vw,2.5rem)]">
                {project.discipline}
              </p>
              {detailed && (
                <p className="w-16 text-right text-body text-muted">
                  {project.year}
                </p>
              )}
            </TransitionLink>
          </li>
        ))}
      </ul>

      {/* Cursor-tracked preview */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 z-20 -mt-[7.5rem] -ml-[10rem] hidden h-[15rem] w-[20rem] scale-0 overflow-hidden md:block"
      >
        {items.map((project, i) => (
          <div
            key={project.slug}
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              backgroundColor: project.tint,
              opacity: active === i ? 1 : 0,
            }}
          >
            <Media
              src={project.thumb}
              alt={project.title}
              sizes="320px"
              tint={project.tint}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
