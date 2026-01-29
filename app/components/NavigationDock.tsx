"use client";

import React, { useState, useEffect, useCallback } from "react";

const navItems = [
  { id: "home", icon: "home", label: "Home" },
  { id: "about", icon: "folder_open", label: "Work" },
  { id: "projects", icon: "experiment", label: "Projects" },
  { id: "contact", icon: "alternate_email", label: "Contact" },
];

export default function NavigationDock() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(navItems[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="flex items-center justify-around p-3 rounded-full shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${activeSection === item.id
                  ? "bg-[#dd5608] text-white shadow-lg"
                  : "text-black/60 hover:text-black hover:bg-white/50"
                }`}
              style={{
                boxShadow:
                  activeSection === item.id
                    ? "0 4px 12px rgba(221, 86, 8, 0.2)"
                    : "none",
              }}
              aria-label={item.label}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings:
                    activeSection === item.id
                      ? "'FILL' 1, 'wght' 400"
                      : "'FILL' 0, 'wght' 400",
                  fontSize: "24px",
                }}
              >
                {item.icon}
              </span>
            </button>
            {/* Divider before contact */}
            {index === 2 && (
              <div className="h-6 w-px bg-black/10 mx-1" />
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
