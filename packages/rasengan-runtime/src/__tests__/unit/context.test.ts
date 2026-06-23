import { describe, it, expect } from 'vitest';
import { createContext } from '../../context/index.js';
import type { Context } from '../../context/types.js';

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
});
