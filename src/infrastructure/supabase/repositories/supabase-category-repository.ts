import type {
  ICategoryRepository,
  CategoryFilters,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/domain/repositories/category-repository";
import type { CategoryEntity } from "@/domain/entities/category";
import type { PaginatedResponse } from "@/core/types";
import { getSupabaseClient, getCurrentUserId } from "../client";
import type { CategoryRow } from "../database.types";
import { resolveImageUrl } from "../storage";
import {
  assertNotBlobUrl,
  deleteStorageFile,
  extractStoragePath,
  isBlobUrl,
  uploadEntityImage,
} from "../upload";
import { logFetchResult, logQueryError } from "../debug";

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

    if (error) {
      logQueryError("SupabaseCategoryRepository", "categories", error);
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    const rows = (data ?? []) as unknown as CategoryRow[];
    logFetchResult("SupabaseCategoryRepository", "categories", count);
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
    if (dto.image !== undefined) assertNotBlobUrl(dto.image, "category image");
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error("You must be signed in to create a category");
    }

    const { data, error } = await supabase
      .from("categories")
      .insert({
        user_id: userId,
        name_en: dto.name,
        name_ar: dto.nameAr,
        description: dto.description ?? "",
        image_path: dto.imageFile ? null : dto.image || null,
        display_order: dto.displayOrder ?? 0,
        is_active: dto.isActive ?? true,
        main_section: dto.mainSection,
      } satisfies Omit<CategoryRow, "id" | "created_at" | "updated_at">)
      .select()
      .single();

    if (error) throw new Error(`Failed to create category: ${error.message}`);

    const row = data as unknown as CategoryRow;

    if (dto.imageFile) {
      const storagePath = await uploadEntityImage(
        IMAGE_BUCKET,
        row.id,
        dto.imageFile,
      );

      const { data: updated, error: imageError } = await supabase
        .from("categories")
        .update({ image_path: storagePath })
        .eq("id", row.id)
        .select()
        .single();

      if (imageError) {
        throw new Error(`Failed to save category image: ${imageError.message}`);
      }
      return toDomain(updated as unknown as CategoryRow);
    }

    return toDomain(row);
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

    const { data: current } = await supabase
      .from("categories")
      .select("image_path")
      .eq("id", id)
      .single();

    const oldPath =
      (current as { image_path: string | null } | undefined)?.image_path ??
      null;

    let newStoragePath: string | null | undefined = undefined;
    let oldToDelete: string | null = null;

    if (dto.imageFile) {
      // Upload the new file FIRST (ID-based path) and confirm success.
      const storagePath = await uploadEntityImage(
        IMAGE_BUCKET,
        id,
        dto.imageFile,
      );
      newStoragePath = storagePath;
      if (oldPath && extractStoragePath(oldPath) !== storagePath) {
        oldToDelete = oldPath;
      }
    } else if (dto.image !== undefined) {
      const image = dto.image || null;
      newStoragePath = image;
      if (oldPath && extractStoragePath(oldPath) !== (image ?? "")) {
        oldToDelete = oldPath;
      }
    }

    const updates: Partial<
      Omit<CategoryRow, "id" | "created_at" | "updated_at">
    > = {};
    if (dto.name !== undefined) updates.name_en = dto.name;
    if (dto.nameAr !== undefined) updates.name_ar = dto.nameAr;
    if (dto.mainSection !== undefined) updates.main_section = dto.mainSection;
    if (newStoragePath !== undefined) updates.image_path = newStoragePath;

    const { data, error } = await supabase
      .from("categories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update category: ${error.message}`);

    // Delete the old object only AFTER the update succeeded (oldToDelete is
    // only set when the uploaded/persisted path actually differs) and only when
    // it belongs to the current project's bucket.
    if (oldToDelete) {
      await deleteStorageFile(oldToDelete, IMAGE_BUCKET).catch(() => {});
    }

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
