import { diContainer } from "./container";
import { registerSupabaseRepositories } from "./registration";
import type { DiToken } from "./tokens";

export function getRepository<T>(token: DiToken): T {
  if (!diContainer.has(token)) {
    registerSupabaseRepositories();
  }
  return diContainer.resolve<T>(token);
}
