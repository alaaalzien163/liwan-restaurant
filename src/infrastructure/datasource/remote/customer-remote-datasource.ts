import type { CustomerEntity } from "@/domain/entities/customer";
import type {
  CustomerFilters,
  CreateCustomerDto,
  UpdateCustomerDto,
} from "@/domain/repositories/customer-repository";
import type { PaginatedResponse } from "@/core/types";

export interface ICustomerRemoteDataSource {
  fetchCustomers(
    filters?: CustomerFilters,
  ): Promise<PaginatedResponse<CustomerEntity>>;
  fetchCustomerById(id: string): Promise<CustomerEntity>;
  fetchCustomerByPhone(phone: string): Promise<CustomerEntity | null>;
  searchCustomers(query: string): Promise<CustomerEntity[]>;
  createCustomer(data: CreateCustomerDto): Promise<CustomerEntity>;
  updateCustomer(id: string, data: UpdateCustomerDto): Promise<CustomerEntity>;
  deleteCustomer(id: string): Promise<void>;
  addFavoriteItem(customerId: string, menuItemId: string): Promise<void>;
  removeFavoriteItem(customerId: string, menuItemId: string): Promise<void>;
  fetchVipCustomers(): Promise<CustomerEntity[]>;
}
