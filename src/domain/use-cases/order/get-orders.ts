import type { OrderEntity } from "../../entities/order";
import type { OrderFilters } from "../../repositories/order-repository";
import type { PaginatedResponse } from "@/core/types";

export type GetOrdersRequest = OrderFilters;
export type GetOrdersResponse = PaginatedResponse<OrderEntity>;

export interface IGetOrdersUseCase {
  execute(filters?: GetOrdersRequest): Promise<GetOrdersResponse>;
}
