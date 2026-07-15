import type { CustomerEntity } from "../entities/customer";
import type { PaginatedResponse, PaginationParams } from "@/core/types";

export interface CustomerFilters extends PaginationParams {
  search?: string;
  phone?: string;
  isVip?: boolean;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateCustomerDto {
  name: string;
  phone: string;
  email?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: "male" | "female";
  address?: string;
  city?: string;
  notes?: string;
  preferences?: string[];
  allergies?: string[];
}

export interface UpdateCustomerDto extends Partial<CreateCustomerDto> {
  isVip?: boolean;
  tags?: string[];
}

export interface ICustomerRepository {
  getCustomers(
    filters?: CustomerFilters,
  ): Promise<PaginatedResponse<CustomerEntity>>;
  getCustomerById(id: string): Promise<CustomerEntity>;
  getCustomerByPhone(phone: string): Promise<CustomerEntity | null>;
  searchCustomers(query: string): Promise<CustomerEntity[]>;
  createCustomer(data: CreateCustomerDto): Promise<CustomerEntity>;
  updateCustomer(id: string, data: UpdateCustomerDto): Promise<CustomerEntity>;
  deleteCustomer(id: string): Promise<void>;
  addFavoriteItem(customerId: string, menuItemId: string): Promise<void>;
  removeFavoriteItem(customerId: string, menuItemId: string): Promise<void>;
  getVipCustomers(): Promise<CustomerEntity[]>;
}
