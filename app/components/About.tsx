"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const backendStack = [
  { name: "Python", category: "language" },
  { name: "Go", category: "language" },
  { name: "Rust", category: "language" },
  { name: "Node.js", category: "language" },
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Redis", category: "database" },
  { name: "Docker", category: "infra" },
  { name: "Kubernetes", category: "infra" },
  { name: "AWS", category: "infra" },
  { name: "REST", category: "api" },
  { name: "GraphQL", category: "api" },
  { name: "gRPC", category: "api" },
];

const frontendStack = [
  { name: "React", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "TypeScript", category: "language" },
  { name: "GSAP", category: "animation" },
  { name: "Tailwind", category: "styling" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section bg-[var(--bg-subtle)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="section-header">
          <span className="label-md block mb-4">About Me</span>
          <h2 className="kinetic-headline">
            Backend Engineer
            <br />
            <span className="text-[var(--text-muted)]">with creative flair</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Bio Card - Large */}
          <div
            ref={setCardRef(0)}
            className="bento-card md:col-span-2 lg:row-span-2 "
          >
            <span className="label-sm block mb-6">Bio</span>
            <p className="body-lg mb-6">
              Backend engineer who believes great software deserves great
              interfaces. I architect APIs, optimize databases, and occasionally
              craft the pixels that sit on top.
            </p>
            <p className="body-text">
              Specializing in scalable backend systems. Obsessed with developer
              experience, API design, and proving that engineers can have taste.
            </p>
            <div className="mt-8 flex gap-3">
              <span className="tag tag-primary">Available</span>
              <span className="tag">Remote</span>
            </div>
          </div>

          {/* Backend Languages */}
          <div ref={setCardRef(1)} className="bento-card ">
            <span className="label-sm block mb-4">Languages</span>
            <div className="flex flex-wrap gap-2">
              {backendStack
                .filter((t) => t.category === "language")
                .map((tech) => (
                  <span key={tech.name} className="tag">
                    {tech.name}
                  </span>
                ))}
            </div>
          </div>

          {/* Databases */}
          <div ref={setCardRef(2)} className="bento-card ">
            <span className="label-sm block mb-4">Databases</span>
            <div className="flex flex-wrap gap-2">
              {backendStack
                .filter((t) => t.category === "database")
                .map((tech) => (
                  <span key={tech.name} className="tag">
                    {tech.name}
                  </span>
                ))}
            </div>
          </div>

          {/* Infrastructure */}
          <div ref={setCardRef(3)} className="bento-card ">
            <span className="label-sm block mb-4">Infrastructure</span>
            <div className="flex flex-wrap gap-2">
              {backendStack
                .filter((t) => t.category === "infra")
                .map((tech) => (
                  <span key={tech.name} className="tag">
                    {tech.name}
                  </span>
                ))}
            </div>
          </div>

          {/* APIs */}
          <div ref={setCardRef(4)} className="bento-card ">
            <span className="label-sm block mb-4">API Protocols</span>
            <div className="flex flex-wrap gap-2">
              {backendStack
                .filter((t) => t.category === "api")
                .map((tech) => (
                  <span key={tech.name} className="tag">
                    {tech.name}
                  </span>
                ))}
            </div>
          </div>

          {/* Frontend Stack - Wider */}
          <div
            ref={setCardRef(5)}
            className="bento-card md:col-span-2 "
          >
            <span className="label-sm block mb-4">Frontend Skills</span>
            <p className="body-text mb-4 text-[var(--text-muted)]">
              Because backend devs can have taste too.
            </p>
            <div className="flex flex-wrap gap-2">
              {frontendStack.map((tech) => (
                <span key={tech.name} className="tag tag-blue">
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div ref={setCardRef(6)} className="bento-card ">
            <span className="label-sm block mb-4">Experience</span>
            <div className="space-y-4">
              <div>
                <span className="kinetic-subhead block">5+</span>
                <span className="body-text text-[var(--text-muted)]">
                  Years Building
                </span>
              </div>
              <div>
                <span className="kinetic-subhead block">50+</span>
                <span className="body-text text-[var(--text-muted)]">
                  Projects Delivered
                </span>
              </div>
            </div>
          </div>

          {/* Philosophy Card */}
          <div ref={setCardRef(7)} className="bento-card ">
            <span className="label-sm block mb-4">Philosophy</span>
            <p className="body-text italic">
              &ldquo;Ship fast, iterate faster, never sacrifice on
              quality.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
