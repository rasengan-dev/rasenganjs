import { execaCommand } from 'execa';
import chalk from 'chalk';

(async function () {
  try {
    const command =
      'cross-env NODE_ENV=production node node_modules/rasengan/server';

    await execaCommand(command, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(chalk.red('Error while running start command: ', error));
    process.exit(1);
  }
})();
