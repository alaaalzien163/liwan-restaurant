"use client";

import {
  useMenuItems,
  useDeleteMenuItem,
  useDuplicateMenuItem,
  useUpdateMenuItem,
} from "@/features/menu-items/hooks";
import {
  MenuItemTable,
  MenuItemCard,
  DeleteMenuItemDialog,
  ImagePreviewModal,
  MenuItemLoadingState,
  MenuItemEmptyState,
  MenuItemErrorState,
} from "@/features/menu-items/components";
import { useCategories } from "@/features/categories/hooks";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { MenuItemRecord } from "@/features/menu-items/types";
import { useTranslation } from "react-i18next";

export default function MenuItemsPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isLoading, isError, error, refetch } = useMenuItems();
  const { data: categoriesData } = useCategories({ page: 1, pageSize: 50 });
  const deleteMutation = useDeleteMenuItem();
  const duplicateMutation = useDuplicateMenuItem();
  const updateMutation = useUpdateMenuItem();

  const [deleteTarget, setDeleteTarget] = useState<MenuItemRecord | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [previewTarget, setPreviewTarget] = useState<MenuItemRecord | null>(
    null,
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const categoryNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    if (categoriesData?.data) {
      for (const cat of categoriesData.data) {
        map[cat.id] = cat.name;
      }
    }
    return map;
  }, [categoriesData]);

  const getCategoryName = useCallback(
    (id: string) => categoryNameMap[id] ?? id,
    [categoryNameMap],
  );

  const handleView = useCallback(
    (item: MenuItemRecord) => {
      router.push(`/dashboard/menu-items/edit/${item.id}`);
    },
    [router],
  );

  const handleEdit = useCallback(
    (item: MenuItemRecord) => {
      router.push(`/dashboard/menu-items/edit/${item.id}`);
    },
    [router],
  );

  const handleDeleteRequest = useCallback((item: MenuItemRecord) => {
    setDeleteTarget(item);
    setIsDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(t("menuItems.toast.deleted"));
      setIsDeleteOpen(false);
      setDeleteTarget(null);
    } catch {
      toast.error(t("menuItems.toast.deleteFailed"));
    }
  }, [deleteTarget, deleteMutation]);

  const handleDuplicate = useCallback(
    async (item: MenuItemRecord) => {
      try {
        await duplicateMutation.mutateAsync(item.id);
        toast.success(t("menuItems.toast.duplicated"));
      } catch {
        toast.error(t("menuItems.toast.duplicateFailed"));
      }
    },
    [duplicateMutation],
  );

  const handleToggleAvailability = useCallback(
    async (item: MenuItemRecord) => {
      try {
        await updateMutation.mutateAsync({
          id: item.id,
          data: { isAvailable: !item.isAvailable },
        });
        toast.success(
          t(
            !item.isAvailable
              ? "menuItems.toast.availableOn"
              : "menuItems.toast.availableOff",
            { name: item.name },
          ),
        );
      } catch {
        toast.error(t("menuItems.toast.availableFailed"));
      }
    },
    [updateMutation],
  );

  const handleToggleFeatured = useCallback(
    async (item: MenuItemRecord) => {
      try {
        await updateMutation.mutateAsync({
          id: item.id,
          data: { isFeatured: !item.isFeatured },
        });
        toast.success(
          t(
            !item.isFeatured
              ? "menuItems.toast.featuredOn"
              : "menuItems.toast.featuredOff",
            { name: item.name },
          ),
        );
      } catch {
        toast.error(t("menuItems.toast.featuredFailed"));
      }
    },
    [updateMutation],
  );

  const handleImagePreview = useCallback((item: MenuItemRecord) => {
    if (item.image) {
      setPreviewTarget(item);
      setIsPreviewOpen(true);
    }
  }, []);

  const handleAdd = useCallback(() => {
    router.push("/dashboard/menu-items/add");
  }, [router]);

  const items = data?.data ?? [];

  return (
    <div>
      <SectionHeader
        title={t("menuItems.title")}
        description={t("menuItems.description")}
        actions={
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            {t("menuItems.add")}
          </Button>
        }
      />

      {isLoading ? (
        <MenuItemLoadingState />
      ) : isError ? (
        <MenuItemErrorState
          message={(error as Error)?.message}
          onRetry={() => refetch()}
        />
      ) : items.length === 0 ? (
        <MenuItemEmptyState />
      ) : (
        <div className="space-y-4">
          <div className="hidden lg:block">
            <MenuItemTable
              data={items}
              isLoading={false}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
              onDuplicate={handleDuplicate}
              onToggleAvailability={handleToggleAvailability}
              onToggleFeatured={handleToggleFeatured}
              onImagePreview={handleImagePreview}
              getCategoryName={getCategoryName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {items.map((item, idx) => (
              <MenuItemCard
                key={item.id}
                item={item}
                categoryName={getCategoryName(item.categoryId)}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
                onDuplicate={handleDuplicate}
                onImagePreview={handleImagePreview}
                index={idx}
              />
            ))}
          </div>
        </div>
      )}

      <DeleteMenuItemDialog
        item={deleteTarget}
        isOpen={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteOpen(false);
          setDeleteTarget(null);
        }}
        isLoading={deleteMutation.isPending}
      />

      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewTarget(null);
        }}
        image={previewTarget?.image ?? ""}
        name={previewTarget?.name ?? ""}
      />
    </div>
  );
}
