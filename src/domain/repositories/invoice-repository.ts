import type { InvoiceEntity, InvoiceStatus } from "../entities/invoice";
import type { PaginatedResponse, PaginationParams } from "@/core/types";
import type { PaymentMethod } from "../entities/order";

export interface InvoiceFilters extends PaginationParams {
  search?: string;
  status?: InvoiceStatus;
  dateFrom?: string;
  dateTo?: string;
  customerId?: string;
  orderId?: string;
}

export interface CreateInvoiceDto {
  orderId?: string;
  customerId?: string;
  lineItems: Array<{
    description: string;
    descriptionAr: string;
    quantity: number;
    unitPrice: number;
    taxRate?: number;
    discountRate?: number;
    menuItemId?: string;
    orderItemId?: string;
  }>;
  serviceCharge?: number;
  deliveryCharge?: number;
  discountTotal?: number;
  notes?: string;
  terms?: string;
}

export interface ProcessPaymentDto {
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  processedBy: string;
  notes?: string;
}

export interface IInvoiceRepository {
  getInvoices(
    filters?: InvoiceFilters,
  ): Promise<PaginatedResponse<InvoiceEntity>>;
  getInvoiceById(id: string): Promise<InvoiceEntity>;
  getInvoiceByNumber(invoiceNumber: string): Promise<InvoiceEntity>;
  getInvoicesByCustomer(customerId: string): Promise<InvoiceEntity[]>;
  getInvoicesByOrder(orderId: string): Promise<InvoiceEntity[]>;
  getTodayInvoices(): Promise<InvoiceEntity[]>;
  createInvoice(data: CreateInvoiceDto): Promise<InvoiceEntity>;
  updateInvoice(
    id: string,
    data: Partial<CreateInvoiceDto>,
  ): Promise<InvoiceEntity>;
  cancelInvoice(id: string, reason?: string): Promise<InvoiceEntity>;
  processPayment(data: ProcessPaymentDto): Promise<InvoiceEntity>;
  refundPayment(
    invoiceId: string,
    paymentId: string,
    reason?: string,
  ): Promise<InvoiceEntity>;
  generateInvoiceNumber(): Promise<string>;
  getDailyRevenue(date: string): Promise<number>;
}
