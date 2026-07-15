"use client";

import { Select } from "@/components/ui/select";
import { SettingsSection } from "./settings-section";
import { SettingsCard } from "./settings-card";
import { useCallback } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { SettingsFormData } from "../schemas/settings-schema";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
];

const DATE_FORMAT_OPTIONS = [
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
];

const TIME_FORMAT_OPTIONS = [
  { value: "12h", label: "12-hour" },
  { value: "24h", label: "24-hour" },
];

const CURRENCY_OPTIONS = [
  { value: "SAR", label: "SAR - Saudi Riyal" },
  { value: "AED", label: "AED - UAE Dirham" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
];

interface LocalizationSettingsProps {
  register: UseFormRegister<SettingsFormData>;
  setValue: UseFormSetValue<SettingsFormData>;
  watch: UseFormWatch<SettingsFormData>;
}

export function LocalizationSettings({
  register,
  setValue,
  watch,
}: LocalizationSettingsProps) {
  const rtlEnabled = watch("rtlEnabled");

  const handleRtlToggle = useCallback(() => {
    setValue("rtlEnabled", !rtlEnabled);
  }, [setValue, rtlEnabled]);

  return (
    <SettingsSection
      title="Localization"
      titleAr="الإعدادات المحلية"
      description="Language, date, and regional preferences"
    >
      <SettingsCard>
        <div className="grid gap-6 sm:grid-cols-2">
          <Select
            label="Default Language"
            options={LANGUAGE_OPTIONS}
            {...register("defaultLanguage")}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-text-primary text-sm font-medium">
              RTL Mode
            </label>
            <button
              type="button"
              role="switch"
              aria-checked={rtlEnabled}
              onClick={handleRtlToggle}
              className="focus-visible:ring-primary-500 inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2"
              style={{
                backgroundColor: rtlEnabled
                  ? "var(--color-primary-500)"
                  : "var(--color-neutral-300)",
              }}
            >
              <span
                className="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
                style={{
                  marginInlineStart: rtlEnabled
                    ? "calc(100% - 1.25rem)"
                    : "2px",
                }}
              />
            </button>
            <span className="text-text-tertiary text-xs">
              {rtlEnabled
                ? "Right-to-left direction"
                : "Left-to-right direction"}
            </span>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard>
        <div className="grid gap-6 sm:grid-cols-3">
          <Select
            label="Date Format"
            options={DATE_FORMAT_OPTIONS}
            {...register("dateFormat")}
          />
          <Select
            label="Time Format"
            options={TIME_FORMAT_OPTIONS}
            {...register("timeFormat")}
          />
          <Select
            label="Currency"
            options={CURRENCY_OPTIONS}
            {...register("currency")}
          />
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
