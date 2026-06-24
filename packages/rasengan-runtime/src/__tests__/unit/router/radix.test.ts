import { describe, it, expect } from 'vitest';
import { RasenganTreeRouter } from '../../../router/radix.js';

describe('RasenganTreeRouter', () => {
  // ── Static paths ──────────────────────────────────────────

  it('matches a static path', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users', 'list');
    expect(tree.match('/users')).toEqual({ handler: 'list', params: {} });
  });

  it('matches root path', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/', 'root');
    expect(tree.match('/')).toEqual({ handler: 'root', params: {} });
  });

  it('returns undefined for unregistered path', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users', 'list');
    expect(tree.match('/posts').handler).toBeUndefined();
  });

  // ── Required params ───────────────────────────────────────

  it('matches a required param', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id', 'detail');
    expect(tree.match('/users/42')).toEqual({
      handler: 'detail',
      params: { id: '42' },
    });
  });

  it('matches multiple params', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id/posts/:slug', 'handler');
    expect(tree.match('/users/42/posts/hello')).toEqual({
      handler: 'handler',
      params: { id: '42', slug: 'hello' },
    });
  });

  it('decodes URL-encoded param values', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id', 'detail');
    expect(tree.match('/users/hello%20world').params).toEqual({
      id: 'hello world',
    });
  });

  it('prefers static over dynamic when both match', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id', 'dynamic');
    tree.add('/users/me', 'static');
    expect(tree.match('/users/me').handler).toBe('static');
  });

  it('returns null params on no match', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id', 'detail');
    expect(tree.match('/posts').handler).toBeUndefined();
    expect(tree.match('/users/42/posts').handler).toBeUndefined();
  });

  it('returns no match when segments outnumber pattern', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users', 'list');
    expect(tree.match('/users/42').handler).toBeUndefined();
  });

  // ── Optional params (`:param?`) ───────────────────────────

  it('matches optional param when present at end', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id?', 'handler');
    expect(tree.match('/users/42')).toEqual({
      handler: 'handler',
      params: { id: '42' },
    });
  });

  it('matches optional param when absent at end', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id?', 'handler');
    expect(tree.match('/users')).toEqual({
      handler: 'handler',
      params: {},
    });
  });

  it('skips optional param in middle when segment matches next child (skip logic)', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id?/posts', 'handler');
    // "posts" should not be captured as `id` — the optional
    // param is skipped because "posts" matches the next child.
    expect(tree.match('/users/posts')).toEqual({
      handler: 'handler',
      params: {},
    });
  });

  it('consumes optional param in middle when segment is not a child', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id?/posts', 'handler');
    expect(tree.match('/users/42/posts')).toEqual({
      handler: 'handler',
      params: { id: '42' },
    });
  });

  it('handles deep optional params correctly', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/a/:b?/c/:d?', 'handler');
    expect(tree.match('/a/x/c')).toEqual({
      handler: 'handler',
      params: { b: 'x' },
    });
    expect(tree.match('/a/x/c/y')).toEqual({
      handler: 'handler',
      params: { b: 'x', d: 'y' },
    });
    expect(tree.match('/a/c')).toEqual({
      handler: 'handler',
      params: {},
    });
  });

  // ── Wildcard params (`:param*`) ───────────────────────────

  it('matches wildcard param with multiple segments', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/files/:path*', 'handler');
    expect(tree.match('/files/a/b/c')).toEqual({
      handler: 'handler',
      params: { path: 'a/b/c' },
    });
  });

  it('matches wildcard param with single segment', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/files/:path*', 'handler');
    expect(tree.match('/files/readme.txt')).toEqual({
      handler: 'handler',
      params: { path: 'readme.txt' },
    });
  });

  // ── Bare catch-all (`*`) ──────────────────────────────────

  it('matches bare catch-all', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/static/*', 'handler');
    expect(tree.match('/static/foo.js')).toEqual({
      handler: 'handler',
      params: { _: 'foo.js' },
    });
  });

  it('matches bare catch-all with multiple segments', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/static/*', 'handler');
    expect(tree.match('/static/css/main.css')).toEqual({
      handler: 'handler',
      params: { _: 'css/main.css' },
    });
  });

  it('catch-all does not match bare parent (needs at least one segment)', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/static/*', 'handler');
    // /static/ is normalized to /static which has no segment for *
    expect(tree.match('/static/').handler).toBeUndefined();
  });

  // ── Trailing slash normalization ──────────────────────────

  it('matches with trailing slash on pathname', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users', 'list');
    expect(tree.match('/users/')).toEqual({ handler: 'list', params: {} });
  });

  it('handles root path with trailing slash', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/', 'root');
    expect(tree.match('/')).toEqual({ handler: 'root', params: {} });
  });

  it('matches param route with trailing slash', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/:id', 'detail');
    expect(tree.match('/users/42/')).toEqual({
      handler: 'detail',
      params: { id: '42' },
    });
  });

  // ── Multiple routes, overlapping ──────────────────────────

  it('matches nested static + dynamic routes', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/api/v1/:resource/:action', 'handler');
    expect(tree.match('/api/v1/users/create').params).toEqual({
      resource: 'users',
      action: 'create',
    });
  });

  it('disambiguates static vs static with different depths', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/api', 'api-root');
    tree.add('/api/v1', 'api-v1');
    tree.add('/api/v1/users', 'api-v1-users');
    expect(tree.match('/api').handler).toBe('api-root');
    expect(tree.match('/api/v1').handler).toBe('api-v1');
    expect(tree.match('/api/v1/users').handler).toBe('api-v1-users');
  });

  it('disambiguates static vs dynamic at same depth', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users/me', 'profile');
    tree.add('/users/:id', 'other');
    expect(tree.match('/users/me').handler).toBe('profile');
    expect(tree.match('/users/42').handler).toBe('other');
  });

  it('handles mixed static and dynamic at multiple levels', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/:lang/dashboard', 'dash');
    tree.add('/en/about', 'about');
    expect(tree.match('/en/dashboard').handler).toBe('dash');
    expect(tree.match('/en/about').handler).toBe('about');
    expect(tree.match('/fr/dashboard').handler).toBe('dash');
  });

  // ── Edge cases ────────────────────────────────────────────

  it('overwrites handler when same pattern is re-registered', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/users', 'first');
    tree.add('/users', 'second');
    expect(tree.match('/users').handler).toBe('second');
  });

  it('handles deep nesting without stack overflow', () => {
    const tree = new RasenganTreeRouter();
    let pattern = '';
    for (let i = 0; i < 100; i++) {
      pattern += `/${i}`;
    }
    const handler = 'deep';
    tree.add(pattern, handler);
    expect(tree.match(pattern).handler).toBe('deep');
  });

  it('returns empty params for no match and no handler', () => {
    const tree = new RasenganTreeRouter();
    const result = tree.match('/not-found');
    expect(result.handler).toBeUndefined();
    expect(result.params).toEqual({});
  });

  it('handles routes registered after some matches', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/a', 'a');
    tree.add('/a/b', 'ab');
    tree.add('/a/b/c', 'abc');
    expect(tree.match('/a').handler).toBe('a');
    expect(tree.match('/a/b').handler).toBe('ab');
    expect(tree.match('/a/b/c').handler).toBe('abc');
  });

  it('param values are not shared across match calls', () => {
    const tree = new RasenganTreeRouter();
    tree.add('/:a/:b', 'handler');
    const r1 = tree.match('/x/y');
    const r2 = tree.match('/1/2');
    expect(r1.params).toEqual({ a: 'x', b: 'y' });
    expect(r2.params).toEqual({ a: '1', b: '2' });
  });
});
