"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type CommonProps = {
  src: string;
  tint?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Object-fit utilities. Responsive variants are allowed. */
  fit?: string;
};

/**
 * Two shapes, not one with an optional `alt`.
 *
 * `alt` used to default to an empty string, so a forgotten alt quietly
 * declared the image decorative — around a dozen images had made that choice
 * without anyone taking it. Splitting the type puts the decision at the call
 * site, where the person who knows what the image shows is standing. Video
 * has no alt to give, so the branch does not offer one.
 */
type MediaProps =
  | (CommonProps & { video?: false; alt: string; poster?: never })
  | (CommonProps & { video: true; poster?: string; alt?: never });

/**
 * Fills its positioned parent with an image or a muted looping video.
 * Videos only play while on screen, matching the original's lazy behaviour.
 */
export function Media(props: MediaProps) {
  const {
    src,
    tint,
    className = "",
    sizes = "(max-width: 768px) 100vw, 50vw",
    priority = false,
    fit = "object-cover",
  } = props;

  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void node.play().catch(() => {});
        else node.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (props.video) {
    return (
      <video
        ref={ref}
        src={src}
        poster={props.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full ${fit} ${className}`}
        style={tint ? { backgroundColor: tint } : undefined}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={props.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`${fit} ${className}`}
      style={tint ? { backgroundColor: tint } : undefined}
    />
  );
}
