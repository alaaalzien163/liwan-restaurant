import type { MenuItemEntity } from "../../entities/menu-item";
import type { UpdateMenuItemDto } from "../../repositories/menu-repository";

export type UpdateMenuItemRequest = {
  id: string;
  data: UpdateMenuItemDto;
};

export type UpdateMenuItemResponse = MenuItemEntity;

export interface IUpdateMenuItemUseCase {
  execute(request: UpdateMenuItemRequest): Promise<UpdateMenuItemResponse>;
}
