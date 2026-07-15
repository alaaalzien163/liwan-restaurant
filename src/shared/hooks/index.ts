export interface UseClipboardReturn {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
  error: Error | null;
}

export interface UseCountdownReturn {
  count: number;
  isRunning: boolean;
  start: (seconds: number) => void;
  stop: () => void;
  reset: () => void;
}

export interface UseNetworkStatusReturn {
  isOnline: boolean;
  wasOffline: boolean;
}

export interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
}

export interface UseKeyboardShortcutOptions {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: () => void;
  enabled?: boolean;
}

export interface UseIntervalOptions {
  callback: () => void;
  delay: number | null;
  enabled?: boolean;
}

export interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onIntersect?: () => void;
}
