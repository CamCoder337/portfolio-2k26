"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "API Gateway Platform",
    description:
      "High-performance API gateway handling 10M+ requests/day with intelligent rate limiting and caching.",
    tags: ["Go", "Redis", "Kubernetes", "gRPC"],
    color: "#dd5608",
    year: "2024",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Real-time Analytics Engine",
    description:
      "Stream processing pipeline for real-time data analytics with sub-second latency.",
    tags: ["Rust", "Kafka", "ClickHouse", "Docker"],
    color: "#0000FF",
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Microservices Orchestrator",
    description:
      "Custom orchestration layer for managing 50+ microservices with auto-scaling and health monitoring.",
    tags: ["Python", "Kubernetes", "Prometheus", "GraphQL"],
    color: "#dd5608",
    year: "2023",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "E-commerce Backend",
    description:
      "Scalable backend infrastructure supporting millions of transactions with 99.99% uptime.",
    tags: ["Node.js", "PostgreSQL", "AWS", "REST"],
    color: "#0000FF",
    year: "2023",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Developer Portal",
    description:
      "Full-stack developer portal with API documentation, SDK generation, and usage analytics.",
    tags: ["TypeScript", "Next.js", "MongoDB", "Docker"],
    color: "#dd5608",
    year: "2023",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      // Horizontal scroll animation
      const scrollWidth = container.scrollWidth - container.clientWidth;

      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen bg-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Custom cursor */}
      <div
        className={`fixed w-20 h-20 rounded-full bg-[#dd5608] text-white flex items-center justify-center text-[10px] font-bold uppercase tracking-wider pointer-events-none z-[1000] transition-transform duration-200 ${
          isHovering ? "scale-100" : "scale-0"
        }`}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0})`,
        }}
      >
        View
      </div>

      {/* Section header */}
      <div className="pt-24 pb-12 px-6 lg:px-12">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 block mb-4">
          Selected Work
        </span>
        <h2
          className="text-[#181311] font-bold"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
          }}
        >
          Projects that
          <br />
          <span className="text-[#dd5608]">matter</span>
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="flex gap-8 pl-6 lg:pl-12 pb-32"
        style={{ width: "fit-content" }}
      >
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[65vh] rounded-3xl overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${project.color}ee 0%, ${project.color}80 30%, transparent 70%)`,
                }}
              />
            </div>

            {/* Project number */}
            <span
              className="absolute top-6 right-6 text-[8rem] font-bold opacity-10 leading-none text-white"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Content */}
            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end text-white">
              {/* Year */}
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-4">
                {project.year}
              </span>

              {/* Title */}
              <h3
                className="font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm font-medium max-w-md mb-6 opacity-90 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-[10vw]" />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-2 opacity-40">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
          Scroll to explore
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </section>
  );
}
