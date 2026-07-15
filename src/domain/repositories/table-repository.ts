import type { TableEntity, TableStatus, TableZone } from "../entities/table";

export interface TableFilters {
  status?: TableStatus;
  zone?: TableZone;
  capacity?: number;
  minCapacity?: number;
  isSmoking?: boolean;
  isAccessible?: boolean;
  isActive?: boolean;
}

export interface CreateTableDto {
  tableNumber: string;
  capacity: number;
  minCapacity?: number;
  zone: TableZone;
  location?: string;
  isSmoking?: boolean;
  isAccessible?: boolean;
  notes?: string;
}

export interface UpdateTableDto extends Partial<CreateTableDto> {
  status?: TableStatus;
  isActive?: boolean;
}

export interface ITableRepository {
  getTables(filters?: TableFilters): Promise<TableEntity[]>;
  getTableById(id: string): Promise<TableEntity>;
  getTableByNumber(tableNumber: string): Promise<TableEntity>;
  getAvailableTables(
    filters?: Omit<TableFilters, "status">,
  ): Promise<TableEntity[]>;
  getTablesByZone(zone: TableZone): Promise<TableEntity[]>;
  createTable(data: CreateTableDto): Promise<TableEntity>;
  updateTable(id: string, data: UpdateTableDto): Promise<TableEntity>;
  deleteTable(id: string): Promise<void>;
  updateTableStatus(id: string, status: TableStatus): Promise<TableEntity>;
  assignTable(tableId: string, serverId: string): Promise<TableEntity>;
  releaseTable(tableId: string): Promise<TableEntity>;
}
