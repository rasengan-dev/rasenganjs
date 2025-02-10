import { FunctionComponent, JSX } from 'react';
import type { AppProps } from '../../core/types.js';
import { type Response } from 'express';
import { loadModuleSSR } from '../../core/config/utils/load-modules.js';
import type {
  Metadata,
  MetadataWithoutTitleAndDescription,
  TemplateProps,
} from '../../routing/types.js';
import { TemplateLayout } from './index.js';
import { BuildOptions } from '../../server/node/index.js';
import { join } from 'path/posix';
import { renderToStream } from '../../server/node/rendering.js';

export type RenderStreamFunction = (
  StaticRouterComponent: React.ReactNode,
  res: Response,
  options: {
    metadata: {
      page: Metadata;
      layout: MetadataWithoutTitleAndDescription;
    };
    assets?: JSX.Element[]; // Usefull for the production build
    buildOptions?: BuildOptions;
  }
) => Promise<void>;

/**
 * Render the app to a stream
 * @param StaticRouterComponent
 * @param helmetContext
 * @param res
 * @returns
 */
export const render: RenderStreamFunction = async (
  StaticRouterComponent,
  res,
  options
) => {
  const { metadata, assets, buildOptions } = options;

  // Root path
  const rootPath = process.cwd();

  let App: FunctionComponent<AppProps>;
  let Template: FunctionComponent<TemplateProps>;

  if (buildOptions) {
    App = (
      await loadModuleSSR(join(buildOptions.buildDirectory, 'server/main.js'))
    ).default;
    Template = (
      await loadModuleSSR(
        join(buildOptions.buildDirectory, 'server/template.js')
      )
    ).default;
  } else {
    // Import Main App Component
    App = (await loadModuleSSR(`${rootPath}/src/main`)).default;
    // Import Template
    Template = (await loadModuleSSR(`${rootPath}/src/template`)).default;
  }

  await renderToStream(
    <TemplateLayout
      StaticRouterComponent={StaticRouterComponent}
      metadata={metadata}
      assets={assets}
      App={App}
      Template={Template}
    />,
    res
  );
};
