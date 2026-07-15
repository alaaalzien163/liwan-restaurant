"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  menuItemSchema,
  type MenuItemFormData,
} from "../schemas/menu-item-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { uploadFile } from "@/infrastructure/supabase/upload";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import type { MenuItemRecord } from "../types";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCategories } from "@/features/categories/hooks";

interface MenuItemFormProps {
  initialData?: MenuItemRecord;
  onSubmit: (data: MenuItemFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function MenuItemForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: MenuItemFormProps) {
  const { t } = useTranslation();
  const { data: categoriesData } = useCategories({ page: 1, pageSize: 50 });

  const categoryOptions = useMemo(() => {
    const opts: { label: string; value: string }[] = [];
    if (categoriesData?.data) {
      for (const cat of categoriesData.data) {
        opts.push({ label: cat.name, value: cat.id });
      }
    }
    return opts;
  }, [categoriesData]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: initialData
      ? {
          categoryId: initialData.categoryId,
          name: initialData.name,
          nameAr: initialData.nameAr,
          description: initialData.description,
          descriptionAr: initialData.descriptionAr,
          price: initialData.price,
          discountPrice: initialData.discountPrice ?? undefined,
          image: initialData.image,
          displayOrder: initialData.displayOrder,
          isAvailable: initialData.isAvailable,
          isFeatured: initialData.isFeatured,
        }
      : {
          categoryId: "",
          name: "",
          nameAr: "",
          description: "",
          descriptionAr: "",
          price: undefined as unknown as number,
          discountPrice: undefined,
          image: "",
          displayOrder: 1,
          isAvailable: true,
          isFeatured: false,
        },
  });

  const imageValue = watch("image");
  const isAvailableValue = watch("isAvailable");
  const isFeaturedValue = watch("isFeatured");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleImageChange = useCallback(
    (url: string) => {
      console.log("[MenuItemForm] handleImageChange setValue image:", url);
      setValue("image", url, { shouldValidate: true });
    },
    [setValue],
  );

  const handleImageUpload = useCallback(async (file: File) => {
    console.log(
      "[MenuItemForm] handleImageUpload called, file:",
      file.name,
      file.size,
    );
    const result = await uploadFile("menu-images", file);
    console.log("[MenuItemForm] uploadFile returned:", result);
    return result;
  }, []);

  const onFormSubmit = useCallback(
    (data: MenuItemFormData) => {
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
      <Select
        label={t("menuItems.form.category")}
        options={categoryOptions}
        placeholder={t("menuItems.form.categoryPlaceholder")}
        isRequired
        error={errors.categoryId?.message}
        {...register("categoryId")}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label={t("menuItems.form.name")}
          placeholder={t("menuItems.form.namePlaceholder")}
          isRequired
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label={t("menuItems.form.nameAr")}
          placeholder={t("menuItems.form.nameArPlaceholder")}
          isRequired
          error={errors.nameAr?.message}
          {...register("nameAr")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Textarea
          label={t("menuItems.form.description")}
          placeholder={t("menuItems.form.descriptionPlaceholder")}
          {...register("description")}
        />
        <Textarea
          label={t("menuItems.form.descriptionAr")}
          placeholder={t("menuItems.form.descriptionArPlaceholder")}
          {...register("descriptionAr")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Input
          label={t("menuItems.form.price")}
          type="number"
          step="0.01"
          placeholder={t("menuItems.form.pricePlaceholder")}
          isRequired
          error={errors.price?.message}
          {...register("price")}
        />
        <Input
          label={t("menuItems.form.discountPrice")}
          type="number"
          step="0.01"
          placeholder={t("menuItems.form.discountPricePlaceholder")}
          error={errors.discountPrice?.message}
          {...register("discountPrice")}
        />
        <Input
          label={t("menuItems.form.displayOrder")}
          type="number"
          placeholder={t("menuItems.form.displayOrderPlaceholder")}
          isRequired
          error={errors.displayOrder?.message}
          {...register("displayOrder")}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <label className="text-text-primary text-sm font-medium">
            {t("menuItems.form.available")}
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={isAvailableValue}
            onClick={() => setValue("isAvailable", !isAvailableValue)}
            className="focus-visible:ring-primary-500 inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2"
            style={{
              backgroundColor: isAvailableValue
                ? "var(--color-primary-500)"
                : "var(--color-neutral-300)",
            }}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="inline-block h-5 w-5 rounded-full bg-white shadow-sm"
              style={{
                marginInlineStart: isAvailableValue
                  ? "calc(100% - 1.25rem)"
                  : "2px",
              }}
            />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-text-primary text-sm font-medium">
            {t("menuItems.form.featured")}
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={isFeaturedValue}
            onClick={() => setValue("isFeatured", !isFeaturedValue)}
            className="focus-visible:ring-primary-500 inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2"
            style={{
              backgroundColor: isFeaturedValue
                ? "var(--color-primary-500)"
                : "var(--color-neutral-300)",
            }}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="inline-block h-5 w-5 rounded-full bg-white shadow-sm"
              style={{
                marginInlineStart: isFeaturedValue
                  ? "calc(100% - 1.25rem)"
                  : "2px",
              }}
            />
          </button>
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
          {t("menuItems.form.cancel")}
        </Button>
        <Button type="submit" isLoading={isLoading || isImageUploading}>
          <Save className="h-4 w-4" />
          {initialData ? t("menuItems.form.update") : t("menuItems.form.save")}
        </Button>
      </div>
    </motion.form>
  );
}
