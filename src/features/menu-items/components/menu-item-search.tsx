"use client";

import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { useMenuItemStore } from "../stores/menu-item-store";
import { useCategories } from "@/features/categories/hooks";
import { useCallback, useMemo } from "react";
import { cn } from "@core/lib/utils";
import { useTranslation } from "react-i18next";

export function MenuItemSearch() {
  const { t } = useTranslation();

  const AVAILABILITY_OPTIONS = [
    { value: "all", label: t("menuItems.search.allItems") },
    { value: "available", label: t("menuItems.search.filterAvailable") },
    { value: "unavailable", label: t("menuItems.search.filterUnavailable") },
  ] as const;

  const FEATURED_OPTIONS = [
    { value: "all", label: t("menuItems.search.allFeatured") },
    { value: "featured", label: t("common.featured") },
    { value: "not-featured", label: t("common.notFeatured") },
  ] as const;

  const SORT_OPTIONS = [
    { value: "displayOrder", label: t("menuItems.search.sortDisplayOrder") },
    { value: "name", label: t("menuItems.search.sortName") },
    { value: "price", label: t("menuItems.search.sortPrice") },
    { value: "createdAt", label: t("menuItems.search.sortCreated") },
  ] as const;

  const {
    search,
    categoryFilter,
    availabilityFilter,
    featuredFilter,
    sortBy,
    sortOrder,
    setSearch,
    setCategoryFilter,
    setAvailabilityFilter,
    setFeaturedFilter,
    setSortBy,
    setSortOrder,
  } = useMenuItemStore();

  const { data: categoriesData } = useCategories({ page: 1, pageSize: 50 });

  const categoryOptions = useMemo(() => {
    const opts = [{ value: "", label: t("menuItems.search.allCategories") }];
    if (categoriesData?.data) {
      for (const cat of categoriesData.data) {
        opts.push({ value: cat.id, label: cat.name });
      }
    }
    return opts;
  }, [categoriesData, t]);

  const handleSortClick = useCallback(() => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }, [sortOrder, setSortOrder]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("menuItems.search.placeholder")}
          className="sm:max-w-xs"
        />

        <div className="flex flex-wrap items-center gap-2">
          <Select
            options={categoryOptions}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-40"
            aria-label={t("common.filterBy", { label: t("common.category") })}
          />

          <div
            className="border-border bg-surface flex rounded-lg border p-0.5"
            role="group"
            aria-label={t("menuItems.search.filterAvailability")}
          >
            {AVAILABILITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAvailabilityFilter(opt.value)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                  availabilityFilter === opt.value
                    ? "bg-primary-500 text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary",
                )}
                aria-pressed={availabilityFilter === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div
            className="border-border bg-surface flex rounded-lg border p-0.5"
            role="group"
            aria-label={t("menuItems.search.filterFeatured")}
          >
            {FEATURED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFeaturedFilter(opt.value)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                  featuredFilter === opt.value
                    ? "bg-primary-500 text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary",
                )}
                aria-pressed={featuredFilter === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Select
          options={SORT_OPTIONS.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-36"
          aria-label={t("common.sortByLabel")}
        />
        <button
          type="button"
          onClick={handleSortClick}
          className="border-border bg-surface text-text-secondary hover:text-text-primary rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors"
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
  );
}
