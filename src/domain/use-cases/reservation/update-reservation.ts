import type { ReservationEntity } from "../../entities/reservation";
import type { UpdateReservationDto } from "../../repositories/reservation-repository";

export type UpdateReservationRequest = {
  id: string;
  data: UpdateReservationDto;
};

export type UpdateReservationResponse = ReservationEntity;

export interface IUpdateReservationUseCase {
  execute(
    request: UpdateReservationRequest,
  ): Promise<UpdateReservationResponse>;
}
