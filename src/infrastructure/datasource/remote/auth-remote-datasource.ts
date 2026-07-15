import type {
  LoginRequest,
  PinLoginRequest,
  AuthSession,
  RefreshTokenRequest,
  ChangePasswordRequest,
} from "@/domain/repositories/auth-repository";

export interface IAuthRemoteDataSource {
  login(request: LoginRequest): Promise<AuthSession>;
  loginWithPin(request: PinLoginRequest): Promise<AuthSession>;
  refreshToken(request: RefreshTokenRequest): Promise<AuthSession>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthSession["user"]>;
  changePassword(request: ChangePasswordRequest): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}
