"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type { IMenuRepository } from "@/domain/repositories/menu-repository";
import type { MenuItemRecord } from "../types";

const repo = () => getRepository<IMenuRepository>(DI_TOKENS.MENU_REPOSITORY);

export function useMenuItem(id: string) {
  return useQuery({
    queryKey: ["menu-item", id],
    queryFn: async () => {
      const entity = await repo().getMenuItemById(id);
      if (!entity) throw new Error("Menu item not found");
      const record: MenuItemRecord = {
        id: entity.id ?? "",
        categoryId: entity.categoryId ?? "",
        name: entity.name ?? "",
        nameAr: entity.nameAr ?? "",
        description: entity.description ?? "",
        descriptionAr: entity.descriptionAr ?? "",
        price: typeof entity.price === "number" ? entity.price : 0,
        discountPrice: undefined,
        image: entity.imageUrl ?? "",
        displayOrder: entity.sortOrder ?? 0,
        isAvailable: entity.isAvailable ?? true,
        isFeatured: entity.isFeatured ?? false,
        createdAt: entity.createdAt ?? "",
        updatedAt: entity.updatedAt ?? "",
      };
      return record;
    },
    enabled: !!id,
    retry: 1,
  });
}
