import type { CategoryEntity } from "../../entities/category";
import type { CategoryFilters } from "../../repositories/category-repository";
import type { PaginatedResponse } from "@/core/types";

export type GetCategoriesRequest = CategoryFilters;
export type GetCategoriesResponse = PaginatedResponse<CategoryEntity>;

export interface IGetCategoriesUseCase {
  execute(filters?: GetCategoriesRequest): Promise<GetCategoriesResponse>;
}
