import type { ChangePasswordRequest } from "../../repositories/auth-repository";

export interface IChangePasswordUseCase {
  execute(request: ChangePasswordRequest): Promise<void>;
}
