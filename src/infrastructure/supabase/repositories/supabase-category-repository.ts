import type {
  ICategoryRepository,
  CategoryFilters,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/domain/repositories/category-repository";
import type { CategoryEntity } from "@/domain/entities/category";
import type { PaginatedResponse } from "@/core/types";
import { getSupabaseClient } from "../client";
import type { CategoryRow } from "../database.types";
import { resolveImageUrl } from "../storage";
import { deleteStorageFile, isBlobUrl } from "../upload";

const IMAGE_BUCKET = "category-images";

function toDomain(row: CategoryRow): CategoryEntity {
  return {
    id: row.id,
    name: row.name_en,
    nameAr: row.name_ar,
    description: "",
    image: resolveImageUrl(IMAGE_BUCKET, row.image_path),
    displayOrder: 0,
    isActive: true,
    mainSection: row.main_section as "food" | "drinks",
    createdAt: row.created_at,
    updatedAt: row.created_at,
  };
}

export class SupabaseCategoryRepository implements ICategoryRepository {
  async getCategories(
    filters?: CategoryFilters,
  ): Promise<PaginatedResponse<CategoryEntity>> {
    const supabase = getSupabaseClient();
    let query = supabase.from("categories").select("*", { count: "exact" });

    if (filters?.search) {
      const q = filters.search;
      query = query.or(`name_en.ilike.%${q}%,name_ar.ilike.%${q}%`);
    }

    if (filters?.mainSection) {
      query = query.eq("main_section", filters.mainSection);
    }

    const page = filters?.page ?? 1;
    const pageSize = filters?.pageSize ?? 1000;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    if (filters?.sortBy === "name") {
      query = query.order("name_en", {
        ascending: filters.sortOrder !== "desc",
      });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error, count } = await query.range(start, end);

    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);

    const rows = (data ?? []) as unknown as CategoryRow[];
    return {
      data: rows.map(toDomain),
      total: count ?? 0,
      page,
      pageSize,
      totalPages: count ? Math.ceil(count / pageSize) : 0,
    };
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(`Category not found: ${error.message}`);
    return toDomain(data as unknown as CategoryRow);
  }

  async createCategory(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const supabase = getSupabaseClient();
    const image = dto.image || null;
    if (image && isBlobUrl(image)) {
      throw new Error("Cannot persist blob URL as image");
    }
    const { data, error } = await supabase
      .from("categories")
      .insert({
        name_en: dto.name,
        name_ar: dto.nameAr,
        image_path: image,
        main_section: dto.mainSection,
      } satisfies Omit<CategoryRow, "id" | "created_at">)
      .select()
      .single();

    if (error) throw new Error(`Failed to create category: ${error.message}`);
    return toDomain(data as unknown as CategoryRow);
  }

  async updateCategory(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const supabase = getSupabaseClient();

    const newImage = dto.image !== undefined ? dto.image || null : undefined;
    if (newImage && isBlobUrl(newImage)) {
      throw new Error("Cannot persist blob URL as image");
    }

    if (dto.image !== undefined) {
      const { data: current } = await supabase
        .from("categories")
        .select("image_path")
        .eq("id", id)
        .single();

      const oldPath = (current as { image_path: string | null } | undefined)
        ?.image_path;

      if (oldPath && oldPath !== newImage) {
        await deleteStorageFile(oldPath, IMAGE_BUCKET).catch(() => {});
      }
    }

    const updates: Partial<Omit<CategoryRow, "id" | "created_at">> = {};
    if (dto.name !== undefined) updates.name_en = dto.name;
    if (dto.nameAr !== undefined) updates.name_ar = dto.nameAr;
    if (dto.image !== undefined) updates.image_path = newImage;
    if (dto.mainSection !== undefined) updates.main_section = dto.mainSection;

    const { data, error } = await supabase
      .from("categories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update category: ${error.message}`);
    return toDomain(data as unknown as CategoryRow);
  }

  async deleteCategory(id: string): Promise<void> {
    const supabase = getSupabaseClient();

    const { data: current } = await supabase
      .from("categories")
      .select("image_path")
      .eq("id", id)
      .single();

    const imagePath = (current as { image_path: string | null } | undefined)
      ?.image_path;
    if (imagePath) {
      await deleteStorageFile(imagePath, IMAGE_BUCKET).catch(() => {});
    }

    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) throw new Error(`Failed to delete category: ${error.message}`);
  }
}
