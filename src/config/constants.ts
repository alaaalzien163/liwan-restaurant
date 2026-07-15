export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Liwan Restaurant";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
export const API_TIMEOUT = Number(process.env.API_TIMEOUT ?? 30000);

export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export const DEFAULT_LOCALE = "en";

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PREPARING: "preparing",
  READY: "ready",
  SERVED: "served",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;

export const TABLE_STATUS = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  RESERVED: "reserved",
  MAINTENANCE: "maintenance",
} as const;

export const PAYMENT_METHODS = {
  CASH: "cash",
  CARD: "card",
  WALLET: "wallet",
  BANK_TRANSFER: "bank_transfer",
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  CHEF: "chef",
  WAITER: "waiter",
  CASHIER: "cashier",
} as const;
