"use client";

import { type BaseProps, type InputVariant, type Size } from "./types";
import { cn } from "@core/lib/utils";
import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps
  extends BaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: Size;
  variant?: InputVariant;
  isRequired?: boolean;
}

const variantStyles: Record<InputVariant, string> = {
  outlined:
    "border-border bg-surface hover:border-border-dark focus:border-primary-500",
  filled:
    "border-transparent bg-surface-tertiary hover:bg-surface-secondary focus:bg-surface focus:border-primary-500",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-3.5 py-2.5 text-base",
  xl: "px-4 py-3 text-base",
};

const iconSizeStyles: Record<Size, string> = {
  sm: "ps-8",
  md: "ps-9",
  lg: "ps-10",
  xl: "ps-11",
};

const rightIconSizeStyles: Record<Size, string> = {
  sm: "pe-8",
  md: "pe-9",
  lg: "pe-10",
  xl: "pe-11",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "outlined",
      inputSize = "md",
      isRequired = false,
      disabled,
      className,
      type = "text",
      id,
      "data-testid": testId,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;
    const isPassword = type === "password";
    const currentType = isPassword && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-1.5" data-testid={testId}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-text-primary text-sm font-medium"
          >
            {label}
            {isRequired && <span className="text-danger-500 ms-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="text-text-tertiary pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={currentType}
            disabled={disabled}
            required={isRequired}
            className={cn(
              "text-text-primary placeholder-text-tertiary focus:ring-primary-500/20 block w-full rounded-lg border transition-colors duration-150 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              variantStyles[variant],
              sizeStyles[inputSize],
              leftIcon && iconSizeStyles[inputSize],
              (rightIcon || isPassword) && rightIconSizeStyles[inputSize],
              error &&
                "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
          {rightIcon && !isPassword && (
            <div className="text-text-tertiary absolute inset-y-0 end-0 flex items-center pe-3">
              {rightIcon}
            </div>
          )}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-tertiary hover:text-text-secondary absolute inset-y-0 end-0 flex items-center pe-3 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-danger-500 text-xs"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-text-tertiary text-xs">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
