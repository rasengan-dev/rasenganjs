import { execFileSync, spawn, type ChildProcess } from 'node:child_process';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export const fixtureDir = path.join(here, 'fixture');
export const cliPath = path.resolve(here, '..', 'cli.ts');
const repoRoot = path.resolve(here, '..', '..', '..', '..');
export const tsxBin = path.join(repoRoot, 'node_modules', '.bin', 'tsx');

/**
 * Builds the fixture app. `rasengan build` spawns `vite`, which is only
 * on PATH through the fixture's own `node_modules/.bin`.
 */
export function buildFixture({ prerender }: { prerender: boolean }) {
  execFileSync('rasengan', ['build'], {
    cwd: fixtureDir,
    stdio: 'pipe',
    env: {
      ...process.env,
      PATH: `${path.join(fixtureDir, 'node_modules', '.bin')}${path.delimiter}${process.env.PATH}`,
      RASENGAN_FIXTURE_PRERENDER: prerender ? '1' : '',
    },
  });
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(0, () => {
      const { port } = probe.address() as net.AddressInfo;
      probe.close(() => resolve(port));
    });
  });
}

export type RunningServer = {
  baseUrl: string;
  output: () => string;
  stop: () => Promise<void>;
};

/** Starts the CLI from source and resolves once it reports it is listening. */
export async function startServer(buildDir: string): Promise<RunningServer> {
  const port = await freePort();
  let output = '';

  const child: ChildProcess = await new Promise((resolve, reject) => {
    const proc = spawn(tsxBin, [cliPath, buildDir, '--port', String(port)], {
      cwd: fixtureDir,
      env: { ...process.env, NODE_ENV: 'production' },
    });

    const onData = (chunk: Buffer) => {
      output += chunk.toString();
      if (output.includes('running')) resolve(proc);
    };
    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.once('error', reject);
    proc.once('exit', (code) =>
      reject(new Error(`rasengan-serve exited early (${code}):\n${output}`))
    );
  });

  return {
    baseUrl: `http://localhost:${port}`,
    output: () => output,
    stop: async () => {
      if (child.exitCode !== null) return;
      const exited = new Promise((resolve) => child.once('exit', resolve));
      child.kill('SIGTERM');
      await exited;
    },
  };
}

/**
 * GET with the path sent byte for byte. `fetch` normalizes dot segments
 * (including `%2e%2e`) before sending, which would hide traversal attempts.
 */
export function rawGet(
  baseUrl: string,
  rawPath: string
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const { hostname, port } = new URL(baseUrl);
    const req = http.get({ hostname, port, path: rawPath }, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ status: res.statusCode ?? 0, body }));
    });
    req.once('error', reject);
  });
}
