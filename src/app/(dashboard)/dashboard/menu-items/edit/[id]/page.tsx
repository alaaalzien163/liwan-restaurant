"use client";

import { useMenuItem, useUpdateMenuItem } from "@/features/menu-items/hooks";
import {
  MenuItemForm,
  MenuItemLoadingState,
  MenuItemErrorState,
} from "@/features/menu-items/components";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useRouter } from "next/navigation";
import { useCallback, use, useEffect } from "react";
import { toast } from "sonner";
import type { MenuItemFormData } from "@/features/menu-items/schemas/menu-item-schema";
import type { UpdateMenuItemDto } from "@/domain/repositories/menu-repository";
import { useTranslation } from "react-i18next";

export default function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();
  const router = useRouter();
  const { data: item, isLoading, isError, error, refetch } = useMenuItem(id);
  const updateMutation = useUpdateMenuItem();

  useEffect(() => {
    if (item) {
      document.title = `${t("menuItems.editTitle", { name: item.name })} | Liwan Restaurant`;
    }
  }, [item, t]);

  const handleSubmit = useCallback(
    async (formData: MenuItemFormData & { imageFile?: File | null }) => {
      try {
        const { image, imageFile, ...rest } = formData;
        const dto: UpdateMenuItemDto = {
          ...rest,
          discountPrice:
            formData.discountPrice && formData.discountPrice !== ("" as unknown)
              ? Number(formData.discountPrice)
              : undefined,
          price: Number(formData.price),
          displayOrder: Number(formData.displayOrder),
        };
        if (imageFile) {
          dto.imageFile = imageFile;
        } else if (!image && item?.image) {
          dto.imageUrl = "";
        }
        await updateMutation.mutateAsync({ id, data: dto });
        toast.success(t("menuItems.toast.updated"));
        router.push("/dashboard/menu-items");
      } catch {
        toast.error(t("menuItems.toast.updateFailed"));
      }
    },
    [updateMutation, id, router, t, item],
  );

  const handleCancel = useCallback(() => {
    router.push("/dashboard/menu-items");
  }, [router]);

  if (isLoading) return <MenuItemLoadingState />;
  if (isError) {
    return (
      <MenuItemErrorState
        message={(error as Error)?.message}
        onRetry={() => refetch()}
      />
    );
  }
  if (!item) return null;

  return (
    <ErrorBoundary>
      <div>
        <SectionHeader
          title={t("menuItems.editTitle", { name: item.name })}
          description={t("menuItems.editDescription")}
        />
        <Card>
          <CardContent className="p-6">
            <MenuItemForm
              initialData={item}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={updateMutation.isPending}
            />
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
}
