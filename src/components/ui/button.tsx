"use client";

import { type ButtonVariant, type BaseProps, type Size } from "./types";
import { cn } from "@core/lib/utils";
import { Spinner } from "./spinner";
import { forwardRef, type ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends BaseProps {
  variant?: ButtonVariant;
  size?: Size;
  isDisabled?: boolean;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm",
  secondary:
    "bg-surface text-text-primary border border-border hover:bg-surface-tertiary active:bg-surface-secondary",
  ghost:
    "text-text-primary hover:bg-surface-tertiary active:bg-surface-secondary",
  danger:
    "bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 shadow-sm",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
  xl: "px-6 py-3 text-base gap-2.5",
};

const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none";
const loadingStyles = "cursor-wait";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isDisabled = false,
      isLoading = false,
      isFullWidth = false,
      leftIcon,
      rightIcon,
      type = "button",
      children,
      onClick,
      className,
      "data-testid": testId,
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled || isLoading}
        data-testid={testId}
        whileTap={!isDisabled && !isLoading ? { scale: 0.97 } : undefined}
        onClick={onClick}
        className={cn(
          "focus-visible:ring-primary-500 dark:focus-visible:ring-offset-surface inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          isFullWidth && "w-full",
          isDisabled && disabledStyles,
          isLoading && loadingStyles,
          className,
        )}
      >
        {isLoading ? (
          <Spinner
            size="sm"
            color={
              variant === "primary" || variant === "danger"
                ? "white"
                : "primary"
            }
          />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
