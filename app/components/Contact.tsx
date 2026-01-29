"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/camcoder337",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/fred-tchiadeu-67a97a24b/",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "X",
    url: "https://x.com/camcoder337",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title on scroll
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section min-h-screen flex flex-col justify-center bg-[var(--bg-base)] px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full text-center">
        {/* Label */}
        <span className="label-md block mb-8">Get in Touch</span>

        {/* Giant CTA */}
        <h2
          ref={titleRef}
          className=""
        >
          <a
            href="mailto:camcoder337@gmail.com"
            className={`kinetic-display block transition-all duration-500 ${isHovered
              ? "text-[var(--primary)]"
              : "text-[var(--text-primary)]"
              }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              fontSize: "clamp(2rem, 10vw, 7rem)",
            }}
          >
            Let&apos;s Talk
          </a>
        </h2>

        {/* Email */}
        <a
          href="mailto:camcoder337@gmail.com"
          className={`inline-block mt-6 body-lg transition-colors duration-300 ${isHovered
            ? "text-[var(--primary)]"
            : "text-[var(--text-muted)]"
            }`}
        >
          <span className="text-[var(--primary)]">camcoder337@gmail.com</span>
        </a>

        {/* Social Links */}
        <div className="mt-16 flex justify-center gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label={link.name}
            >
              <span className="w-12 h-12 rounded-full border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:border-[var(--primary)] transition-all duration-300 group-hover:scale-110">
                {link.icon}
              </span>
              <span className="label-sm group-hover:text-[var(--primary)] transition-colors">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-[var(--border-light)]">
          <p className="label-sm text-[var(--text-muted)]">
            Designed & Built with precision
          </p>
          <p className="label-sm text-[var(--text-muted)] mt-2">
            &copy; {new Date().getFullYear()} Creative Dev. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}
