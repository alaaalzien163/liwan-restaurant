import type { ReactNode } from "react";
import type { BaseComponentProps } from "@/core/components";

export interface DashboardLayoutProps extends BaseComponentProps {
  sidebar?: ReactNode;
  header?: ReactNode;
  main: ReactNode;
}

export interface AuthLayoutProps extends BaseComponentProps {
  title: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  children: ReactNode;
}

export interface SidebarLayoutProps extends BaseComponentProps {
  navigation: Array<{
    id: string;
    label: string;
    labelAr?: string;
    icon?: ReactNode;
    href: string;
    badge?: number;
    children?: Array<{
      id: string;
      label: string;
      labelAr?: string;
      href: string;
    }>;
  }>;
  isCollapsed: boolean;
  onToggle: () => void;
  activeItemId?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export interface HeaderLayoutProps extends BaseComponentProps {
  title: string;
  titleAr?: string;
  onMenuToggle?: () => void;
  actions?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  showBackButton?: boolean;
  onBack?: () => void;
}

export interface ContentLayoutProps extends BaseComponentProps {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}
