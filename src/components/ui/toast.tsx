"use client";

import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import { useTheme } from "next-themes";
import { cn } from "@core/lib/utils";

export function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:bg-surface group-[.toaster]:text-text-primary group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          ),
          description: "group-[.toast]:text-text-secondary text-sm",
          actionButton:
            "group-[.toast]:bg-primary-500 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-surface-tertiary group-[.toast]:text-text-primary",
          error: "group-[.toaster]:border-danger-500",
          success: "group-[.toaster]:border-success-500",
          warning: "group-[.toaster]:border-warning-500",
          info: "group-[.toaster]:border-secondary-500",
        },
      }}
      {...props}
    />
  );
}
