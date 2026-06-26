#!/usr/bin/env node

import { dev } from './cli/dev.js';
import { build } from './cli/build.js';
import { loadConfig, parseArgs } from './cli/config.js';

/**
 * CLI entry point.
 *
 * Parses the command (`dev` | `build`) and CLI flags, loads the
 * configuration, then delegates to the appropriate handler.
 *
 * Usage:
 * ```
 * rasengan-server dev --port 4000
 * rasengan-server build --preset node
 * ```
 */
async function main() {
  const command = process.argv[2];
  const rawArgs = process.argv.slice(3);
  const overrides = parseArgs(rawArgs);
  const config = await loadConfig(overrides);

  switch (command) {
    case 'dev':
      await dev(config);
      break;
    case 'build':
      await build(config);
      break;
    default:
      console.log(`\n  rasengan-server <command>\n`);
      console.log('  Commands:');
      console.log(
        '    dev     Start the development server with file watching'
      );
      console.log('    build   Bundle the server for production\n');
      console.log('  Options:');
      console.log('    --port, -p <number>      Port number');
      console.log('    --host <address>          Host address');
      console.log(
        '    --entry, -e <path>        Entry file (default: src/main.ts)'
      );
      console.log(
        '    --preset=<name>           Production preset (node|bun|workerd)'
      );
      console.log(
        '    --watch-dir <path>        Directory to watch for changes\n'
      );
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(`\n  [rasengan-server] Fatal error: ${err.message}\n`);
  process.exit(1);
});
