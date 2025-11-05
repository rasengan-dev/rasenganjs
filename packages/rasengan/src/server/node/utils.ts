import type * as Express from 'express';
import { EventEmitter } from 'node:events';
import { Readable } from 'node:stream';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import chalk from 'chalk';
import {
  createReadableStreamFromReadable,
  writeReadableStreamToWritable,
} from './stream.js';

/**
 * This function is used to create a Rasengan request from an Express request.
 * Reference: https://github.com/remix-run/react-router/blob/main/packages/react-router-express/server.ts#L86
 */
export default function createRasenganRequest(
  req: Express.Request,
  res: Express.Response
) {
  // req.hostname doesn't include port information so grab that from
  // `X-Forwarded-Host` or `Host`
  let [, hostnamePort] = req.get('X-Forwarded-Host')?.split(':') ?? [];
  let [, hostPort] = req.get('host')?.split(':') ?? [];
  let port = hostnamePort || hostPort;
  // Use req.hostname here as it respects the "trust proxy" setting
  let resolvedHost = `${req.hostname}${port ? `:${port}` : ''}`;
  // Use `req.originalUrl` so Remix is aware of the full path
  let url = new URL(`${req.protocol}://${resolvedHost}${req.originalUrl}`);

  // Abort action/loaders once we can no longer write a response
  let controller: AbortController | null = new AbortController();

  // Abort action/loaders once we can no longer write a response iff we have
  // not yet sent a response (i.e., `close` without `finish`)
  // `finish` -> done rendering the response
  // `close` -> response can no longer be written to
  res.on('finish', () => (controller = null));
  res.on('close', () => controller?.abort());

  let init: RequestInit = {
    method: req.method,
    headers: createRasenganHeaders(req.headers),
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = createReadableStreamFromReadable(req);
    (init as { duplex: 'half' }).duplex = 'half';
  }

  return new Request(url.href, init);
}

/**
 * This function is used to send a Rasengan response to an Express response.
 * @param res
 * @param nodeResponse
 */
export async function sendRasenganResponse(
  res: Express.Response,
  nodeResponse: Response
): Promise<void> {
  try {
    // Set status and status message
    res.statusMessage = nodeResponse.statusText;
    res.status(nodeResponse.status);

    // Set headers
    for (let [key, value] of nodeResponse.headers.entries()) {
      res.append(key, value);
    }

    // Handle Server-Sent Events (SSE)
    if (
      nodeResponse.headers.get('Content-Type')?.match(/text\/event-stream/i)
    ) {
      res.flushHeaders();
    }

    // Write the response body if available
    if (nodeResponse.body) {
      await writeReadableStreamToWritable(nodeResponse.body, res);
    } else {
      res.end();
    }
  } catch (error) {
    // Log the error (optional)
    console.error('Error while sending response:', error);

    // Send a 500 Internal Server Error response with error details
    res.status(500).send({
      message: 'An error occurred while processing the response.',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

/**
 * This function is used to create a Rasengan headers from Express request headers.
 * @param requestHeaders
 * @returns
 */
export function createRasenganHeaders(
  requestHeaders: Record<string, string | string[]>
) {
  let headers = new Headers();

  for (let [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  return headers;
}

/**
 * Creates a fake Express-like request and response for static prerendering.
 * This mimics the shape expected by `createRasenganRequest(req, res)`.
 */
export function createFakeRasenganRequest(
  pathname: string,
  options?: {
    host?: string;
    protocol?: 'http' | 'https';
    method?: string;
    headers?: Record<string, string>;
    body?: string | Buffer;
  }
) {
  const {
    host = 'localhost:5320',
    protocol = 'http',
    method = 'GET',
    headers = {},
    body,
  } = options ?? {};

  // --- Fake Request ---
  const req = {
    originalUrl: pathname.startsWith('/') ? pathname : `/${pathname}`,
    method,
    protocol,
    hostname: host.split(':')[0],
    headers,
    get(headerName: string) {
      const key = headerName.toLowerCase();
      if (key === 'x-forwarded-host') return host;
      if (key === 'host') return host;
      return headers[key];
    },
  } as any;

  // If a body exists, attach it as a readable stream (like Express req)
  if (body) {
    const readable = Readable.from([body]);
    Object.assign(req, readable);
  }

  // --- Fake Response ---
  const res = new EventEmitter() as any;
  res.on = res.addListener; // mimic Express style
  res.write = () => true;
  res.end = () => {
    res.emit('finish');
  };

  // Utility to simulate stream end
  process.nextTick(() => {
    res.emit('close');
  });

  return { req, res };
}

/**
 * Log formatted and grouped HTML build output, similar to Vite/Next.js style.
 * @param files List of absolute or relative HTML file paths
 */
export async function logRenderedPagesGrouped(files: string[]) {
  const rows: {
    file: string;
    size: number;
    gzip: number;
  }[] = [];

  // Collect all files data
  for (const file of files) {
    try {
      const content = fs.readFileSync(file);
      const size = content.length;
      const gzipSize = zlib.gzipSync(content).length;
      const relative = path.relative(process.cwd(), file);
      rows.push({ file: relative, size, gzip: gzipSize });
    } catch (e) {
      console.error(`❌ Failed to read file: ${file}`, e);
    }
  }

  // Sort by folder then by size
  rows.sort((a, b) => a.file.localeCompare(b.file));

  // Group by first-level directory (after dist/)
  const groups = new Map<string, typeof rows>();

  for (const row of rows) {
    const parts = row.file.split(path.sep);
    const baseFolder =
      parts.length > 2 && parts[1] !== 'assets' ? parts[1] : 'root';
    if (!groups.has(baseFolder)) groups.set(baseFolder, []);
    groups.get(baseFolder)!.push(row);
  }

  console.log();

  // Compute max filename length for nice column alignment
  const longestPath = Math.max(...rows.map((r) => r.file.length));

  for (const [folder, group] of groups) {
    console.log(
      chalk.bold.blueBright(`📁 ${folder === 'root' ? '/' : '/' + folder}`)
    );
    for (const { file, size, gzip } of group) {
      const paddedFile = chalk.white(file.padEnd(longestPath + 4, ' '));
      const sizeStr = chalk.yellow(formatSize(size));
      const gzipStr = chalk.gray(formatSize(gzip));
      console.log(`   ${paddedFile}${sizeStr} │ gzip: ${gzipStr}`);
    }
    console.log();
  }

  console.log(chalk.blueBright('🎉 Static generation completed.\n'));
}

/**
 * Convert bytes into human-readable units.
 */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes.toFixed(2)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} kB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/**
 * Match a route pattern like "/blog/**" or "/profile"
 * to a list of available page paths.
 */
export function filterRoutesForPrerender(
  routes: string[],
  availablePages: string[]
) {
  // Convert route patterns to RegExp
  const routeRegexList = routes.map((route) => {
    // Escape regex special chars except for *
    const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Replace wildcard `**` with `.*` (match anything after)
    const regexStr = '^' + escaped.replace(/\\\*\\\*/g, '.*') + '$';
    return new RegExp(regexStr);
  });

  // Filter pages that match at least one route pattern
  const matchedPages = availablePages.filter((page) =>
    routeRegexList.some((regex) => regex.test(page))
  );

  // Remove duplicates, add /* for 404 page and sort
  return [...new Set([...matchedPages, '/*'])].sort();
}

// Convert seconds to minutes and seconds
export function convertSecondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    if (remainingSeconds < 1) {
      return `${remainingSeconds * 1000}ms`;
    }
    return `${remainingSeconds.toFixed(2)}s`;
  }

  return `${minutes}m ${remainingSeconds.toFixed(2)}s`;
}
