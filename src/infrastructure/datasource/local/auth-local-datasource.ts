import type { AuthSession } from "@/domain/repositories/auth-repository";

export interface IAuthLocalDataSource {
  getSession(): Promise<AuthSession | null>;
  saveSession(session: AuthSession): Promise<void>;
  clearSession(): Promise<void>;
  getAccessToken(): Promise<string | null>;
  getRefreshToken(): Promise<string | null>;
}
