"use client";

import { cn } from "@core/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  titleAr?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SettingsSection({
  title,
  titleAr,
  description,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("mb-8 last:mb-0", className)}
    >
      <div className="mb-6">
        <h3 className="text-text-primary text-lg font-semibold">
          {titleAr ?? title}
        </h3>
        {description && (
          <p className="text-text-tertiary mt-1 text-sm">{description}</p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </motion.div>
  );
}
