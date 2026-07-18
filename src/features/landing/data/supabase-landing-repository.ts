import type { ILandingRepository } from "../landing-repository";
import type { LandingCategory, PublicMenuItem } from "../types";
import { getSupabaseClient } from "@/infrastructure/supabase/client";
import type {
  CategoryRow,
  MenuItemRow,
} from "@/infrastructure/supabase/database.types";
import { resolveImageUrl } from "@/infrastructure/supabase/storage";

function categoryToDomain(row: CategoryRow): LandingCategory {
  return {
    id: row.id,
    name: row.name_en,
    nameAr: row.name_ar,
    description: row.name_en,
    descriptionAr: row.name_ar,
    image: resolveImageUrl("category-images", row.image_path),
    icon: "",
    mainSection: row.main_section as "food" | "drinks",
  };
}

function menuItemToDomain(row: MenuItemRow): PublicMenuItem {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name_en,
    nameAr: row.name_ar,
    description: row.description,
    descriptionAr: row.description,
    price: Number(row.price),
    image: resolveImageUrl("menu-images", row.image_path),
    isFeatured: false,
  };
}

export class SupabaseLandingRepository implements ILandingRepository {
  async getPublicCategories(): Promise<LandingCategory[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
    return ((data ?? []) as unknown as CategoryRow[]).map(categoryToDomain);
  }

  async getPublicMenuItems(): Promise<PublicMenuItem[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw new Error(`Failed to fetch menu items: ${error.message}`);
    return ((data ?? []) as unknown as MenuItemRow[]).map(menuItemToDomain);
  }

  async getGalleryImages() {
    return [];
  }
}
