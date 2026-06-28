import { defineConfig } from '@rasenganjs/server';

export default defineConfig({
  entry: 'src/main.ts',
  port: 3000,
  host: '0.0.0.0',
  watchDir: 'src/',
  build: {
    outDir: '.rasengan',
    formats: ['single-file', 'directory'],
    minify: false,
  },
});
