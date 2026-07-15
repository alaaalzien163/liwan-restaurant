export interface UsePaginatedListParams<TFilters> {
  filters?: TFilters;
  initialPage?: number;
  initialPageSize?: number;
}

export interface UsePaginatedListReturn<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: unknown) => void;
  refetch: () => void;
}

export interface UseFormReturn<TFormData> {
  register: (name: keyof TFormData) => unknown;
  handleSubmit: (
    onSubmit: (data: TFormData) => void,
  ) => (e?: React.FormEvent) => void;
  formState: {
    errors: Partial<Record<keyof TFormData, { message?: string }>>;
    isSubmitting: boolean;
    isDirty: boolean;
    isValid: boolean;
  };
  reset: (data?: TFormData) => void;
  setValue: (name: keyof TFormData, value: unknown) => void;
  getValues: () => TFormData;
  watch: (name: keyof TFormData) => unknown;
}

export interface UseSearchParams {
  query: string;
  debouncedQuery: string;
  setQuery: (query: string) => void;
  clearSearch: () => void;
}

export interface UsePermissionReturn {
  can: (permission: string) => boolean;
  canAny: (permissions: string[]) => boolean;
  canAll: (permissions: string[]) => boolean;
}

export interface UseConfirmReturn {
  isOpen: boolean;
  confirm: (options: {
    title: string;
    titleAr?: string;
    message: string;
    messageAr?: string;
    onConfirm: () => void;
    variant?: "danger" | "warning" | "info";
  }) => void;
  close: () => void;
}
