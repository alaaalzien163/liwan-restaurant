"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type {
  IMenuRepository,
  UpdateMenuItemDto,
} from "@/domain/repositories/menu-repository";

const repo = () => getRepository<IMenuRepository>(DI_TOKENS.MENU_REPOSITORY);

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMenuItemDto }) =>
      repo().updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
}
