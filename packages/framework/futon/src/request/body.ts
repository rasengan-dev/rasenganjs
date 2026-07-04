/**
 * Body parsing utilities — turn the raw Request body into
 * usable data structures.
 *
 * These are designed as standalone async functions so you
 * can use them inside route handlers directly, or compose
 * them into middleware for automatic parsing.
 *
 * IMPORTANT: the Request body is a ReadableStream.  Once
 * consumed, it cannot be re-read.  Parsers should be called
 * once per request, preferably early in the middleware chain.
 */

/**
 * Parse the request body as JSON.
 *
 * @throws {SyntaxError} If the body is not valid JSON
 */
export async function parseJson<T = unknown>(request: Request): Promise<T> {
  const text = await request.text();
  if (!text) return undefined as unknown as T;
  return JSON.parse(text) as T;
}

/**
 * Parse the request body as URL-encoded form data
 * (Content-Type: application/x-www-form-urlencoded).
 */
export async function parseUrlEncoded(
  request: Request
): Promise<Record<string, string>> {
  const text = await request.text();
  if (!text) return {};

  const params: Record<string, string> = {};
  for (const part of text.split('&')) {
    const eqIndex = part.indexOf('=');
    if (eqIndex === -1) {
      params[decodeURIComponent(part)] = '';
    } else {
      const key = decodeURIComponent(part.slice(0, eqIndex));
      const value = decodeURIComponent(part.slice(eqIndex + 1));
      params[key] = value;
    }
  }
  return params;
}

/**
 * Parse the request body as multipart/form-data.
 *
 * Returns the native FormData object.  For file uploads,
 * use `.get("field")` and check `instanceof File`.
 */
export async function parseFormData(request: Request): Promise<FormData> {
  return request.formData();
}

/**
 * Parse the request body as plain text.
 */
export async function parseText(request: Request): Promise<string> {
  return request.text();
}

/**
 * Auto-detect the content type and parse accordingly.
 *
 * Content-Type detection:
 *   - application/json        → JSON
 *   - application/x-www-form-urlencoded → URL-encoded
 *   - multipart/form-data     → FormData
 *   - text/*                  → text
 *   - otherwise               → text
 */
export async function parseBody<T = unknown>(
  request: Request
): Promise<T | Record<string, string> | FormData | string> {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';

  if (contentType.includes('application/json')) {
    return parseJson<T>(request);
  }
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return parseUrlEncoded(request);
  }
  if (contentType.includes('multipart/form-data')) {
    return parseFormData(request);
  }
  return parseText(request);
}
