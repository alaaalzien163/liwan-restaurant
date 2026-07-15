export type TableStatus =
  "available" | "occupied" | "reserved" | "cleaning" | "maintenance";

export type TableZone =
  "indoor" | "outdoor" | "terrace" | "vip" | "private" | "bar";

export interface TableEntity {
  id: string;
  tableNumber: string;
  capacity: number;
  minCapacity: number;
  status: TableStatus;
  zone: TableZone;
  location?: string;
  isSmoking: boolean;
  isAccessible: boolean;
  isActive: boolean;
  qrCodeUrl?: string;
  currentOrderId?: string;
  currentServerId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
