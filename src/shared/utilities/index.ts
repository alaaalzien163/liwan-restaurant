export interface ValidationErrors {
  [field: string]: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export interface FileValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
  maxFiles?: number;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterConfig {
  field: string;
  operator:
    "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "in" | "between";
  value: unknown;
  value2?: unknown;
}

export interface SearchConfig {
  query: string;
  fields: string[];
  mode?: "any" | "all";
  caseSensitive?: boolean;
}

export interface GroupedData<T> {
  key: string;
  label: string;
  count: number;
  items: T[];
}

export interface AggregationResult {
  sum?: number;
  avg?: number;
  min?: number;
  max?: number;
  count: number;
}
