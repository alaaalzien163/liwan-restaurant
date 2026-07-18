export interface CategoryRow {
  id: string;
  name_en: string;
  name_ar: string;
  image_path: string | null;
  main_section: string;
  created_at: string;
}

export interface MenuItemRow {
  id: string;
  category_id: string;
  name_en: string;
  name_ar: string;
  description: string;
  image_path: string | null;
  price: number;
  created_at: string;
}
