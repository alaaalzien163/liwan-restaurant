"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { SettingsFormData } from "../schemas/settings-schema";
import type { SettingsRecord } from "../types";

export function useSettings() {
  return useQuery<SettingsRecord | null>({
    queryKey: ["settings"],
    queryFn: () => {
      throw new Error(
        "Settings repository not implemented. Implement ISettingsRepository and register it with the DI container.",
      );
    },
    enabled: false,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (_data: SettingsFormData) => {
      throw new Error(
        "Settings repository not implemented. Implement ISettingsRepository and register it with the DI container.",
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (_params: { currentPassword: string; newPassword: string }) => {
      throw new Error("Settings repository not implemented.");
    },
  });
}

export function useResetSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      throw new Error("Settings repository not implemented.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}
