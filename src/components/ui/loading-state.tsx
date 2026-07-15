"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps } from "./types";
import { Spinner } from "./spinner";
import { motion } from "framer-motion";

interface LoadingStateProps extends BaseProps {
  message?: string;
  messageAr?: string;
  size?: "sm" | "md" | "lg";
  isFullPage?: boolean;
}

export function LoadingState({
  message = "Loading...",
  messageAr,
  size = "md",
  isFullPage = false,
  className,
  "data-testid": testId,
}: LoadingStateProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        isFullPage ? "min-h-screen" : "py-12",
        className,
      )}
      data-testid={testId}
    >
      <Spinner size={size} />
      <p className="text-text-secondary text-sm">{messageAr || message}</p>
    </motion.div>
  );

  return content;
}
