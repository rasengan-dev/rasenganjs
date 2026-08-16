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

import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import { consola } from 'consola';
import {
  githubTemplatesURL,
  Kinds,
  Kind,
  Languages,
  Templates,
  Versions,
} from './constants/index.js';
import __dirname from './utils/dirname.js';
import createProjectFromTemplate from './scripts/template.js';
import fetchStarterTemplate from './scripts/fetch-starter.js';
import { logoTextAsciiCode } from './data/logo.js';

const program = new Command();

program
  .name(chalk.blue('create-rasengan'))
  .description(`\nYou are using ${chalk.bold.blue('Create Rasengan CLI')} 🎉\n`)
  .arguments('[project-name]')
  .option('--beta, --experimental', 'Consider latest beta version of Rasengan')
  .option('-y, --yes', 'Skip the questions and use the default values')
  .option('--git', 'Initialize a git repository')
  .option('--kind <kind>', `Choose a project kind (${Kinds.join(' | ')})`)
  .option(
    '--template <template-name>',
    `Choose a template (frontend kind only: ${Templates.join(' | ')})`
  )
  .option('--language <language-name>', 'Choose a language')
  .option('--chidori', 'Create a documentation website with chidori')
  .action(async (projectName, options) => {
    // Read the package.json file. __dirname is dist/ — tsup bundles
    // everything (including utils/dirname.ts) into a single dist/main.js,
    // so import.meta.url now resolves relative to the bundle's own
    // location, one level shallower than the old per-file tsc output.
    const packageJson = await fs.readFile(
      path.join(__dirname, '../package.json'),
      'utf-8'
    );

    // Parse the package.json file
    const parsedPackageJson = JSON.parse(packageJson);

    // logoTextAsciiCode
    console.log(chalk.blue(logoTextAsciiCode));
    // console.log(chalk.blue(logoAsciiCode));

    consola.info(`${chalk.bold.blue('Welcome to Rasengan.js')}`);

    // // Showing the welcome message
    consola.info(
      `You are using ${chalk.bold.blue(`create-rasengan CLI`)} ${chalk.bold.white(`v${parsedPackageJson.version}`)} 🎉\n`
    );

    // Getting the options
    const {
      experimental,
      yes: skip,
      language,
      git: initGit,
      kind: kindOption,
      template: templateOption,
      chidori,
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
        // Log the correct languages
        console.log(
          `Available languages: ${Languages.map((lang) => chalk.blue(lang))}`
        );
        console.log('');
        return;
      }
    }

    // Checking if the kind is well provided or not
    if (kindOption) {
      if (!Kinds.includes(kindOption)) {
        console.error(
          chalk.red(
            `The project kind ${chalk.bold.blue(`"${kindOption}"`)} is not supported!`
          )
        );
        console.log(
          `Available kinds: ${Kinds.map((kind) => chalk.blue(kind))}`
        );
        console.log('');
        return;
      }
    }

    // Checking if the template is well provided or not
    if (templateOption) {
      if (!Templates.includes(templateOption)) {
        console.error(
          chalk.red(
            `The template ${chalk.bold.blue(`"${templateOption}"`)} is not supported!`
          )
        );
        console.log(
          `Available templates: ${Templates.map((tpl) => chalk.blue(tpl))}`
        );
        console.log('');
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
      // Chidori template — a separate, standalone repo/product, not part
      // of the frontend/futon/server/monorepo kind axis below.
      if (chidori) {
        await createProjectFromTemplate({
          projectPath,
          templateName: `chidori`,
          repository: githubTemplatesURL.chidori,
          subDirectory: 'apps',
          currentDirectory: nameOfProject === '' ? true : false,
        });

        return;
      }

      // Getting the version based on the --beta option
      // let versionName = '';

      // if (experimental) {
      //   if (Versions.beta) {
      //     versionName = Versions.beta;
      //   }
      // } else {
      //   versionName = Versions.stable;
      // }

      // Resolve the project kind
      let kind: Kind;

      if (kindOption) {
        kind = kindOption;
      } else if (skip) {
        kind = 'frontend';
      } else {
        const answer = await consola.prompt(
          'What kind of project would you like to create?',
          {
            type: 'select',
            options: [...Kinds],
          }
        );

        kind = answer as Kind;
      }

      // Resolve the meta.json key for the chosen kind
      let templateKey: string;

      if (kind === 'frontend') {
        // Ask for the language
        const languageName = language
          ? language
          : skip
            ? 'typescript'
            : await consola.prompt(
                'Which language would you like to use for your project?',
                {
                  type: 'select',
                  options: Languages,
                }
              );

        // Get the template name
        const templateName = templateOption
          ? templateOption
          : skip
            ? 'blank'
            : await consola.prompt('Which template would you like to use?', {
                type: 'select',
                options: Templates,
              });

        // Version of tailwind if the template is tailwind
        let tailwindVersion = '';

        if (templateName === 'tailwind') {
          tailwindVersion = skip
            ? 'v4'
            : await consola.prompt(
                'Which version of Tailwind would you like to use?',
                {
                  type: 'select',
                  options: ['v3', 'v4'],
                }
              );
        }

        // shadcn only ships a file-based variant — skip the routing
        // question and force it, rather than prompting for a
        // combination that doesn't exist.
        let routingMode: string;

        if (templateName === 'shadcn') {
          routingMode = 'file-based';
        } else if (skip) {
          routingMode = 'file-based';
        } else {
          const routingModeAnswer = await consola.prompt(
            'Do you want to enable file-based routing?',
            {
              type: 'confirm',
            }
          );

          routingMode = routingModeAnswer ? 'file-based' : 'config-based';
        }

        if (skip) {
          // Display the selected values
          console.log('');
          console.log(chalk.bold.blue('Default values:'));
          console.log('');

          console.log(`Kind: ${chalk.blue(kind)}`);
          console.log(`Language: ${chalk.blue(languageName)}`);
          console.log(`Template: ${chalk.blue(templateName)}`);
          console.log(`Routing mode: ${chalk.blue(routingMode)}`);
        }

        const routingPart = routingMode === 'file-based' ? 'file' : 'config';
        const langPart = languageName === 'typescript' ? 'ts' : 'js';
        const templatePart =
          templateName === 'tailwind'
            ? `tailwind-${tailwindVersion}`
            : templateName;

        templateKey = `frontend-${routingPart}-${templatePart}-${langPart}`;
      } else {
        // futon / server / monorepo only ship a single TypeScript,
        // blank variant today — the "blank" slot in the key leaves
        // room to add more variants (and a matching prompt) later.
        templateKey = `${kind}-blank-ts`;
      }

      await fetchStarterTemplate({
        projectPath,
        templateKey,
        initGit: Boolean(initGit),
        // rasenganVersion: versionName || undefined,
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
