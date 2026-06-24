import { describe, it, expect, vi } from 'vitest';
import { logger } from '../../../middlewares/logger.js';
import type { LogEntry } from '../../../middlewares/logger.js';
import { createContext } from '../../../context/index.js';
import type { Context } from '../../../context/types.js';

function createCtx(method: string, path: string = '/'): Context {
  return createContext(new Request(`http://localhost${path}`, { method }));
}

describe('logger', () => {
  it('logs structured entry with method, path, status, duration', async () => {
    const entries: LogEntry[] = [];
    const mw = logger({ log: (e) => entries.push(e) });
    const ctx = createCtx('GET', '/api/users');
    await mw(ctx, () => Promise.resolve(new Response('ok', { status: 200 })));

    expect(entries).toHaveLength(1);
    expect(entries[0].method).toBe('GET');
    expect(entries[0].pathname).toBe('/api/users');
    expect(entries[0].status).toBe(200);
    expect(entries[0].duration).toBeGreaterThanOrEqual(0);
  });

  it('includes response size from content-length header', async () => {
    const entries: LogEntry[] = [];
    const mw = logger({ log: (e) => entries.push(e) });
    const ctx = createCtx('POST', '/data');
    await mw(ctx, () =>
      Promise.resolve(
        new Response(JSON.stringify({ ok: true }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': '15',
          },
        })
      )
    );

    expect(entries[0].size).toBe(15);
  });

  it('sets size null when content-length is missing', async () => {
    const entries: LogEntry[] = [];
    const mw = logger({ log: (e) => entries.push(e) });
    const ctx = createCtx('GET', '/');
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(entries[0].size).toBeNull();
  });

  it('uses console.log by default', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const mw = logger();
    const ctx = createCtx('GET', '/');
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(spy).toHaveBeenCalledOnce();
    spy.mockRestore();
  });

  it('skips logging for excluded paths', async () => {
    const entries: LogEntry[] = [];
    const mw = logger({ log: (e) => entries.push(e), skip: ['/health'] });
    const ctx = createCtx('GET', '/health');
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(entries).toHaveLength(0);
  });

  it('logs errors thrown by downstream with status 0', async () => {
    const entries: LogEntry[] = [];
    const mw = logger({ log: (e) => entries.push(e) });
    const ctx = createCtx('GET', '/fail');

    await expect(
      mw(ctx, () => Promise.reject(new Error('boom')))
    ).rejects.toThrow('boom');

    expect(entries).toHaveLength(1);
    expect(entries[0].method).toBe('GET');
    expect(entries[0].pathname).toBe('/fail');
    expect(entries[0].status).toBe(0);
    expect(entries[0].duration).toBeGreaterThanOrEqual(0);
  });

  it('includes search params in log entry', async () => {
    const entries: LogEntry[] = [];
    const mw = logger({ log: (e) => entries.push(e) });
    const ctx = createCtx('GET', '/search?q=hello');
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    expect(entries[0].search).toBe('?q=hello');
    expect(entries[0].pathname).toBe('/search');
  });

  it('default output contains method, path, status and duration', async () => {
    const lines: string[] = [];
    const spy = vi
      .spyOn(console, 'log')
      .mockImplementation((msg) => lines.push(msg));
    const mw = logger();
    const ctx = createCtx('POST', '/api/data');
    await mw(ctx, () =>
      Promise.resolve(new Response('created', { status: 201 }))
    );

    expect(lines).toHaveLength(1);
    const line = lines[0];
    // strip ANSI codes for assertion
    const plain = line.replace(/\x1b\[\d+m/g, '');
    expect(plain).toContain('POST');
    expect(plain).toContain('/api/data');
    expect(plain).toContain('201');
    expect(plain).toContain('ms');
    spy.mockRestore();
  });

  it('default output uses method padding', async () => {
    const lines: string[] = [];
    const spy = vi
      .spyOn(console, 'log')
      .mockImplementation((msg) => lines.push(msg));
    const mw = logger({ methodPadding: 8 });
    const ctx = createCtx('GET', '/');
    await mw(ctx, () => Promise.resolve(new Response('ok')));

    const plain = lines[0].replace(/\x1b\[\d+m/g, '');
    // GET padded to 8 chars
    expect(plain).toMatch(/^GET\s{5}/);
    spy.mockRestore();
  });
});
