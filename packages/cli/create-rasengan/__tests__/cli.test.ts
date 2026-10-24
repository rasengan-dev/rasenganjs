import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const mocks = vi.hoisted(() => ({
  fetchStarterTemplate: vi.fn(() => Promise.resolve()),
  createProjectFromTemplate: vi.fn(() => Promise.resolve()),
}));

vi.mock('../src/scripts/fetch-starter.js', () => ({
  default: mocks.fetchStarterTemplate,
}));
vi.mock('../src/scripts/template.js', () => ({
  default: mocks.createProjectFromTemplate,
}));
// Bundled into dist/main.js, main.ts reads `${__dirname}/../package.json`;
// from source, __dirname would be src/utils/ instead.
vi.mock('../src/utils/dirname.js', async () => {
  const { fileURLToPath } = await import('node:url');
  const nodePath = await import('node:path');
  const here = nodePath.dirname(fileURLToPath(import.meta.url));
  return { default: nodePath.join(here, '..', 'dist') };
});

const originalArgv = process.argv;
const originalCwd = process.cwd();
let cwd: string;
let errors: string[];

/** Runs the CLI in-process and waits for its async action to settle. */
async function run(...args: string[]) {
  process.argv = ['node', 'create-rasengan', ...args];
  vi.resetModules();
  await import('../src/main.js');

  // program.parse() does not await the action; wait until it either
  // reaches the generator or reports an error.
  await vi.waitFor(
    () => {
      const settled =
        mocks.fetchStarterTemplate.mock.calls.length > 0 ||
        mocks.createProjectFromTemplate.mock.calls.length > 0 ||
        errors.length > 0;
      if (!settled) throw new Error('CLI still running');
    },
    { timeout: 5_000 }
  );
}

beforeEach(async () => {
  cwd = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), 'create-rasengan-cli-'))
  );
  process.chdir(cwd);
  errors = [];

  mocks.fetchStarterTemplate.mockClear();
  mocks.createProjectFromTemplate.mockClear();

  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation((...args) => {
    errors.push(args.join(' '));
  });
  const { consola } = await import('consola');
  vi.spyOn(consola, 'error').mockImplementation(((...args: unknown[]) => {
    errors.push(args.join(' '));
  }) as never);
  vi.spyOn(consola, 'info').mockImplementation(() => {});
  vi.spyOn(consola, 'prompt').mockImplementation((async () => {
    throw new Error('the CLI prompted although every answer was provided');
  }) as never);
});

afterEach(() => {
  process.argv = originalArgv;
  process.chdir(originalCwd);
  vi.restoreAllMocks();
  fs.rmSync(cwd, { recursive: true, force: true });
});

const generated = () => mocks.fetchStarterTemplate.mock.calls[0]?.[0];

describe('create-rasengan template selection', () => {
  it('defaults to the TypeScript blank file-based frontend with -y', async () => {
    await run('my-app', '-y');

    expect(generated()).toEqual({
      projectPath: path.posix.join(cwd, 'my-app'),
      templateKey: 'frontend-file-blank-ts',
      initGit: false,
    });
  });

  it.each([
    [['--language', 'javascript'], 'frontend-file-blank-js'],
    [['--template', 'tailwind'], 'frontend-file-tailwind-v4-ts'],
    [
      ['--template', 'tailwind', '--language', 'javascript'],
      'frontend-file-tailwind-v4-js',
    ],
    [['--template', 'shadcn'], 'frontend-file-shadcn-ts'],
    [['--kind', 'futon'], 'futon-blank-ts'],
    [['--kind', 'server'], 'server-blank-ts'],
    [['--kind', 'monorepo'], 'monorepo-blank-ts'],
  ])('maps %j to the "%s" starter', async (options, templateKey) => {
    await run('my-app', '-y', ...options);

    expect(generated()?.templateKey).toBe(templateKey);
  });

  it('initializes git only with --git', async () => {
    await run('my-app', '-y', '--git');

    expect(generated()?.initGit).toBe(true);
  });

  it('generates into the current folder when the name is "."', async () => {
    await run('.', '-y');

    expect(generated()?.projectPath).toBe(cwd);
  });

  it('uses the chidori repository with --chidori', async () => {
    await run('my-docs', '-y', '--chidori');

    expect(mocks.createProjectFromTemplate).toHaveBeenCalledWith(
      expect.objectContaining({
        projectPath: path.posix.join(cwd, 'my-docs'),
        templateName: 'chidori',
      })
    );
    expect(mocks.fetchStarterTemplate).not.toHaveBeenCalled();
  });
});

describe('create-rasengan input validation', () => {
  it.each([
    [['my-app', '-y', '--language', 'rust'], 'The language'],
    [['my-app', '-y', '--kind', 'desktop'], 'The project kind'],
    [['my-app', '-y', '--template', 'bootstrap'], 'The template'],
    [['my app', '-y'], "can't include spaces"],
    [['My-App', '-y'], 'lowercase'],
    [['my@app', '-y'], 'can only include letters'],
  ])('rejects %j without generating anything', async (args, message) => {
    await run(...args);

    expect(errors.join('\n')).toContain(message);
    expect(mocks.fetchStarterTemplate).not.toHaveBeenCalled();
  });

  it('refuses to generate into a folder that is not empty', async () => {
    fs.mkdirSync(path.join(cwd, 'my-app'));
    fs.writeFileSync(path.join(cwd, 'my-app', 'keep.txt'), 'existing work');

    await run('my-app', '-y');

    expect(errors.join('\n')).toContain('is not empty');
    expect(mocks.fetchStarterTemplate).not.toHaveBeenCalled();
    expect(fs.readFileSync(path.join(cwd, 'my-app', 'keep.txt'), 'utf8')).toBe(
      'existing work'
    );
  });

  it('accepts an existing but empty folder', async () => {
    fs.mkdirSync(path.join(cwd, 'my-app'));

    await run('my-app', '-y');

    expect(generated()?.templateKey).toBe('frontend-file-blank-ts');
  });
});
