import { describe, it, expect, afterEach, vi } from 'vitest';
import { Readable } from 'node:stream';
import type http from 'node:http';
import { incomingToRequest } from '../../../adapters/node/request.js';

function fakeIncoming(
  chunks: Buffer[],
  {
    method = 'POST',
    headers = {} as Record<string, string>,
  }: { method?: string; headers?: Record<string, string> } = {}
): http.IncomingMessage {
  const req = Readable.from(chunks) as unknown as http.IncomingMessage;
  req.method = method;
  req.url = '/upload';
  req.headers = { host: 'localhost', ...headers };
  // Real requests with a body always declare it — mirror HTTP
  // semantics so the streaming body path (RFC-0005, 3a) engages.
  const totalBytes = chunks.reduce((sum, c) => sum + c.byteLength, 0);
  if (totalBytes > 0 && !req.headers['content-length']) {
    req.headers['content-length'] = String(totalBytes);
  }
  req.rawHeaders = Object.entries(req.headers).flatMap(([k, v]) => [
    k,
    v as string,
  ]);
  (req as unknown as { socket: object }).socket = {};
  return req;
}

describe('incomingToRequest', () => {
  it('preserves binary bodies byte-for-byte (regression: utf8 decoding corrupted uploads)', async () => {
    // PNG magic + bytes that are invalid UTF-8 — a utf8 round-trip
    // replaces them with U+FFFD and the payload is destroyed.
    const binary = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0xff, 0xfe, 0x80, 0x81,
    ]);

    const request = await incomingToRequest(fakeIncoming([binary]));
    const received = new Uint8Array(await request.arrayBuffer());

    expect(Buffer.from(received).equals(binary)).toBe(true);
  });

  it('produces a Request whose formData() yields the original file bytes', async () => {
    const fileBytes = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0xff, 0xd8]);
    const boundary = 'testboundary123';
    const body = Buffer.concat([
      Buffer.from(
        `--${boundary}\r\n` +
          `Content-Disposition: form-data; name="avatar"; filename="a.png"\r\n` +
          `Content-Type: image/png\r\n\r\n`
      ),
      fileBytes,
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);

    const request = await incomingToRequest(
      fakeIncoming([body], {
        headers: {
          'content-type': `multipart/form-data; boundary=${boundary}`,
        },
      })
    );

    const form = await request.formData();
    const file = form.get('avatar') as File;
    expect(file).toBeInstanceOf(File);
    expect(
      Buffer.from(new Uint8Array(await file.arrayBuffer())).equals(fileBytes)
    ).toBe(true);
  });

  it('reads no body for GET requests', async () => {
    const request = await incomingToRequest(
      fakeIncoming([], { method: 'GET' })
    );
    expect(request.body).toBeNull();
  });

  it('treats an empty POST body as no body', async () => {
    const request = await incomingToRequest(fakeIncoming([]));
    expect(request.body).toBeNull();
  });
});

describe('incomingToRequest with RASENGAN_LAZY_REQUEST=1 (RFC-0005, Phase 3b)', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns a lazy shim for GET that is instanceof Request', async () => {
    vi.stubEnv('RASENGAN_LAZY_REQUEST', '1');

    const request = await incomingToRequest(
      fakeIncoming([], {
        method: 'GET',
        headers: { 'x-test': 'value' },
      })
    );

    expect(request).toBeInstanceOf(Request);
    expect(request.method).toBe('GET');
    expect(request.url).toBe('http://localhost/upload');
    expect(request.headers.get('x-test')).toBe('value');
    expect(request.body).toBeNull();
  });

  it('returns a lazy shim for HEAD', async () => {
    vi.stubEnv('RASENGAN_LAZY_REQUEST', '1');

    const request = await incomingToRequest(
      fakeIncoming([], { method: 'HEAD' })
    );

    expect(request).toBeInstanceOf(Request);
    expect(request.method).toBe('HEAD');
  });

  it('leaves POST on the eager (non-lazy) path unaffected', async () => {
    vi.stubEnv('RASENGAN_LAZY_REQUEST', '1');

    const request = await incomingToRequest(
      fakeIncoming([Buffer.from('hello')], {
        headers: { 'content-type': 'text/plain' },
      })
    );

    expect(await request.text()).toBe('hello');
  });

  it('falls back to eager construction when the flag is unset', async () => {
    const request = await incomingToRequest(
      fakeIncoming([], { method: 'GET' })
    );

    expect(request).toBeInstanceOf(Request);
    expect(request.body).toBeNull();
  });
});
