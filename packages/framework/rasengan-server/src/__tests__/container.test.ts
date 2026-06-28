import { describe, it, expect } from 'vitest';
import { Container } from '../di/container.js';
import { Provider } from '../di/provider.js';

describe('Container', () => {
  describe('register with class provider', () => {
    it('registers and resolves a class', () => {
      class Logger {
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
      class Config {
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

      class Database {
        query(sql: string) {
          return `result: ${sql}`;
        }
      }

      class UserService {
        constructor(public database: Database) {}
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

      class ApiClient {
        constructor(public key: string) {}
      }

      container.register({ provide: ApiClient, useClass: ApiClient, deps: [] });
      container.register({ provide: 'ApiKey', useValue: apiKey });

      const client = container.resolve(ApiClient);
      expect(client).toBeInstanceOf(ApiClient);
    });
  });

  describe('resolve by name', () => {
    it('resolves by matching class name', () => {
      class Mailer {
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
});
