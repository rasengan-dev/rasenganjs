import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    main: 'src/main.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
});
