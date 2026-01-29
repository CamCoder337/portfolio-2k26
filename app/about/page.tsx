"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = {
  backend: ["Python", "Go", "Rust", "Node.js", "PostgreSQL", "MongoDB", "Redis"],
  frontend: ["React", "Next.js", "TypeScript", "GSAP", "Tailwind"],
  devops: ["Docker", "Kubernetes", "AWS", "GCP"],
};

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    alt: "Coding setup",
    caption: "Where the magic happens",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    alt: "Mountains",
    caption: "Finding inspiration",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
    alt: "Team work",
    caption: "Collaboration matters",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&h=400&fit=crop",
    alt: "Coffee",
    caption: "Fuel for code",
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      // Bio animation
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
          },
        }
      );

      // Gallery items animation
      const galleryItems = galleryRef.current?.querySelectorAll(".gallery-item");
      if (galleryItems) {
        gsap.fromTo(
          galleryItems,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[var(--bg-warm)] text-[var(--text-primary)] font-sans transition-colors duration-500"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-[var(--bg-warm)]/80 backdrop-blur-md transition-colors duration-500">
        <Link
          href="/"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-base)]/50 border border-[var(--border-light)] hover:bg-[var(--bg-base)] transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-muted)]">
          About Me
        </span>
        <div className="w-12" />
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-4 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div ref={headerRef} className="mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Title & Description */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#dd5608] animate-pulse" />
              <span className="text-sm font-medium opacity-70">
                Available for work
              </span>
            </div>

            <h1
              className="text-[clamp(2.5rem,10vw,5rem)] font-bold leading-[0.9] tracking-tight mb-8"
            >
              I&apos;M{" "}
              <span className="bg-gradient-to-r from-[#dd5608] to-[#0000FF] bg-clip-text text-transparent">
                CAMCODER
              </span>
            </h1>

            <p className="text-lg leading-relaxed opacity-80 max-w-2xl">
              Backend engineer who believes great software deserves great
              interfaces. I architect APIs, optimize databases, and occasionally
              craft the pixels that sit on top.
            </p>
          </div>

          {/* Right: Profile Image */}
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#dd5608]/20 flex-shrink-0 self-center md:self-auto">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="Profile"
              width={224}
              height={224}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Bio Section */}
        <div ref={bioRef} className="mb-20">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-6">
            About
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="leading-relaxed opacity-80">
                Specializing in scalable backend systems. Obsessed with developer
                experience, API design, and proving that engineers can have taste.
              </p>
              <p className="leading-relaxed opacity-80">
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open source, or hiking in nature to
                find fresh perspectives.
              </p>
            </div>
            <div className="space-y-4">
              <p className="leading-relaxed opacity-80">
                I believe in writing clean, maintainable code that scales. Every
                project is an opportunity to push boundaries and create something
                meaningful.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-6">
            Tech Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold mb-4 text-[#dd5608]">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.backend.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[var(--bg-muted)] border border-[var(--border-light)] transition-colors duration-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4 text-[#0000FF]">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.frontend.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[var(--bg-muted)] border border-[var(--border-light)] transition-colors duration-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4 opacity-60">DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.devops.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[var(--bg-muted)] border border-[var(--border-light)] transition-colors duration-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div ref={galleryRef}>
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-6">
            Life & Interests
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="gallery-item group relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setActivePhoto(photo.id)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-4 left-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm opacity-40 mt-4">
            Click to enlarge
          </p>
        </div>
      </main>

      {/* Photo Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setActivePhoto(null)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={photos.find((p) => p.id === activePhoto)?.src || ""}
              alt={photos.find((p) => p.id === activePhoto)?.alt || ""}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

    </div>
  );
}
