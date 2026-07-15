"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type { IMenuRepository } from "@/domain/repositories/menu-repository";

const repo = () => getRepository<IMenuRepository>(DI_TOKENS.MENU_REPOSITORY);

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => repo().deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
}
