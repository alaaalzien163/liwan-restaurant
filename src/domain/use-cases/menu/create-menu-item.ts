import type { MenuItemEntity } from "../../entities/menu-item";
import type { CreateMenuItemDto } from "../../repositories/menu-repository";

export type CreateMenuItemRequest = CreateMenuItemDto;
export type CreateMenuItemResponse = MenuItemEntity;

export interface ICreateMenuItemUseCase {
  execute(data: CreateMenuItemRequest): Promise<CreateMenuItemResponse>;
}
