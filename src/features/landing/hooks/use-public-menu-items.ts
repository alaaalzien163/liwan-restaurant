"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepository } from "@/infrastructure/di/get-repository";
import { DI_TOKENS } from "@/infrastructure/di/tokens";
import type { ILandingRepository } from "../landing-repository";
import { LANDING_QUERY_KEYS } from "../constants";

export function usePublicMenuItems() {
  return useQuery({
    queryKey: LANDING_QUERY_KEYS.menuItems,
    queryFn: () => {
      const repo = getRepository<ILandingRepository>(
        DI_TOKENS.LANDING_REPOSITORY,
      );
      return repo.getPublicMenuItems();
    },
  });
}
