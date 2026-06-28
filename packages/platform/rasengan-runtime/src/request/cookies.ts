/**
 * Request cookie parsing — read cookies from the incoming
 * Cookie header.
 */

/**
 * Parse the Cookie header into a plain key-value map.
 *
 * Handles:
 *   - Multiple cookies separated by "; "
 *   - URL-encoded names and values (decodeURIComponent)
 *
 * @example
 * ```ts
 * const cookies = parseCookies(request);
 * const session = cookies["session"];
 * ```
 */
export function parseCookies(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return {};

  const cookies: Record<string, string> = {};
  for (const part of cookieHeader.split(';')) {
    const eqIndex = part.indexOf('=');
    if (eqIndex === -1) continue;

    const name = part.slice(0, eqIndex).trim();
    const value = part.slice(eqIndex + 1).trim();

    if (!name) continue;

    cookies[decodeURIComponent(name)] = decodeURIComponent(value);
  }
  return cookies;
}

/**
 * Get a single cookie value by name.
 */
export function getCookie(request: Request, name: string): string | undefined {
  return parseCookies(request)[name];
}
