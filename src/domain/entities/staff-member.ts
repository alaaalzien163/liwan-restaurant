export type StaffRole =
  | "admin"
  | "manager"
  | "chef"
  | "line_cook"
  | "waiter"
  | "host"
  | "cashier"
  | "bartender"
  | "cleaner"
  | "delivery";

export type StaffStatus = "active" | "on_leave" | "suspended" | "terminated";
export type ShiftType = "morning" | "afternoon" | "evening" | "night" | "split";

export interface StaffSchedule {
  id: string;
  staffId: string;
  dayOfWeek: number;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface StaffAttendance {
  id: string;
  staffId: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  breakStart?: string;
  breakEnd?: string;
  totalHours?: number;
  isAbsent: boolean;
  isLate: boolean;
  notes?: string;
}

export interface StaffMemberEntity {
  id: string;
  userId: string;
  employeeCode: string;
  name: string;
  nameAr?: string;
  email: string;
  phone: string;
  role: StaffRole;
  status: StaffStatus;
  pinCode: string;
  hourlyRate: number;
  salary: number;
  currency: string;
  nationalId?: string;
  iqamaNumber?: string;
  dateOfBirth?: string;
  hireDate: string;
  terminationDate?: string;
  address?: string;
  city?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  qualifications?: string[];
  certificates?: string[];
  profileImageUrl?: string;
  isFullTime: boolean;
  schedule?: StaffSchedule[];
  attendance?: StaffAttendance[];
  assignedTables?: string[];
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}
