import type { CustomerEntity } from "./customer";
import type { TableEntity } from "./table";

export type ReservationStatus =
  "pending" | "confirmed" | "seated" | "completed" | "cancelled" | "no_show";

export interface ReservationEntity {
  id: string;
  customerId: string;
  customer: CustomerEntity;
  tableId?: string;
  table?: TableEntity;
  guestCount: number;
  date: string;
  time: string;
  duration: number;
  status: ReservationStatus;
  notes?: string;
  specialRequests?: string;
  occasion?: string;
  contactPhone: string;
  contactEmail?: string;
  assignedStaffId?: string;
  confirmationCode: string;
  isWalkIn: boolean;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  seatedAt?: string;
  completedAt?: string;
}
