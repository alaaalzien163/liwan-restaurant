import type { CategoryEntity } from "../../entities/category";
import type { UpdateCategoryDto } from "../../repositories/category-repository";

export type UpdateCategoryRequest = {
  id: string;
  data: UpdateCategoryDto;
};

export type UpdateCategoryResponse = CategoryEntity;

export interface IUpdateCategoryUseCase {
  execute(request: UpdateCategoryRequest): Promise<UpdateCategoryResponse>;
}
