"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────── */

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

interface EducationEntry {
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  logo: string;
  logoColor: string;
}

const education: EducationEntry[] = [
  {
    institution: "University of Technology",
    degree: "Bachelor's degree in Computer Science",
    startYear: "2017",
    endYear: "2021",
    logo: "UT",
    logoColor: "#dd5608",
  },
];

interface WorkEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  logo: string;
  logoColor: string;
  highlight: boolean;
}

const workExperience: WorkEntry[] = [
  {
    company: "TechCorp",
    role: "Senior Backend Engineer",
    startDate: "Jan 2024",
    endDate: "Present",
    logo: "TC",
    logoColor: "#dd5608",
    highlight: true,
  },
  {
    company: "CloudScale",
    role: "Backend Developer",
    startDate: "Mar 2022",
    endDate: "Dec 2023",
    logo: "CS",
    logoColor: "#0000FF",
    highlight: false,
  },
  {
    company: "DataFlow",
    role: "Software Engineer",
    startDate: "Jun 2021",
    endDate: "Feb 2022",
    logo: "DF",
    logoColor: "#dd5608",
    highlight: false,
  },
  {
    company: "Freelancer",
    role: "Full-Stack Developer",
    startDate: "Jan 2020",
    endDate: "May 2021",
    logo: "FL",
    logoColor: "#0000FF",
    highlight: false,
  },
];

const techCategories = [
  {
    label: "Languages",
    items: backendStack.filter((t) => t.category === "language"),
    variant: "default" as const,
  },
  {
    label: "Databases",
    items: backendStack.filter((t) => t.category === "database"),
    variant: "default" as const,
  },
  {
    label: "APIs",
    items: backendStack.filter((t) => t.category === "api"),
    variant: "default" as const,
  },
  {
    label: "Infrastructure",
    items: backendStack.filter((t) => t.category === "infra"),
    variant: "default" as const,
  },
  {
    label: "Frontend",
    items: frontendStack,
    variant: "blue" as const,
  },
];

/* ─── Component ────────────────────────────────────────── */

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate bento cards on scroll
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Staggered entry mini-cards
      const entries = sectionRef.current?.querySelectorAll(".entry-card");
      if (entries?.length) {
        gsap.fromTo(
          entries,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: entries[0],
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
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
        {/* ── Section Header ─────────────────────────── */}
        <div className="section-header">
          <span className="label-md block mb-4">About Me</span>
          <h2 className="kinetic-headline">
            Backend Engineer
            <br />
            <span className="text-[var(--text-muted)]">with creative flair</span>
          </h2>
        </div>

        {/* ── Row 1: Bio + Stats ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div ref={setCardRef(0)} className="bento-card lg:col-span-2">
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

          <div ref={setCardRef(1)} className="bento-card">
            <span className="label-sm block mb-6">Experience</span>
            <div className="space-y-5">
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
            <div className="mt-8 pt-6 border-t border-[var(--border-light)]">
              <span className="label-sm block mb-3">Philosophy</span>
              <p className="body-text italic">
                &ldquo;Ship fast, iterate faster, never sacrifice on
                quality.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* ── Row 2: Education + Experience (side-by-side on lg) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4 lg:mt-6">
          {/* Education */}
          <div ref={setCardRef(2)} className="bento-card">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="material-symbols-outlined text-[var(--primary)]"
                style={{ fontSize: "22px" }}
              >
                school
              </span>
              <span className="label-sm">Education</span>
            </div>

            <div className="flex flex-col gap-3">
              {education.map((entry, i) => (
                <div
                  key={i}
                  className="entry-card flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-light)] transition-all duration-300 hover:border-[var(--border-medium)] hover:shadow-[var(--shadow-md)]"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold tracking-wider shadow-md ring-2 ring-black/5 dark:ring-white/10"
                    style={{ background: entry.logoColor }}
                  >
                    {entry.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-bold text-[var(--text-primary)] leading-tight">
                      {entry.degree}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-1 font-semibold">
                      {entry.institution}
                    </p>
                  </div>
                  <span className="hidden sm:block text-[10px] font-bold tracking-wider uppercase text-[var(--text-muted)] shrink-0 whitespace-nowrap">
                    {entry.startYear}&ensp;&mdash;&ensp;{entry.endYear}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div ref={setCardRef(3)} className="bento-card flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="material-symbols-outlined text-[var(--primary)]"
                style={{ fontSize: "22px" }}
              >
                work
              </span>
              <span className="label-sm">Working Experience</span>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {workExperience.map((entry, i) => (
                <div
                  key={i}
                  className={`entry-card flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-[var(--shadow-md)] ${
                    entry.highlight
                      ? "bg-[#dd5608]/[0.06] border-l-[3px] border-l-[var(--primary)] border-t-[var(--border-light)] border-r-[var(--border-light)] border-b-[var(--border-light)] hover:border-l-[var(--primary)]"
                      : "bg-[var(--bg-muted)] border-[var(--border-light)] hover:border-[var(--border-medium)]"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold tracking-wider shadow-md ${
                      entry.highlight
                        ? "ring-2 ring-[#dd5608]/30"
                        : "ring-2 ring-black/5 dark:ring-white/10"
                    }`}
                    style={{ background: entry.logoColor }}
                  >
                    {entry.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-bold text-[var(--text-primary)] leading-tight">
                      {entry.role}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-1 font-semibold">
                      {entry.company}
                    </p>
                  </div>
                  <span className="hidden sm:block text-[10px] font-bold tracking-wider uppercase text-[var(--text-muted)] shrink-0 whitespace-nowrap">
                    {entry.startDate}&ensp;&mdash;&ensp;{entry.endDate}
                  </span>
                </div>
              ))}
            </div>

            {/* Download CV */}
            <a
              href="https://drive.google.com/file/d/1GzCkdgSCt1HfnE8FImHMggdlAdmN_2n5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[var(--border-medium)] text-xs font-bold uppercase tracking-[0.15em] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 hover:shadow-[var(--shadow-md)]"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px" }}
              >
                download
              </span>
              Download CV
            </a>
          </div>
        </div>

        {/* ── Row 3: Tech Stack (single compact card) ──── */}
        <div ref={setCardRef(4)} className="bento-card mt-4 lg:mt-6">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="material-symbols-outlined text-[var(--primary)]"
              style={{ fontSize: "22px" }}
            >
              code
            </span>
            <span className="label-sm">Tech Stack</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
            {techCategories.map((cat) => (
              <div key={cat.label}>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] block mb-2.5">
                  {cat.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((tech) => (
                    <span
                      key={tech.name}
                      className={
                        cat.variant === "blue" ? "tag tag-blue" : "tag"
                      }
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
