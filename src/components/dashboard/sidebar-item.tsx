"use client";

import { cn } from "@core/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { NavItem } from "./navigation";

interface SidebarItemProps {
  item: NavItem;
  isCollapsed: boolean;
  onClick?: () => void;
}

export function SidebarItem({ item, isCollapsed, onClick }: SidebarItemProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "group focus-visible:ring-primary-500 focus-visible:ring-offset-surface relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        isActive
          ? "bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-400"
          : "text-text-secondary hover:bg-surface-tertiary hover:text-text-primary",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        <motion.span
          layoutId="sidebar-active"
          className="bg-primary-50 dark:bg-primary-950/30 absolute inset-0 rounded-xl"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3">
        <item.icon className="h-5 w-5 shrink-0" />
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15 }}
          >
            {t(item.label)}
          </motion.span>
        )}
      </span>
    </Link>
  );
}
