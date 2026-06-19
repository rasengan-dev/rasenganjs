/**
 * Response utilities — ergonomic factories over the Web API
 * Response constructor.
 *
 * Every function returns a standard `Response` object so the
 * pipeline stays platform-agnostic.
 */

/**
 * Create a JSON Response.
 *
 * Thin wrapper around `Response.json()`.
 *
 * @param data — Any JSON-serialisable value
 * @param init — Optional status + headers overrides
 */
export function json(data: unknown, init?: ResponseInit): Response {
  return Response.json(data, init);
}

/**
 * Create a plain-text Response.
 *
 * @param value — Response body string
 * @param init  — Optional status + headers overrides
 */
export function text(value: string, init?: ResponseInit): Response {
  return new Response(value, init);
}

/**
 * Create an HTML Response with the correct Content-Type header.
 *
 * @param value — HTML string
 * @param init  — Optional status + headers overrides
 */
export function html(value: string, init?: ResponseInit): Response {
  return new Response(value, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
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
  return new Response(stream, {
    ...init,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      ...init?.headers,
    },
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
