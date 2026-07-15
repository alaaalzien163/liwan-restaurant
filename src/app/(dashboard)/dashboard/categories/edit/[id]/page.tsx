"use client";

import { useCategory, useUpdateCategory } from "@/features/categories/hooks";
import {
  CategoryForm,
  CategoryLoadingState,
  CategoryErrorState,
} from "@/features/categories/components";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useCallback, use, useEffect } from "react";
import { toast } from "sonner";
import type { CategoryFormData } from "@/features/categories/schemas/category-schema";
import { useTranslation } from "react-i18next";

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { t } = useTranslation();
  const {
    data: category,
    isLoading,
    isError,
    error,
    refetch,
  } = useCategory(id);
  const updateMutation = useUpdateCategory();

  useEffect(() => {
    if (category) {
      document.title = `${t("categories.editTitle", { name: category.name })} | Liwan Restaurant`;
    }
  }, [category, t]);

  const handleSubmit = useCallback(
    async (formData: CategoryFormData) => {
      try {
        await updateMutation.mutateAsync({ id, data: formData });
        toast.success(t("categories.toast.updated"));
        router.push("/dashboard/categories");
      } catch {
        toast.error(t("categories.toast.updateFailed"));
      }
    },
    [updateMutation, id, router, t],
  );

  const handleCancel = useCallback(() => {
    router.push("/dashboard/categories");
  }, [router]);

  if (isLoading) return <CategoryLoadingState />;
  if (isError) {
    return (
      <CategoryErrorState
        message={(error as Error)?.message}
        onRetry={() => refetch()}
      />
    );
  }
  if (!category) return null;

  return (
    <div>
      <SectionHeader
        title={t("categories.editTitle", { name: category.name })}
        description={t("categories.editDescription")}
      />
      <Card>
        <CardContent className="p-6">
          <CategoryForm
            initialData={category}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={updateMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
