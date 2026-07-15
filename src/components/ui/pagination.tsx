"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps } from "./types";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo } from "react";

interface PaginationProps extends BaseProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "h-8 w-8 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-10 w-10 text-sm",
};

const iconSizeStyles = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-4 w-4",
};

function getPageRange(
  current: number,
  total: number,
  siblings: number,
): (number | "ellipsis")[] {
  const totalNumbers = siblings * 2 + 5;
  if (totalNumbers >= total) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - siblings, 1);
  const rightSiblingIndex = Math.min(current + siblings, total);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => total - rightItemCount + i + 1,
    );
    return [1, "ellipsis", ...rightRange];
  }

  return [
    1,
    "ellipsis",
    ...Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    ),
    "ellipsis",
    total,
  ];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  size = "md",
  className,
  "data-testid": testId,
}: PaginationProps) {
  const pages = useMemo(
    () => getPageRange(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount],
  );

  if (totalPages <= 1) return null;

  const baseItemStyles =
    "inline-flex items-center justify-center rounded-lg border border-border bg-surface text-text-primary transition-colors hover:bg-surface-tertiary disabled:opacity-50 disabled:pointer-events-none";
  const activeItemStyles =
    "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-400";

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1", className)}
      data-testid={testId}
    >
      {showFirstLast && (
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={cn(baseItemStyles, sizeStyles[size])}
          aria-label="First page"
        >
          <ChevronsLeft className={iconSizeStyles[size]} />
        </button>
      )}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(baseItemStyles, sizeStyles[size])}
        aria-label="Previous page"
      >
        <ChevronLeft className={iconSizeStyles[size]} />
      </button>
      {pages.map((page, idx) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            className={cn(
              "inline-flex items-center justify-center",
              sizeStyles[size],
            )}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              baseItemStyles,
              sizeStyles[size],
              page === currentPage && activeItemStyles,
            )}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(baseItemStyles, sizeStyles[size])}
        aria-label="Next page"
      >
        <ChevronRight className={iconSizeStyles[size]} />
      </button>
      {showFirstLast && (
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(baseItemStyles, sizeStyles[size])}
          aria-label="Last page"
        >
          <ChevronsRight className={iconSizeStyles[size]} />
        </button>
      )}
    </nav>
  );
}
