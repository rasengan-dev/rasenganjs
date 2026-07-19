/**
 * Converts a Node.js `IncomingMessage` into a Web API `Request`.
 *
 * Split out from `server.ts` so both the HTTP request handler and the
 * WebSocket upgrade handler (`websocket.ts`) can depend on it without
 * creating a circular import between those two modules.
 */

import type http from 'node:http';
import { Readable } from 'node:stream';

export async function incomingToRequest(
  req: http.IncomingMessage
): Promise<Request> {
  const protocol =
    (req.socket as unknown as { encrypted?: boolean }).encrypted ||
    req.headers['x-forwarded-proto'] === 'https'
      ? 'https'
      : 'http';
  const host = req.headers.host ?? 'localhost';
  const url = `${protocol}://${host}${req.url}`;

  // Build headers from the flat rawHeaders pairs — one loop, no
  // intermediate objects/arrays. `Headers` combines duplicate keys
  // per spec (including set-cookie handling). Synthetic messages
  // (tests, adapters) may lack rawHeaders — fall back to the
  // joined-object view.
  const raw = req.rawHeaders;
  let headers: Array<[string, string]>;
  if (raw !== undefined) {
    headers = new Array(raw.length / 2);
    for (let i = 0; i < raw.length; i += 2) {
      headers[i / 2] = [raw[i], raw[i + 1]];
    }
  } else {
    headers = [];
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      headers.push([key, Array.isArray(value) ? value.join(', ') : value]);
    }
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    return new Request(url, { method: req.method, headers });
  }

  // A body exists when the client declared one. Requests without a
  // body keep `request.body === null` (matching the previous
  // buffer-then-drop-empty behavior) so body-presence checks in
  // middleware are unaffected.
  const hasBody =
    req.headers['transfer-encoding'] !== undefined ||
    (req.headers['content-length'] !== undefined &&
      req.headers['content-length'] !== '0');

  if (!hasBody) {
    return new Request(url, { method: req.method, headers });
  }

  // Stream the socket through instead of buffering (RFC-0005, 3a):
  // the consumer (ctx.request.json(), upload streaming) reads the
  // bytes exactly once, with no copy held here. Binary bodies stay
  // byte-exact. `duplex` is required by undici for streamed bodies.
  return new Request(url, {
    method: req.method,
    headers,
    body: Readable.toWeb(req) as unknown as ReadableStream<Uint8Array>,
    duplex: 'half',
  } as RequestInit);
}
