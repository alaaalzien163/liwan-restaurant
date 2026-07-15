import type {
  MenuItemEntity,
  MenuCategoryEntity,
  MenuItemStatus,
} from "../entities/menu-item";
import type { PaginatedResponse, PaginationParams } from "@/core/types";

export interface MenuItemFilters extends PaginationParams {
  search?: string;
  categoryId?: string;
  status?: MenuItemStatus;
  isAvailable?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateMenuItemDto {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  currency?: string;
  categoryId: string;
  imageUrl?: string;
  image?: string;
  discountPrice?: number;
  displayOrder?: number;
  images?: string[];
  ingredients?: string[];
  ingredientsAr?: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sodium?: number;
  };
  isAvailable?: boolean;
  isFeatured?: boolean;
  preparationTime?: number;
  taxRate?: number;
  sortOrder?: number;
  tags?: string[];
}

export interface UpdateMenuItemDto extends Partial<CreateMenuItemDto> {
  status?: MenuItemStatus;
}

export interface IMenuRepository {
  getMenuItems(
    filters?: MenuItemFilters,
  ): Promise<PaginatedResponse<MenuItemEntity>>;
  getMenuItemById(id: string): Promise<MenuItemEntity>;
  getMenuItemsByIds(ids: string[]): Promise<MenuItemEntity[]>;
  createMenuItem(data: CreateMenuItemDto): Promise<MenuItemEntity>;
  updateMenuItem(id: string, data: UpdateMenuItemDto): Promise<MenuItemEntity>;
  deleteMenuItem(id: string): Promise<void>;
  updateAvailability(id: string, isAvailable: boolean): Promise<MenuItemEntity>;
  getMenuCategories(): Promise<MenuCategoryEntity[]>;
  createCategory(
    data: Omit<MenuCategoryEntity, "id" | "createdAt" | "updatedAt">,
  ): Promise<MenuCategoryEntity>;
  updateCategory(
    id: string,
    data: Partial<MenuCategoryEntity>,
  ): Promise<MenuCategoryEntity>;
  deleteCategory(id: string): Promise<void>;
}
