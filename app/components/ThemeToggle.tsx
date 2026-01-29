"use client";

import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${className}`}
      style={{
        background: theme === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.05)",
        border: theme === "dark"
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0, 0, 0, 0.1)",
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun icon */}
      <span
        className={`absolute material-symbols-outlined transition-all duration-300 ${
          theme === "light"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-0"
        }`}
        style={{
          color: theme === "light" ? "#181311" : "#fff",
          fontSize: "20px",
        }}
      >
        light_mode
      </span>

      {/* Moon icon */}
      <span
        className={`absolute material-symbols-outlined transition-all duration-300 ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-0"
        }`}
        style={{
          color: theme === "dark" ? "#fff" : "#181311",
          fontSize: "20px",
        }}
      >
        dark_mode
      </span>
    </button>
  );
}
