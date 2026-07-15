import type { StaffMemberEntity } from "../entities/staff-member";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PinLoginRequest {
  pinCode: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  staffId?: string;
  staff?: StaffMemberEntity;
  profileImageUrl?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IAuthRepository {
  login(request: LoginRequest): Promise<AuthSession>;
  loginWithPin(request: PinLoginRequest): Promise<AuthSession>;
  refreshToken(request: RefreshTokenRequest): Promise<AuthSession>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthUser>;
  changePassword(request: ChangePasswordRequest): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}
