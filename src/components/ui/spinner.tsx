"use client";

import { type VariantProps, type BaseProps } from "./types";
import { cn } from "@core/lib/utils";
import { motion } from "framer-motion";

interface SpinnerProps extends BaseProps, VariantProps {
  color?: "primary" | "white" | "current";
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-12 w-12 border-4",
} as const;

const colorMap = {
  primary: "border-primary-200 border-t-primary-600",
  white: "border-white/30 border-t-white",
  current: "border-current/30 border-t-current",
} as const;

export function Spinner({
  size = "md",
  color = "primary",
  className,
  "data-testid": testId,
}: SpinnerProps) {
  return (
    <motion.div
      data-testid={testId}
      className={cn("rounded-full", sizeMap[size], colorMap[color], className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}
