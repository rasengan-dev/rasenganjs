import ReactDOM from 'react-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import type * as Express from 'express';
import { isServerMode, ServerMode } from '../runtime/mode.js';

type StreamOptions = {
  statusCode?: number;
  responseHeaders?: Record<string, string>;
};

/**
 * Render a React component to a stream.
 * @param Component
 * @param res
 * @param options
 * @returns
 */
export const renderToStream = async (
  Component: React.ReactNode,
  res: Express.Response,
  options?: StreamOptions
) => {
  const ABORT_DELAY = 10_000;

  let bootstrap = [];

  if (
    isServerMode(process.env.NODE_ENV) &&
    process.env.NODE_ENV === ServerMode.Development
  ) {
    bootstrap.push('/src/index');
  }

  return new Promise(async (resolve, reject) => {
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(Component, {
      bootstrapModules: bootstrap,
      onShellReady() {
        shellRendered = true;

        if (!res.headersSent && options?.responseHeaders) {
          res.writeHead(options.statusCode ?? 200, options.responseHeaders);
        }

        resolve(res);

        pipe(res);
      },
      onShellError(error: unknown) {
        reject(error);
      },
      onError(error: unknown) {
        if (shellRendered) {
          console.error(error);
          abort();
        }
      },
    });

    setTimeout(abort, ABORT_DELAY);
  });
};

export const renderToString = (Component: React.ReactNode) => {
  const html = ReactDOM.renderToString(Component);

  return `<!DOCTYPE html>\n${html}`;
};
