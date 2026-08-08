import { describe, it, expect } from 'vitest';
import { matchPath, parseQueryString } from '../../../router/utils.js';

describe('matchPath', () => {
  it('matches a static path', () => {
    expect(matchPath('/users', '/users')).toEqual({});
  });

  it('matches root path', () => {
    expect(matchPath('/', '/')).toEqual({});
  });

  it('matches a required param', () => {
    expect(matchPath('/users/:id', '/users/42')).toEqual({ id: '42' });
  });

  it('matches multiple params', () => {
    expect(
      matchPath('/users/:id/posts/:slug', '/users/42/posts/hello')
    ).toEqual({ id: '42', slug: 'hello' });
  });

  it('decodes URL-encoded param values', () => {
    expect(matchPath('/users/:id', '/users/hello%20world')).toEqual({
      id: 'hello world',
    });
  });

  it('matches an optional param when present', () => {
    expect(matchPath('/users/:id?', '/users/42')).toEqual({ id: '42' });
  });

  it('matches an optional param when absent', () => {
    expect(matchPath('/users/:id?', '/users')).toEqual({});
  });

  it('matches a wildcard param', () => {
    expect(matchPath('/files/:path*', '/files/a/b/c')).toEqual({
      path: 'a/b/c',
    });
  });

  it('matches a bare catch-all', () => {
    expect(matchPath('/static/*', '/static/foo.js')).toEqual({ _: 'foo.js' });
  });

  it('returns null for no match', () => {
    expect(matchPath('/users/:id', '/posts')).toBeNull();
  });

  it('returns null for wrong path entirely', () => {
    expect(matchPath('/users', '/users/42')).toBeNull();
  });

  it('handles trailing slashes on pathname', () => {
    expect(matchPath('/users', '/users/')).toEqual({});
  });

  it('handles trailing slashes on pattern', () => {
    expect(matchPath('/users/', '/users')).toEqual({});
  });

  it('matches nested static + dynamic', () => {
    expect(
      matchPath('/api/v1/:resource/:action', '/api/v1/users/create')
    ).toEqual({ resource: 'users', action: 'create' });
  });

  it('returns null when method would not match (param mismatch)', () => {
    expect(matchPath('/:a/:b', '/only-one')).toBeNull();
  });
});

describe('parseQueryString', () => {
  it('parses a simple query string', () => {
    expect(parseQueryString('http://localhost?foo=bar')).toEqual({
      foo: 'bar',
    });
  });

  it('parses multiple params', () => {
    expect(parseQueryString('http://localhost?a=1&b=2')).toEqual({
      a: '1',
      b: '2',
    });
  });

  it('decodes URL-encoded values', () => {
    expect(
      parseQueryString('http://localhost?name=hello%20world&key=value')
    ).toEqual({ name: 'hello world', key: 'value' });
  });

  it('returns empty object when no query', () => {
    expect(parseQueryString('http://localhost')).toEqual({});
  });

  it('handles empty query string', () => {
    expect(parseQueryString('http://localhost?')).toEqual({});
  });

  it('handles param without value', () => {
    expect(parseQueryString('http://localhost?flag')).toEqual({ flag: '' });
  });
});
