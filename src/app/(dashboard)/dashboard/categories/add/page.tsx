"use client";

import { useCreateCategory } from "@/features/categories/hooks";
import { CategoryForm } from "@/features/categories/components";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import type { CategoryFormData } from "@/features/categories/schemas/category-schema";
import { useTranslation } from "react-i18next";

export default function AddCategoryPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const createMutation = useCreateCategory();

  const handleSubmit = useCallback(
    async (data: CategoryFormData) => {
      try {
        await createMutation.mutateAsync(data);
        toast.success(t("categories.toast.created"));
        router.push("/dashboard/categories");
      } catch {
        toast.error(t("categories.toast.createFailed"));
      }
    },
    [createMutation, router, t],
  );

  const handleCancel = useCallback(() => {
    router.push("/dashboard/categories");
  }, [router]);

  return (
    <div>
      <SectionHeader
        title={t("categories.addTitle")}
        description={t("categories.addDescription")}
      />
      <Card>
        <CardContent className="p-6">
          <CategoryForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
