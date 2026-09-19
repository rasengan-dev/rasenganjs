import { Futon, Router } from '@rasenganjs/futon';
import { describe, expect, it } from 'vitest';
import { OpenApiRegistry } from '../core/registry.js';
import { DocumentedRouter } from '../futon/documented-router.js';
import { mountOpenApiDocs } from '../futon/mount-docs.js';

function buildApp() {
  const app = new Futon();
  const router = new Router();
  const registry = new OpenApiRegistry({
    info: { title: 'Widgets API', version: '1.0.0' },
  });
  const docs = new DocumentedRouter(router, registry);

  docs.get(
    '/widgets/:id',
    async (ctx) =>
      Response.json({ id: (ctx.params as Record<string, string>).id }),
    {
      summary: 'Get a widget',
      tags: ['widgets'],
      responses: { 200: { description: 'OK' } },
    }
  );

  mountOpenApiDocs(app, registry, {});
  app.use(router.middleware());
  return { app, registry };
}

describe('DocumentedRouter (Futon)', () => {
  it('registers the real route on the underlying Futon router unchanged', async () => {
    const { app } = buildApp();
    const res = await app.fetch(new Request('http://localhost/widgets/42'));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: '42' });
  });

  it('captures the route into the registry, converting :param to {param}', () => {
    const { registry } = buildApp();
    const doc = registry.generateDocument();
    expect(doc.paths?.['/widgets/{id}']).toBeTruthy();
    expect((doc.paths?.['/widgets/{id}'] as any).get.summary).toBe(
      'Get a widget'
    );
  });
});

describe('mountOpenApiDocs (Futon)', () => {
  it('serves a valid OpenAPI document at /openapi.json', async () => {
    const { app } = buildApp();
    const res = await app.fetch(new Request('http://localhost/openapi.json'));
    expect(res.status).toBe(200);
    const doc = (await res.json()) as any;
    expect(doc.openapi).toBe('3.1.0');
    expect(doc.info.title).toBe('Widgets API');
  });

  it('serves the Scalar UI at /docs', async () => {
    const { app } = buildApp();
    const res = await app.fetch(new Request('http://localhost/docs'));
    expect(res.status).toBe(200);
    expect(await res.text()).toMatch(/api-reference/);
  });

  it('serves the Swagger UI at /docs/swagger', async () => {
    const { app } = buildApp();
    const res = await app.fetch(new Request('http://localhost/docs/swagger'));
    expect(res.status).toBe(200);
    expect(await res.text()).toMatch(/swagger-ui/);
  });
});
