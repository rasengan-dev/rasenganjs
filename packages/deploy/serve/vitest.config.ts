import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
    exclude: ['__tests__/fixture/**', 'node_modules/**'],
    // The suite builds a real app and boots the CLI against it.
    hookTimeout: 180_000,
    testTimeout: 30_000,
  },
});
