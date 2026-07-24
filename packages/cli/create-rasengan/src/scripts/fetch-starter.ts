import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import { rimraf } from 'rimraf';
import path from 'node:path';
import fs from 'node:fs/promises';
import ora from 'ora';
import ncp from 'ncp';
import chalk from 'chalk';
import { githubTemplatesURL } from '../constants/index.js';
import { logInfo } from './log-info.js';
import { sleep } from '../utils/sleep.js';
import { convertSecondsToMinutes } from '../utils/converter.js';

// Spinner
const spinner = (text: string) =>
  ora({
    text,
    spinner: 'dots',
    color: 'blue',
  });

/**
 * Rewrites a template's package.json in place: sets its `name`, and
 * (if present) pins the `rasengan` dependency to `rasenganVersion`.
 * No-ops silently if the file doesn't exist (e.g. a mono-repo's
 * `server/` package has no `rasengan` dependency to pin).
 */
async function rewritePackageJson(
  packageJsonPath: string,
  { name, rasenganVersion }: { name?: string; rasenganVersion?: string }
) {
  let packageJsonString: string;

  try {
    packageJsonString = await fs.readFile(packageJsonPath, 'utf-8');
  } catch {
    return;
  }

  const packageJson = JSON.parse(packageJsonString);

  if (name) packageJson.name = name;

  if (rasenganVersion && packageJson.dependencies?.rasengan) {
    packageJson.dependencies.rasengan = rasenganVersion;
  }

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

/**
 * Fetches a template from the `rasenganjs-starter` repo (via `meta.json`)
 * and copies it into `projectPath`.
 */
export default async function fetchStarterTemplate(options: {
  projectPath: string;
  templateKey: string;
  initGit: boolean;
  rasenganVersion?: string;
}) {
  // Start timer
  const start = Date.now();

  const { projectPath, templateKey, initGit, rasenganVersion } = options;

  // Get the temporary folder path, the place where the repository will be cloned
  const tmpFolder = path.join(projectPath, '.tmp');

  const nameOfProject = projectPath.split('/').pop() as string;

  try {
    // Create a temporary folder
    await fs.mkdir(tmpFolder, { recursive: true });

    // Initialize the git client
    const gitOptions: Partial<SimpleGitOptions> = {
      baseDir: projectPath,
      binary: 'git',
      maxConcurrentProcesses: 6,
      trimmed: false,
    };

    const git: SimpleGit = simpleGit(gitOptions);

    console.log('');

    // Starting the spinner for creating the project
    const createSpinner = spinner('Creating project...');

    createSpinner.start();

    try {
      // Clone the starter repository. --filter=blob:none is the part that
      // actually makes the sparse-checkout below fast: without it, git
      // clone already downloads every file's content for the whole repo
      // (sparse-checkout only controls what gets *written to disk*
      // afterward, not what gets *fetched* over the network) — with it,
      // blobs are fetched lazily, only for the paths we later check out.
      // Measured on a comparably-sized sibling repo: 31MB -> 492KB
      // downloaded, ~87s -> ~25s wall clock for a single template.
      await git.clone(githubTemplatesURL.starter, '.tmp', [
        '--no-checkout',
        '--depth',
        '1',
        '--filter=blob:none',
      ]);
    } catch (error) {
      createSpinner.fail(
        chalk.red(
          'Error while cloning the project, please check your internet connection!'
        )
      );

      rimraf.sync(projectPath);

      return;
    }

    // cd into the temporary folder
    await git.cwd(tmpFolder);

    // Activate the git sparse-checkout feature
    await git.raw(['sparse-checkout', 'init', '--cone']);

    // Fetch meta.json first to resolve the template key to a path
    await git.raw(['sparse-checkout', 'set', 'meta.json']);
    await git.raw(['checkout', 'HEAD', '--', 'meta.json']);

    const metaFilePath = path.join(tmpFolder, 'meta.json');
    const metaData = await fs.readFile(metaFilePath, 'utf-8');
    const metaDataJson = JSON.parse(metaData);

    const entry = metaDataJson[templateKey];

    if (!entry) {
      createSpinner.fail(
        chalk.red(
          `Template with key ${chalk.bold.blue(`"${templateKey}"`)} not found!`
        )
      );

      rimraf.sync(projectPath);

      return;
    }

    const templatePath = entry.path as string;

    // Add the template path to the sparse-checkout
    await git.raw(['sparse-checkout', 'set', templatePath]);

    // Extract the template files
    await git.raw(['checkout', 'HEAD', '--', templatePath]);

    const srcFolder = path.posix.join(tmpFolder, templatePath);

    // check if the template exists
    try {
      await fs.readdir(srcFolder);
    } catch (err) {
      createSpinner.fail(
        chalk.red(
          `Template with key ${chalk.bold.blue(`"${templateKey}"`)} not found!`
        )
      );

      rimraf.sync(projectPath);

      return;
    }

    await sleep(1000);
    createSpinner.text = 'Copying the project files...';

    // Copying the template files to the project directory
    await new Promise<void>((resolve, reject) => {
      ncp(srcFolder, projectPath, (err) => (err ? reject(err) : resolve()));
    }).catch(() => {
      createSpinner.fail(
        chalk.red('Error while creating the project, please try again!')
      );
      console.log('');

      rimraf.sync(projectPath);

      throw new Error('copy-failed');
    });

    await sleep(1000);
    createSpinner.text = 'Updating the package.json file...';

    // Rewrite the project's own package.json (root package.json for
    // every kind, including the mono-repo's workspace root)
    await rewritePackageJson(path.join(projectPath, 'package.json'), {
      name: nameOfProject,
      rasenganVersion,
    });

    // The mono-repo template nests a `rasengan` frontend under `web/` —
    // its own package.json also needs the version pin (name stays "web")
    await rewritePackageJson(path.join(projectPath, 'web', 'package.json'), {
      rasenganVersion,
    });

    // Removing the temporary folder
    rimraf.sync(tmpFolder);

    if (initGit) {
      await git.cwd(projectPath);

      await git.init();
      await git.add('-A');
      await git.commit('Initial commit');
    }

    // Stopping the spinner
    await sleep(500);
    createSpinner.succeed(chalk.green('Project created successfully!'));

    console.log('');

    // End timer
    const end = Date.now();
    console.log(
      `${chalk.gray('Finished in')} ${chalk.green(`${convertSecondsToMinutes((end - start) / 1000)}`)}`
    );

    console.log('');

    // Log next steps
    logInfo(nameOfProject);
  } catch (error) {
    if (!(error instanceof Error) || error.message !== 'copy-failed') {
      console.log(error);
    }

    rimraf.sync(projectPath);

    return;
  }
}
