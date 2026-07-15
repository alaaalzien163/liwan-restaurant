import type { BaseComponentProps } from "@/core/components";
import type { ReactNode } from "react";

export interface PageHeaderProps extends BaseComponentProps {
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  actions?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  onBack?: () => void;
}

export interface DataStateProps extends BaseComponentProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  error?: Error | null;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
  onRetry?: () => void;
}

export interface SearchInputProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  placeholderAr?: string;
  isDebounced?: boolean;
  debounceMs?: number;
}

export interface ConfirmDialogProps extends BaseComponentProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  titleAr?: string;
  message: string;
  messageAr?: string;
  confirmLabel?: string;
  confirmLabelAr?: string;
  cancelLabel?: string;
  cancelLabelAr?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export interface EmptyStateProps extends BaseComponentProps {
  icon?: ReactNode;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  action?: ReactNode;
}

export interface ErrorStateProps extends BaseComponentProps {
  title?: string;
  titleAr?: string;
  message?: string;
  messageAr?: string;
  onRetry?: () => void;
}

export interface StatsCardProps extends BaseComponentProps {
  title: string;
  titleAr?: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
    labelAr?: string;
  };
  isCurrency?: boolean;
}

export interface SectionCardProps extends BaseComponentProps {
  title: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  actions?: ReactNode;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface ActionBarProps extends BaseComponentProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  isSticky?: boolean;
}
