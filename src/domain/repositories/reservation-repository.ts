import type {
  ReservationEntity,
  ReservationStatus,
} from "../entities/reservation";
import type { PaginatedResponse, PaginationParams } from "@/core/types";

export interface ReservationFilters extends PaginationParams {
  search?: string;
  status?: ReservationStatus;
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  tableId?: string;
  customerId?: string;
  isWalkIn?: boolean;
}

export interface CreateReservationDto {
  customerId: string;
  tableId?: string;
  guestCount: number;
  date: string;
  time: string;
  duration?: number;
  notes?: string;
  specialRequests?: string;
  occasion?: string;
  contactPhone: string;
  contactEmail?: string;
  assignedStaffId?: string;
  isWalkIn?: boolean;
}

export interface UpdateReservationDto extends Partial<CreateReservationDto> {
  status?: ReservationStatus;
  cancellationReason?: string;
}

export interface IReservationRepository {
  getReservations(
    filters?: ReservationFilters,
  ): Promise<PaginatedResponse<ReservationEntity>>;
  getReservationById(id: string): Promise<ReservationEntity>;
  getReservationsByDate(date: string): Promise<ReservationEntity[]>;
  getReservationsByCustomer(customerId: string): Promise<ReservationEntity[]>;
  getReservationsByTable(tableId: string): Promise<ReservationEntity[]>;
  getTodayReservations(): Promise<ReservationEntity[]>;
  getUpcomingReservations(): Promise<ReservationEntity[]>;
  createReservation(data: CreateReservationDto): Promise<ReservationEntity>;
  updateReservation(
    id: string,
    data: UpdateReservationDto,
  ): Promise<ReservationEntity>;
  cancelReservation(id: string, reason?: string): Promise<ReservationEntity>;
  confirmReservation(id: string): Promise<ReservationEntity>;
  markAsNoShow(id: string): Promise<ReservationEntity>;
  getAvailableTimeSlots(date: string, tableId: string): Promise<string[]>;
}
