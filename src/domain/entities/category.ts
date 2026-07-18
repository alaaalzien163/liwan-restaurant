export interface CategoryEntity {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  image: string;
  displayOrder: number;
  isActive: boolean;
  mainSection: "food" | "drinks";
  createdAt: string;
  updatedAt: string;
}
