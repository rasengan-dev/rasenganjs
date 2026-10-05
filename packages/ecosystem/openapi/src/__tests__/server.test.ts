import {
  Controller,
  defineModule,
  Provider,
  ServerApp,
} from '@rasenganjs/server';
import { describe, expect, it } from 'vitest';
import { OpenApiRegistry } from '../core/registry.js';
import { DocumentedRouter } from '../server/documented-router.js';
import { OpenApiModule } from '../server/module.js';

function buildApp() {
  const docsModule = OpenApiModule.forRoot({
    prefix: '/api/v1',
    info: { title: 'Widgets API', version: '1.0.0' },
  });

  class WidgetController extends Controller {
    constructor(private readonly openApiRegistry: OpenApiRegistry) {
      super();
    }

    routes(router: any): void {
      const docs = new DocumentedRouter(router, this.openApiRegistry);
      docs.get(
        '/widgets/:id',
        [],
        async (ctx: any) => Response.json({ id: ctx.params.id }),
        {
          summary: 'Get a widget',
          tags: ['widgets'],
          responses: { 200: { description: 'OK' } },
        }
      );
    }
  }

  const app = new ServerApp();
  app.registerModule(
    defineModule({
      prefix: '/api/v1',
      imports: [docsModule],
      controllers: [WidgetController],
    })
  );

  return app.compile();
}

describe('OpenApiModule.forRoot()', () => {
  it('resolves OpenApiRegistry by constructor-param name from an unrelated module', async () => {
    const runtime = buildApp();
    const res = await runtime.fetch(
      new Request('http://localhost/api/v1/widgets/42')
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: '42' });
  });

  it('mounts /openapi.json under the configured prefix, with the route captured', async () => {
    const runtime = buildApp();
    const res = await runtime.fetch(
      new Request('http://localhost/api/v1/openapi.json')
    );
    expect(res.status).toBe(200);
    const doc = (await res.json()) as any;
    expect(doc.info.title).toBe('Widgets API');
    expect(doc.paths?.['/api/v1/widgets/{id}']).toBeTruthy();
  });

  it('two forRoot() calls in the same process produce two independent registries instead of throwing', () => {
    const moduleA = OpenApiModule.forRoot({
      info: { title: 'A', version: '1.0.0' },
    });
    const moduleB = OpenApiModule.forRoot({
      info: { title: 'B', version: '1.0.0' },
    });

    expect(moduleA).not.toBe(moduleB);

    const appA = new ServerApp();
    appA.registerModule(defineModule({ imports: [moduleA] }));
    const runtimeA = appA.compile();

    const appB = new ServerApp();
    appB.registerModule(defineModule({ imports: [moduleB] }));
    const runtimeB = appB.compile();

    return Promise.all([
      runtimeA
        .fetch(new Request('http://localhost/openapi.json'))
        .then(async (res) => {
          expect(((await res.json()) as any).info.title).toBe('A');
        }),
      runtimeB
        .fetch(new Request('http://localhost/openapi.json'))
        .then(async (res) => {
          expect(((await res.json()) as any).info.title).toBe('B');
        }),
    ]);
  });
});

describe('DocumentedRouter (Server)', () => {
  it('is injectable via a fresh OpenApiRegistry instance and captures routes independent of DI resolution order', () => {
    const registry = new OpenApiRegistry({
      info: { title: 'Standalone', version: '1.0.0' },
    });
    const calls: Array<{ method: string; args: unknown[] }> = [];
    const fakeRouter = {
      get: (...args: unknown[]) => calls.push({ method: 'get', args }),
      post: (...args: unknown[]) => calls.push({ method: 'post', args }),
      put: (...args: unknown[]) => calls.push({ method: 'put', args }),
      patch: (...args: unknown[]) => calls.push({ method: 'patch', args }),
      delete: (...args: unknown[]) => calls.push({ method: 'delete', args }),
    };

    const docs = new DocumentedRouter(fakeRouter as any, registry);
    const handler = () => new Response();
    docs.post('/orgs', [], handler as any, {
      summary: 'Create an org',
      responses: { 201: { description: 'Created' } },
    });

    expect(calls).toEqual([{ method: 'post', args: ['/orgs', [], handler] }]);
    expect(registry.generateDocument().paths?.['/orgs']).toBeTruthy();
  });
});
