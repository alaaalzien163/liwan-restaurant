import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type AsProp<T extends ElementType> = {
  as?: T;
};

export type PolymorphicProps<
  T extends ElementType,
  P = Record<string, unknown>,
> = AsProp<T> & ComponentPropsWithoutRef<T> & P;

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  "data-testid"?: string;
}

export type VariantProps<T extends string = string> = {
  variant?: T;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  isLoading?: boolean;
};

export interface ButtonBaseProps
  extends
    BaseComponentProps,
    VariantProps<"primary" | "secondary" | "ghost" | "danger"> {
  type?: "button" | "submit" | "reset";
  isFullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface InputBaseProps
  extends BaseComponentProps, VariantProps<"outlined" | "filled"> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isError?: boolean;
  errorMessage?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface SelectBaseProps
  extends BaseComponentProps, VariantProps<"outlined" | "filled"> {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
}

export interface ModalBaseProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  isCentered?: boolean;
  showCloseButton?: boolean;
  isDismissable?: boolean;
}

export interface CardBaseProps extends BaseComponentProps {
  isHoverable?: boolean;
  isPressable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export interface TableBaseProps<T> extends BaseComponentProps {
  data: T[];
  columns: Array<{
    key: string;
    header: string;
    headerAr?: string;
    sortable?: boolean;
    render?: (item: T) => ReactNode;
  }>;
  isLoading?: boolean;
  isSelectable?: boolean;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  emptyMessageAr?: string;
}

export interface BadgeBaseProps extends BaseComponentProps {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  isDot?: boolean;
}

export interface AvatarBaseProps extends BaseComponentProps {
  src?: string;
  alt: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: ReactNode;
}

export interface TabsBaseProps extends BaseComponentProps {
  tabs: Array<{
    id: string;
    label: string;
    labelAr?: string;
    icon?: ReactNode;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  orientation?: "horizontal" | "vertical";
}
