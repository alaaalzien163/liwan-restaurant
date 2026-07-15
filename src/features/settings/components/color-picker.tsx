"use client";

import { cn } from "@core/lib/utils";
import { useCallback, useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";

const PRESET_COLORS = [
  "#E97C11",
  "#1E293B",
  "#0F172A",
  "#334155",
  "#64748B",
  "#475569",
  "#DC2626",
  "#16A34A",
  "#2563EB",
  "#7C3AED",
  "#DB2777",
  "#0891B2",
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handlePresetClick = useCallback(
    (color: string) => {
      onChange(color);
      setInputValue(color);
      setIsOpen(false);
    },
    [onChange],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setInputValue(v);
      if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
        onChange(v);
      }
    },
    [onChange],
  );

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      {label && (
        <label className="text-text-primary text-xs font-medium">{label}</label>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="border-border focus-visible:ring-primary-500 h-9 w-9 shrink-0 rounded-lg border transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2"
          style={{ backgroundColor: value }}
          aria-label={`Pick ${label ?? "color"}`}
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border-border bg-surface text-text-primary focus:border-primary-500 focus:ring-primary-500/20 w-28 rounded-lg border px-3 py-2 font-mono text-sm transition-colors focus:ring-2 focus:outline-none"
          aria-label={`${label ?? "Color"} hex value`}
          placeholder="#000000"
        />
      </div>
      {isOpen && (
        <div className="border-border bg-surface flex flex-wrap gap-1.5 rounded-xl border p-2 shadow-lg">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handlePresetClick(color)}
              className="border-border focus-visible:ring-primary-500 relative h-8 w-8 rounded-lg border transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2"
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            >
              {value === color && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check
                    className={cn(
                      "h-4 w-4",
                      color === "#0F172A" ||
                        color === "#1E293B" ||
                        color === "#334155"
                        ? "text-white"
                        : "text-white drop-shadow-md",
                    )}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
