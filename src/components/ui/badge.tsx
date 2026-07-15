"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps, Size, BadgeVariant } from "./types";
import type { ReactNode } from "react";

interface BadgeProps extends BaseProps {
  variant?: BadgeVariant;
  size?: Size;
  isDot?: boolean;
  isRemovable?: boolean;
  onRemove?: () => void;
  icon?: ReactNode;
}

const sizeStyles: Record<Size, string> = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-xs",
  lg: "px-2.5 py-1 text-sm",
  xl: "px-3 py-1 text-sm",
};

const dotSizes: Record<Size, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
  xl: "h-3 w-3",
};

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  success:
    "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400",
  warning:
    "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400",
  danger:
    "bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400",
  info: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-neutral-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  danger: "bg-danger-500",
  info: "bg-secondary-500",
};

export function Badge({
  variant = "default",
  size = "md",
  isDot = false,
  isRemovable = false,
  onRemove,
  icon,
  children,
  className,
  "data-testid": testId,
}: BadgeProps) {
  if (isDot) {
    return (
      <span
        data-testid={testId}
        className={cn(
          "inline-flex items-center justify-center rounded-full",
          dotSizes[size],
          dotColors[variant],
          className,
        )}
        aria-label="status indicator"
      />
    );
  }

  return (
    <span
      data-testid={testId}
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {isRemovable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 inline-flex shrink-0 rounded-full p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
          aria-label="Remove"
        >
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
          </svg>
        </button>
      )}
    </span>
  );
}
