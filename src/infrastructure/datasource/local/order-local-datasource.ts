import type { OrderEntity } from "@/domain/entities/order";

export interface IOrderLocalDataSource {
  getPendingOrders(): Promise<OrderEntity[]>;
  cacheOrders(orders: OrderEntity[]): Promise<void>;
  addOrder(order: OrderEntity): Promise<void>;
  updateOrder(order: OrderEntity): Promise<void>;
  removeOrder(orderId: string): Promise<void>;
  clearCache(): Promise<void>;
}
