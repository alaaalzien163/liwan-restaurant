"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps } from "./types";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps extends BaseProps {
  variant?: "icon" | "switch";
}

export function ThemeToggle({
  variant = "icon",
  className,
  "data-testid": testId,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "bg-surface-tertiary h-9 w-9 rounded-lg",
          variant === "switch" && "h-6 w-11 rounded-full",
          className,
        )}
      />
    );
  }

  const isDark = theme === "dark";

  if (variant === "switch") {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "focus-visible:ring-primary-500 relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2",
          isDark ? "bg-primary-500" : "bg-neutral-300",
          className,
        )}
        data-testid={testId}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "pointer-events-none inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm",
            isDark ? "translate-x-5" : "translate-x-0",
          )}
        >
          {isDark ? (
            <Moon className="text-primary-600 h-3 w-3" />
          ) : (
            <Sun className="h-3 w-3 text-amber-500" />
          )}
        </motion.span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "text-text-secondary hover:bg-surface-tertiary hover:text-text-primary inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
        className,
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      data-testid={testId}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.div>
    </button>
  );
}
