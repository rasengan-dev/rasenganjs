export interface BuildOptions {
  buildDirectory: string;
  manifestPathDirectory: string;
  assetPathDirectory: string;
  clientPathDirectory: string;
  serverPathDirectory: string;
  entryServerPath: string;
}

const defaultBuildDirectory = "./dist";

export const resolveBuildOptions = ({
  buildDirectory = defaultBuildDirectory,
  clientPathDirectory = 'client',
  serverPathDirectory = 'server',
}: {
  buildDirectory?: string;
  clientPathDirectory?: string;
  serverPathDirectory?: string;
}): BuildOptions => {
  return {
    buildDirectory: buildDirectory,
    manifestPathDirectory: '.vite',
    assetPathDirectory: 'assets',
    clientPathDirectory,
    serverPathDirectory,
    entryServerPath: 'entry.server.js',
  };
};