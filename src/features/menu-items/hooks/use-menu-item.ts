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
      const record: MenuItemRecord = {
        id: entity.id,
        categoryId: entity.categoryId,
        name: entity.name,
        nameAr: entity.nameAr,
        description: entity.description,
        descriptionAr: entity.descriptionAr,
        price: entity.price,
        discountPrice: undefined,
        image: entity.imageUrl,
        displayOrder: entity.sortOrder,
        isAvailable: entity.isAvailable,
        isFeatured: entity.isFeatured,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      };
      return record;
    },
    enabled: !!id,
  });
}
