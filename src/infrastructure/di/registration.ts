import { diContainer } from "./container";
import { DI_TOKENS } from "./tokens";
import { SupabaseCategoryRepository } from "../supabase/repositories/supabase-category-repository";
import { SupabaseMenuRepository } from "../supabase/repositories/supabase-menu-repository";
import { SupabaseLandingRepository } from "@/features/landing/data/supabase-landing-repository";
import { SupabaseAuthRepository } from "../supabase/repositories/supabase-auth-repository";

export function registerSupabaseRepositories(): void {
  if (diContainer.has(DI_TOKENS.CATEGORY_REPOSITORY)) return;

  diContainer.register(
    DI_TOKENS.CATEGORY_REPOSITORY,
    new SupabaseCategoryRepository(),
  );
  diContainer.register(DI_TOKENS.MENU_REPOSITORY, new SupabaseMenuRepository());
  diContainer.register(
    DI_TOKENS.MENU_ITEM_REPOSITORY,
    diContainer.resolve(DI_TOKENS.MENU_REPOSITORY),
  );
  diContainer.register(
    DI_TOKENS.LANDING_REPOSITORY,
    new SupabaseLandingRepository(),
  );
  diContainer.register(DI_TOKENS.AUTH_REPOSITORY, new SupabaseAuthRepository());
}

export { diContainer } from "./container";
export { DI_TOKENS } from "./tokens";
