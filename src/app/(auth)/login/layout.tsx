import type { ReactNode } from "react";

export const metadata = {
  title: "Sign In | Liwan Restaurant",
  description: "Sign in to Liwan Restaurant Management System",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
