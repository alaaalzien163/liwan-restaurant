"use client";

import Image from "next/image";
import { Table, type Column } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { CategoryEntity } from "@/domain/entities/category";
import { useTranslation } from "react-i18next";

interface CategoryTableProps {
  data: CategoryEntity[];
  isLoading: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (column: string) => void;
  onView: (category: CategoryEntity) => void;
  onEdit: (category: CategoryEntity) => void;
  onDelete: (category: CategoryEntity) => void;
}

export function CategoryTable({
  data,
  isLoading,
  sortBy = "displayOrder",
  sortOrder = "asc",
  onSort = () => {},
  onView,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const { t } = useTranslation();
  const columns: Column<Record<string, unknown>>[] = [
    {
      key: "image",
      header: t("categories.table.image"),
      width: "72px",
      render: (_item) => {
        const item = _item as unknown as CategoryEntity;
        return (
          <div className="bg-surface-tertiary flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg">
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
          </div>
        );
      },
    },
    {
      key: "name",
      header: t("categories.table.name"),
      sortable: true,
      render: (_item) => {
        const item = _item as unknown as CategoryEntity;
        return (
          <div>
            <p className="text-text-primary font-medium">{item.name}</p>
            <p className="text-text-tertiary text-xs">{item.nameAr}</p>
          </div>
        );
      },
    },
    {
      key: "displayOrder",
      header: t("categories.table.order"),
      sortable: true,
      width: "80px",
      align: "center",
      render: (_item) => {
        const item = _item as unknown as CategoryEntity;
        return <span className="text-text-secondary">{item.displayOrder}</span>;
      },
    },
    {
      key: "isActive",
      header: t("categories.table.status"),
      width: "100px",
      align: "center",
      render: (_item) => {
        const item = _item as unknown as CategoryEntity;
        return (
          <Badge variant={item.isActive ? "success" : "danger"} size="sm">
            {item.isActive ? t("common.active") : t("common.inactive")}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      header: t("categories.table.created"),
      sortable: true,
      width: "120px",
      render: (_item) => {
        const item = _item as unknown as CategoryEntity;
        return (
          <span className="text-text-tertiary text-sm">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: t("categories.table.actions"),
      width: "140px",
      align: "end",
      render: (_item) => {
        const item = _item as unknown as CategoryEntity;
        return (
          <div className="flex items-center justify-end gap-1">
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
              onClick={() => onDelete(item)}
              aria-label={`${t("common.delete")} ${item.name}`}
            >
              <Trash2 className="text-danger-500 h-4 w-4" />
            </Button>
          </div>
        );
      },
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
