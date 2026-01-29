"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const projects = [
  {
    id: 1,
    title: "NEURAL INTERFACE",
    subtitle: "Creative Development & Interaction Design",
    tags: ["React", "GSAP", "Node.js"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    color: "#dd5608",
  },
  {
    id: 2,
    title: "DATA CORE V2",
    subtitle: "WebGL Shader Engineering",
    tags: ["Three.js", "GLSL", "TypeScript"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "#0000FF",
  },
  {
    id: 3,
    title: "API GATEWAY",
    subtitle: "High-performance Backend Architecture",
    tags: ["Go", "Redis", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop",
    color: "#dd5608",
  },
  {
    id: 4,
    title: "ANALYTICS ENGINE",
    subtitle: "Real-time Data Processing",
    tags: ["Rust", "Kafka", "ClickHouse"],
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop",
    color: "#0000FF",
  },
  {
    id: 5,
    title: "DEV PORTAL",
    subtitle: "Full-stack Developer Experience",
    tags: ["Next.js", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    color: "#dd5608",
  },
];

export default function ProjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const scrollToProject = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, projects.length - 1)
        : Math.max(currentIndex - 1, 0);

    setCurrentIndex(newIndex);

    const gallery = galleryRef.current;
    if (gallery) {
      const card = gallery.children[newIndex] as HTMLElement;
      card?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#050505] text-white font-sans"
      onMouseMove={handleMouseMove}
    >
      {/* Custom cursor */}
      <div
        className={`fixed w-24 h-24 rounded-full bg-[#dd5608] flex flex-col items-center justify-center pointer-events-none z-[100] transition-transform duration-200 ${
          isHovering ? "scale-100" : "scale-0"
        }`}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0})`,
        }}
      >
        <span className="text-[10px] font-bold tracking-widest uppercase">
          View
        </span>
        <span className="material-symbols-outlined text-lg">arrow_outward</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">
          Case
        </span>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-[#050505]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#dd5608] rounded-full" />
          <span className="text-sm font-bold tracking-[0.2em] uppercase">
            Portfolio &apos;24
          </span>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32">
        {/* Title Section */}
        <div className="px-6 mb-8">
          <p className="text-[#dd5608] text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Selected Works
          </p>
          <h1 className="text-[clamp(2.5rem,10vw,4rem)] font-bold leading-[0.9] tracking-tight">
            KINETIC
            <br />
            <span className="text-[#dd5608] italic">PROJECTS</span>
          </h1>
        </div>

        {/* Horizontal Gallery */}
        <div
          ref={galleryRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 gap-6 pb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card relative flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] snap-center group cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Image Container */}
              <div className="relative h-[55vh] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 50vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Tech Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/20 backdrop-blur-md border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="px-2">
                <p
                  className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                  style={{ color: project.color }}
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </p>
                <h2 className="text-2xl font-bold tracking-tight mb-1">
                  {project.title}
                </h2>
                <p className="text-sm opacity-50">{project.subtitle}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="px-6 flex items-center justify-between">
          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-24 bg-white/10 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#dd5608] transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / projects.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">
              Scroll to explore
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scrollToProject("prev")}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#dd5608] hover:border-[#dd5608] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-white/10"
            >
              <span className="material-symbols-outlined text-xl">west</span>
            </button>
            <button
              onClick={() => scrollToProject("next")}
              disabled={currentIndex === projects.length - 1}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#dd5608] hover:text-white transition-colors disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-xl">east</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Contact CTA */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
        <Link
          href="/contact"
          className="flex h-14 items-center justify-center rounded-full bg-[#dd5608] text-white shadow-xl shadow-[#dd5608]/30 gap-2 font-bold text-sm uppercase tracking-[0.1em] px-8 hover:scale-105 transition-transform"
        >
          <span>Contact</span>
          <span className="material-symbols-outlined text-lg">mail</span>
        </Link>
      </div>

    </div>
  );
}
