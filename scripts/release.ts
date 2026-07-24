import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { release } from '@vitejs/release-scripts';
import colors from 'picocolors';
import { pkgPath, getPkgDir } from './pkg-path.js';

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
  // the same map (scripts/pkg-path.ts) the changelog callbacks below
  // already need, so there is exactly one place that maps a slug to its
  // real directory — see that file for why forking this map is what
  // broke scripts/publishCI.ts.
  getPkgDir,
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
