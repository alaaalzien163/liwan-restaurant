"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type { IMenuRepository } from "@/domain/repositories/menu-repository";

export function useDuplicateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const repo = getRepository<IMenuRepository>(DI_TOKENS.MENU_REPOSITORY);
      const original = await repo.getMenuItemById(id);
      return repo.createMenuItem({
        name: `${original.name} (Copy)`,
        nameAr: `${original.nameAr} (نسخة)`,
        description: original.description,
        descriptionAr: original.descriptionAr,
        price: original.price,
        categoryId: original.categoryId,
        imageUrl: original.imageUrl,
        isAvailable: original.isAvailable,
        isFeatured: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
}
