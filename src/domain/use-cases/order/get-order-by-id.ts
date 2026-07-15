import type { OrderEntity } from "../../entities/order";

export interface IGetOrderByIdUseCase {
  execute(id: string): Promise<OrderEntity>;
}
