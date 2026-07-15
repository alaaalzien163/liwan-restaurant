"use client";

import { type BaseProps, type Size } from "./types";
import { cn } from "@core/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchInputProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  placeholderAr?: string;
  isDebounced?: boolean;
  debounceMs?: number;
  size?: Size;
  isDisabled?: boolean;
  autoFocus?: boolean;
  onClear?: () => void;
}

const sizeStyles: Record<Size, string> = {
  sm: "px-2.5 py-1.5 text-sm ps-9",
  md: "px-3 py-2 text-sm ps-10",
  lg: "px-3.5 py-2.5 text-base ps-11",
  xl: "px-4 py-3 text-base ps-12",
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  placeholderAr: _placeholderAr,
  isDebounced = false,
  debounceMs = 300,
  size = "md",
  isDisabled = false,
  autoFocus = false,
  onClear,
  className,
  "data-testid": testId,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isDebounced) {
      onChange(localValue);
      return;
    }
    timerRef.current = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);
    return () => clearTimeout(timerRef.current);
  }, [localValue, debounceMs, isDebounced, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className="relative" data-testid={testId}>
      <Search className="text-text-tertiary absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
        autoFocus={autoFocus}
        className={cn(
          "border-border bg-surface text-text-primary placeholder-text-tertiary focus:border-primary-500 focus:ring-primary-500/20 block w-full rounded-lg border transition-colors duration-150 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          sizeStyles[size],
          localValue && "pe-9",
          className,
        )}
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="text-text-tertiary hover:text-text-primary absolute end-2 top-1/2 -translate-y-1/2 rounded p-1 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
