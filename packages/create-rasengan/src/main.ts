#!/usr/bin/env node

/**
 * Copyright (c) 2023-Present, Rasengan.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create-Rasengan-App CLI Tool for creating your frontend projects built using Rasengan.js Framework.
 *
 * You don't need to install this package manually before trying to use it in order to create your project.
 * You can use this package by running the following command:
 *
 * npx create-rasengan <project-name>
 *
 * or
 *
 * yarn create rasengan <project-name>
 *
 * or
 *
 * pnpm create rasengan <project-name>
 */

import { simpleGit, SimpleGitOptions } from 'simple-git';
import chalk from 'chalk';
import { Command } from 'commander';
import ora from 'ora';
import fs from 'node:fs/promises';
import path from 'node:path';
import ncp from 'ncp';
import { consola } from 'consola';
import { Languages, Templates, Versions } from './constants/index.js';
import __dirname from './utils/dirname.js';
import { logInfo } from './scripts/log-info.js';
import createProjectFromTemplate from './scripts/template.js';
import logoAsciiCode from './data/logo.js';

// Spinner
const spinner = (text: string) =>
  ora({
    text,
    spinner: 'dots',
    color: 'blue',
  });

const program = new Command();

program
  .name(chalk.blue('create-rasengan'))
  .description(`\nYou are using ${chalk.bold.blue('Create Rasengan CLI')} 🎉\n`)
  .arguments('[project-name]')
  .option('--beta, --experimental', 'Consider latest beta version of Rasengan')
  .option('-y, --yes', 'Skip the questions and use the default values')
  .option('--git', 'Initialize a git repository')
  // .option('--template <template-name>', 'Choose a template')
  .option('--language <language-name>', 'Choose a language')
  .option('--with-shadcn', 'Use shadcn template')
  .action(async (projectName, options) => {
    // Read the package.json file
    const packageJson = await fs.readFile(
      path.join(__dirname, '../../package.json'),
      'utf-8'
    );

    // Parse the package.json file
    const parsedPackageJson = JSON.parse(packageJson);

    console.log(chalk.blue(logoAsciiCode));

    consola.info(`${chalk.bold.blue('Welcome to Rasengan!')} 🌀`);

    // // Showing the welcome message
    consola.info(
      `You are using ${chalk.bold.blue(`Create Rasengan CLI ${chalk.bgBlue(chalk.white(`v${parsedPackageJson.version}`))}`)} 🎉\n`
    );

    // Getting the options
    const {
      experimental,
      yes: skip,
      language,
      git: initGit,
      withShadcn,
    } = options;

    if (experimental) {
      if (Versions.beta) {
        consola.warn(
          'You are using the latest beta version of Rasengan.js. Please note that this version may be unstable.'
        );
      } else {
        consola.error(
          'The Rasengan beta version is not available at the moment. Please use the stable release.'
        );

        return;
      }
    } else {
      if (!Versions.stable) {
        consola.warn(
          `Rasengan.js is currently in beta. We're actively working to enhance its stability.`
        );
      }
    }

    // Checking if the language is well provided or not
    if (language) {
      if (!Languages.includes(language)) {
        console.error(
          chalk.red(
            `The language ${chalk.bold.blue(`"${language}"`)} is not supported!`
          )
        );
        return;
      }
    }

    // Getting the current directory
    const currentDirectory = process.cwd();

    let nameOfProject: string = projectName || '';

    // Checking if the project name is provided
    if (!projectName) {
      const answer = await consola.prompt(
        'What would you like to name your project?',
        {
          type: 'text',
          default: 'my-rasengan-app',
        }
      );

      nameOfProject = answer;
    }

    // Checking the format of the project name
    if (nameOfProject === '.') {
      nameOfProject = '';
    } else {
      if (nameOfProject.includes(' ')) {
        consola.error(
          "Project's name can't include spaces. Please use dashes."
        );
        return;
      }

      if (!/^[a-z0-9_-]*$/i.test(nameOfProject)) {
        consola.error(
          'Project name can only include letters, numbers, underscores and hashes.'
        );
        return;
      }

      if (nameOfProject !== nameOfProject.toLowerCase()) {
        consola.error('Project name can only be in lowercase letters.');
        return;
      }
    }

    // Checking if the project already exists
    const projectPath = path.posix.join(currentDirectory, nameOfProject);

    // Checking if the project already exists
    try {
      const dir = await fs.readdir(projectPath);
      const projectName =
        nameOfProject === ''
          ? currentDirectory.split('/').pop()
          : nameOfProject;

      if (dir.length > 0) {
        // Returning if the project already exists
        consola.error(
          `The folder with the name ${chalk.bold.blue(`"${projectName}"`)} is not empty!`
        );
        consola.info(
          chalk.white(
            `💡 Please use another name or delete the existing folder!`
          )
        );
      } else {
        throw new Error('Folder exist but empty');
      }
    } catch (err) {
      // Handling the case when custom template is provided
      // Shadcn template
      if (withShadcn) {
        const languageCode = language
          ? language === 'typescript'
            ? 'ts'
            : 'js'
          : 'ts';

        await createProjectFromTemplate(projectPath, `shadcn-${languageCode}`, {
          currentDirectory: nameOfProject === '' ? true : false,
        });

        return;
      }

      // TODO: other templates

      // Getting the version based on the --beta option
      let versionName = '';

      if (experimental) {
        versionName = Versions.beta;
      } else {
        versionName = Versions.stable || Versions.beta;
      }

      // Ask for the language
      let languageName = '';

      // Get the template name
      let templateName = '';

      // Version of tailwind if the template is tailwind
      let tailwindVersion = '';

      // Prepare question about tools
      // let tools = [];

      // Prepare question for the state manager
      // let stateManager = "";

      if (!skip) {
        if (!language) {
          // Prepare the question for the language
          const answer = await consola.prompt(
            'Which language would you like to use for your project?',
            {
              type: 'select',
              options: Languages,
            }
          );

          languageName = answer;
        } else {
          languageName = language;
        }

        // Prepare the question for the template
        const answer = await consola.prompt(
          'Which template would you like to use?',
          {
            type: 'select',
            options: Templates,
          }
        );

        templateName = answer;

        // Check if the template is tailwind
        if (templateName === 'tailwind') {
          // Prepare the question for the tailwind version
          const answer = await consola.prompt(
            'Which version of Tailwind would you like to use?',
            {
              type: 'select',
              options: ['v3', 'v4'],
            }
          );

          tailwindVersion = answer;
        }
      } else {
        languageName = 'typescript';
        templateName = 'blank';

        // Display the selected values
        console.log('');
        console.log(chalk.bold.blue('Default values:'));
        console.log('');

        console.log(`Language: ${chalk.blue(languageName)}`);
        console.log(`Template: ${chalk.blue(templateName)}`);
      }

      // Handling all answers
      const templatePath = path.join(
        __dirname,
        '../..',
        `templates/${templateName}${
          templateName === 'tailwind'
            ? tailwindVersion === 'v3'
              ? '-v3'
              : '-v4'
            : ''
        }-${languageName === 'typescript' ? 'ts' : 'js'}`
      );

      // Starting the spinner for creating the project
      const createSpinner = spinner('Creating project...');

      console.log('\n');

      createSpinner.start();

      // Copying the template files to the project directory
      ncp(templatePath, projectPath, async (err) => {
        if (err) {
          console.log(err);
          createSpinner.fail(chalk.red('Error while creating the project!'));
          console.log('');
          return;
        }

        // Copying content of gitignore to .gitignore file
        await fs.copyFile(
          path.join(templatePath, 'gitignore'),
          path.join(projectPath, '.gitignore')
        );

        // Removing gitignore file from the project
        await fs.rm(path.join(projectPath, 'gitignore'));

        // Updating the package.json file
        let packageJson = await fs.readFile(
          path.join(projectPath, 'pkg.json'),
          'utf-8'
        );

        // Removing gitignore file from the project
        await fs.rm(path.join(projectPath, 'pkg.json'));

        // Parsing the package.json file
        const parsedPackageJson = JSON.parse(packageJson);

        // Setting the project name
        if (nameOfProject === '') {
          parsedPackageJson.name = currentDirectory.split('/').pop();
        } else parsedPackageJson.name = nameOfProject;

        // Setting the version
        parsedPackageJson.dependencies['rasengan'] = versionName;

        // Writing the package.json file
        await fs.writeFile(
          path.join(projectPath, 'package.json'),
          JSON.stringify(parsedPackageJson, null, 2)
        );

        if (initGit) {
          // Initialization of git repository
          const options: Partial<SimpleGitOptions> = {
            baseDir: projectPath,
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false,
          };

          const git = simpleGit(options);

          // Initializing the git repository
          await git.init();
          await git.add('-A');
          await git.commit('Initial commit');
        }

        await new Promise((resolve) =>
          setTimeout(() => {
            createSpinner.succeed(chalk.green('Project created successfully!'));

            resolve('');
          }, 2000)
        );
        console.log('');

        // Logging next steps
        logInfo(nameOfProject);
      });
    }
  });

program.parse(process.argv);

['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.once(signal, () => {
    console.log('\n');
    console.log(chalk.red('❌ The process was interrupted!'));
  });
});
