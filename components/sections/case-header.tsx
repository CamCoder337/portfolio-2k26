"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { CaseStudy, Project } from "@/lib/work";
import { Media } from "@/components/ui/media";
import { PillButton } from "@/components/ui/buttons";
import { ArrowUpRight } from "@/components/ui/icons";
import { enterDelay } from "@/lib/intro-state";
import { TopBar } from "@/components/sections/top-bar";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CaseHeader({
  project,
  study,
}: {
  project: Project;
  study?: CaseStudy;
}) {
  const root = useRef<HTMLElement>(null);
  const cover = study?.cover ?? project.thumb;

  useGSAP(
    () => {
      const delay = enterDelay();

      gsap.to(".case-title", {
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay,
      });

      gsap.fromTo(
        ".case-meta > *",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          delay: delay + 0.25,
        },
      );

      gsap.to(".case-cover-image", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-cover",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <header ref={root} className="relative">
      <div className="shell pt-[clamp(9rem,18vw,15rem)] pb-[clamp(2rem,5vw,4rem)]">
        <h1 className="mask-line block text-[clamp(3rem,10vw,9rem)] leading-none">
          <span className="case-title block translate-y-[120%] will-change-transform">
            {project.title}
          </span>
        </h1>

        <div className="case-meta mt-[clamp(2.5rem,6vw,5rem)] grid gap-8 border-t border-hair pt-8 md:grid-cols-4">
          <div>
            <p className="eyebrow mb-2">Role / Services</p>
            <p>{study?.services ?? project.discipline}</p>
          </div>
          {study?.credits && (
            <div>
              <p className="eyebrow mb-2">Credits</p>
              <p>{study.credits}</p>
            </div>
          )}
          <div>
            <p className="eyebrow mb-2">Location &amp; year</p>
            <p>
              {project.country} © {project.year}
            </p>
          </div>
          {study?.liveUrl && (
            <div className="flex items-start md:justify-end">
              <PillButton href={study.liveUrl} external>
                <span className="inline-flex items-center gap-2">
                  Live site
                  <ArrowUpRight className="size-2.5" />
                </span>
              </PillButton>
            </div>
          )}
        </div>
      </div>

      <div
        className="case-cover relative aspect-[16/9] w-full overflow-hidden"
        style={{ backgroundColor: project.tint }}
      >
        <div className="case-cover-image absolute inset-x-0 -top-[10%] h-[120%]">
          <Media src={cover} alt={project.title} sizes="100vw" priority />
        </div>
        {study?.logo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={study.logo}
            alt=""
            className="absolute inset-0 m-auto w-[40%] max-w-md"
          />
        )}
      </div>

      <TopBar />
    </header>
  );
}
