export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | undefined;
}

export interface FieldConfig {
  name: string;
  label: string;
  labelAr?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "select"
    | "checkbox"
    | "radio"
    | "textarea"
    | "date"
    | "time";
  placeholder?: string;
  placeholderAr?: string;
  rules?: ValidationRule;
  options?: Array<{ label: string; labelAr?: string; value: string }>;
  defaultValue?: unknown;
}

export interface FormConfig {
  fields: FieldConfig[];
  submitLabel: string;
  submitLabelAr?: string;
  cancelLabel?: string;
  cancelLabelAr?: string;
}

export interface TableColumnConfig<T> {
  key: keyof T | string;
  header: string;
  headerAr?: string;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (item: T) => string | number | React.ReactNode;
}

export interface ExportConfig {
  filename: string;
  format: "csv" | "pdf" | "excel";
  columns: Array<{ key: string; header: string }>;
  data: Record<string, unknown>[];
}
