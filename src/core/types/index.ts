export type Direction = "ltr" | "rtl";

export type Locale = "en" | "ar";

export type Theme = "light" | "dark" | "system";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  success: boolean;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};
