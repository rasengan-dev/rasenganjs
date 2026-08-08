import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    // Separate entry so `node:fs` never reaches the main bundle (RFC-0002).
    'upload/disk': 'src/upload/disk.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
});
