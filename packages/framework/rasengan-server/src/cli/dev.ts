import { spawn, type ChildProcess } from 'node:child_process';
import { accessSync, constants, existsSync } from 'node:fs';
import { watch } from 'node:fs';
import { resolve } from 'node:path';
import type { RasenganServerConfig } from '../config/index.js';

/**
 * Locate the `tsx` executable inside the project's `node_modules`.
 *
 * Checks platform-specific paths:
 * - Windows: `node_modules/.bin/tsx.cmd`, then `.bin/tsx`
 * - POSIX:   `node_modules/.bin/tsx`, then `node_modules/tsx/dist/cli.mjs`
 *
 * @returns The resolved absolute path to `tsx`, or `null` if not found.
 */
function resolveRuntime(): string | null {
  if (process.platform === 'win32') {
    const candidates = [
      resolve(process.cwd(), 'node_modules/.bin/tsx.cmd'),
      resolve(process.cwd(), 'node_modules/.bin/tsx'),
    ];
    for (const p of candidates) {
      try {
        accessSync(p, constants.X_OK);
        return p;
      } catch {
        try {
          accessSync(p);
          return p;
        } catch {}
      }
    }
    return null;
  }

  const candidates = [
    resolve(process.cwd(), 'node_modules/.bin/tsx'),
    resolve(process.cwd(), 'node_modules/tsx/dist/cli.mjs'),
  ];
  for (const p of candidates) {
    try {
      accessSync(p, constants.X_OK);
      return p;
    } catch {}
  }
  return null;
}

/**
 * Send a signal to a child process's process group.
 *
 * Tries `process.kill(-pid, signal)` first (POSIX process group),
 * falls back to `child.kill(signal)`.
 */
function killProcessGroup(child: ChildProcess, signal: NodeJS.Signals): void {
  if (!child || child.killed) return;
  try {
    process.kill(-child.pid, signal);
  } catch (err) {
    // Falling back here means `child` wasn't a real process-group leader
    // (e.g. `detached` wasn't honored) — only the direct child gets the
    // signal, not whatever it spawned underneath itself. Surfaced so a
    // report of "the dev server won't stop" comes with a concrete lead.
    console.log(
      `  [rasengan-server] Process-group signal failed (${(err as Error).message}) — falling back to direct kill.`
    );
    child.kill(signal);
  }
}

/**
 * Start the development server.
 *
 * Spawns the entry file via `tsx watch` (or `bun --watch run`) with
 * hot-reload, sets up file watchers on the configured watch directories,
 * and handles graceful shutdown on `SIGINT`/`SIGTERM`.
 *
 * @param config - Server configuration (entry, port, host, watchDir, preset).
 */
export async function dev(config: RasenganServerConfig): Promise<void> {
  const entry = resolve(config.entry || 'src/main.ts');
  const port = config.port ?? 3000;
  const host = config.host ?? '0.0.0.0';
  const isBun = config.preset === 'bun';

  if (!existsSync(entry)) {
    console.error(
      `\n  [rasengan-server] Entry file not found: ${entry}\n` +
        `  Create the file or set a custom path in rasengan.server.ts:\n` +
        `    defineConfig({ entry: 'src/server.ts' })\n`
    );
    process.exit(1);
  }

  let child: ChildProcess | null = null;
  let restarting = false;
  let closing = false;

  /**
   * Spawn the child process that runs the actual server.
   *
   * Uses:
   * - `bun --watch run <entry>` if preset is `bun`
   * - `tsx watch <entry>` otherwise (via local `node_modules/.bin/tsx`)
   * - Falls back to `npx tsx watch <entry>` if tsx is not found locally.
   */
  function spawnChild(): ChildProcess {
    const opts = {
      stdio: 'inherit' as const,
      // Makes `child` the leader of its OWN process group (POSIX) so
      // `killProcessGroup()`'s `process.kill(-child.pid, signal)` targets
      // a real group instead of throwing ESRCH and silently falling back
      // to signaling only this direct child. Without this, `npx`/`tsx
      // watch` never forwards the signal to the actual Node process it
      // spawns underneath itself, so the dev server keeps running until
      // the terminal's own repeated Ctrl+C eventually gets through.
      detached: process.platform !== 'win32',
      env: {
        ...process.env,
        RASENGAN_SERVER_PORT: String(port),
        RASENGAN_SERVER_HOST: host,
        RASENGAN_SERVER_CONFIG: JSON.stringify(config),
        NODE_ENV: 'development',
        // Tells the spawned server (utils/log-server-info.ts) that THIS
        // process already owns Ctrl+C — see RASENGAN_SERVER_DEV_MANAGED
        // doc comment there for why the server must not also grab it.
        RASENGAN_SERVER_DEV_MANAGED: '1',
      },
    };

    if (isBun) {
      return spawn('bun', ['--watch', 'run', entry], opts);
    }

    const tsx = resolveRuntime();
    if (tsx) {
      return spawn(tsx, ['watch', entry], opts);
    }

    return spawn('npx', ['--yes', 'tsx', 'watch', entry], opts);
  }

  /**
   * Start (or restart) the child process.
   */
  function start() {
    try {
      if (closing) return;

      child = spawnChild();

      child.on('exit', (code) => {
        if (restarting || closing) return;
        if (code !== null && code !== 0) {
          console.error(
            `\n[rasengan-server] Worker exited with code ${code}. Waiting for changes to restart...\n`
          );
        }
        process.exit(code ?? 0);
      });

      child.on('error', (err) => {
        console.error(
          `\n[rasengan-server] Failed to start dev server: ${err.message}\n`
        );
        if (!restarting && !closing) process.exit(1);
      });
    } catch (err) {
      console.error(`\n[rasengan-server] Failed to start dev server: ${err}\n`);
      if (!restarting && !closing) process.exit(1);
    }
  }

  /**
   * Gracefully stop the dev server and exit the process.
   */
  function stop() {
    if (closing) return;
    closing = true;
    console.log('\n[rasengan-server] Stopping dev server...');
    watchers.forEach((w) => w.close());
    if (child && !child.killed) {
      killProcessGroup(child, 'SIGTERM');
      const force = setTimeout(() => {
        console.log(
          '[rasengan-server] Still running after 1.5s — forcing shutdown...'
        );
        killProcessGroup(child!, 'SIGKILL');
      }, 1500);
      child.on('exit', () => {
        clearTimeout(force);
        process.exit(0);
      });
      setTimeout(() => process.exit(0), 2500);
    } else {
      process.exit(0);
    }
  }

  const watchDirs = Array.isArray(config.watchDir)
    ? config.watchDir.map((d) => resolve(d))
    : [resolve(config.watchDir || 'src/')];

  const watchers = watchDirs.map((dir) =>
    watch(dir, { recursive: true }, (_event, filename) => {
      if (
        !filename ||
        filename.startsWith('.') ||
        filename.includes('node_modules')
      )
        return;
    })
  );

  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);

  start();
}
