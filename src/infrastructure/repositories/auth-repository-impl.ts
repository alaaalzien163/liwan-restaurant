import type { IAuthRepository } from "@/domain/repositories/auth-repository";
import type { IAuthRemoteDataSource } from "../datasource/remote/auth-remote-datasource";
import type { IAuthLocalDataSource } from "../datasource/local/auth-local-datasource";

export interface IAuthRepositoryDependencies {
  remoteDataSource: IAuthRemoteDataSource;
  localDataSource: IAuthLocalDataSource;
}

export interface AuthRepositoryImpl extends IAuthRepository {
  setDependencies(deps: IAuthRepositoryDependencies): void;
}
