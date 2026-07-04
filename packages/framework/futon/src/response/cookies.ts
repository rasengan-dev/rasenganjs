/**
 * Response cookie helpers — set cookies on outbound Responses.
 *
 * These follow the Set-Cookie spec and let you compose
 * multiple cookies on a single response.
 */

/** Options for setting a cookie */
export interface CookieOptions {
  /** Domain the cookie belongs to */
  domain?: string;
  /** URL path the cookie applies to (default "/") */
  path?: string;
  /** Lifetime in seconds (omitted = session cookie) */
  maxAge?: number;
  /** Whether the cookie is HTTP-only (not readable by JS) */
  httpOnly?: boolean;
  /** Whether the cookie requires HTTPS */
  secure?: boolean;
  /** SameSite policy */
  sameSite?: 'Strict' | 'Lax' | 'None';
  /** Explicit expiration date */
  expires?: Date;
}

/**
 * Serialise a cookie name/value pair with options into a
 * Set-Cookie header value string.
 */
export function serializeCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): string {
  const parts: string[] = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
  ];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${Math.floor(options.maxAge)}`);
  }
  if (options.domain) {
    parts.push(`Domain=${options.domain}`);
  }
  if (options.path !== undefined) {
    parts.push(`Path=${options.path}`);
  } else {
    parts.push('Path=/');
  }
  if (options.expires) {
    parts.push(`Expires=${options.expires.toUTCString()}`);
  }
  if (options.httpOnly) {
    parts.push('HttpOnly');
  }
  if (options.secure) {
    parts.push('Secure');
  }
  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }

  return parts.join('; ');
}

/**
 * Set a cookie on a Response and return a new Response
 * (head and body are preserved).
 *
 * @example
 * ```ts
 * const res = json({ ok: true });
 * return setCookie(res, "session", token, {
 *   httpOnly: true,
 *   secure: true,
 *   maxAge: 86400,
 * });
 * ```
 */
export function setCookie(
  response: Response,
  name: string,
  value: string,
  options: CookieOptions = {}
): Response {
  const header = serializeCookie(name, value, options);
  const headers = new Headers(response.headers);
  headers.append('Set-Cookie', header);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Clear a cookie by setting Max-Age=0.
 */
export function clearCookie(
  response: Response,
  name: string,
  options: CookieOptions = {}
): Response {
  return setCookie(response, name, '', { ...options, maxAge: 0 });
}
