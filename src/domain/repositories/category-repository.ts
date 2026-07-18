import type { CategoryEntity } from "../entities/category";
import type { PaginatedResponse, PaginationParams } from "@/core/types";

export interface CategoryFilters extends PaginationParams {
  search?: string;
  isActive?: boolean;
  mainSection?: "food" | "drinks";
}

export interface CreateCategoryDto {
  name: string;
  nameAr: string;
  description?: string;
  image?: string;
  displayOrder: number;
  isActive: boolean;
  mainSection: "food" | "drinks";
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

export interface ICategoryRepository {
  getCategories(
    filters?: CategoryFilters,
  ): Promise<PaginatedResponse<CategoryEntity>>;
  getCategoryById(id: string): Promise<CategoryEntity>;
  createCategory(data: CreateCategoryDto): Promise<CategoryEntity>;
  updateCategory(id: string, data: UpdateCategoryDto): Promise<CategoryEntity>;
  deleteCategory(id: string): Promise<void>;
}
