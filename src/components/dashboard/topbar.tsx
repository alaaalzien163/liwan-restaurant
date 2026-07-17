"use client";

import { useUIStore } from "@core/stores/ui-store";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "./breadcrumb";
import { UserMenu } from "./user-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { Menu, UtensilsCrossed } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const TITLE_MAP: Record<string, string> = {
  categories: "nav.categories",
  "menu-items": "nav.menuItems",
};

export function Topbar() {
  const { toggleSidebar } = useUIStore();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const pageTitle = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1]?.toLowerCase() ?? "";
    const key = TITLE_MAP[last] ?? "nav.dashboard";
    return t(key);
  }, [pathname, t]);

  return (
    <header
      className="border-border bg-surface/80 sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-4 backdrop-blur-xl lg:px-6"
      role="banner"
    >
      <button
        type="button"
        onClick={toggleSidebar}
        className="text-text-secondary hover:bg-surface-tertiary hover:text-text-primary focus-visible:ring-primary-500 inline-flex rounded-lg p-2 transition-colors focus:outline-none focus-visible:ring-2 lg:hidden"
        aria-label={t("nav.toggleSidebar")}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-3 lg:hidden">
        <div className="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-lg text-white">
          <UtensilsCrossed className="h-4 w-4" />
        </div>
        <span className="text-text-primary text-sm font-bold">
          {t("common.appName")}
        </span>
      </div>

      <div className="hidden flex-1 lg:block">
        <div className="flex items-center gap-4">
          <h1 className="text-text-primary text-lg font-semibold">
            {pageTitle}
          </h1>
          <Breadcrumb />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="hidden sm:block">
          <LanguageSwitch
            currentLocale={i18n.language}
            onLocaleChange={(code) => i18n.changeLanguage(code)}
          />
        </div>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
