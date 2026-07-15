"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type {
  IMenuRepository,
  MenuItemFilters,
} from "@/domain/repositories/menu-repository";
import type { MenuItemEntity } from "@/domain/entities/menu-item";
import type { MenuItemRecord } from "../types";

function toRecord(entity: MenuItemEntity): MenuItemRecord {
  return {
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
}

const repo = () => getRepository<IMenuRepository>(DI_TOKENS.MENU_REPOSITORY);

export function useMenuItems(filters?: MenuItemFilters) {
  return useQuery({
    queryKey: ["menu-items", filters],
    queryFn: async () => {
      const result = await repo().getMenuItems(filters);
      return {
        ...result,
        data: result.data.map(toRecord),
      };
    },
  });
}
