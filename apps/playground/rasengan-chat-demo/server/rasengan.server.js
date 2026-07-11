import { defineConfig } from '@rasenganjs/server';

export default defineConfig({
  entry: 'src/main.ts',
  // 3007 so it can run alongside rasengan-server-demo (3006).
  port: 3007,
  watchDir: 'src/',
});
