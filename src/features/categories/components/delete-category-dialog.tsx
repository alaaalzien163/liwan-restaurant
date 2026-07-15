"use client";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { CategoryEntity } from "@/domain/entities/category";

interface DeleteCategoryDialogProps {
  category: CategoryEntity | null;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteCategoryDialog({
  category,
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteCategoryDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title="Delete Category"
      titleAr="حذف الفئة"
      message={`Are you sure you want to delete "${category?.name}"? This action cannot be undone.`}
      messageAr={`هل أنت متأكد من حذف "${category?.nameAr}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      confirmLabel="Delete"
      confirmLabelAr="حذف"
      cancelLabel="Cancel"
      cancelLabelAr="إلغاء"
      variant="danger"
      isLoading={isLoading}
    />
  );
}
