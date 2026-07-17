"use client";

import { useAuthStore } from "@/features/auth/stores/auth-store";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  },
  exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.12 } },
};

export function UserMenu() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => setIsOpen((p) => !p), []);

  const handleLogout = useCallback(async () => {
    setIsOpen(false);
    await logout();
    router.replace("/login");
  }, [logout, router]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="hover:bg-surface-tertiary focus-visible:ring-primary-500 flex items-center gap-2 rounded-xl p-1.5 transition-colors focus:outline-none focus-visible:ring-2"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t("nav.userMenu")}
      >
        <Avatar
          name={user?.name ?? t("nav.profile")}
          alt={user?.name ?? t("nav.profile")}
          size="sm"
          className="ring-border ring-2"
        />
        <div className="hidden text-start lg:block">
          <p className="text-text-primary text-sm leading-tight font-medium">
            {user?.name ?? t("nav.profile")}
          </p>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="border-border bg-surface absolute end-0 top-full z-50 mt-2 w-56 rounded-xl border shadow-xl"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="menu"
          >
            <div className="border-border border-b px-4 py-3">
              <p className="text-text-primary text-sm font-medium">
                {user?.name}
              </p>
              <p className="text-text-tertiary text-xs">{user?.email}</p>
            </div>
            <div className="p-2">
              <button
                type="button"
                onClick={handleLogout}
                className="text-text-secondary hover:bg-surface-tertiary hover:text-danger-500 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
                role="menuitem"
              >
                <LogOut className="h-4 w-4" />
                {t("nav.logout")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
