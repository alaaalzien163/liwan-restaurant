export interface IDeleteMenuItemUseCase {
  execute(id: string): Promise<void>;
}
