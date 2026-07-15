import type {
  InventoryItemEntity,
  InventoryCategory,
  StockMovement,
} from "../entities/inventory-item";
import type { PaginatedResponse, PaginationParams } from "@/core/types";

export interface InventoryFilters extends PaginationParams {
  search?: string;
  category?: InventoryCategory;
  isLowStock?: boolean;
  isPerishable?: boolean;
  isActive?: boolean;
  supplierId?: string;
}

export interface CreateInventoryItemDto {
  name: string;
  nameAr: string;
  sku: string;
  category: InventoryCategory;
  unit: string;
  unitCost: number;
  currentStock: number;
  minimumStock: number;
  maximumStock?: number;
  reorderPoint: number;
  reorderQuantity: number;
  supplierId?: string;
  location?: string;
  expiryDate?: string;
  isPerishable?: boolean;
  barcode?: string;
  notes?: string;
}

export interface UpdateInventoryItemDto extends Partial<CreateInventoryItemDto> {
  isActive?: boolean;
}

export interface StockAdjustmentDto {
  itemId: string;
  quantity: number;
  type: "received" | "used" | "wasted" | "returned" | "adjusted";
  unitCost?: number;
  referenceType?: string;
  referenceId?: string;
  notes?: string;
}

export interface IInventoryRepository {
  getInventoryItems(
    filters?: InventoryFilters,
  ): Promise<PaginatedResponse<InventoryItemEntity>>;
  getInventoryItemById(id: string): Promise<InventoryItemEntity>;
  getInventoryItemsByCategory(
    category: InventoryCategory,
  ): Promise<InventoryItemEntity[]>;
  getLowStockItems(): Promise<InventoryItemEntity[]>;
  createInventoryItem(
    data: CreateInventoryItemDto,
  ): Promise<InventoryItemEntity>;
  updateInventoryItem(
    id: string,
    data: UpdateInventoryItemDto,
  ): Promise<InventoryItemEntity>;
  deleteInventoryItem(id: string): Promise<void>;
  adjustStock(data: StockAdjustmentDto): Promise<InventoryItemEntity>;
  getStockMovements(itemId: string): Promise<StockMovement[]>;
  getStockValue(): Promise<number>;
}
