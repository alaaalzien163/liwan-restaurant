import type { AuthUser } from "../../repositories/auth-repository";

export interface IGetCurrentUserUseCase {
  execute(): Promise<AuthUser>;
}
