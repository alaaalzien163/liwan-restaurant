import type { Locale, Theme, Direction } from "@/core/types";

export interface AppStoreState {
  locale: Locale;
  direction: Direction;
  sidebarOpen: boolean;
  isMobile: boolean;
}

export interface AppStoreActions {
  setLocale: (locale: Locale) => void;
  setDirection: (direction: Direction) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
}

export type AppStore = AppStoreState & AppStoreActions;

export interface AuthStoreState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
    profileImageUrl?: string;
  } | null;
}

export interface AuthStoreActions {
  login: (user: AuthStoreState["user"]) => void;
  logout: () => void;
  updateUser: (user: Partial<NonNullable<AuthStoreState["user"]>>) => void;
  setPermissions: (permissions: string[]) => void;
}

export type AuthStore = AuthStoreState & AuthStoreActions;

export interface UiStoreState {
  theme: Theme;
  toasts: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    duration?: number;
  }>;
  modals: Array<{
    id: string;
    isOpen: boolean;
    data?: unknown;
  }>;
  isGlobalLoading: boolean;
}

export interface UiStoreActions {
  setTheme: (theme: Theme) => void;
  addToast: (toast: Omit<UiStoreState["toasts"][number], "id">) => void;
  removeToast: (id: string) => void;
  openModal: (id: string, data?: unknown) => void;
  closeModal: (id: string) => void;
  setGlobalLoading: (loading: boolean) => void;
}

export type UiStore = UiStoreState & UiStoreActions;
