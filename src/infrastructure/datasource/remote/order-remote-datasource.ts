import type { OrderEntity, OrderItemStatus } from "@/domain/entities/order";
import type {
  OrderFilters,
  CreateOrderDto,
  UpdateOrderStatusDto,
  CreateOrderItemDto,
} from "@/domain/repositories/order-repository";
import type { PaginatedResponse } from "@/core/types";

export interface IOrderRemoteDataSource {
  fetchOrders(filters?: OrderFilters): Promise<PaginatedResponse<OrderEntity>>;
  fetchOrderById(id: string): Promise<OrderEntity>;
  fetchOrderByNumber(orderNumber: string): Promise<OrderEntity>;
  fetchActiveOrders(): Promise<OrderEntity[]>;
  createOrder(data: CreateOrderDto): Promise<OrderEntity>;
  updateOrderStatus(
    id: string,
    data: UpdateOrderStatusDto,
  ): Promise<OrderEntity>;
  updateOrderItemStatus(
    orderId: string,
    itemId: string,
    status: OrderItemStatus,
  ): Promise<OrderEntity>;
  cancelOrder(id: string, reason?: string): Promise<OrderEntity>;
  addItemsToOrder(
    orderId: string,
    items: CreateOrderItemDto[],
  ): Promise<OrderEntity>;
  removeItemFromOrder(orderId: string, itemId: string): Promise<OrderEntity>;
  fetchTodayOrders(): Promise<OrderEntity[]>;
  fetchOrdersByTable(tableId: string): Promise<OrderEntity[]>;
  fetchOrdersByServer(serverId: string): Promise<OrderEntity[]>;
}
