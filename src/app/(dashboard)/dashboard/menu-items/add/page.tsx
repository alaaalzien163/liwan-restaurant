"use client";

import { useCreateMenuItem } from "@/features/menu-items/hooks";
import { MenuItemForm } from "@/features/menu-items/components";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import type { MenuItemFormData } from "@/features/menu-items/schemas/menu-item-schema";
import { useTranslation } from "react-i18next";

export default function AddMenuItemPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const createMutation = useCreateMenuItem();

  const handleSubmit = useCallback(
    async (data: MenuItemFormData) => {
      try {
        await createMutation.mutateAsync({
          ...data,
          imageUrl: data.image,
          discountPrice:
            data.discountPrice && data.discountPrice !== ("" as unknown)
              ? Number(data.discountPrice)
              : undefined,
          price: Number(data.price),
          displayOrder: Number(data.displayOrder),
        });
        toast.success(t("menuItems.toast.created"));
        router.push("/dashboard/menu-items");
      } catch {
        toast.error(t("menuItems.toast.createFailed"));
      }
    },
    [createMutation, router],
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
