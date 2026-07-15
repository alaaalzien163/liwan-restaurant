"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/domain/repositories/auth-repository";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type { IAuthRepository } from "@/domain/repositories/auth-repository";
import { getSupabaseClient } from "@/infrastructure/supabase/client";

const getAuthRepo = () =>
  getRepository<IAuthRepository>(DI_TOKENS.AUTH_REPOSITORY);

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const session = await getAuthRepo().login({ email, password });
          await getSupabaseClient().auth.setSession({
            access_token: session.accessToken,
            refresh_token: session.refreshToken,
          });
          set({ user: session.user, isAuthenticated: true, isLoading: false });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Login failed";
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        try {
          await getAuthRepo().logout();
        } catch {
          // proceed even if server logout fails
        }
        set({ user: null, isAuthenticated: false, error: null });
      },

      checkAuth: async () => {
        try {
          const user = await getAuthRepo().getCurrentUser();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "liwan-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
