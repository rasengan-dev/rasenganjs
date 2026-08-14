/**
 * Response utilities — ergonomic factories over the Web API
 * Response constructor.
 *
 * Every function returns a standard `Response` object so the
 * pipeline stays platform-agnostic.
 */

/**
 * Registry symbol carrying a Response's raw single-buffer body.
 *
 * Runtime adapters (RFC-0005, Phase 2) look this up via
 * `Symbol.for('rasenganjs.response.rawBody')` and, when present,
 * write the body with a single `res.end(raw)` instead of pumping
 * the web stream. `Symbol.for` keeps this working across package
 * boundaries without an import edge from @rasenganjs/runtime.
 *
 * Only ever attach a value that is byte-identical to the
 * Response's actual body — the adapter trusts it blindly.
 */
export const RAW_BODY = Symbol.for('rasenganjs.response.rawBody');

function tagRawBody(res: Response, raw: string): Response {
  (res as Response & { [RAW_BODY]?: string })[RAW_BODY] = raw;
  return res;
}

/**
 * Create a JSON Response.
 *
 * Behaves like `Response.json()` (init-provided Content-Type wins,
 * otherwise `application/json`), but serialises once and tags the
 * Response with its raw body for the adapter fast path.
 *
 * @param data — Any JSON-serialisable value
 * @param init — Optional status + headers overrides
 */
export function json(data: unknown, init?: ResponseInit): Response {
  const payload = JSON.stringify(data);
  if (payload === undefined) {
    // Match Response.json(undefined)
    throw new TypeError('The data is not JSON serializable');
  }

  const res = new Response(payload, init);
  if (!init?.headers || !new Headers(init.headers).has('content-type')) {
    res.headers.set('content-type', 'application/json');
  }
  return tagRawBody(res, payload);
}

/**
 * Create a plain-text Response.
 *
 * @param value — Response body string
 * @param init  — Optional status + headers overrides
 */
export function text(value: string, init?: ResponseInit): Response {
  return tagRawBody(new Response(value, init), value);
}

/**
 * Create an HTML Response with the correct Content-Type header.
 *
 * @param value — HTML string
 * @param init  — Optional status + headers overrides
 */
export function html(value: string, init?: ResponseInit): Response {
  // Built via a real Headers instance, not a plain-object spread:
  // `init.headers` can already carry a differently-cased
  // 'content-type' key (e.g. from Object.fromEntries(someHeaders)),
  // and `{...init.headers, 'Content-Type': ...}` would keep BOTH as
  // distinct object properties — Headers' own fill algorithm then
  // appends both, producing a genuinely malformed, duplicated
  // Content-Type value. `Headers.set()` is case-insensitive and
  // can't produce that.
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');

  return tagRawBody(
    new Response(value, {
      ...init,
      headers,
    }),
    value
  );
}

/**
 * Create a redirect Response (default 302 Found).
 *
 * Uses manual construction instead of `Response.redirect()` to
 * guarantee relative URLs work in every runtime (Node, Bun,
 * Workers, Deno).
 *
 * @param url    — Redirect target (absolute or relative)
 * @param status — HTTP status (301 | 302 | 307 | 308)
 */
export function redirect(url: string, status: number = 302): Response {
  const headers = new Headers();
  headers.set('Location', url);
  return new Response(null, { status, headers });
}

/**
 * Create a status-only Response (no body).
 *
 * @param code — HTTP status code
 * @param body — Optional body text
 */
export function status(code: number, body?: string): Response {
  return new Response(body, { status: code });
}

/**
 * Shorthand for a 404 Not Found response.
 *
 * @param body — Optional body text (default "Not Found")
 */
export function notFound(body?: string): Response {
  return status(404, body || 'Not Found');
}

/**
 * Create a streaming Response from a ReadableStream.
 *
 * Critical for SSR — React's `renderToPipeableStream` produces
 * a pipeable stream that this helper wraps into a standard
 * Response.
 *
 * @example
 * ```ts
 * import { renderToPipeableStream } from "react-dom/server";
 *
 * app.get("/", async (ctx) => {
 *   const stream = renderToPipeableStream(<App />, {
 *     onShellReady() {
 *       resolve(stream);
 *     },
 *   });
 *   return streamResponse(stream, { status: 200 });
 * });
 * ```
 *
 * @param stream — A ReadableStream (or object with `.pipe()`)
 * @param init   — Optional status + headers
 */
export function streamResponse(
  stream: ReadableStream<Uint8Array>,
  init?: ResponseInit
): Response {
  // No explicit Transfer-Encoding: it's hop-by-hop, the runtime sets it
  // itself for a streamed body, never something user code sets on a
  // Fetch API Response.
  //
  // Headers built via a real Headers instance, not a plain-object
  // spread: `init.headers` can already carry a differently-cased
  // 'content-type' key (e.g. rasengan's extractHeadersFromRRContext
  // hands this a plain object produced by
  // Object.fromEntries(someHeaders), always lowercase), and
  // `{'Content-Type': ..., ...init.headers}` would keep BOTH as
  // distinct object properties — Headers' own fill algorithm then
  // appends both, producing a genuinely malformed, duplicated
  // Content-Type value (`text/html; charset=utf-8, text/html;
  // charset=utf-8`). Node/undici silently tolerates that; workerd's
  // HTMLRewriter-based response post-processing (e.g. wrangler dev's
  // live-reload injection) does not, and fails the whole response
  // with "Parser error: Unknown character encoding has been
  // provided" — confirmed by reproducing and fixing exactly this.
  const headers = new Headers(init?.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'text/html; charset=utf-8');
  }

  return new Response(stream, {
    ...init,
    headers,
  });
}

/**
 * Create a Response from a Node.js-style readable stream
 * by wrapping it in a Web API ReadableStream.
 *
 * Bridges the gap between Node streams (used by React SSR)
 * and the Web API Response.
 *
 * @param nodeStream — An object with `on('data')` / `on('end')` /
 *                     `on('error')` pattern (e.g. React's pipeable)
 * @param init       — Optional status + headers
 */
export function nodeStreamToResponse(
  nodeStream: {
    pipe: (destination: WritableStream<Uint8Array>) => void;
    on?: (event: string, handler: (...args: unknown[]) => void) => void;
  },
  init?: ResponseInit
): Response {
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  nodeStream.pipe(writable);
  return streamResponse(readable, init);
}
