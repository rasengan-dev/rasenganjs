type ErrorSource = 'route' | 'react' | 'vite' | 'global';

type ErrorEntry = {
  id: number;
  error: Error;
  source: ErrorSource;
  timestamp: number;
  componentStack?: string;
};

type Listener = () => void;

class ErrorStore {
  private errors: ErrorEntry[] = [];
  private listeners: Set<Listener> = new Set();
  private nextId = 1;
  private minimized = false;

  addError(
    error: Error,
    source: ErrorSource = 'global',
    componentStack?: string
  ): void {
    this.errors = [
      ...this.errors,
      {
        id: this.nextId++,
        error,
        source,
        timestamp: Date.now(),
        componentStack,
      },
    ];
    this.notify();
  }

  clearAll(): void {
    this.errors = [];
    this.minimized = false;
    this.notify();
  }

  toggleMinimize(): void {
    this.minimized = !this.minimized;
    this.notify();
  }

  getErrors(): ErrorEntry[] {
    return this.errors;
  }

  isMinimized(): boolean {
    return this.minimized;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn());
  }
}

export const errorStore = new ErrorStore();
export type { ErrorEntry, ErrorSource };
