"use client";

import { SettingsSection } from "./settings-section";
import { SettingsCard } from "./settings-card";
import { TimePicker } from "./time-picker";
import { useCallback } from "react";
import { cn } from "@core/lib/utils";
import type { BusinessDay } from "../types";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { SettingsFormData } from "../schemas/settings-schema";

interface BusinessHoursSettingsProps {
  setValue: UseFormSetValue<SettingsFormData>;
  watch: UseFormWatch<SettingsFormData>;
}

export function BusinessHoursSettings({
  setValue,
  watch,
}: BusinessHoursSettingsProps) {
  const businessHours = watch("businessHours");

  const handleToggleDay = useCallback(
    (index: number) => {
      const current = businessHours?.[index];
      if (current) {
        setValue(`businessHours.${index}.isOpen`, !current.isOpen);
      }
    },
    [businessHours, setValue],
  );

  const handleTimeChange = useCallback(
    (index: number, field: "openTime" | "closeTime", value: string) => {
      setValue(`businessHours.${index}.${field}`, value);
    },
    [setValue],
  );

  const DAY_LABELS: Record<string, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  return (
    <SettingsSection
      title="Business Hours"
      titleAr="ساعات العمل"
      description="Set your restaurant operating hours"
    >
      <SettingsCard>
        <div className="space-y-3">
          {businessHours.map((day: BusinessDay, index: number) => (
            <div
              key={day.day}
              className={cn(
                "border-border flex flex-wrap items-center gap-4 rounded-xl border p-4 transition-colors",
                !day.isOpen && "opacity-50",
              )}
            >
              <div className="flex w-28 items-center gap-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={day.isOpen}
                  onClick={() => handleToggleDay(index)}
                  className="focus-visible:ring-primary-500 inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2"
                  style={{
                    backgroundColor: day.isOpen
                      ? "var(--color-primary-500)"
                      : "var(--color-neutral-300)",
                  }}
                  aria-label={`Toggle ${DAY_LABELS[day.day]}`}
                >
                  <span
                    className="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
                    style={{
                      marginInlineStart: day.isOpen
                        ? "calc(100% - 1rem)"
                        : "2px",
                    }}
                  />
                </button>
                <span className="text-text-primary text-sm font-medium">
                  {DAY_LABELS[day.day]}
                </span>
              </div>

              {day.isOpen && (
                <div className="flex flex-1 flex-wrap items-center gap-3">
                  <TimePicker
                    value={day.openTime}
                    onChange={(v) => handleTimeChange(index, "openTime", v)}
                    label="Open"
                  />
                  <span className="text-text-tertiary mt-5 text-sm">—</span>
                  <TimePicker
                    value={day.closeTime}
                    onChange={(v) => handleTimeChange(index, "closeTime", v)}
                    label="Close"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
