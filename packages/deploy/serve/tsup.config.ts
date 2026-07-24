import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    cli: 'cli.ts',
  },
  format: ['esm'],
  dts: false,
  clean: true,
  external: ['rasengan'],
});
