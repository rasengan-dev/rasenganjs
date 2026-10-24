import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
    exclude: ['__tests__/fixture/**', 'node_modules/**'],
    // Each suite builds the same fixture app (SSR, then prerendered) and
    // boots the CLI against it, so files must not run concurrently.
    fileParallelism: false,
    hookTimeout: 180_000,
    testTimeout: 30_000,
  },
});
