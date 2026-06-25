import { spawn, type ChildProcess } from 'node:child_process';
import { accessSync, constants, existsSync } from 'node:fs';
import { watch } from 'node:fs';
import { resolve } from 'node:path';
import type { RasenganServerConfig } from '../config.js';

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

function killProcessGroup(child: ChildProcess, signal: NodeJS.Signals): void {
  if (!child || child.killed) return;
  try {
    process.kill(-child.pid, signal);
  } catch {
    child.kill(signal);
  }
}

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

  function spawnChild(): ChildProcess {
    const opts = {
      stdio: 'inherit' as const,
      env: {
        ...process.env,
        RASENGAN_SERVER_PORT: String(port),
        RASENGAN_SERVER_HOST: host,
        NODE_ENV: 'development',
      },
    };

    if (isBun) {
      // return spawn('bun', ['run', entry], opts);
      return spawn('bun', ['--watch', 'run', entry], opts);
    }

    const tsx = resolveRuntime();
    if (tsx) {
      return spawn(tsx, ['watch', entry], opts);
    }

    return spawn('npx', ['--yes', 'tsx', 'watch', entry], opts);
  }

  function start() {
    try {
      if (closing) return;

      child = spawnChild();

      child.on('exit', (code) => {
        if (restarting || closing) return;
        if (code !== null && code !== 0) {
          console.error(
            `\n  [rasengan-server] Worker exited with code ${code}. Waiting for changes to restart...\n`
          );
        }
        process.exit(code ?? 0);
      });

      child.on('error', (err) => {
        console.error(
          `\n  [rasengan-server] Failed to start dev server: ${err.message}\n`
        );
        if (!restarting && !closing) process.exit(1);
      });
    } catch (err) {
      console.error(
        `\n  [rasengan-server] Failed to start dev server: ${err}\n`
      );
      if (!restarting && !closing) process.exit(1);
    }
  }

  function stop() {
    if (closing) return;
    closing = true;
    watchers.forEach((w) => w.close());
    if (child && !child.killed) {
      killProcessGroup(child, 'SIGTERM');
      const force = setTimeout(() => {
        killProcessGroup(child!, 'SIGKILL');
      }, 3000);
      child.on('exit', () => {
        clearTimeout(force);
        process.exit(0);
      });
      setTimeout(() => process.exit(0), 4000);
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
