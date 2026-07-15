"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useMemo } from "react";

const LABEL_MAP: Record<string, string> = {
  categories: "Categories",
  "menu-items": "Menu Items",
};

export function Breadcrumb() {
  const pathname = usePathname();

  const segments = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    return parts.map((part, index) => ({
      label:
        LABEL_MAP[part.toLowerCase()] ??
        part.charAt(0).toUpperCase() + part.slice(1),
      href: "/" + parts.slice(0, index + 1).join("/"),
      isLast: index === parts.length - 1,
    }));
  }, [pathname]);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <Link
        href="/dashboard"
        className="text-text-tertiary hover:text-text-primary flex items-center gap-1 transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {segments.map((seg) => (
        <span key={seg.href} className="flex items-center gap-1">
          <ChevronRight className="text-text-tertiary h-3.5 w-3.5" />
          {seg.isLast ? (
            <span className="text-text-primary font-medium" aria-current="page">
              {seg.label}
            </span>
          ) : (
            <Link
              href={seg.href}
              className="text-text-tertiary hover:text-text-primary transition-colors"
            >
              {seg.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
