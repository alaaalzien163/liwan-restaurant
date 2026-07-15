import type { MenuItemEntity } from "./menu-item";
import type { StaffMemberEntity } from "./staff-member";
import type { TableEntity } from "./table";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "served"
  | "cancelled"
  | "completed";

export type PaymentStatus =
  "unpaid" | "paid" | "partially_paid" | "refunded" | "cancelled";

export type PaymentMethod =
  | "cash"
  | "credit_card"
  | "debit_card"
  | "wallet"
  | "bank_transfer"
  | "mobile_payment";

export type OrderType = "dine_in" | "takeaway" | "delivery" | "online";

export interface OrderItemModifierSelection {
  modifierId: string;
  optionId: string;
  name: string;
  nameAr: string;
  priceAdjustment: number;
  quantity: number;
}

export interface OrderItemEntity {
  id: string;
  menuItemId: string;
  menuItem: MenuItemEntity;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  modifierSelections: OrderItemModifierSelection[];
  specialInstructions?: string;
  status: OrderItemStatus;
  preparedBy?: StaffMemberEntity;
  preparedAt?: string;
}

export type OrderItemStatus =
  "pending" | "preparing" | "ready" | "served" | "cancelled";

export interface OrderEntity {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItemEntity[];
  subtotal: number;
  taxAmount: number;
  serviceCharge: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  changeAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  tableId?: string;
  table?: TableEntity;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  serverId?: string;
  server?: StaffMemberEntity;
  chefId?: string;
  chef?: StaffMemberEntity;
  notes?: string;
  specialRequests?: string;
  guestCount?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
