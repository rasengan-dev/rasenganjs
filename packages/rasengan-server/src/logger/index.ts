import type { LogEntry } from '@rasenganjs/runtime';

const fg = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
} as const;

function time(): string {
  return new Date().toISOString();
}

function colorMethod(method: string): string {
  switch (method) {
    case 'GET':
      return `${fg.green}${method}${fg.reset}`;
    case 'POST':
      return `${fg.blue}${method}${fg.reset}`;
    case 'PUT':
      return `${fg.yellow}${method}${fg.reset}`;
    case 'PATCH':
      return `${fg.cyan}${method}${fg.reset}`;
    case 'DELETE':
      return `${fg.red}${method}${fg.reset}`;
    case 'HEAD':
      return `${fg.magenta}${method}${fg.reset}`;
    case 'OPTIONS':
      return `${fg.gray}${method}${fg.reset}`;
    default:
      return method;
  }
}

function colorStatus(status: number): string {
  if (status === 0) return `${fg.red}${fg.bold}ERROR${fg.reset}`;
  const group = Math.floor(status / 100);
  switch (group) {
    case 2:
      return `${fg.green}${status}${fg.reset}`;
    case 3:
      return `${fg.cyan}${status}${fg.reset}`;
    case 4:
      return `${fg.yellow}${status}${fg.reset}`;
    case 5:
      return `${fg.red}${status}${fg.reset}`;
    default:
      return String(status);
  }
}

export function serverLogger(entry: LogEntry): void {
  const method = entry.method.padEnd(6);
  const coloredMethod = colorMethod(method);
  const coloredStatus = colorStatus(entry.status);
  const search = entry.search || '';
  const size = entry.size !== null ? ` ${entry.size}B` : '';

  console.log(
    `${fg.gray}[${time()}]${fg.reset} ${coloredMethod} ${entry.pathname}${search} ${coloredStatus} ${entry.duration}ms${size}`
  );
}

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
