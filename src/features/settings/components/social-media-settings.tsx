"use client";

import { Input } from "@/components/ui/input";
import { SettingsSection } from "./settings-section";
import { SettingsCard } from "./settings-card";
import {
  Instagram,
  Facebook,
  Music2,
  MessageCircle,
  Camera,
  Globe,
} from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import type { SettingsFormData } from "../schemas/settings-schema";

interface SocialMediaSettingsProps {
  register: UseFormRegister<SettingsFormData>;
}

const SOCIAL_FIELDS = [
  {
    key: "instagram" as const,
    label: "Instagram",
    icon: Instagram,
    placeholder: "https://instagram.com/yourpage",
  },
  {
    key: "facebook" as const,
    label: "Facebook",
    icon: Facebook,
    placeholder: "https://facebook.com/yourpage",
  },
  {
    key: "tiktok" as const,
    label: "TikTok",
    icon: Music2,
    placeholder: "https://tiktok.com/@yourpage",
  },
  {
    key: "whatsapp" as const,
    label: "WhatsApp",
    icon: MessageCircle,
    placeholder: "+966 55 123 4567",
  },
  {
    key: "snapchat" as const,
    label: "Snapchat",
    icon: Camera,
    placeholder: "https://snapchat.com/add/yourpage",
  },
  {
    key: "website" as const,
    label: "Website",
    icon: Globe,
    placeholder: "https://yourwebsite.com",
  },
];

export function SocialMediaSettings({ register }: SocialMediaSettingsProps) {
  return (
    <SettingsSection
      title="Social Media"
      titleAr="وسائل التواصل الاجتماعي"
      description="Connect your social media accounts"
    >
      <SettingsCard>
        <div className="grid gap-6 sm:grid-cols-2">
          {SOCIAL_FIELDS.map((field) => (
            <Input
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              leftIcon={<field.icon className="h-4 w-4" />}
              {...register(field.key)}
            />
          ))}
        </div>
      </SettingsCard>
    </SettingsSection>
  );
}
