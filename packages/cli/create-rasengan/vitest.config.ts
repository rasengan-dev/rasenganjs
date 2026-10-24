import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
    // The CLI resolves the project path from process.cwd(), so tests
    // chdir into temp folders; worker threads do not support chdir.
    pool: 'forks',
    testTimeout: 30_000,
  },
});
