import type { StaffMemberEntity } from "../../entities/staff-member";
import type { StaffFilters } from "../../repositories/staff-repository";
import type { PaginatedResponse } from "@/core/types";

export type GetStaffMembersRequest = StaffFilters;
export type GetStaffMembersResponse = PaginatedResponse<StaffMemberEntity>;

export interface IGetStaffMembersUseCase {
  execute(filters?: GetStaffMembersRequest): Promise<GetStaffMembersResponse>;
}
