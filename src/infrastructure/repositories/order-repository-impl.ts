import type { IOrderRepository } from "@/domain/repositories/order-repository";
import type { IOrderRemoteDataSource } from "../datasource/remote/order-remote-datasource";
import type { IOrderLocalDataSource } from "../datasource/local/order-local-datasource";

export interface IOrderRepositoryDependencies {
  remoteDataSource: IOrderRemoteDataSource;
  localDataSource: IOrderLocalDataSource;
}

export interface OrderRepositoryImpl extends IOrderRepository {
  setDependencies(deps: IOrderRepositoryDependencies): void;
}
