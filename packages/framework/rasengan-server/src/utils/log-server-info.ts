import { createRequire } from 'node:module';
import os from 'node:os';
import readline from 'node:readline';
import { green, blue, gray, bold } from './color.js';

/**
 * Get the non-internal IPv4 address of the first active network interface.
 *
 * @returns The IP address string, or an empty string if none is found.
 */
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

/**
 * Read the package version from the local `package.json`.
 *
 * @returns The semantic version string, or `"0.0.0"` if unavailable.
 */
function getVersion(): string {
  try {
    const _require = createRequire(import.meta.url);
    const pkg = _require('../package.json');
    return pkg.version;
  } catch {
    return '';
  }
}

/** Tracks whether the keypress listener has already been set up. */
let listening = false;

/**
 * Print the server startup banner to the console.
 *
 * Displays:
 * - Server name and version
 * - Local and network URLs
 * - Runtime detection (Bun vs Node.js)
 * - Keyboard shortcut hints
 *
 * On first call, also sets up an interactive keypress listener for
 * `c` (clear console) and `ctrl+c` (stop server).
 *
 * @param port - The port the server is listening on.
 * @param host - The host address the server is bound to (default `"0.0.0.0"`).
 */
export function logServerInfo(port: number, host: string = '0.0.0.0'): void {
  const arrow = green('\u2192');
  const version = getVersion();
  const isBun =
    typeof process !== 'undefined' &&
    typeof (process as any).versions?.bun === 'string';

  console.log('');
  console.log(
    `${blue(bold('Rasengan Server'))} ${gray('v' + version)} ${green('running')}`
  );
  console.log('');

  const localHost = host === '0.0.0.0' ? 'localhost' : host;
  console.log(
    `${arrow} ${bold('Local:')}   ${blue(`http://${localHost}:${bold(String(port))}`)}`
  );

  const ip = getIPAddress();
  if (ip) {
    console.log(
      `${arrow} ${bold('Network:')} ${blue(`http://${ip}:${bold(String(port))}`)}`
    );
  }

  console.log(`${arrow} ${bold('Runtime:')} ${isBun ? 'Bun' : 'Node.js'}`);

  console.log('');
  // The "press c to clear" shortcut needs this process's own raw-mode
  // stdin takeover, which is skipped under `rasengan-server dev` (see
  // setupKeypress()) — don't advertise a shortcut that won't respond.
  if (process.env.RASENGAN_SERVER_DEV_MANAGED !== '1') {
    console.log(
      `${arrow} ${gray('Press')} ${bold('c')} ${gray('to clear the console')}`
    );
  }
  console.log(
    `${arrow} ${gray('Press')} ${bold('ctrl+c')} ${gray('to stop the server')}`
  );
  console.log('');

  if (!listening) {
    listening = true;
    setupKeypress(() => logServerInfo(port, host));
  }
}

/**
 * Set up an interactive keypress listener on `stdin`.
 *
 * - `c` (no modifiers) → clears the console and re-displays the banner.
 * - `ctrl+c` → prints a shutdown message and exits.
 *
 * Only activates when `stdin` is a TTY. Sets raw mode for instant
 * keypress handling without waiting for `Enter`.
 *
 * @param log - Callback to re-display the server banner.
 */
function setupKeypress(log: () => void): void {
  /**
   * `rasengan-server dev` (cli/dev.ts) spawns this process with
   * `RASENGAN_SERVER_DEV_MANAGED=1` and already owns Ctrl+C: its own
   * `process.on('SIGINT', stop)` forwards a real SIGTERM to this
   * process's group, which `bootstrap()`'s own SIGTERM handler picks up
   * — independent of stdin entirely.
   *
   * `setRawMode(true)` below is a TERMINAL-WIDE setting, not
   * per-process: once this (inner, spawned) process enables it, the tty
   * stops generating a natural SIGINT for Ctrl+C for EVERY process
   * sharing that terminal, including dev.ts's own outer process (they
   * share the same tty via `stdio: 'inherit'`). This process's manual
   * `process.kill(process.pid, 'SIGINT')` below then only ever signals
   * ITSELF, not dev.ts — so dev.ts's outer signal handler stops firing
   * on Ctrl+C entirely, and only `tsx watch`/`bun --watch` (still
   * waiting on their own child) are left hanging. Confirmed live: one
   * Ctrl+C correctly killed this server (port freed) while `dev.ts` and
   * `tsx watch` sat alive indefinitely above it.
   *
   * Skipping the raw-mode takeover here leaves the (already correct)
   * outer layer as Ctrl+C's sole owner in dev mode. `rasengan-server
   * start` (no dev.ts wrapper, single process) is unaffected.
   */
  if (process.env.RASENGAN_SERVER_DEV_MANAGED === '1') return;

  /**
   * Returns early if stdin is not a terminal (TTY).
   * When piping input or running in non-interactive environments (CI, Docker, rasengan-server &),
   * there's no keyboard to listen on — the keypress listener would either hang or throw.
   */
  if (!process.stdin.isTTY) return;

  readline.emitKeypressEvents(process.stdin);

  process.stdin.on('keypress', (_: string, key: any) => {
    if (!key) return;

    if (key.ctrl && key.name === 'c') {
      console.log(
        `\n${green('ctrl+c')} ${gray('pressed — stopping server...')}\n`
      );
      process.kill(process.pid, 'SIGINT');
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
