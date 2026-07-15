import type {
  TableEntity,
  TableStatus,
  TableZone,
} from "@/domain/entities/table";
import type {
  TableFilters,
  CreateTableDto,
  UpdateTableDto,
} from "@/domain/repositories/table-repository";

export interface ITableRemoteDataSource {
  fetchTables(filters?: TableFilters): Promise<TableEntity[]>;
  fetchTableById(id: string): Promise<TableEntity>;
  fetchTableByNumber(tableNumber: string): Promise<TableEntity>;
  fetchAvailableTables(
    filters?: Omit<TableFilters, "status">,
  ): Promise<TableEntity[]>;
  fetchTablesByZone(zone: TableZone): Promise<TableEntity[]>;
  createTable(data: CreateTableDto): Promise<TableEntity>;
  updateTable(id: string, data: UpdateTableDto): Promise<TableEntity>;
  deleteTable(id: string): Promise<void>;
  updateTableStatus(id: string, status: TableStatus): Promise<TableEntity>;
  assignTable(tableId: string, serverId: string): Promise<TableEntity>;
  releaseTable(tableId: string): Promise<TableEntity>;
}
