import type { ReactNode } from "react";

export type Maybe<T> = T | null | undefined;

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

export type ValueOf<T> = T[keyof T];

export type KeysWithValue<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

export interface BreadcrumbItem {
  label: string;
  labelAr?: string;
  href?: string;
  icon?: ReactNode;
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  titleAr?: string;
  message?: string;
  messageAr?: string;
  duration?: number;
  isPersistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface TabItem {
  id: string;
  label: string;
  labelAr?: string;
  icon?: ReactNode;
  badge?: number;
  isDisabled?: boolean;
}

export interface DropdownItem {
  id: string;
  label: string;
  labelAr?: string;
  icon?: ReactNode;
  shortcut?: string;
  isDisabled?: boolean;
  isDanger?: boolean;
  onClick?: () => void;
  divider?: boolean;
  children?: DropdownItem[];
}

export interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Address {
  street: string;
  streetAr?: string;
  city: string;
  cityAr?: string;
  district: string;
  districtAr?: string;
  building?: string;
  apartment?: string;
  coordinates?: Coordinate;
  notes?: string;
}
