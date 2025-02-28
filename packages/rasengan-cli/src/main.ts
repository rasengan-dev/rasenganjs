#!/usr/bin/env node

/**
 * Copyright (c) 2023-Present, Rasengan.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Rasengan CLI Tool for creating your frontend projects built using Rasengan.js Framework.
 *
 * You don't need to install this package manually before trying to use it in order to create your project.
 */

import chalk from 'chalk';
import { Command } from 'commander';
import ora from 'ora';
import fs from 'node:fs/promises';
import path from 'node:path';
import ncp from 'ncp';
import { Languages, Templates, Versions } from './constants/index.js';
import __dirname from './utils/dirname.js';

// Spinner
const spinner = (text: string) =>
  ora({
    text,
    spinner: 'dots',
    color: 'blue',
  });

const program = new Command();

program
  .name(chalk.blue('rasengan'))
  .description(`\nYou are using ${chalk.bold.blue('Rasengan CLI')} 🎉\n`)
  .action(async () => {});

program
  .command('generate <target>')
  .description(
    'Generate either a router or a layout, page or the whole resource.'
  )
  .option('-p, --path [pathname]', 'Path to generate the resource.')
  .action(async (target, options) => {
    console.log({ target, options });
  });

program.parse(process.argv);
