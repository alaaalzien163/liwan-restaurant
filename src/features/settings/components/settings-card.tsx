"use client";

import { cn } from "@core/lib/utils";
import type { ReactNode } from "react";

interface SettingsCardProps {
  children: ReactNode;
  className?: string;
}

export function SettingsCard({ children, className }: SettingsCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-xl border p-5 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
