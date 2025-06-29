type EncryptFn = (text: string) => string;
type DecryptFn = (text: string) => string;
type onErrorFn = () => void;

export class Session {
  constructor(
    private readonly encrypt: EncryptFn,
    private readonly decrypt: DecryptFn,
    private readonly onError?: onErrorFn
  ) {}

  set(
    key: string,
    value: Record<string, string> | null | string | number | unknown
  ): void {
    if (value) {
      const data = JSON.stringify(value);
      sessionStorage.setItem(key, this.encrypt(data));
    } else {
      sessionStorage.removeItem(key);
    }
  }

  get<T = unknown>(key: string): T | null {
    const value = sessionStorage.getItem(key);

    try {
      return value ? JSON.parse(this.decrypt(value)) : null;
    } catch {
      this.clear();

      this.onError?.();
      return null;
    }
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
