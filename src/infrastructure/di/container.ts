import type { DiToken } from "./tokens";

export interface DiContainer {
  register<T>(token: DiToken, instance: T): void;
  resolve<T>(token: DiToken): T;
  has(token: DiToken): boolean;
  clear(): void;
}

export function createDiContainer(): DiContainer {
  const registry = new Map<symbol, unknown>();

  return {
    register<T>(token: DiToken, instance: T): void {
      registry.set(token, instance);
    },

    resolve<T>(token: DiToken): T {
      const instance = registry.get(token);
      if (!instance) {
        throw new Error(`No registration found for token: ${token.toString()}`);
      }
      return instance as T;
    },

    has(token: DiToken): boolean {
      return registry.has(token);
    },

    clear(): void {
      registry.clear();
    },
  };
}

export const diContainer = createDiContainer();
