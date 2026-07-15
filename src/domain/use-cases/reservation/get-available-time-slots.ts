export interface IGetAvailableTimeSlotsUseCase {
  execute(date: string, tableId: string): Promise<string[]>;
}
