import { describe, it, expect } from 'vitest';
import { parseCookies, getCookie } from '../../../request/cookies.js';

describe('parseCookies', () => {
  it('parses a single cookie', () => {
    const req = new Request('http://localhost', {
      headers: { Cookie: 'session=abc123' },
    });
    expect(parseCookies(req)).toEqual({ session: 'abc123' });
  });

  it('parses multiple cookies', () => {
    const req = new Request('http://localhost', {
      headers: { Cookie: 'a=1; b=2; c=3' },
    });
    expect(parseCookies(req)).toEqual({ a: '1', b: '2', c: '3' });
  });

  it('decodes URL-encoded names and values', () => {
    const req = new Request('http://localhost', {
      headers: { Cookie: 'hello%20world=foo%20bar' },
    });
    expect(parseCookies(req)).toEqual({ 'hello world': 'foo bar' });
  });

  it('returns empty object when no Cookie header', () => {
    const req = new Request('http://localhost');
    expect(parseCookies(req)).toEqual({});
  });

  it('skips malformed cookie segments', () => {
    const req = new Request('http://localhost', {
      headers: { Cookie: 'valid=ok; malformed; also=good' },
    });
    expect(parseCookies(req)).toEqual({ valid: 'ok', also: 'good' });
  });
});

describe('getCookie', () => {
  it('returns a single cookie value', () => {
    const req = new Request('http://localhost', {
      headers: { Cookie: 'session=abc123' },
    });
    expect(getCookie(req, 'session')).toBe('abc123');
  });

  it('returns undefined for missing cookie', () => {
    const req = new Request('http://localhost');
    expect(getCookie(req, 'nonexistent')).toBeUndefined();
  });
});
