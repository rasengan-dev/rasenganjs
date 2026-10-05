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

  it('carries operationId and deprecated through', () => {
    const config = buildRouteConfig('get', '/orgs', undefined, {
      summary: 'List orgs',
      operationId: 'list-orgs',
      deprecated: true,
      responses: { 200: { description: 'OK' } },
    });

    expect(config.operationId).toBe('list-orgs');
    expect(config.deprecated).toBe(true);
  });

  it('copies x-* extensions onto the operation, and only those', () => {
    const doc = {
      summary: 'List orgs',
      'x-public': true,
      'x-permission': 'orgs.read',
      responses: { 200: { description: 'OK' } },
    };
    const config = buildRouteConfig('get', '/orgs', undefined, doc);

    expect((config as any)['x-public']).toBe(true);
    expect((config as any)['x-permission']).toBe('orgs.read');
  });

  it('attaches body and response examples next to their schemas', () => {
    const BodySchema = z.object({ name: z.string() });
    const ResponseSchema = z.object({ id: z.string() });
    const config = buildRouteConfig(
      'post',
      '/orgs',
      { body: BodySchema },
      {
        summary: 'Create',
        bodyExample: { name: 'Acme' },
        responses: {
          201: { description: 'Created', schema: ResponseSchema, example: { id: 'org_1' } },
        },
      }
    );

    expect(config.request?.body).toEqual({
      content: { 'application/json': { schema: BodySchema, example: { name: 'Acme' } } },
    });
    expect((config.responses[201] as any).content['application/json']).toEqual({
      schema: ResponseSchema,
      example: { id: 'org_1' },
    });
  });

  it('adds no example key when none was given', () => {
    const config = buildRouteConfig(
      'post',
      '/orgs',
      { body: z.object({ name: z.string() }) },
      { summary: 'Create', responses: { 201: { description: 'Created' } } }
    );

    expect(Object.keys((config.request?.body as any).content['application/json'])).toEqual(['schema']);
  });
});
