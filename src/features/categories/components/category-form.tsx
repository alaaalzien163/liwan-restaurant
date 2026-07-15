"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categorySchema,
  type CategoryFormData,
} from "../schemas/category-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { uploadFile } from "@/infrastructure/supabase/upload";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import type { CategoryEntity } from "@/domain/entities/category";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface CategoryFormProps {
  initialData?: CategoryEntity;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CategoryForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          nameAr: initialData.nameAr,
          description: initialData.description,
          image: initialData.image,
          displayOrder: initialData.displayOrder,
          isActive: initialData.isActive,
        }
      : {
          name: "",
          nameAr: "",
          description: "",
          image: "",
          displayOrder: 1,
          isActive: true,
        },
  });

  const imageValue = watch("image");
  const isActiveValue = watch("isActive");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleImageChange = useCallback(
    (url: string) => {
      console.log("[CategoryForm] handleImageChange setValue image:", url);
      setValue("image", url, { shouldValidate: true });
    },
    [setValue],
  );

  const handleImageUpload = useCallback(async (file: File) => {
    console.log(
      "[CategoryForm] handleImageUpload called, file:",
      file.name,
      file.size,
    );
    const result = await uploadFile("category-images", file);
    console.log("[CategoryForm] uploadFile returned:", result);
    return result;
  }, []);

  const handleToggleActive = useCallback(() => {
    setValue("isActive", !isActiveValue);
  }, [setValue, isActiveValue]);
  const { t } = useTranslation();

  const onFormSubmit = useCallback(
    (data: CategoryFormData) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  return (
    <motion.form
      onSubmit={handleSubmit(onFormSubmit)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label={t("categories.form.name")}
          placeholder={t("categories.form.namePlaceholder")}
          isRequired
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label={t("categories.form.nameAr")}
          placeholder={t("categories.form.nameArPlaceholder")}
          isRequired
          error={errors.nameAr?.message}
          {...register("nameAr")}
        />
      </div>

      <Textarea
        label={t("categories.form.description")}
        placeholder={t("categories.form.descriptionPlaceholder")}
        {...register("description")}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label={t("categories.form.displayOrder")}
          type="number"
          placeholder={t("categories.form.displayOrderPlaceholder")}
          isRequired
          error={errors.displayOrder?.message}
          {...register("displayOrder")}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-text-primary text-sm font-medium">
            {t("categories.form.status")}
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={isActiveValue}
            onClick={handleToggleActive}
            className="focus-visible:ring-primary-500 inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2"
            style={{
              backgroundColor: isActiveValue
                ? "var(--color-primary-500)"
                : "var(--color-neutral-300)",
            }}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="inline-block h-5 w-5 rounded-full bg-white shadow-sm"
              style={{
                marginInlineStart: isActiveValue
                  ? "calc(100% - 1.25rem)"
                  : "2px",
              }}
            />
          </button>
          <span className="text-text-tertiary text-xs">
            {isActiveValue ? t("common.active") : t("common.inactive")}
          </span>
        </div>
      </div>

      <ImageUpload
        value={imageValue}
        onChange={handleImageChange}
        onUpload={handleImageUpload}
        onUploadingChange={setIsImageUploading}
      />

      <div className="border-border flex items-center justify-end gap-3 border-t pt-6">
        <Button
          variant="secondary"
          onClick={onCancel}
          isDisabled={isLoading || isImageUploading}
        >
          <X className="h-4 w-4" />
          {t("common.cancel")}
        </Button>
        <Button type="submit" isLoading={isLoading || isImageUploading}>
          <Save className="h-4 w-4" />
          {initialData
            ? t("categories.form.update")
            : t("categories.form.save")}
        </Button>
      </div>
    </motion.form>
  );
}
