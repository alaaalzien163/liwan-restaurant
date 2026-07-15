import type { StaffAttendance } from "../../entities/staff-member";

export interface IClockInUseCase {
  execute(staffId: string): Promise<StaffAttendance>;
}

export interface IClockOutUseCase {
  execute(staffId: string): Promise<StaffAttendance>;
}
