import type { ReactNode } from "react";

export interface PermissionProviderProps {
  children: ReactNode;
  permissions: string[];
}

export interface DirectionProviderProps {
  children: ReactNode;
  direction: "ltr" | "rtl";
}

export interface LocaleProviderProps {
  children: ReactNode;
  locale: string;
  messages?: Record<string, string>;
}
