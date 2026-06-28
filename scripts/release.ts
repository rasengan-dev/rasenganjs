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

const pkgPath: Record<string, string> = {
  'create-rasengan': 'packages/cli/create-rasengan',
  rasengan: 'packages/framework/rasengan',
  'rasengan-image': 'packages/ecosystem/rasengan-image',
  'rasengan-i18n': 'packages/ecosystem/rasengan-i18n',
  'rasengan-mdx': 'packages/framework/rasengan-mdx',
  'rasengan-serve': 'packages/deploy/rasengan-serve',
  'rasengan-theme': 'packages/ecosystem/rasengan-theme',
  'rasengan-vercel': 'packages/deploy/rasengan-vercel',
  'rasengan-shuriken': 'packages/cli/rasengan-shuriken',
  'rasengan-kurama': 'packages/ecosystem/rasengan-kurama',
  'rasengan-kage-demo': 'packages/ecosystem/rasengan-kage-demo',
  'rasengan-io': 'packages/ecosystem/rasengan-io',
  'rasengan-runtime': 'packages/platform/rasengan-runtime',
  'rasengan-runtime-node': 'packages/platform/rasengan-runtime-node',
  'rasengan-runtime-bun': 'packages/platform/rasengan-runtime-bun',
  'rasengan-runtime-workerd': 'packages/platform/rasengan-runtime-workerd',
  'rasengan-server': 'packages/framework/rasengan-server',
};

release({
  repo: 'rasenganjs',
  packages: [
    'create-rasengan',
    'rasengan',
    'rasengan-image',
    'rasengan-i18n',
    'rasengan-mdx',
    'rasengan-serve',
    'rasengan-theme',
    'rasengan-vercel',
    'rasengan-shuriken',
    'rasengan-kurama',
    'rasengan-kage-demo',
    'rasengan-io',
    'rasengan-runtime',
    'rasengan-runtime-node',
    'rasengan-runtime-bun',
    'rasengan-runtime-workerd',
    'rasengan-server',
  ],
  toTag: (pkg, version) => {
    if (pkg === 'rasengan') {
      return `v${version}`;
    }

    return `${pkg}@${version}`;
  },
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
