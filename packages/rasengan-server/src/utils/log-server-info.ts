/**
 * Server startup banner — displays server info (URLs, version,
 * keyboard shortcuts) when the server starts listening.
 *
 * Zero dependencies — uses ANSI escape codes directly.
 */

import os from 'node:os';
import readline from 'node:readline';

const fg = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
} as const;

function getIPAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    const iface = interfaces[name];
    if (!iface) continue;
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '';
}

function getVersion(): string {
  // try {
  //   // const pkg = require('../../package.json');
  //   return '1.0.0';
  // } catch {
  return '1.0.0-beta.0';
  // }
}

let listening = false;

export function logServerInfo(port: number, host: string = '0.0.0.0'): void {
  const arrow = `${fg.green}\u2192${fg.reset}`;
  const version = getVersion();
  const isBun =
    typeof process !== 'undefined' &&
    typeof (process as any).versions?.bun === 'string';

  console.log('');
  console.log(
    `  ${fg.blue}${fg.bold}Rasengan Server${fg.reset} ${fg.gray}v${version}${fg.reset} ${fg.green}running${fg.reset}`
  );
  console.log('');

  const localHost = host === '0.0.0.0' ? 'localhost' : host;
  console.log(
    `  ${arrow} ${fg.bold}Local:${fg.reset}   ${fg.blue}http://${localHost}:${fg.bold}${port}${fg.reset}`
  );

  const ip = getIPAddress();
  if (ip) {
    console.log(
      `  ${arrow} ${fg.bold}Network:${fg.reset} ${fg.blue}http://${ip}:${fg.bold}${port}${fg.reset}`
    );
  }

  console.log(
    `  ${arrow} ${fg.bold}Runtime:${fg.reset} ${isBun ? 'Bun' : 'Node.js'}`
  );

  console.log('');
  console.log(
    `  ${arrow} ${fg.gray}Press${fg.reset} ${fg.bold}c${fg.reset} ${fg.gray}to clear the console${fg.reset}`
  );
  console.log(
    `  ${arrow} ${fg.gray}Press${fg.reset} ${fg.bold}ctrl+c${fg.reset} ${fg.gray}to stop the server${fg.reset}`
  );
  console.log('');

  if (!listening) {
    listening = true;
    setupKeypress(() => logServerInfo(port, host));
  }
}

function setupKeypress(log: () => void): void {
  if (!process.stdin.isTTY) return;

  readline.emitKeypressEvents(process.stdin);

  process.stdin.on('keypress', (_: string, key: any) => {
    if (!key) return;

    if (key.ctrl && key.name === 'c') {
      console.log(
        `\n  ${fg.green}ctrl+c${fg.reset} ${fg.gray}pressed — stopping server...${fg.reset}\n`
      );
      process.exit(0);
    }

    if (!key.ctrl && !key.meta && !key.shift && key.name === 'c') {
      console.clear();
      log();
    }
  });

  if (process.stdin.setRawMode instanceof Function) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
}
