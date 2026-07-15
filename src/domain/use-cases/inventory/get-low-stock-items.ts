import type { InventoryItemEntity } from "../../entities/inventory-item";

export interface IGetLowStockItemsUseCase {
  execute(): Promise<InventoryItemEntity[]>;
}
