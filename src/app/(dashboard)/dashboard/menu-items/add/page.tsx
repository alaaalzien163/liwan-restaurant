"use client";

import { useCreateMenuItem } from "@/features/menu-items/hooks";
import { MenuItemForm } from "@/features/menu-items/components";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import type { MenuItemFormData } from "@/features/menu-items/schemas/menu-item-schema";
import type { CreateMenuItemDto } from "@/domain/repositories/menu-repository";
import { useTranslation } from "react-i18next";

export default function AddMenuItemPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const createMutation = useCreateMenuItem();

  const handleSubmit = useCallback(
    async (data: MenuItemFormData & { imageFile?: File | null }) => {
      try {
        const { image, imageFile, ...rest } = data;
        const dto: CreateMenuItemDto = {
          ...rest,
          discountPrice:
            data.discountPrice && data.discountPrice !== ("" as unknown)
              ? Number(data.discountPrice)
              : undefined,
          price: Number(data.price),
          displayOrder: Number(data.displayOrder),
        };
        if (imageFile) {
          dto.imageFile = imageFile;
        } else if (!image) {
          dto.imageUrl = "";
        }
        await createMutation.mutateAsync(dto);
        toast.success(t("menuItems.toast.created"));
        router.push("/dashboard/menu-items");
      } catch {
        toast.error(t("menuItems.toast.createFailed"));
      }
    },
    [createMutation, router, t],
  );

  const handleCancel = useCallback(() => {
    router.push("/dashboard/menu-items");
  }, [router]);

  return (
    <div>
      <SectionHeader
        title={t("menuItems.addTitle")}
        description={t("menuItems.addDescription")}
      />
      <Card>
        <CardContent className="p-6">
          <MenuItemForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
