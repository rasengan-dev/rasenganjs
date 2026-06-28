import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: [
    '@rasenganjs/runtime-node',
    '@rasenganjs/runtime-bun',
    '@rasenganjs/runtime-workerd',
    'esbuild',
  ],
});
