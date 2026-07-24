import { describe, it, expect, vi } from 'vitest';
import { toExpressHandler } from '../../adapters/express.js';
import { Futon } from '../../app/index.js';
import { json, text } from '../../response/utils.js';

function createMockReq({
  method = 'GET',
  url = '/',
  headers = {},
  body,
}: {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
  body?: unknown;
} = {}) {
  const req: any = {
    method,
    url,
    headers: { ...headers, host: 'localhost' },
    on: vi.fn(),
  };
  if (body !== undefined) {
    req.body = body;
  }
  return req;
}

function createMockRes() {
  const chunks: Buffer[] = [];
  return {
    statusCode: 200,
    status: vi.fn(function (this: any, code: number) {
      this.statusCode = code;
      return this;
    }),
    setHeader: vi.fn(),
    getHeader: vi.fn(),
    end: vi.fn((chunk?: unknown) => {
      if (chunk) chunks.push(Buffer.from(chunk as any));
    }),
    write: vi.fn((chunk: unknown) => {
      chunks.push(Buffer.from(chunk as any));
    }),
    getBody: () => Buffer.concat(chunks).toString('utf-8'),
  };
}

describe('toExpressHandler', () => {
  it('calls app.fetch with a correct Web Request', async () => {
    const app = new Futon();
    app.get('/test', async () => json({ ok: true }));

    const handler = toExpressHandler(app);
    const req = createMockReq({ url: '/test' });
    const res = createMockRes();
    const next = vi.fn();

    await handler(req, res as any, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.setHeader).toHaveBeenCalledWith(
      'content-type',
      expect.stringContaining('application/json')
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('writes response body', async () => {
    const app = new Futon();
    app.get('/hello', async () => text('hello world'));

    const handler = toExpressHandler(app);
    const req = createMockReq({ url: '/hello' });
    const res = createMockRes();
    const next = vi.fn();

    await handler(req, res as any, next);

    expect(res.write).toHaveBeenCalled();
    expect(res.end).toHaveBeenCalled();
  });

  it('passes errors to next()', async () => {
    const app = new Futon();
    app.get('/crash', async () => {
      throw new Error('handler error');
    });

    const handler = toExpressHandler(app);
    const req = createMockReq({ url: '/crash' });
    const res = createMockRes();
    const next = vi.fn();

    await handler(req, res as any, next);

    // Futon catches the error and returns 500
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('passes adapter construction errors to next()', async () => {
    const app = new Futon();
    const handler = toExpressHandler(app);

    // Invalid req that will fail during Request construction
    const req = {
      method: 'GET',
      get url() {
        throw new Error('invalid url');
      },
      headers: {},
    };
    const res = createMockRes();
    const next = vi.fn();

    await handler(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('merges runtime context into responses', async () => {
    const app = new Futon();
    app.get('/env', async (ctx) => json({ env: ctx.runtime.env }));

    const handler = toExpressHandler(app, { env: { FOO: 'bar' } });
    const req = createMockReq({ url: '/env' });
    const res = createMockRes();
    const next = vi.fn();

    await handler(req, res as any, next);

    const body = res.getBody();
    const parsed = JSON.parse(body);
    expect(parsed).toHaveProperty('env');
    expect(parsed.env).toHaveProperty('FOO', 'bar');
  });

  it('sets the status code from the Response', async () => {
    const app = new Futon();
    app.get('/notfound', async () => text('missing', { status: 404 }));

    const handler = toExpressHandler(app);
    const req = createMockReq({ url: '/notfound' });
    const res = createMockRes();
    const next = vi.fn();

    await handler(req, res as any, next);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
