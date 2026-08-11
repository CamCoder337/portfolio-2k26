"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { CaseStudy } from "@/lib/work";
import { Media } from "@/components/ui/media";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Alternating device / fullwidth / mobile-trio blocks of a case study. */
export function CaseBlocks({ study }: { study: CaseStudy }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* `to` from the CSS start state so a refresh cannot re-hide a block
         whose one-shot trigger has already fired. */
      gsap.utils.toArray<HTMLElement>(".case-block").forEach((block) => {
        gsap.to(block, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* `_key` rather than the index: Visual Editing overlays are keyed off it,
          and index keys make React reuse the wrong block after a reorder. */}
      {study.blocks.map((block) => {
        if (block._type === "caseFullWidth") {
          return (
            <section
              key={block._key}
              className="case-block relative aspect-[16/9] w-full translate-y-14 overflow-hidden bg-paper-mute opacity-0"
            >
              <Media src={block.videoUrl} video sizes="100vw" />
            </section>
          );
        }

        if (block._type === "caseMobileGallery") {
          return (
            <section
              key={block._key}
              className="case-block translate-y-14 py-[clamp(3rem,7vw,6rem)] opacity-0"
              style={{ backgroundColor: study.stage }}
            >
              <div className="shell grid grid-cols-3 gap-4 md:gap-10">
                {block.images.map((image) => (
                  <div
                    key={image._key}
                    className="relative aspect-[9/18.3] w-full overflow-hidden rounded-[0.3em] bg-paper-mute"
                  >
                    <Media
                      src={image.url}
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        }

        return (
          <section
            key={block._key}
            className={`case-block translate-y-14 pt-[clamp(3rem,7vw,6rem)] opacity-0 ${
              block.padBottom ? "pb-[clamp(3rem,7vw,6rem)]" : ""
            }`}
            style={{ backgroundColor: study.stage }}
          >
            <div className="shell">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.3em] bg-paper">
                <Media
                  src={block.videoUrl}
                  poster={block.poster}
                  video
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
