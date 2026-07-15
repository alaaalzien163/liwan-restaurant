export type InventoryCategory =
  | "produce"
  | "meat"
  | "poultry"
  | "seafood"
  | "dairy"
  | "dry_goods"
  | "beverages"
  | "condiments"
  | "spices"
  | "other";

export type UnitOfMeasure =
  | "kg"
  | "g"
  | "lb"
  | "oz"
  | "l"
  | "ml"
  | "pcs"
  | "dozen"
  | "case"
  | "bottle"
  | "can"
  | "bag";

export type StockMovementType =
  "received" | "used" | "wasted" | "returned" | "adjusted" | "transferred";

export interface StockMovement {
  id: string;
  itemId: string;
  type: StockMovementType;
  quantity: number;
  unitCost: number;
  totalCost: number;
  referenceType?: string;
  referenceId?: string;
  notes?: string;
  performedBy: string;
  createdAt: string;
}

export interface InventoryItemEntity {
  id: string;
  name: string;
  nameAr: string;
  sku: string;
  category: InventoryCategory;
  unit: UnitOfMeasure;
  unitCost: number;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  supplierId?: string;
  supplierName?: string;
  location?: string;
  batchNumber?: string;
  expiryDate?: string;
  isPerishable: boolean;
  isActive: boolean;
  imageUrl?: string;
  barcode?: string;
  movements?: StockMovement[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
