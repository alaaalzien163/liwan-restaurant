"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, Pencil, Trash2, Copy } from "lucide-react";
import type { MenuItemRecord } from "../types";
import { useTranslation } from "react-i18next";

interface MenuItemCardProps {
  item: MenuItemRecord;
  categoryName: string;
  onView: (item: MenuItemRecord) => void;
  onEdit: (item: MenuItemRecord) => void;
  onDelete: (item: MenuItemRecord) => void;
  onDuplicate: (item: MenuItemRecord) => void;
  onImagePreview: (item: MenuItemRecord) => void;
  index: number;
}

export function MenuItemCard({
  item,
  categoryName,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onImagePreview,
  index,
}: MenuItemCardProps) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Card isHoverable className="h-full">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onImagePreview(item)}
              className="bg-surface-tertiary hover:ring-primary-500 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-all hover:ring-2"
              aria-label={`${t("common.preview")} ${item.name}`}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-text-tertiary text-lg font-bold">
                  {item.name.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-text-primary truncate font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-text-tertiary truncate text-xs">
                    {item.nameAr}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Badge variant="info" size="sm">
                    {categoryName}
                  </Badge>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-text-primary font-semibold">
                  SAR {item.price.toFixed(2)}
                </span>
                {item.discountPrice && (
                  <span className="text-text-tertiary text-xs line-through">
                    SAR {item.discountPrice.toFixed(2)}
                  </span>
                )}
                <Badge
                  variant={item.isAvailable ? "success" : "danger"}
                  size="sm"
                >
                  {item.isAvailable
                    ? t("common.available")
                    : t("common.unavailable")}
                </Badge>
                {item.isFeatured && (
                  <Badge variant="warning" size="sm">
                    {t("common.featured")}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {item.description && (
            <p className="text-text-secondary line-clamp-2 text-sm">
              {item.description}
            </p>
          )}

          <div className="border-border flex items-center justify-between border-t pt-2">
            <span className="text-text-tertiary text-xs">
              {t("common.orderLabel", { value: item.displayOrder })}
            </span>
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(item)}
                aria-label={`${t("common.view")} ${item.name}`}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(item)}
                aria-label={`${t("common.edit")} ${item.name}`}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDuplicate(item)}
                aria-label={`${t("common.duplicate")} ${item.name}`}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item)}
                aria-label={`${t("common.delete")} ${item.name}`}
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
