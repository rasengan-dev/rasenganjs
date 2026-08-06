import ReactDOM from 'react-dom/server';
import { renderToReadableStream } from 'react-dom/server.edge';
import { streamResponse } from '@rasenganjs/futon';
import { isServerMode, ServerMode } from '../runtime/mode.js';

type StreamOptions = {
  statusCode?: number;
  responseHeaders?: Record<string, string>;
};

/**
 * Render a React component tree to a Web API `Response` whose body
 * streams via `renderToReadableStream` (Web Streams). Replaces the
 * previous Node-stream `renderToPipeableStream(...).pipe(res)` — the
 * caller now receives a `Response` directly (futon's own request
 * pipeline, no Express bridge involved).
 *
 * Cancellation mirrors the previous `ABORT_DELAY`/`abort()` pattern
 * using `AbortController` instead: the same 10s ceiling aborts any
 * render still in flight, and `onError` only logs (and aborts the
 * rest of the tree) once the shell has already been sent — errors
 * that happen before that point reject the returned promise instead
 * (see `onShellError` parity below), so logging them here too would
 * double-report them.
 *
 * @param Component
 * @param options
 * @returns
 */
export const renderToStream = async (
  Component: React.ReactNode,
  options?: StreamOptions
): Promise<Response> => {
  const ABORT_DELAY = 10_000;

  let bootstrap: string[] = [];

  if (
    isServerMode(process.env.NODE_ENV) &&
    process.env.NODE_ENV === ServerMode.Development
  ) {
    bootstrap.push('/src/index');
  }

  const controller = new AbortController();
  setTimeout(() => controller.abort(), ABORT_DELAY);

  let shellRendered = false;

  // A rejection here is the `onShellError` equivalent — thrown before
  // the shell is ready, so it propagates to the caller directly.
  const stream = await renderToReadableStream(Component, {
    bootstrapModules: bootstrap,
    signal: controller.signal,
    onError(error: unknown) {
      if (shellRendered) {
        console.error(error);
        controller.abort();
      }
    },
  });

  shellRendered = true;

  return streamResponse(stream, {
    status: options?.statusCode ?? 200,
    headers: options?.responseHeaders,
  });
};

export const renderToString = (Component: React.ReactNode) => {
  const html = ReactDOM.renderToString(Component);

  return `<!DOCTYPE html>\n${html}`;
};
