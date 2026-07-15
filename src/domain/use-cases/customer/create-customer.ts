import type { CustomerEntity } from "../../entities/customer";
import type { CreateCustomerDto } from "../../repositories/customer-repository";

export type CreateCustomerRequest = CreateCustomerDto;
export type CreateCustomerResponse = CustomerEntity;

export interface ICreateCustomerUseCase {
  execute(data: CreateCustomerRequest): Promise<CreateCustomerResponse>;
}
