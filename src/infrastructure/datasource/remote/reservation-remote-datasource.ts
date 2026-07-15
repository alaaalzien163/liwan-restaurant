import type { ReservationEntity } from "@/domain/entities/reservation";
import type {
  ReservationFilters,
  CreateReservationDto,
  UpdateReservationDto,
} from "@/domain/repositories/reservation-repository";
import type { PaginatedResponse } from "@/core/types";

export interface IReservationRemoteDataSource {
  fetchReservations(
    filters?: ReservationFilters,
  ): Promise<PaginatedResponse<ReservationEntity>>;
  fetchReservationById(id: string): Promise<ReservationEntity>;
  fetchReservationsByDate(date: string): Promise<ReservationEntity[]>;
  fetchReservationsByCustomer(customerId: string): Promise<ReservationEntity[]>;
  fetchReservationsByTable(tableId: string): Promise<ReservationEntity[]>;
  fetchTodayReservations(): Promise<ReservationEntity[]>;
  fetchUpcomingReservations(): Promise<ReservationEntity[]>;
  createReservation(data: CreateReservationDto): Promise<ReservationEntity>;
  updateReservation(
    id: string,
    data: UpdateReservationDto,
  ): Promise<ReservationEntity>;
  cancelReservation(id: string, reason?: string): Promise<ReservationEntity>;
  confirmReservation(id: string): Promise<ReservationEntity>;
  markAsNoShow(id: string): Promise<ReservationEntity>;
  fetchAvailableTimeSlots(date: string, tableId: string): Promise<string[]>;
}
