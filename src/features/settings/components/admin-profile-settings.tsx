"use client";

import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { SettingsSection } from "./settings-section";
import { SettingsCard } from "./settings-card";
import { useCallback } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { SettingsFormData } from "../schemas/settings-schema";
import { uploadFile } from "@/infrastructure/supabase/upload";

interface AdminProfileSettingsProps {
  register: UseFormRegister<SettingsFormData>;
  setValue: UseFormSetValue<SettingsFormData>;
  errors: Record<string, { message?: string } | undefined>;
  adminAvatar: string;
}

export function AdminProfileSettings({
  register,
  setValue,
  errors,
  adminAvatar,
}: AdminProfileSettingsProps) {
  const handleAvatarChange = useCallback(
    (url: string) => setValue("adminAvatar", url),
    [setValue],
  );
  const handleAvatarUpload = useCallback(async (file: File) => {
    return uploadFile("avatars", file);
  }, []);

  return (
    <SettingsSection
      title="Admin Profile"
      titleAr="الملف الشخصي"
      description="Manage your administrator account"
    >
      <SettingsCard>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Admin Name"
            placeholder="Ahmed Al-Saud"
            isRequired
            error={errors.adminName?.message}
            {...register("adminName")}
          />
          <Input
            label="Email"
            type="email"
            placeholder="admin@liwanrestaurant.com"
            isRequired
            error={errors.adminEmail?.message}
            {...register("adminEmail")}
          />
        </div>
      </SettingsCard>

      <SettingsCard>
        <p className="text-text-primary mb-4 text-sm font-medium">
          Profile Picture
        </p>
        <ImageUpload
          value={adminAvatar}
          onChange={handleAvatarChange}
          onUpload={handleAvatarUpload}
        />
      </SettingsCard>
    </SettingsSection>
  );
}
