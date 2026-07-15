"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { I18nProvider } from "@/i18n";
import { Toaster } from "sonner";
import { useTranslation } from "react-i18next";

interface AppProvidersProps {
  children: ReactNode;
  locale?: string;
  direction?: "ltr" | "rtl";
}

function AppProvidersInner({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const lang = i18n.language;

  return (
    <>
      <div dir={dir} lang={lang}>
        {children}
      </div>
      <Toaster
        position={dir === "rtl" ? "top-left" : "top-right"}
        richColors
        closeButton
      />
    </>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <I18nProvider>
          <AppProvidersInner>{children}</AppProvidersInner>
        </I18nProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
