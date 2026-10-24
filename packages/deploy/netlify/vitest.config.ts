import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
    // The adapter resolves everything against process.cwd(), so tests
    // chdir into a temp project; worker threads do not support chdir.
    pool: 'forks',
  },
});
