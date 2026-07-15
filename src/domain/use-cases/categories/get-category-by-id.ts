import type { CategoryEntity } from "../../entities/category";

export interface IGetCategoryByIdUseCase {
  execute(id: string): Promise<CategoryEntity>;
}
