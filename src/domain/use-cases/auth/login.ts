import type {
  AuthSession,
  LoginRequest,
  PinLoginRequest,
} from "../../repositories/auth-repository";

export interface ILoginUseCase {
  execute(request: LoginRequest): Promise<AuthSession>;
}

export interface ILoginWithPinUseCase {
  execute(request: PinLoginRequest): Promise<AuthSession>;
}
