"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps, Size } from "./types";
import type { ReactNode } from "react";

interface AvatarProps extends BaseProps {
  src?: string;
  alt: string;
  name?: string;
  size?: Size;
  fallback?: ReactNode;
}

const sizeStyles: Record<Size, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getColorFromName(name: string): string {
  const colors = [
    "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400",
    "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400",
    "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400",
    "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400",
    "bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length]!;
}

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  fallback,
  className,
  "data-testid": testId,
}: AvatarProps) {
  if (src) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        data-testid={testId}
        src={src}
        alt={alt}
        className={cn("rounded-full object-cover", sizeStyles[size], className)}
      />
    );
  }

  if (name) {
    return (
      <div
        data-testid={testId}
        className={cn(
          "flex items-center justify-center rounded-full font-medium",
          sizeStyles[size],
          getColorFromName(name),
          className,
        )}
        title={alt}
        aria-label={alt}
      >
        {getInitials(name)}
      </div>
    );
  }

  if (fallback) {
    return (
      <div
        data-testid={testId}
        className={cn(
          "flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
          sizeStyles[size],
          className,
        )}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      data-testid={testId}
      className={cn(
        "flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
        sizeStyles[size],
        className,
      )}
    >
      <svg className="h-1/2 w-1/2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
}
