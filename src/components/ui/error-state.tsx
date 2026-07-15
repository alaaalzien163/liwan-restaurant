"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps } from "./types";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface ErrorStateProps extends BaseProps {
  title?: string;
  titleAr?: string;
  message?: string;
  messageAr?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  titleAr,
  message = "An unexpected error occurred. Please try again.",
  messageAr,
  onRetry,
  className,
  "data-testid": testId,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-4 py-16",
        className,
      )}
      data-testid={testId}
    >
      <div className="bg-danger-100 text-danger-500 dark:bg-danger-900/30 rounded-full p-4">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <div className="text-center">
        <h3 className="text-text-primary text-base font-semibold">
          {titleAr || title}
        </h3>
        <p className="text-text-secondary mt-1 text-sm">
          {messageAr || message}
        </p>
      </div>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry} className="mt-2">
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
