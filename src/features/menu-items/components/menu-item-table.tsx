"use client";

import Image from "next/image";
import { Table, type Column } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Copy } from "lucide-react";
import { useCallback } from "react";
import type { MenuItemRecord } from "../types";
import { useTranslation } from "react-i18next";

interface MenuItemTableProps {
  data: MenuItemRecord[];
  isLoading: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (column: string) => void;
  onView: (item: MenuItemRecord) => void;
  onEdit: (item: MenuItemRecord) => void;
  onDelete: (item: MenuItemRecord) => void;
  onDuplicate: (item: MenuItemRecord) => void;
  onToggleAvailability: (item: MenuItemRecord) => void;
  onToggleFeatured: (item: MenuItemRecord) => void;
  onImagePreview: (item: MenuItemRecord) => void;
  getCategoryName: (categoryId: string) => string;
}

export function MenuItemTable({
  data,
  isLoading,
  sortBy = "displayOrder",
  sortOrder = "asc",
  onSort = () => {},
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleAvailability,
  onToggleFeatured,
  onImagePreview,
  getCategoryName,
}: MenuItemTableProps) {
  const { t } = useTranslation();
  const renderActions = useCallback(
    (_item: Record<string, unknown>) => {
      const item = _item as unknown as MenuItemRecord;
      return (
        <div className="flex items-center justify-end gap-0.5">
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
      );
    },
    [onView, onEdit, onDelete, onDuplicate, t],
  );

  const columns: Column<Record<string, unknown>>[] = [
    {
      key: "image",
      header: t("menuItems.table.image"),
      width: "64px",
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return (
          <button
            type="button"
            onClick={() => onImagePreview(item)}
            className="bg-surface-tertiary hover:ring-primary-500 flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-all hover:ring-2"
            aria-label={`${t("common.preview")} ${item.name}`}
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={40}
                height={40}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <span className="text-text-tertiary text-xs font-bold">
                {item.name.charAt(0).toUpperCase()}
              </span>
            )}
          </button>
        );
      },
    },
    {
      key: "name",
      header: t("menuItems.table.name"),
      sortable: true,
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return (
          <div>
            <p className="text-text-primary font-medium">{item.name}</p>
            <p className="text-text-tertiary text-xs">{item.nameAr}</p>
          </div>
        );
      },
    },
    {
      key: "categoryId",
      header: t("menuItems.table.category"),
      sortable: true,
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return (
          <Badge variant="info" size="sm">
            {getCategoryName(item.categoryId)}
          </Badge>
        );
      },
    },
    {
      key: "price",
      header: t("menuItems.table.price"),
      sortable: true,
      width: "100px",
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return (
          <div className="flex items-center gap-1">
            <span className="text-text-primary font-medium">
              SAR {item.price.toFixed(2)}
            </span>
            {item.discountPrice && (
              <>
                <span className="text-text-tertiary ms-1 text-xs line-through">
                  SAR {item.discountPrice.toFixed(2)}
                </span>
                <Badge variant="success" size="sm">
                  {t("menuItems.table.sale")}
                </Badge>
              </>
            )}
          </div>
        );
      },
    },
    {
      key: "isAvailable",
      header: t("menuItems.table.available"),
      width: "72px",
      align: "center",
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return (
          <button
            type="button"
            onClick={() => onToggleAvailability(item)}
            className="inline-flex"
            aria-label={`${t("common.available")} ${item.name}`}
          >
            <Badge
              variant={item.isAvailable ? "success" : "danger"}
              size="sm"
              className="cursor-pointer"
            >
              {item.isAvailable
                ? t("menuItems.table.yes")
                : t("menuItems.table.no")}
            </Badge>
          </button>
        );
      },
    },
    {
      key: "isFeatured",
      header: t("menuItems.table.featured"),
      width: "64px",
      align: "center",
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return (
          <button
            type="button"
            onClick={() => onToggleFeatured(item)}
            className="inline-flex"
            aria-label={`${t("common.featured")} ${item.name}`}
          >
            <Badge
              variant={item.isFeatured ? "warning" : "default"}
              size="sm"
              className="cursor-pointer"
            >
              {item.isFeatured
                ? t("menuItems.table.yes")
                : t("menuItems.table.no")}
            </Badge>
          </button>
        );
      },
    },
    {
      key: "displayOrder",
      header: t("menuItems.table.order"),
      sortable: true,
      width: "60px",
      align: "center",
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return <span className="text-text-secondary">{item.displayOrder}</span>;
      },
    },
    {
      key: "createdAt",
      header: t("menuItems.table.created"),
      sortable: true,
      width: "100px",
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return (
          <span className="text-text-tertiary text-sm">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: t("menuItems.table.actions"),
      width: "150px",
      align: "end",
      render: renderActions,
    },
  ];

  return (
    <Table
      data={data as unknown as Record<string, unknown>[]}
      columns={columns}
      isLoading={isLoading}
      sortColumn={sortBy}
      sortDirection={sortOrder}
      onSort={onSort}
      rowKey={(item: Record<string, unknown>) => item.id as string}
    />
  );
}
