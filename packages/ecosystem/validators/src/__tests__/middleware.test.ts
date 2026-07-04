import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { createValidationMiddleware } from '../middleware.js';
import { zodAdapter } from '../adapters/zod.js';
import type { Context, Middleware } from '@rasenganjs/runtime';

/**
 * Create a minimal mock Context for testing.
 */
function mockContext(overrides?: {
  params?: Record<string, string>;
  query?: Record<string, string>;
  body?: unknown;
}): Context {
  const state: Record<string, unknown> = {};

  return {
    request: new Request(
      'http://localhost' +
        (overrides?.query
          ? '?' + new URLSearchParams(overrides.query).toString()
          : '')
    ),
    req: new Request('http://localhost'),
    body: overrides?.body,
    params: overrides?.params ?? {},
    query: new Proxy({} as Record<string, string>, {
      get(target, key: string) {
        if (key === 'then') return undefined;
        return overrides?.query?.[key];
      },
      ownKeys() {
        return Object.keys(overrides?.query ?? {});
      },
      getOwnPropertyDescriptor(_target: any, key: string) {
        const query = overrides?.query;
        if (query && Object.prototype.hasOwnProperty.call(query, key)) {
          return { enumerable: true, configurable: true, value: query[key] };
        }
        return undefined;
      },
    }) as any,
    runtime: {} as any,
    state,
    response: {} as any,
    res: {} as any,
    set<T>(key: string, value: T): void {
      state[key] = value;
    },
    get<T>(key: string): T | undefined {
      return state[key] as T | undefined;
    },
  } as Context;
}

describe('createValidationMiddleware', () => {
  const config = { adapter: zodAdapter };

  it('passes through when no schemas are defined', async () => {
    const mw = createValidationMiddleware({}, config);
    const ctx = mockContext();
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    const res = await mw(ctx, next);
    expect(res).toBeInstanceOf(Response);
    expect(next).toHaveBeenCalledOnce();
  });

  it('validates body and replaces ctx.body and ctx.get("parsedBody")', async () => {
    const schema = z.object({ name: z.string().min(2) });
    const mw = createValidationMiddleware({ body: schema }, config);
    const ctx = mockContext({ body: { name: 'Alice' } });
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    await mw(ctx, next);
    expect(next).toHaveBeenCalledOnce();
    expect(ctx.body).toEqual({ name: 'Alice' });
    expect(ctx.get('parsedBody')).toEqual({ name: 'Alice' });
  });

  it('validates params and mutates ctx.params in-place', async () => {
    const schema = z.object({ id: z.string().uuid() });
    const mw = createValidationMiddleware({ params: schema }, config);
    const ctx = mockContext({
      params: { id: '550e8400-e29b-41d4-a716-446655440000' },
    });
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    await mw(ctx, next);
    expect(next).toHaveBeenCalledOnce();
    expect(ctx.params).toEqual({ id: '550e8400-e29b-41d4-a716-446655440000' });
  });

  it('short-circuits on body validation failure', async () => {
    const schema = z.object({ name: z.string().min(10) });
    const mw = createValidationMiddleware({ body: schema }, config);
    const ctx = mockContext({ body: { name: 'short' } });
    const next = vi.fn();

    const res = await mw(ctx, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body).toHaveProperty('errors');
    expect(body['errors'][0].message).toContain('10');
  });

  it('short-circuits on params validation failure', async () => {
    const schema = z.object({ id: z.string().uuid() });
    const mw = createValidationMiddleware({ params: schema }, config);
    const ctx = mockContext({ params: { id: 'not-a-uuid' } });
    const next = vi.fn();

    const res = await mw(ctx, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toBe(400);
  });

  it('uses per-route onError when provided', async () => {
    const schema = z.object({ name: z.string().min(10) });
    const mw = createValidationMiddleware(
      {
        body: schema,
        onError: (errors, _ctx) =>
          Response.json({ custom: true, errors }, { status: 422 }),
      },
      config
    );
    const ctx = mockContext({ body: { name: 'short' } });
    const next = vi.fn();

    const res = await mw(ctx, next);
    expect(res.status).toBe(422);

    const body = await res.json();
    expect(body['custom']).toBe(true);
  });

  it('sets validatedQuery on context state', async () => {
    const schema = z.object({
      page: z.coerce.number().int().positive().default(1),
      limit: z.coerce.number().int().max(100).default(20),
    });
    const mw = createValidationMiddleware({ query: schema }, config);
    const ctx = mockContext({ query: { page: '2', limit: '50' } });
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    await mw(ctx, next);
    expect(next).toHaveBeenCalledOnce();
    const validated = ctx.get('validatedQuery');
    expect(validated).toEqual({ page: 2, limit: 50 });
  });

  it('validates body + params + query simultaneously', async () => {
    const bodySchema = z.object({ name: z.string().min(1) });
    const paramsSchema = z.object({ id: z.string().uuid() });
    const querySchema = z.object({ page: z.coerce.number() });

    const mw = createValidationMiddleware(
      { body: bodySchema, params: paramsSchema, query: querySchema },
      config
    );
    const ctx = mockContext({
      body: { name: 'Alice' },
      params: { id: '550e8400-e29b-41d4-a716-446655440000' },
      query: { page: '3' },
    });
    const next = vi.fn().mockResolvedValue(new Response('ok'));

    await mw(ctx, next);
    expect(next).toHaveBeenCalledOnce();
    expect(ctx.body).toEqual({ name: 'Alice' });
    expect(ctx.params).toEqual({ id: '550e8400-e29b-41d4-a716-446655440000' });
    expect(ctx.get('validatedQuery')).toEqual({ page: 3 });
  });

  it('collects all errors before short-circuiting', async () => {
    const bodySchema = z.object({ name: z.string().min(2) });
    const paramsSchema = z.object({ id: z.string().uuid() });

    const mw = createValidationMiddleware(
      { body: bodySchema, params: paramsSchema },
      config
    );
    const ctx = mockContext({
      body: { name: '' },
      params: { id: 'bad' },
    });
    const next = vi.fn();

    const res = await mw(ctx, next);
    expect(next).not.toHaveBeenCalled();

    const body = await res.json();
    expect(body['errors'].length).toBe(2);
  });
});
