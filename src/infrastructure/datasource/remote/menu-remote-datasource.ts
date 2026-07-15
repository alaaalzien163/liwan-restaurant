import type {
  MenuItemEntity,
  MenuCategoryEntity,
} from "@/domain/entities/menu-item";
import type {
  MenuItemFilters,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from "@/domain/repositories/menu-repository";
import type { PaginatedResponse } from "@/core/types";

export interface IMenuRemoteDataSource {
  fetchMenuItems(
    filters?: MenuItemFilters,
  ): Promise<PaginatedResponse<MenuItemEntity>>;
  fetchMenuItemById(id: string): Promise<MenuItemEntity>;
  fetchMenuItemsByIds(ids: string[]): Promise<MenuItemEntity[]>;
  createMenuItem(data: CreateMenuItemDto): Promise<MenuItemEntity>;
  updateMenuItem(id: string, data: UpdateMenuItemDto): Promise<MenuItemEntity>;
  deleteMenuItem(id: string): Promise<void>;
  updateAvailability(id: string, isAvailable: boolean): Promise<MenuItemEntity>;
  fetchCategories(): Promise<MenuCategoryEntity[]>;
  createCategory(
    data: Omit<MenuCategoryEntity, "id" | "createdAt" | "updatedAt">,
  ): Promise<MenuCategoryEntity>;
  updateCategory(
    id: string,
    data: Partial<MenuCategoryEntity>,
  ): Promise<MenuCategoryEntity>;
  deleteCategory(id: string): Promise<void>;
}
