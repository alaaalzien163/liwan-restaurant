import type { CustomerEntity } from "../../entities/customer";

export interface ISearchCustomersUseCase {
  execute(query: string): Promise<CustomerEntity[]>;
}
