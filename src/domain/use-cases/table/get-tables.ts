import type { TableEntity } from "../../entities/table";
import type { TableFilters } from "../../repositories/table-repository";

export type GetTablesRequest = TableFilters;
export type GetTablesResponse = TableEntity[];

export interface IGetTablesUseCase {
  execute(filters?: GetTablesRequest): Promise<GetTablesResponse>;
}
