"use client";

import { SearchInput } from "@/components/ui/search-input";
import { useCategoryStore } from "../stores/category-store";
import { useCallback } from "react";
import { cn } from "@core/lib/utils";
import { useTranslation } from "react-i18next";

export function CategorySearch() {
  const { t } = useTranslation();
  const {
    search,
    statusFilter,
    sortBy,
    sortOrder,
    setSearch,
    setStatusFilter,
    setSortBy,
    setSortOrder,
  } = useCategoryStore();

  const FILTER_OPTIONS = [
    { value: "all", label: t("categories.search.filterAll") },
    { value: "active", label: t("categories.search.filterActive") },
    { value: "inactive", label: t("categories.search.filterInactive") },
  ] as const;

  const SORT_OPTIONS = [
    { value: "displayOrder", label: t("categories.search.sortDisplayOrder") },
    { value: "name", label: t("categories.search.sortName") },
    { value: "createdAt", label: t("categories.search.sortCreated") },
  ] as const;

  const handleSortClick = useCallback(() => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }, [sortOrder, setSortOrder]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("categories.search.placeholder")}
          className="max-w-xs"
        />
      </div>

      <div className="flex items-center gap-2">
        <div
          className="border-border bg-surface flex rounded-lg border p-0.5"
          role="group"
          aria-label={t("categories.search.filterStatus")}
        >
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStatusFilter(opt.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === opt.value
                  ? "bg-primary-500 text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary",
              )}
              aria-pressed={statusFilter === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-border bg-surface text-text-primary focus:ring-primary-500/20 rounded-lg border px-2.5 py-1.5 text-xs font-medium focus:ring-2 focus:outline-none"
            aria-label={t("categories.search.sortBy")}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSortClick}
            className="border-border bg-surface text-text-secondary hover:text-text-primary rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors"
            aria-label={
              sortOrder === "asc"
                ? t("common.sortDescending")
                : t("common.sortAscending")
            }
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>
    </div>
  );
}
