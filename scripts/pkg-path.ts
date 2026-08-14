// Kept in sync with the actual on-disk layout by hand — the monorepo
// went through a directory-renaming/consolidation pass (rasengan-*
// prefixes dropped from ecosystem/cli/deploy directories, the four
// separate rasengan-runtime-{node,bun,workerd} packages merged into one
// packages/platform/runtime with adapter subpath exports) that this map
// didn't originally track. `pkg` here is a release-tag/changelog slug —
// decoupled from both the directory name and the npm package.json
// "name" (e.g. rasengan-server's tag is "rasengan-server@x", its npm
// name is "@rasenganjs/server") — so renaming a directory again only
// ever means updating the path on the right, never the slug on the left.
//
// Shared by both scripts/release.ts and scripts/publishCI.ts — do not
// fork this into two copies again. That's exactly how publishCI.ts
// ended up publishing against the pre-restructure `packages/${pkg}`
// default while release.ts got fixed: two independent maps, one updated.
export const pkgPath: Record<string, string> = {
  'create-rasengan': 'packages/cli/create-rasengan',
  rasengan: 'packages/framework/rasengan',
  'rasengan-futon': 'packages/framework/futon',
  'rasengan-mdx': 'packages/framework/mdx',
  'rasengan-server': 'packages/framework/rasengan-server',
  'rasengan-image': 'packages/ecosystem/image',
  'rasengan-i18n': 'packages/ecosystem/i18n',
  'rasengan-theme': 'packages/ecosystem/theme',
  'rasengan-kurama': 'packages/ecosystem/kurama',
  'rasengan-kage-demo': 'packages/ecosystem/kage-demo',
  'rasengan-io': 'packages/ecosystem/io',
  'rasengan-ws': 'packages/ecosystem/ws',
  'rasengan-validators': 'packages/ecosystem/validators',
  'rasengan-drizzle': 'packages/ecosystem/drizzle',
  'rasengan-queue': 'packages/ecosystem/queue',
  'rasengan-sitemap': 'packages/ecosystem/sitemap',
  'rasengan-serve': 'packages/deploy/serve',
  'rasengan-vercel': 'packages/deploy/vercel',
  'rasengan-netlify': 'packages/deploy/netlify',
  'rasengan-cloudflare': 'packages/deploy/cloudflare',
  'rasengan-shuriken': 'packages/cli/shuriken',
  // Single package now (adapters/node|bun|workerd subpath exports) —
  // the old rasengan-runtime-{node,bun,workerd} slugs are retired, not
  // remapped, since those are no longer independently publishable units.
  'rasengan-runtime': 'packages/platform/runtime',
};

export function getPkgDir(pkg: string): string {
  return pkgPath[pkg] || `packages/${pkg}`;
}
