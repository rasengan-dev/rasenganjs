import chalk from 'chalk';
import { Command } from 'commander';
import { execa } from 'execa';

const program = new Command();

program
  .name(chalk.blue('rasengan'))
  .version('1.0.0', '-v, --version', 'Output the current version number');

// Handle the dev command
program
  .command('dev')
  .option('-p, --port <port>', 'Port number')
  .description('Start development server')
  .action(async ({ port }: { port: number }) => {
    const convertedPort = Number(port);

    // Checking port
    if (
      port &&
      (isNaN(convertedPort) || convertedPort < 0 || convertedPort > 65535)
    ) {
      console.log('');
      console.log(
        chalk.red('Please provide a valid port number between 0-65535')
      );
      console.log('');
      process.exit(1);
    }

    execa('node', ['node_modules/rasengan/lib/esm/server/dev/server'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT: convertedPort ? convertedPort.toString() : undefined,
      },
    });
  });

// Handle the build command
program
  .command('build')
  .description('Build the project')
  .action(async () => {
    execa('node', ['node_modules/rasengan/lib/esm/scripts/build-command'], {
      stdio: 'inherit',
    });
  });

program.parse(process.argv);
