"use client";

import { motion } from "framer-motion";
import { usePublicCategories } from "../hooks/use-public-categories";
import { LoadingState, ErrorState } from "@/components/ui";
import { useTranslation } from "react-i18next";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CategoriesSection() {
  const { t } = useTranslation();
  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = usePublicCategories();

  return (
    <section id="categories" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-primary-500 text-xs font-semibold tracking-widest uppercase">
            {t("landing.categories.sectionLabel")}
          </span>
          <h2 className="text-text-primary mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.categories.heading")}
          </h2>
          <p className="text-text-secondary mx-auto mt-3 max-w-xl">
            {t("landing.categories.description")}
          </p>
        </motion.div>

        {isLoading && (
          <div className="mt-12">
            <LoadingState message={t("landing.categories.loading")} />
          </div>
        )}

        {isError && (
          <div className="mt-12">
            <ErrorState onRetry={() => refetch()} />
          </div>
        )}

        {categories && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group border-border bg-surface cursor-pointer rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="from-primary-50 to-primary-100 dark:from-primary-950/30 dark:to-primary-900/20 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-2xl">
                  {cat.icon}
                </div>
                <h3 className="text-text-primary mt-4 text-lg font-semibold">
                  {cat.name}
                </h3>
                <p className="text-text-tertiary mt-1.5 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
