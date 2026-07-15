import type {
  IAuthRepository,
  LoginRequest,
  PinLoginRequest,
  RefreshTokenRequest,
  AuthSession,
  AuthUser,
  ChangePasswordRequest,
} from "@/domain/repositories/auth-repository";
import { getSupabaseClient } from "../client";

function toAuthUser(user: import("@supabase/supabase-js").User): AuthUser {
  const meta = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? "",
    name: meta.name ?? user.email?.split("@")[0] ?? "User",
    role: meta.role ?? "staff",
    permissions: meta.permissions ?? [],
    staffId: meta.staff_id,
    profileImageUrl: meta.avatar_url ?? meta.profile_image_url,
  };
}

function toAuthSession(
  session: import("@supabase/supabase-js").Session,
): AuthSession {
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: new Date(session.expires_at! * 1000).toISOString(),
    user: toAuthUser(session.user),
  };
}

export class SupabaseAuthRepository implements IAuthRepository {
  async login(request: LoginRequest): Promise<AuthSession> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: request.email,
      password: request.password,
    });
    if (error) throw new Error(error.message);
    if (!data.session) throw new Error("No session returned from Supabase");
    return toAuthSession(data.session);
  }

  async loginWithPin(_request: PinLoginRequest): Promise<AuthSession> {
    throw new Error("PIN login not supported with Supabase Auth");
  }

  async refreshToken(request: RefreshTokenRequest): Promise<AuthSession> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: request.refreshToken,
    });
    if (error) throw new Error(error.message);
    if (!data.session) throw new Error("No session returned from refresh");
    return toAuthSession(data.session);
  }

  async logout(): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getCurrentUser(): Promise<AuthUser> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);
    if (!data.session?.user) throw new Error("No authenticated user");
    return toAuthUser(data.session.user);
  }

  async changePassword(request: ChangePasswordRequest): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.updateUser({
      password: request.newPassword,
    });
    if (error) throw new Error(error.message);
  }

  async requestPasswordReset(email: string): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(error.message);
  }

  async resetPassword(_token: string, _newPassword: string): Promise<void> {
    throw new Error(
      "Password reset via token is handled by Supabase magic links",
    );
  }
}
