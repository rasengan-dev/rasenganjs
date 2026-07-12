/**
 * Converts a Node.js `IncomingMessage` into a Web API `Request`.
 *
 * Split out from `server.ts` so both the HTTP request handler and the
 * WebSocket upgrade handler (`websocket.ts`) can depend on it without
 * creating a circular import between those two modules.
 */

import type http from 'node:http';

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

  // Only read body for methods that support it. Collected as raw bytes —
  // decoding to utf8 here would corrupt binary bodies (multipart file
  // uploads: every invalid sequence becomes U+FFFD and the file is
  // unreadable). Text bodies are unaffected by staying binary.
  let body: Uint8Array | undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await new Promise<Uint8Array>((resolve) => {
      const chunks: Buffer[] = [];
      req.on('data', (c: Buffer) => chunks.push(c));
      req.on('end', () => resolve(Buffer.concat(chunks)));
    });
    if (body.byteLength === 0) body = undefined;
  }

  return new Request(url, {
    method: req.method,
    headers: Object.entries(req.headers)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v!]),
    body: body ?? undefined,
  });
}
