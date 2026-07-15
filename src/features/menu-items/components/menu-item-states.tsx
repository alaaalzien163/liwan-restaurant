"use client";

import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import { PackageOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function MenuItemLoadingState() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-text-tertiary flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm">{t("menuItems.states.loading")}</p>
      </div>
    </div>
  );
}

export function MenuItemEmptyState() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[400px] items-center justify-center"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="bg-surface-tertiary rounded-full p-4">
          <PackageOpen className="text-text-tertiary h-8 w-8" />
        </div>
        <div>
          <p className="text-text-primary text-lg font-medium">
            {t("menuItems.states.emptyTitle")}
          </p>
          <p className="text-text-tertiary text-sm">
            {t("menuItems.states.emptyDescription")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function MenuItemErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[400px] items-center justify-center"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="bg-danger-50 dark:bg-danger-950/30 rounded-full p-4">
          <AlertCircle className="text-danger-500 h-8 w-8" />
        </div>
        <div>
          <p className="text-text-primary text-lg font-medium">
            {t("menuItems.states.errorTitle")}
          </p>
          <p className="text-text-tertiary text-sm">
            {message ?? t("menuItems.states.errorFallback")}
          </p>
        </div>
        {onRetry && (
          <Button variant="secondary" onClick={onRetry}>
            {t("common.retry")}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
