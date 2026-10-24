import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// The real CLI clones rasengan-dev/rasenganjs-starter from GitHub. Point
// it at a local repository with the same layout instead, so the real
// simple-git calls (shallow clone, sparse checkout, init/commit) run
// without the network.
const starter = vi.hoisted(() => ({ url: '' }));

vi.mock('../src/constants/index.js', async (importOriginal) => {
  const original =
    await importOriginal<typeof import('../src/constants/index.js')>();
  return {
    ...original,
    githubTemplatesURL: {
      ...original.githubTemplatesURL,
      get starter() {
        return starter.url;
      },
    },
  };
});
vi.mock('../src/utils/sleep.js', () => ({ sleep: () => Promise.resolve() }));

const { default: fetchStarterTemplate } =
  await import('../src/scripts/fetch-starter.js');

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'create-rasengan-'));
const originalHome = process.env.HOME;

function git(cwd: string, ...args: string[]) {
  return execFileSync('git', args, { cwd, stdio: 'pipe' }).toString().trim();
}

function write(file: string, content: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

beforeAll(() => {
  // Isolated git identity: the --git option commits, and CI runners have
  // no global user.name / user.email.
  const home = path.join(tmpRoot, 'home');
  write(
    path.join(home, '.gitconfig'),
    '[user]\n\tname = Test\n\temail = test@example.com\n[init]\n\tdefaultBranch = main\n'
  );
  process.env.HOME = home;

  const repo = path.join(tmpRoot, 'starter');
  write(
    path.join(repo, 'meta.json'),
    JSON.stringify({
      'frontend-file-blank-ts': { path: 'frontend/file-based/blank-ts' },
      'server-blank-ts': { path: 'server/blank-ts' },
    })
  );
  write(
    path.join(repo, 'frontend/file-based/blank-ts/package.json'),
    JSON.stringify({
      name: 'frontend-file-blank-ts',
      dependencies: { rasengan: '^2.0.0' },
    })
  );
  write(
    path.join(repo, 'frontend/file-based/blank-ts/src/index.ts'),
    'export {};\n'
  );
  write(
    path.join(repo, 'server/blank-ts/package.json'),
    JSON.stringify({ name: 'server-blank-ts' })
  );
  git(repo, 'init', '-q');
  git(repo, 'add', '-A');
  git(repo, 'commit', '-q', '-m', 'starter');

  // file:// so the shallow --depth clone is honored.
  starter.url = `file://${repo}`;
});

afterAll(() => {
  process.env.HOME = originalHome;
  fs.rmSync(tmpRoot, { recursive: true, force: true });
});

let projectPath: string;

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
  projectPath = path.join(fs.mkdtempSync(path.join(tmpRoot, 'out-')), 'my-app');
});

describe('fetchStarterTemplate', () => {
  it('copies only the selected template into the project folder', async () => {
    await fetchStarterTemplate({
      projectPath,
      templateKey: 'frontend-file-blank-ts',
      initGit: false,
    });

    expect(
      fs.readFileSync(path.join(projectPath, 'src/index.ts'), 'utf8')
    ).toBe('export {};\n');
    // The sparse checkout must not leak the other templates or the clone.
    expect(fs.existsSync(path.join(projectPath, '.tmp'))).toBe(false);
    expect(fs.existsSync(path.join(projectPath, 'server'))).toBe(false);
    expect(fs.existsSync(path.join(projectPath, 'meta.json'))).toBe(false);
    expect(fs.existsSync(path.join(projectPath, '.git'))).toBe(false);
  });

  it('renames the package after the project folder and keeps its dependencies', async () => {
    await fetchStarterTemplate({
      projectPath,
      templateKey: 'frontend-file-blank-ts',
      initGit: false,
    });

    const pkg = JSON.parse(
      fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8')
    );
    expect(pkg).toEqual({
      name: 'my-app',
      dependencies: { rasengan: '^2.0.0' },
    });
  });

  it('initializes a git repository with an initial commit when asked', async () => {
    await fetchStarterTemplate({
      projectPath,
      templateKey: 'server-blank-ts',
      initGit: true,
    });

    expect(git(projectPath, 'log', '--format=%s')).toBe('Initial commit');
    expect(git(projectPath, 'status', '--porcelain')).toBe('');
  });

  it('removes the project folder when the template key does not exist', async () => {
    await fetchStarterTemplate({
      projectPath,
      templateKey: 'frontend-file-unknown-ts',
      initGit: false,
    });

    expect(fs.existsSync(projectPath)).toBe(false);
  });

  it('removes the project folder when the starter cannot be cloned', async () => {
    const previous = starter.url;
    starter.url = `file://${path.join(tmpRoot, 'does-not-exist')}`;

    try {
      await fetchStarterTemplate({
        projectPath,
        templateKey: 'frontend-file-blank-ts',
        initGit: false,
      });
    } finally {
      starter.url = previous;
    }

    expect(fs.existsSync(projectPath)).toBe(false);
  });
});
