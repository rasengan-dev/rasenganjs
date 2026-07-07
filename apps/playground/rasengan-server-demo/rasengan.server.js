import { defineConfig } from '@rasenganjs/server';

export default defineConfig({
  entry: 'src/main.ts',
  port: 3006,
  // host: "127.0.0.2",
  watchDir: 'src/',
  preset: 'workerd',
  build: {
    outDir: '.rasengan',
    formats: ['directory'],
    minify: false,
  },
});
