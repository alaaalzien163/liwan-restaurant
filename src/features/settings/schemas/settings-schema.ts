import { z } from "zod";

export const settingsSchema = z.object({
  restaurantName: z.string().min(1, { message: "Restaurant name is required" }),
  restaurantNameAr: z.string().min(1, { message: "Arabic name is required" }),
  description: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  logo: z.string(),
  coverImage: z.string(),
  themeMode: z.enum(["light", "dark", "system"]),
  primaryColor: z.string().min(1),
  accentColor: z.string().min(1),
  defaultLanguage: z.enum(["en", "ar"]),
  rtlEnabled: z.boolean(),
  dateFormat: z.string().min(1),
  timeFormat: z.string().min(1),
  currency: z.string().min(1),
  businessHours: z.array(
    z.object({
      day: z.string(),
      dayAr: z.string(),
      isOpen: z.boolean(),
      openTime: z.string(),
      closeTime: z.string(),
    }),
  ),
  instagram: z.string(),
  facebook: z.string(),
  tiktok: z.string(),
  whatsapp: z.string(),
  snapchat: z.string(),
  website: z.string(),
  adminName: z.string().min(1, { message: "Admin name is required" }),
  adminEmail: z.string().email({ message: "Invalid email address" }),
  adminAvatar: z.string(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

export const securitySchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SecurityFormData = z.infer<typeof securitySchema>;
