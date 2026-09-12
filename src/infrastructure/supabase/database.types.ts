export interface CategoryRow {
  id: string;
  user_id: string;
  name_en: string;
  name_ar: string;
  description: string;
  image_path: string | null;
  display_order: number;
  is_active: boolean;
  main_section: string;
  created_at: string;
  updated_at: string;
}

export interface MenuItemRow {
  id: string;
  user_id: string;
  category_id: string;
  name_en: string;
  name_ar: string;
  description: string;
  image_path: string | null;
  price: number;
  is_available: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
