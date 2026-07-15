import type { IMenuRepository } from "@/domain/repositories/menu-repository";
import type { IMenuRemoteDataSource } from "../datasource/remote/menu-remote-datasource";
import type { IMenuLocalDataSource } from "../datasource/local/menu-local-datasource";

export interface IMenuRepositoryDependencies {
  remoteDataSource: IMenuRemoteDataSource;
  localDataSource: IMenuLocalDataSource;
}

export interface MenuRepositoryImpl extends IMenuRepository {
  setDependencies(deps: IMenuRepositoryDependencies): void;
}
