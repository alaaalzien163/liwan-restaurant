export interface BusinessDay {
  day: string;
  dayAr: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface SettingsRecord {
  restaurantName: string;
  restaurantNameAr: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  coverImage: string;
  themeMode: "light" | "dark" | "system";
  primaryColor: string;
  accentColor: string;
  defaultLanguage: "en" | "ar";
  rtlEnabled: boolean;
  dateFormat: string;
  timeFormat: string;
  currency: string;
  businessHours: BusinessDay[];
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
  snapchat: string;
  website: string;
  adminName: string;
  adminEmail: string;
  adminAvatar: string;
}
