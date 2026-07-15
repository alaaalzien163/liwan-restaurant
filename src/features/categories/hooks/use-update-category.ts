"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type {
  ICategoryRepository,
  UpdateCategoryDto,
} from "@/domain/repositories/category-repository";

const repo = () =>
  getRepository<ICategoryRepository>(DI_TOKENS.CATEGORY_REPOSITORY);

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDto }) =>
      repo().updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
