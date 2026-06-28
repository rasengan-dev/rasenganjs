import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ServerApp } from '../server/app.js';
import type {
  SchemaAdapter,
  ValidationError,
  SchemaDefinition,
} from '@rasenganjs/validation';

// ── Mock adapter that validates synchronously ───────────────────
const mockAdapter: SchemaAdapter = {
  parse(schema: any, data: unknown) {
    // schema is a simple function that returns null on success
    // or an array of ValidationError[] on failure
    const result = schema(data);
    if (result === null) {
      return { success: true as const, data };
    }
    return { success: false as const, errors: result as ValidationError[] };
  },
  infer() {
    return undefined;
  },
};

function createSuccessSchema() {
  return (_data: unknown) => null;
}

function createFailureSchema(expectedErrors?: ValidationError[]) {
  return (_data: unknown) =>
    expectedErrors ?? [{ path: ['body'], message: 'Validation failed' }];
}

// ── Helpers ─────────────────────────────────────────────────────
function mockRequest(url: string, body?: unknown): Request {
  return new Request(url, {
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    headers: body ? { 'content-type': 'application/json' } : undefined,
  });
}

describe('ServerApp — validation integration', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('configureValidation()', () => {
    it('accepts custom adapter and error handler', async () => {
      const { Controller } = await import('../controller/index.js');

      class TestController extends Controller {
        routes(router: any) {
          router.get('/test', (_ctx: any) => new Response('ok'), {
            params: createSuccessSchema(),
          } as any);
        }
      }

      const app = new ServerApp();
      app.configureValidation({
        adapter: mockAdapter,
        onError: (errors) =>
          new Response(JSON.stringify({ custom: true, errors }), {
            status: 422,
          }),
      });
      app.registerModule({ controllers: [TestController] });
      const runtime = app.compile();

      const response = await runtime.fetch(
        new Request('http://localhost/test')
      );
      expect(response.status).toBe(200);
    });
  });

  describe('per-route schema (last argument)', () => {
    it('passes validation and calls handler on success', async () => {
      const order: string[] = [];

      const { Controller } = await import('../controller/index.js');

      class TestController extends Controller {
        routes(router: any) {
          router.post(
            '/users',
            (ctx: any) => {
              order.push('handler');
              return new Response('created');
            },
            { body: createSuccessSchema() } as any
          );
        }
      }

      const app = new ServerApp();
      app.configureValidation({ adapter: mockAdapter });
      app.registerModule({ controllers: [TestController] });
      const runtime = app.compile();

      const response = await runtime.fetch(
        mockRequest('http://localhost/users', { name: 'Alice' })
      );
      expect(response.status).toBe(200);
      expect(await response.text()).toBe('created');
      expect(order).toEqual(['handler']);
    });

    it('short-circuits with 400 on validation failure', async () => {
      const handlerFn = vi.fn();

      const { Controller } = await import('../controller/index.js');

      class TestController extends Controller {
        routes(router: any) {
          router.post(
            '/users',
            (ctx: any) => {
              handlerFn();
              return new Response('created');
            },
            {
              body: createFailureSchema([
                { path: ['name'], message: 'Name is required' },
              ]),
            } as any
          );
        }
      }

      const app = new ServerApp();
      app.configureValidation({ adapter: mockAdapter });
      app.registerModule({ controllers: [TestController] });
      const runtime = app.compile();

      const response = await runtime.fetch(
        mockRequest('http://localhost/users', {})
      );
      expect(response.status).toBe(400);
      expect(handlerFn).not.toHaveBeenCalled();

      const json = await response.json();
      expect(json.errors).toBeDefined();
      expect(json.errors[0].message).toBe('Name is required');
    });

    it('runs after route-level middleware', async () => {
      const order: string[] = [];

      const routeMw = async (_ctx: any, next: any) => {
        order.push('route');
        return next();
      };

      const { Controller } = await import('../controller/index.js');

      class TestController extends Controller {
        routes(router: any) {
          router.get(
            '/test',
            routeMw,
            (ctx: any) => {
              order.push('handler');
              return new Response('ok');
            },
            { params: createSuccessSchema() } as any
          );
        }
      }

      const app = new ServerApp();
      app.configureValidation({ adapter: mockAdapter });
      app.registerModule({ controllers: [TestController] });
      const runtime = app.compile();

      const response = await runtime.fetch(
        new Request('http://localhost/test')
      );
      expect(response.status).toBe(200);
      expect(order).toEqual(['route', 'handler']);
    });

    it('supports per-route onError override', async () => {
      const { Controller } = await import('../controller/index.js');

      class TestController extends Controller {
        routes(router: any) {
          router.post('/users', (ctx: any) => new Response('created'), {
            body: createFailureSchema(),
            onError: (errors: ValidationError[]) =>
              new Response(
                JSON.stringify({ override: true, count: errors.length }),
                {
                  status: 422,
                }
              ),
          } as any);
        }
      }

      const app = new ServerApp();
      app.configureValidation({ adapter: mockAdapter });
      app.registerModule({ controllers: [TestController] });
      const runtime = app.compile();

      const response = await runtime.fetch(
        mockRequest('http://localhost/users', {})
      );
      expect(response.status).toBe(422);

      const json = await response.json();
      expect(json.override).toBe(true);
    });
  });

  describe('controller-level schemas', () => {
    it('matches schemas by handler method name', async () => {
      const order: string[] = [];

      const { Controller } = await import('../controller/index.js');

      class UsersController extends Controller {
        schemas: Record<string, any> = {
          list: { params: createSuccessSchema() as any },
          create: { body: createSuccessSchema() as any },
        };

        routes(router: any) {
          router.get('/users', (ctx: any) => {
            order.push('list');
            return new Response('users');
          });
          router.post('/users', (ctx: any) => {
            order.push('create');
            return new Response('created');
          });
        }

        // These named methods match the schemas keys
        list(ctx: any) {
          return new Response('users');
        }
        create(ctx: any) {
          return new Response('created');
        }
      }

      const app = new ServerApp();
      app.configureValidation({ adapter: mockAdapter });
      app.registerModule({ controllers: [UsersController] });
      const runtime = app.compile();

      const res1 = await runtime.fetch(new Request('http://localhost/users'));
      expect(res1.status).toBe(200);

      const res2 = await runtime.fetch(
        mockRequest('http://localhost/users', { name: 'Alice' })
      );
      expect(res2.status).toBe(200);
    });

    it('controller-level schema is overridden by per-route schema', async () => {
      const { Controller } = await import('../controller/index.js');

      class UsersController extends Controller {
        schemas: Record<string, any> = {
          create: { body: createSuccessSchema() },
        };

        routes(router: any) {
          router.post('/users', (ctx: any) => new Response('created'), {
            body: createFailureSchema([
              { path: ['x'], message: 'Per-route wins' },
            ]),
          } as any);
        }
      }

      const app = new ServerApp();
      app.configureValidation({ adapter: mockAdapter });
      app.registerModule({ controllers: [UsersController] });
      const runtime = app.compile();

      // Per-route schema forces failure
      const response = await runtime.fetch(
        mockRequest('http://localhost/users', { name: 'Alice' })
      );
      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.errors[0].message).toBe('Per-route wins');
    });
  });

  describe('end-to-end: controller with schemas and middleware', () => {
    it('full stack: module → controller → route → validation → handler', async () => {
      const order: string[] = [];

      const moduleMw = async (_ctx: any, next: any) => {
        order.push('module');
        return next();
      };

      const ctrlMw = async (_ctx: any, next: any) => {
        order.push('controller');
        return next();
      };

      const routeMw = async (_ctx: any, next: any) => {
        order.push('route');
        return next();
      };

      const { Controller } = await import('../controller/index.js');

      class UsersController extends Controller {
        middlewares = [ctrlMw];

        schemas: Record<string, any> = {
          create: { body: createSuccessSchema() },
        };

        routes(router: any) {
          router.post('/users', routeMw, (ctx: any) => {
            order.push('handler');
            return new Response('created');
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        create(ctx: any) {
          return new Response('created');
        }
      }

      const app = new ServerApp();
      app.configureValidation({ adapter: mockAdapter });
      app.registerModule({
        middlewares: [moduleMw],
        controllers: [UsersController],
      });
      const runtime = app.compile();

      const response = await runtime.fetch(
        mockRequest('http://localhost/users', { name: 'Alice' })
      );
      expect(response.status).toBe(200);
      expect(order).toEqual(['module', 'controller', 'route', 'handler']);
    });
  });
});
