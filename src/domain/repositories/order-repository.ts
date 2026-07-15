import type {
  OrderEntity,
  OrderStatus,
  OrderType,
  PaymentStatus,
  OrderItemStatus,
} from "../entities/order";
import type { PaginatedResponse, PaginationParams } from "@/core/types";

export interface OrderFilters extends PaginationParams {
  search?: string;
  status?: OrderStatus;
  type?: OrderType;
  paymentStatus?: PaymentStatus;
  tableId?: string;
  serverId?: string;
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateOrderItemDto {
  menuItemId: string;
  quantity: number;
  specialInstructions?: string;
  modifierSelections?: Array<{
    modifierId: string;
    optionId: string;
    quantity?: number;
  }>;
}

export interface CreateOrderDto {
  type: OrderType;
  tableId?: string;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  serverId?: string;
  notes?: string;
  specialRequests?: string;
  guestCount?: number;
  items: CreateOrderItemDto[];
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  reason?: string;
}

export interface IOrderRepository {
  getOrders(filters?: OrderFilters): Promise<PaginatedResponse<OrderEntity>>;
  getOrderById(id: string): Promise<OrderEntity>;
  getOrderByNumber(orderNumber: string): Promise<OrderEntity>;
  getActiveOrders(): Promise<OrderEntity[]>;
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
  getTodayOrders(): Promise<OrderEntity[]>;
  getOrdersByTable(tableId: string): Promise<OrderEntity[]>;
  getOrdersByServer(serverId: string): Promise<OrderEntity[]>;
}
