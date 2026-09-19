import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { buildRouteConfig } from '../../core/route-config.js';

describe('buildRouteConfig', () => {
  it('builds a route with no schema', () => {
    const config = buildRouteConfig('get', '/orgs/:orgId', undefined, {
      summary: 'Get an org',
      responses: { 200: { description: 'OK' } },
    });

    expect(config.method).toBe('get');
    expect(config.path).toBe('/orgs/:orgId');
    expect(config.summary).toBe('Get an org');
    expect(config.request).toBeUndefined();
    expect((config.responses[200] as any)?.description).toBe('OK');
  });

  it('builds a route with a body schema', () => {
    const BodySchema = z.object({ name: z.string() });
    const config = buildRouteConfig(
      'post',
      '/orgs',
      { body: BodySchema },
      {
        summary: 'Create an org',
        responses: { 201: { description: 'Created' } },
      }
    );

    expect(config.request?.body).toEqual({
      content: { 'application/json': { schema: BodySchema } },
    });
  });

  it('carries params and query schemas through untouched', () => {
    const ParamsSchema = z.object({ id: z.string() });
    const QuerySchema = z.object({ page: z.string().optional() });
    const config = buildRouteConfig(
      'get',
      '/orgs/:id',
      { params: ParamsSchema, query: QuerySchema },
      { summary: 'List', responses: { 200: { description: 'OK' } } }
    );

    expect(config.request?.params).toBe(ParamsSchema);
    expect(config.request?.query).toBe(QuerySchema);
  });

  it('attaches a response schema under application/json when present', () => {
    const ResponseSchema = z.object({ id: z.string() });
    const config = buildRouteConfig('get', '/orgs/:id', undefined, {
      summary: 'Get',
      responses: { 200: { description: 'OK', schema: ResponseSchema } },
    });

    expect(
      (config.responses[200] as any).content['application/json'].schema
    ).toBe(ResponseSchema);
  });

  it('carries tags and security through unchanged', () => {
    const config = buildRouteConfig('get', '/orgs', undefined, {
      summary: 'List orgs',
      tags: ['orgs'],
      security: [{ session: [] }],
      responses: { 200: { description: 'OK' } },
    });

    expect(config.tags).toEqual(['orgs']);
    expect(config.security).toEqual([{ session: [] }]);
  });
});
