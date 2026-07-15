"use client";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { MenuItemRecord } from "../types";
import { useTranslation } from "react-i18next";

interface DeleteMenuItemDialogProps {
  item: MenuItemRecord | null;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteMenuItemDialog({
  item,
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteMenuItemDialogProps) {
  const { t } = useTranslation();
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={t("menuItems.delete.title")}
      titleAr="حذف الصنف"
      message={t("menuItems.delete.message", { name: item?.name ?? "" })}
      messageAr={`هل أنت متأكد من حذف "${item?.nameAr}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      confirmLabel={t("menuItems.delete.confirm")}
      confirmLabelAr="حذف"
      cancelLabel={t("menuItems.delete.cancel")}
      cancelLabelAr="إلغاء"
      variant="danger"
      isLoading={isLoading}
    />
  );
}
