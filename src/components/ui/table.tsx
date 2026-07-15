"use client";

import { cn } from "@core/lib/utils";
import type { BaseProps } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Spinner } from "./spinner";
import { useState, type ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  headerAr?: string;
  sortable?: boolean;
  align?: "start" | "center" | "end";
  width?: string;
  render?: (item: T, index: number) => ReactNode;
}

interface TableProps<T> extends BaseProps {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  isSelectable?: boolean;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  emptyMessageAr?: string;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string) => void;
  rowKey: (item: T) => string;
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  isLoading = false,
  isSelectable = false,
  onRowClick,
  emptyMessage = "No data found",
  emptyMessageAr,
  sortColumn,
  sortDirection,
  onSort,
  rowKey,
  className,
  "data-testid": testId,
}: TableProps<T>) {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleRowClick = (item: T) => {
    const key = rowKey(item);
    if (isSelectable) {
      setSelectedRow(selectedRow === key ? null : key);
    }
    onRowClick?.(item);
  };

  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    const isActive = sortColumn === column.key;
    return (
      <span className="ms-1 inline-flex shrink-0">
        {isActive ? (
          sortDirection === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )
        ) : (
          <ChevronsUpDown className="h-4 w-4 opacity-40" />
        )}
      </span>
    );
  };

  return (
    <div
      className={cn(
        "border-border overflow-x-auto rounded-lg border",
        className,
      )}
      data-testid={testId}
    >
      <table className="w-full table-auto text-start">
        <thead>
          <tr className="border-border bg-surface-tertiary border-b">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "text-text-secondary px-4 py-3 text-sm font-medium",
                  col.sortable &&
                    "hover:text-text-primary cursor-pointer transition-colors select-none",
                  col.align && `text-${col.align}`,
                )}
                style={col.width ? { width: col.width } : undefined}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <span className="inline-flex items-center">
                  {col.headerAr || col.header}
                  {renderSortIcon(col)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center">
                <div className="text-text-tertiary flex items-center justify-center gap-2">
                  <Spinner size="md" />
                  <span className="text-sm">Loading...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-text-tertiary px-4 py-12 text-center text-sm"
              >
                {emptyMessageAr || emptyMessage}
              </td>
            </tr>
          ) : (
            <AnimatePresence mode="popLayout">
              {data.map((item, index) => (
                <motion.tr
                  key={rowKey(item)}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "border-border border-b transition-colors last:border-b-0",
                    onRowClick && "cursor-pointer",
                    isSelectable &&
                      selectedRow === rowKey(item) &&
                      "bg-primary-50 dark:bg-primary-950/20",
                    onRowClick && "hover:bg-surface-tertiary",
                  )}
                  onClick={() => handleRowClick(item)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "text-text-primary px-4 py-3 text-sm",
                        col.align && `text-${col.align}`,
                      )}
                    >
                      {col.render
                        ? col.render(item, index)
                        : (item[col.key] as ReactNode)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </tbody>
      </table>
    </div>
  );
}
