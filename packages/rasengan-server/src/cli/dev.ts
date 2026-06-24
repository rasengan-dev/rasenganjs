import { spawn, type ChildProcess } from 'node:child_process';
import { watch } from 'node:fs';
import { resolve } from 'node:path';
import type { RasenganServerConfig } from '../config.js';

export async function dev(config: RasenganServerConfig): Promise<void> {
  const entry = resolve(config.entry || 'src/main.ts');
  const port = config.port ?? 3000;
  const host = config.host ?? '0.0.0.0';
  const isBun = config.preset === 'bun';

  const { existsSync } = await import('node:fs');
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

  function start() {
    if (closing) return;

    if (isBun) {
      child = spawn('bun', ['--watch', 'run', entry], {
        stdio: 'inherit',
        env: {
          ...process.env,
          RASENGAN_SERVER_PORT: String(port),
          RASENGAN_SERVER_HOST: host,
          NODE_ENV: 'development',
        },
      });
    } else {
      child = spawn('npx', ['--yes', 'tsx', 'watch', entry], {
        stdio: 'inherit',
        env: {
          ...process.env,
          RASENGAN_SERVER_PORT: String(port),
          RASENGAN_SERVER_HOST: host,
          NODE_ENV: 'development',
        },
      });
    }

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
  }

  function stop() {
    if (closing) return;
    closing = true;
    watchers.forEach((w) => w.close());
    if (child && !child.killed) {
      child.kill('SIGTERM');
      const force = setTimeout(() => {
        if (child && !child.killed) child.kill('SIGKILL');
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
