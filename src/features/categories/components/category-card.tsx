"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pencil, Trash2, Eye } from "lucide-react";
import type { CategoryEntity } from "@/domain/entities/category";

interface CategoryCardProps {
  category: CategoryEntity;
  onView: (category: CategoryEntity) => void;
  onEdit: (category: CategoryEntity) => void;
  onDelete: (category: CategoryEntity) => void;
  index: number;
}

export function CategoryCard({
  category,
  onView,
  onEdit,
  onDelete,
  index,
}: CategoryCardProps) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card isHoverable className="h-full">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-surface-tertiary flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-text-tertiary text-sm font-bold">
                    {category.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-text-primary rtl:font-arabic font-semibold">
                  {category.nameAr || category.name}
                </h3>
                {category.nameAr && (
                  <p className="text-text-tertiary text-xs">{category.name}</p>
                )}
              </div>
            </div>
          </div>

          {category.description && (
            <p className="text-text-secondary line-clamp-2 text-sm">
              {category.description}
            </p>
          )}

          <div className="flex items-center justify-end">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(category)}
                aria-label={`${t("common.view")} ${category.name}`}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(category)}
                aria-label={`${t("common.edit")} ${category.name}`}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(category)}
                aria-label={`${t("common.delete")} ${category.name}`}
              >
                <Trash2 className="text-danger-500 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
