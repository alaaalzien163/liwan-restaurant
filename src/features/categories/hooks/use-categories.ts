"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type {
  ICategoryRepository,
  CategoryFilters,
} from "@/domain/repositories/category-repository";

const repo = () =>
  getRepository<ICategoryRepository>(DI_TOKENS.CATEGORY_REPOSITORY);

export function useCategories(filters?: CategoryFilters) {
  return useQuery({
    queryKey: ["categories", filters],
    queryFn: () => repo().getCategories(filters),
  });
}
