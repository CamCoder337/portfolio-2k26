"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const socialLinks = [
  { id: "01", name: "GITHUB", url: "https://github.com/camcoder337" },
  { id: "02", name: "LINKEDIN", url: "https://www.linkedin.com/in/fred-tchiadeu-67a97a24b/" },
  { id: "03", name: "TWITTER", url: "https://x.com/camcoder337" },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Update time every minute
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current?.querySelectorAll(".title-word") || [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Email card animation
      gsap.fromTo(
        emailRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.5 }
      );

      // Socials animation
      gsap.fromTo(
        ".social-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.7,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("camcoder337@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

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
          Creative Engineer
        </span>
        <div className="w-12" />
      </header>

      {/* Main Content */}
      <main className="min-h-screen flex flex-col justify-between pt-24 pb-8 px-4">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#dd5608] animate-pulse" />
            <span className="text-sm font-medium opacity-70 uppercase tracking-wider">
              Available for work
            </span>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-[clamp(2.5rem,12vw,6rem)] font-bold leading-[0.9] tracking-tight mb-12"
          >
            <span className="title-word block">LET&apos;S BUILD</span>
            <span className="title-word block bg-gradient-to-r from-[#dd5608] to-[#3b82f6] bg-clip-text text-transparent">
              SOMETHING
            </span>
            <span className="title-word block">BOLD.</span>
          </h1>

          {/* Email Card */}
          <div ref={emailRef} className="mb-12">
            <button
              onClick={copyEmail}
              className="w-full text-left group"
            >
              <div className="py-4 border-y border-[var(--border-medium)]">
                <h2 className="text-[clamp(1.5rem,6vw,3rem)] font-bold tracking-tight uppercase break-all group-hover:text-[#dd5608] transition-colors duration-300">
                  camcoder337@gmail.com
                </h2>
              </div>
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm opacity-50 uppercase tracking-[0.1em]">
                  {copied ? "Copied!" : "Tap to copy email"}
                </p>
                <span className="material-symbols-outlined text-[#dd5608] text-2xl">
                  {copied ? "check" : "content_copy"}
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Socials Section */}
        <section className="mb-12">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] pb-6 border-b border-[var(--border-medium)]">
            Socials
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item group cursor-pointer"
              >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--text-muted)] block mb-1">
                  {link.id}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold group-hover:text-[#dd5608] transition-colors">
                    {link.name}
                  </span>
                  <span className="material-symbols-outlined text-sm -rotate-45 opacity-0 group-hover:opacity-100 transition-all">
                    arrow_forward
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="flex items-end justify-between border-t border-[var(--border-medium)] pt-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--text-muted)]">
              Based in
            </span>
            <span className="text-sm font-medium">
              Cameroon ({currentTime || "Loading..."})
            </span>
          </div>
          <a
            href="mailto:camcoder337@gmail.com"
            className="h-12 w-12 bg-[#dd5608] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#dd5608]/20 hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined">north_east</span>
          </a>
        </footer>
      </main>

      {/* Grain Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

    </div>
  );
}
