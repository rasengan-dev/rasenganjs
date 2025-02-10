import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import { rimraf } from 'rimraf';
import { TEMPLATE_GITHUB_URL } from '../constants/index.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import ora from 'ora';
import ncp from 'ncp';
import chalk from 'chalk';
import { logInfo } from './log-info.js';

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

    // Starting the spinner for creating the project
    const createSpinner = spinner('Creating project...');

    createSpinner.start();

    try {
      // Clone the template repository
      await git.clone(TEMPLATE_GITHUB_URL, '.tmp');
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

    const srcFolder = path.join(tmpFolder, `templates/${templateName}`);

    // check if the template exists
    try {
      await fs.readdir(srcFolder);
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

      // Updating the package.json file
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

      // Initializing the git repository
      await git.init();
      await git.add('-A');
      await git.commit('Initial commit');

      createSpinner.succeed(chalk.green('Project created successfully!'));

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
