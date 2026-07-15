import type { InvoiceEntity } from "@/domain/entities/invoice";
import type {
  InvoiceFilters,
  CreateInvoiceDto,
  ProcessPaymentDto,
} from "@/domain/repositories/invoice-repository";
import type { PaginatedResponse } from "@/core/types";

export interface IInvoiceRemoteDataSource {
  fetchInvoices(
    filters?: InvoiceFilters,
  ): Promise<PaginatedResponse<InvoiceEntity>>;
  fetchInvoiceById(id: string): Promise<InvoiceEntity>;
  fetchInvoiceByNumber(invoiceNumber: string): Promise<InvoiceEntity>;
  fetchInvoicesByCustomer(customerId: string): Promise<InvoiceEntity[]>;
  fetchInvoicesByOrder(orderId: string): Promise<InvoiceEntity[]>;
  fetchTodayInvoices(): Promise<InvoiceEntity[]>;
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
  fetchDailyRevenue(date: string): Promise<number>;
}
