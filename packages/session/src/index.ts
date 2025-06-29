type EncryptFn = (text: string) => string;
type DecryptFn = (text: string) => string;
type onErrorFn = () => void;

export class Storage {
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
      localStorage.setItem(key, this.encrypt(data));
    } else {
      localStorage.removeItem(key);
    }
  }

  get<T = unknown>(key: string): T | null {
    const value = localStorage.getItem(key);

    try {
      return value ? JSON.parse(this.decrypt(value)) : null;
    } catch {
      this.clear();

      this.onError?.();
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
