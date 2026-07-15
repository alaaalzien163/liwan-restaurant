"use client";

import { cn } from "@core/lib/utils";
import { useCallback } from "react";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
}

export function TimePicker({ value, onChange, label, error }: TimePickerProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-text-primary text-xs font-medium">{label}</label>
      )}
      <input
        type="time"
        value={value}
        onChange={handleChange}
        className={cn(
          "border-border bg-surface text-text-primary focus:border-primary-500 focus:ring-primary-500/20 rounded-lg border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none",
          error && "border-danger-500",
        )}
        aria-label={label ?? "Time"}
        aria-invalid={!!error}
      />
      {error && (
        <p className="text-danger-500 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
