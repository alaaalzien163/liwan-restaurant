import type { TableEntity, TableStatus } from "../../entities/table";

export type UpdateTableStatusRequest = {
  id: string;
  status: TableStatus;
};

export interface IUpdateTableStatusUseCase {
  execute(request: UpdateTableStatusRequest): Promise<TableEntity>;
}
