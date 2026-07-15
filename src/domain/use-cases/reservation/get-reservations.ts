import type { ReservationEntity } from "../../entities/reservation";
import type { ReservationFilters } from "../../repositories/reservation-repository";
import type { PaginatedResponse } from "@/core/types";

export type GetReservationsRequest = ReservationFilters;
export type GetReservationsResponse = PaginatedResponse<ReservationEntity>;

export interface IGetReservationsUseCase {
  execute(filters?: GetReservationsRequest): Promise<GetReservationsResponse>;
}
