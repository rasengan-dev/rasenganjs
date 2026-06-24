import { describe, it, expect } from 'vitest';
import { ResponseBuilder } from '../../../response/builder.js';
import { createContext } from '../../../context/index.js';

describe('ResponseBuilder', () => {
  describe('json', () => {
    it('creates a JSON response with default 200', async () => {
      const res = new ResponseBuilder().json({ ok: true });
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toMatch(/application\/json/);
      expect(await res.json()).toEqual({ ok: true });
    });

    it('uses status set via chaining', async () => {
      const res = new ResponseBuilder().status(201).json({ created: true });
      expect(res.status).toBe(201);
      expect(await res.json()).toEqual({ created: true });
    });

    it('merges headers set via chaining', async () => {
      const res = new ResponseBuilder()
        .header('X-Custom', 'val')
        .json({ ok: true });

      expect(res.headers.get('x-custom')).toBe('val');
      expect(await res.json()).toEqual({ ok: true });
    });

    it('merges headers from init parameter', async () => {
      const res = new ResponseBuilder()
        .status(201)
        .header('X-Built', 'yes')
        .json({ ok: true }, { headers: { 'X-Override': 'also' } });

      expect(res.status).toBe(201);
      expect(res.headers.get('x-built')).toBe('yes');
      expect(res.headers.get('x-override')).toBe('also');
    });

    it('init headers override builder headers', async () => {
      const res = new ResponseBuilder()
        .header('X-Foo', 'builder')
        .json({ ok: true }, { headers: { 'X-Foo': 'init' } });

      expect(res.headers.get('x-foo')).toBe('init');
    });
  });

  describe('send', () => {
    it('creates a text response', async () => {
      const res = new ResponseBuilder().send('hello');
      expect(res.status).toBe(200);
      expect(await res.text()).toBe('hello');
    });

    it('uses status set via chaining', async () => {
      const res = new ResponseBuilder().status(404).send('Not found');
      expect(res.status).toBe(404);
      expect(await res.text()).toBe('Not found');
    });

    it('includes headers set via chaining', async () => {
      const res = new ResponseBuilder().header('X-Error', 'true').send('error');

      expect(res.headers.get('x-error')).toBe('true');
    });
  });

  describe('html', () => {
    it('creates an HTML response with content-type', async () => {
      const res = new ResponseBuilder().html('<h1>Title</h1>');
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
      expect(await res.text()).toBe('<h1>Title</h1>');
    });

    it('uses status set via chaining', async () => {
      const res = new ResponseBuilder().status(201).html('<p>created</p>');
      expect(res.status).toBe(201);
    });
  });

  describe('redirect', () => {
    it('creates a 302 redirect with Location header', () => {
      const res = new ResponseBuilder().redirect('/login');
      expect(res.status).toBe(302);
      expect(res.headers.get('location')).toBe('/login');
    });

    it('creates a 301 redirect', () => {
      const res = new ResponseBuilder().redirect('/perm', 301);
      expect(res.status).toBe(301);
      expect(res.headers.get('location')).toBe('/perm');
    });

    it('creates a 308 redirect', () => {
      const res = new ResponseBuilder().redirect('/perm', 308);
      expect(res.status).toBe(308);
    });

    it('includes builder headers', () => {
      const res = new ResponseBuilder()
        .header('X-Trace', 'abc')
        .redirect('/go');

      expect(res.headers.get('x-trace')).toBe('abc');
      expect(res.headers.get('location')).toBe('/go');
    });
  });

  describe('chaining', () => {
    it('chains status and header before terminal call', async () => {
      const res = new ResponseBuilder()
        .status(200)
        .header('X-Version', '1')
        .json({ ok: true });

      expect(res.status).toBe(200);
      expect(res.headers.get('x-version')).toBe('1');
      expect(await res.json()).toEqual({ ok: true });
    });

    it('status set after terminal call is ignored (frozen)', async () => {
      const builder = new ResponseBuilder();
      const res = builder.status(404).send('error');
      builder.status(200);

      expect(res.status).toBe(404);
    });
  });

  describe('removeHeader', () => {
    it('removes a previously set header', async () => {
      const res = new ResponseBuilder()
        .header('X-Remove', 'me')
        .removeHeader('X-Remove')
        .json({ ok: true });

      expect(res.headers.has('x-remove')).toBe(false);
    });
  });

  describe('integration with ctx.res', () => {
    it('is lazily available on context', async () => {
      const ctx = createContext(new Request('http://localhost'));

      const res = ctx.res.status(201).json({ from: 'ctx' });

      expect(res.status).toBe(201);
      expect(await res.json()).toEqual({ from: 'ctx' });
    });

    it('creates a single builder instance per context', () => {
      const ctx = createContext(new Request('http://localhost'));

      const first = ctx.res;
      const second = ctx.res;

      expect(first).toBe(second);
    });

    it('does not allocate builder if .res is not accessed', () => {
      const ctx = createContext(new Request('http://localhost'));

      expect((ctx as any)._res).toBeUndefined();
    });
  });
});
