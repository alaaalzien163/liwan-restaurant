"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePublicCategories } from "../hooks/use-public-categories";
import { usePublicMenuItems } from "../hooks/use-public-menu-items";
import { cn } from "@core/lib/utils";
import { useTranslation } from "react-i18next";

function MenuSkeleton() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="border-border bg-surface overflow-hidden rounded-xl border"
        >
          <div className="bg-surface-tertiary aspect-[3/2] animate-pulse" />
          <div className="space-y-2 p-3 sm:p-4">
            <div className="bg-surface-tertiary h-5 w-3/4 animate-pulse rounded" />
            <div className="bg-surface-tertiary h-4 w-1/3 animate-pulse rounded" />
            <div className="bg-surface-tertiary mt-2 h-3 w-full animate-pulse rounded" />
            <div className="bg-surface-tertiary h-3 w-2/3 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MenuSection() {
  const { t } = useTranslation();
  const {
    data: categories,
    isLoading: catLoading,
    isError: catError,
  } = usePublicCategories();
  const {
    data: items,
    isLoading: itemsLoading,
    isError: itemsError,
    refetch,
  } = usePublicMenuItems();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const activeId = activeCategory ?? categories?.[0]?.id ?? null;
  const filteredItems = items?.filter((i) => i.categoryId === activeId) ?? [];

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeId]);

  const isLoading = catLoading || itemsLoading;
  const isError = catError || itemsError;

  return (
    <section id="menu" className="bg-surface-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-primary-500 text-xs font-semibold tracking-widest uppercase">
            {t("landing.menu.sectionLabel")}
          </span>
          <h2 className="text-text-primary mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.menu.heading")}
          </h2>
          <p className="text-text-secondary mx-auto mt-3 max-w-xl">
            {t("landing.menu.description")}
          </p>
        </motion.div>

        {categories && categories.length > 0 && (
          <div
            ref={scrollRef}
            className="scrollbar-hide mt-10 flex gap-3 overflow-x-auto px-1 pb-2 rtl:space-x-reverse"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                ref={cat.id === activeId ? activeTabRef : undefined}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all",
                  activeId === cat.id
                    ? "border-primary-500 bg-primary-500/10 shadow-sm"
                    : "border-border bg-surface hover:border-primary-200 hover:bg-primary-50 dark:hover:border-primary-800 dark:hover:bg-primary-950/20",
                )}
              >
                {cat.image ? (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg">
                    {cat.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-text-primary text-sm font-semibold">
                    {cat.name}
                  </div>
                  <div className="text-text-tertiary rtl:font-arabic text-xs">
                    {cat.nameAr}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {isLoading && <MenuSkeleton />}

        {isError && (
          <div className="mt-12 text-center">
            <div className="border-danger-200 bg-danger-50 dark:border-danger-900/30 dark:bg-danger-950/10 mx-auto max-w-sm rounded-xl border p-6">
              <p className="text-danger-600 dark:text-danger-400 text-sm font-medium">
                {t("landing.menu.errorTitle")}
              </p>
              <p className="text-danger-500/70 mt-1 text-xs">
                {t("landing.menu.errorDescription")}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="bg-danger-600 hover:bg-danger-700 mt-3 rounded-lg px-4 py-1.5 text-xs font-medium text-white transition-colors"
              >
                {t("landing.menu.retry")}
              </button>
            </div>
          </div>
        )}

        {!isLoading && !isError && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
            >
              {filteredItems.length === 0 && (
                <div className="col-span-full py-16 text-center">
                  <div className="bg-surface-tertiary mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                    <span className="text-text-tertiary text-xl">🍽</span>
                  </div>
                  <p className="text-text-secondary text-sm font-medium">
                    {t("landing.menu.emptyTitle")}
                  </p>
                  <p className="text-text-tertiary mt-1 text-xs">
                    {t("landing.menu.emptyDescription")}
                  </p>
                </div>
              )}
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="group border-border bg-surface overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="from-primary-100 to-primary-200 dark:from-primary-950/30 dark:to-primary-900/20 relative aspect-[3/2] overflow-hidden bg-gradient-to-br">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-primary-300/30 dark:text-primary-700/30 text-5xl font-bold">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-text-primary truncate font-semibold">
                          {item.name}
                        </h3>
                        <p className="text-text-tertiary rtl:font-arabic text-xs">
                          {item.nameAr}
                        </p>
                      </div>
                      <span className="bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400 shrink-0 rounded-lg px-2 py-0.5 text-xs font-semibold sm:px-2.5 sm:text-sm">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-text-tertiary mt-2 line-clamp-2 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
