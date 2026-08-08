import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'adapters/node/index': 'src/adapters/node/index.ts',
    'adapters/bun/index': 'src/adapters/bun/index.ts',
    'adapters/workerd/index': 'src/adapters/workerd/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
});
