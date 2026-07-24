import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { release } from '@vitejs/release-scripts';
import colors from 'picocolors';

function getLastTag(pkgName: string, version: string): string | null {
  const pattern = pkgName === 'rasengan' ? 'v*' : `${pkgName}@*`;
  const currentTag =
    pkgName === 'rasengan' ? `v${version}` : `${pkgName}@${version}`;

  try {
    const tags = execSync(`git tag --list '${pattern}' --sort=-v:refname`, {
      encoding: 'utf-8',
    })
      .trim()
      .split('\n')
      .filter(Boolean);

    return tags.find((t) => t !== currentTag) || null;
  } catch {
    return null;
  }
}

async function generateAutoEntries(
  pkgName: string,
  version: string
): Promise<string> {
  const lastTag = getLastTag(pkgName, version);
  if (!lastTag) return '';

  const { ConventionalChangelog } = await import('conventional-changelog');
  const cl = new ConventionalChangelog();

  const chunks: string[] = [];
  for await (const chunk of cl
    .loadPreset('conventionalcommits')
    .commits({
      from: lastTag,
      to: 'HEAD',
      path: pkgPath[pkgName] || `packages/${pkgName}`,
    })
    .write()) {
    chunks.push(chunk);
  }

  const generated = chunks.join('');

  // conventional-changelog generates "## header\n\nbody\n\n## next version..."
  // Extract only the first section's body (skip the generated header)
  const firstSection = generated.split('\n## ')[0];
  const body = firstSection.replace(/^## .*\n{1,2}/, '').trim();

  return body;
}

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
const pkgPath: Record<string, string> = {
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
  'rasengan-serve': 'packages/deploy/serve',
  'rasengan-vercel': 'packages/deploy/vercel',
  'rasengan-shuriken': 'packages/cli/shuriken',
  // Single package now (adapters/node|bun|workerd subpath exports) —
  // the old rasengan-runtime-{node,bun,workerd} slugs are retired, not
  // remapped, since those are no longer independently publishable units.
  'rasengan-runtime': 'packages/platform/runtime',
};

release({
  repo: 'rasenganjs',
  packages: [
    'create-rasengan',
    'rasengan',
    'rasengan-futon',
    'rasengan-mdx',
    'rasengan-server',
    'rasengan-image',
    'rasengan-i18n',
    'rasengan-theme',
    'rasengan-kurama',
    'rasengan-kage-demo',
    'rasengan-io',
    'rasengan-ws',
    'rasengan-validators',
    'rasengan-drizzle',
    'rasengan-serve',
    'rasengan-vercel',
    'rasengan-shuriken',
    'rasengan-runtime',
  ],
  toTag: (pkg, version) => {
    if (pkg === 'rasengan') {
      return `v${version}`;
    }

    return `${pkg}@${version}`;
  },
  // Without this, release()'s own internal package-dir resolution
  // defaults to `packages/${pkg}` (per @vitejs/release-scripts' own
  // docs) — which doesn't exist for a single one of these slugs. Share
  // the same map the changelog callbacks below already need, so there
  // is exactly one place that maps a slug to its real directory.
  getPkgDir: (pkg: string) => pkgPath[pkg] || `packages/${pkg}`,
  logChangelog: async (pkgName: string) => {
    const changelog = readFileSync(
      `${pkgPath[pkgName] || `packages/${pkgName}`}/CHANGELOG.md`,
      'utf-8'
    );
    if (!changelog.includes('## Unreleased')) {
      throw new Error("Can't find '## Unreleased' section in CHANGELOG.md");
    }
    const index = changelog.indexOf('## Unreleased') + 13;
    console.log(
      colors.dim(changelog.slice(index, changelog.indexOf('## ', index)).trim())
    );
  },
  generateChangelog: async (pkgName: string, version: string) => {
    const changelogPath = `${pkgPath[pkgName] || `packages/${pkgName}`}/CHANGELOG.md`;
    let changelog = readFileSync(changelogPath, 'utf-8');

    // Auto-generate entries from conventional commits since last tag
    const autoEntries = await generateAutoEntries(pkgName, version);

    if (autoEntries) {
      changelog = changelog.replace(
        '## Unreleased',
        `## Unreleased\n\n${autoEntries}`
      );
      writeFileSync(changelogPath, changelog);
      // Re-read after the update for stamping below
      changelog = readFileSync(changelogPath, 'utf-8');
    }

    console.log(colors.cyan('\nUpdating CHANGELOG.md...'));
    const date = new Date().toISOString().slice(0, 10);
    writeFileSync(
      changelogPath,
      changelog.replace(
        '## Unreleased',
        `## Unreleased\n\n## ${version} (${date})`
      )
    );
  },
});
