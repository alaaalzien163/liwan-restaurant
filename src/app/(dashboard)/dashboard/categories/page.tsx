"use client";

import { useCategories, useDeleteCategory } from "@/features/categories/hooks";
import {
  CategoryTable,
  CategoryCard,
  DeleteCategoryDialog,
  CategoryLoadingState,
  CategoryEmptyState,
  CategoryErrorState,
} from "@/features/categories/components";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { CategoryEntity } from "@/domain/entities/category";
import { useTranslation } from "react-i18next";

export default function CategoriesPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const { data, isLoading, isError, error, refetch } = useCategories();
  const deleteMutation = useDeleteCategory();

  const [deleteTarget, setDeleteTarget] = useState<CategoryEntity | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleView = useCallback(
    (cat: CategoryEntity) => {
      router.push(`/dashboard/categories/edit/${cat.id}`);
    },
    [router],
  );

  const handleEdit = useCallback(
    (cat: CategoryEntity) => {
      router.push(`/dashboard/categories/edit/${cat.id}`);
    },
    [router],
  );

  const handleDeleteRequest = useCallback((cat: CategoryEntity) => {
    setDeleteTarget(cat);
    setIsDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(t("categories.toast.deleted"));
      setIsDeleteOpen(false);
      setDeleteTarget(null);
    } catch {
      toast.error(t("categories.toast.deleteFailed"));
    }
  }, [deleteTarget, deleteMutation, t]);

  const handleAdd = useCallback(() => {
    router.push("/dashboard/categories/add");
  }, [router]);

  const categories = data?.data ?? [];

  return (
    <div>
      <SectionHeader
        title={t("categories.title")}
        description={t("categories.description")}
        actions={
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            {t("categories.add")}
          </Button>
        }
      />

      {isLoading ? (
        <CategoryLoadingState />
      ) : isError ? (
        <CategoryErrorState
          message={(error as Error)?.message}
          onRetry={() => refetch()}
        />
      ) : categories.length === 0 ? (
        <CategoryEmptyState />
      ) : (
        <>
          <div className="space-y-4">
            <div className="hidden lg:block">
              <CategoryTable
                data={categories}
                isLoading={false}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
              {categories.map((cat, idx) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDeleteRequest}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <DeleteCategoryDialog
        category={deleteTarget}
        isOpen={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteOpen(false);
          setDeleteTarget(null);
        }}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
