import { describe, it, expect } from 'vitest';
import {
  serializeCookie,
  setCookie,
  clearCookie,
} from '../../../response/cookies.js';
import { json } from '../../../response/utils.js';

describe('serializeCookie', () => {
  it('serializes name and value', () => {
    const result = serializeCookie('session', 'abc123');
    expect(result).toContain('session=abc123');
    expect(result).toContain('Path=/');
  });

  it('encodes special characters', () => {
    const result = serializeCookie('name', 'hello world');
    expect(result).toContain('hello%20world');
  });

  it('includes maxAge when provided', () => {
    const result = serializeCookie('k', 'v', { maxAge: 3600 });
    expect(result).toContain('Max-Age=3600');
  });

  it('includes domain when provided', () => {
    const result = serializeCookie('k', 'v', { domain: 'example.com' });
    expect(result).toContain('Domain=example.com');
  });

  it('includes custom path', () => {
    const result = serializeCookie('k', 'v', { path: '/app' });
    expect(result).toContain('Path=/app');
  });

  it('includes HttpOnly flag', () => {
    const result = serializeCookie('k', 'v', { httpOnly: true });
    expect(result).toContain('HttpOnly');
  });

  it('includes Secure flag', () => {
    const result = serializeCookie('k', 'v', { secure: true });
    expect(result).toContain('Secure');
  });

  it('includes SameSite attribute', () => {
    const result = serializeCookie('k', 'v', { sameSite: 'Strict' });
    expect(result).toContain('SameSite=Strict');
  });

  it('includes Expires date', () => {
    const date = new Date('2026-01-01');
    const result = serializeCookie('k', 'v', { expires: date });
    expect(result).toContain('Expires=');
    expect(result).toContain('2026');
  });

  it('omits optional fields when not set', () => {
    const result = serializeCookie('k', 'v');
    expect(result).not.toContain('Max-Age');
    expect(result).not.toContain('Domain');
    expect(result).not.toContain('HttpOnly');
    expect(result).not.toContain('Secure');
    expect(result).not.toContain('SameSite');
    expect(result).not.toContain('Expires');
  });
});

describe('setCookie', () => {
  it('appends Set-Cookie header to response', () => {
    const res = json({ ok: true });
    const updated = setCookie(res, 'token', 'abc');

    const cookies = updated.headers.getSetCookie?.() ?? [
      updated.headers.get('set-cookie')!,
    ];
    expect(cookies.length).toBeGreaterThan(0);
    expect(cookies[0]).toContain('token=abc');
  });

  it('preserves original response status and body', async () => {
    const res = json({ ok: true }, { status: 201 });
    const updated = setCookie(res, 'k', 'v');

    expect(updated.status).toBe(201);
    expect(await updated.json()).toEqual({ ok: true });
  });

  it('appends multiple cookies', () => {
    let res = json({});
    res = setCookie(res, 'a', '1');
    res = setCookie(res, 'b', '2');

    const cookies = res.headers.getSetCookie?.() ?? [];
    if (cookies.length > 0) {
      expect(cookies).toHaveLength(2);
    } else {
      const raw = res.headers.get('set-cookie')!;
      expect(raw).toContain('a=1');
      expect(raw).toContain('b=2');
    }
  });
});

describe('clearCookie', () => {
  it('sets Max-Age=0 to clear a cookie', () => {
    const res = json({});
    const updated = clearCookie(res, 'session');

    const cookie = updated.headers.get('set-cookie') ?? '';
    expect(cookie).toContain('session=');
    expect(cookie).toContain('Max-Age=0');
  });
});
