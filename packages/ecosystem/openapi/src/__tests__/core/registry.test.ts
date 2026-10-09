import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { OpenApiRegistry } from '../../core/registry.js';
import { buildRouteConfig } from '../../core/route-config.js';

describe('OpenApiRegistry', () => {
  it('registers a route and produces a path in the generated document', () => {
    const registry = new OpenApiRegistry({
      info: { title: 'Test API', version: '1.0.0' },
    });
    registry.registerRoute({
      method: 'get',
      path: '/orgs/:orgId',
      summary: 'Get an org',
      responses: { 200: { description: 'OK' } },
    });

    const doc = registry.generateDocument();
    expect(doc.paths?.['/orgs/{orgId}']).toBeTruthy();
    expect((doc.paths?.['/orgs/{orgId}'] as any).get.summary).toBe(
      'Get an org'
    );
  });

  it('prepends basePath to every registered route', () => {
    const registry = new OpenApiRegistry({
      info: { title: 'Test API', version: '1.0.0' },
      basePath: '/api/v1',
    });
    registry.registerRoute({
      method: 'post',
      path: '/orgs',
      summary: 'Create an org',
      responses: { 201: { description: 'Created' } },
    });

    const doc = registry.generateDocument();
    expect(doc.paths?.['/api/v1/orgs']).toBeTruthy();
    expect(doc.paths?.['/orgs']).toBeUndefined();
  });

  it('includes a Zod request body schema in the generated document', () => {
    const registry = new OpenApiRegistry({
      info: { title: 'Test API', version: '1.0.0' },
    });
    const CreateOrgSchema = z.object({ name: z.string(), slug: z.string() });
    registry.registerRoute({
      method: 'post',
      path: '/orgs',
      summary: 'Create an org',
      request: {
        body: { content: { 'application/json': { schema: CreateOrgSchema } } },
      },
      responses: { 201: { description: 'Created' } },
    });

    const doc = registry.generateDocument();
    const operation = (doc.paths?.['/orgs'] as any).post;
    expect(
      operation.requestBody.content['application/json'].schema
    ).toBeTruthy();
  });

  it('registers security schemes passed to the constructor, reachable from components', () => {
    const registry = new OpenApiRegistry({
      info: { title: 'Test API', version: '1.0.0' },
      securitySchemes: {
        session: { type: 'apiKey', in: 'cookie', name: 'rasengan_session' },
      },
    });

    const doc = registry.generateDocument();
    expect((doc.components?.securitySchemes?.['session'] as any).name).toBe(
      'rasengan_session'
    );
  });

  it("two independent instances never observe each other's routes", () => {
    const a = new OpenApiRegistry({ info: { title: 'A', version: '1.0.0' } });
    const b = new OpenApiRegistry({ info: { title: 'B', version: '1.0.0' } });

    a.registerRoute({
      method: 'get',
      path: '/only-in-a',
      summary: 'Only in A',
      responses: { 200: { description: 'OK' } },
    });

    expect(a.generateDocument().paths?.['/only-in-a']).toBeTruthy();
    expect(b.generateDocument().paths?.['/only-in-a']).toBeUndefined();
  });

  it('exposes the document title for docs UI mounting', () => {
    const registry = new OpenApiRegistry({
      info: { title: 'Widgets API', version: '1.0.0' },
    });
    expect(registry.title).toBe('Widgets API');
  });

  it('emits operationId, x-* extensions and examples in the document', () => {
    const registry = new OpenApiRegistry({
      info: { title: 'Test API', version: '1.0.0' },
    });
    registry.registerRoute(
      buildRouteConfig(
        'post',
        '/orgs',
        { body: z.object({ name: z.string() }) },
        {
          summary: 'Create an org',
          operationId: 'create-org',
          'x-public': true,
          bodyExample: { name: 'Acme' },
          responses: {
            201: {
              description: 'Created',
              schema: z.object({ id: z.string() }),
              example: { id: 'org_1' },
            },
          },
        }
      )
    );

    const operation = (registry.generateDocument().paths?.['/orgs'] as any).post;
    expect(operation.operationId).toBe('create-org');
    expect(operation['x-public']).toBe(true);
    expect(operation.requestBody.content['application/json'].example).toEqual({ name: 'Acme' });
    expect(operation.responses['201'].content['application/json'].example).toEqual({ id: 'org_1' });
  });
});
