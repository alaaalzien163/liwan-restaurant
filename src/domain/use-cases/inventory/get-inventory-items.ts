import type { InventoryItemEntity } from "../../entities/inventory-item";
import type { InventoryFilters } from "../../repositories/inventory-repository";
import type { PaginatedResponse } from "@/core/types";

export type GetInventoryItemsRequest = InventoryFilters;
export type GetInventoryItemsResponse = PaginatedResponse<InventoryItemEntity>;

export interface IGetInventoryItemsUseCase {
  execute(
    filters?: GetInventoryItemsRequest,
  ): Promise<GetInventoryItemsResponse>;
}
