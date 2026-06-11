export interface BuildOptions {
  buildDirectory: string;
  staticDirectory: string;
  manifestPathDirectory: string;
  assetPathDirectory: string;
  clientPathDirectory: string;
  serverPathDirectory: string;
  entryServerPath: string;
}

const defaultBuildDirectory = "./dist";

export const resolveBuildOptions = ({
  buildDirectory = defaultBuildDirectory,
  staticDirectory = 'static',
  clientPathDirectory = 'client',
  serverPathDirectory = 'server',
}: {
  buildDirectory?: string;
  staticDirectory?: string;
  clientPathDirectory?: string;
  serverPathDirectory?: string;
}): BuildOptions => {
  return {
    buildDirectory: buildDirectory,
    staticDirectory,
    manifestPathDirectory: '.vite',
    assetPathDirectory: 'assets',
    clientPathDirectory,
    serverPathDirectory,
    entryServerPath: 'entry.server.js',
  };
};