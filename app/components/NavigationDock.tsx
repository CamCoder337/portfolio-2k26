"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { id: "home", icon: "home", label: "Home", href: "/" },
  { id: "about", icon: "person", label: "About", href: "/about" },
  { id: "projects", icon: "experiment", label: "Projects", href: "/projects" },
  { id: "contact", icon: "alternate_email", label: "Contact", href: "/contact" },
];

export default function NavigationDock() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-dock-container flex items-center justify-around p-2 md:p-3 rounded-full shadow-2xl transition-colors duration-300 dark:bg-white/10 dark:border-white/10 bg-white/70 border border-white/30 backdrop-blur-xl">
        {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <Link
              href={item.href}
              className={`flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-[#dd5608] text-white shadow-lg shadow-[#dd5608]/30"
                  : "text-black/60 hover:text-black hover:bg-black/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10"
              }`}
              aria-label={item.label}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: isActive(item.href)
                    ? "'FILL' 1, 'wght' 400"
                    : "'FILL' 0, 'wght' 400",
                  fontSize: "22px",
                }}
              >
                {item.icon}
              </span>
            </Link>
            {/* Divider before contact */}
            {index === 2 && (
              <div className="h-6 w-px bg-black/10 dark:bg-white/20 mx-1" />
            )}
          </React.Fragment>
        ))}

        {/* Divider before theme toggle */}
        <div className="h-6 w-px bg-black/10 dark:bg-white/20 mx-1" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full transition-all duration-300 text-black/60 hover:text-black hover:bg-black/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10 overflow-hidden"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {/* Sun icon (shown in dark mode) */}
          <span
            className={`absolute material-symbols-outlined transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
              theme === "dark"
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-90 scale-0"
            }`}
            style={{
              fontVariationSettings: "'FILL' 1, 'wght' 400",
              fontSize: "22px",
            }}
          >
            light_mode
          </span>
          {/* Moon icon (shown in light mode) */}
          <span
            className={`absolute material-symbols-outlined transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
              theme === "light"
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-0"
            }`}
            style={{
              fontVariationSettings: "'FILL' 1, 'wght' 400",
              fontSize: "22px",
            }}
          >
            dark_mode
          </span>
        </button>
      </div>
    </nav>
  );
}
