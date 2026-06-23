import { describe, it, expect } from 'vitest';
import {
  json,
  text,
  html,
  redirect,
  status,
  notFound,
  streamResponse,
  nodeStreamToResponse,
} from '../../../response/utils.js';

describe('json', () => {
  it('creates a JSON response', async () => {
    const res = json({ ok: true });
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toMatch(/application\/json/);
    expect(await res.json()).toEqual({ ok: true });
  });

  it('accepts status override', async () => {
    const res = json({ error: 'bad' }, { status: 400 });
    expect(res.status).toBe(400);
  });
});

describe('text', () => {
  it('creates a text response', async () => {
    const res = text('hello');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('hello');
  });

  it('accepts init options', async () => {
    const res = text('not found', { status: 404 });
    expect(res.status).toBe(404);
  });
});

describe('html', () => {
  it('creates an HTML response with content-type', async () => {
    const res = html('<h1>Title</h1>');
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
    expect(await res.text()).toBe('<h1>Title</h1>');
  });

  it('merges custom headers with Content-Type', async () => {
    const res = html('<p>hi</p>', {
      headers: { 'X-Custom': 'val' },
    });
    expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
    expect(res.headers.get('x-custom')).toBe('val');
  });
});

describe('redirect', () => {
  it('creates a 302 redirect with Location header', () => {
    const res = redirect('/login');
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe('/login');
  });

  it('creates a 301 redirect', () => {
    const res = redirect('/perm', 301);
    expect(res.status).toBe(301);
  });

  it('creates a 308 redirect', () => {
    const res = redirect('/perm', 308);
    expect(res.status).toBe(308);
  });
});

describe('status', () => {
  it('creates a status-only response', () => {
    const res = status(204);
    expect(res.status).toBe(204);
  });

  it('includes optional body', async () => {
    const res = status(400, 'Bad Request');
    expect(await res.text()).toBe('Bad Request');
  });
});

describe('notFound', () => {
  it('creates a 404 response', async () => {
    const res = notFound();
    expect(res.status).toBe(404);
    expect(await res.text()).toBe('Not Found');
  });

  it('accepts custom body', async () => {
    const res = notFound('Custom 404');
    expect(await res.text()).toBe('Custom 404');
  });
});

describe('streamResponse', () => {
  it('creates a streaming response', async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('chunk'));
        controller.close();
      },
    });
    const res = streamResponse(stream);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
    expect(res.headers.get('transfer-encoding')).toBe('chunked');
    expect(await res.text()).toBe('chunk');
  });
});

describe('nodeStreamToResponse', () => {
  it('bridges a Node-style stream to a Response', async () => {
    const nodeStream = {
      pipe: vi.fn((writable: WritableStream) => {
        const writer = writable.getWriter();
        writer.write(new TextEncoder().encode('data from node'));
        writer.close();
      }),
    };
    const res = nodeStreamToResponse(nodeStream as any);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('data from node');
  });
});
