/**
 * Request URL helpers — convenience wrappers around the
 * Web API URL constructor.
 */

/** Extract the pathname from a Request */
export function getPathname(request: Request): string {
  return new URL(request.url).pathname;
}

/** Parse query string into a plain object */
export function getQueryParams(request: Request): Record<string, string> {
  const params: Record<string, string> = {};
  new URL(request.url).searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/** Get a single query parameter by key (or null) */
export function getQueryParam(request: Request, key: string): string | null {
  return new URL(request.url).searchParams.get(key);
}
