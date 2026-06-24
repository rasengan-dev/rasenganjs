import { defineConfig } from '@rasenganjs/server';

export default defineConfig({
  entry: 'src/main.ts',
  port: 5200,
  watchDir: 'src/',
  build: {
    outDir: '.rasengan',
    formats: ['directory'],
    minify: false,
  },
});
