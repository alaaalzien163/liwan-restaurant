"use client";

import { cn } from "@core/lib/utils";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("flex-1 overflow-y-auto p-4 lg:p-6", className)}>
      {children}
    </main>
  );
}
