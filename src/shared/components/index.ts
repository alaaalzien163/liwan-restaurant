import type { ReactNode } from "react";
import type { BaseComponentProps } from "@/core/components";

export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white";
  label?: string;
  labelAr?: string;
}

export interface SkeletonProps extends BaseComponentProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  variant?: "text" | "circular" | "rectangular";
  count?: number;
}

export interface DividerProps extends BaseComponentProps {
  orientation?: "horizontal" | "vertical";
  thickness?: string;
  color?: string;
  label?: string;
  labelAr?: string;
}

export interface TooltipProps extends BaseComponentProps {
  content: string;
  contentAr?: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  children: ReactNode;
}

export interface ChipProps extends BaseComponentProps {
  label: string;
  labelAr?: string;
  variant?: "filled" | "outlined" | "soft";
  color?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  isRemovable?: boolean;
  onRemove?: () => void;
  icon?: ReactNode;
}

export interface ProgressBarProps extends BaseComponentProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "warning" | "danger";
  showLabel?: boolean;
  isIndeterminate?: boolean;
  label?: string;
  labelAr?: string;
}

export interface NotificationBadgeProps extends BaseComponentProps {
  count?: number;
  isDot?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "danger" | "primary" | "success" | "warning";
  children: ReactNode;
  isVisible?: boolean;
}

export interface OverlayProps extends BaseComponentProps {
  isOpen: boolean;
  onClose?: () => void;
  isDismissable?: boolean;
  blur?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

export interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

export interface IconButtonProps
  extends BaseComponentProps, Pick<ChipProps, "size" | "color"> {
  icon: ReactNode;
  label: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}
