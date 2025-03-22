import { FunctionComponent } from "react";
import { AppConfig } from "../../core/config/type.js";
import { TemplateLayout } from "../../entries/server/index.js";
import { renderToString } from "../node/rendering.js";
import { TemplateProps } from "../../routing/types.js";
import { resolveBuildOptions } from "./index.js";
import { ManifestManager } from "./manifest.js";
import path from "node:path";
import fs from "node:fs/promises";

export const renderIndexHTML = async (
  template: FunctionComponent<TemplateProps>,
  options: {
    rootPath: string;
    config: AppConfig;
  }
) => {
  const { rootPath, config } = options;
  const buildOptions = resolveBuildOptions({});

  const manifest = new ManifestManager(
    path.posix.join(
      buildOptions.buildDirectory,
      config.ssr ? buildOptions.clientPathDirectory : '',
      buildOptions.manifestPathDirectory,
      'manifest.json'
    )
  );

  // Get assets tags
  const assets = manifest.generateMetaTags(''); // TODO: Add the correct path

  // Generate html from template
  const html = renderToString(
    <TemplateLayout
      Template={template}
      assets={assets}
      isSpaMode={true}
    />
  );

  // Render the html into an index.html file
  await fs.writeFile(
    path.posix.join(
      rootPath, 
      buildOptions.buildDirectory, 
      'index.html'
    ),
    html,
    'utf-8'
  );

  // Delete the dist/assets/template.js file
  await fs.rm(
    path.posix.join(
      rootPath,
      buildOptions.buildDirectory,
      buildOptions.assetPathDirectory,
      'template.js'
    )
  );
}