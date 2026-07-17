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
  onImagePreview: (item: MenuItemRecord) => void;
  getCategoryName: (categoryId: string) => string;
}

export function MenuItemTable({
  data,
  isLoading,
  sortBy,
  sortOrder = "asc",
  onSort = () => {},
  onView,
  onEdit,
  onDelete,
  onDuplicate,
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
      key: "name",
      header: t("menuItems.table.name"),
      sortable: true,
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onImagePreview(item)}
              className="bg-surface-tertiary hover:ring-primary-500 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-all hover:ring-2"
              aria-label={`${t("common.preview")} ${item.name}`}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-text-tertiary text-xs font-bold">
                  {item.name.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
            <div className="min-w-0">
              <p className="text-text-primary rtl:font-arabic truncate font-medium">
                {item.nameAr || item.name}
              </p>
              {item.nameAr && (
                <p className="text-text-tertiary truncate text-xs">
                  {item.name}
                </p>
              )}
            </div>
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
      width: "80px",
      render: (_item) => {
        const item = _item as unknown as MenuItemRecord;
        return (
          <span className="text-text-primary font-medium">{item.price}</span>
        );
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
