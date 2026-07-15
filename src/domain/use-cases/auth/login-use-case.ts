import type {
  IAuthRepository,
  LoginRequest,
  AuthSession,
} from "../../repositories/auth-repository";
import type { ILoginUseCase } from "./login";

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly repository: IAuthRepository) {}

  async execute(request: LoginRequest): Promise<AuthSession> {
    return this.repository.login(request);
  }
}
