"use client";

import { useAuthStore } from "../stores/auth-store";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions?: string[];
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  requiredPermissions,
  fallback,
}: ProtectedRouteProps) {
  const { user } = useAuthStore();

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  const hasPermissions = requiredPermissions.every((perm) =>
    user?.permissions?.includes(perm),
  );

  if (!hasPermissions) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16">
        <p className="text-text-primary text-lg font-semibold">Access Denied</p>
        <p className="text-text-secondary text-sm">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
