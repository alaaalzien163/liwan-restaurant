"use client";

import { type BaseProps, type InputVariant, type Size } from "./types";
import { cn } from "@core/lib/utils";
import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends BaseProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  textareaSize?: Size;
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

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      variant = "outlined",
      textareaSize = "md",
      isRequired = false,
      disabled,
      className,
      id,
      rows = 4,
      "data-testid": testId,
      ...props
    },
    ref,
  ) => {
    const inputId =
      id ?? `textarea-${label?.toLowerCase().replace(/\s+/g, "-")}`;

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
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          required={isRequired}
          className={cn(
            "text-text-primary placeholder-text-tertiary focus:ring-primary-500/20 resize-vertical block w-full rounded-lg border transition-colors duration-150 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            variantStyles[variant],
            sizeStyles[textareaSize],
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

Textarea.displayName = "Textarea";
