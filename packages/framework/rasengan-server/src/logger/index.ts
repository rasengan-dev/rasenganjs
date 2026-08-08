import type { LogEntry } from '@rasenganjs/futon';
import {
  green,
  yellow,
  blue,
  magenta,
  cyan,
  red,
  gray,
  bold,
} from '../utils/color.js';

/**
 * Return the current UTC timestamp in ISO 8601 format.
 */
function time(): string {
  return new Date().toISOString();
}

/**
 * Return an ANSI-coloured HTTP method string for terminal output.
 */
function colorMethod(method: string): string {
  switch (method) {
    case 'GET':
      return green(method);
    case 'POST':
      return blue(method);
    case 'PUT':
      return yellow(method);
    case 'PATCH':
      return cyan(method);
    case 'DELETE':
      return red(method);
    case 'HEAD':
      return magenta(method);
    case 'OPTIONS':
      return gray(method);
    default:
      return method;
  }
}

/**
 * Return an ANSI-coloured HTTP status code string for terminal output.
 */
function colorStatus(status: number): string {
  if (status === 0) return bold(red('ERROR'));
  const group = Math.floor(status / 100);
  switch (group) {
    case 2:
      return green(String(status));
    case 3:
      return cyan(String(status));
    case 4:
      return yellow(String(status));
    case 5:
      return red(String(status));
    default:
      return String(status);
  }
}

/**
 * Colorful development-friendly request logger.
 */
export function serverLogger(entry: LogEntry): void {
  const method = entry.method.padEnd(6);
  const coloredMethod = colorMethod(method);
  const coloredStatus = colorStatus(entry.status);
  const search = entry.search || '';
  const size = entry.size !== null ? ` ${entry.size}B` : '';

  console.log(
    `${gray(`[${time()}]`)} ${coloredMethod} ${entry.pathname}${search} ${coloredStatus} ${entry.duration}ms${size}`
  );
}

/**
 * Minimal JSON-format request logger, suitable for production log
 * ingestion (e.g. CloudWatch, Datadog, ELK).
 *
 * @param entry - The log entry emitted by the runtime logger middleware.
 */
export function serverLoggerMinimal(entry: LogEntry): void {
  const msg = JSON.stringify({
    time: new Date().toISOString(),
    method: entry.method,
    path: entry.pathname + entry.search,
    status: entry.status,
    duration: entry.duration,
    size: entry.size,
  });
  console.log(msg);
}
