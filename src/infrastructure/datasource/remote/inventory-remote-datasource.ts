import type {
  InventoryItemEntity,
  InventoryCategory,
  StockMovement,
} from "@/domain/entities/inventory-item";
import type {
  InventoryFilters,
  CreateInventoryItemDto,
  UpdateInventoryItemDto,
  StockAdjustmentDto,
} from "@/domain/repositories/inventory-repository";
import type { PaginatedResponse } from "@/core/types";

export interface IInventoryRemoteDataSource {
  fetchInventoryItems(
    filters?: InventoryFilters,
  ): Promise<PaginatedResponse<InventoryItemEntity>>;
  fetchInventoryItemById(id: string): Promise<InventoryItemEntity>;
  fetchInventoryItemsByCategory(
    category: InventoryCategory,
  ): Promise<InventoryItemEntity[]>;
  fetchLowStockItems(): Promise<InventoryItemEntity[]>;
  createInventoryItem(
    data: CreateInventoryItemDto,
  ): Promise<InventoryItemEntity>;
  updateInventoryItem(
    id: string,
    data: UpdateInventoryItemDto,
  ): Promise<InventoryItemEntity>;
  deleteInventoryItem(id: string): Promise<void>;
  adjustStock(data: StockAdjustmentDto): Promise<InventoryItemEntity>;
  fetchStockMovements(itemId: string): Promise<StockMovement[]>;
  fetchStockValue(): Promise<number>;
}
