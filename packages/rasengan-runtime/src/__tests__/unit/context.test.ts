import { describe, it, expect } from 'vitest';
import { createContext } from '../../context/index.js';

describe('createContext', () => {
  it('returns a Context with request, params, runtime, state', () => {
    const request = new Request('http://localhost/test');
    const ctx = createContext(request, { id: '42' }, { env: { FOO: 'bar' } });

    expect(ctx.request).toBe(request);
    expect(ctx.params).toEqual({ id: '42' });
    expect(ctx.runtime).toEqual({ env: { FOO: 'bar' } });
    expect(ctx.state).toEqual({});
  });

  it('defaults params to empty object', () => {
    const ctx = createContext(new Request('http://localhost'));
    expect(ctx.params).toEqual({});
  });

  it('defaults runtime to empty object', () => {
    const ctx = createContext(new Request('http://localhost'));
    expect(ctx.runtime).toEqual({});
  });

  it('set() stores a value on state', () => {
    const ctx = createContext(new Request('http://localhost'));
    ctx.set('user', { name: 'Alice' });
    expect(ctx.state.user).toEqual({ name: 'Alice' });
  });

  it('get() retrieves a stored value', () => {
    const ctx = createContext(new Request('http://localhost'));
    ctx.set('user', { name: 'Bob' });
    expect(ctx.get('user')).toEqual({ name: 'Bob' });
  });

  it('get() returns undefined for missing key', () => {
    const ctx = createContext(new Request('http://localhost'));
    expect(ctx.get('nope')).toBeUndefined();
  });

  it('get() is typed via generics', () => {
    const ctx = createContext(new Request('http://localhost'));
    ctx.set('count', 42);
    const val = ctx.get<number>('count');
    expect(val).toBe(42);
  });

  it('set() on the same key overwrites', () => {
    const ctx = createContext(new Request('http://localhost'));
    ctx.set('key', 1);
    ctx.set('key', 2);
    expect(ctx.get('key')).toBe(2);
  });

  it('state is a shared mutable reference', () => {
    const ctx = createContext(new Request('http://localhost'));
    ctx.state.foo = 'bar';
    expect(ctx.get('foo')).toBe('bar');
  });

  // ── query ──────────────────────────────────────────────────

  it('query returns empty object for URL without query string', () => {
    const ctx = createContext(new Request('http://localhost/path'));
    expect(ctx.query('page')).toBeUndefined();
    expect(ctx.query.page).toBeUndefined();
    expect(Object.keys(ctx.query)).toHaveLength(0);
  });

  it('query parses query string on first access', () => {
    const ctx = createContext(
      new Request('http://localhost/search?q=hello&page=2')
    );
    expect(ctx.query.q).toBe('hello');
    expect(ctx.query.page).toBe('2');
  });

  it('query is callable to get a single param', () => {
    const ctx = createContext(new Request('http://localhost/?a=1&b=2'));
    expect(ctx.query('a')).toBe('1');
    expect(ctx.query('b')).toBe('2');
  });

  it('query returns undefined for missing key', () => {
    const ctx = createContext(new Request('http://localhost/?x=1'));
    expect(ctx.query('missing')).toBeUndefined();
    expect(ctx.query.missing).toBeUndefined();
  });

  it('query is lazily parsed (no error for invalid URL until accessed)', () => {
    const ctx = createContext(new Request('http://localhost'));
    // No crash — query hasn't been accessed yet
    expect(() => ctx.query).not.toThrow();
  });

  it('query decodes URL-encoded values', () => {
    const ctx = createContext(
      new Request('http://localhost/?name=hello%20world')
    );
    expect(ctx.query.name).toBe('hello world');
  });

  it('query caches after first parse', () => {
    const ctx = createContext(new Request('http://localhost/?a=1'));
    const q1 = ctx.query;
    const q2 = ctx.query;
    expect(q1).toBe(q2);
  });
});
