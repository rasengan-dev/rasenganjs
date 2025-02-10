import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs/promises';
// @ts-ignore
import keypress from 'keypress';
import openBrowser from 'open';
import os from 'node:os';
import { ServerMode } from '../runtime/mode.js';
import { StaticHandlerContext } from 'react-router';
import { Metadata } from '../../routing/types.js';
import type * as Express from 'express';
import { Redirect } from '../../core/config/type.js';
import { logRedirection as log } from '../../core/utils/log.js';
import { sendRasenganResponse } from '../node/utils.js';

// Get local IP
export default function getIPAddress() {
  // Get network interfaces
  const networkInterfaces = os.networkInterfaces();

  // Find the IPv4 address for the default network interface
  let ipAddress = '';

  // Loop through the network interfaces
  for (const interfaceName in networkInterfaces) {
    // Get the network interface
    const iface = networkInterfaces[interfaceName];

    // Skip when there is no network interface
    if (!iface) {
      continue;
    }

    // Loop through the interface addresses
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];

      if (alias.family === 'IPv4' && !alias.internal) {
        ipAddress = alias.address;
        break;
      }
    }

    if (ipAddress) {
      break;
    }
  }

  return ipAddress;
}

/**
 * Log server info after the server is started
 * @param {number} port The port the server is running on
 * @param {boolean} isProduction Whether the server is running in production mode
 * @param {boolean} open Whether to open the browser automatically
 */
export async function logServerInfo(
  port: number,
  mode: ServerMode,
  open: boolean = false
) {
  // Constants
  const arrowRight = '\u2192';

  // Spinner
  console.log('');
  const spinner = ora({
    text: `Starting server in ${mode} mode...`,
    color: 'blue',
    spinner: 'dots',
  }).start();

  // Getting the package.json file
  let packageJson: string = await fs.readFile(
    'node_modules/rasengan/package.json',
    'utf-8'
  );

  // Parsing the package.json file
  const parsedPackageJson = JSON.parse(packageJson);

  spinner.succeed(
    `${chalk.bold.blue(
      `Rasengan v${parsedPackageJson['version']}`
    )} is running 🚀`
  );

  console.log('\n\n');

  process.stdout.write(
    `${chalk.bold.green(arrowRight)} ${chalk.bold('Local:')}   ${chalk.blue(
      `http://localhost:${chalk.bold(port)}`
    )}`
  );
  console.log('');

  // Get the IP address of the machine
  const ipAddress = getIPAddress();

  if (ipAddress) {
    process.stdout.write(
      `${chalk.bold.green(arrowRight)} ${chalk.bold('Network:')} ${chalk.blue(
        `http://${ipAddress}:${chalk.bold(port)}`
      )}\n`
    );
  }

  // Display options
  process.stdout.write(
    `${chalk.bold.green(arrowRight)} ${chalk.gray('Use')} ${chalk.bold(
      '-p <PORT>'
    )} ${chalk.gray('to specify a custom port')}\n`
  );
  process.stdout.write(
    `${chalk.bold.green(arrowRight)} ${chalk.gray('Press')} ${chalk.bold(
      'c'
    )} ${chalk.gray('to clear')}\n`
  );
  process.stdout.write(
    `${chalk.bold.green(arrowRight)} ${chalk.gray('Press')} ${chalk.bold(
      'ctrl + c'
    )} ${chalk.gray('to close the server')}\n`
  );

  console.log('\n');

  // Open the browser
  if (open) {
    openBrowser(`http://localhost:${port}`);
  }

  // Enable keypress events on the process.stdin stream
  keypress(process.stdin);

  // Listen on user keyboard input on the terminal
  process.stdin.on('keypress', (_: string, key: any) => {
    // Check if the key pressed is 'c'
    if (key) {
      if (key.name === 'c' && key.ctrl) {
        console.log(
          `${chalk.green('ctrl + c')} ${chalk.gray('pressed: ')} ${chalk.blue(
            'Closing server... \n\n'
          )}`
        );
        process.exit(0);
      } else if (key.name === 'c' && !key.ctrl && !key.meta && !key.shift) {
        // Clear terminal
        process.stdout.write('\x1Bc');

        logServerInfo(port, mode);
      }
    }
  });

  // Allow the process to exit when Ctrl+C is pressed
  if (process.stdin.setRawMode instanceof Function) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();

  // Set a higher limit for the number of listeners
  process.stdin.setMaxListeners(100);
}

/**
 * This function extracts the meta data from the React Router context
 * @param context React Router context
 */
export function extractMetaFromRRContext(context: StaticHandlerContext) {
  const leaf = context.matches[context.matches.length - 1]; // the last match is the leaf (the actual page requested)

  // Get the loader id
  const pageLoaderId = leaf.route.id; // The id follows the pattern "[layoutIndex]-[pageIndex]", eg. 0-1, 1-2, etc.
  const layoutLoaderId = pageLoaderId.split('-')[0];

  // Get the meta from the loader based on the loader id
  const pageLoaderData: { meta: Metadata } = context.loaderData[
    pageLoaderId
  ] ?? { meta: {} }; // This is the loader data specific to the page
  const layoutLoaderData: { meta: Metadata } = context.loaderData[
    layoutLoaderId
  ] ?? { meta: {} }; // This is the loader data specific to the layout

  // Get the meta from the loaders data
  const pageMeta = pageLoaderData.meta;
  const layoutMeta = layoutLoaderData.meta;

  return {
    page: pageMeta,
    layout: layoutMeta,
  };
}

/**
 * This function extracts the headers from the React Router context
 * @param context React Router context
 */
export function extractHeadersFromRRContext(context: StaticHandlerContext) {
  // Setup headers from action and loaders from deepest match
  let leaf = context.matches[context.matches.length - 1];
  let actionHeaders = context.actionHeaders[leaf.route.id];
  let loaderHeaders = context.loaderHeaders[leaf.route.id];

  let headers = new Headers(actionHeaders);

  if (loaderHeaders) {
    for (let [key, value] of loaderHeaders.entries()) {
      headers.append(key, value);
    }
  }

  headers.set('Content-Type', 'text/html; charset=utf-8');

  return headers;
}

/**
 * Check if the request is a document request
 * @param request Express request object
 */
export function isDocumentRequest(request: Express.Request) {
  // Check if the request accepts HTML in header
  const accept = request.headers['accept'] || '';
  return accept.includes('text/html');
}

export function isDataRequest(request: Express.Request) {
  // Check if the request accepts JSON (React Router's fetch requests)
  const acceptsJson = request.headers['accept']?.includes('application/json');

  // Check if the URL path follows the `.data` pattern
  const isDataPath = request.url?.endsWith('.data');

  return acceptsJson || isDataPath;
}

export function isResourceRequest(request: Express.Request) {
  const accept = request.headers['accept'] || '';

  // Check common resource-related MIME types in the Accept header
  if (
    accept.includes('image/') || // Images
    accept.includes('font/') || // Fonts
    accept.includes('text/css') || // Stylesheets
    accept.includes('application/javascript') || // JavaScript
    accept.includes('application/json') // JSON (if resources include it)
  ) {
    return true;
  }

  // Check if the URL includes common resource path segments
  const url = request.originalUrl || '';
  if (
    url.includes('/assets/') ||
    url.includes('/static/') ||
    url.includes('/public/')
  ) {
    return true;
  }

  // Exclude cases that are clearly document or API requests
  if (isDocumentRequest(request)) {
    return false;
  }

  // Fallback: Treat unknown requests as resource requests
  return true;
}

/**
 * Check if the request is an Redirect request
 * @param context Response context
 */
export function isRedirectResponse(context: Response) {
  return context.status === 302 || context.status === 301;
}

export async function isStaticRedirectFromConfig(
  req: Express.Request,
  redirects: Redirect[]
) {
  let redirectFound = false;

  for (let redirect of redirects) {
    if (redirect.source === req.originalUrl) {
      redirectFound = true;
      break;
    }
  }

  return redirectFound;
}
