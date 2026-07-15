import type { CustomerEntity } from "../../entities/customer";
import type { CustomerFilters } from "../../repositories/customer-repository";
import type { PaginatedResponse } from "@/core/types";

export type GetCustomersRequest = CustomerFilters;
export type GetCustomersResponse = PaginatedResponse<CustomerEntity>;

export interface IGetCustomersUseCase {
  execute(filters?: GetCustomersRequest): Promise<GetCustomersResponse>;
}
