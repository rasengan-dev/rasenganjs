import { defineConfig } from '@rasenganjs/server';

export default defineConfig({
  entry: 'src/main.ts',
  port: 8100,
  preset: 'workerd',
  build: {
    outDir: 'dist',
    minify: false,
  },
});
