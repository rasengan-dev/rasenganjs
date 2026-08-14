import { FunctionComponent, JSX } from 'react';
import type { AppProps } from '../../core/types.js';
import { html as htmlResponse } from '@rasenganjs/futon';
import { loadModuleSSR } from '../../core/config/utils/load-modules.js';
import type {
  Metadata,
  MetadataWithoutTitleAndDescription,
  TemplateProps,
} from '../../routing/types.js';
import { TemplateLayout } from './index.js';
import { BuildOptions } from '../../server/build/index.js';
import { join, posix } from 'path/posix';
import { renderToStream, renderToString } from '../../server/node/rendering.js';

export type RenderStreamFunction = (
  StaticRouterComponent: React.ReactNode,
  options: {
    metadata: {
      page: Metadata;
      layout: MetadataWithoutTitleAndDescription;
    };
    assets?: JSX.Element[]; // Usefull for the production build
    buildOptions?: BuildOptions;
    statusCode?: number;
    responseHeaders?: Record<string, string>;
    /**
     * Pre-loaded App/Template, bypassing this function's own
     * `loadModuleSSR` calls entirely — for runtimes with no
     * filesystem and no dynamic import-by-path support (Cloudflare
     * Workers). Every other caller omits this and keeps today's
     * exact behavior (RFC-0009 §Detailed Design 1.1).
     */
    modules?: {
      App: FunctionComponent<AppProps>;
      Template: FunctionComponent<TemplateProps>;
    };
  },
  stream?: boolean
) => Promise<Response>;

/**
 * Render the app to a Web API `Response`.
 *
 * `stream` picks the body strategy, not whether a `Response` comes
 * back — both branches now return one uniformly: `stream: true`
 * (live SSR) wraps a `renderToReadableStream` body via
 * `renderToStream`; `stream: false` (static prerendering) wraps a
 * fully-rendered HTML string via `renderToString`. Callers that need
 * the HTML text (e.g. `preRenderApp`, writing to disk) read it back
 * with `(await render(...)).text()`.
 *
 * @param StaticRouterComponent
 * @param options
 * @param stream
 * @returns
 */
export const render: RenderStreamFunction = async (
  StaticRouterComponent,
  options,
  stream = true
) => {
  const { metadata, assets, buildOptions, modules } = options;

  // Root path
  const rootPath = process.cwd();

  let App: FunctionComponent<AppProps>;
  let Template: FunctionComponent<TemplateProps>;

  if (modules) {
    App = modules.App;
    Template = modules.Template;
  } else if (buildOptions) {
    // If build options are provided, that means we are in production mode
    App = (
      await loadModuleSSR(
        posix.join(
          buildOptions.buildDirectory,
          buildOptions.serverPathDirectory,
          'main.js'
        )
      )
    ).default;
    Template = (
      await loadModuleSSR(
        join(
          buildOptions.buildDirectory,
          buildOptions.serverPathDirectory,
          'template.js'
        )
      )
    ).default;
  } else {
    // Import Main App Component
    App = (await loadModuleSSR(`${rootPath}/src/main`)).default;
    // Import Template
    Template = (await loadModuleSSR(`${rootPath}/src/template`)).default;
  }

  if (stream) {
    return await renderToStream(
      <TemplateLayout
        StaticRouterComponent={StaticRouterComponent}
        metadata={metadata}
        assets={assets}
        App={App}
        Template={Template}
      />,
      {
        statusCode: options.statusCode,
        responseHeaders: options.responseHeaders,
      }
    );
  } else {
    const html = renderToString(
      <TemplateLayout
        StaticRouterComponent={StaticRouterComponent}
        metadata={metadata}
        assets={assets}
        App={App}
        Template={Template}
      />
    );

    return htmlResponse(html, {
      status: options.statusCode,
      headers: options.responseHeaders,
    });
  }
};
