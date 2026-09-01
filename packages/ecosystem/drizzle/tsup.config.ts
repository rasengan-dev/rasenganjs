import { defineConfig } from 'tsup';

// Two entries, mirroring the package's subpath exports: importing the
// core ("@rasenganjs/drizzle") must never pull in a specific driver's
// client package (see src/index.ts).
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    futon: 'src/futon.ts',
    'drivers/node-postgres': 'src/drivers/node-postgres.ts',
    'drivers/d1': 'src/drivers/d1.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['@rasenganjs/futon', '@rasenganjs/server', 'drizzle-orm', 'pg'],
});
