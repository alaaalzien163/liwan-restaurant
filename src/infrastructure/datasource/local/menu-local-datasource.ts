import type {
  MenuItemEntity,
  MenuCategoryEntity,
} from "@/domain/entities/menu-item";

export interface IMenuLocalDataSource {
  getCachedMenuItems(): Promise<MenuItemEntity[]>;
  cacheMenuItems(items: MenuItemEntity[]): Promise<void>;
  getCachedCategories(): Promise<MenuCategoryEntity[]>;
  cacheCategories(categories: MenuCategoryEntity[]): Promise<void>;
  clearCache(): Promise<void>;
}
