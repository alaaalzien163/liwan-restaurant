import type {
  StaffMemberEntity,
  StaffRole,
  StaffStatus,
  StaffSchedule,
  StaffAttendance,
} from "../entities/staff-member";
import type { PaginatedResponse, PaginationParams } from "@/core/types";

export interface StaffFilters extends PaginationParams {
  search?: string;
  role?: StaffRole;
  status?: StaffStatus;
  isFullTime?: boolean;
}

export interface CreateStaffDto {
  name: string;
  nameAr?: string;
  email: string;
  phone: string;
  role: StaffRole;
  pinCode: string;
  hourlyRate: number;
  salary: number;
  nationalId?: string;
  iqamaNumber?: string;
  dateOfBirth?: string;
  hireDate: string;
  address?: string;
  city?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  isFullTime?: boolean;
  permissions?: string[];
}

export interface UpdateStaffDto extends Partial<CreateStaffDto> {
  status?: StaffStatus;
}

export interface IStaffRepository {
  getStaffMembers(
    filters?: StaffFilters,
  ): Promise<PaginatedResponse<StaffMemberEntity>>;
  getStaffMemberById(id: string): Promise<StaffMemberEntity>;
  getStaffByRole(role: StaffRole): Promise<StaffMemberEntity[]>;
  getAvailableStaff(): Promise<StaffMemberEntity[]>;
  createStaffMember(data: CreateStaffDto): Promise<StaffMemberEntity>;
  updateStaffMember(
    id: string,
    data: UpdateStaffDto,
  ): Promise<StaffMemberEntity>;
  deleteStaffMember(id: string): Promise<void>;
  getStaffSchedule(staffId: string): Promise<StaffSchedule[]>;
  updateStaffSchedule(
    staffId: string,
    schedule: StaffSchedule[],
  ): Promise<StaffSchedule[]>;
  getStaffAttendance(
    staffId: string,
    dateFrom: string,
    dateTo: string,
  ): Promise<StaffAttendance[]>;
  clockIn(staffId: string): Promise<StaffAttendance>;
  clockOut(staffId: string): Promise<StaffAttendance>;
  getCurrentStaffOnDuty(): Promise<StaffMemberEntity[]>;
}
