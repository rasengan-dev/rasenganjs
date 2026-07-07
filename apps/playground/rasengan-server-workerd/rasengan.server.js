import { defineConfig } from '@rasenganjs/server';

export default defineConfig({
  entry: 'src/index.ts',
  port: 8100,
  preset: 'workerd',
  build: {
    outDir: 'dist',
    minify: false,
  },
});
