"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps } from "./types";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import type { ReactNode } from "react";

interface LanguageSwitchProps extends BaseProps {
  currentLocale: string;
  onLocaleChange: (locale: string) => void;
  locales?: Array<{
    code: string;
    label: string;
    native: string;
    direction: "ltr" | "rtl";
    icon?: ReactNode;
  }>;
}

const DEFAULT_LOCALES = [
  { code: "en", label: "English", native: "EN", direction: "ltr" as const },
  { code: "ar", label: "Arabic", native: "AR", direction: "rtl" as const },
];

export function LanguageSwitch({
  currentLocale,
  onLocaleChange,
  locales = DEFAULT_LOCALES,
  className,
  "data-testid": testId,
}: LanguageSwitchProps) {
  const current = locales.find((l) => l.code === currentLocale);
  const next = locales.find((l) => l.code !== currentLocale);

  if (!next) return null;

  return (
    <button
      type="button"
      onClick={() => onLocaleChange(next.code)}
      className={cn(
        "text-text-secondary hover:bg-surface-tertiary hover:text-text-primary inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        className,
      )}
      aria-label={`Switch language to ${next.label}`}
      data-testid={testId}
    >
      <Languages className="h-4 w-4" />
      <motion.span
        key={currentLocale}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        {current?.native ?? currentLocale.toUpperCase()}
      </motion.span>
    </button>
  );
}
