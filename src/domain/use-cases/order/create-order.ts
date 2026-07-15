import type { OrderEntity } from "../../entities/order";
import type { CreateOrderDto } from "../../repositories/order-repository";

export type CreateOrderRequest = CreateOrderDto;
export type CreateOrderResponse = OrderEntity;

export interface ICreateOrderUseCase {
  execute(data: CreateOrderRequest): Promise<CreateOrderResponse>;
}
