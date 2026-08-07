"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type MediaProps = {
  src: string;
  alt?: string;
  video?: boolean;
  tint?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Still shown before playback, and left in place if the codec is refused. */
  poster?: string;
  /** Object-fit utilities. Responsive variants are allowed. */
  fit?: string;
};

/**
 * Fills its positioned parent with an image or a muted looping video.
 * Videos only play while on screen, matching the original's lazy behaviour.
 */
export function Media({
  src,
  alt = "",
  video = false,
  tint,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  poster,
  fit = "object-cover",
}: MediaProps) {
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

  if (video) {
    return (
      <video
        ref={ref}
        src={src}
        poster={poster}
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
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`${fit} ${className}`}
      style={tint ? { backgroundColor: tint } : undefined}
    />
  );
}
