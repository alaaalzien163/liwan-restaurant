import type { CategoryEntity } from "../../entities/category";
import type { CreateCategoryDto } from "../../repositories/category-repository";

export type CreateCategoryRequest = CreateCategoryDto;
export type CreateCategoryResponse = CategoryEntity;

export interface ICreateCategoryUseCase {
  execute(data: CreateCategoryRequest): Promise<CreateCategoryResponse>;
}
