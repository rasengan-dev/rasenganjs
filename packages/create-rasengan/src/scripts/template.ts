import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import { rimraf } from 'rimraf';
import { TEMPLATE_GITHUB_URL } from '../constants/index.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import ora from 'ora';
import ncp from 'ncp';
import chalk from 'chalk';
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

export default async function createProjectFromTemplate(
  projectPath: string,
  templateName: string,
  option: {
    currentDirectory: boolean;
  }
) {
  // Start timer
  const start = Date.now();

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
    const createSpinner = spinner('Creating project...');

    createSpinner.start();

    await sleep(1000);
    createSpinner.text = 'Cloning the template...';

    try {
      // Clone the template repository
      await git.clone(TEMPLATE_GITHUB_URL, '.tmp', [
        '--no-checkout',
        '--depth',
        '1',
      ]);
    } catch (error) {
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

    // Add the examples folder to the sparse-checkout
    await git.raw(['sparse-checkout', 'set', `examples/${templateName}`]);

    // Extract the examples folder
    await git.raw(['checkout', 'HEAD', '--', `examples/${templateName}`]);

    const templatePath = path.posix.join(tmpFolder, `examples/${templateName}`);

    // // Add the template path to the sparse-checkout
    // await git.raw(['sparse-checkout', 'set', templatePath]);

    // // Extract the template files
    // await git.raw(['checkout', 'HEAD', '--', templatePath]);

    // check if the template exists
    try {
      await fs.readdir(templatePath);
    } catch (err) {
      createSpinner.fail(
        chalk.red(
          `Template with name ${chalk.bold.blue(
            `"${templateName}"`
          )} not found!`
        )
      );

      // delete the temporary folder
      rimraf.sync(projectPath);

      return;
    }

    await sleep(2000);
    createSpinner.text = 'Copying the template files...';

    // Copying the template files to the project directory
    ncp(templatePath, projectPath, async (err) => {
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
      createSpinner.text = 'Updating the package.json file...';

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

      // cd to the project directory
      // await git.cwd(projectPath);

      // Removing the temporary folder
      rimraf.sync(tmpFolder);

      // Initializing the git repository
      // await git.init();
      // await git.add('-A');
      // await git.commit('Initial commit');

      // Stopping the spinner
      await sleep(1000);
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

      return;
    });
  } catch (error) {
    console.log(error);

    // delete the temporary folder
    rimraf.sync(projectPath);

    return;
  }
}
