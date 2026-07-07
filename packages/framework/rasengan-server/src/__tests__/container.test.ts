import { describe, it, expect } from 'vitest';
import { Container } from '../di/container.js';
import { Provider } from '../di/provider.js';

describe('Container', () => {
  describe('register with class provider', () => {
    it('registers and resolves a class', () => {
      class Logger extends Provider {
        log(msg: string) {
          return msg;
        }
      }

      const container = new Container();
      container.register(Logger);

      const instance = container.resolve(Logger);
      expect(instance).toBeInstanceOf(Logger);
      expect(instance.log('hello')).toBe('hello');
    });

    it('resolves the same instance (singleton)', () => {
      class Config extends Provider {
        value = 42;
      }

      const container = new Container();
      container.register(Config);

      const a = container.resolve(Config);
      const b = container.resolve(Config);
      expect(a).toBe(b);
    });
  });

  describe('register with ProviderDefinition', () => {
    it('resolves with useClass', () => {
      interface LoggerContract {
        write(msg: string): string;
      }

      class FileLogger implements LoggerContract {
        write(msg: string) {
          return `file: ${msg}`;
        }
      }

      const container = new Container();
      container.register({ provide: 'Logger', useClass: FileLogger });

      const instance = container.resolve(FileLogger);
      expect(instance).toBeInstanceOf(FileLogger);
    });

    it('resolves with useValue', () => {
      const container = new Container();

      const dbConfig = { host: 'localhost', port: 5432 };
      container.register({ provide: 'DbConfig', useValue: dbConfig });

      const resolved = container.resolve('DbConfig' as any);
      expect(resolved).toBe(dbConfig);
    });

    it('resolves with dependency injection', () => {
      const container = new Container();

      class Database extends Provider {
        query(sql: string) {
          return `result: ${sql}`;
        }
      }

      class UserService extends Provider {
        constructor(public database: Database) {
          super();
        }
      }

      container.register(Database);
      container.register(UserService);

      const service = container.resolve(UserService);
      expect(service).toBeInstanceOf(UserService);
      expect(service.database).toBeInstanceOf(Database);
    });

    it('resolves with explicit deps', () => {
      const container = new Container();

      const apiKey = 'sk-123';

      class ApiClient extends Provider {
        constructor(public key: string) {
          super();
        }
      }

      container.register({ provide: ApiClient, useClass: ApiClient, deps: [] });
      container.register({ provide: 'ApiKey', useValue: apiKey });

      const client = container.resolve(ApiClient);
      expect(client).toBeInstanceOf(ApiClient);
    });
  });

  describe('resolve by name', () => {
    it('resolves by matching class name', () => {
      class Mailer extends Provider {
        send() {
          return 'sent';
        }
      }

      const container = new Container();
      container.register(Mailer);

      const instance = container.resolve('mailer' as any);
      expect(instance).toBeInstanceOf(Mailer);
    });
  });

  describe('error handling', () => {
    it('throws when dependency not found', () => {
      const container = new Container();

      expect(() => container.resolve('NonExistent' as any)).toThrow(
        'Cannot resolve dependency'
      );
    });

    it('throws when useValue is used without provide', () => {
      const container = new Container();

      container.register({ provide: 'test', useValue: 42 });
      const val = container.resolve('test' as any);
      expect(val).toBe(42);
    });
  });

  describe('Provider base class', () => {
    it('can be extended', () => {
      class CustomProvider extends Provider {
        data = 'custom';
      }

      const instance = new CustomProvider();
      expect(instance).toBeInstanceOf(Provider);
      expect(instance.data).toBe('custom');
    });
  });

  describe('lifecycle hooks', () => {
    it('calls onInit after compile', async () => {
      let inited = false;

      class InitProvider extends Provider {
        async onInit() {
          inited = true;
        }
      }

      const container = new Container();
      container.register(InitProvider);
      container.resolve(InitProvider);

      await container.initAll();
      expect(inited).toBe(true);
    });

    it('calls onDestroy on shutdown', async () => {
      let destroyed = false;

      class DestroyProvider extends Provider {
        async onDestroy() {
          destroyed = true;
        }
      }

      const container = new Container();
      container.register(DestroyProvider);
      container.resolve(DestroyProvider);

      await container.destroyAll();
      expect(destroyed).toBe(true);
    });

    it('calls init in registration order', async () => {
      const order: string[] = [];

      class A extends Provider {
        async onInit() {
          order.push('A');
        }
      }
      class B extends Provider {
        async onInit() {
          order.push('B');
        }
      }

      const container = new Container();
      container.register(A);
      container.register(B);
      container.resolve(A);
      container.resolve(B);

      await container.initAll();
      expect(order).toEqual(['A', 'B']);
    });

    it('calls destroy in reverse registration order', async () => {
      const order: string[] = [];

      class A extends Provider {
        async onDestroy() {
          order.push('A');
        }
      }
      class B extends Provider {
        async onDestroy() {
          order.push('B');
        }
      }

      const container = new Container();
      container.register(A);
      container.register(B);
      container.resolve(A);
      container.resolve(B);

      await container.destroyAll();
      expect(order).toEqual(['B', 'A']);
    });

    it('does not fail when provider has no lifecycle methods', async () => {
      class NoopProvider extends Provider {
        data = 42;
      }

      const container = new Container();
      container.register(NoopProvider);
      container.resolve(NoopProvider);

      await expect(container.initAll()).resolves.toBeUndefined();
      await expect(container.destroyAll()).resolves.toBeUndefined();
    });

    it('does not track useValue providers', async () => {
      let initCalled = false;
      const c = new Container();

      c.register({
        provide: 'plain',
        useValue: {
          onInit: () => {
            initCalled = true;
          },
        },
      });
      c.resolve('plain' as any);

      await c.initAll();
      expect(initCalled).toBe(false);
    });
  });
});
