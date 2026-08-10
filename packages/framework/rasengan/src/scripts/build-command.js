import { execaCommand } from 'execa';
import chalk from 'chalk';
import { loadNodeEnvFiles } from '@rasenganjs/runtime/adapters/node';

(async function () {
  try {
    console.log(chalk.cyan(`Running app build ✨\n`));

    // RFC-0010: load .env* into THIS process's process.env before
    // spawning `vite build` below — execa merges its own `env` option
    // on top of `process.env` by default (extendEnv), so the spawned
    // build (and, inside it, rasengan.config.js's resolution and any
    // preRenderApp()/generatePaths()/loader() call during prerendering)
    // inherits it automatically, with no change needed to the `env`
    // object passed to execaCommand below.
    await loadNodeEnvFiles(process.cwd(), 'production');

    await execaCommand(
      `vite build --app --config ./node_modules/rasengan/vite.config.ts`,
      {
        stdio: 'inherit',
        env: {
          NODE_ENV: 'production',
        },
      }
    );
  } catch (error) {
    console.error(chalk.red('Error while running build command: ', error));
    process.exit(1);
  }
})();
