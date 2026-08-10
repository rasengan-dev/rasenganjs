import chalk from 'chalk';
import fs from 'fs/promises';
import openBrowser from 'open';
import os from 'node:os';
import { StaticHandlerContext } from 'react-router';
import { Metadata } from '../../routing/types.js';
import { Redirect } from '../../core/config/type.js';
import readline from 'node:readline';

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
 * @param {boolean} open Whether to open the browser automatically
 * @param {string[]} envFiles The `.env*` files that were loaded (RFC-0010)
 */
export async function logServerInfo(
  port: number,
  open: boolean = false,
  envFiles: string[] = []
) {
  // Constants
  const arrowRight = '→';

  // Getting the package.json file
  let packageJson: string = await fs.readFile(
    'node_modules/rasengan/package.json',
    'utf-8'
  );

  // Parsing the package.json file
  const parsedPackageJson = JSON.parse(packageJson);

  console.log('');
  console.log(
    `${chalk.bold.blue(`Rasengan v${parsedPackageJson['version']}`)} ${chalk.green('running')}`
  );
  console.log('');

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

  process.stdout.write(
    `${chalk.bold.green(arrowRight)} ${chalk.bold('Runtime:')} Node.js\n`
  );

  if (envFiles.length > 0) {
    process.stdout.write(
      `${chalk.bold.green(arrowRight)} ${chalk.bold('Env:')}     ${chalk.gray(envFiles.join(', '))}\n`
    );
  }

  console.log('');

  // Display options
  process.stdout.write(
    `${chalk.bold.green(arrowRight)} ${chalk.gray('Use')} ${chalk.bold(
      '-p <PORT>'
    )} ${chalk.gray('to specify a custom port')}\n`
  );
  process.stdout.write(
    `${chalk.bold.green(arrowRight)} ${chalk.gray('Press')} ${chalk.bold(
      'c'
    )} ${chalk.gray('to clear the console')}\n`
  );
  process.stdout.write(
    `${chalk.bold.green(arrowRight)} ${chalk.gray('Press')} ${chalk.bold(
      'ctrl+c'
    )} ${chalk.gray('to stop the server')}\n`
  );

  console.log('');

  // Open the browser
  if (open) {
    openBrowser(`http://localhost:${port}`);
  }

  setupKeypress(() => logServerInfo(port, undefined, envFiles));
}

/** Tracks whether the keypress listener has already been set up. */
let listening = false;

/**
 * Set up an interactive keypress listener on `stdin`, once.
 *
 * - `c` (no modifiers) → clears the console and re-displays the banner.
 * - `ctrl+c` → prints a shutdown message and exits.
 *
 * `logServerInfo` used to call `process.stdin.on('keypress', ...)` on
 * every re-render (i.e. every time the user pressed `c`), stacking a new
 * listener on top of the previous ones instead of reusing one — after
 * enough `c` presses in a single session, Node would warn about a
 * possible EventEmitter memory leak, and each keypress after the first
 * would re-trigger every stacked handler. The `listening` guard below
 * ensures the actual `stdin` listener is attached exactly once; later
 * calls (one per `logServerInfo` re-render) are no-ops.
 * @param log - Callback to re-display the server banner.
 */
function setupKeypress(log: () => void): void {
  if (listening) return;
  listening = true;

  readline.emitKeypressEvents(process.stdin);

  process.stdin.on('keypress', (_: string, key: any) => {
    if (!key) return;

    if (key.name === 'c' && key.ctrl) {
      console.log(
        `\n${chalk.green('ctrl+c')} ${chalk.gray('pressed — stopping server...')}\n`
      );
      process.exit(0);
    } else if (key.name === 'c' && !key.ctrl && !key.meta && !key.shift) {
      // Clear terminal
      process.stdout.write('\x1Bc');

      log();
    }
  });

  // Allow the process to exit when Ctrl+C is pressed
  if (process.stdin.setRawMode instanceof Function) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
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
 * @param request Web API Request object
 */
export function isDocumentRequest(request: Request) {
  // Check if the request accepts HTML in header
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html');
}

export function isDataRequest(request: Request) {
  // Check if the request accepts JSON (React Router's fetch requests)
  const acceptsJson = request.headers
    .get('accept')
    ?.includes('application/json');

  // Check if the URL path follows the `.data` pattern
  const isDataPath = new URL(request.url).pathname.endsWith('.data');

  return acceptsJson || isDataPath;
}

/**
 * Strip React Router's `.data` pathname suffix, if present.
 *
 * The client router appends `.data` to the pathname for navigation
 * data requests (e.g. `/pricing` -> `/pricing.data`) — no route
 * pattern actually ends in `.data`, so every place that matches a
 * pathname against the route tree (`matchRoutes`, `preloadMatches`,
 * `handler.queryRoute`) needs to see the underlying page path
 * instead, or the match silently fails.
 * @param pathname
 */
export function stripDataSuffix(pathname: string): string {
  return pathname.endsWith('.data')
    ? pathname.slice(0, -'.data'.length)
    : pathname;
}

export function isResourceRequest(request: Request) {
  const accept = request.headers.get('accept') || '';

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
  const pathname = new URL(request.url).pathname;
  if (
    pathname.includes('/assets/') ||
    pathname.includes('/static/') ||
    pathname.includes('/public/')
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

/**
 * Check if the request is a static redirect from the config file
 * @param request Web API Request object
 * @param redirects Redirects from the config file
 */
export async function isStaticRedirectFromConfig(
  request: Request,
  redirects: Redirect[]
) {
  // Mirrors Express's `req.originalUrl` (path + query, no origin).
  const url = new URL(request.url);
  const originalUrl = url.pathname + url.search;
  let redirectFound = false;

  for (let redirect of redirects) {
    if (redirect.source === originalUrl) {
      redirectFound = true;
      break;
    }
  }

  return redirectFound;
}

/**
 * Generate a random port
 * @returns
 */
export function generateRandomPort() {
  return Math.floor(Math.random() * 10000) + 1024;
}
