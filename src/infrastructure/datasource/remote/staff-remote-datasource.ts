import type {
  StaffMemberEntity,
  StaffRole,
  StaffSchedule,
  StaffAttendance,
} from "@/domain/entities/staff-member";
import type {
  StaffFilters,
  CreateStaffDto,
  UpdateStaffDto,
} from "@/domain/repositories/staff-repository";
import type { PaginatedResponse } from "@/core/types";

export interface IStaffRemoteDataSource {
  fetchStaffMembers(
    filters?: StaffFilters,
  ): Promise<PaginatedResponse<StaffMemberEntity>>;
  fetchStaffMemberById(id: string): Promise<StaffMemberEntity>;
  fetchStaffByRole(role: StaffRole): Promise<StaffMemberEntity[]>;
  fetchAvailableStaff(): Promise<StaffMemberEntity[]>;
  createStaffMember(data: CreateStaffDto): Promise<StaffMemberEntity>;
  updateStaffMember(
    id: string,
    data: UpdateStaffDto,
  ): Promise<StaffMemberEntity>;
  deleteStaffMember(id: string): Promise<void>;
  fetchStaffSchedule(staffId: string): Promise<StaffSchedule[]>;
  updateStaffSchedule(
    staffId: string,
    schedule: StaffSchedule[],
  ): Promise<StaffSchedule[]>;
  fetchStaffAttendance(
    staffId: string,
    dateFrom: string,
    dateTo: string,
  ): Promise<StaffAttendance[]>;
  clockIn(staffId: string): Promise<StaffAttendance>;
  clockOut(staffId: string): Promise<StaffAttendance>;
  fetchCurrentStaffOnDuty(): Promise<StaffMemberEntity[]>;
}
