import type { MenuItemEntity } from "../../entities/menu-item";

export interface IGetMenuItemByIdUseCase {
  execute(id: string): Promise<MenuItemEntity>;
}
