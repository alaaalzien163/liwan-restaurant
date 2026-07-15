"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type {
  ICategoryRepository,
  CreateCategoryDto,
} from "@/domain/repositories/category-repository";

const repo = () =>
  getRepository<ICategoryRepository>(DI_TOKENS.CATEGORY_REPOSITORY);

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => repo().createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
