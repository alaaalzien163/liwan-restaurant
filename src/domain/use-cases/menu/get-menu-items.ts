import type { MenuItemEntity } from "../../entities/menu-item";
import type { MenuItemFilters } from "../../repositories/menu-repository";
import type { PaginatedResponse } from "@/core/types";

export type GetMenuItemsRequest = MenuItemFilters;
export type GetMenuItemsResponse = PaginatedResponse<MenuItemEntity>;

export interface IGetMenuItemsUseCase {
  execute(filters?: GetMenuItemsRequest): Promise<GetMenuItemsResponse>;
}
