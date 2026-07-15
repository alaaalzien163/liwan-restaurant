import type { OrderEntity } from "../../entities/order";
import type { CreateOrderItemDto } from "../../repositories/order-repository";

export type AddItemsToOrderRequest = {
  orderId: string;
  items: CreateOrderItemDto[];
};

export interface IAddItemsToOrderUseCase {
  execute(request: AddItemsToOrderRequest): Promise<OrderEntity>;
}
