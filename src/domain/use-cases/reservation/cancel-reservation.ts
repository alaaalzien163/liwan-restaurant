import type { ReservationEntity } from "../../entities/reservation";

export interface ICancelReservationUseCase {
  execute(id: string, reason?: string): Promise<ReservationEntity>;
}
