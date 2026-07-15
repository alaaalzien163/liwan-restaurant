import type { InventoryItemEntity } from "../../entities/inventory-item";
import type { StockAdjustmentDto } from "../../repositories/inventory-repository";

export type UpdateStockRequest = StockAdjustmentDto;
export type UpdateStockResponse = InventoryItemEntity;

export interface IUpdateStockUseCase {
  execute(data: UpdateStockRequest): Promise<UpdateStockResponse>;
}
