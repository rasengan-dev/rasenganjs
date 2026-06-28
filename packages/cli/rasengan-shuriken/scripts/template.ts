import { SimpleGit, simpleGit, SimpleGitOptions } from 'simple-git';
import chalk from 'chalk';
import fs from 'node:fs/promises';
import path from 'node:path';
import ncp from 'ncp';
import { rimraf } from 'rimraf';
import { logInfo } from '../utils/log-info.js';
import { sleep } from '../utils/sleep.js';
import ora from 'ora';

const RASENGANHUB_REPO =
  'https://github.com/rasengan-dev/rasenganjs-examples.git';

// Spinner
const spinner = (text: string) =>
  ora({
    text,
    spinner: 'dots',
    color: 'blue',
  });

export default async function createProjectFromTemplate(
  projectPath: string,
  projectKey: string,
  options: { hub?: boolean; blocks?: boolean }
) {
  const { hub, blocks } = options;

  const REPOSITORY = hub ? RASENGANHUB_REPO : blocks ? '' : RASENGANHUB_REPO;

  if (!REPOSITORY) {
    console.log(
      chalk.red(
        'Please specify a project key or use the --hub or --blocks option'
      )
    );
    return;
  }

  // Get the temporary folder path, the place where the repository will be cloned
  const tmpFolder = path.join(projectPath, '.tmp');

  const nameOfProject = projectPath.split('/').pop() as string;

  try {
    // Create a temporary folder
    await fs.mkdir(tmpFolder, { recursive: true });

    // Initialize the git client
    const options: Partial<SimpleGitOptions> = {
      baseDir: projectPath,
      binary: 'git',
      maxConcurrentProcesses: 6,
      trimmed: false,
    };

    // when setting all options in a single object
    const git: SimpleGit = simpleGit(options);

    console.log('');

    // Starting the spinner for creating the project
    const createSpinner = spinner(
      `Cloning template into '${chalk.bold.blue(projectPath.split('/').pop())}'`
    );

    createSpinner.start();

    try {
      // Clone the template repository
      await git.clone(REPOSITORY, '.tmp', ['--no-checkout', '--depth', '1']);
    } catch (error) {
      console.error(error);
      createSpinner.fail(
        chalk.red(
          'Error while cloning the template, please check your internet connection!'
        )
      );

      // delete the temporary folder
      rimraf.sync(projectPath);

      return;
    }

    // cd into the temporary folder
    await git.cwd(tmpFolder);

    // Activate the git sparse-checkout feature
    await git.raw(['sparse-checkout', 'init', '--cone']);

    // Add the meta.json file to the sparse-checkout
    await git.raw(['sparse-checkout', 'set', 'meta.json']);

    // Extract the meta.json
    await git.raw(['checkout', 'HEAD', '--', 'meta.json']);

    // Read the meta.json file from the temporary folder
    const metaFilePath = path.join(tmpFolder, 'meta.json');
    const metaData = await fs.readFile(metaFilePath, 'utf-8');
    const metaDataJson = JSON.parse(metaData);

    const templatePath = metaDataJson[projectKey].path;

    // Add the template path to the sparse-checkout
    await git.raw(['sparse-checkout', 'set', templatePath]);

    // Extract the template files
    await git.raw(['checkout', 'HEAD', '--', templatePath]);

    const srcFolder = path.posix.join(tmpFolder, `/${templatePath}`);

    // check if the template exists
    try {
      await fs.readdir(srcFolder);
    } catch (err) {
      createSpinner.fail(
        chalk.red(
          `Template with code ${chalk.bold.blue(`"${projectKey}"`)} not found!`
        )
      );

      // delete the temporary folder
      rimraf.sync(projectPath);

      return;
    }

    createSpinner.stopAndPersist({
      symbol: chalk.green('✔'),
      text: `Project '${chalk.bold.blue(projectKey)}' cloned`,
    });

    createSpinner.start('Copying the template files');

    // Copying the template files to the project directory
    ncp(srcFolder, projectPath, async (err) => {
      if (err) {
        createSpinner.fail(
          chalk.red('Error while creating the project, please try again!')
        );
        console.log('');

        // delete the temporary folder
        rimraf.sync(projectPath);

        return;
      }

      await sleep(2000);

      createSpinner.stopAndPersist({
        symbol: chalk.green('✔'),
        text: `Template files copied into '${chalk.bold.blue(projectPath.split('/').pop())}'`,
      });

      createSpinner.start('Updating the package.json file');

      // Read the package.json file

      let packageJsonString = await fs.readFile(
        path.join(projectPath, 'package.json'),
        'utf-8'
      );

      const packageJson = JSON.parse(packageJsonString);

      // update the name of the project
      packageJson.name = nameOfProject;

      await fs.writeFile(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      );

      // Removing the temporary folder
      rimraf.sync(tmpFolder);

      await git.cwd(projectPath);

      await sleep(2000);

      createSpinner.stopAndPersist({
        symbol: chalk.green('✔'),
        text: `Package.json file updated`,
      });

      createSpinner.start('Initializing the git repository');

      // Initializing the git repository
      await git.init();
      await git.add('-A');
      await git.commit('Initial commit');

      // Stopping the spinner
      await sleep(1000);
      createSpinner.succeed(chalk.green('Your project is ready!'));

      console.log('');

      // Log next steps
      logInfo(nameOfProject);

      return;
    });
  } catch (error) {
    console.log(error);

    // delete the temporary folder
    rimraf.sync(projectPath);

    return;
  }
}
