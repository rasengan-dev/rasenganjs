/**
 * Express adapter — bridges the WinterCG pipeline to an
 * Express request/response pair.
 *
 * The adapter:
 *   1. Reads the Express req + res and constructs a Web API
 *      Request.
 *   2. Calls `app.fetch(request, runtime)`.
 *   3. Writes the Response status, headers, and body back
 *      to the Express response object.
 *
 * @example
 * ```ts
 * import express from "express";
 * import { Application, toExpressHandler } from "@rasenganjs/runtime";
 *
 * const app = new Application();
 * // ... set up routes and middleware
 *
 * const expressApp = express();
 * expressApp.use(toExpressHandler(app));
 * expressApp.listen(3000);
 * ```
 *
 * For streaming (SSR), the adapter pipes the Web Response body
 * directly to the Node response socket.
 */

import type { Application } from '../app/index.js';
import type { RuntimeContext } from '../context/types.js';

// Minimal Express-compatible type signatures so we don't need
// @types/express at build time.
interface ExpressRequest {
  method: string;
  url: string;
  headers: Record<string, string | string[] | undefined>;
  /** Incoming body (if already parsed by Express middleware) */
  body?: unknown;
  /** Raw readable stream (Node IncomingMessage is a Readable) */
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
}

interface ExpressResponse {
  statusCode: number;
  status: (code: number) => ExpressResponse;
  setHeader: (name: string, value: string) => void;
  getHeader: (name: string) => string | undefined;
  end: (chunk?: unknown) => void;
  write: (chunk: unknown) => void;
  /** Express 4.x uses this for stream piping */
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
}

type ExpressNextFunction = (err?: unknown) => void;

/**
 * Convert a Rasengan Application into an Express request
 * handler `(req, res, next)`.
 */
export function toExpressHandler(app: Application, runtime?: RuntimeContext) {
  return async (
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction
  ): Promise<void> => {
    try {
      // ── 1. Build a Web API Request from Express req ────
      const request = await createWebRequest(req);
      const mergedRuntime: RuntimeContext = {
        ...runtime,
        env: {
          ...runtime?.env,
        },
      };

      // ── 2. Run through the Rasengan pipeline ───────────
      const response = await app.fetch(request, mergedRuntime);

      // ── 3. Write the Response back to Express ──────────
      await sendWebResponse(res, response);
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Convert an Express IncomingMessage to a Web API Request.
 */
async function createWebRequest(req: ExpressRequest): Promise<Request> {
  const protocol = (req.headers['x-forwarded-proto'] as string) ?? 'http';
  const host = (req.headers['host'] as string) ?? 'localhost';
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }

  // Construct the body.  For GET/HEAD we pass null.
  let body: ReadableStream<Uint8Array> | null = null;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    // If a body-parser middleware already consumed it, wrap the
    // parsed body as JSON text.
    if (req.body !== undefined && req.body !== null) {
      body = new Blob([
        JSON.stringify(req.body),
      ]).stream() as unknown as ReadableStream<Uint8Array>;
    } else if (typeof req.on === 'function') {
      // Convert the Node Readable stream to a Web ReadableStream
      body = nodeReadableToWebStream(req as unknown as NodeJS.ReadableStream);
    }
  }

  return new Request(url, {
    method: req.method,
    headers,
    body,
    // Express connections don't have a signal, but we keep the
    // default which is no abort.
  });
}

/**
 * Write a Web API Response to the Express response object.
 */
async function sendWebResponse(
  res: ExpressResponse,
  response: Response
): Promise<void> {
  res.status(response.status);

  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (response.body) {
    // Stream the body to the Node response
    const reader = response.body.getReader();
    const pump = async (): Promise<void> => {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        return;
      }
      res.write(value);
      await pump();
    };
    await pump();
  } else {
    res.end();
  }
}

/**
 * Convert a Node.js Readable stream into a Web API
 * ReadableStream.
 */
function nodeReadableToWebStream(
  readable: NodeJS.ReadableStream
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      readable.on('data', (chunk: Buffer | string) => {
        controller.enqueue(
          typeof chunk === 'string' ? Buffer.from(chunk) : chunk
        );
      });
      readable.on('end', () => controller.close());
      readable.on('error', (err: Error) => controller.error(err));
    },
  });
}
