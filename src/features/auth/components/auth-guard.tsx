"use client";

import { useAuthStore } from "../stores/auth-store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_ROUTES = ["/login"];

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    checkAuth().finally(() => setInitialized(true));
  }, [checkAuth]);

  useEffect(() => {
    if (!initialized) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
    }

    if (isAuthenticated && isPublicRoute) {
      router.replace("/");
    }
  }, [initialized, isAuthenticated, isPublicRoute, router]);

  if (!initialized || isLoading) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}
