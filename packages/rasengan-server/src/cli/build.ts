import { build as esbuild } from 'esbuild';
import {
  copyFileSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { resolve, dirname, basename, extname, join, relative } from 'node:path';
import type { RasenganServerConfig } from '../config/index.js';

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
    minify,
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
  }

  console.log('  ✓ build complete\n');
}

async function buildSingleFile(
  entry: string,
  outDir: string,
  shared: any,
  _config: RasenganServerConfig
): Promise<void> {
  const outfile = join(outDir, 'server.bundle.mjs');

  await esbuild({
    ...shared,
    bundle: true,
    outfile,
  });

  console.log(`  ✓ single-file: ${outfile}`);
}

async function buildDirectory(
  entry: string,
  outDir: string,
  shared: any,
  config: RasenganServerConfig
): Promise<void> {
  const srcDir = resolve(dirname(entry));
  const destDir = join(outDir, 'server');

  // compile all .ts files in the source directory to .mjs
  const files = collectSourceFiles(srcDir);
  const entryPoints: Record<string, string> = {};

  for (const file of files) {
    const relative = file.replace(srcDir + '/', '');
    const key = relative.replace(extname(relative), '');
    entryPoints[key] = file;
  }

  if (Object.keys(entryPoints).length === 0) {
    // fallback: just compile the entry
    entryPoints['main'] = entry;
  }

  mkdirSync(destDir, { recursive: true });

  await esbuild({
    entryPoints,
    outdir: destDir,
    platform: 'node',
    format: 'esm',
    minify: config.build?.minify ?? true,
    bundle: false,
  });

  // rewrite relative imports to add .js extension (required by Node ESM)
  rewriteImportExtensions(destDir);

  // copy package.json
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

  // copy rasengan config
  for (const name of ['rasengan.server.js', 'rasengan.server.ts']) {
    const cfgPath = resolve(name);
    if (existsSync(cfgPath)) {
      copyFileSync(cfgPath, join(destDir, name));
    }
  }

  // create a start script
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

const IMPORT_RE = /(?:(from|import)\s*)(['"])(\.\.?\/[^'"]*?)(\2)/g;
const DYNAMIC_IMPORT_RE = /(import\s*\(\s*)(['"])(\.\.?\/[^'"]*?)(\2\s*\))/g;

function hasExtension(path: string): boolean {
  const seg = path.split('/').pop();
  return seg !== undefined && /\.\w{1,5}$/.test(seg);
}

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
