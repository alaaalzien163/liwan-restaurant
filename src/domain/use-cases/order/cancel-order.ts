import type { OrderEntity } from "../../entities/order";

export interface ICancelOrderUseCase {
  execute(id: string, reason?: string): Promise<OrderEntity>;
}
