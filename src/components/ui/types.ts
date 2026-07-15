import type { ReactNode } from "react";

export type Size = "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type InputVariant = "outlined" | "filled";
export type BadgeVariant =
  "default" | "success" | "warning" | "danger" | "info";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
  "data-testid"?: string;
}

export interface VariantProps {
  size?: Size;
  isDisabled?: boolean;
  isLoading?: boolean;
}
