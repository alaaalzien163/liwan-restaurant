import type { ReservationEntity } from "../../entities/reservation";
import type { CreateReservationDto } from "../../repositories/reservation-repository";

export type CreateReservationRequest = CreateReservationDto;
export type CreateReservationResponse = ReservationEntity;

export interface ICreateReservationUseCase {
  execute(data: CreateReservationRequest): Promise<CreateReservationResponse>;
}
