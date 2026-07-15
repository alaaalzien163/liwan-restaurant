import type { OrderEntity } from "./order";
import type { CustomerEntity } from "./customer";
import type { PaymentMethod } from "./order";

export type InvoiceStatus =
  | "draft"
  | "issued"
  | "paid"
  | "partially_paid"
  | "overdue"
  | "cancelled"
  | "refunded";

export interface InvoiceLineItem {
  id: string;
  description: string;
  descriptionAr: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  netTotal: number;
  menuItemId?: string;
  orderItemId?: string;
}

export interface InvoicePayment {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  paidAt: string;
  processedBy: string;
  notes?: string;
}

export interface InvoiceEntity {
  id: string;
  invoiceNumber: string;
  orderId?: string;
  order?: OrderEntity;
  customerId?: string;
  customer?: CustomerEntity;
  status: InvoiceStatus;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  serviceCharge: number;
  deliveryCharge: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  payments: InvoicePayment[];
  currency: string;
  notes?: string;
  terms?: string;
  issuedAt: string;
  dueDate?: string;
  paidAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}
