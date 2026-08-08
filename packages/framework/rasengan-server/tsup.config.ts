import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'upload/disk': 'src/upload/disk.ts',
    cli: 'src/cli.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: [/@rasenganjs\/runtime\/adapters\//, 'esbuild'],
});
