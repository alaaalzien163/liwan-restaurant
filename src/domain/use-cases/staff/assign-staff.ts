import type { StaffMemberEntity } from "../../entities/staff-member";

export type AssignStaffRequest = {
  staffId: string;
  tableIds: string[];
};

export interface IAssignStaffUseCase {
  execute(request: AssignStaffRequest): Promise<StaffMemberEntity>;
}
