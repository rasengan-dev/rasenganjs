import { defineConfig } from 'tsup';

// Three entries, mirroring the package's subpath exports: importing the
// core ("@rasenganjs/openapi") must never pull in @rasenganjs/futon or
// @rasenganjs/server (see src/index.ts).
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    futon: 'src/futon.ts',
    server: 'src/server.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: [
    '@rasenganjs/futon',
    '@rasenganjs/server',
    '@rasenganjs/validators',
  ],
});
