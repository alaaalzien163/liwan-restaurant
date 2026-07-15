"use client";

import { cn } from "@core/lib/utils";
import { type BaseProps, type CardPadding } from "./types";
import { motion } from "framer-motion";

interface CardProps extends BaseProps {
  isHoverable?: boolean;
  isPressable?: boolean;
  padding?: CardPadding;
}

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({
  isHoverable = false,
  isPressable = false,
  padding = "md",
  children,
  className,
  "data-testid": testId,
}: CardProps) {
  return (
    <motion.div
      data-testid={testId}
      whileHover={isHoverable || isPressable ? { y: -2 } : undefined}
      whileTap={isPressable ? { scale: 0.99 } : undefined}
      className={cn(
        "border-border bg-surface rounded-xl border shadow-sm transition-shadow duration-200",
        isHoverable && "hover:shadow-md",
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className }: BaseProps) {
  return (
    <div
      className={cn("mb-4 flex items-center justify-between gap-4", className)}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: BaseProps) {
  return (
    <h3 className={cn("text-text-primary text-lg font-semibold", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: BaseProps) {
  return (
    <p className={cn("text-text-secondary text-sm", className)}>{children}</p>
  );
}

export function CardContent({ children, className }: BaseProps) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className }: BaseProps) {
  return (
    <div
      className={cn(
        "border-border mt-4 flex items-center gap-3 border-t pt-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
