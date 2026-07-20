import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from '../cli/build.js';
import { ServerApp } from '../server/app.js';

/**
 * Regression test for the "default production build breaks name-based
 * DI" bug: `cli/build.ts` used to pass esbuild's `minify: true`
 * shorthand straight through, which enables `minifyIdentifiers` and
 * renames constructor parameters. The container resolves a provider's
 * dependencies by reading those parameter *names* back at runtime, so
 * every provider/controller without an explicit `deps: [...]` silently
 * failed to resolve in the default production build.
 *
 * This drives the REAL build pipeline (esbuild, default `minify: true`)
 * against fixture classes with named constructor params, then wires the
 * post-build output into a real `ServerApp` and asserts injection still
 * works — not just that the build didn't throw.
 */
describe('cli/build — DI survives the default production build', () => {
  let tmpDir: string | undefined;

  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
    tmpDir = undefined;
  });

  it('resolves constructor-injected dependencies after a minified directory build', async () => {
    tmpDir = mkdtempSync(join(tmpdir(), 'rasengan-di-build-'));

    // Zero framework imports on purpose — this isolates the test to the
    // one thing that broke: whether esbuild renamed constructor params.
    writeFileSync(
      join(tmpDir, 'config.service.ts'),
      `export class ConfigService {\n` +
        `  readonly value = 'from-config';\n` +
        `}\n`
    );
    writeFileSync(
      join(tmpDir, 'consumer.service.ts'),
      `import { ConfigService } from './config.service.js';\n\n` +
        `export class ConsumerService {\n` +
        `  constructor(public configService: ConfigService) {}\n` +
        `}\n`
    );
    writeFileSync(
      join(tmpDir, 'probe.controller.ts'),
      `import { ConsumerService } from './consumer.service.js';\n\n` +
        `export class ProbeController {\n` +
        `  static injected: unknown;\n` +
        `  constructor(consumerService: ConsumerService) {\n` +
        `    ProbeController.injected = consumerService;\n` +
        `  }\n` +
        `  routes() {}\n` +
        `}\n`
    );

    const outDir = join(tmpDir, 'dist');
    await build({
      entry: join(tmpDir, 'probe.controller.ts'),
      build: { outDir, formats: ['directory'] }, // minify defaults to true
    });

    const destDir = join(outDir, 'server');
    const { ConfigService } = await import(
      pathToFileURL(join(destDir, 'config.service.js')).href
    );
    const { ConsumerService } = await import(
      pathToFileURL(join(destDir, 'consumer.service.js')).href
    );
    const { ProbeController } = await import(
      pathToFileURL(join(destDir, 'probe.controller.js')).href
    );

    const app = new ServerApp();
    app.registerModule({
      name: 'FixtureModule',
      providers: [ConfigService, ConsumerService],
      controllers: [ProbeController],
    });

    expect(() => app.compile()).not.toThrow();
    expect((ProbeController as any).injected).toBeInstanceOf(ConsumerService);
    expect((ProbeController as any).injected.configService).toBeInstanceOf(
      ConfigService
    );
  });
});
