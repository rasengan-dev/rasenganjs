import { describe, it, expect } from 'vitest';
import {
  createLazyRequest,
  materializeRequest,
  MATERIALIZE,
} from '../../../adapters/node/lazy-request.js';

describe('createLazyRequest (RFC-0005, Phase 3b)', () => {
  it('is an instanceof Request', () => {
    const req = createLazyRequest('http://localhost/', 'GET', []);
    expect(req).toBeInstanceOf(Request);
  });

  it('reads method/url without materializing the real Request', () => {
    const req = createLazyRequest('http://localhost/foo', 'HEAD', [
      ['x-test', '1'],
    ]);

    // Accessing method/url must not touch the materialize hook.
    expect(req.method).toBe('HEAD');
    expect(req.url).toBe('http://localhost/foo');

    const before = (req as unknown as { [MATERIALIZE]: () => Request })[
      MATERIALIZE
    ];
    const first = before.call(req);
    const second = before.call(req);
    // Memoized: touching the real Request twice returns the same instance.
    expect(first).toBe(second);
  });

  it('materializes on headers access and reflects the same headers', () => {
    const req = createLazyRequest('http://localhost/', 'GET', [
      ['x-test', '1'],
      ['x-other', '2'],
    ]);

    expect(req.headers.get('x-test')).toBe('1');
    expect(req.headers.get('x-other')).toBe('2');
  });

  it('has a null body for GET, matching a real Request', () => {
    const req = createLazyRequest('http://localhost/', 'GET', []);
    expect(req.body).toBeNull();
  });

  it('supports clone()', async () => {
    const req = createLazyRequest('http://localhost/', 'GET', [
      ['x-test', '1'],
    ]);
    const clone = req.clone();
    expect(clone).toBeInstanceOf(Request);
    expect(clone.headers.get('x-test')).toBe('1');
    expect(clone.url).toBe(req.url);
  });

  it('supports json()/text() (empty body, matching a real GET Request)', async () => {
    const req = createLazyRequest('http://localhost/', 'GET', []);
    expect(await req.text()).toBe('');
  });
});

describe('materializeRequest', () => {
  it('returns a real Request unchanged', () => {
    const real = new Request('http://localhost/');
    expect(materializeRequest(real)).toBe(real);
  });

  it('resolves a lazy shim into a real Request that new Request() can consume', () => {
    // Node's native Request constructor reads internal slots directly —
    // handing it the lazy shim as `input` throws. This is the exact
    // hazard the RFC calls out; materializeRequest() must prevent it.
    const lazy = createLazyRequest('http://localhost/', 'GET', [
      ['x-test', '1'],
    ]);

    const real = materializeRequest(lazy);
    expect(
      () => new Request(real, { headers: { 'x-extra': '2' } })
    ).not.toThrow();

    const rebuilt = new Request(real, { headers: { 'x-extra': '2' } });
    expect(rebuilt.headers.get('x-extra')).toBe('2');
  });
});
