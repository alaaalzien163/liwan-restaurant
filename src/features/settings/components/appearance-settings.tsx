"use client";

import { SettingsSection } from "./settings-section";
import { SettingsCard } from "./settings-card";
import { ColorPicker } from "./color-picker";
import { useCallback } from "react";
import { cn } from "@core/lib/utils";
import { Monitor, Sun, Moon } from "lucide-react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { SettingsFormData } from "../schemas/settings-schema";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

interface AppearanceSettingsProps {
  register: UseFormRegister<SettingsFormData>;
  setValue: UseFormSetValue<SettingsFormData>;
  watch: UseFormWatch<SettingsFormData>;
}

export function AppearanceSettings({
  register,
  setValue,
  watch,
}: AppearanceSettingsProps) {
  const themeMode = watch("themeMode");
  const primaryColor = watch("primaryColor");
  const accentColor = watch("accentColor");

  const handleThemeChange = useCallback(
    (mode: "light" | "dark" | "system") => {
      setValue("themeMode", mode);
    },
    [setValue],
  );

  return (
    <SettingsSection
      title="Appearance"
      titleAr="المظهر"
      description="Customize the look and feel of your dashboard"
    >
      <SettingsCard>
        <p className="text-text-primary mb-4 text-sm font-medium">Theme Mode</p>
        <div className="flex gap-2">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleThemeChange(opt.value)}
              className={cn(
                "focus-visible:ring-primary-500 flex flex-1 flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all focus:outline-none focus-visible:ring-2",
                themeMode === opt.value
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-950/20"
                  : "border-border hover:border-primary-300",
              )}
              aria-pressed={themeMode === opt.value}
              aria-label={`${opt.label} mode`}
            >
              <opt.icon
                className={cn(
                  "h-6 w-6",
                  themeMode === opt.value
                    ? "text-primary-500"
                    : "text-text-tertiary",
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  themeMode === opt.value
                    ? "text-primary-700 dark:text-primary-400"
                    : "text-text-secondary",
                )}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>
        <input type="hidden" {...register("themeMode")} />
      </SettingsCard>

      <SettingsCard>
        <div className="grid gap-6 sm:grid-cols-2">
          <ColorPicker
            label="Primary Color"
            value={primaryColor}
            onChange={(color) => setValue("primaryColor", color)}
          />
          <ColorPicker
            label="Accent Color"
            value={accentColor}
            onChange={(color) => setValue("accentColor", color)}
          />
        </div>
      </SettingsCard>

      <SettingsCard>
        <p className="text-text-primary mb-4 text-sm font-medium">Preview</p>
        <div
          className="flex items-center gap-4 rounded-xl border p-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            L
          </div>
          <div className="flex-1">
            <div
              className="h-2 w-32 rounded-full"
              style={{ backgroundColor: primaryColor, opacity: 0.3 }}
            />
            <div
              className="mt-2 h-2 w-48 rounded-full"
              style={{ backgroundColor: accentColor, opacity: 0.15 }}
            />
          </div>
          <div className="flex gap-2">
            <div
              className="h-8 w-8 rounded-lg"
              style={{ backgroundColor: primaryColor }}
            />
            <div
              className="h-8 w-8 rounded-lg"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
