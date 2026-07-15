"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps } from "./types";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps extends BaseProps {
  icon?: ReactNode;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  titleAr,
  description,
  descriptionAr,
  action,
  className,
  "data-testid": testId,
}: EmptyStateProps) {
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
      <div className="bg-surface-tertiary text-text-tertiary rounded-full p-4">
        {icon || <Inbox className="h-8 w-8" />}
      </div>
      <div className="text-center">
        <h3 className="text-text-primary text-base font-semibold">
          {titleAr || title}
        </h3>
        {(description || descriptionAr) && (
          <p className="text-text-secondary mt-1 text-sm">
            {descriptionAr || description}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </motion.div>
  );
}
