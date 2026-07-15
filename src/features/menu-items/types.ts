export interface MenuItemRecord {
  id: string;
  categoryId: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  discountPrice?: number;
  image: string;
  displayOrder: number;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
