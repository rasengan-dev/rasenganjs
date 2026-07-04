import { describe, it, expect } from 'vitest';
import {
  getPathname,
  getQueryParams,
  getQueryParam,
} from '../../../request/index.js';

describe('getPathname', () => {
  it('extracts pathname from request URL', () => {
    const req = new Request('http://localhost/users/42');
    expect(getPathname(req)).toBe('/users/42');
  });
});

describe('getQueryParams', () => {
  it('parses query params from request', () => {
    const req = new Request('http://localhost?foo=bar&baz=qux');
    expect(getQueryParams(req)).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('returns empty object when no query', () => {
    const req = new Request('http://localhost');
    expect(getQueryParams(req)).toEqual({});
  });
});

describe('getQueryParam', () => {
  it('returns a single query param', () => {
    const req = new Request('http://localhost?page=1');
    expect(getQueryParam(req, 'page')).toBe('1');
  });

  it('returns null for missing param', () => {
    const req = new Request('http://localhost');
    expect(getQueryParam(req, 'nope')).toBeNull();
  });
});
