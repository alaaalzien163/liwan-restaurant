"use client";

import { cn } from "@core/lib/utils";
import { useUIStore } from "@core/stores/ui-store";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, ChevronLeft, UtensilsCrossed } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from "./navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useCallback } from "react";

const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  closed: { x: "-100%", transition: { duration: 0.2 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function Sidebar() {
  const { sidebarOpen, sidebarCollapsed, closeSidebar, setSidebarCollapsed } =
    useUIStore();
  const { logout } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = useCallback(async () => {
    await logout();
    closeSidebar();
    router.replace("/login");
  }, [logout, closeSidebar, router]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    if (sidebarOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [sidebarOpen, closeSidebar]);

  const sidebarContent = (
    <nav
      className={cn(
        "bg-surface border-border flex h-full flex-col border-e",
        sidebarCollapsed ? "w-[72px]" : "w-64",
      )}
      aria-label={t("nav.mainNavigation")}
      role="navigation"
    >
      <div
        className={cn(
          "border-border flex h-16 items-center border-b px-4",
          sidebarCollapsed ? "justify-center" : "justify-between",
        )}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary-500 flex h-9 w-9 items-center justify-center rounded-xl text-white">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-text-primary truncate text-base font-bold"
              >
                {t("common.appName")}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {!sidebarCollapsed && (
          <button
            type="button"
            onClick={() => setSidebarCollapsed(true)}
            className="text-text-tertiary hover:bg-surface-tertiary hover:text-text-primary hidden rounded-lg p-1.5 transition-colors lg:inline-flex"
            aria-label={t("nav.collapseSidebar")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="scrollbar-hide flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.href}
              item={item}
              isCollapsed={sidebarCollapsed}
              onClick={closeSidebar}
            />
          ))}
        </div>
      </div>

      <div className="border-border border-t p-3">
        <div className="flex flex-col gap-1">
          {BOTTOM_NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.href}
              item={item}
              isCollapsed={sidebarCollapsed}
              onClick={closeSidebar}
            />
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "text-text-secondary hover:bg-surface-tertiary hover:text-danger-500 focus-visible:ring-danger-500 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2",
              sidebarCollapsed && "justify-center",
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>{t("nav.logout")}</span>}
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="fixed inset-y-0 start-0 z-50 lg:hidden"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden lg:block">{sidebarContent}</aside>
    </>
  );
}
