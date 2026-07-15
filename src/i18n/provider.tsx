"use client";

import { type ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface I18nProviderProps {
  children: ReactNode;
}

function I18nInner({ children }: { children: ReactNode }) {
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    const dir = i18nInstance.dir();
    document.documentElement.dir = dir;
    document.documentElement.lang = i18nInstance.language;
  }, [i18nInstance.language, i18nInstance]);

  return <>{children}</>;
}

export function I18nProvider({ children }: I18nProviderProps) {
  return <I18nInner>{children}</I18nInner>;
}
