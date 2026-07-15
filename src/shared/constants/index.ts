export const APP_NAME = "Liwan Restaurant";
export const APP_NAME_AR = "مطعم ليوان";
export const APP_VERSION = "0.1.0";

export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export const DEFAULT_LOCALE = "en";
export const DEFAULT_DIRECTION = "ltr";

export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100] as const,
};

export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  DISPLAY_AR: "dd MMMM yyyy",
  ISO: "yyyy-MM-dd",
  TIME: "HH:mm",
  DATETIME: "MMM dd, yyyy HH:mm",
  DATETIME_AR: "dd MMMM yyyy HH:mm",
} as const;

export const CURRENCY = {
  CODE: "SAR",
  SYMBOL: "﷼",
  LOCALE_EN: "en-SA",
  LOCALE_AR: "ar-SA",
} as const;

export const ORDER_STATUS_COLORS = {
  pending: "warning",
  confirmed: "info",
  preparing: "info",
  ready: "success",
  served: "success",
  cancelled: "danger",
  completed: "default",
} as const;

export const TABLE_STATUS_COLORS = {
  available: "success",
  occupied: "danger",
  reserved: "warning",
  cleaning: "info",
  maintenance: "default",
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "liwan_auth_token",
  REFRESH_TOKEN: "liwan_refresh_token",
  THEME: "liwan_theme",
  LOCALE: "liwan_locale",
  SIDEBAR_STATE: "liwan_sidebar_state",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGIN_PIN: "/auth/login/pin",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    CHANGE_PASSWORD: "/auth/change-password",
  },
  MENU: {
    BASE: "/menu",
    CATEGORIES: "/menu/categories",
    ITEMS: "/menu/items",
  },
  ORDERS: {
    BASE: "/orders",
    TODAY: "/orders/today",
    ACTIVE: "/orders/active",
  },
  RESERVATIONS: {
    BASE: "/reservations",
    TODAY: "/reservations/today",
    UPCOMING: "/reservations/upcoming",
    SLOTS: "/reservations/slots",
  },
  INVENTORY: {
    BASE: "/inventory",
    LOW_STOCK: "/inventory/low-stock",
    VALUE: "/inventory/value",
  },
  STAFF: {
    BASE: "/staff",
    AVAILABLE: "/staff/available",
    ON_DUTY: "/staff/on-duty",
    SCHEDULE: "/staff/schedule",
    ATTENDANCE: "/staff/attendance",
  },
  TABLES: {
    BASE: "/tables",
    AVAILABLE: "/tables/available",
    ZONES: "/tables/zones",
  },
  INVOICES: {
    BASE: "/invoices",
    TODAY: "/invoices/today",
    REVENUE: "/invoices/revenue",
    NUMBER: "/invoices/number",
  },
  CUSTOMERS: {
    BASE: "/customers",
    SEARCH: "/customers/search",
    VIP: "/customers/vip",
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },
} as const;
