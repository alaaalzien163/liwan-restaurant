import type {
  IMenuRepository,
  MenuItemFilters,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from "@/domain/repositories/menu-repository";
import type {
  MenuItemEntity,
  MenuCategoryEntity,
} from "@/domain/entities/menu-item";
import type { PaginatedResponse } from "@/core/types";
import { getSupabaseClient } from "../client";
import type { CategoryRow, MenuItemRow } from "../database.types";
import { resolveImageUrl } from "../storage";
import { deleteStorageFile, isBlobUrl } from "../upload";

const IMAGE_BUCKET = "menu-images";

function itemToDomain(
  row: MenuItemRow,
  category?: MenuCategoryEntity,
): MenuItemEntity {
  return {
    id: row.id,
    name: row.name_en,
    nameAr: row.name_ar,
    description: row.description,
    descriptionAr: row.description,
    price: Number(row.price),
    currency: "SAR",
    categoryId: row.category_id,
    imageUrl: resolveImageUrl(IMAGE_BUCKET, row.image_path),
    images: row.image_path
      ? [resolveImageUrl(IMAGE_BUCKET, row.image_path)]
      : [],
    ingredients: [],
    ingredientsAr: [],
    allergens: [],
    nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    modifiers: [],
    isAvailable: true,
    isFeatured: false,
    preparationTime: 15,
    taxRate: 0.15,
    sortOrder: 0,
    status: "active",
    tags: [],
    category: category ?? {
      id: "",
      name: "",
      nameAr: "",
      description: "",
      descriptionAr: "",
      sortOrder: 0,
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
    createdAt: row.created_at,
    updatedAt: row.created_at,
  };
}

function categoryToDomain(row: CategoryRow): MenuCategoryEntity {
  return {
    id: row.id,
    name: row.name_en,
    nameAr: row.name_ar,
    description: "",
    descriptionAr: "",
    sortOrder: 0,
    isActive: true,
    createdAt: row.created_at,
    updatedAt: row.created_at,
  };
}

export class SupabaseMenuRepository implements IMenuRepository {
  async getMenuItems(
    filters?: MenuItemFilters,
  ): Promise<PaginatedResponse<MenuItemEntity>> {
    const supabase = getSupabaseClient();
    let query = supabase.from("menu_items").select("*", { count: "exact" });

    if (filters?.search) {
      const q = filters.search;
      query = query.or(`name_en.ilike.%${q}%,name_ar.ilike.%${q}%`);
    }

    if (filters?.categoryId) {
      query = query.eq("category_id", filters.categoryId);
    }

    const page = filters?.page ?? 1;
    const pageSize = filters?.pageSize ?? 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    if (filters?.sortBy === "price") {
      query = query.order("price", { ascending: filters.sortOrder !== "desc" });
    } else if (filters?.sortBy === "name") {
      query = query.order("name_en", {
        ascending: filters.sortOrder !== "desc",
      });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error, count } = await query.range(start, end);

    if (error) throw new Error(`Failed to fetch menu items: ${error.message}`);

    const rows = (data ?? []) as unknown as MenuItemRow[];
    return {
      data: rows.map((row) => itemToDomain(row)),
      total: count ?? 0,
      page,
      pageSize,
      totalPages: count ? Math.ceil(count / pageSize) : 0,
    };
  }

  async getMenuItemById(id: string): Promise<MenuItemEntity> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Menu item not found: ${error.message}`);
    const row = data as unknown as MenuItemRow;
    const category = await this.getCategoryById(row.category_id).catch(
      () => undefined,
    );
    return itemToDomain(row, category);
  }

  async getMenuItemsByIds(ids: string[]): Promise<MenuItemEntity[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .in("id", ids);

    if (error) throw new Error(`Failed to fetch menu items: ${error.message}`);
    const rows = (data ?? []) as unknown as MenuItemRow[];
    return rows.map((row) => itemToDomain(row));
  }

  async createMenuItem(dto: CreateMenuItemDto): Promise<MenuItemEntity> {
    const supabase = getSupabaseClient();
    const image = dto.imageUrl || null;
    console.log(
      "[createMenuItem] dto.imageUrl:",
      dto.imageUrl,
      "resolved image:",
      image,
    );
    if (image && isBlobUrl(image)) {
      throw new Error("Cannot persist blob URL as image");
    }
    const { data, error } = await supabase
      .from("menu_items")
      .insert({
        category_id: dto.categoryId,
        name_en: dto.name,
        name_ar: dto.nameAr || dto.name,
        description: dto.description,
        image_path: image,
        price: dto.price,
      } satisfies Omit<MenuItemRow, "id" | "created_at">)
      .select()
      .single();

    if (error) throw new Error(`Failed to create menu item: ${error.message}`);
    const row = data as unknown as MenuItemRow;
    const category = await this.getCategoryById(row.category_id).catch(
      () => undefined,
    );
    return itemToDomain(row, category);
  }

  async updateMenuItem(
    id: string,
    dto: UpdateMenuItemDto,
  ): Promise<MenuItemEntity> {
    const supabase = getSupabaseClient();

    const newImage =
      dto.imageUrl !== undefined ? dto.imageUrl || null : undefined;
    console.log(
      "[updateMenuItem] dto.imageUrl:",
      dto.imageUrl,
      "resolved newImage:",
      newImage,
    );
    if (newImage && isBlobUrl(newImage)) {
      throw new Error("Cannot persist blob URL as image");
    }

    if (dto.imageUrl !== undefined) {
      const { data: current } = await supabase
        .from("menu_items")
        .select("image_path")
        .eq("id", id)
        .single();

      const oldPath = (current as { image_path: string | null } | undefined)
        ?.image_path;

      if (oldPath && oldPath !== newImage) {
        await deleteStorageFile(oldPath, IMAGE_BUCKET).catch(() => {});
      }
    }

    const updates: Partial<Omit<MenuItemRow, "id" | "created_at">> = {};
    if (dto.name !== undefined) updates.name_en = dto.name;
    if (dto.nameAr !== undefined) updates.name_ar = dto.nameAr;
    if (dto.description !== undefined) updates.description = dto.description;
    if (dto.imageUrl !== undefined) updates.image_path = newImage;
    if (dto.price !== undefined) updates.price = dto.price;
    if (dto.categoryId !== undefined) updates.category_id = dto.categoryId;

    const { data, error } = await supabase
      .from("menu_items")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update menu item: ${error.message}`);
    const row = data as unknown as MenuItemRow;
    const category = await this.getCategoryById(row.category_id).catch(
      () => undefined,
    );
    return itemToDomain(row, category);
  }

  async deleteMenuItem(id: string): Promise<void> {
    const supabase = getSupabaseClient();

    const { data: current } = await supabase
      .from("menu_items")
      .select("image_path")
      .eq("id", id)
      .single();

    const imagePath = (current as { image_path: string | null } | undefined)
      ?.image_path;
    if (imagePath) {
      await deleteStorageFile(imagePath, IMAGE_BUCKET).catch(() => {});
    }

    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (error) throw new Error(`Failed to delete menu item: ${error.message}`);
  }

  async updateAvailability(
    id: string,
    isAvailable: boolean,
  ): Promise<MenuItemEntity> {
    return this.updateMenuItem(id, { isAvailable });
  }

  async getMenuCategories(): Promise<MenuCategoryEntity[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
    const rows = (data ?? []) as unknown as CategoryRow[];
    return rows.map(categoryToDomain);
  }

  async createCategory(
    dto: Omit<MenuCategoryEntity, "id" | "createdAt" | "updatedAt">,
  ): Promise<MenuCategoryEntity> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("categories")
      .insert({
        name_en: dto.name,
        name_ar: dto.nameAr,
        image_path: null,
      } satisfies Omit<CategoryRow, "id" | "created_at">)
      .select()
      .single();

    if (error) throw new Error(`Failed to create category: ${error.message}`);
    return categoryToDomain(data as unknown as CategoryRow);
  }

  async updateCategory(
    id: string,
    dto: Partial<MenuCategoryEntity>,
  ): Promise<MenuCategoryEntity> {
    const supabase = getSupabaseClient();
    const updates: Partial<Omit<CategoryRow, "id" | "created_at">> = {};
    if (dto.name !== undefined) updates.name_en = dto.name;
    if (dto.nameAr !== undefined) updates.name_ar = dto.nameAr;

    const { data, error } = await supabase
      .from("categories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update category: ${error.message}`);
    return categoryToDomain(data as unknown as CategoryRow);
  }

  async deleteCategory(id: string): Promise<void> {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) throw new Error(`Failed to delete category: ${error.message}`);
  }

  private async getCategoryById(
    id: string,
  ): Promise<MenuCategoryEntity | undefined> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return undefined;
    return categoryToDomain(data as unknown as CategoryRow);
  }
}
