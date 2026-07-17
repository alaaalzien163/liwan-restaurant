"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type { ICategoryRepository } from "@/domain/repositories/category-repository";

const repo = () =>
  getRepository<ICategoryRepository>(DI_TOKENS.CATEGORY_REPOSITORY);

export function useCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => repo().getCategoryById(id),
    enabled: !!id,
    retry: 1,
  });
}
