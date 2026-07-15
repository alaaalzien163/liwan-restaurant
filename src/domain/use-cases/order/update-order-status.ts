import type { OrderEntity } from "../../entities/order";
import type { UpdateOrderStatusDto } from "../../repositories/order-repository";

export type UpdateOrderStatusRequest = {
  id: string;
  data: UpdateOrderStatusDto;
};

export type UpdateOrderStatusResponse = OrderEntity;

export interface IUpdateOrderStatusUseCase {
  execute(
    request: UpdateOrderStatusRequest,
  ): Promise<UpdateOrderStatusResponse>;
}
