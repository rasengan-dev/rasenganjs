import { spawn, type ChildProcess } from 'node:child_process';
import { createServer } from 'node:net';
import { watch } from 'node:fs';
import { resolve } from 'node:path';
import type { RasenganServerConfig } from '../config.js';

export async function dev(config: RasenganServerConfig): Promise<void> {
  const entry = resolve(config.entry || 'src/main.ts');
  const port = config.port ?? 3000;
  const host = config.host ?? '0.0.0.0';
  const isBun =
    typeof process !== 'undefined' &&
    typeof (process as any).versions?.bun === 'string';
  let child: ChildProcess | null = null;
  let restarting = false;
  let closing = false;

  function start() {
    if (closing) return;

    if (isBun) {
      child = spawn('bun', ['run', entry], {
        stdio: 'inherit',
        env: {
          ...process.env,
          RASENGAN_SERVER_PORT: String(port),
          RASENGAN_SERVER_HOST: host,
          NODE_ENV: 'development',
        },
      });
    } else {
      child = spawn('npx', ['--yes', 'tsx', entry], {
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
      if (!restarting && !closing) {
        process.exit(code ?? 0);
      }
    });

    child.on('error', (err) => {
      console.error('Failed to start dev server:', err.message);
      if (!restarting && !closing) process.exit(1);
    });
  }

  function waitForPort(cb: () => void) {
    const server = createServer();
    server.on('error', () => {
      server.close(() => setTimeout(() => waitForPort(cb), 300));
    });
    server.on('listening', () => {
      server.close(cb);
    });
    server.listen(port, host);
  }

  function restart() {
    if (restarting || closing) return;
    restarting = true;

    if (child && !child.killed) {
      child.kill('SIGTERM');

      const forceKill = setTimeout(() => {
        if (child && !child.killed) child.kill('SIGKILL');
      }, 3000);

      const onExit = () => {
        clearTimeout(forceKill);
        waitForPort(() => {
          restarting = false;
          start();
        });
      };

      if (child.exitCode !== null || child.killed) {
        onExit();
      } else {
        child.once('exit', onExit);
      }
    } else {
      restarting = false;
      start();
    }
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
      if (filename && !filename.startsWith('.')) {
        restart();
      }
    })
  );

  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);

  console.log(`\n  rasengan-server dev\n`);
  console.log(`  entry : ${entry}`);
  console.log(`  port  : ${config.port ?? 3000}`);
  console.log(`  watch : ${watchDirs.join(', ')}`);
  console.log(`  runtime : ${isBun ? 'bun' : 'node'}\n`);

  start();
}
