export type MenuItemStatus =
  "active" | "inactive" | "out_of_stock" | "archived";

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
}

export interface MenuCategoryEntity {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  imageUrl?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export type MenuItemModifierType = "single" | "multiple" | "force";

export interface MenuItemModifierOption {
  id: string;
  name: string;
  nameAr: string;
  priceAdjustment: number;
  isDefault: boolean;
  maxQuantity?: number;
}

export interface MenuItemModifier {
  id: string;
  name: string;
  nameAr: string;
  type: MenuItemModifierType;
  minSelection: number;
  maxSelection: number;
  options: MenuItemModifierOption[];
  isRequired: boolean;
}

export interface MenuItemEntity {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  currency: string;
  categoryId: string;
  category: MenuCategoryEntity;
  imageUrl: string;
  images: string[];
  ingredients: string[];
  ingredientsAr: string[];
  allergens: string[];
  nutritionalInfo: NutritionalInfo;
  modifiers: MenuItemModifier[];
  isAvailable: boolean;
  isFeatured: boolean;
  preparationTime: number;
  taxRate: number;
  sortOrder: number;
  status: MenuItemStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
