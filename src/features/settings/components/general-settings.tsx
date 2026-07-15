"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { SettingsSection } from "./settings-section";
import { SettingsCard } from "./settings-card";
import { useCallback } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { SettingsFormData } from "../schemas/settings-schema";
import { uploadFile } from "@/infrastructure/supabase/upload";

interface GeneralSettingsProps {
  register: UseFormRegister<SettingsFormData>;
  setValue: UseFormSetValue<SettingsFormData>;
  errors: Record<string, { message?: string } | undefined>;
  logo: string;
  coverImage: string;
}

export function GeneralSettings({
  register,
  setValue,
  errors,
  logo,
  coverImage,
}: GeneralSettingsProps) {
  const handleLogoChange = useCallback(
    (url: string) => setValue("logo", url),
    [setValue],
  );
  const handleCoverChange = useCallback(
    (url: string) => setValue("coverImage", url),
    [setValue],
  );
  const handleLogoUpload = useCallback(async (file: File) => {
    return uploadFile("logos", file);
  }, []);
  const handleCoverUpload = useCallback(async (file: File) => {
    return uploadFile("covers", file);
  }, []);

  return (
    <SettingsSection
      title="General Information"
      titleAr="معلومات عامة"
      description="Basic information about your restaurant"
    >
      <SettingsCard>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Restaurant Name"
            placeholder="Liwan Restaurant"
            isRequired
            error={errors.restaurantName?.message}
            {...register("restaurantName")}
          />
          <Input
            label="Restaurant Name (Arabic)"
            placeholder="مطعم ليوان"
            isRequired
            error={errors.restaurantNameAr?.message}
            {...register("restaurantNameAr")}
          />
        </div>
        <div className="mt-6">
          <Textarea
            label="Short Description"
            placeholder="Describe your restaurant..."
            {...register("description")}
          />
        </div>
      </SettingsCard>

      <SettingsCard>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Restaurant Email"
            type="email"
            placeholder="info@liwanrestaurant.com"
            isRequired
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Restaurant Phone"
            type="tel"
            placeholder="+966 55 123 4567"
            isRequired
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
        <div className="mt-6">
          <Input
            label="Restaurant Address"
            placeholder="123 Main Street, Riyadh"
            isRequired
            error={errors.address?.message}
            {...register("address")}
          />
        </div>
      </SettingsCard>

      <SettingsCard>
        <p className="text-text-primary mb-4 text-sm font-medium">Images</p>
        <div className="flex flex-wrap gap-6">
          <ImageUpload
            value={logo}
            onChange={handleLogoChange}
            onUpload={handleLogoUpload}
          />
          <ImageUpload
            value={coverImage}
            onChange={handleCoverChange}
            onUpload={handleCoverUpload}
          />
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
