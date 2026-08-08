import { defineConfig } from 'tsup';

export default defineConfig({
  // bundle: false transpiles each source file to its own output file,
  // mirroring src/'s directory structure under dist/ — required because
  // several internal call sites (vite.config.ts, cli/index.ts,
  // core/config/vite/defaults.ts, server/dev/server.ts) resolve sibling
  // modules by their exact compiled path (e.g.
  // dist/entries/server/entry.server.js). Bundling into a handful of
  // entries would break every one of those paths.
  entry: [
    'src/**/*.ts',
    'src/**/*.tsx',
    // src/scripts/** ships as plain .js (build-command.js is spawned
    // directly by cli/index.ts's `node dist/scripts/build-command`) —
    // still needs to land in dist/ alongside the compiled output.
    'src/**/*.js',
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
    '!src/__tests__/**',
  ],
  format: ['esm'],
  bundle: false,
  splitting: false,
  sourcemap: false,
  outDir: 'dist',
  target: 'es2022',
  dts: true,
});
