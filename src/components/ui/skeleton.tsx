"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps } from "./types";
import { motion } from "framer-motion";

interface SkeletonProps extends BaseProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  variant?: "text" | "circular" | "rectangular";
  count?: number;
}

const variantStyles = {
  text: "h-4 rounded-sm",
  circular: "rounded-full",
  rectangular: "rounded-lg",
} as const;

function SkeletonItem({
  variant = "text",
  width,
  height,
  borderRadius,
  className,
}: Omit<SkeletonProps, "count">) {
  return (
    <motion.div
      className={cn(
        "bg-surface-tertiary dark:bg-surface-secondary",
        variantStyles[variant],
        className,
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius,
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function Skeleton(props: SkeletonProps) {
  const { count = 1, ...rest } = props;

  if (count <= 1) return <SkeletonItem {...rest} />;

  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} {...rest} />
      ))}
    </div>
  );
}
