import { build as esbuild } from 'esbuild';
import {
  copyFileSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  readdirSync,
} from 'node:fs';
import { resolve, dirname, basename, extname, join } from 'node:path';
import type { RasenganServerConfig } from '../config/index.js';

/**
 * Regex matching static ES import/export statements with relative paths.
 */
const IMPORT_RE = /(?:(from|import)\s*)(['"])(\.\.?\/[^'"]*?)(\2)/g;

/**
 * Regex matching dynamic `import()` calls with relative paths.
 */
const DYNAMIC_IMPORT_RE = /(import\s*\(\s*)(['"])(\.\.?\/[^'"]*?)(\2\s*\))/g;

/**
 * Build the server application for production.
 *
 * Supports two output formats (configurable via `config.build.formats`):
 * - `"single-file"` — bundles everything into one `server.bundle.mjs`
 * - `"directory"`   — one `.mjs` per source file, preserving structure
 *
 * @param config - Server configuration (entry, build options).
 */
export async function build(config: RasenganServerConfig): Promise<void> {
  const entry = resolve(config.entry || 'src/main.ts');
  const outDir = resolve(config.build?.outDir || 'dist');
  const formats = config.build?.formats ?? ['single-file', 'directory'];
  const minify = config.build?.minify ?? true;

  mkdirSync(outDir, { recursive: true });

  console.log(`\n  rasengan-server build\n`);
  console.log(`  entry : ${entry}`);
  console.log(`  out   : ${outDir}`);
  console.log(`  format: ${formats.join(', ')}\n`);

  const sharedOptions = {
    entryPoints: [entry],
    platform: 'node' as const,
    format: 'esm' as const,
    ...esbuildMinifyOptions(minify),
    external: ['node:*'],
  };

  for (const fmt of formats) {
    switch (fmt) {
      case 'single-file':
        await buildSingleFile(entry, outDir, sharedOptions, config);
        break;
      case 'directory':
        await buildDirectory(entry, outDir, sharedOptions, config);
        break;
    }

    generateEntryFile(outDir, fmt, config);
  }

  writeConfigJson(outDir, config);

  console.log('  ✓ build complete\n');
}

/**
 * esbuild's `minify: true` shorthand also enables `minifyIdentifiers`,
 * which renames local bindings — including constructor parameters. The
 * DI container resolves a provider's dependencies by reading its
 * constructor's parameter *names* back at runtime (`Container` in
 * `../di/container.js`), so identifier minification silently breaks
 * every provider/controller that relies on implicit constructor
 * injection instead of an explicit `deps: [...]` array.
 *
 * Syntax and whitespace minification are unrelated to DI and stay on;
 * only identifier renaming is disabled, regardless of the `minify` flag.
 */
function esbuildMinifyOptions(minify: boolean): {
  minifyIdentifiers: boolean;
  minifySyntax: boolean;
  minifyWhitespace: boolean;
} {
  return {
    minifyIdentifiers: false,
    minifySyntax: minify,
    minifyWhitespace: minify,
  };
}

function writeConfigJson(outDir: string, config: RasenganServerConfig): void {
  const configPath = join(outDir, 'config.json');
  writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
  console.log(`  ✓ config: ${configPath}`);
}

/**
 * Build a single-file bundle (`server.bundle.mjs`) using esbuild.
 *
 * All dependencies are bundled inline except `node:*` modules.
 */
async function buildSingleFile(
  entry: string,
  outDir: string,
  shared: any,
  config: RasenganServerConfig
): Promise<void> {
  const outfile = join(outDir, 'server.bundle.mjs');

  await esbuild({
    ...shared,
    bundle: true,
    outfile,
  });

  console.log(`  ✓ single-file: ${outfile}`);
}

/**
 * Build a directory output preserving the source file structure.
 *
 * For each `.ts`/`.tsx` file in the entry's source directory:
 * 1. Compiles to `.mjs` via esbuild (unbundled).
 * 2. Rewrites relative import paths to include `.js` extensions
 *    (required by Node.js ESM).
 * 3. Copies `package.json` (minimal) and `rasengan.server.*` config.
 * 4. Writes a `start.json` with convenience npm scripts.
 */
async function buildDirectory(
  entry: string,
  outDir: string,
  shared: any,
  config: RasenganServerConfig
): Promise<void> {
  const srcDir = resolve(dirname(entry));
  const destDir = join(outDir, 'server');

  const files = collectSourceFiles(srcDir);
  const entryPoints: Record<string, string> = {};

  for (const file of files) {
    const relative = file.replace(srcDir + '/', '');
    const key = relative.replace(extname(relative), '');
    entryPoints[key] = file;
  }

  if (Object.keys(entryPoints).length === 0) {
    entryPoints['main'] = entry;
  }

  mkdirSync(destDir, { recursive: true });

  await esbuild({
    entryPoints,
    outdir: destDir,
    platform: 'node',
    format: 'esm',
    ...esbuildMinifyOptions(config.build?.minify ?? true),
    bundle: false,
  });

  rewriteImportExtensions(destDir);

  const pkgPath = resolve('package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    const minimalPkg = {
      name: pkg.name,
      version: pkg.version,
      type: 'module',
      private: true,
      dependencies: pkg.dependencies || {},
    };
    writeFileSync(
      join(destDir, 'package.json'),
      JSON.stringify(minimalPkg, null, 2)
    );
  }

  for (const name of ['rasengan.server.js', 'rasengan.server.ts']) {
    const cfgPath = resolve(name);
    if (existsSync(cfgPath)) {
      copyFileSync(cfgPath, join(destDir, name));
    }
  }

  const entryName = basename(entry, extname(entry));
  const startScript = {
    scripts: {
      start: `node --import tsx ${entryName}.js`,
      'start:prod': `node ${entryName}.js`,
    },
  };
  writeFileSync(
    join(destDir, 'start.json'),
    JSON.stringify(startScript, null, 2)
  );

  console.log(`  ✓ directory: ${destDir}`);
}

/**
 * Recursively collect all `.ts` and `.tsx` files from a directory,
 * skipping `node_modules`.
 */
function collectSourceFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      files.push(...collectSourceFiles(full));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))
    ) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Check whether a path string already has a file extension.
 */
function hasExtension(path: string): boolean {
  const seg = path.split('/').pop();
  return seg !== undefined && /\.\w{1,5}$/.test(seg);
}

/**
 * Rewrite relative import paths in compiled `.js` files to include
 * the `.js` extension, as required by Node.js ESM resolution.
 *
 * Handles both static `import`/`export from` and dynamic `import()`.
 */
function rewriteImportExtensions(dir: string): void {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      rewriteImportExtensions(full);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      const code = readFileSync(full, 'utf-8');
      const updated = code
        .replace(IMPORT_RE, (match, keyword, quote, path, closeQuote) => {
          if (hasExtension(path)) return match;
          return `${keyword} ${quote}${path}.js${closeQuote}`;
        })
        .replace(DYNAMIC_IMPORT_RE, (match, prefix, quote, path, suffix) => {
          if (hasExtension(path)) return match;
          return `${prefix}${quote}${path}.js${suffix}`;
        });
      if (updated !== code) {
        writeFileSync(full, updated, 'utf-8');
      }
    }
  }
}

/**
 * Template for the production entry file (Node.js / Bun).
 *
 * Uses dynamic `import()` with `import.meta.url` so the entry resolves
 * built files relative to its own location regardless of the working
 * directory.  The built entry at `SOURCE_PATH` is expected to call
 * `bootstrap()` which handles ServerApp setup, adapter selection,
 * and HTTP serving.
 */
function runtimeEntryTemplate(sourcePath: string): string {
  return (
    `import { dirname, resolve } from 'node:path';\n` +
    `import { fileURLToPath } from 'node:url';\n` +
    `\n` +
    `const __dirname = dirname(fileURLToPath(import.meta.url));\n` +
    `\n` +
    `async function main() {\n` +
    `  await import(resolve(__dirname, ${JSON.stringify(sourcePath)}));\n` +
    `}\n` +
    `\n` +
    `main().catch((err) => {\n` +
    `  console.error(\`\\n  [rasengan-server] Failed to start: \${err.message}\\n\`);\n` +
    `  process.exit(1);\n` +
    `});\n`
  );
}

/**
 * Template for the Workerd production entry file.
 *
 * Generates an ES module that exports a `fetch` handler, suitable for
 * Cloudflare Workers.  Uses passthrough mode on `WorkerdProdAdapter`
 * so the caller can export the handler as a module-level default.
 */
function workerdEntryTemplate(sourcePath: string): string {
  return (
    `import { ServerApp } from '@rasenganjs/server';\n` +
    `import { WorkerdProdAdapter } from '@rasenganjs/runtime/adapters/workerd';\n` +
    `import module from ${JSON.stringify(sourcePath)};\n` +
    `\n` +
    `const serverApp = new ServerApp();\n` +
    `const configureApp = (module.default || module).configureApp;\n` +
    `configureApp(serverApp);\n` +
    `const runtimeApp = serverApp.compile();\n` +
    `\n` +
    `const adapter = new WorkerdProdAdapter({ passthrough: true });\n` +
    `await adapter.serve(runtimeApp);\n` +
    `\n` +
    `export default {\n` +
    `  fetch: (request) => adapter.fetchHandler(request),\n` +
    `};\n`
  );
}

/**
 * Generate a runtime-specific `index.js` entry file in the output directory.
 *
 * The entry file is the production entry point that loads the compiled
 * server code and starts the server using the appropriate runtime adapter.
 *
 * - **Node / Bun** — imports the compiled bootstrap call directly
 * - **Workerd** — generates an ES module with `export default { fetch }`
 *
 * @param outDir - Root output directory (e.g. `dist`).
 * @param format - Build format that was produced.
 * @param config - Server configuration (preset determines the template).
 */
function generateEntryFile(
  outDir: string,
  format: 'single-file' | 'directory',
  config: RasenganServerConfig
): void {
  const preset = config.preset ?? 'node';
  const sourcePath =
    format === 'single-file' ? './server.bundle.mjs' : './server/main.js';

  let content: string;

  if (preset === 'workerd') {
    const sourcePath =
      format === 'single-file' ? './server.bundle.mjs' : './server/index.js';
    content = workerdEntryTemplate(sourcePath);
  } else {
    content = runtimeEntryTemplate(sourcePath);
  }

  const entryPath = join(outDir, 'index.js');
  writeFileSync(entryPath, content, 'utf-8');

  console.log(`  ✓ entry: ${entryPath} (${preset})`);
}
