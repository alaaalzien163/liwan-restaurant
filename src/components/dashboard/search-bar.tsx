"use client";

import { cn } from "@core/lib/utils";
import { Search } from "lucide-react";
import { type InputHTMLAttributes, forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  isMobile?: boolean;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, isMobile, ...props }, ref) => {
    const { t } = useTranslation();
    return (
      <div className={cn("relative", className)}>
        <Search className="text-text-tertiary absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <input
          ref={ref}
          type="search"
          placeholder={t("dashboard.searchPlaceholder")}
          className={cn(
            "border-border bg-surface text-text-primary placeholder-text-tertiary focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-lg border py-2 ps-10 pe-3 text-sm transition-colors focus:ring-2 focus:outline-none",
            isMobile && "lg:hidden",
          )}
          aria-label={t("common.search")}
          {...props}
        />
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";
