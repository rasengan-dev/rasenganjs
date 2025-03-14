import chalk from 'chalk';
import { Command } from 'commander';
import path from 'node:path';
import createProjectFromTemplate from './scripts/template.js';

const program = new Command();

program
  .name(chalk.blue('shuriken'))
  .description(`\nYou are using ${chalk.bold.blue('Shuriken CLI')} 🎉\n`);

// Handle the clone command
program
  .command('clone <project-key> [project-name]')
  .option('--hub', 'Use the Rasengan Hub')
  .option('--blocks', 'Use the Rasengan Blocks')
  .action(async (projectKey, projectName, options) => {
    const projectPath = path.join(
      process.cwd(),
      projectName || 'rasengan-project'
    ); // to be changed

    createProjectFromTemplate(projectPath, projectKey, options);
  });

program.parse(process.argv);

['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.once(signal, () => {
    console.log('\n');
    console.log(chalk.red('❌ The process was interrupted!'));
  });
});
