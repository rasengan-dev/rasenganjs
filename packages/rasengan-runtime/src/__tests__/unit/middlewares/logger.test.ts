import { describe, it, expect, vi } from 'vitest';
import { logger } from '../../../middlewares/logger.js';
import type { Context } from '../../../context/types.js';

function createCtx(method: string, path: string = '/'): Context {
  return {
    request: new Request(`http://localhost${path}`, { method }),
    params: {},
    runtime: {},
    state: {},
    set: vi.fn(),
    get: vi.fn(),
  };
}

describe('logger', () => {
  it('logs method and path on request', async () => {
    const lines: string[] = [];
    const mw = logger({ log: (msg) => lines.push(msg) });
    const ctx = createCtx('GET', '/api/users');
    await mw(ctx, () => Promise.resolve(new Response('ok', { status: 200 })));

    expect(lines[0]).toContain('→ GET /api/users');
    expect(lines[1]).toContain('← GET /api/users');
    expect(lines[1]).toContain('200');
  });

  it('uses console.log by default', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const mw = logger();
    const ctx = createCtx('GET', '/');
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('skips logging for excluded paths', async () => {
    const lines: string[] = [];
    const mw = logger({ log: (msg) => lines.push(msg), skip: ['/health'] });
    const ctx = createCtx('GET', '/health');
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(lines).toHaveLength(0);
  });

  it('logs errors thrown by downstream', async () => {
    const lines: string[] = [];
    const mw = logger({ log: (msg) => lines.push(msg) });
    const ctx = createCtx('GET', '/fail');

    await expect(
      mw(ctx, () => Promise.reject(new Error('boom')))
    ).rejects.toThrow('boom');

    expect(lines[0]).toContain('→ GET /fail');
    expect(lines[1]).toContain('ERROR');
  });

  it('includes search params in log', async () => {
    const lines: string[] = [];
    const mw = logger({ log: (msg) => lines.push(msg) });
    const ctx = createCtx('GET', '/search?q=hello');
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(lines[0]).toContain('/search?q=hello');
  });
});
