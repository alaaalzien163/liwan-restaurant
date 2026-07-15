"use client";

import { type BaseProps, type InputVariant, type Size } from "./types";
import { cn } from "@core/lib/utils";
import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps
  extends BaseProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: InputVariant;
  selectSize?: Size;
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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      variant = "outlined",
      selectSize = "md",
      isRequired = false,
      disabled,
      className,
      id,
      "data-testid": testId,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? `select-${label?.toLowerCase().replace(/\s+/g, "-")}`;

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
          <select
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={isRequired}
            className={cn(
              "text-text-primary focus:ring-primary-500/20 block w-full appearance-none rounded-lg border transition-colors duration-150 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              variantStyles[variant],
              sizeStyles[selectSize],
              "pe-10",
              error &&
                "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20",
              className,
            )}
            aria-invalid={!!error}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="text-text-tertiary pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
            <ChevronDown className="h-4 w-4" />
          </div>
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

Select.displayName = "Select";
