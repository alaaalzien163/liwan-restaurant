"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps } from "./types";
import { Modal } from "./modal";
import { Button } from "./button";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

interface ConfirmDialogProps extends BaseProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  titleAr?: string;
  message: string;
  messageAr?: string;
  confirmLabel?: string;
  confirmLabelAr?: string;
  cancelLabel?: string;
  cancelLabelAr?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

const variantIcons = {
  danger: AlertTriangle,
  warning: AlertCircle,
  info: Info,
};

const variantStyles = {
  danger:
    "bg-danger-100 text-danger-600 dark:bg-danger-900/30 dark:text-danger-400",
  warning:
    "bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400",
  info: "bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400",
};

export function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  titleAr,
  message,
  messageAr,
  confirmLabel,
  confirmLabelAr,
  cancelLabel,
  cancelLabelAr,
  variant = "danger",
  isLoading = false,
  className,
  "data-testid": testId,
}: ConfirmDialogProps) {
  const Icon = variantIcons[variant];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      size="sm"
      showCloseButton={false}
      isDismissable={false}
      className={className}
      data-testid={testId}
    >
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <div className={cn("rounded-full p-3", variantStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-text-primary text-lg font-semibold">
            {titleAr || title}
          </h3>
          <p className="text-text-secondary mt-1 text-sm">
            {messageAr || message}
          </p>
        </div>
        <div className="mt-2 flex w-full gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            isFullWidth
            isDisabled={isLoading}
          >
            {cancelLabelAr || cancelLabel || "Cancel"}
          </Button>
          <Button
            variant={variant === "info" ? "primary" : "danger"}
            onClick={onConfirm}
            isLoading={isLoading}
            isFullWidth
          >
            {confirmLabelAr || confirmLabel || "Confirm"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
